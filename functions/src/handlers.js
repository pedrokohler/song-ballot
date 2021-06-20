const functions = require("firebase-functions");
const axios = require("axios");
const {
  now: firebaseNow,
  getGroupsCollection,
  getGroupReference,
  getUserReference,
  getRoundReference,
  getEvaluationsReference,
  getSubmissionsReference,
  getFirebaseTimestamp,
} = require("./firebase");

// Domain-specific code is shared between front-end and back-end applications.
// Firebase functions doesn't support import-export keywords and the front-end app is all based on them.
// To solve this issue, in the predeploy phase, we run babel and create an updated compiled copy
// of the domain folder in the functions/src folder
const { computeRoundWinner } = require("./domain/aggregates/score");
const {
  generateNewRoundPayload,
  shouldStartRoundEvaluationPeriod,
  shouldFinishRound,
} = require("./domain/aggregates/stages");

const {
  sendGroupNotificationWithUser,
  sendSimpleGroupNotification,
  sendTelegramMessage,
  messageMap,
  SUBMISSION_PERIOD_FINISHED_KEY,
  NEW_EVALUATION_KEY,
  EVALUATION_PERIOD_FINISHED_KEY,
  NEW_SUBMISSION_KEY,
  STAGE_ABOUT_TO_FINISH_KEY,
} = require("./notifications");

const initializeUser = async (user) => {
  const {
    uid: id, displayName, email, photoURL
  } = user;
  await getUserReference(id).set({
    id,
    displayName,
    email,
    photoURL,
    groups: []
  });
};

const getYoutubeTitle = (data, context) => {
  const { uid } = context.auth;
  if (uid) {
    const { videoId } = data;
    const apiKey = functions.config().youtube.key;
    const url = getYoutubeApiUrl(videoId, apiKey);

    return axios.get(url).then((response) => {
      const hasFoundSong = !!response.data.items[0];

      if (hasFoundSong) {
        const { title } = response.data.items[0].snippet;
        return { title };
      }

      return { error: "Song not found" };
    });
  }
  return { error: "Unauthenticated user" }
};

const controlRoundLifecycle = async (change, context) => {
  const { groupId, roundId } = context.params;
  const { voteCount, evaluations, submissions } = change.after.data();
  const {
    voteCount: oldVoteCount,
    submissions: oldSubmissions,
    evaluations: oldEvaluations,
  } = change.before.data();

  if (oldVoteCount !== voteCount) {
    const uid = await getUidComparingEvaluations({ groupId, evaluations, oldEvaluations });
    await handleNewVote({
      groupId,
      roundId,
      round: change.after.data(),
      uid,
    });
    return;
  }

  if (oldSubmissions.length !== submissions.length) {
    const uid = await getUidComparingSubmissions({ groupId, submissions, oldSubmissions });
    await handleNewSubmission({
      groupId,
      roundId,
      round: change.after.data(),
      uid,
    });
    return;
  }
};

const receiveTelegramBotMessage = async (req, res) => {
  try {
    const { message: { chat: { id } } } = req.body;
    const message = `Your chat id is ${id}\n\n`
    + "Go to the Song Ballot app and click the \"Bot settings\" menu after you've logged in"
    + ", then paste your chat id to start receiving messages from the app.";
    await sendTelegramMessage(id, message);
    res.send({ ok: true });
  }catch(e){
    console.error(e.message);
    res.send({ ok: false });
  }
}

const evaluationPeriodFinishedAction = ({
  groupId,
  ongoingRoundId
}) => finishRound(groupId, ongoingRoundId);

const checkEvaluationPeriodFinished = ({
  evaluationsEndAt,
}) => {
  const now = new Date();
  return now.getTime() > evaluationsEndAt.toMillis()
}

const submissionPeriodFinishedAction = async ({
  groupId,
  ongoingRoundId,
}) => {
  const { messageGenerator, messageTag } = messageMap.get(SUBMISSION_PERIOD_FINISHED_KEY);
  await getRoundReference(groupId, ongoingRoundId).update({
    [`notifications.${messageTag}`]: true
  });
  return await sendSimpleGroupNotification(groupId, messageGenerator);
}

const checkSubmissionPeriodFinished = ({
  notifications,
  submissionsEndAt,
}) => {
  const now = new Date();
  return (notifications ? !notifications.submissionPeriodFinished : true)
    && now.getTime() > submissionsEndAt.toMillis()
}

