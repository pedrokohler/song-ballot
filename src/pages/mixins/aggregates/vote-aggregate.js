import { getSnapshot } from "mobx-state-tree";
import { db, DateConverter } from "../../../services/firebase";
import { store } from "../../../store";
import { isValidScore, adjustScoreValue } from "../../../domain/aggregates/score";

export default function VoteAggregateMixin(baseClass) {
  return class VoteAggregate extends baseClass {
    static get properties() {
      return {
        isLoading: {
          type: Boolean,
        },
        hasOngoingRequest: {
          type: Boolean,
        },
        submissionIndex: {
          type: Number,
        },
        score: {
          type: Number,
        },
        isFamous: {
          type: Boolean,
        },
        showOverview: {
          type: Boolean,
        },
      };
    }

    constructor() {
      super();
      this.window = this.ownerDocument.defaultView;
      this.hasOngoingRequest = false;
      this.isLoading = true;
      this.showOverview = false;

      this.roundStartDate = "";
      this.endTime = "";
      this.endWeekday = "";
    }

    async firstUpdated(changedProperties) {
      await super.firstUpdated(changedProperties);

      this.setupAndCheckPageBasedOnOngoingRound();

      this.isLoading = false;
    }

    setupAndCheckPageBasedOnOngoingRound() {
      const { submissionsStartAt, evaluationsStartAt, evaluationsEndAt } = store.ongoingRound;
      this.setDateStrings({ submissionsStartAt, evaluationsStartAt, evaluationsEndAt });

      const errorCode = this.checkForErrors(this.getCheckFunctionsMap());
      if (errorCode) {
        this.safeOpenAlertModal(errorCode);
        return errorCode;
      }
      this.onInitialChecksPassed();
      return null;
    }

    onInitialChecksPassed() {
      this.setSubmissions();
      this.submissionIndex = 0;
    }

    getCheckFunctionsMap() {
      const { evaluationsStartAt, evaluationsEndAt } = store.ongoingRound;
      const otherUsersSubmissions = this.getOtherUsersSubmissions(
        store.currentUser,
        store.submissions,
      );

      return new Map([
        [this.hasEvaluationPeriodEnded(evaluationsEndAt),
          this.alertCodes.EVALUATION_PERIOD_OVER],
        [this.isBeforeEvaluationPeriodStarted(evaluationsStartAt),
          this.alertCodes.EVALUATION_PERIOD_NOT_STARTED],
        [this.hasUserAlreadyEvaluated(store.currentUser, store.ongoingRound.evaluations),
          this.alertCodes.ALREADY_EVALUATED],
        [this.hasNoOtherSubmissions(otherUsersSubmissions),
          this.alertCodes.NO_SONGS],
      ]);
    }

    checkForErrors(checkFunctionsMap) {
      const [, errorCode] = Array
        .from(checkFunctionsMap.entries())
        .find(([check]) => check() === true)
        || [];
      return errorCode;
    }

    setDateStrings({ submissionsStartAt, evaluationsStartAt, evaluationsEndAt }) {
      this.roundStartDate = submissionsStartAt.toLocaleDateString();

      this.endTime = evaluationsEndAt.toLocaleTimeString(undefined,
        { hour: "2-digit", minute: "2-digit" });
      this.startTime = evaluationsStartAt.toLocaleTimeString(undefined,
        { hour: "2-digit", minute: "2-digit" });

      this.endWeekday = evaluationsEndAt.toLocaleString(undefined, { weekday: "long" });
      this.startWeekday = evaluationsStartAt.toLocaleString(undefined, { weekday: "long" });
    }

    hasEvaluationPeriodEnded(evaluationsEndAt) {
      return () => Date.now() > evaluationsEndAt;
    }

    isBeforeEvaluationPeriodStarted(evaluationsStartAt) {
      return () => Date.now() < evaluationsStartAt;
    }

    hasUserAlreadyEvaluated(currentUser, evaluations) {
      return () => Array
        .from(evaluations.values())
        .some((evaluation) => evaluation.evaluator.id === currentUser.id);
    }

    hasNoOtherSubmissions(otherUserSubmissions) {
      return () => otherUserSubmissions.length === 0;
    }

    getOtherUsersSubmissions(currentUser, submissions) {
      return Array.from(submissions.values())
        .filter((submission) => submission.submitter.id !== currentUser.id);
    }

    setSubmissions() {
      // @todo refactor shuffleArray function
      const shuffleArray = (unshuffled) => unshuffled
        .reduceRight((shuffled, el, i) => {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          return shuffled;
        }, unshuffled);

      this.submissions = shuffleArray(
        this.getOtherUsersSubmissions(store.currentUser, store.ongoingRound.submissions),
      );
    }

    refreshScreenSubmissionEvaluation() {
      const { id } = this.submissions?.[this.submissionIndex] || {};
      this.score = this.getScore(id);
      this.isFamous = this.getIsFamous(id);
    }

    updated(changedProperties) {
      if (changedProperties.has("submissionIndex")) {
        this.refreshScreenSubmissionEvaluation();
      }
    }

    getScore(id) {
      const value = this.getScoreFromLocalStorage(id);
      return value || "";
    }

    getScoreLocalStorageKey(id) {
      return `${id}-${store.currentUser.id}-score`;
    }

    getIsFamousLocalStorageKey(id) {
      return `${id}-${store.currentUser.id}-is-famous`;
    }

    getScoreFromLocalStorage(id) {
      const value = this.window.localStorage.getItem(this.getScoreLocalStorageKey(id));
      return Number(value);
    }

    getIsFamous(id) {
      const value = this.getIsFamousFromLocalStorage(id);
      return value === "true";
    }

    getIsFamousFromLocalStorage(id) {
      const value = this.window.localStorage.getItem(this.getIsFamousLocalStorageKey(id));
      return value;
    }

    handleIsFamousInput(e) {
      const isChecked = e.target.checked;

      this.setCurrentIsFamousInMemory(isChecked);
      this.setCurrentIsFamousInLocalStorage(isChecked);
    }

    setCurrentIsFamousInLocalStorage(value) {
      this.window.localStorage
        .setItem(this.getIsFamousLocalStorageKey(this.currentSubmission.id), value);
    }

    setCurrentIsFamousInMemory(value) {
      this.isFamous = value;
    }

    handleScoreInput(e) {
      const { value } = e.target;
      const formattedValue = this.formatScoreValue(value);

      this.setCurrentScoreInMemory(formattedValue);
      this.setCurrentScoreInLocalStorage(formattedValue);
      this.setCurrentScoreInInputField(e, formattedValue);
    }

    setCurrentScoreInLocalStorage(value) {
      this.window.localStorage
        .setItem(this.getScoreLocalStorageKey(this.currentSubmission.id), value);
    }

    setCurrentScoreInInputField(inputEvent, value) {
      inputEvent.target.value = value;
    }

    setCurrentScoreInMemory(value) {
      this.score = value;
    }

    formatScoreValue(value) {
      return this.isScoreInputAllowed(value)
        ? value
        : adjustScoreValue(value);
    }

    isScoreInputAllowed(value) {
      return isValidScore(value) || value === "";
    }

    async handleConfirmationClick() {
      this.hasOngoingRequest = true;

      await this.refreshOngoingRound();
      const error = this.setupAndCheckPageBasedOnOngoingRound();

      if (error) {
        this.runPostTransactionCleanup();
        return;
      }

      await this.handleEvaluation();

      this.hasOngoingRequest = false;
    }

    async handleEvaluation() {
      try {
        const evaluations = this.getSanitizedEvaluationsPayload();
        const evaluationsIds = evaluations.map((evaluation) => evaluation.id);
        const submissionsIds = this.submissions.map((submission) => submission.id);
        const roundReference = this.getRoundReference(store.ongoingRound.id);

        await db.runTransaction(this.evaluationTransaction({
          roundReference,
          submissionsIds,
          evaluationsIds,
          evaluations,
        }));

        this.updateStore(evaluations);
        this.runPostTransactionCleanup();
        this.safeOpenAlertModal(this.alertCodes.VOTE_SUCCESS);
      } catch (e) {
        this.checkAndTreatEvaluationError(e);
      }
    }

    checkAndTreatEvaluationError(e) {
      if (this.isScoreError(e)) {
        this.safeOpenAlertModal(this.alertCodes.INVALID_SCORE);
      } else {
        this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_CLOSE_MODAL, e.message);
      }
    }

    isScoreError(e) {
      return e.message.indexOf("/score") > 0;
    }

    getSanitizedEvaluationsPayload() {
      return this.submissions.map((submission) => {
        const evaluationModel = store.createEvaluationModel({
          submission,
          score: this.getScore(submission.id),
          ratedFamous: this.getIsFamous(submission.id),
        });
        return getSnapshot(evaluationModel);
      });
    }

    updateStore(evaluationsPayloads) {
      this.submissions.forEach((submission) => {
        const submissionEvaluation = evaluationsPayloads
          .find((evaluation) => evaluation.song === submission.song.id);
        const evaluationModel = store.addEvaluation(submissionEvaluation);
        submission.addEvaluation(evaluationModel.id);
        store.ongoingRound.addEvaluation(evaluationModel.id);
      });
    }

    evaluationTransaction({
      roundReference,
      submissionsIds,
      evaluations,
      evaluationsIds,
    }) {
      return async (transaction) => {
        try {
          const {
            round,
            roundEvaluations,
            submissions,
          } = await this.getSubmissionsAndRoundData({
            roundReference,
            submissionsIds,
            transaction,
          });

          submissions.forEach(this.persistEvaluationAndUpdateSubmission({
            evaluations,
            transaction,
          }));

          await this.persistUpdatedRound({
            round,
            roundReference,
            roundEvaluations,
            evaluationsIds,
            transaction,
          });
        } catch (e) {
          this.safeOpenAlertModal(this.alertCodes.EVALUATION_FAILED);
        }
      };
    }

    async getSubmissionsAndRoundData({
      roundReference,
      submissionsIds,
      transaction,
    }) {
      const round = await transaction.get(roundReference);
      const roundEvaluations = round.data().evaluations || [];
      const submissions = await this.getSubmissions({
        submissionsIds,
        transaction,
      });
      return {
        round,
        roundEvaluations,
        submissions,
      };
    }

    persistEvaluationAndUpdateSubmission({
      evaluations,
      transaction,
    }) {
      return async (submission) => {
        const submissionData = submission.data();
        const oldSubmissionEvaluationsIds = submissionData.evaluations;
        const newSubmissionEvaluation = evaluations
          .find((evaluation) => evaluation.song === submissionData.song);
        const evaluationReference = this.getEvaluationReference(newSubmissionEvaluation.id);

        await this.persistUpdatedSubmission({
          submission,
          oldSubmissionEvaluationsIds,
          newSubmissionEvaluation,
          transaction,
        });
        await this.persistEvaluation({
          evaluation: newSubmissionEvaluation,
          evaluationReference,
          transaction,
        });
      };
    }

    getSubmissions({
      submissionsIds,
      transaction,
    }) {
      return Promise.all(submissionsIds.map(async (id) => {
        const submissionReference = this.getSubmissionReference(id);
        const submission = transaction.get(submissionReference);
        return submission;
      }));
    }

    persistUpdatedSubmission({
      submission,
      oldSubmissionEvaluationsIds,
      newSubmissionEvaluation,
      transaction,
    }) {
      return transaction
        .update(
          submission.ref.parent.doc(submission.id),
          { evaluations: [...oldSubmissionEvaluationsIds, newSubmissionEvaluation.id] },
        );
    }

    persistEvaluation({
      evaluation,
      evaluationReference,
      transaction,
    }) {
      return transaction.set(evaluationReference, evaluation);
    }

    persistUpdatedRound({
      round,
      roundReference,
      roundEvaluations,
      evaluationsIds,
      transaction,
    }) {
      return transaction
        .update(roundReference, {
          evaluations: [...roundEvaluations, ...evaluationsIds],
          voteCount: round.data().voteCount + 1,
        });
    }

    runPostTransactionCleanup() {
      this.submissions.forEach((submission) => {
        this.window.localStorage.removeItem(this.getScoreLocalStorageKey(submission.id));
        this.window.localStorage.removeItem(this.getIsFamousLocalStorageKey(submission.id));
      });
    }

    getEvaluationReference(submissionId) {
      return this.groupReference.collection("evaluations")
        .doc(submissionId)
        .withConverter(DateConverter);
    }

    getSubmissionReference(submissionId) {
      return this.groupReference.collection("submissions")
        .doc(submissionId)
        .withConverter(DateConverter);
    }

    getRoundReference(roundId) {
      return this.groupReference.collection("rounds")
        .doc(roundId)
        .withConverter(DateConverter);
    }

    get groupReference() {
      return db.collection("groups").doc(store.currentGroup);
    }

    get currentSubmission() {
      return this.submissions?.[this.submissionIndex];
    }
  };
}
