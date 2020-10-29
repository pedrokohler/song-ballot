import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

// @todo remove this for real app
window.firebase = firebase;

export const db = firebase.firestore();

export const handleGoogleSignIn = (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

export const DateConverter = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    const newData = Object.keys(data).reduce((obj, key) => {
      if (data[key].toDate) {
        return { ...obj, [key]: data[key].toDate() };
      }
      return obj;
    }, data);
    return newData;
  },
  toFirestore(data) {
    const newData = Object.keys(data).reduce((obj, key) => {
      if (data[key] instanceof Date) {
        return { ...obj, [key]: firebase.firestore.Timestamp.fromDate(data[key]) };
      }
      return obj;
    }, data);
    return newData;
  },
};

export const fetchYoutubeVideoTitle = (videoId) => {
  const getYoutubeTitle = firebase.functions().httpsCallable("getYoutubeTitle");
  return getYoutubeTitle({ videoId })
    .then((response) => response.data);
};
