import { LitElement, html, css } from "lit-element";
import "@polymer/paper-progress/paper-progress";

import "../components/default-background";
import "../components/alert-modal";
import "../components/blurred-component";

import forwardArrows from "../images/forward-arrows.png";
import backwardArrows from "../images/backward-arrows.png";
import { store } from "../store";
import OngoingRoundDependableMixin from "./mixins/ongoing-round-dependable-mixin";
import ResultsModalDisplayableMixin from "./mixins/modal-displayable-mixins/results-modal-displayable-mixin";
import { getFirebaseTimestamp } from "../services/firebase";

const SuperClass = ResultsModalDisplayableMixin(
  OngoingRoundDependableMixin(
    LitElement,
  ),
);

export default class ResultsPage extends SuperClass {
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

        .displayName {
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

        .navigation-section {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 1em;
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

        td {
          text-align: center;
          font-weight: 300;
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
      <section class="navigation-section">
          <button
              ?disabled=${this.shouldDisablePreviousSubmissionButton()}
              class="navigation-btn"
              @click=${() => { this.submissionIndex -= 1; }}
          >
              <img src=${backwardArrows} alt="ir para música anterior"/>
              <span>anterior</span>
          </button>
          <button
              ?disabled=${this.shouldDisableNextSubmissionButton()}
              class="navigation-btn"
              @click=${() => { this.submissionIndex += 1; }}
          >
              <span>próxima</span>
              <img src=${forwardArrows} alt="ir para próxima música"/>
          </button>
      </section>
    `;
  }

  roundNavigationSectionTemplate() {
    return html`
      <section class="navigation-section">
          <button
              ?disabled=${this.shouldDisablePreviousRoundButton()}
              class="navigation-btn"
              @click=${this.onPreviousRoundClick}
          >
              <img src=${backwardArrows} alt="ir para música anterior"/>
              <span>anterior</span>
          </button>
          <button
              ?disabled=${this.shouldDisableNextRoundButton()}
              class="navigation-btn"
              @click=${this.onNextRoundClick}
          >
              <span>próxima</span>
              <img src=${forwardArrows} alt="ir para próxima música"/>
          </button>
      </section>
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
      ${this.playerRankingTemplate("Último ", "lastPlace")}
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
        <h4 class="displayName">${this.currentSubmission?.submitter?.displayName}</h4>
        <a href=${this.getDirectYoutubeUrl(this.currentSubmission?.song?.id)} target="_blank">
          <p>${this.currentSubmission?.song?.title}</p>
        </a>
      </section>
      <h5>Nota Final</h5>
      <p>${this.currentSubmission?.points}</p>
      <h5>Pontuação Final</h5>
      <p>${this.currentSubmission?.total}</p>
      <h5>Penalidade</h5>
      <p>${this.currentSubmission?.penalty}</p>
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

  tableRowTemplate(ev) {
    const { score, ratedFamous, evaluator: { displayName } } = ev;
    return html`
      <tr>
        <td style="text-align: left">
          <p>${displayName}</p>
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

    this.checkHasPlayerVotedThisRound();
    this.updateSubmissions(store.ongoingRound.id);

    this.isLoading = false;
  }

  checkHasPlayerVotedThisRound() {
    const playerVotes = Array.from(store.ongoingRound.evaluations.values())
      .filter((ev) => ev.evaluator.id === store.currentUser.id);

    if (!playerVotes.length) {
      this.safeOpenAlertModal(this.alertCodes.HAS_NOT_VOTED);
    } else {
      this.hasPlayerVotedThisRound = true;
    }
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
    await store.fetchNextPaginatedRound(
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
    return !this.isOngoingRound || this.hasPlayerVotedThisRounds;
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
