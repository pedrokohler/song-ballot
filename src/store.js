import firebase from "firebase";
import { db } from "./services/firebase";
import { RootStore } from "./models/store";

export const store = RootStore.create({
  authStateChecked: false,
});

// #todo remove for production
window.store = store;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const { uid } = user;
    db.collection("users").doc(uid).get().then(async (doc) => {
      const data = doc.data();
      if (data) {
        const {
          photoURL, displayName, email, groups, telegramChatId,
        } = data;
        store.setCurrentUser({
          photoURL, displayName, id: uid, email, groups: groups || [], telegramChatId,
        });
        await store.setCurrentGroup(groups[0]);
        // @todo fix this so that user can select group
      } else { // first log in
        const { photoURL, displayName, email } = user;
        store.setCurrentUser({
          photoURL,
          displayName,
          id: uid,
          email,
          telegramChatId: null,
          groups: [], // @todo must assure that there's a group
        });
      }
      store.setAuthStateChecked(true);
    });
  } else {
    store.setCurrentUser(null);
    store.setAuthStateChecked(true);
  }
});
