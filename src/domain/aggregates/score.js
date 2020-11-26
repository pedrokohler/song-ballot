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
