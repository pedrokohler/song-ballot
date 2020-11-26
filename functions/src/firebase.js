const admin = require("firebase-admin");

const now = () => admin.firestore.FieldValue.serverTimestamp();

const getFirebaseTimestamp = (date) => {
  return date
  ? admin.firestore.Timestamp.fromDate(date)
  : now()
};

const getGroupReference = (id) => admin.firestore()
  .collection("groups")
  .doc(id);

const getCollectionReference = (collection) => (groupId) => getGroupReference(groupId)
  .collection(collection);

const getDocReference = (collection) => (groupId, docId) => getCollectionReference(collection)(groupId)
  .doc(docId);

const getUserReference = (id) => admin.firestore().collection("users").doc(id);

const getRoundReference = getDocReference("rounds");

const getEvaluationsReference = getCollectionReference("evaluations");

module.exports = {
  now,
  getUserReference,
  getGroupReference,
  getRoundReference,
  getEvaluationsReference,
  getFirebaseTimestamp,
};
