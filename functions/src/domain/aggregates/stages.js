"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canUserSeePartialResults = exports.canUserEvaluate = exports.canUserSendSong = exports.shouldFinishRound = exports.shouldStartRoundEvaluationPeriod = exports.generateNewRoundPayload = exports.hasUserReachedSubmissionLimit = exports.hasUserAlreadyEvaluated = exports.getUserSubmissionsCount = exports.isLastWinner = exports.hasEvaluationsPeriodEnded = exports.hasEvaluationsPeriodStarted = exports.hasSubmissionPeriodStarted = exports.hasSubmissionPeriodEnded = void 0;

var _utils = require("../../helpers/utils");

var _time = require("../../helpers/time");

var hasSubmissionPeriodEnded = function hasSubmissionPeriodEnded(ongoingRound) {
  return (0, _time.now)() > ongoingRound.submissionsEndAt;
};

exports.hasSubmissionPeriodEnded = hasSubmissionPeriodEnded;

var hasSubmissionPeriodStarted = function hasSubmissionPeriodStarted(ongoingRound) {
  return (0, _time.now)() > ongoingRound.submissionsStartAt;
};

exports.hasSubmissionPeriodStarted = hasSubmissionPeriodStarted;

var hasEvaluationsPeriodStarted = function hasEvaluationsPeriodStarted(ongoingRound) {
  return (0, _time.now)() > ongoingRound.evaluationsStartAt;
};

exports.hasEvaluationsPeriodStarted = hasEvaluationsPeriodStarted;

var hasEvaluationsPeriodEnded = function hasEvaluationsPeriodEnded(ongoingRound) {
  return (0, _time.now)() > ongoingRound.evaluationsEndAt;
};

exports.hasEvaluationsPeriodEnded = hasEvaluationsPeriodEnded;

var isLastWinner = function isLastWinner(ongoingRound, user) {
  return ongoingRound.lastWinner === user.id;
};

exports.isLastWinner = isLastWinner;

var getUserSubmissionsCount = function getUserSubmissionsCount(ongoingRound, user) {
  return Array.from(ongoingRound.submissions.values()).filter(function (submission) {
    return submission.submitter.id === user.id;
  }).length;
};

exports.getUserSubmissionsCount = getUserSubmissionsCount;

var hasUserAlreadyEvaluated = function hasUserAlreadyEvaluated(ongoingRound, user) {
  return Array.from(ongoingRound.evaluations.values()).some(function (evaluation) {
    return evaluation.evaluator.id === user.id;
  });
};

exports.hasUserAlreadyEvaluated = hasUserAlreadyEvaluated;

var hasUserReachedSubmissionLimit = function hasUserReachedSubmissionLimit(ongoingRound, user) {
  var userSubmissionCount = getUserSubmissionsCount(ongoingRound, user);

  if (isLastWinner(ongoingRound, user)) {
    return userSubmissionCount >= 2;
  }

  return userSubmissionCount >= 1;
};

exports.hasUserReachedSubmissionLimit = hasUserReachedSubmissionLimit;

var generateNewRoundPayload = function generateNewRoundPayload(_ref) {
  var users = _ref.users,
      lastWinner = _ref.lastWinner,
      timestampGenerator = _ref.timestampGenerator;
  return {
    submissionsStartAt: timestampGenerator(),
    submissionsEndAt: timestampGenerator((0, _time.getDayOfNextWeekWithTime)("tuesday", 15, 0, 0)),
    evaluationsStartAt: timestampGenerator((0, _time.getDayOfNextWeekWithTime)("tuesday", 15, 0, 1)),
    evaluationsEndAt: timestampGenerator((0, _time.getDayOfNextWeekWithTime)("sunday", 23, 0, 0)),
    submissions: [],
    evaluations: [],
    songs: [],
    users: users || [],
    lastWinner: lastWinner,
    voteCount: 0
  };
};

exports.generateNewRoundPayload = generateNewRoundPayload;

var shouldStartRoundEvaluationPeriod = function shouldStartRoundEvaluationPeriod(round) {
  var users = round.users,
      submissions = round.submissions,
      lastWinner = round.lastWinner;
  var usersQuantity = users.length;
  var submissionsQuantity = submissions.length;
  var submissionsTarget = usersQuantity + (lastWinner ? 1 : 0);
  return submissionsTarget === submissionsQuantity;
};

exports.shouldStartRoundEvaluationPeriod = shouldStartRoundEvaluationPeriod;

var shouldFinishRound = function shouldFinishRound(round) {
  var users = round.users,
      voteCount = round.voteCount;
  var everyoneVoted = users.length === voteCount;
  return everyoneVoted;
};

exports.shouldFinishRound = shouldFinishRound;
var canUserSendSong = (0, _utils.and)(hasSubmissionPeriodStarted, (0, _utils.not)(hasSubmissionPeriodEnded), (0, _utils.not)(hasUserReachedSubmissionLimit));
exports.canUserSendSong = canUserSendSong;
var canUserEvaluate = (0, _utils.and)(hasEvaluationsPeriodStarted, (0, _utils.not)(hasEvaluationsPeriodEnded), (0, _utils.not)(hasUserAlreadyEvaluated));
exports.canUserEvaluate = canUserEvaluate;
var canUserSeePartialResults = hasUserAlreadyEvaluated;
exports.canUserSeePartialResults = canUserSeePartialResults;