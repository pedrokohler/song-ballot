export const MAX_SCORE_ALLOWED = 100;
export const MIN_SCORE_ALLOWED = 1;
const FAMOUS_SUBMISSION_PENALTY = MAX_SCORE_ALLOWED * 0.1;

export const isValidScore = (value) => (
  Number.isInteger(value)
      && value >= MIN_SCORE_ALLOWED
      && value <= MAX_SCORE_ALLOWED
);

export const adjustScoreValue = (value) => {
  const max = MAX_SCORE_ALLOWED;
  const min = MIN_SCORE_ALLOWED;
  const roundedValue = Math.round(value);
  return Math.max(min, Math.min(max, roundedValue));
};

export const getSubmissionRatedFamousCount = (evaluations) => evaluations
  .filter((evaluation) => evaluation.ratedFamous)
  .length;

export const getSubmissionTotalScore = (evaluations) => evaluations
  .reduce((total, evaluation) => total + evaluation.score, 0);

export const isSubmissionFamous = (evaluations) => getSubmissionRatedFamousCount(evaluations)
  / (evaluations.length || 1)
  > 0.5;

export const getSubmissionPenalty = (evaluations) => (isSubmissionFamous(evaluations)
  ? FAMOUS_SUBMISSION_PENALTY
  : 0);

export const getSubmissionsPoints = (evaluations) => {
  const numberOfEvaluations = evaluations.length;
  const totalPoints = getSubmissionTotalScore(evaluations);
  const basePoints = numberOfEvaluations
    ? totalPoints / numberOfEvaluations + Number.EPSILON
    : 0;

  const roundedPoints = Math.round(100 * basePoints) / 100;
  const penalty = getSubmissionPenalty(evaluations);

  return roundedPoints - penalty;
};

// const getVoteMap = (evaluations) => {
//   const mapInitializer = evaluations.reduce((initializer, evaluation) => {
//     const evaluationEntry = [evaluation.evaluatee, evaluation.score];
//     return [
//       ...initializer,
//       evaluationEntry,
//     ];
//   }, []);
//   return new Map(mapInitializer);
// };

const groupEvaluations = (acc, evaluation) => {
  const songId = evaluation.song;
  const oldArray = acc[songId];
  if (oldArray) {
    return {
      ...acc,
      [songId]: [...oldArray, evaluation],
    };
  }
  return {
    ...acc,
    [songId]: [evaluation],
  };
};

const computeSubmissionResult = (results, evaluations) => {
  const points = getSubmissionsPoints(evaluations);
  const timesRatedFamous = getSubmissionRatedFamousCount(evaluations);
  const userId = evaluations[0].evaluatee;
  // const voteMap = getVoteMap(evaluations);
  return [
    ...results,
    {
      userId,
      points,
      timesRatedFamous,
      // voteMap,
    },
  ];
};

const computeSortIndexForRatedFamousTieBreaker = (a, b) => {
  if (a.timesRatedFamous < b.timesRatedFamous) {
    return -1;
  } if (a.timesRatedFamous > b.timesRatedFamous) {
    return 1;
  }
  return 0;
};

// const computeSortIndexForIgnoreOpponentScoreTieBreaker = (a, b) => (
//   a.voteMap.get(b.userId) < b.voteMap.get(a.userId)
//     ? 1
//     : -1
// );

export const rankSubmissions = (a, b) => {
  if (b.points === a.points) {
    const ratedFamousSortIndex = computeSortIndexForRatedFamousTieBreaker(a, b);
    // To add the following tie breaker we must change the submission data structure
    // so that the submission also has the voting information within itself
    // if (ratedFamousSortIndex === 0) {
    //   return computeSortIndexForIgnoreOpponentScoreTieBreaker(a, b);
    // }
    return ratedFamousSortIndex;
  }
  return b.points - a.points;
};

export const computeRoundWinner = (evaluations) => {
  const groupedEvaluations = evaluations.reduce(groupEvaluations, {});
  const results = Array.from(Object.values(groupedEvaluations)).reduce(computeSubmissionResult, []);
  const lastWinner = Object.values(results).sort(rankSubmissions)[0];

  return lastWinner.userId;
};
