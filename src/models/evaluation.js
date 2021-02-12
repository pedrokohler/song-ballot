import { types } from "mobx-state-tree";
import { User } from "./user";
// eslint-disable-next-line import/no-cycle
import { Song } from "./song";
// eslint-disable-next-line import/no-cycle
import { Round } from "./round";
import { BaseModel } from "./base";
import { MAX_SCORE_ALLOWED, MIN_SCORE_ALLOWED } from "../domain/aggregates/score";

export const Evaluation = types
  .compose(BaseModel)
  .named("Evaluation")
  .props({
    evaluator: types.reference(User),
    evaluatee: types.reference(User),
    song: types.reference(types.late(() => Song)),
    score: types.refinement(
      types.integer, (value) => value >= MIN_SCORE_ALLOWED && value <= MAX_SCORE_ALLOWED,
    ),
    ratedFamous: types.boolean,
    round: types.reference(types.late(() => Round)),
  });
