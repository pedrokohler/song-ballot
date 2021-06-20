const admin = require("firebase-admin");

const now = () => admin.firestore.FieldValue.serverTimestamp();

const getFirebaseTimestamp = (date) => {
  return date
  ? admin.firestore.Timestamp.fromDate(date)
  : now()
};

const getGroupsCollection = () => admin.firestore()
  .collection("groups");

const getGroupReference = (id) => getGroupsCollection()
  .doc(id);

const getCollectionReference = (collection) => (groupId) => getGroupReference(groupId)
  .collection(collection);

const getDocReference = (collection) => (groupId, docId) => getCollectionReference(collection)(groupId)
  .doc(docId);

const getUserReference = (id) => admin.firestore().collection("users").doc(id);

const getRoundReference = getDocReference("rounds");

const getEvaluationsReference = getCollectionReference("evaluations");

const getSubmissionsReference = getCollectionReference("submissions");

module.exports = {
  now,
  getGroupsCollection,
  getUserReference,
  getGroupReference,
  getRoundReference,
  getEvaluationsReference,
  getSubmissionsReference,
  getFirebaseTimestamp,
};
