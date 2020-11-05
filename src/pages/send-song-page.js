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

const SuperClass = SendSongModalDisplayableMixin(
  OngoingRoundDependableMixin(
    LitElement,
  ),
);

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
    this.setSongLimit();
    this.setSongsSent();

    const errorCode = this.checkForErrors(this.getCheckFunctionsMap());
    if (errorCode) {
      this.safeOpenAlertModal(errorCode);
    }

    this.isLoading = false;
  }

  getCheckFunctionsMap() {
    const { submissionsEndAt } = store.ongoingRound;

    return new Map([
      [this.checkSubmissionsEnded(submissionsEndAt),
        this.alertCodes.SUBMISSION_PERIOD_OVER],
      [this.checkSongLimit(),
        this.alertCodes.MAX_NUMBER_OF_SONGS],
    ]);
  }

  checkForErrors(checkFunctionsMap) {
    const [, errorCode] = Array
      .from(checkFunctionsMap.entries())
      .find(([check]) => check() === true)
      || [];
    return errorCode;
  }

  setDateStrings(submissionsStartAt, submissionsEndAt) {
    this.startDateString = submissionsStartAt.toLocaleDateString();
    this.endTimeString = submissionsEndAt.toLocaleTimeString(undefined,
      { hour: "2-digit", minute: "2-digit" });
    this.endWeekdayString = submissionsEndAt.toLocaleString(undefined, { weekday: "long" });
  }

  checkSubmissionsEnded(submissionsEndAt) {
    return () => Date.now() > submissionsEndAt;
  }

  setSongLimit() {
    if (store.ongoingRound.lastWinner?.id === store.currentUser.id) {
      this.songLimit = 2;
    } else {
      this.songLimit = 1;
    }
  }

  setSongsSent() {
    const userSubmissions = Array
      .from(store.submissions.values())
      .filter((submission) => submission.submitter.id === store.currentUser.id);

    this.songsSent = userSubmissions.length;
  }

  checkSongLimit() {
    return () => this.songsSent >= this.songLimit;
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
    const inputModalOnButtonClicked = (resolve) => (e) => {
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
        onButtonClicked: inputModalOnButtonClicked(resolve),
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
        await this.performVideoSubmission();
        this.safeOpenAlertModal(this.alertCodes.SUBMISSION_SUCCESS);
      } else {
        this.safeOpenAlertModal(this.alertCodes.DUPLICATED_SONG);
      }
    } catch (e) {
      this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_CLOSE_MODAL, e.message);
    }
    this.hasOngoingRequest = false;
  }

  async isNewSong(videoId) {
    const isSongInStore = store.songs.get(videoId);
    if (isSongInStore) {
      return false;
    }
    const isSongInDb = await this.isSongInDb(videoId);
    return !isSongInDb;
  }

  async isSongInDb(videoId) {
    const song = await db.collection("groups")
      .doc(store.currentGroup)
      .collection("songs")
      .doc(videoId)
      .get();
    return song.exists;
  }

  async performVideoSubmission() {
    const { songModel, submissionModel } = this.generateVideoAndSubmissionModels({
      videoId: this.videoId,
      videoURL: this.videoURL,
      videoTitle: this.videoTitle,
    });

    const sanitizedSongPayload = getSnapshot(songModel);
    const sanitizedSubmissionPayload = getSnapshot(submissionModel);

    await this.persistData(sanitizedSongPayload, sanitizedSubmissionPayload);

    this.updateStore(sanitizedSongPayload, sanitizedSubmissionPayload);
    this.songsSent += 1;
  }

  generateVideoAndSubmissionModels({
    videoId,
    videoURL,
    videoTitle,
  }) {
    const songModel = store.createSongModel({
      videoId,
      videoURL,
      videoTitle,
    });
    const submissionModel = store.createSubmissionModel(videoId);

    return {
      songModel,
      submissionModel,
    };
  }

  updateStore(song, submission) {
    store.addSong(song);
    store.addSubmission(submission);
  }

  async persistData(song, submission) {
    const songRef = this.getSongRef(song.id);
    const submissionRef = this.getSubmissionRef(submission.id);
    const roundRef = this.getRoundRef(store.ongoingRound.id);

    await db.runTransaction(this.sendSongTransaction({
      roundRef,
      submissionRef,
      songRef,
      submission,
      song,
    }));
  }

  sendSongTransaction({
    roundRef, submissionRef, submission, songRef, song,
  }) {
    return async (transaction) => {
      const round = await transaction.get(roundRef);
      const updatedSongIds = this.getUpdatedSongIds(round, song.id);
      const updatedSubmissionIds = this.getUpdatedSubmissionsIds(round, submission.id);
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

  getUpdatedSubmissionsIds(round, submissionId) {
    const oldSubmissionIds = round.data().submissions || [];
    const updatedSubmissionIds = [...oldSubmissionIds, submissionId];
    return updatedSubmissionIds;
  }

  getRoundRef(roundId) {
    return this.groupRef.collection("rounds")
      .doc(roundId)
      .withConverter(DateConverter);
  }

  getSubmissionRef(submissionId) {
    return this.groupRef.collection("submissions")
      .doc(submissionId)
      .withConverter(DateConverter);
  }

  getSongRef(videoId) {
    return this.groupRef
      .collection("songs")
      .doc(videoId)
      .withConverter(DateConverter);
  }

  get groupRef() {
    return db.collection("groups").doc(store.currentGroup);
  }

  get videoURL() {
    return `https://www.youtube.com/embed/${this.videoId}`;
  }
}

window.customElements.define("send-song-page", SendSongPage);
