/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';
import { db } from '../services/firebase';
import { User } from './user';
import { Song } from './song';
import { Submission } from './submission';
import { Evaluation } from './evaluation';
import { Round } from './round';

const RoundConverter = {
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
};

export const RootStore = types.model('RootStore', {
  authStateChecked: types.boolean,
  currentUser: types.maybeNull(types.reference(User)),
  ongoingRound: types.maybe(types.reference(Round)),
  users: types.map(User),
  songs: types.map(Song),
  submissions: types.map(Submission),
  evaluations: types.map(Evaluation),
  rounds: types.map(Round),
})
  .actions((self) => ({
    addUser({ ...props }) {
      const { id } = props;
      self.users.set(id, User.create(props));
    },
    addSong({ ...props }) {
      const { id } = props;
      self.songs.set(id, Song.create(props));
    },
    addRound({ ...props }) {
      const { id } = props;
      self.rounds.set(id, Round.create(props));
    },
    setOngoingRound(id) {
      self.ongoingRound = id;
    },
    getOngoingRound() {
      db.collection('settings').doc('ongoingRound').get().then((ongoingRoundDoc) => {
        const { id: ongoingRoundId } = ongoingRoundDoc.data();
        db.collection('rounds').doc(ongoingRoundId).withConverter(RoundConverter).get()
          .then((roundDoc) => {
            const ongoingRound = { id: ongoingRoundId, ...roundDoc.data() };
            self.addRound(ongoingRound);
            self.setOngoingRound(ongoingRoundId);
          });
      });
    },
    setAuthStateChecked(status) {
      self.authStateChecked = status;
    },
    setCurrentUser(user) {
      if (user) {
        if (!self.users.get(user.id)) {
          self.users.set(user.id, User.create(user));
        }
        self.currentUser = user.id;
      } else {
        self.currentUser = null;
      }
    },

  }));
