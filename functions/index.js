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
})