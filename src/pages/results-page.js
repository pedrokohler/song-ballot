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
                <h3>Resultado da rodada</h3>
                <h4>Semana ${this.startDate}</h4>
                ${this.roundOverViewTemplate()}
                ${this.roundNavigationSectionTemplate()}
            </section>
            <section class="shell">
                <h3>Pontuação das músicas</h3>
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
              ?disabled=${!this.canSeeCurrentRoundResults || this.submissionIndex <= 0 || this.hasOngoingRequest}
              class="navigation-btn"
              @click=${() => { this.submissionIndex -= 1; }}
          >
              <img src=${backwardArrows} alt="ir para música anterior"/>
              <span>anterior</span>
          </button>
          <button
              ?disabled=${!this.canSeeCurrentRoundResults
                || this.submissionIndex >= this.submissions?.length - 1 || this.hasOngoingRequest}
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
              ?disabled=${this.roundIndex <= 0 || this.hasOngoingRequest}
              class="navigation-btn"
              @click=${this.getPreviousRound}
          >
              <img src=${backwardArrows} alt="ir para música anterior"/>
              <span>anterior</span>
          </button>
          <button
              ?disabled=${this.roundIndex >= this.maxRoundIndex || this.hasOngoingRequest}
              class="navigation-btn"
              @click=${this.getNextRound}
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
      <h5>${title}</h5>
      <a href=${this.getDirectYoutubeUrl(song?.id)} target="_blank">
        <p>${song?.title}</p>
      </a>
      <p>${this.currentRound?.[fieldName]?.submitter?.displayName}</p>
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
      <h4 class="displayName">${this.currentSubmission?.submitter?.displayName}</h4>
      <a href=${this.getDirectYoutubeUrl(this.currentSubmission?.song?.id)} target="_blank">
        <p>${this.currentSubmission?.song?.title}</p>
      </a>
      <h4>Nota</h4>
      <p>${this.currentSubmission?.points}</p>
      <h4>Pontos</h4>
      <p>${this.currentSubmission?.total}</p>
      <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Pontuação</th>
              <th>Famosa?</th>
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
          <span>${displayName}</span>
        </td>
        <td>
          <span>${score}</span>
        </td>
        <td>
          <span>${ratedFamous ? "Sim" : "Não"}</span>
        </td>
      </tr>
    `;
  }

  // @todo Refactor all code below
  async firstUpdated(changedProperties) {
    try {
      await super.firstUpdated(changedProperties);

      const playerVotes = Array.from(store.ongoingRound.evaluations.values())
        .filter((ev) => ev.evaluator.id === store.currentUser.id);

      if (!playerVotes.length) {
        this.safeOpenAlertModal(this.alertCodes.HAS_NOT_VOTED);
      } else {
        this.hasPlayerVotedThisRound = true;
      }

      this.submissions = Array.from(store.ongoingRound?.submissions?.values());
    } catch (e) {
      this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU, e.message);
    }

    this.isLoading = false;
  }

  getDirectYoutubeUrl(id) {
    return `https://youtube.com/watch?v=${id}`;
  }

  getPreviousRound() {
    this.roundIndex -= 1;
    this.submissionIndex = 0;
    this.submissions = Array.from(this.currentRound?.submissions?.values());
  }

  async getNextRound() {
    this.hasOngoingRequest = true;
    const maxRoundIndex = this.rounds.length - 1;
    if (maxRoundIndex > this.roundIndex) {
      this.roundIndex += 1;
      this.submissionIndex = 0;
      this.submissions = Array.from(this.currentRound?.submissions?.values());
    } else {
      await store.fetchNextPaginatedRound(
        getFirebaseTimestamp(this.currentRound.submissionsStartAt),
      );
      const newMaxRoundIndex = this.rounds.length - 1;
      if (newMaxRoundIndex > this.roundIndex) {
        this.roundIndex += 1;
        this.submissionIndex = 0;
        this.submissions = Array.from(this.currentRound?.submissions?.values());
      } else {
        this.maxRoundIndex = newMaxRoundIndex;
        this.safeOpenAlertModal(this.alertCodes.FIRST_ROUND_REACHED);
      }
    }
    this.hasOngoingRequest = false;
  }

  get rounds() {
    return Array.from(store.rounds.values());
  }

  get currentRound() {
    return this.rounds?.[this.roundIndex];
  }

  get currentSubmission() {
    return this.submissions?.[this.submissionIndex];
  }

  get canSeeCurrentRoundResults() {
    return this.hasPlayerVotedThisRound || this.currentRound.id !== store.ongoingRound.id;
  }

  get startDate() {
    const { submissionsStartAt } = this.currentRound || { submissionsStartAt: new Date() };
    return submissionsStartAt.toLocaleDateString();
  }
}

window.customElements.define("results-page", ResultsPage);
