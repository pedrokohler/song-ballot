const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const {
  now: firebaseNow,
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

admin.initializeApp();

exports.initializeUser = functions.auth.user().onCreate(async (user) => {
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
});

exports.getYoutubeTitle = functions.https.onCall((data, context) => {
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
});

exports.controlRoundLifecycle = functions.firestore
  .document("groups/{groupId}/rounds/{roundId}")
  .onUpdate(async (change, context) => {
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
  });

exports.receiveTelegramBotMessage = functions.https.onRequest(async (req, res) => {
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
});

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


const sendTelegramMessage = (chatId, message) => {
  const botKey = functions.config().telegram.bot.key;
  const url = `https://api.telegram.org/bot${botKey}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: message
  };
  return axios.post(url, body)
    .then(() => console.log("Success sending message!"))
    .catch((e) => console.log(e.message, chatId, message));
}


const getYoutubeApiUrl = (videoId, apiKey) => "https://www.googleapis.com/youtube/v3/videos"
  + `?part=snippet&id=${videoId}&fields=items(id%2Csnippet)&key=${apiKey}`;

const handleNewVote = async ({
  groupId,
  roundId,
  round,
  uid
}) => {
  if(uid){
    await sendNewVoteNotification(groupId, uid);
  }
  if (shouldFinishRound(round)) {
    await finishRound(groupId, roundId);
  }
}

const sendRoundFinishedNotification = async (groupId, lastWinner) => {
  const { group, user } = await getUserAndGroup(groupId, lastWinner);
  const message = `Round just finished in ${group.name}. The winner was ${user.displayName}\n\n`
    + `Congratulations, ${user.displayName}!\n\n`
    + "Everyone can already send a song for the new round.";
  return sendMessageToWholeGroup(group, message);
}

const sendNewVoteNotification = async (groupId, uid) => {
  const { group, user } = await getUserAndGroup(groupId, uid);
  const message = `User ${user.displayName} just voted in ${group.name}.`;
  return sendMessageToWholeGroup(group, message);
}

const getUserAndGroup = async (groupId, uid) => {
  const groupReference = getGroupReference(groupId);
  const userReference = getUserReference(uid);
  const [group, user] = await Promise.all([groupReference.get(), userReference.get()]);
  return { group: group.data(), user: user.data() };
}

const sendMessageToWholeGroup = async (group, message) => {
  return Promise.all(group.telegramChatIds.map(chatId => sendTelegramMessage(chatId, message)));
}

const finishRound = async (groupId, roundId) => {
  const lastWinner = await defineRoundWinner(groupId, roundId);
  await updateRoundEvaluationsEndAt(groupId, roundId);
  await startNewRound(groupId, lastWinner);
  await sendRoundFinishedNotification(groupId, lastWinner);
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
    await sendNewSubmissionsNotification(groupId, uid);
  }
  if(shouldStartRoundEvaluationPeriod(round)){
    await startRoundEvaluationPeriod(groupId, roundId);
    await sendSubmissionPeriodFinishedNotification(groupId);
  }
}

const sendSubmissionPeriodFinishedNotification = async (groupId) => {
  const groupReference = getGroupReference(groupId);
  const group = await groupReference.get().then(g => g.data());
  const message = `Submission period just finished in ${group.name}.\n\n`
    + "Everyone can already start voting!";
  return sendMessageToWholeGroup(group, message);
}

const sendNewSubmissionsNotification = async (groupId, uid) => {
  const { group, user } = await getUserAndGroup(groupId, uid);
  const message = `User ${user.displayName} just submitted a song in ${group.name}.`;
  return sendMessageToWholeGroup(group, message);
}

const startRoundEvaluationPeriod = async (groupId, roundId) => {
  const now = firebaseNow();
  const roundReference = getRoundReference(groupId, roundId);
  await roundReference.update({ submissionsEndAt: now, evaluationsStartAt: now });
}
