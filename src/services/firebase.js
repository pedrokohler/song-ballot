import firebase from "firebase";

let firebaseConfig;

const DEV_ENVIRONMENT = process.env.NODE_ENV === "development";

// @ todo refactor
if (DEV_ENVIRONMENT) {
  firebaseConfig = {
    apiKey: "AIzaSyAl8D13_-_lvSWb4680AUCh9bvLjQI4o2I",
    authDomain: "song-ballot-dev.firebaseapp.com",
    databaseURL: "https://song-ballot-dev.firebaseio.com",
    projectId: "song-ballot-dev",
    storageBucket: "song-ballot-dev.appspot.com",
    // messagingSenderId: '605648762660',
    appId: "1:605648762660:web:551ffe5aeda24b94fd25b1",
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyAOY3k262Ehu_BVw9NXPragSxLTwrihQgE",
    authDomain: "song-ballot-95754.firebaseapp.com",
    databaseURL: "https://song-ballot-95754.firebaseio.com",
    projectId: "song-ballot-95754",
    storageBucket: "song-ballot-95754.appspot.com",
    // messagingSenderId: '474008793798',
    appId: "1:474008793798:web:039994ff043b95de4fddc7",
  };
}

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
