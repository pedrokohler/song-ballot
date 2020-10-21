import { types } from "mobx-state-tree";
import { User } from "./user";
// eslint-disable-next-line import/no-cycle
import { Song } from "./song";
// eslint-disable-next-line import/no-cycle
import { Round } from "./round";
import { DefaultModel } from "./default";

export const Evaluation = types
  .compose(DefaultModel)
  .named("Evaluation")
  .props({
    evaluator: types.reference(User),
    evaluatee: types.reference(User),
    song: types.reference(types.late(() => Song)),
    score: types.refinement(types.integer, (value) => value >= 1 && value <= 10),
    ratedFamous: types.boolean,
    round: types.reference(types.late(() => Round)),
  });
