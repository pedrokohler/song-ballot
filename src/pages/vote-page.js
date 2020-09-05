import { LitElement, html, css } from 'lit-element';
import { observer } from 'mobx-lit-element';
import { getSnapshot } from 'mobx-state-tree';

import '@polymer/paper-progress/paper-progress';
import '../components/default-background';
import '../components/alert-modal';
import forwardArrows from '../images/forward-arrows.png';
import backwardArrows from '../images/backward-arrows.png';
import { store } from '../store';
import { db, DateConverter } from '../services/firebase';

export default class VotePage extends observer(LitElement) {
  static get styles() {
    return css`
        .shell {
            border-radius: 3px;
            min-height: 200px;
            height: inherit;
            width: 90%;
            min-width: 300px;
            max-width: 600px;
            background-color: #FBFBD3;
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
      submissionIndex: {
        type: Number,
      },
      onCloseMessage: {
        type: Function,
      },
      message: {
        type: String,
      },
      score: {
        type: Number,
      },
      isFamous: {
        type: Boolean,
      },
      seeOverview: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.isLoading = true;
    this.seeOverview = false;
    this.onCloseMessage = () => { this.message = ''; };
    this.isLoading = true;

    this.roundStartDate = '';
    this.endTime = '';
    this.endWeekday = '';

    this.submissionIndex = 0;
  }

  async firstUpdated() {
    try {
      if (!store.ongoingRound) {
        await store.getOngoingRound();
      }

      const { submissionsStartAt, evaluationsStartAt, evaluationsEndAt } = store.ongoingRound;

      this.roundStartDate = submissionsStartAt.toLocaleDateString();
      this.endTime = evaluationsEndAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      this.endWeekday = evaluationsEndAt.toLocaleString(undefined, { weekday: 'long' });
      this.startTime = evaluationsStartAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      this.startWeekday = evaluationsStartAt.toLocaleString(undefined, { weekday: 'long' });

      if (Date.now() > evaluationsEndAt) {
        this.message = `O período para votar acabou ${this.endWeekday} às ${this.endTime}.`;
        this.onCloseMessage = () => window.history.replaceState(null, '', 'menu');
        this.isLoading = false;
        return;
      }

      if (Date.now() < evaluationsStartAt) {
        this.message = `O período para votar começa ${this.startWeekday} às ${this.startTime}.`;
        this.onCloseMessage = () => window.history.replaceState(null, '', 'menu');
        this.isLoading = false;
        return;
      }

      const userAlreadyEvaluated = Array
        .from(store.ongoingRound.evaluations.values())
        .find((evaluation) => evaluation.evaluator.id === store.currentUser.id);

      if (userAlreadyEvaluated) {
        this.message = 'Você já votou esta semana.';
        this.onCloseMessage = () => window.history.replaceState(null, '', 'menu');
        this.isLoading = false;
        return;
      }

      const otherUsersSongs = Array.from(store.submissions.values())
        .filter((sub) => sub.submitter.id !== store.currentUser.id);

      if (otherUsersSongs.length) {
        this.submissions = otherUsersSongs;
      } else {
        this.message = 'Não há músicas para votar.';
        this.onCloseMessage = () => window.history.replaceState(null, '', 'menu');
        this.isLoading = false;
        return;
      }

      this.score = this.getScore();
      this.isFamous = this.getIsFamous();
    } catch (e) {
      this.message = e.message;
      this.onCloseMessage = () => window.history.replaceState(null, '', 'menu');
    }
    this.isLoading = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('submissionIndex')) {
      this.score = this.getScore();
      this.isFamous = this.getIsFamous();
    }
  }

  getScore() {
    const currentSubmission = this.submissions[this.submissionIndex];
    const value = window.localStorage.getItem(`${currentSubmission.id}-${store.currentUser.id}-score`);
    return value || '';
  }

  getIsFamous() {
    const currentSubmission = this.submissions[this.submissionIndex];
    const value = window.localStorage.getItem(`${currentSubmission.id}-${store.currentUser.id}-is-famous`);
    if (value === 'true') {
      return true;
    }
    return false;
  }

  handleIsFamousInput(e) {
    const currentSubmission = this.submissions[this.submissionIndex];
    window.localStorage.setItem(`${currentSubmission.id}-${store.currentUser.id}-is-famous`, e.target.checked);
    this.isFamous = e.target.checked;
  }

  handleScoreInput(e) {
    const { value } = e.target;
    let newValue;

    if ((Number.isInteger(value) && value >= 1 && value <= 10) || value === '') {
      newValue = value;
    } else {
      if (value > 10) {
        newValue = 10;
      } else if (value < 1) {
        newValue = 1;
      } else {
        newValue = value;
      }
      newValue = Math.round(newValue);
    }

    const currentSubmission = this.submissions[this.submissionIndex];
    window.localStorage.setItem(`${currentSubmission.id}-${store.currentUser.id}-score`, newValue);
    e.target.value = newValue;
    this.score = newValue;
  }

  async handleEvaluation() {
    try {
      const evaluations = this.submissions.map((sub) => {
        const evaluationModel = store.addEvaluation({
          id: store.generateId(),
          evaluator: store.currentUser.id,
          evaluatee: sub.submitter.id,
          song: sub.song.id,
          score: Number(window.localStorage.getItem(`${sub.id}-${store.currentUser.id}-score`)),
          ratedFamous: window.localStorage.getItem(`${sub.id}-${store.currentUser.id}-is-famous`) === 'true',
          round: store.ongoingRound.id,
        });
        sub.addEvaluation(evaluationModel.id);
        store.ongoingRound.addEvaluation(evaluationModel.id);
        return getSnapshot(evaluationModel);
      });

      const submissionsIds = this.submissions.map((sub) => sub.id);
      const evaluationsIds = evaluations.map((evaluation) => evaluation.id);

      const roundRef = db.collection('groups').doc(store.currentGroup).collection('rounds')
        .doc(store.ongoingRound.id)
        .withConverter(DateConverter);

      db.runTransaction(async (transaction) => {
        const round = await transaction.get(roundRef);
        const roundEvaluations = round.data().evaluations || [];
        const submissions = await Promise.all(submissionsIds.map(async (id) => {
          const subRef = db.collection('groups').doc(store.currentGroup).collection('submissions').doc(id)
            .withConverter(DateConverter);
          const submission = transaction.get(subRef);
          return submission;
        }));

        submissions.forEach(async (submission) => {
          const subData = submission.data();
          const subEvaluations = subData.evaluations;
          const evaluation = evaluations
            .find((subEvaluation) => subEvaluation.song === subData.song);
          const evalRef = db.collection('groups').doc(store.currentGroup).collection('evaluations').doc(evaluation.id)
            .withConverter(DateConverter);

          await transaction
            .update(
              submission.ref.parent.doc(submission.id),
              { evaluations: [...subEvaluations, evaluation.id] },
            );
          await transaction.set(evalRef, evaluation);
        });
        await transaction
          .update(roundRef, { evaluations: [...roundEvaluations, ...evaluationsIds] });
      }).then(() => {
        this.submissions.forEach((sub) => {
          window.localStorage.removeItem(`${sub.id}-${store.currentUser.id}-score`);
          window.localStorage.removeItem(`${sub.id}-${store.currentUser.id}-is-famous`);
        });
        this.message = 'Voto enviado com sucesso!';
        this.onCloseMessage = () => window.history.replaceState(null, '', 'menu');
      }).catch(() => {
        this.message = 'Houve um problema ao tentar enviar seu voto. Tente novamente mais tarde.';
      });
    } catch (e) {
      const isScoreError = e.message.indexOf('/score') > 0;
      if (isScoreError) {
        this.message = 'Você não pontuou todas as músicas com um valor válido.';
      } else {
        this.message = e.message;
      }
    }
  }

  videoTemplate() {
    const currentSubmission = this.submissions && this.submissions[this.submissionIndex];

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
                .disabled=${this.submissionIndex <= 0}
                class="navigation-btn"
                @click=${() => { this.submissionIndex -= 1; }}
            >
                <img src=${backwardArrows} alt="ir para música anterior"/>
                <span>anterior</span>
            </button>
            <button
                .hidden=${this.submissionIndex >= this.submissions.length - 1}
                class="navigation-btn"
                @click=${() => { this.submissionIndex += 1; }}
            >
                <span>próxima</span>
                <img src=${forwardArrows} alt="ir para próxima música"/>
            </button>
            <button
                .hidden=${!(this.submissionIndex >= this.submissions.length - 1)}
                class="navigation-btn"
                @click=${() => { this.seeOverview = true; }}
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
        <label>Nota ${window.localStorage.getItem(`${sub.id}-${store.currentUser.id}-score`) || 'inválida'}</label>
        <label>${window.localStorage.getItem(`${sub.id}-${store.currentUser.id}-is-famous`) === 'true' ? 'Famosa' : ''}</label>
        <hr/>
      `)}
      <section class="navigation-section">
          <button
              class="navigation-btn"
              @click=${() => { this.seeOverview = false; }}
          >
              <img src=${backwardArrows} alt="voltar à votação"/>
              <span>voltar</span>
          </button>
          <button
              class="navigation-btn"
              @click=${this.handleEvaluation.bind(this)}
          >
              <span>confirmar</span>
          </button>
      </section>
    `;
  }

  render() {
    if (this.isLoading) {
      return html`
        <paper-progress class="blue" indeterminate></paper-progress>
      `;
    }

    return html`
        <alert-modal
            .isOpen=${!!this.message}
            .onClose=${this.onCloseMessage}
        >
            ${this.message}
        </alert-modal>
        <default-background>
            <section class="shell">
                <h3>Votar</h3>
                <h4>Semana ${this.roundStartDate}</h4>
                <p>O limite para votação é até ${this.endTime} de ${this.endWeekday}</p>
                <hr/>
                ${this.seeOverview ? this.overviewTemplate() : this.videoTemplate()}
            </section>
        </default-background>
    `;
  }
}

window.customElements.define('vote-page', VotePage);
