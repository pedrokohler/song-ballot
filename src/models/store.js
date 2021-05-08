/* eslint-disable no-param-reassign */
import { types, flow, typecheck } from "mobx-state-tree";

import { User } from "./user";
import { Song } from "./song";
import { Submission } from "./submission";
import { Evaluation } from "./evaluation";
import { Round } from "./round";
import { BaseModel } from "./base";
import { Repository } from "./repository";

export const RootStore = types
  .compose(
    BaseModel,
    Repository,
  )
  .named("RootStore")
  .props({
    authStateChecked: types.boolean,
    currentUser: types.maybeNull(types.reference(User)),
    currentGroup: types.maybeNull(types.string),
    ongoingRound: types.maybe(types.reference(Round)),
    users: types.map(User),
    songs: types.map(Song),
    submissions: types.map(Submission),
    evaluations: types.map(Evaluation),
    rounds: types.map(Round),
  })
  .actions((self) => ({
    addRound({ ...props }) {
      const { id } = props;
      self.rounds.set(id, Round.create(props));
    },
    addUser({ ...props }) {
      const { id } = props;
      self.users.set(id, User.create(props));
    },
    addSong({ ...props }) {
      const { id } = props;
      self.songs.set(id, Song.create(props));
      return self.songs.get(id);
    },
    createSongModel({ ...props }) {
      const { videoId, videoURL, videoTitle } = props;
      const payload = {
        id: videoId,
        url: videoURL,
        title: videoTitle,
        round: self.ongoingRound.id,
        user: self.currentUser.id,
      };
      typecheck(Song, payload);
      const song = Song.create(payload);
      return song;
    },
    addSubmission({ ...props }) {
      const { id } = props;
      self.submissions.set(id, Submission.create(props));
      return self.submissions.get(id);
    },
    createSubmissionModel(videoId) {
      const payload = {
        id: self.generateId(),
        submitter: self.currentUser.id,
        song: videoId,
        evaluations: [],
        round: self.ongoingRound.id,
      };
      typecheck(Submission, payload);
      const submission = Submission.create(payload);
      return submission;
    },
    addEvaluation({ ...props }) {
      const { id } = props;
      const evaluation = Evaluation.create(props);
      self.evaluations.set(id, evaluation);
      return evaluation;
    },
    createEvaluationModel({ submission, ratedFamous, score }) {
      const payload = {
        id: self.generateId(),
        evaluator: self.currentUser.id,
        evaluatee: submission.submitter.id,
        song: submission.song.id,
        score,
        ratedFamous,
        round: self.ongoingRound.id,
      };
      typecheck(Evaluation, payload);
      const evaluation = Evaluation.create(payload);
      return evaluation;
    },
    setOngoingRound(id) {
      self.ongoingRound = id;
    },
    loadOngoingRound: flow(function* loadOngoingRound() {
      const { currentGroup } = self;
      const { ongoingRound: ongoingRoundId } = yield self.fetchGroup(currentGroup);

      const round = yield self.fetchRound(currentGroup, ongoingRoundId);
      yield self.loadRound(round);
      self.setOngoingRound(ongoingRoundId);
    }),
    setCurrentGroup(id) {
      self.currentGroup = id;
    },
    loadRound: flow(function* loadRound(round) {
      const { id: roundId } = round;

      self.addRound(round);
      yield self.loadUsers(round.users);
      yield self.loadRoundSongs(roundId);
      yield self.loadRoundSubmissions(roundId);
      yield self.loadRoundEvaluations(roundId);
    }),
    setTelegramChatId: flow(function* setTelegramChatId(telegramChatId) {
      const { groups: groupIds, telegramChatId: oldChatId } = self.currentUser;
      yield Promise.all(groupIds.map(async (groupId) => {
        const groupData = await self.fetchGroup(groupId);
        const otherChatIds = groupData.telegramChatIds.filter((id) => id !== oldChatId);
        const newChatIds = [...otherChatIds, telegramChatId];
        return self.getGroupReference(groupId).update({ telegramChatIds: newChatIds });
      }));
      yield self.getUserReference(self.currentUser.id).update({ telegramChatId });
      self.currentUser.telegramChatId = telegramChatId;
    }),
    maybeLoadNextPaginatedRound: flow(function* maybeLoadNextPaginatedRound(startAfter) {
      const round = yield self.fetchNextPaginatedRound(self.currentGroup, startAfter);

      if (round) {
        yield self.loadRound(round);
      }
    }),
    setAuthStateChecked(status) {
      self.authStateChecked = status;
    },
    setCurrentUser(user) {
      if (user) {
        if (!self.users.get(user.id)) {
          self.users.set(user.id, User.create(user));
        }
        self.currentUser = user.id;
      } else {
        self.currentUser = null;
      }
    },
    loadUsers: flow(function* loadUsers([...userIds]) {
      const users = yield self.fetchRoundUsers(userIds);
      users.forEach((user) => self.addUser(user));
    }),
    loadRoundSongs: flow(function* loadRoundSongs(roundId) {
      const songs = yield self.fetchRoundSongs(self.currentGroup, roundId);
      songs.forEach((song) => self.addSong(song));
    }),
    loadRoundSubmissions: flow(function* loadRoundSubmissions(roundId) {
      const submissions = yield self.fetchRoundSubmissions(self.currentGroup, roundId);
      submissions.forEach((submission) => self.addSubmission(submission));
    }),
    loadRoundEvaluations: flow(function* loadRoundEvaluations(roundId) {
      const evaluations = yield self.fetchRoundEvaluations(self.currentGroup, roundId);
      evaluations.forEach((evaluation) => self.addEvaluation(evaluation));
    }),
  }));
