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
    currentGroup: types.maybeNull(types.string), // @todo check if this is the best option
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
    addEvaluation({ ...props }) {
      const { id } = props;
      const evaluation = Evaluation.create(props);
      self.evaluations.set(id, evaluation);
      return evaluation;
    },
    setOngoingRound(id) {
      self.ongoingRound = id;
    },
    setCurrentGroup(id) {
      self.currentGroup = id;
    },
    getOngoingRound() {
      return new Promise((resolve, reject) => {
        db.collection('groups')
          .doc(self.currentGroup)
          .get()
          .then((groupDoc) => {
            const { ongoingRound: ongoingRoundId } = groupDoc.data();
            db.collection('groups').doc(self.currentGroup).collection('rounds').doc(ongoingRoundId)
              .withConverter(DateConverter)
              .get()
              .then(async (roundDoc) => {
                const ongoingRound = { id: ongoingRoundId, ...roundDoc.data() };
                self.addRound(ongoingRound);
                self.setOngoingRound(ongoingRoundId);
                await self.loadRoundUsers(ongoingRound.users);
                await self.loadRoundSongs(ongoingRoundId);
                await self.loadRoundSubmissions(ongoingRoundId);
                await self.loadRoundEvaluations(ongoingRoundId);
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
    loadRoundUsers([...userIds]) {
      return new Promise((resolve, reject) => {
        db.collection('users')
          .where('id', 'in', userIds)
          .withConverter(DateConverter)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const user = doc.data();
              self.addUser(user);
            });
            resolve();
          })
          .catch(reject);
      });
    },
    loadRoundSongs(roundId) {
      return new Promise((resolve, reject) => {
        db.collection('groups')
          .doc(self.currentGroup)
          .collection('songs')
          .where('round', '==', roundId)
          .withConverter(DateConverter)
          .get()
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
        db.collection('groups')
          .doc(self.currentGroup)
          .collection('submissions')
          .where('round', '==', roundId)
          .withConverter(DateConverter)
          .get()
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
    loadRoundEvaluations(roundId) {
      return new Promise((resolve, reject) => {
        db.collection('groups')
          .doc(self.currentGroup)
          .collection('evaluations')
          .where('round', '==', roundId)
          .withConverter(DateConverter)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const evaluation = doc.data();
              self.addEvaluation(evaluation);
            });
            resolve();
          })
          .catch(reject);
      });
    },

  }));
