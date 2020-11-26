/* eslint-disable import/no-cycle */
import { types } from "mobx-state-tree";
import { User } from "./user";
import { Evaluation } from "./evaluation";
import { BaseModel } from "./base";
import { Song } from "./song";
import { Round } from "./round";

import {
  getSubmissionRatedFamousCount,
  getSubmissionTotalScore,
  getSubmissionPenalty,
  getSubmissionsPoints,
} from "../domain/aggregates/score";

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
    get timesRatedFamous() {
      return getSubmissionRatedFamousCount(self.evaluations);
    },
    get total() {
      return getSubmissionTotalScore(self.evaluations);
    },
    get penalty() {
      return getSubmissionPenalty(self.evaluations);
    },
    get points() {
      return getSubmissionsPoints(self.evaluations);
    },
  }))
  .actions((self) => ({
    addEvaluation(evaluation) {
      if (!self.evaluations.includes(evaluation)) {
        self.evaluations = [...self.evaluations, evaluation];
      }
    },
  }));
