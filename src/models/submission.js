/* eslint-disable import/no-cycle */
import { types } from "mobx-state-tree";
import { User } from "./user";
import { Evaluation } from "./evaluation";
import { DefaultModel } from "./default";
import { Song } from "./song";
import { Round } from "./round";

export const Submission = types
  .compose(DefaultModel)
  .named("Submission")
  .props({
    submitter: types.reference(User),
    song: types.reference(types.late(() => Song)),
    evaluations: types.array(types.reference(Evaluation)),
    round: types.reference(types.late(() => Round)),
  })
  .views((self) => ({
    get numberOfEvaluations() {
      return self.evaluations?.length;
    },
    get timesRatedFamous() {
      return self.evaluations?.reduce((total, ev) => (ev.ratedFamous ? total + 1 : total), 0);
    },
    get total() {
      return self.evaluations?.reduce((total, ev) => total + ev.score, 0);
    },
    get points() {
      const penalty = self.isFamous ? 1 : 0;
      const basePoints = self.numberOfEvaluations ? self.total / self.numberOfEvaluations : 0;
      return basePoints - penalty;
    },
    get isFamous() {
      return self.timesRatedFamous / (self.numberOfEvaluations || 1) > 0.5;
    },
  }))
  .actions((self) => ({
    addEvaluation(evaluation) {
      if (!self.evaluations.includes(evaluation)) {
        self.evaluations = [...self.evaluations, evaluation];
      }
    },
  }));
