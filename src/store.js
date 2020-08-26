import firebase from 'firebase';
import { db } from './services/firebase';
import { RootStore } from './models/store';

export const store = RootStore.create({
  authStateChecked: false,
});

// #todo remove for production
window.store = store;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const { uid } = user;
    db.collection('users').doc(uid).get().then((doc) => {
      const data = doc.data();
      if (data) {
        const {
          photoURL, displayName, email,
        } = data;
        store.setCurrentUser({
          photoURL, displayName, id: uid, email,
        });
      } else {
        const { photoURL, displayName, email } = user;
        store.setCurrentUser({
          photoURL, displayName, id: uid, email,
        });
      }
      store.setAuthStateChecked(true);
    });
  } else {
    store.setCurrentUser(null);
    store.setAuthStateChecked(true);
  }
});
