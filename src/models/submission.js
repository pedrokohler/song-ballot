/* eslint-disable import/no-cycle */
import { types } from "mobx-state-tree";
import { User } from "./user";
import { Evaluation } from "./evaluation";
import { BaseModel } from "./base";
import { Song } from "./song";
import { Round } from "./round";

export const Submission = types
  .compose(BaseModel)
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
      return self.evaluations
        ?.reduce((total, evaluation) => (evaluation.ratedFamous ? total + 1 : total), 0);
    },
    get total() {
      return self.evaluations
        ?.reduce((total, evaluation) => total + evaluation.score, 0);
    },
    get penalty() {
      return self.isFamous ? 1 : 0;
    },
    get points() {
      const { penalty } = self;
      const basePoints = self.numberOfEvaluations
        ? (self.total / self.numberOfEvaluations + Number.EPSILON)
        : 0;
      const roundedPoints = Math.round(100 * basePoints) / 100;
      return roundedPoints - penalty;
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
