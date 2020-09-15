/* eslint-disable import/no-cycle */
import { types } from 'mobx-state-tree';
import { User } from './user';
import { Evaluation } from './evaluation';
import { DefaultModel } from './default';
import { Song } from './song';
import { Round } from './round';

export const Submission = types
  .compose(DefaultModel)
  .named('Submission')
  .props({
    submitter: types.reference(User),
    song: types.reference(types.late(() => Song)),
    evaluations: types.array(types.reference(Evaluation)),
    round: types.reference(types.late(() => Round)),
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
      const penalty = self.isFamous() ? 1 : 0;
      const basePoints = self.numberOfEvaluations() ? self.total() / self.numberOfEvaluations() : 0;
      return basePoints - penalty;
    },
    isFamous() {
      return self.numberOfEvaluations() / this.timesRatedFamous() > 0.5;
    },
  }))
  .actions((self) => ({
    addEvaluation(evaluation) {
      if (!self.evaluations.includes(evaluation)) {
        self.evaluations.push(evaluation);
      }
    },
  }));
