import { not, and } from "../../helpers/utils";
import { getDayOfNextWeekWithTime, now } from "../../helpers/time";

export const hasSubmissionPeriodEnded = (ongoingRound) => now()
  > ongoingRound.submissionsEndAt;

export const hasSubmissionPeriodStarted = (ongoingRound) => now()
  > ongoingRound.submissionsStartAt;

export const hasEvaluationsPeriodStarted = (ongoingRound) => now()
  > ongoingRound.evaluationsStartAt;

export const hasEvaluationsPeriodEnded = (ongoingRound) => now()
  > ongoingRound.evaluationsEndAt;

export const isLastWinner = (ongoingRound, user) => ongoingRound.lastWinner === user.id;

export const getUserSubmissionsCount = (ongoingRound, user) => Array
  .from(ongoingRound.submissions.values())
  .filter((submission) => submission.submitter.id === user.id)
  .length;

export const hasUserAlreadyEvaluated = (ongoingRound, user) => Array
  .from(ongoingRound.evaluations.values())
  .some((evaluation) => evaluation.evaluator.id === user.id);

export const hasUserReachedSubmissionLimit = (ongoingRound, user) => {
  const userSubmissionCount = getUserSubmissionsCount(ongoingRound, user);
  if (isLastWinner(ongoingRound, user)) {
    return userSubmissionCount >= 2;
  }
  return userSubmissionCount >= 1;
};

export const generateNewRoundPayload = ({
  users,
  lastWinner,
  timestampGenerator,
}) => (
  {
    submissionsStartAt: timestampGenerator(),
    submissionsEndAt: timestampGenerator(getDayOfNextWeekWithTime("tuesday", 15, 0, 0)),
    evaluationsStartAt: timestampGenerator(getDayOfNextWeekWithTime("tuesday", 15, 0, 1)),
    evaluationsEndAt: timestampGenerator(getDayOfNextWeekWithTime("sunday", 23, 0, 0)),
    submissions: [],
    evaluations: [],
    songs: [],
    users: users || [],
    lastWinner,
    voteCount: 0,
  }
);

export const canUserSendSong = and(
  hasSubmissionPeriodStarted,
  not(hasSubmissionPeriodEnded),
  not(hasUserReachedSubmissionLimit),
);

export const canUserEvaluate = and(
  hasEvaluationsPeriodStarted,
  not(hasEvaluationsPeriodEnded),
  not(hasUserAlreadyEvaluated),
);

export const canUserSeePartialResults = hasUserAlreadyEvaluated;
