import { types } from 'mobx-state-tree';
import { User } from './user';
import { Evaluation } from './evaluation';
import { Song } from './song';

export const Submission = types.model({
  id: types.identifier,
  submitterId: types.reference(User),
  songId: types.reference(Song),
  evaluations: types.array(types.reference(Evaluation)),
})
  .views((self) => ({
    numberOfEvaluations() {
      return self.evaluations.length;
    },
    timesRatedFamous() {
      return self.evaluations.reduce((total, ev) => (ev.ratedFamous ? total + 1 : total), 0);
    },
    total() {
      return self.evaluations.reduce((total, ev) => total + ev.score, 0);
    },
    points() {
      const penalty = self.isFamous ? 1 : 0;
      const basePoints = self.numberOfEvaluations ? self.total / self.numberOfEvaluations : 0;
      return basePoints - penalty;
    },
    isFamous() {
      return self.numberOfEvaluations / this.timesRatedFamous > 0.5;
    },
  }));