const submissionPeriodAboutToFinishAction = (hours) => async ({
  groupId,
  ongoingRoundId,
}) => {
  const { messageGenerator, messageTag } = messageMap.get(STAGE_ABOUT_TO_FINISH_KEY);
  await getRoundReference(groupId, ongoingRoundId).update({
    [`notifications.${messageTag("submission", hours)}`]: true
  });
  return await sendSimpleGroupNotification(
    groupId,
    messageGenerator("Submission", "sent your songs", hours)
  );
}

const checkSubmissionPeriodAboutToFinish = (hours) => ({
  notifications,
  submissionsEndAt,
}) => {
  const { messageTag } = messageMap.get(STAGE_ABOUT_TO_FINISH_KEY);
  const possibleHours = [24, 8, 2];
  const now = new Date();
  const hoursInMilliseconds = hours * 60 * 60 * 1000;
  if(notifications) {
    const laterNotificationSent = notifications.submissionPeriodFinished
      || possibleHours.filter(hour => hour <= hours)
        .some(hour => notifications[messageTag("submission", hour)]);
    if(laterNotificationSent) return false;
  }
  return now.getTime() > submissionsEndAt.toMillis() - hoursInMilliseconds;
}

const evaluationPeriodAboutToFinishAction = (hours) => async ({
  groupId,
  ongoingRoundId,
}) => {
  const { messageGenerator, messageTag } = messageMap.get(STAGE_ABOUT_TO_FINISH_KEY);
  await getRoundReference(groupId, ongoingRoundId).update({
    [`notifications.${messageTag("evaluation", hours)}`]: true
  });
  return await sendSimpleGroupNotification(
    groupId,
    messageGenerator("Evaluation", "voted", hours)
  );
}

const checkEvaluationPeriodAboutToFinish = (hours) => ({
  notifications,
  evaluationsEndAt,
}) => {
  const { messageTag } = messageMap.get(STAGE_ABOUT_TO_FINISH_KEY);
  const possibleHours = [24, 8, 2];
  const now = new Date();
  const hoursInMilliseconds = hours * 60 * 60 * 1000;
  if(notifications) {
    const laterNotificationSent = possibleHours.filter(hour => hour <= hours)
        .some(hour => notifications[messageTag("evaluation", hour)]);
    if(laterNotificationSent) return false;
  }
  return now.getTime() > evaluationsEndAt.toMillis() - hoursInMilliseconds;
}

const checkActionMap = new Map([
  ["evaluationPeriodFinished", {
    check: checkEvaluationPeriodFinished,
    action: evaluationPeriodFinishedAction
  }],
  ["evaluationPeriodAboutToFinish(2)", {
    check: checkEvaluationPeriodAboutToFinish(2),
    action: evaluationPeriodAboutToFinishAction(2)
  }],
  ["evaluationPeriodAboutToFinish(8)", {
    check: checkEvaluationPeriodAboutToFinish(8),
    action:evaluationPeriodAboutToFinishAction(8)}
  ],
  ["evaluationPeriodAboutToFinish(24)", {
    check: checkEvaluationPeriodAboutToFinish(24),
    action: evaluationPeriodAboutToFinishAction(24)
  }],
  ["submissionPeriodFinished", {
    check: checkSubmissionPeriodFinished,
    action: submissionPeriodFinishedAction}],
  ["submissionPeriodAboutToFinish(2)", {
    check: checkSubmissionPeriodAboutToFinish(2),
    action: submissionPeriodAboutToFinishAction(2)
  }],
  ["submissionPeriodAboutToFinish(8)", {
    check: checkSubmissionPeriodAboutToFinish(8),
    action: submissionPeriodAboutToFinishAction(8)
  }],
  ["submissionPeriodAboutToFinish(24)", {
    check: checkSubmissionPeriodAboutToFinish(24),
    action: submissionPeriodAboutToFinishAction(24)
  }],
]);


const checkRoundLifecycleAndMaybeNotifyUsers = async () => {
  const groupsCollection = await getGroupsCollection().get();
  return await Promise.all(groupsCollection.docs.map(async groupDocument => {
    const { id: groupId } = groupDocument;
    const { ongoingRound: ongoingRoundId } = groupDocument.data();
    const roundReference = await getRoundReference(groupId, ongoingRoundId).get();
    const {
      evaluationsEndAt,
      submissionsEndAt,
      notifications
    } = roundReference.data();

    return [
      "evaluationPeriodFinished",
      "evaluationPeriodAboutToFinish(2)",
      "evaluationPeriodAboutToFinish(8)",
      "evaluationPeriodAboutToFinish(24)",
      "submissionPeriodFinished",
      "submissionPeriodAboutToFinish(2)",
      "submissionPeriodAboutToFinish(8)",
      "submissionPeriodAboutToFinish(24)",
    ].some(key => {
      const { check, action } = checkActionMap.get(key)
      const result = check({
        notifications,
        submissionsEndAt,
        evaluationsEndAt,
      });
      if (!result) {
        return false;
      }
      return action({
        groupId,
        ongoingRoundId,
      });
    });
  }));
}

