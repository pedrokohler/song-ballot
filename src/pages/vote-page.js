import { LitElement, html, css } from "lit-element";
import { getSnapshot } from "mobx-state-tree";

import "@polymer/paper-progress/paper-progress";
import "../components/default-background";
import "../components/alert-modal";
import "../components/navigation-buttons";

import { store } from "../store";
import { db, DateConverter } from "../services/firebase";
import OngoingRoundDependableMixin from "./mixins/ongoing-round-dependable-mixin";
import VoteModalDisplayableMixin from "./mixins/modal-displayable-mixins/vote-modal-displayable-mixin";

const BaseClass = VoteModalDisplayableMixin(
  OngoingRoundDependableMixin(
    LitElement,
  ),
);
export default class VotePage extends BaseClass {
  static get styles() {
    return css`
        .shell {
            border-radius: 3px;
            min-height: 200px;
            height: inherit;
            width: 90%;
            min-width: 300px;
            max-width: 600px;
            background-color: #FFFFFF;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 25px;
            padding-top: 20px;
            box-sizing: border-box;
        }

        h1,h2,h3,h4,h5,h6,p {
            margin-top: 0;
            margin-bottom: 0.6em;
            text-align: center;
        }

        h3, div {
            margin-right: auto;
        }

        hr {
            border: none;
            width: 85%;
            height: 1px;
            margin-bottom: 20px;
            background-color: rgba(0, 0, 0, 0.2);
        }

        h4 {
            font-weight: 500;
            text-transform: uppercase;
        }

        .song-title {
            text-transform: none;
            margin-right: auto;
        }

        div h4 {
            margin-bottom: 0;
            text-transform: none;
        }

        div h6 {
            margin-top: 0;
            font-weight: 400;
            text-align: left;
            margin-bottom: 1em;
        }

        input[type=number] {
            height: 1.5em;
            width: 120px;
            border-radius: 3px;
            margin-bottom: 1em;
            font-family: inherit;
            border-style: solid;
            border-width: 1px;
            font-size: 1em;
            background-color: #F2F2F2;
            text-align: center;
        }

        label {
          font-size: 0.75em;
          margin-bottom: 1em;
          display: inline-flex;
          align-items: center;
        }

        iframe {
            width: 100%;
            height: 300px;
            max-height: 50%;
            margin-bottom: 1em;
        }

        paper-progress {
            width: 100vw;
            --paper-progress-active-color: #FBC303;
        }
    `;
  }

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

  render() {
    if (this.isLoading) {
      return html`
        <paper-progress class="blue" indeterminate></paper-progress>
      `;
    }

    return html`
        <default-background>
            <section class="shell">
                <h3>Votar</h3>
                <h4>Semana ${this.roundStartDate}</h4>
                <p>O limite para votação é até ${this.endTime} de ${this.endWeekday}</p>
                <hr/>
                ${this.showOverview ? this.overviewTemplate() : this.videoTemplate()}
            </section>
        </default-background>
    `;
  }

  videoTemplate() {
    if (!this.currentSubmission) {
      return html``;
    }

    return html`
        <h4 class="song-title">${this.currentSubmission.song.title}</h4>
        <iframe src=${this.currentSubmission.song.url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <input
            type="number" max="10" min="1"
            @input=${this.handleScoreInput}
            .value=${this.score}
        />
        <label>
          <input
            type="checkbox"
            @change=${this.handleIsFamousInput}
            .checked=${this.isFamous}
          />
          Considero essa música famosa e contra as regras
        </label>
        ${this.videoTemplateNavigation()}
      `;
  }

  videoTemplateNavigation() {
    return this.submissionIndex >= this.submissions.length - 1
      ? html`
        <navigation-buttons
          forwardArrowsAlt="ver resumo das notas"
          forwardArrowsLabel="resumo"
          ?forwardArrowsDisabled="${false}"
          @forward-arrows-clicked="${() => { this.showOverview = true; }}"

          backwardArrowsAlt="ir para música anterior"
          ?backwardArrowsDisabled="${this.submissionIndex <= 0}"
          @backward-arrows-clicked="${() => { this.submissionIndex -= 1; }}"
        >
        </navigation-buttons>
      `
      : html`
        <navigation-buttons
          forwardArrowsAlt="ir para próxima música"
          ?forwardArrowsDisabled="${false}"
          forwardArrowsLabel="próxima"
          @forward-arrows-clicked="${() => { this.submissionIndex += 1; }}"

          backwardArrowsAlt="ir para música anterior"
          forwardArrowsLabel="anterior"
          ?backwardArrowsDisabled="${this.submissionIndex <= 0}"
          @backward-arrows-clicked="${() => { this.submissionIndex -= 1; }}"
        >
        </navigation-buttons>
      `;
  }

  overviewTemplate() {
    return html`
      ${this.submissions.map((submission) => html`
        <label>${submission.song?.title}</label>
        <label>Nota ${this.getScoreFromLocalStorage(submission?.id) || "inválida"}</label>
        <label>${this.getIsFamousFromLocalStorage(submission?.id) === "true" ? "Famosa" : ""}</label>
        <hr/>
      `)}
      <navigation-buttons
        forwardArrowsAlt="confirmar voto"
        forwardArrowsLabel="confirmar"
        ?forwardArrowsDisabled="${this.hasOngoingRequest}"
        @forward-arrows-clicked="${this.handleConfirmationClick.bind(this)}"

        backwardArrowsAlt="voltar à votação"
        ?backwardArrowsDisabled="${this.hasOngoingRequest}"
        @backward-arrows-clicked="${() => { this.showOverview = false; }}"
      >
      </navigation-buttons>
    `;
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
    return () => Boolean(Array
      .from(evaluations.values())
      .find((evaluation) => evaluation.evaluator.id === currentUser.id));
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
      : this.adjustScoreValue(value);
  }

  adjustScoreValue(value) {
    const max = 10;
    const min = 1;
    const roundedValue = Math.round(value);
    return Math.max(min, Math.min(max, roundedValue));
  }

  isScoreInputAllowed(value) {
    return (
      Number.isInteger(value)
      && value >= 1
      && value <= 10
    )
    || value === "";
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
}

window.customElements.define("vote-page", VotePage);
