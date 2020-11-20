import { LitElement, html, css } from "lit-element";
import "@polymer/paper-progress/paper-progress";

import "../components/default-background";
import "../components/alert-modal";
import "../components/blurred-component";
import "../components/navigation-buttons";

import { store } from "../store";
import OngoingRoundDependableMixin from "./mixins/ongoing-round-dependable-mixin";
import ResultsModalDisplayableMixin from "./mixins/modal-displayable-mixins/results-modal-displayable-mixin";
import { getFirebaseTimestamp } from "../services/firebase";

const BaseClass = ResultsModalDisplayableMixin(
  OngoingRoundDependableMixin(
    LitElement,
  ),
);

export default class ResultsPage extends BaseClass {
  static get styles() {
    return css`
        .shell {
            font-size: 120%;
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

        .display-name {
          text-align: left;
          font-size: 0.8em;
        }

        p {
            font-size: 0.8em;
            font-weight: 300;
            margin-bottom: 0.1em;
        }

        h5 {
            margin-top: 0.6em;
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

        div h4 {
            margin-bottom: 0;
            text-transform: none;
            text-align: left;
        }

        div h6 {
            margin-top: 0;
            font-weight: 400;
            text-align: left;
            margin-bottom: 1em;
        }

        paper-progress {
          width: 100vw;
          --paper-progress-active-color: #FBC303;
        }

        blurred-component {
          display: inherit;
          flex-direction: inherit;
          align-items: inherit;
          justify-content: inherit;
          box-sizing: inherit;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          word-break: break-word;
        }

        blurred-component a, blurred-component a:visited {
          text-decoration: inherit;
          color: inherit;
          cursor: auto;
          pointer-events: none;
        }

        .submission-status-header {
          margin-bottom: 1em;
          font-size: 1em;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        @media only screen and (max-width: 600px) {
          .shell {
              font-size: 100%;
          }
          .submission-status-header {
            font-size: 1em;
          }
        }

        .player-ranking-section {
          margin-bottom: 1em;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        a {
          color: #FBC303;
        }
    `;
  }

  constructor() {
    super();
    this.isLoading = true;
    this.submissionIndex = 0;
    this.roundIndex = 0;
    this.hasPlayerVotedThisRound = false;
    this.maxRoundIndex = Infinity;
    this.hasOngoingRequest = false;
  }

  static get properties() {
    return {
      isLoading: {
        type: Boolean,
      },
      submissionIndex: {
        type: Number,
      },
      roundIndex: {
        type: Number,
      },
      maxRoundIndex: {
        type: Number,
      },
      hasPlayerVotedThisRound: {
        type: Boolean,
      },
      hasOngoingRequest: {
        type: Boolean,
      },
    };
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
                <h3>Resultado${this.isOngoingRound ? " parcial " : " "}da rodada</h3>
                <h4>Semana ${this.startDate}</h4>
                ${this.roundOverViewTemplate()}
                ${this.roundNavigationSectionTemplate()}
            </section>
            <section class="shell">
                <h3>Avaliação das músicas</h3>
                ${this.submissionOverviewTemplate()}
                ${this.submissionNavigationSectionTemplate()}
            </section>
        </default-background>
    `;
  }

  submissionNavigationSectionTemplate() {
    return html`
      <navigation-buttons
        forwardArrowsAlt="ir para próxima música"
        ?forwardArrowsDisabled="${this.shouldDisableNextSubmissionButton()}"
        @forward-arrows-clicked="${() => { this.submissionIndex += 1; }}"

        backwardArrowsAlt="ir para música anterior"
        ?backwardArrowsDisabled="${this.shouldDisablePreviousSubmissionButton()}"
        @backward-arrows-clicked="${() => { this.submissionIndex -= 1; }}"
      >
      </navigation-buttons>
    `;
  }

  roundNavigationSectionTemplate() {
    return html`
      <navigation-buttons
        forwardArrowsAlt="ir para próximo round"
        ?forwardArrowsDisabled="${this.shouldDisableNextRoundButton()}"
        @forward-arrows-clicked="${this.onNextRoundClick.bind(this)}"

        backwardArrowsAlt="ir para round anterior"
        ?backwardArrowsDisabled="${this.shouldDisablePreviousRoundButton()}"
        @backward-arrows-clicked="${this.onPreviousRoundClick.bind(this)}"
      >
      </navigation-buttons>
    `;
  }

  roundOverViewTemplate() {
    return this.canSeeCurrentRoundResults
      ? html`
        ${this.playerRankingOverview()}
      `
      : html`
        <blurred-component>
          ${this.playerRankingOverview()}
        </blurred-component>
      `;
  }

  playerRankingOverview() {
    return html`
      ${this.playerRankingTemplate("Vencedor", "firstPlace")}
      ${this.playerRankingTemplate("Segundo colocado", "secondPlace")}
      ${this.playerRankingTemplate("Último colocado", "lastPlace")}
    `;
  }

  playerRankingTemplate(title, fieldName) {
    const song = this.currentRound?.[fieldName]?.song;
    return html`
      <section class="player-ranking-section">
        <h5>${title}</h5>
        <p>${this.currentRound?.[fieldName]?.submitter?.displayName}</p>
        <a href=${this.getDirectYoutubeUrl(song?.id)} target="_blank">
          <p>${song?.title}</p>
        </a>
      </section>
    `;
  }

  submissionOverviewTemplate() {
    return this.canSeeCurrentRoundResults
      ? html`
        ${this.submissionStatusTemplate()}
      `
      : html`
        <blurred-component>
          ${this.submissionStatusTemplate()}
        </blurred-component>
      `;
  }

  submissionStatusTemplate() {
    return html`
      <section class="submission-status-header">
        <h4 class="display-name">${this.currentSubmission?.submitter?.displayName}</h4>
        <a href=${this.getDirectYoutubeUrl(this.currentSubmission?.song?.id)} target="_blank">
          <p>${this.currentSubmission?.song?.title}</p>
        </a>
      </section>
      <h5>Nota Final</h5>
      <p>${this.currentSubmission?.points}</p>
      <h5>Pontuação Total</h5>
      <p>${this.currentSubmission?.total}</p>
      <h5>Penalidade</h5>
      <p>${-this.currentSubmission?.penalty}</p>
      <table>
          <thead>
            <tr>
              <th><h5>Avaliador</h5></th>
              <th><h5>Pontos</h5></th>
              <th><h5>Famosa?</h5></th>
            </tr>
          </thead>
          <tbody>
            ${this.currentSubmission?.evaluations?.map(this.tableRowTemplate)}
          </tbody>
      </table>
    `;
  }

  tableRowTemplate(evaluation) {
    const { score, ratedFamous, evaluator: { displayName } } = evaluation;
    return html`
      <tr>
        <td>
          <p style="text-align: left">${displayName}</p>
        </td>
        <td>
          <p>${score}</p>
        </td>
        <td>
          <p>${ratedFamous ? "Sim" : "Não"}</p>
        </td>
      </tr>
    `;
  }

  async firstUpdated(changedProperties) {
    await super.firstUpdated(changedProperties);

    this.hasPlayerVotedThisRound = this.checkHasPlayerVotedThisRound();

    if (!this.hasPlayerVotedThisRound) {
      this.safeOpenAlertModal(this.alertCodes.HAS_NOT_VOTED);
    }

    this.updateSubmissions(store.ongoingRound.id);

    this.isLoading = false;
  }

  checkHasPlayerVotedThisRound() {
    return Array.from(store.ongoingRound.evaluations.values())
      .some((evaluation) => evaluation.evaluator.id === store.currentUser.id);
  }

  updateSubmissions(roundId) {
    this.submissions = Array
      .from(store.rounds.get(roundId)?.submissions?.values())
      .sort((a, b) => b.points - a.points);
  }

  getDirectYoutubeUrl(id) {
    return `https://youtube.com/watch?v=${id}`;
  }

