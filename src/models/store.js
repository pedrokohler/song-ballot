/* eslint-disable no-param-reassign */
import { types, flow, typecheck } from "mobx-state-tree";

import { db, DateConverter } from "../services/firebase";
import { User } from "./user";
import { Song } from "./song";
import { Submission } from "./submission";
import { Evaluation } from "./evaluation";
import { Round } from "./round";
import { BaseModel } from "./base";

const chunkArray = (array, maxElements) => array
  .reduce((acc, el, i) => {
    const index = Math.floor(i / maxElements);
    const updatedChunk = (acc[index] || []).concat(el);
    return [...acc.slice(0, index), updatedChunk, ...acc.slice(index + 1)];
  }, []);

export const RootStore = types
  .compose(BaseModel)
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
    addRound({ ...props }) {
      const { id } = props;
      self.rounds.set(id, Round.create(props));
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
    setCurrentGroup(id) {
      self.currentGroup = id;
    },
    getCurrentGroupReference() {
      return db.collection("groups").doc(self.currentGroup);
    },
    getRoundReference(roundId) {
      return self
        .getCurrentGroupReference()
        .collection("rounds")
        .doc(roundId)
        .withConverter(DateConverter);
    },
    fetchAndLoadRound: flow(function* fetchAndLoadRound(roundId) {
      const roundDoc = yield self.getRoundReference(roundId).get();
      const round = { id: roundId, ...roundDoc.data() };

      yield self.loadRound(round);
    }),
    fetchNextPaginatedRound: flow(function* fetchPaginatedRound(startAfter) {
      const roundsSnapshot = yield self
        .getCurrentGroupReference()
        .collection("rounds")
        .orderBy("submissionsStartAt", "desc")
        .startAfter(startAfter)
        .limit(1)
        .withConverter(DateConverter)
        .get();

      const roundDoc = roundsSnapshot.docs[0];

      if (roundDoc) {
        const round = { id: roundDoc.id, ...roundDoc.data() };

        yield self.loadRound(round);
      }
    }),
    loadRound: flow(function* loadRound(round) {
      const { id: roundId } = round;

      self.addRound(round);
      yield self.loadRoundUsers(round.users);
      yield self.loadRoundSongs(roundId);
      yield self.loadRoundSubmissions(roundId);
      yield self.loadRoundEvaluations(roundId);
    }),
    getOngoingRound: flow(function* getOngoingRound() {
      const groupDoc = yield self.getCurrentGroupReference().get();
      const { ongoingRound: ongoingRoundId } = groupDoc.data();

      yield self.fetchAndLoadRound(ongoingRoundId);
      self.setOngoingRound(ongoingRoundId);
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
    loadRoundUsers([...userIds]) {
      const generateQueryReference = (batch) => db.collection("users")
        .where("id", "in", batch)
        .withConverter(DateConverter);

      const performQueryAndUpdateStore = async (queryReference) => {
        const users = await queryReference.get();
        users.forEach((user) => self.addUser(user.data()));
      };

      const maxUsersPerQuery = 10; // firebase limit for 'in' operator
      const queryReferences = chunkArray(userIds, maxUsersPerQuery)
        .map((ids) => generateQueryReference(ids));

      return Promise.all(queryReferences
        .map((queryReference) => performQueryAndUpdateStore(queryReference)));
    },
    getSongsReference(roundId) {
      return self.getCurrentGroupReference()
        .collection("songs")
        .where("round", "==", roundId)
        .withConverter(DateConverter);
    },
    loadRoundSongs(roundId) {
      return self.getSongsReference(roundId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const song = doc.data();
            self.addSong(song);
          });
        });
    },
    getSubmissionsReference(roundId) {
      return self.getCurrentGroupReference()
        .collection("submissions")
        .where("round", "==", roundId)
        .withConverter(DateConverter);
    },
    loadRoundSubmissions(roundId) {
      return self.getSubmissionsReference(roundId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const submission = doc.data();
            self.addSubmission(submission);
          });
        });
    },
    getEvaluationsReference(roundId) {
      return self.getCurrentGroupReference()
        .collection("evaluations")
        .where("round", "==", roundId)
        .withConverter(DateConverter);
    },
    loadRoundEvaluations(roundId) {
      return this.getEvaluationsReference(roundId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const evaluation = doc.data();
            self.addEvaluation(evaluation);
          });
        });
    },
  }));
