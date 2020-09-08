/* eslint-disable import/no-cycle */
import { types } from 'mobx-state-tree';
import { User } from './user';
import { Song } from './song';
import { Submission } from './submission';
import { Evaluation } from './evaluation';

export const Round = types.model({
  id: types.identifier,
  users: types.array(types.reference(User)),
  songs: types.array(types.late(() => types.reference(Song))),
  lastWinner: types.maybeNull(types.reference(User)),
  submissions: types.array(types.reference(Submission)),
  evaluations: types.array(types.reference(Evaluation)),
  submissionsStartAt: types.Date,
  submissionsEndAt: types.Date,
  evaluationsStartAt: types.Date,
  evaluationsEndAt: types.Date,
})
  .views((self) => ({
    playerRanking() {
      return self.submissions.sort((a, b) => b.points - a.points);
    },
    firstPlace() {
      return self.playerRanking && self.playerRanking[0];
    },
    secondPlace() {
      return self.playerRanking && self.playerRanking[1];
    },
    lastPlace() {
      return self.submissions.length && self.playerRanking[self.submissions.length - 1];
    },
  }))
  .actions((self) => ({
    addEvaluation(evaluation) {
      if (!self.evaluations.includes(evaluation)) {
        self.evaluations.push(evaluation);
      }
    },
  }));
