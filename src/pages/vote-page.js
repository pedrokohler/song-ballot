import { LitElement, html, css } from "lit-element";
import { getSnapshot } from "mobx-state-tree";

import "@polymer/paper-progress/paper-progress";
import "../components/default-background";
import "../components/alert-modal";
import forwardArrows from "../images/forward-arrows.png";
import backwardArrows from "../images/backward-arrows.png";
import { store } from "../store";
import { db, DateConverter } from "../services/firebase";
import OngoingRoundDependableMixin from "./mixins/ongoing-round-dependable-mixin";
import VoteModalDisplayableMixin from "./mixins/modal-displayable-mixins/vote-modal-displayable-mixin";

const SuperClass = VoteModalDisplayableMixin(
  OngoingRoundDependableMixin(
    LitElement,
  ),
);
export default class VotePage extends SuperClass {
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

        .navigation-section {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .navigation-btn {
            background-color: transparent;
            border: none;
            font-family: inherit;
            font-weight: 600;
            cursor: pointer;
        }

        .navigation-btn:focus {
            outline: none;
        }

        .navigation-btn:disabled span {
            color: #CCCCCC;
            cursor: not-allowed;
        }

        .navigation-btn:disabled img {
            filter: invert(91%) hue-rotate(135deg) brightness(92%) contrast(89%);
        }

        .navigation-section img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
        }

        .navigation-section span {
            display: inline;
            vertical-align: middle;
            text-transform: uppercase;
            margin: 0 10px;
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
    this.hasOngoingRequest = false;
    this.isLoading = true;
    this.showOverview = false;

    this.roundStartDate = "";
    this.endTime = "";
    this.endWeekday = "";

    this.submissionIndex = 0;
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
    const currentSubmission = this.submissions?.[this.submissionIndex];

    if (!currentSubmission) {
      return html``;
    }

    return html`
        <h4 class="song-title">${currentSubmission.song.title}</h4>
        <iframe src=${currentSubmission.song.url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
        <section class="navigation-section">
            <button
                ?disabled=${this.submissionIndex <= 0}
                class="navigation-btn"
                @click=${() => { this.submissionIndex -= 1; }}
            >
                <img src=${backwardArrows} alt="ir para música anterior"/>
                <span>anterior</span>
            </button>
            <button
                ?hidden=${this.submissionIndex >= this.submissions.length - 1}
                class="navigation-btn"
                @click=${() => { this.submissionIndex += 1; }}
            >
                <span>próxima</span>
                <img src=${forwardArrows} alt="ir para próxima música"/>
            </button>
            <button
                ?hidden=${!(this.submissionIndex >= this.submissions.length - 1)}
                class="navigation-btn"
                @click=${() => { this.showOverview = true; }}
            >
                <span>resumo</span>
                <img src=${forwardArrows} alt="ver resumo das notas"/>
            </button>
        </section>
      `;
  }

  overviewTemplate() {
    return html`
      ${this.submissions.map((sub) => html`
        <label>${sub.song.title}</label>
        <label>Nota ${window.localStorage.getItem(`${sub.id}-${store.currentUser.id}-score`) || "inválida"}</label>
        <label>${window.localStorage.getItem(`${sub.id}-${store.currentUser.id}-is-famous`) === "true" ? "Famosa" : ""}</label>
        <hr/>
      `)}
      <section class="navigation-section">
          <button
              class="navigation-btn"
              @click=${() => { this.showOverview = false; }}
          >
              <img src=${backwardArrows} alt="voltar à votação"/>
              <span>voltar</span>
          </button>
          <button
              class="navigation-btn"
              @click=${this.handleEvaluation.bind(this)}
              ?disabled=${this.hasOngoingRequest}
          >
              <span>confirmar</span>
          </button>
      </section>
    `;
  }

  async firstUpdated(changedProperties) {
    await super.firstUpdated(changedProperties);

    const { submissionsStartAt, evaluationsStartAt, evaluationsEndAt } = store.ongoingRound;
    this.setDateStrings({ submissionsStartAt, evaluationsStartAt, evaluationsEndAt });

    const errors = this.checkForErrors(this.getCheckFunctionsMap());
    if (errors.length) {
      this.onInitialChecksFailed(errors);
    } else {
      this.onInitialChecksPassed();
    }

    this.isLoading = false;
  }

  onInitialChecksPassed() {
    this.setSubmissions();
    this.refreshScreenSubmissionEvaluation();
  }

  onInitialChecksFailed(failedChecks) {
    this.safeOpenAlertModal(failedChecks?.[0]);
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
    const errors = Array
      .from(checkFunctionsMap.entries())
      .map(([check, error]) => (check() ? error : null))
      .filter((error) => error !== null);

    return errors;
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
      .filter((sub) => sub.submitter.id !== currentUser.id);
  }

  setSubmissions() {
    this.submissions = this.getOtherUsersSubmissions(store.currentUser, store.submissions);
  }

