import { types, flow } from "mobx-state-tree";
import { db, DateConverter } from "../services/firebase";

const chunkArray = (array, maxElements) => array
  .reduce((acc, el, i) => {
    const index = Math.floor(i / maxElements);
    const updatedChunk = (acc[index] || []).concat(el);
    return [...acc.slice(0, index), updatedChunk, ...acc.slice(index + 1)];
  }, []);

export const Repository = types.model("respository").actions((self) => ({
  getGroupReference(groupId) {
    return db.collection("groups").doc(groupId);
  },
  getRoundReference(groupId, roundId) {
    return self
      .getGroupReference(groupId)
      .collection("rounds")
      .doc(roundId)
      .withConverter(DateConverter);
  },
  getSongsReference(groupId, roundId) {
    return self.getGroupReference(groupId)
      .collection("songs")
      .where("round", "==", roundId)
      .withConverter(DateConverter);
  },
  getSubmissionsReference(groupId, roundId) {
    return self.getGroupReference(groupId)
      .collection("submissions")
      .where("round", "==", roundId)
      .withConverter(DateConverter);
  },
  getEvaluationsReference(groupId, roundId) {
    return self.getGroupReference(groupId)
      .collection("evaluations")
      .where("round", "==", roundId)
      .withConverter(DateConverter);
  },
  getNextPaginatedRoundReference(groupId, startAfter) {
    return self
      .getGroupReference(groupId)
      .collection("rounds")
      .orderBy("submissionsStartAt", "desc")
      .startAfter(startAfter)
      .limit(1)
      .withConverter(DateConverter);
  },
  fetchGroup: flow(function* fetchGroup(groupId) {
    const groupDoc = yield self.getGroupReference(groupId).get();
    return groupDoc.data();
  }),
  fetchRound: flow(function* fetchRound(groupId, roundId) {
    const roundDoc = yield self.getRoundReference(groupId, roundId).get();
    const round = { id: roundId, ...roundDoc.data() };

    return round;
  }),
  fetchNextPaginatedRound: flow(function* fetchNextPaginatedRound(groupId, startAfter) {
    const roundsSnapshot = yield self.getNextPaginatedRoundReference(groupId, startAfter).get();
    const roundDoc = roundsSnapshot?.docs[0];
    return roundDoc ? { id: roundDoc.id, ...roundDoc.data() } : null;
  }),
  fetchRoundUsers: flow(function* fetchRoundUsers([...userIds]) {
    const generateQueryReference = (batch) => db.collection("users")
      .where("id", "in", batch)
      .withConverter(DateConverter);

    const performQuery = async (queryReference) => {
      const users = await queryReference.get();
      return users.docs.map((user) => user.data());
    };

    const maxUsersPerQuery = 10; // firebase limit for 'in' operator
    const queryReferences = chunkArray(userIds, maxUsersPerQuery)
      .map((ids) => generateQueryReference(ids));

    const userBatches = yield Promise.all(queryReferences
      .map((queryReference) => performQuery(queryReference)));

    return userBatches.reduce((users, batch) => [...users, ...batch], []);
  }),
  fetchRoundSongs: flow(function* fetchRoundSongs(groupId, roundId) {
    const songs = yield self.getSongsReference(groupId, roundId).get();
    return songs.docs.map((song) => song.data());
  }),
  fetchRoundSubmissions: flow(function* fetchRoundSubmissions(groupId, roundId) {
    const submissions = yield self.getSubmissionsReference(groupId, roundId).get();
    return submissions.docs.map((submission) => submission.data());
  }),
  fetchRoundEvaluations: flow(function* fetchRoundEvaluations(groupId, roundId) {
    const evaluations = yield self.getEvaluationsReference(groupId, roundId).get();
    return evaluations.docs.map((evaluation) => evaluation.data());
  }),
}));
