const MAX_SCORE_ALLOWED = 10;
const MIN_SCORE_ALLOWED = 1;

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
  ? 1
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
  return [
    ...results,
    {
      userId,
      points,
      timesRatedFamous,
    },
  ];
};

const computeSortIndexForRatedFamous = (a, b) => (
  a.timesRatedFamous < b.timesRatedFamous
    ? -1
    : 1
);

export const rankSubmissions = (a, b) => {
  if (b.points === a.points) {
    return computeSortIndexForRatedFamous(a, b);
  }
  return b.points - a.points;
};

export const computeRoundWinner = (evaluations) => {
  const groupedEvaluations = evaluations.reduce(groupEvaluations, {});
  const results = Array.from(Object.values(groupedEvaluations)).reduce(computeSubmissionResult, []);
  const lastWinner = Object.values(results).sort(rankSubmissions)[0];

  return lastWinner.userId;
};