  refreshScreenSubmissionEvaluation() {
    const { id } = this.submissions?.[this.submissionIndex];
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

  getScoreFromLocalStorage(id) {
    const value = window.localStorage
      .getItem(`${id}-${store.currentUser.id}-score`);
    return Number(value);
  }

  getIsFamous(id) {
    const value = this.getIsFamousFromLocalStorage(id);
    if (value === "true") {
      return true;
    }
    return false;
  }

  getIsFamousFromLocalStorage(id) {
    const value = window.localStorage
      .getItem(`${id}-${store.currentUser.id}-is-famous`);
    return value;
  }

  handleIsFamousInput(e) {
    const isChecked = e.target.checked;

    this.setCurrentIsFamousInMemory(isChecked);
    this.setCurrentIsFamousInLocalStorage(isChecked);
  }

  setCurrentIsFamousInLocalStorage(value) {
    const currentSubmission = this.submissions[this.submissionIndex];
    window.localStorage
      .setItem(`${currentSubmission.id}-${store.currentUser.id}-is-famous`, value);
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
    const currentSubmission = this.submissions[this.submissionIndex];

    window.localStorage
      .setItem(`${currentSubmission.id}-${store.currentUser.id}-score`, value);
  }

  setCurrentScoreInInputField(inputEvent, value) {
    inputEvent.target.value = value;
  }

  setCurrentScoreInMemory(value) {
    this.score = value;
  }

  formatScoreValue(value) {
    if (this.isScoreInputAllowed(value)) {
      return value;
    }
    const formattedValue = this.adjustScoreValue(value);
    return formattedValue;
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

  async handleEvaluation() {
    this.hasOngoingRequest = true;
    try {
      const evaluations = this.getSanitizedEvaluationsPayload();
      const evaluationsIds = evaluations.map((evaluation) => evaluation.id);
      const submissionsIds = this.submissions.map((sub) => sub.id);
      const roundRef = this.getRoundRef(store.ongoingRound.id);

      await db.runTransaction(this.evaluationTransaction({
        roundRef,
        submissionsIds,
        evaluationsIds,
        evaluations,
      }));

      this.updateStore(evaluations);
      this.runPostTransactionCleanup();
      this.safeOpenAlertModal(this.alertCodes.VOTE_SUCCESS);
    } catch (e) {
      this.checkAndTreatEvaluationError(e);
      this.hasOngoingRequest = false;
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
    return this.submissions.map((sub) => {
      const evaluationModel = store.createEvaluationModel({
        submission: sub,
        score: this.getScore(sub.id),
        ratedFamous: this.getIsFamous(sub.id),
      });
      return getSnapshot(evaluationModel);
    });
  }

  updateStore(evaluationsPayloads) {
    this.submissions.forEach((sub) => {
      const respectiveEvaluation = evaluationsPayloads.find((ev) => ev.song === sub.song.id);
      const evaluationModel = store.addEvaluation(respectiveEvaluation);
      sub.addEvaluation(evaluationModel.id);
      store.ongoingRound.addEvaluation(evaluationModel.id);
    });
  }

  evaluationTransaction({
    roundRef,
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
          roundRef,
          submissionsIds,
          transaction,
        });

        submissions.forEach(this.persistEvaluationAndUpdateSubmission({
          evaluations,
          transaction,
        }));

        await this.persistUpdatedRound({
          round,
          roundRef,
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
    roundRef,
    submissionsIds,
    transaction,
  }) {
    const round = await transaction.get(roundRef);
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
      const subData = submission.data();
      const subEvaluations = subData.evaluations;
      const evaluation = evaluations.find((ev) => ev.song === subData.song);
      const evalRef = this.getEvaluationRef(evaluation.id);

      await this.persistUpdatedSubmission({
        submission,
        subEvaluations,
        evaluation,
        transaction,
      });
      await this.persistEvaluation({
        evaluation,
        evalRef,
        transaction,
      });
    };
  }

  getSubmissions({
    submissionsIds,
    transaction,
  }) {
    return Promise.all(submissionsIds.map(async (id) => {
      const subRef = this.getSubmissionRef(id);
      const submission = transaction.get(subRef);
      return submission;
    }));
  }

  persistUpdatedSubmission({
    submission,
    subEvaluations,
    evaluation,
    transaction,
  }) {
    return transaction
      .update(
        submission.ref.parent.doc(submission.id),
        { evaluations: [...subEvaluations, evaluation.id] },
      );
  }

  persistEvaluation({
    evaluation,
    evalRef,
    transaction,
  }) {
    return transaction.set(evalRef, evaluation);
  }

  persistUpdatedRound({
    round,
    roundRef,
    roundEvaluations,
    evaluationsIds,
    transaction,
  }) {
    return transaction
      .update(roundRef, {
        evaluations: [...roundEvaluations, ...evaluationsIds],
        voteCount: round.data().voteCount + 1,
      });
  }

  runPostTransactionCleanup() {
    this.submissions.forEach((sub) => {
      window.localStorage.removeItem(`${sub.id}-${store.currentUser.id}-score`);
      window.localStorage.removeItem(`${sub.id}-${store.currentUser.id}-is-famous`);
    });
  }

  getEvaluationRef(submissionId) {
    return this.groupRef.collection("evaluations")
      .doc(submissionId)
      .withConverter(DateConverter);
  }

  getSubmissionRef(submissionId) {
    return this.groupRef.collection("submissions")
      .doc(submissionId)
      .withConverter(DateConverter);
  }

  getRoundRef(roundId) {
    return this.groupRef.collection("rounds")
      .doc(roundId)
      .withConverter(DateConverter);
  }

  get groupRef() {
    return db.collection("groups").doc(store.currentGroup);
  }
}

window.customElements.define("vote-page", VotePage);