const getUidComparingEvaluations = async ({
  groupId,
  evaluations,
  oldEvaluations
}) => {
  const [someNewEvaluationId] = evaluations.filter(evaluation => !oldEvaluations.includes(evaluation));
  if(someNewEvaluationId){
    const evaluationReference = getEvaluationsReference(groupId).doc(someNewEvaluationId);
    const evaluation = await evaluationReference.get().then(e => e.data());
    return evaluation.evaluator;
  }
  return null;
}

const getUidComparingSubmissions = async ({
  groupId,
  submissions,
  oldSubmissions
}) => {
  const [someNewSubmissionId] = submissions.filter(submission => !oldSubmissions.includes(submission));
  if(someNewSubmissionId){
    const submissionReference = getSubmissionsReference(groupId).doc(someNewSubmissionId);
    const submission = await submissionReference.get().then(e => e.data());
    return submission.submitter;
  }
  return null;
}


const getYoutubeApiUrl = (videoId, apiKey) => "https://www.googleapis.com/youtube/v3/videos"
  + `?part=snippet&id=${videoId}&fields=items(id%2Csnippet)&key=${apiKey}`;

const handleNewVote = async ({
  groupId,
  roundId,
  round,
  uid
}) => {
  const  { messageGenerator } = messageMap.get(NEW_EVALUATION_KEY)
  if(uid){
    await sendGroupNotificationWithUser(groupId, uid, messageGenerator);
  }
  if (shouldFinishRound(round)) {
    await finishRound(groupId, roundId);
  }
}

const finishRound = async (groupId, roundId) => {
  const { messageGenerator } = messageMap.get(EVALUATION_PERIOD_FINISHED_KEY);
  const lastWinner = await defineRoundWinner(groupId, roundId);
  await updateRoundEvaluationsEndAt(groupId, roundId);
  await startNewRound(groupId, lastWinner);
  await sendGroupNotificationWithUser(groupId, lastWinner, messageGenerator);
}

const updateRoundEvaluationsEndAt = async (groupId, roundId) => {
  const now = firebaseNow();
  const roundReference = getRoundReference(groupId, roundId);
  await roundReference.update({ evaluationsEndAt: now });
}

const defineRoundWinner = async (groupId, roundId) => {
  const evaluationsSnapshot = await getEvaluationsReference(groupId)
    .where("round", "==", roundId)
    .get();
  const evaluations = evaluationsSnapshot.docs.map((evaluation) => evaluation.data());
  return computeRoundWinner(evaluations);
}

const startNewRound = async (groupId, lastWinner) => {
  const groupReference = getGroupReference(groupId);

  const group = await groupReference.get();
  const { users } = group.data();

  const round = await groupReference.collection("rounds").add(
    generateNewRoundPayload({
      users,
      lastWinner,
      timestampGenerator: getFirebaseTimestamp
    })
  );

  await groupReference.update({
    ongoingRound: round.id,
  });
}

const handleNewSubmission = async ({
  groupId,
  roundId,
  round,
  uid
}) => {
  if(uid){
    const { messageGenerator } = messageMap.get(NEW_SUBMISSION_KEY);
    await sendGroupNotificationWithUser(groupId, uid, messageGenerator);
  }
  if(shouldStartRoundEvaluationPeriod(round)){
    const { messageGenerator } = messageMap.get(SUBMISSION_PERIOD_FINISHED_KEY);
    await startRoundEvaluationPeriod(groupId, roundId);
    await sendSimpleGroupNotification(groupId, messageGenerator);
  }
}

const startRoundEvaluationPeriod = async (groupId, roundId) => {
  const { messageTag } = messageMap.get(SUBMISSION_PERIOD_FINISHED_KEY);
  const now = firebaseNow();
  const roundReference = getRoundReference(groupId, roundId);
  await roundReference.update({
    submissionsEndAt: now,
    evaluationsStartAt: now,
    [`notifications.${messageTag}`]: true,
  });
}

module.exports = {
  initializeUser,
  getYoutubeTitle,
  controlRoundLifecycle,
  receiveTelegramBotMessage,
  checkRoundLifecycleAndMaybeNotifyUsers,
}