  async onNextRoundClick() {
    if (this.lastRoundIndex > this.roundIndex) {
      this.shiftRoundBy(1);
      return;
    }
    await this.onIsLastRoundLoaded();
  }

  async onIsLastRoundLoaded() {
    this.hasOngoingRequest = true;
    await this.maybeLoadNextRound();
    this.hasOngoingRequest = false;

    if (this.lastRoundIndex > this.roundIndex) {
      this.shiftRoundBy(1);
    } else {
      this.onRoundLimitReached();
    }
  }

  async maybeLoadNextRound() {
    await store.maybeLoadNextPaginatedRound(
      getFirebaseTimestamp(this.currentRound.submissionsStartAt),
    );
  }

  onPreviousRoundClick() {
    this.shiftRoundBy(-1);
  }

  shiftRoundBy(n) {
    this.roundIndex += n;
    this.submissionIndex = 0;
    this.updateSubmissions(this.currentRound.id);
  }

  onRoundLimitReached() {
    this.maxRoundIndex = this.lastRoundIndex;
    this.safeOpenAlertModal(this.alertCodes.FIRST_ROUND_REACHED);
  }

  shouldDisableNextSubmissionButton() {
    const isLastSubmission = this.submissionIndex >= this.submissions?.length - 1;
    return !this.canSeeCurrentRoundResults
      || isLastSubmission
      || this.hasOngoingRequest;
  }

  shouldDisablePreviousSubmissionButton() {
    const isFirstSubmission = this.submissionIndex <= 0;
    return !this.canSeeCurrentRoundResults
      || isFirstSubmission
      || this.hasOngoingRequest;
  }

  shouldDisablePreviousRoundButton() {
    const isFirstRound = this.roundIndex <= 0;
    return isFirstRound
      || this.hasOngoingRequest;
  }

  shouldDisableNextRoundButton() {
    const isLastRound = this.roundIndex >= this.maxRoundIndex;
    return isLastRound
      || this.hasOngoingRequest;
  }

  get rounds() {
    return Array.from(store.rounds.values());
  }

  get lastRoundIndex() {
    return this.rounds.length - 1;
  }

  get currentRound() {
    return this.rounds?.[this.roundIndex];
  }

  get currentSubmission() {
    return this.submissions?.[this.submissionIndex];
  }

  get canSeeCurrentRoundResults() {
    return !this.isOngoingRound || this.hasPlayerVotedThisRound;
  }

  get startDate() {
    const { submissionsStartAt } = this.currentRound || { submissionsStartAt: new Date() };
    return submissionsStartAt.toLocaleDateString();
  }

  get isOngoingRound() {
    return this.currentRound.id === store.ongoingRound.id;
  }
}

window.customElements.define("results-page", ResultsPage);
