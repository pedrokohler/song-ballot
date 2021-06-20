const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {
  initializeUser,
  getYoutubeTitle,
  receiveTelegramBotMessage,
  controlRoundLifecycle,
  checkRoundLifecycleAndMaybeNotifyUsers
} = require("./handlers");

admin.initializeApp();

exports.initializeUser = functions.auth.user().onCreate(initializeUser);

exports.getYoutubeTitle = functions.https.onCall(getYoutubeTitle);

exports.receiveTelegramBotMessage = functions.https.onRequest(receiveTelegramBotMessage);

exports.controlRoundLifecycle = functions.firestore
  .document("groups/{groupId}/rounds/{roundId}")
  .onUpdate(controlRoundLifecycle);

exports.checkRoundLifecycleAndMaybeNotifyUsers = functions.pubsub
  .schedule("1 * * * *")
  .timeZone("America/Sao_Paulo")
  .onRun(checkRoundLifecycleAndMaybeNotifyUsers);