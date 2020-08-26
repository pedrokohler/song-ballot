import firebase from 'firebase';

let firebaseConfig;

const DEV_ENVIRONMENT = process.env.NODE_ENV === 'development';

if (DEV_ENVIRONMENT) {
  firebaseConfig = {
    apiKey: 'AIzaSyAl8D13_-_lvSWb4680AUCh9bvLjQI4o2I',
    authDomain: 'song-ballot-dev.firebaseapp.com',
    databaseURL: 'https://song-ballot-dev.firebaseio.com',
    projectId: 'song-ballot-dev',
    storageBucket: 'song-ballot-dev.appspot.com',
    messagingSenderId: '605648762660',
    appId: '1:605648762660:web:551ffe5aeda24b94fd25b1',
  };
} else {
  firebaseConfig = {
    apiKey: 'AIzaSyAW6ngeVRTeNRsvhxJj0bBz2Dj8o_qI6yY',
    authDomain: 'ms-bruxao.firebaseapp.com',
    databaseURL: 'https://ms-bruxao.firebaseio.com',
    projectId: 'ms-bruxao',
    storageBucket: 'ms-bruxao.appspot.com',
    messagingSenderId: '747982556462',
    appId: '1:747982556462:web:a1c8bb6a9b722f3f19bebf',
  };
}

firebase.initializeApp(firebaseConfig);
// @todo remove this for production
window.firebase = firebase;

export const db = firebase.firestore();

export const handleGoogleSignIn = (e) => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().signInWithRedirect(provider);
};
