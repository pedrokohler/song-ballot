import { getSnapshot } from "mobx-state-tree";
import { db, DateConverter, fetchYoutubeVideoTitle } from "../../../services/firebase";
import { store } from "../../../store";

export default function SendSongAggregateMixin(baseClass) {
  return class SendSongAggregate extends baseClass {
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
        userSubmissionsSent: {
          type: Number,
        },
        userSubmissionsLimit: {
          type: Number,
        },
      };
    }

    constructor() {
      super();
      this.userSubmissionsLimit = 0;
      this.isLoading = true;
      this.hasOngoingRequest = false;
      this.startDateString = "";
      this.endTimeString = "";
      this.endWeekdayString = "";
    }

    async firstUpdated(changedProperties) {
      await super.firstUpdated(changedProperties);

      this.setupAndCheckPageBasedOnOngoingRound();

      this.isLoading = false;
    }

    setupAndCheckPageBasedOnOngoingRound() {
      this.updatePageBaseVariables();

      const errorCode = this.checkForErrors(this.getCheckFunctionsMap());
      if (errorCode) {
        this.safeOpenAlertModal(errorCode);
        return errorCode;
      }

      return null;
    }

    updatePageBaseVariables() {
      const { submissionsStartAt, submissionsEndAt } = store.ongoingRound;
      this.setDateStrings(submissionsStartAt, submissionsEndAt);
      this.defineUserSubmissionLimit();
      this.defineUserSubmissionsSent();
    }

    getCheckFunctionsMap() {
      const { submissionsEndAt } = store.ongoingRound;

      return new Map([
        [this.checkSubmissionsEnded(submissionsEndAt),
          this.alertCodes.SUBMISSION_PERIOD_OVER],
        [this.checkUserSubmissionsLimit(),
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

    defineUserSubmissionLimit() {
      if (store.ongoingRound.lastWinner?.id === store.currentUser.id) {
        this.userSubmissionsLimit = 2;
      } else {
        this.userSubmissionsLimit = 1;
      }
    }

    defineUserSubmissionsSent() {
      const userSubmissions = Array
        .from(store.ongoingRound.submissions.values())
        .filter((submission) => submission.submitter.id === store.currentUser.id);

      this.userSubmissionsSent = userSubmissions.length;
    }

    checkUserSubmissionsLimit() {
      return () => this.userSubmissionsSent >= this.userSubmissionsLimit;
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
      await this.refreshOngoingRound();
      const error = this.setupAndCheckPageBasedOnOngoingRound();

      if (error) {
        return;
      }

      const { songModel, submissionModel } = this.generateVideoAndSubmissionModels({
        videoId: this.videoId,
        videoURL: this.videoURL,
        videoTitle: this.videoTitle,
      });

      const sanitizedSongPayload = getSnapshot(songModel);
      const sanitizedSubmissionPayload = getSnapshot(submissionModel);

      await this.persistData(sanitizedSongPayload, sanitizedSubmissionPayload);

      this.updateStore(sanitizedSongPayload, sanitizedSubmissionPayload);
      this.userSubmissionsSent += 1;
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
      store.ongoingRound.addSong(song.id);
      store.ongoingRound.addSubmission(submission.id);
    }

    async persistData(song, submission) {
      const songReference = this.getSongReference(song.id);
      const submissionReference = this.getSubmissionReference(submission.id);
      const roundReference = this.getRoundReference(store.ongoingRound.id);

      await db.runTransaction(this.sendSongTransaction({
        roundReference,
        submissionReference,
        songReference,
        submission,
        song,
      }));
    }

    sendSongTransaction({
      roundReference, submissionReference, submission, songReference, song,
    }) {
      return async (transaction) => {
        const round = await transaction.get(roundReference);
        const updatedSongIds = this.getUpdatedSongIds(round, song.id);
        const updatedSubmissionIds = this.getUpdatedSubmissionsIds(round, submission.id);
        await transaction.set(songReference, song);
        await transaction.set(submissionReference, submission);
        await transaction.update(
          roundReference,
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

    getRoundReference(roundId) {
      return this.groupReference.collection("rounds")
        .doc(roundId)
        .withConverter(DateConverter);
    }

    getSubmissionReference(submissionId) {
      return this.groupReference.collection("submissions")
        .doc(submissionId)
        .withConverter(DateConverter);
    }

    getSongReference(videoId) {
      return this.groupReference
        .collection("songs")
        .doc(videoId)
        .withConverter(DateConverter);
    }

    get groupReference() {
      return db.collection("groups").doc(store.currentGroup);
    }

    get videoURL() {
      return `https://www.youtube.com/embed/${this.videoId}`;
    }
  };
}
