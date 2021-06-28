const functions = require("firebase-functions");
const axios = require("axios");
const {
  getGroupReference,
  getUserReference,
} = require("./firebase");

const SUBMISSION_PERIOD_FINISHED_KEY = "notifications:submission_period_finished";
const EVALUATION_PERIOD_FINISHED_KEY = "notifications:evaluation_period_finished";
const STAGE_ABOUT_TO_FINISH_KEY = "notifications:stage_about_to_finish";
const NEW_SUBMISSION_KEY = "notifications:new_submission";
const NEW_EVALUATION_KEY = "notifications:new_evaluation";

const messageMap = new Map ([
  [SUBMISSION_PERIOD_FINISHED_KEY, {
    messageGenerator: (group) => `Submission period just finished in ${group.name}.\n\n`
    + "Everyone can already start voting!",
    messageTag: "submissionPeriodFinished"
  }],
  [STAGE_ABOUT_TO_FINISH_KEY, {
    messageGenerator: (stage, action, hours) => (group) =>
      `${stage} period will finish in less than ${hours}h in ${group.name}.\n\n`
      + `If you haven't ${action} yet do it quickly!`,
    messageTag: (stage, hours) => `${stage.toLowerCase()}PeriodAboutToFinish:${hours}`
  }],
  [EVALUATION_PERIOD_FINISHED_KEY, {
    messageGenerator: (group, user) =>
      `Round just finished in ${group.name}. The winner was ${user.displayName}\n\n`
      + `Congratulations, ${user.displayName}!\n\n`
      + "Everyone can already send a song for the new round.",
    messageTag: "evaluationPeriodFinished"
  }],
  [NEW_SUBMISSION_KEY, {
    messageGenerator: (group, user) => `User ${user.displayName} just submitted a song in ${group.name}.`
  }],
  [NEW_EVALUATION_KEY, {
    messageGenerator: (group, user) => `User ${user.displayName} just voted in ${group.name}.`
  }]
]);

const sendSimpleGroupNotification = async (groupId, messageGenerator) => {
  const groupReference = getGroupReference(groupId);
  const group = await groupReference.get().then(g => g.data());
  return sendMessageToWholeGroup(group, messageGenerator(group));
}

const sendGroupNotificationWithUser = async (groupId, uid, messageGenerator) => {
  const { group, user } = await getUserAndGroup(groupId, uid);
  return sendMessageToWholeGroup(group, messageGenerator(group, user));
}

const getUserAndGroup = async (groupId, uid = "no_user") => {
  const groupReference = getGroupReference(groupId);
  const userReference = getUserReference(uid);
  const [group, user] = await Promise.all([groupReference.get(), userReference.get()]);
  return { group: group.data(), user: user.data() || {} };
}

const sendMessageToWholeGroup = async (group, message) => {
  return Promise.all(group.telegramChatIds.map(chatId => sendTelegramMessage(chatId, message)));
}

const sendTelegramMessage = (chatId, message) => {
  const botKey = functions.config().telegram.bot.key;
  const url = `https://api.telegram.org/bot${botKey}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: message
  };
  return axios.post(url, body)
    .then(() => console.log("Success sending message!"))
    .catch((e) => console.log(e.message, chatId, message));
}

module.exports = {
  sendGroupNotificationWithUser,
  sendSimpleGroupNotification,
  sendTelegramMessage,
  messageMap,
  SUBMISSION_PERIOD_FINISHED_KEY,
  EVALUATION_PERIOD_FINISHED_KEY,
  STAGE_ABOUT_TO_FINISH_KEY,
  NEW_SUBMISSION_KEY,
  NEW_EVALUATION_KEY,
}