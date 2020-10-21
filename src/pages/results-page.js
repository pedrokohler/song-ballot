import { LitElement, html, css } from "lit-element";
import { observer } from "mobx-lit-element";
import "@polymer/paper-progress/paper-progress";

import "../components/default-background";
import "../components/alert-modal";
import forwardArrows from "../images/forward-arrows.png";
import backwardArrows from "../images/backward-arrows.png";
import { store } from "../store";

export default class ResultsPage extends observer(LitElement) {
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
    `;
  }

  static get properties() {
    return {
      error: {
        type: String,
      },
      isLoading: {
        type: Boolean,
      },
      submissionIndex: {
        type: Number,
      },
    };
  }

  tableTemplate(ev) {
    const { displayName } = ev.evaluator;
    const { score, ratedFamous } = ev;
    return html`
            <tr>
              <td>${displayName}</td>
              <td>${score}</td>
              <td>${ratedFamous ? "Sim" : "Não"}</td>
            </tr>
          `;
  }

  async firstUpdated() {
    this.onCloseError = () => { this.error = ""; };
    this.submissionIndex = 0;
    this.isLoading = true;
    this.startDate = "";

    try {
      if (!store.ongoingRound) {
        await store.getOngoingRound();
      }

      const playerVotes = Array.from(store.ongoingRound.evaluations.values())
        .filter((ev) => ev.evaluator.id === store.currentUser.id);

      if (!playerVotes.length) {
        throw new Error("Você só poderá ver os resultados após votar.");
      }

      this.submissions = Array.from(store.ongoingRound?.submissions?.values());

      const { submissionsStartAt } = store.ongoingRound;

      this.startDate = submissionsStartAt.toLocaleDateString();
      this.currentSubmission = store.ongoingRound?.firstPlace;
    } catch (e) {
      this.onCloseError = () => window.history.replaceState(null, "", "menu");
      this.error = e.message;
    }

    this.isLoading = false;
  }

  render() {
    if (this.isLoading) {
      return html`
        <paper-progress class="blue" indeterminate></paper-progress>
      `;
    }

    this.currentSubmission = this.submissions?.[this.submissionIndex || 0];

    return html`
        <alert-modal
            .isOpen=${!!this.error}
            @button-clicked="${this.onCloseError}"
        >
            ${this.error}
        </alert-modal>
        <default-background>
            <section class="shell">
                <h3>Resultado</h3>
                <h4>Semana ${this.startDate}</h4>
                <h5>Vencedor</h5>
                <p>${store.ongoingRound?.firstPlace?.song?.title}</p>
                <p>${store.ongoingRound?.firstPlace?.submitter?.displayName}</p>
                <h5>Segundo colocado</h5>
                <p>${store.ongoingRound?.secondPlace?.song?.title}</p>
                <p>${store.ongoingRound?.secondPlace?.submitter?.displayName}</p>
                <h5>Último colocado</h5>
                <p>${store.ongoingRound?.lastPlace?.song?.title}</p>
                <p>${store.ongoingRound?.lastPlace?.submitter?.displayName}</p>
            </section>
            <section class="shell">
                <h3>Pontuação</h3>
                <h4 class="displayName">${this.currentSubmission?.submitter?.displayName}</h4>
                <p>${this.currentSubmission?.song?.title}</p>
                <h4>Nota</h4>
                <p>${this.currentSubmission?.points}</p>
                <h4>Pontos</h4>
                <p>${this.currentSubmission?.total}</p>
                <table>
                    <tr>
                      <th>Nome</th>
                      <th>Pontuação</th>
                      <th>Famosa?</th>
                    </tr>
                    ${this.currentSubmission?.evaluations?.map(this.tableTemplate)}
                </table>
                <section class="navigation-section">
                    <button
                        .disabled=${this.submissionIndex <= 0}
                        class="navigation-btn"
                        @click=${() => { this.submissionIndex -= 1; }}
                    >
                        <img src=${backwardArrows} alt="ir para música anterior"/>
                        <span>anterior</span>
                    </button>
                    <button
                        .disabled=${this.submissionIndex >= this.submissions?.length - 1}
                        class="navigation-btn"
                        @click=${() => { this.submissionIndex += 1; }}
                    >
                        <span>próxima</span>
                        <img src=${forwardArrows} alt="ir para próxima música"/>
                    </button>
                </section>
            </section>
        </default-background>
    `;
  }
}

window.customElements.define("results-page", ResultsPage);
