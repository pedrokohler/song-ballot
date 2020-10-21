/* eslint-disable import/no-cycle */
import { types } from "mobx-state-tree";
import { User } from "./user";
import { Song } from "./song";
import { Submission } from "./submission";
import { Evaluation } from "./evaluation";

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
    get playerRanking() {
      return self.submissions?.slice().sort((a, b) => b.points - a.points);
    },
    get firstPlace() {
      return self.playerRanking?.[0];
    },
    get secondPlace() {
      return self.playerRanking?.[1];
    },
    get lastPlace() {
      const lastIndex = self.submissions?.length - 1;
      return lastIndex >= 0 && self.playerRanking?.[lastIndex];
    },
  }))
  .actions((self) => ({
    addEvaluation(evaluation) {
      if (!self.evaluations.includes(evaluation)) {
        self.evaluations.push(evaluation);
      }
    },
  }));
