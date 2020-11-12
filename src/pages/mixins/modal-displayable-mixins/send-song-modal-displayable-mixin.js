import CustomizableModalDisplayableMixin, { goToMenu, closeModal } from "./customizable-modal-displayable-mixin";

const customizedAlertCodes = {
  SUBMISSION_PERIOD_OVER: "submission-period-over",
  MAX_NUMBER_OF_SONGS: "max-number-of-songs",
  INVALID_URL: "invalid-url",
  SUBMISSION_SUCCESS: "submission-success",
  DUPLICATED_SONG: "duplicated-song",
};

export default CustomizableModalDisplayableMixin({
  customizedAlertCodes,
  customizedAlerts: new Map([
    [customizedAlertCodes.SUBMISSION_PERIOD_OVER, {
      needsErrorMessage: false,
      messageGenerator() {
        return `O período para enviar músicas acabou ${this.endWeekdayString} ${this.endTimeString}.`;
      },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.MAX_NUMBER_OF_SONGS, {
      needsErrorMessage: false,
      messageGenerator() { return "Você já enviou o número máximo de músicas para esta rodada"; },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.INVALID_URL, {
      needsErrorMessage: false,
      messageGenerator() { return "O URL que você inseriu não é valido."; },
      onButtonClicked: closeModal,
    }],
    [customizedAlertCodes.SUBMISSION_SUCCESS, {
      needsErrorMessage: false,
      messageGenerator() {
        return `Música enviada com sucesso! ${this.userSubmissionsSent < this.userSubmissionsLimit
          ? "Você ainda pode enviar mais uma música!"
          : ""}`;
      },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.DUPLICATED_SONG, {
      needsErrorMessage: false,
      messageGenerator() { return "A música que você enviou já foi enviada antes. Tente outra música."; },
      onButtonClicked: closeModal,
    }],
  ]),
});
