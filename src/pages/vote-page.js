import { LitElement, html, css } from "lit-element";

import "@polymer/paper-progress/paper-progress";
import "../components/default-background";
import "../components/alert-modal";
import "../components/navigation-buttons";

import OngoingRoundDependableMixin from "./mixins/ongoing-round-dependable-mixin";
import ModalDisplayableMixin from "./mixins/modal-displayable-mixin";
import VoteAggregateMixin from "./mixins/aggregates/vote-aggregate";
import { MAX_SCORE_ALLOWED, MIN_SCORE_ALLOWED } from "../domain/aggregates/score";

const BaseClass = VoteAggregateMixin(
  ModalDisplayableMixin(
    OngoingRoundDependableMixin(
      LitElement,
    ),
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
            type="number" max=${MAX_SCORE_ALLOWED} min=${MIN_SCORE_ALLOWED}
            @input=${this.handleScoreInput}
            .value=${this.score}
        />
        <label>
          <input
            type="checkbox"
            @change=${this.handleIsFamousInput}
            .checked=${this.isFamous}
          />
          Eu já conhecia essa música
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
        <label>${this.getIsFamousFromLocalStorage(submission?.id) === "true" ? "✔" : ""}</label>
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
}

window.customElements.define("vote-page", VotePage);
