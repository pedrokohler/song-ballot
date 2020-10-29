const admin = require("firebase-admin");

const now = () => admin.firestore.FieldValue.serverTimestamp();

const getGroupRef = id => admin.firestore()
.collection("groups")
.doc(id);

const getCollectionRef = (collection) => (groupId) => getGroupRef(groupId)
.collection(collection);

const getDocRef = (collection) => (groupId, docId) => getCollectionRef(collection)(groupId)
.doc(docId);

const getUserRef = id => admin.firestore().collection("users").doc(id);

const getRoundRef = getDocRef("rounds");

const getEvaluationsRef = getCollectionRef("evaluations");

module.exports  = {
    now,
    getUserRef,
    getGroupRef,
    getRoundRef,
    getEvaluationsRef,
}