import { not, and } from "../../helpers/utils";
import { getDayOfNextWeekWithTime, now } from "../../helpers/time";

const USER_SUBMISSION_LIMIT_REGULAR = 1;
const USER_SUBMISSION_LIMIT_LAST_WINNER = 2;

export const hasSubmissionPeriodEnded = (ongoingRound) => now()
  > ongoingRound.submissionsEndAt;

export const hasSubmissionPeriodStarted = (ongoingRound) => now()
  > ongoingRound.submissionsStartAt;

export const hasEvaluationsPeriodStarted = (ongoingRound) => now()
  > ongoingRound.evaluationsStartAt;

export const hasEvaluationsPeriodEnded = (ongoingRound) => now()
  > ongoingRound.evaluationsEndAt;

export const isLastWinner = (ongoingRound, user) => ongoingRound.lastWinner?.id === user.id;

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
    return userSubmissionCount >= USER_SUBMISSION_LIMIT_LAST_WINNER;
  }
  return userSubmissionCount >= USER_SUBMISSION_LIMIT_REGULAR;
};

export const generateNewRoundPayload = ({
  users,
  lastWinner,
  timestampGenerator,
}) => {
  const newRound = {
    submissionsStartAt: timestampGenerator(),
    submissionsEndAt: timestampGenerator(getDayOfNextWeekWithTime("tuesday", 15, 0, 0)),
    evaluationsStartAt: timestampGenerator(getDayOfNextWeekWithTime("tuesday", 15, 0, 1)),
    evaluationsEndAt: timestampGenerator(getDayOfNextWeekWithTime("sunday", 23, 0, 0)),
    submissions: [],
    evaluations: [],
    songs: [],
    users: users || [],
    voteCount: 0,
  };
  return lastWinner ? { ...newRound, lastWinner } : newRound;
};

export const shouldStartRoundEvaluationPeriod = (round) => {
  const { users, submissions, lastWinner } = round;
  const usersQuantity = users.length;

  const submissionsQuantity = submissions.length;
  const submissionsTarget = usersQuantity + (lastWinner ? 1 : 0);

  return submissionsTarget === submissionsQuantity;
};

export const shouldFinishRound = (round) => {
  const { users, voteCount } = round;
  const everyoneVoted = users.length === voteCount;

  return everyoneVoted;
};

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
