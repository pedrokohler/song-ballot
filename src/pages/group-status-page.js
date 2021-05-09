import { LitElement, html, css } from "lit-element";
import "@polymer/paper-progress/paper-progress";

import "../components/default-background";
import "../components/alert-modal";
import "../components/input-modal";
import ModalDisplayableMixin from "./mixins/modal-displayable-mixin";
import OngoingRoundDependableMixin from "./mixins/ongoing-round-dependable-mixin";
import { store } from "../store";
import {
  hasUserReachedSubmissionLimit,
  hasUserAlreadyEvaluated,
  hasSubmissionPeriodEnded,
  hasEvaluationsPeriodEnded,
} from "../domain/aggregates/stages";

const BaseClass = ModalDisplayableMixin(
  OngoingRoundDependableMixin(
    LitElement,
  ),
);

export default class GroupStatusPage extends BaseClass {
  static get styles() {
    return css`
        section {
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
            justify-content: center;
            padding: 25px;
            padding-top: 20px;
            box-sizing: border-box;
        }

        h1,h2,h4,h5,h6,p {
            margin-top: 0;
            text-align: center;
        }

        p {
          margin-bottom: 1.5em;
        }

        table p {
          margin-bottom: 0.6em;
        }

        h5 {
          margin-bottom: 0.6em;
        }

        h4 {
            font-weight: 500;
            font-size: 1.5em;
            text-transform: uppercase;
            margin-bottom: 2em;
        }

        div {
            width: 100%;
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        button {
            margin-bottom: 1em;
            margin-top: 1em;
            width: 100px;
            height: 35px;
            text-transform: uppercase;
            background-color: #FBC303;
            font-weight: 900;
            font-family: inherit;
            border: none;
            border-radius: 3px;
            vertical-align: baseline;
            cursor: pointer;
        }
      
        paper-progress {
          width: 100vw;
          --paper-progress-active-color: #FBC303;
        }
    `;
  }

  render() {
    if (this.isLoading) {
      return html`
        <paper-progress class="blue" indeterminate></paper-progress>
      `;
    }

    return html`
        <default-background>
            <section>
                ${this.groupStatusTemplate()}
                <div>
                  <button
                    @click="${this.handleGoBackClick}"
                    ?disabled=${this.hasOngoingRequest}
                  >Voltar</button>
                </div>
            </section>
        </default-background>
    `;
  }

  groupStatusTemplate() {
    return html`
      <h4>${store.currentGroup.name}</h4>
      <h5>Rodada ${this.startDate}</h5>
      <p></p>
      <h5>Último ganhador</h5>
      <p>${store.ongoingRound.lastWinner.displayName}</p>
      <h5>Fase atual</h5>
      <p>${this.getCurrentRoundPhase()}</p>
      <h5>Limite da fase atual</h5>
      <p>${this.getCurrentRoundPhaseLimit()}</p>
      <table>
          <thead>
            <tr>
              <th><h5>Usuário</h5></th>
              <th><h5>Notificações?</h5></th>
              <th><h5>Enviou?</h5></th>
              <th><h5>Votou?</h5></th>
            </tr>
          </thead>
          <tbody>
            ${Array.from(store.users.values()).map(this.tableRowTemplate)}
          </tbody>
      </table>
    `;
  }

  tableRowTemplate(user) {
    const { displayName, telegramChatId } = user;
    const receivesNotification = !!telegramChatId;
    const alreadySentAllSongs = hasUserReachedSubmissionLimit(store.ongoingRound, user);
    const alreadyHasEvaluated = hasUserAlreadyEvaluated(store.ongoingRound, user);
    return html`
      <tr>
        <td>
          <p style="text-align: left">${displayName}</p>
        </td>
        <td>
          <p>${receivesNotification ? "✔" : ""}</p>
        </td>
        <td>
          <p>${alreadySentAllSongs ? "✔" : ""}</p>
        </td>
        <td>
          <p>${alreadyHasEvaluated ? "✔" : ""}</p>
        </td>
      </tr>
    `;
  }

  static get properties() {
    return {
      isLoading: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.isLoading = true;
  }

  async firstUpdated(changedProperties) {
    await super.firstUpdated(changedProperties);
    this.isLoading = false;
  }

  getCurrentRoundPhase() {
    const submissionsEnded = hasSubmissionPeriodEnded(store.ongoingRound);
    const evaluationsEnded = hasEvaluationsPeriodEnded(store.ongoingRound);
    if (evaluationsEnded) {
      return "Rodada terminou por tempo";
    }
    return submissionsEnded ? "Votação" : "Envio de músicas";
  }

  getCurrentRoundPhaseLimit() {
    if (this.getCurrentRoundPhase() === "Envio de músicas") {
      return this.submissionEndTime;
    }

    if (this.getCurrentRoundPhase() === "Votação") {
      return this.evaluationsEndTime;
    }

    return "Rodada expirada";
  }

  handleGoBackClick() {
    this.ownerDocument.defaultView.history.replaceState(null, "", "menu");
  }

  trasnformToFirstCapitalLetter(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  }

  get startDate() {
    const { submissionsStartAt } = store.ongoingRound;
    return submissionsStartAt.toLocaleDateString();
  }

  get localeOptions() {
    return {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    };
  }

  get submissionEndTime() {
    const { submissionsEndAt } = store.ongoingRound;
    const timeString = submissionsEndAt.toLocaleString(undefined, this.localeOptions);
    return this.trasnformToFirstCapitalLetter(timeString);
  }

  get evaluationsEndTime() {
    const { evaluationsEndAt } = store.ongoingRound;
    const timeString = evaluationsEndAt.toLocaleString(undefined, this.localeOptions);
    return this.trasnformToFirstCapitalLetter(timeString);
  }
}

window.customElements.define("group-status-page", GroupStatusPage);
