/* eslint-disable import/no-cycle */
import { types } from "mobx-state-tree";
import { User } from "./user";
import { Song } from "./song";
import { Submission } from "./submission";
import { Evaluation } from "./evaluation";
import { rankSubmissions } from "../domain/aggregates/score";

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
}).postProcessSnapshot((snapshot) => ({
  // @todo substitute deprecated postProcessSnapshot for snapshotProcessor
  ...snapshot,
  submissionsStartAt: new Date(snapshot.submissionsStartAt),
  submissionsEndAt: new Date(snapshot.submissionsEndAt),
  evaluationsStartAt: new Date(snapshot.evaluationsStartAt),
  evaluationsEndAt: new Date(snapshot.evaluationsEndAt),
})).views((self) => ({
  get playerRanking() {
    return self.submissions?.slice().sort(rankSubmissions);
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
    addEvaluation(evaluationId) {
      if (!self.evaluations.includes(evaluationId)) {
        self.evaluations = [...self.evaluations, evaluationId];
      }
    },
    addSubmission(submissionId) {
      if (!self.submissions.includes(submissionId)) {
        self.submissions = [...self.submissions, submissionId];
      }
    },
    addSong(songId) {
      if (!self.songs.includes(songId)) {
        self.songs = [...self.songs, songId];
      }
    },
  }));
