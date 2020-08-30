import { LitElement, html, css } from 'lit-element';
import { observer } from 'mobx-lit-element';
import '../components/default-background';
import '../components/alert-modal';
import forwardArrows from '../images/forward-arrows.png';
import backwardArrows from '../images/backward-arrows.png';
import { store } from '../store';
import '@polymer/paper-progress/paper-progress';

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

        input {
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
    };
  }

  constructor() {
    super();
    this.isLoading = true;
  }

  async firstUpdated() {
    // this.onCloseError = () => { this.error = ''; };
    this.isLoading = true;

    this.startDate = '';
    this.endTime = '';
    this.endWeekday = '';

    this.submissionIndex = 0;
    try {
      if (!store.ongoingRound) {
        await store.getOngoingRound();
      }

      const { submissionsStartAt, evaluationsStartAt, evaluationsEndAt } = store.ongoingRound;

      this.startDate = submissionsStartAt.toLocaleDateString();
      this.endTime = evaluationsEndAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      this.endWeekday = evaluationsEndAt.toLocaleString(undefined, { weekday: 'long' });

      if (Date.now() > evaluationsEndAt) {
        this.error = `O período para enviar músicas acabou ${this.endWeekday} ${this.endTime}.`;
        this.onCloseError = () => window.history.replaceState(null, '', 'menu');
        this.isLoading = false;
        return;
      }

      if (Date.now() < evaluationsStartAt) {
        this.error = `O período para enviar músicas começa em ${this.endWeekday} ${this.endTime}.`;
        this.onCloseError = () => window.history.replaceState(null, '', 'menu');
        this.isLoading = false;
        return;
      }

      const otherUsersSongs = Array.from(store.submissions.values())
        .filter((sub) => sub.submitter.id !== store.currentUser.id);

      this.submissions = otherUsersSongs;
    } catch (e) {
      console.log(e.message);
    }
    this.isLoading = false;
  }

  getInputValue(submissionId) {
    const value = window.localStorage.getItem(`${submissionId}-${store.currentUser.id}`);
    return value || '';
  }

  handleInput(e) {
    const currentSubmission = this.submissions[this.submissionIndex];
    window.localStorage.setItem(`${currentSubmission.id}-${store.currentUser.id}`, e.target.value);
  }

  videoTemplate(submissionIndex) {
    const currentSubmission = this.submissions[submissionIndex];

    if (!currentSubmission) {
      return html``;
    }

    return html`
        <h4 class="song-title">${currentSubmission.song.title}</h4>
        <iframe src=${currentSubmission.song.url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <input
            type="number" max="10" min="1"
            @input=${this.handleInput}
            .value=${this.getInputValue(currentSubmission.id)}
        />
        <section class="navigation-section">
            <button
                .disabled=${submissionIndex <= 0}
                class="navigation-btn"
                @click=${() => { this.submissionIndex -= 1; }}
            >
                <img src=${backwardArrows} alt=""/>
                <span>anterior</span>
            </button>
            <button
                .hidden=${submissionIndex >= this.submissions.length - 1}
                class="navigation-btn"
                @click=${() => { this.submissionIndex += 1; }}
            >
                <span>próxima</span>
                <img src=${forwardArrows} alt=""/>
            </button>
            <button
                .hidden=${!(submissionIndex >= this.submissions.length - 1)}
                class="navigation-btn"
                @click=${() => { }}
            >
                <span>Enviar</span>
                <img src=${forwardArrows} alt=""/>
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
        <alert-modal></alert-modal>
        <default-background>
            <section class="shell">
                <h3>Votar</h3>
                <h4>Semana ${this.startDate}</h4>
                <p>O limite para votação é até ${this.endTime} de ${this.endWeekday}</p>
                <hr/>
                ${this.videoTemplate(this.submissionIndex)}
            </section>
        </default-background>
    `;
  }
}

window.customElements.define('vote-page', VotePage);
