const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const {
  now: firebaseNow,
  getGroupReference,
  getUserReference,
  getRoundReference,
  getEvaluationsReference,
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
    const { voteCount, submissions } = change.after.data();
    const {
      voteCount: oldVoteCount,
      submissions: oldSubmissions,
    } = change.before.data();

    if (oldVoteCount !== voteCount) {
      await handleNewVote({
        groupId,
        roundId,
        round: change.after.data(),
      });
      return;
    }

    if (oldSubmissions.length !== submissions.length) {
      await handleNewSubmission({
        groupId,
        roundId,
        round: change.after.data(),
      });
      return;
    }
  });



const getYoutubeApiUrl = (videoId, apiKey) => "https://www.googleapis.com/youtube/v3/videos"
  + `?part=snippet&id=${videoId}&fields=items(id%2Csnippet)&key=${apiKey}`;

const handleNewVote = async ({
  groupId,
  roundId,
  round
}) => {
  if (shouldFinishRound(round)) {
    await finishRound(groupId, roundId);
  }
}

const finishRound = async (groupId, roundId) => {
  const lastWinner = await defineRoundWinner(groupId, roundId);
  await updateRoundEvaluationsEndAt(groupId, roundId);
  await startNewRound(groupId, lastWinner);
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
  round
}) => {
  if(shouldStartRoundEvaluationPeriod(round)){
    await startRoundEvaluationPeriod(groupId, roundId);
  }
}

const startRoundEvaluationPeriod = async (groupId, roundId) => {
  const now = firebaseNow();
  const roundReference = getRoundReference(groupId, roundId);
  await roundReference.update({ submissionsEndAt: now, evaluationsStartAt: now });
}


// exports.roundCronJob = functions.pubsub
// .schedule('every sunday 20:01')
// .timeZone('America/Sao_Paulo')
// .onRun(async (context) => {
//   const groups = await admin.firestore().collection('groups').get();
//   groups.docs.forEach(group => {
//     const { id: groupId } = group;
//     const { ongoingRound } = gorup.data();
//     const round = await admin.firestore()
//       .collection('groups')
//       .doc(groupId)
//       .collection('rounds')
//       .doc(ongoingRound)
//       .get();
//   })
// })