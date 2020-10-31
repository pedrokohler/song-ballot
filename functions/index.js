const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const {
  now: firebaseNow,
  getGroupRef,
  getUserRef,
  getRoundRef,
  getEvaluationsRef,
} = require("./helpers/firebase");
const {
  getDayOfNextWeekWithTime,
} = require("./helpers/time");

admin.initializeApp();

exports.initializeUser = functions.auth.user().onCreate(async (user) => {
  const {
    uid: id, displayName, email, photoURL
  } = user;
  await getUserRef(id).set({
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

        if(hasFoundSong){
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

    if(oldVoteCount !== voteCount){
      await handleNewVote({
        groupId,
        roundId,
        round: change.after.data(),
      });
      return;
    }

    if(oldSubmissions.length !== submissions.length){
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
  const { users, voteCount } = round;
  const everyoneVoted = users.length === voteCount

  if(everyoneVoted) {
    await finishRound(groupId, roundId);
  }
}

const finishRound = async (groupId, roundId) => {
  const lastWinner = await computeRoundWinner(groupId, roundId);
  await updateRoundEvaluationsEndAt(groupId, roundId);
  await startNewRound(groupId, lastWinner);
}

const updateRoundEvaluationsEndAt = async (groupId, roundId) => {
  const now = firebaseNow();
  const roundRef = getRoundRef(groupId, roundId);
  await roundRef.update({ evaluationsEndAt: now });
}

const computeRoundWinner = async (groupId, roundId) => {
  const evaluations = await getEvaluationsRef(groupId)
  .where("round", "==", roundId)
  .get();

  const results = evaluations.docs.reduce((results, doc) => {
    const ev = doc.data();
    const songId = ev.song;
    if (results[songId]) {
      return {
        ...results,
        [songId]: updateVoteCounting(results[songId], ev)
      };
    }
    return {
      ...results,
      [songId]: initializeVoteCounting(ev)
    }
  }, {});

  const lastWinner = Object.values(results).sort((a, b) => b.finalScore - a.finalScore)[0];
  return lastWinner.user;
}

const initializeVoteCounting = (evaluation) => {
  const penalty = evaluation.ratedFamous ? -1: 0;
  return {
    user: evaluation.evaluatee,
    ratedFamous: evaluation.ratedFamous ? 1 : 0,
    penalty: penalty,
    points: evaluation.score,
    timesVoted: 1,
    finalScore: evaluation.score + penalty,
  }
}

const updateVoteCounting = (lastState, evaluation) => {
  const points = lastState.points + evaluation.score;
  const ratedFamous = lastState.ratedFamous + evaluation.ratedFamous ? 1 : 0;
  const timesVoted = lastState.timesVoted + 1;
  const penalty = calculatePenalty({ ratedFamous, timesVoted });

  return {
    ...lastState,
    points,
    ratedFamous,
    timesVoted,
    penalty,
    finalScore: calculateFinalScore({ points, timesVoted, penalty }),
  }
}

const calculateFinalScore = ({ points, timesVoted, penalty }) => {
  return Math.round((points / timesVoted + Number.EPSILON) * 100) / 100 + penalty;
}

const calculatePenalty = ({ ratedFamous, timesVoted }) => {
  return ratedFamous / timesVoted > 0.5 ? -1 : 0;
}


const startNewRound = async (groupId, lastWinner) => {
  const now = firebaseNow();
  const groupRef = getGroupRef(groupId);

  const group = await groupRef.get();
  const { users } = group.data();

  const round = await groupRef.collection("rounds").add({
    submissionsStartAt: now,
    submissionsEndAt: getDayOfNextWeekWithTime("tuesday", 15, 0, 0),
    evaluationsStartAt: getDayOfNextWeekWithTime("tuesday", 15, 0, 1),
    evaluationsEndAt: getDayOfNextWeekWithTime("sunday", 23, 0, 0),
    submissions: [],
    evaluations: [],
    songs: [],
    users: users || [],
    lastWinner,
    voteCount: 0
  });

  await groupRef.update({
    ongoingRound: round.id,
  });
}

const handleNewSubmission = async ({
  groupId,
  roundId,
  round
}) => {
  const { users, lastWinner, submissions } = round;
  const usersQuantity = users.length;

  const submissionsQuantity = submissions.length;
  const submissionsTarget = usersQuantity + (lastWinner ? 1 : 0);

  if(submissionsTarget === submissionsQuantity) {
    await startRoundEvaluationPeriod(groupId, roundId);
  }
}

const startRoundEvaluationPeriod = async (groupId, roundId) => {
  const now = firebaseNow();
  const roundRef = getRoundRef(groupId, roundId);
  await roundRef.update({ submissionsEndAt: now, evaluationsStartAt: now });
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