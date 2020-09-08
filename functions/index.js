const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

exports.initializeUser = functions.auth.user().onCreate((user) => {
  const {
    uid: id, displayName, email, photoURL
  } = user;
  admin.firestore().collection('users').doc(id).set({
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
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items(id%2Csnippet)&key=${apiKey}`;

    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        const { title } = response.data.items[0].snippet;
        return resolve(title);
      }).catch(e => {
        console.log(e.message);
        return reject(e);
      });
    })
  }
  return { error: "Unauthenticated user" }
});

exports.controlSubmissionLimits = functions.firestore
.document("groups/{groupId}/submissions/{submissionId}")
.onWrite(async (change, context) => {
  const { groupId } = context.params;
  const { round: ongoingRound} = change.after.data();

  const roundRef = admin.firestore()
  .collection('groups')
  .doc(groupId)
  .collection('rounds')
  .doc(ongoingRound);

  const round = await roundRef.get();

  const { users, lastWinner } = round.data();
  const usersQuantity = users.length;

  const submissions = await admin.firestore()
  .collection('groups')
  .doc(groupId)
  .collection('submissions')
  .where('round', '==', ongoingRound)
  .get();

  const submissionsQuantity = submissions.size;
  const submissionsTarget = usersQuantity + (lastWinner ? 1 : 0);

  if(submissionsTarget === submissionsQuantity) {
    const now = admin.firestore.FieldValue.serverTimestamp();
    await roundRef.update({ submissionsEndAt: now, evaluationsStartAt: now });
  }
});


exports.controlEvaluationLimits = functions.firestore
//Está criando rounds duplicados porque criam-se vários evaluations no final da votação
.document("groups/{groupId}/rounds/{roundId}")
.onWrite(async (change, context) => {
  const { groupId, roundId: ongoingRound } = context.params;
  const { voteCount } = change.after.data();

  if(change.before.data().voteCount === voteCount){
    return;
  }

  const roundRef = admin.firestore()
  .collection('groups')
  .doc(groupId)
  .collection('rounds')
  .doc(ongoingRound);

  const round = await roundRef.get();

  const { users } = round.data();

  const evaluations = await admin.firestore()
  .collection('groups')
  .doc(groupId)
  .collection('evaluations')
  .where('round', '==', ongoingRound)
  .get();


  const everyoneVoted = users.length === voteCount

  if(everyoneVoted) {
    const now = admin.firestore.FieldValue.serverTimestamp();
    await roundRef.update({ evaluationsEndAt: now });
    // await calculateRoundResults();
    await startNewRound(groupId, "3v4606jtucM7GlXBGO4IBgHycdI2");
  }
});


const startNewRound = async (groupId, lastWinner) => {
  const now = admin.firestore.FieldValue.serverTimestamp();
  const groupRef = admin.firestore()
  .collection('groups')
  .doc(groupId);

  const group = await groupRef.get();

  const { users } = group.data();

  const round = await groupRef.collection('rounds').add({
    submissionsStartAt: now,
    submissionsEndAt: getDayOfNextWeekWithTime('tuesday', 15, 0, 0),
    evaluationsStartAt: getDayOfNextWeekWithTime('tuesday', 15, 0, 1),
    evaluationsEndAt: getDayOfNextWeekWithTime('sunday', 23, 0, 0),
    users: users || [],
    lastWinner,
    voteCount: 0
  });

  await groupRef.collection('settings').doc('ongoingRound').set({
    id: round.id,
  });
}

const getDayOfNextWeekWithTime = (dayName, hours, minutes, seconds) => {
  const nextSunday = getNextDayOfWeek('sunday', false);
  const nextDay = getNextDayOfWeek(dayName, true, nextSunday);
  nextDay.setHours(hours, minutes, seconds);
  return admin.firestore.Timestamp.fromDate(nextDay);
}

const getNextDayOfWeek = (dayName, excludeToday = true, refDate = new Date()) => {
  const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                    .indexOf(dayName.slice(0,3).toLowerCase());
  if (dayOfWeek < 0) return null;
  refDate.setHours(0,0,0,0);
  refDate.setDate(refDate.getDate() + !!excludeToday +
                  (dayOfWeek + 7 - refDate.getDay() - !!excludeToday) % 7);
  return refDate;
}