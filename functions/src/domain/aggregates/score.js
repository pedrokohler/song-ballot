"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSubmissionsPoints = exports.getSubmissionPenalty = exports.isSubmissionFamous = exports.getSubmissionTotalScore = exports.getSubmissionRatedFamousCount = void 0;

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