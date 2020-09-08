import { LitElement, html, css } from 'lit-element';
import { observer } from 'mobx-lit-element';
import { getSnapshot } from 'mobx-state-tree';
import '@polymer/paper-progress/paper-progress';

import '../components/default-background';
import '../components/alert-modal';
import firebase from 'firebase';
import { db, DateConverter } from '../services/firebase';
import { store } from '../store';

export default class SendSongPage extends observer(LitElement) {
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

        input {
            height: 1.5em;
            width: calc(100% - 4px);
            border-radius: 3px;
            margin-bottom: 1em;
            font-family: inherit;
            border-style: solid;
            border-width: 1px;
            font-size: 1em;
            background-color: #F2F2F2;
        }

        button {
            margin-right: auto;
            margin-bottom: 1em;
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

  getYoutubeVideoTitle(videoId) {
    const getYoutubeTitle = firebase.functions().httpsCallable('getYoutubeTitle');
    return new Promise((resolve, reject) => {
      getYoutubeTitle({ videoId })
        .then((response) => resolve(response.data))
        .catch((e) => reject(e.message));
    });
  }

  getYoutubeVideoId(url) {
    const match = url.match(/.*\.be\/([^&]*).*$/) || url.match(/.*\.com\/watch\?v=([^&]*).*$/);
    return (match && match[1]) || null;
  }

  async handleConfirmationClick() {
    const userInput = this.shadowRoot.querySelector('input[type=url]').value;
    const videoId = this.getYoutubeVideoId(userInput);
    if (videoId) {
      const title = await this.getYoutubeVideoTitle(videoId);
      this.videoTitle = title;
      this.videoId = videoId;
    } else {
      this.error = 'O URL que você inseriu não é valido.';
    }
  }

  handleSendVideoClick() {
    db.collection('groups').doc(store.currentGroup).collection('songs').doc(this.videoId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          throw new Error('A música que você enviou já foi enviada antes. Tente outra música.');
        } else {
          const songModel = store.addSong({
            id: this.videoId,
            url: this.getURL(),
            title: this.videoTitle,
            round: store.ongoingRound.id,
            user: store.currentUser.id,
          });
          const song = getSnapshot(songModel);

          const submissionModel = store.addSubmission({
            id: store.generateId(),
            submitter: store.currentUser.id,
            song: this.videoId,
            evaluations: [],
            round: store.ongoingRound.id,
          });
          const submission = getSnapshot(submissionModel);

          const songRef = db.collection('groups').doc(store.currentGroup).collection('songs')
            .doc(this.videoId)
            .withConverter(DateConverter);
          const submissionRef = db.collection('groups').doc(store.currentGroup).collection('submissions')
            .doc(submissionModel.id)
            .withConverter(DateConverter);
          const roundRef = db.collection('groups').doc(store.currentGroup).collection('rounds')
            .doc(store.ongoingRound.id)
            .withConverter(DateConverter);

          db.runTransaction(async (transaction) => {
            const round = await transaction.get(roundRef);
            const oldSongs = round.data().songs || [];
            const newSongs = [...oldSongs, this.videoId];
            await transaction.set(songRef, song);
            await transaction.set(submissionRef, submission);
            await transaction.update(roundRef, { songs: newSongs });
          }).then(() => {
            this.songsSent += 1;
            this.shadowRoot.querySelector('#successModal').setAttribute('isOpen', '');
          }).catch(() => {
            this.error = 'Houve um problema ao tentar enviar a sua música. Tente novamente mais tarde.';
          });
        }
      })
      .catch((e) => {
        this.error = e.message;
      });
  }

  static get properties() {
    return {
      videoId: {
        type: String,
      },
      videoTitle: {
        type: String,
      },
      error: {
        type: String,
      },
      onCloseError: {
        type: Function,
      },
      isLoading: {
        type: Boolean,
      },
      songsSent: {
        type: Number,
      },
      songLimit: {
        type: Number,
      },
    };
  }

  async firstUpdated() {
    this.onCloseError = () => { this.error = ''; };
    this.songLimit = 1;
    this.isLoading = true;

    this.startDate = '';
    this.endTime = '';
    this.endWeekday = '';

    try {
      if (!store.ongoingRound) {
        await store.getOngoingRound();
      }

      const { submissionsStartAt, submissionsEndAt } = store.ongoingRound;

      this.startDate = submissionsStartAt.toLocaleDateString();
      this.endTime = submissionsEndAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      this.endWeekday = submissionsEndAt.toLocaleString(undefined, { weekday: 'long' });

      if (Date.now() > submissionsEndAt) {
        this.error = `O período para enviar músicas acabou ${this.endWeekday} ${this.endTime}.`;
        this.onCloseError = () => window.history.replaceState(null, '', 'menu');
        this.isLoading = false;
        return;
      }

      if (store.ongoingRound.lastWinner
        && store.ongoingRound.lastWinner.id === store.currentUser.id) {
        this.isLastWinner = true;
        this.songLimit += 1;
      }

      const userSubmissions = Array.from(store.submissions.values())
        .filter((submission) => submission.submitter.id === store.currentUser.id);

      this.songsSent = userSubmissions.length;

      if (this.songsSent >= this.songLimit) {
        this.error = 'Você já enviou o número máximo de músicas para esta rodada';
        this.onCloseError = () => window.history.replaceState(null, '', 'menu');
      }
    } catch (e) {
      this.onCloseError = () => window.history.replaceState(null, '', 'menu');
      this.error = e.message;
    }

    this.isLoading = false;
  }

  getURL() {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }

  videoTemplate() {
    return html`
        <hr/>
        <h4>${this.videoTitle}</h4>
        <iframe src=${this.getURL()} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <button
            @click=${this.handleSendVideoClick}
        >
        Enviar
        </button>
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
            id="successModal"
            .onClose=${() => window.history.pushState(null, '', 'menu')}
        >
            Música enviada com sucesso! ${this.songsSent < this.songLimit ? 'Você ainda pode enviar mais uma música!' : ''}
        </alert-modal>
        <alert-modal
            .isOpen=${!!this.error}
            .onClose=${this.onCloseError}
        >
            ${this.error}
        </alert-modal>
        <default-background>
            <section>
                <h3>Enviar música</h3>
                <h4>Semana ${this.startDate}</h4>
                <p>O limite para envio da música é até ${this.endTime} de ${this.endWeekday}</p>
                <hr/>
                <div>
                    <h4>Carregar música</h4>
                    <h6>Insira o link do vídeo do Youtube</h6>
                </div>
                <input type="url"/>
                <!-- @todo implement real callback -->
                <button @click="${this.handleConfirmationClick}">Carregar</button>
                ${this.videoId && this.videoTemplate()}
            </section>
        </default-background>
    `;
  }
}

window.customElements.define('send-song-page', SendSongPage);
