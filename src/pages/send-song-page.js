import { LitElement, html, css } from "lit-element";
import { getSnapshot } from "mobx-state-tree";
import "@polymer/paper-progress/paper-progress";

import "../components/default-background";
import "../components/alert-modal";
import "../components/input-modal";
import { db, DateConverter, fetchYoutubeVideoTitle } from "../services/firebase";
import { store } from "../store";
import SendSongModalDisplayableMixin from "./mixins/modal-displayable-mixins/send-song-modal-displayable-mixin";
import OngoingRoundDependableMixin from "./mixins/ongoing-round-dependable-mixin";

const SuperClass = SendSongModalDisplayableMixin(OngoingRoundDependableMixin(LitElement));

export default class SendSongPage extends SuperClass {
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

  static get properties() {
    return {
      videoId: {
        type: String,
      },
      hasOngoingRequest: {
        type: Boolean,
      },
      videoTitle: {
        type: String,
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

  constructor() {
    super();
    this.songLimit = 0;
    this.isLoading = true;
    this.hasOngoingRequest = false;
    this.startDateString = "";
    this.endTimeString = "";
    this.endWeekdayString = "";
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
                <h3>Enviar música</h3>
                <h4>Semana ${this.startDateString}</h4>
                <p>O limite para envio da música é até ${this.endTimeString} de ${this.endWeekdayString}</p>
                <hr/>
                <div>
                    <h4>Carregar música</h4>
                    <h6>Insira o link do vídeo do Youtube</h6>
                </div>
                <input type="url"/>
                <button
                  @click="${this.handleConfirmationClick}"
                  ?disabled=${this.hasOngoingRequest}
                >Carregar</button>
                ${this.videoId ? this.videoTemplate() : ""}
            </section>
        </default-background>
    `;
  }

  videoTemplate() {
    return html`
        <hr/>
        <h4>${this.videoTitle}</h4>
        <iframe src=${this.videoURL} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <button
            @click=${this.handleSendVideoClick}
            ?disabled=${this.hasOngoingRequest}
        >
        Enviar
        </button>
    `;
  }

  async firstUpdated(changedProperties) {
    await super.firstUpdated(changedProperties);
    const { submissionsStartAt, submissionsEndAt } = store.ongoingRound;
    this.setDateStrings(submissionsStartAt, submissionsEndAt);
    this.checkSubmissionsEnded(submissionsEndAt);
    this.setSongLimit();
    this.checkSongLimit();
    this.isLoading = false;
  }

  setDateStrings(submissionsStartAt, submissionsEndAt) {
    this.startDateString = submissionsStartAt.toLocaleDateString();
    this.endTimeString = submissionsEndAt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    this.endWeekdayString = submissionsEndAt.toLocaleString(undefined, { weekday: "long" });
  }

  checkSubmissionsEnded(submissionsEndAt) {
    if (Date.now() > submissionsEndAt) {
      this.safeOpenAlertModal(this.alertCodes.SUBMISSION_PERIOD_OVER);
    }
  }

  setSongLimit() {
    if (store.ongoingRound.lastWinner?.id === store.currentUser.id) {
      this.songLimit = 2;
    } else {
      this.songLimit = 1;
    }
  }

  checkSongLimit() {
    const userSubmissions = Array
      .from(store.submissions.values())
      .filter((submission) => submission.submitter.id === store.currentUser.id);

    this.songsSent = userSubmissions.length;

    if (this.songsSent >= this.songLimit) {
      this.safeOpenAlertModal(this.alertCodes.MAX_NUMBER_OF_SONGS);
    }
  }

  async handleConfirmationClick() {
    this.hasOngoingRequest = true;
    const videoId = this.getVideoId();
    await this.safeSetVideoTitle(videoId);
    this.hasOngoingRequest = false;
  }

  getVideoId() {
    const userInput = this.shadowRoot.querySelector("input[type=url]").value;
    const videoId = this.parseYoutubeVideoId(userInput);
    return videoId;
  }

  async safeSetVideoTitle(videoId) {
    if (videoId) {
      const title = await this.getVideoTitle(videoId);
      this.videoTitle = title;
      this.videoId = videoId;
    } else {
      this.safeOpenAlertModal(this.alertCodes.INVALID_URL);
    }
  }

  async getVideoTitle(videoId) {
    try {
      const title = await fetchYoutubeVideoTitle(videoId);
      return title;
    } catch (e) {
      const title = await this.getManualVideoTitle();
      return title;
    }
  }

  getManualVideoTitle() {
    const handleInputModalClose = (resolve) => (e) => {
      const { inputText } = e?.detail;
      if (inputText) {
        resolve(inputText);
        return true;
      }
      return false;
    };

    const text = "Houve um problema ao carregar o título do vídeo. "
    + "Digite o título manualmente e carregue o vídeo mais uma vez.";

    return new Promise((resolve) => {
      // no reject: can only go on if resolves title or leaves page
      this.insertModalIntoShadowRoot({
        type: "input",
        text,
        onClose: handleInputModalClose(resolve),
      });
    });
  }

  parseYoutubeVideoId(url) {
    const match = url.match(/.*youtu\.be\/([^&]*).*$/) // youtu.be/id
    || url.match(/.*youtube\.com\/watch\?v=([^&]*).*$/); // youtube.com/watch?v=id
    return (match && match[1]) || null;
  }

  async handleSendVideoClick() {
    this.hasOngoingRequest = true;
    try {
      const isNewSong = await this.isNewSong(this.videoId);
      if (isNewSong) {
        await this.updateStoreAndPersistData();
        this.safeOpenAlertModal(this.alertCodes.SUBMISSION_SUCCESS);
      } else {
        this.safeOpenAlertModal(this.alertCodes.DUPLICATED_SONG);
      }
    } catch (e) {
      this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_CLOSE_MODAL, e.message);
    }
    this.hasOngoingRequest = false;
  }

  async updateStoreAndPersistData() {
    const { song, submissionModel, submission } = this.updateStore();
    await this.persistData(song, submissionModel, submission);
    this.songsSent += 1;
  }

  updateStore() {
    const song = this.generateSanitizedSongPayload();
    const submissionModel = this.generateSubmissionModel();
    const submission = this.generateSanitizedSubmissionPayload(submissionModel);
    return { song, submissionModel, submission };
  }

  async persistData(song, submissionModel, submission) {
    const { songRef, roundRef } = this;
    const submissionRef = this.getSubmissionRef(submissionModel);

    await db.runTransaction(this.sendSongTransaction({
      roundRef, submissionRef, submission, songRef, song,
    }));
  }

  async isNewSong(videoId) {
    const song = await db.collection("groups")
      .doc(store.currentGroup)
      .collection("songs")
      .doc(videoId)
      .get();
    return !song.exists;
  }

  generateSanitizedSongPayload() {
    const songModel = this.generateSongModel();
    const sanitizedSong = getSnapshot(songModel);
    return sanitizedSong;
  }

  generateSongModel() {
    const songModel = store.addSong({
      id: this.videoId,
      url: this.videoURL,
      title: this.videoTitle,
      round: store.ongoingRound.id,
      user: store.currentUser.id,
    });
    return songModel;
  }

  generateSanitizedSubmissionPayload(submissionModel) {
    const sanitizedSubmission = getSnapshot(submissionModel);
    return sanitizedSubmission;
  }

  generateSubmissionModel() {
    const submissionModel = store.addSubmission({
      id: store.generateId(),
      submitter: store.currentUser.id,
      song: this.videoId,
      evaluations: [],
      round: store.ongoingRound.id,
    });
    return submissionModel;
  }

  sendSongTransaction({
    roundRef, submissionRef, submission, songRef, song,
  }) {
    return async (transaction) => {
      const round = await transaction.get(roundRef);
      const updatedSongIds = this.getUpdatedSongIds(round, this.videoId);
      const updatedSubmissionIds = this.getUpdatedSongIds(round, this.videoId);
      await transaction.set(songRef, song);
      await transaction.set(submissionRef, submission);
      await transaction.update(
        roundRef,
        { songs: updatedSongIds, submissions: updatedSubmissionIds },
      );
    };
  }

  getUpdatedSongIds(round, newVideoId) {
    const oldSongIds = round.data().songs || [];
    const updatedSongIds = [...oldSongIds, newVideoId];
    return updatedSongIds;
  }

  getUpdatedSubmissionsIds(round, submission) {
    const oldSubmissionIds = round.data().submissions || [];
    const updatedSubmissionIds = [...oldSubmissionIds, submission.id];
    return updatedSubmissionIds;
  }

  get roundRef() {
    return this.groupRef.collection("rounds")
      .doc(store.ongoingRound.id)
      .withConverter(DateConverter);
  }

  getSubmissionRef(submissionModel) {
    return this.groupRef.collection("submissions")
      .doc(submissionModel.id)
      .withConverter(DateConverter);
  }

  get songRef() {
    return this.groupRef
      .collection("songs")
      .doc(this.videoId)
      .withConverter(DateConverter);
  }

  get groupRef() {
    return db.collection("groups").doc(store.currentGroup);
  }

  get isAlertModalOpen() {
    return !!this.alertModalMessage;
  }

  get videoURL() {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }
}

window.customElements.define("send-song-page", SendSongPage);
