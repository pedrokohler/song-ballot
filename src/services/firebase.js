import firebase from 'firebase';
let firebaseConfig;

const DEV_ENVIRONMENT = process.env.NODE_ENV === "development" ? true : false;

if (DEV_ENVIRONMENT) {
  firebaseConfig = {
    apiKey: 'AIzaSyBBvhAAFgt6_DA3hztxyQntQxMEQLjLsV8',
    authDomain: 'ms-bruxao-dev.firebaseapp.com',
    databaseURL: 'https://ms-bruxao-dev.firebaseio.com',
    projectId: 'ms-bruxao-dev',
    storageBucket: 'ms-bruxao-dev.appspot.com',
    messagingSenderId: '531232326443',
    appId: '1:531232326443:web:48595513b561b20556bb6e',
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
export const db = firebase.firestore();

