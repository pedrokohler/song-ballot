/* eslint-disable no-param-reassign */
import { types } from 'mobx-state-tree';

import { db, DateConverter } from '../services/firebase';
import { User } from './user';
import { Song } from './song';
import { Submission } from './submission';
import { Evaluation } from './evaluation';
import { Round } from './round';
import { DefaultModel } from './default';

export const RootStore = types
  .compose(DefaultModel)
  .named('RootStore')
  .props({
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
      return self.songs.get(id);
    },
    addSubmission({ ...props }) {
      const { id } = props;
      self.submissions.set(id, Submission.create(props));
      return self.submissions.get(id);
    },
    addRound({ ...props }) {
      const { id } = props;
      self.rounds.set(id, Round.create(props));
    },
    setOngoingRound(id) {
      self.ongoingRound = id;
    },
    getOngoingRound() {
      return new Promise((resolve, reject) => {
        db.collection('settings').doc('ongoingRound').get().then((ongoingRoundDoc) => {
          const { id: ongoingRoundId } = ongoingRoundDoc.data();
          db.collection('rounds').doc(ongoingRoundId).withConverter(DateConverter).get()
            .then(async (roundDoc) => {
              const ongoingRound = { id: ongoingRoundId, ...roundDoc.data() };
              if (!self.users.get(ongoingRound.lastWinner)) {
                const lastWinnerDoc = await db.collection('users').doc(ongoingRound.lastWinner).get();
                self.addUser(lastWinnerDoc.data());
              }
              self.addRound(ongoingRound);
              self.setOngoingRound(ongoingRoundId);
              return resolve();
            });
        })
          .catch(reject);
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
    loadRoundSongs(roundId) {
      return new Promise((resolve, reject) => {
        db.collection('songs').where('round', '==', roundId).withConverter(DateConverter).get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const song = doc.data();
              self.addSong(song);
            });
            resolve();
          })
          .catch(reject);
      });
    },
    loadRoundSubmissions(roundId) {
      return new Promise((resolve, reject) => {
        db.collection('submissions').where('round', '==', roundId).withConverter(DateConverter).get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const submission = doc.data();
              self.addSubmission(submission);
            });
            resolve();
          })
          .catch(reject);
      });
    },

  }));
