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
  const submissionPoints = getSubmissionsPoints(evaluations);
  const userId = evaluations[0].evaluatee;
  return [
    ...results,
    {
      userId,
      submissionPoints,
    },
  ];
};

const rankSubmissions = (a, b) => b.submissionPoints - a.submissionPoints;

export const computeRoundWinner = (evaluations) => {
  const groupedEvaluations = evaluations.reduce(groupEvaluations, {});
  const results = Array.from(Object.values(groupedEvaluations)).reduce(computeSubmissionResult, []);
  const lastWinner = Object.values(results).sort(rankSubmissions)[0];

  return lastWinner.userId;
};
