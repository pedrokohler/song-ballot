import CustomizableModalDisplayableMixin, { goToMenu, closeModal } from "./customizable-modal-displayable-mixin";

const customizedAlertCodes = {
  VOTE_PERIOD_OVER: "vote-period-over",
  VOTE_PERIOD_NOT_STARTED: "vote-period-not-started",
  ALREADY_VOTED: "already-voted",
  NO_SONGS: "no-songs",
  VOTE_FAILED: "vote-failed",
  INVALID_SCORE: "invalid-score",
  VOTE_SUCCESS: "vote-success",
};

export default CustomizableModalDisplayableMixin({
  customizedAlertCodes,
  customizedAlerts: new Map([
    [customizedAlertCodes.VOTE_PERIOD_OVER, {
      needsErrorMessage: false,
      messageGenerator() {
        return `O período para votar acabou ${this.endWeekday} às ${this.endTime}.`;
      },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.VOTE_PERIOD_NOT_STARTED, {
      needsErrorMessage: false,
      messageGenerator() {
        return `O período para votar começa ${this.startWeekday} às ${this.startTime}.`;
      },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.ALREADY_VOTED, {
      needsErrorMessage: false,
      messageGenerator() {
        return "Você já votou esta semana.";
      },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.NO_SONGS, {
      needsErrorMessage: false,
      messageGenerator() {
        return "Não há músicas para votar.";
      },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.VOTE_FAILED, {
      needsErrorMessage: false,
      messageGenerator() {
        return "Houve um problema ao tentar enviar seu voto. Tente novamente mais tarde.";
      },
      onButtonClicked: closeModal,
    }],
    [customizedAlertCodes.INVALID_SCORE, {
      needsErrorMessage: false,
      messageGenerator() {
        return "Você não pontuou todas as músicas com um valor válido.";
      },
      onButtonClicked: closeModal,
    }],
    [customizedAlertCodes.VOTE_SUCCESS, {
      needsErrorMessage: false,
      messageGenerator() {
        return "Voto enviado com sucesso!";
      },
      onButtonClicked: goToMenu,
    }],
  ]),
});
