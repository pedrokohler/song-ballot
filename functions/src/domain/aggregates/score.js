"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeRoundWinner = exports.getSubmissionsPoints = exports.getSubmissionPenalty = exports.isSubmissionFamous = exports.getSubmissionTotalScore = exports.getSubmissionRatedFamousCount = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getSubmissionRatedFamousCount = function getSubmissionRatedFamousCount(evaluations) {
  return evaluations.filter(function (evaluation) {
    return evaluation.ratedFamous;
  }).length;
};

exports.getSubmissionRatedFamousCount = getSubmissionRatedFamousCount;

var getSubmissionTotalScore = function getSubmissionTotalScore(evaluations) {
  return evaluations.reduce(function (total, evaluation) {
    return total + evaluation.score;
  }, 0);
};

exports.getSubmissionTotalScore = getSubmissionTotalScore;

var isSubmissionFamous = function isSubmissionFamous(evaluations) {
  return getSubmissionRatedFamousCount(evaluations) / (evaluations.length || 1) > 0.5;
};

exports.isSubmissionFamous = isSubmissionFamous;

var getSubmissionPenalty = function getSubmissionPenalty(evaluations) {
  return isSubmissionFamous(evaluations) ? 1 : 0;
};

exports.getSubmissionPenalty = getSubmissionPenalty;

var getSubmissionsPoints = function getSubmissionsPoints(evaluations) {
  var numberOfEvaluations = evaluations.length;
  var totalPoints = getSubmissionTotalScore(evaluations);
  var basePoints = numberOfEvaluations ? totalPoints / numberOfEvaluations + Number.EPSILON : 0;
  var roundedPoints = Math.round(100 * basePoints) / 100;
  var penalty = getSubmissionPenalty(evaluations);
  return roundedPoints - penalty;
};

exports.getSubmissionsPoints = getSubmissionsPoints;

var groupEvaluations = function groupEvaluations(arr, evaluation) {
  var songId = evaluation.song;
  var oldArray = arr[songId];

  if (oldArray) {
    return _objectSpread(_objectSpread({}, arr), {}, (0, _defineProperty2["default"])({}, songId, [].concat((0, _toConsumableArray2["default"])(oldArray), [evaluation])));
  }

  return _objectSpread(_objectSpread({}, arr), {}, (0, _defineProperty2["default"])({}, songId, [evaluation]));
};

var computeSubmissionResult = function computeSubmissionResult(results, evaluations) {
  var submissionPoints = getSubmissionsPoints(evaluations);
  var userId = evaluations[0].evaluatee;
  return [].concat((0, _toConsumableArray2["default"])(results), [{
    userId: userId,
    submissionPoints: submissionPoints
  }]);
};

var rankSubmissions = function rankSubmissions(a, b) {
  return b.submissionPoints - a.submissionPoints;
};

var computeRoundWinner = function computeRoundWinner(evaluations) {
  var groupedEvaluations = evaluations.reduce(groupEvaluations, {});
  var results = Array.from(Object.values(groupedEvaluations)).reduce(computeSubmissionResult, []);
  var lastWinner = Object.values(results).sort(rankSubmissions)[0];
  return lastWinner.userId;
};

exports.computeRoundWinner = computeRoundWinner;