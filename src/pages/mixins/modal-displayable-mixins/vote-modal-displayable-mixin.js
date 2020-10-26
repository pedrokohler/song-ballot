import CustomizableModalDisplayableMixin, { goToMenu, closeModal } from "./customizable-modal-displayable-mixin";

const customizedAlertCodes = {
  EVALUATION_PERIOD_OVER: "evaluation-period-over",
  EVALUATION_PERIOD_NOT_STARTED: "evaluation-period-not-started",
  ALREADY_EVALUATED: "already-evaluated",
  NO_SONGS: "no-songs",
  EVALUATION_FAILED: "evaluation-failed",
  INVALID_SCORE: "invalid-score",
  VOTE_SUCCESS: "evaluation-success",
};

export default CustomizableModalDisplayableMixin({
  customizedAlertCodes,
  customizedAlerts: new Map([
    [customizedAlertCodes.EVALUATION_PERIOD_OVER, {
      needsErrorMessage: false,
      messageGenerator() {
        return `O período para votar acabou ${this.endWeekday} às ${this.endTime}.`;
      },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.EVALUATION_PERIOD_NOT_STARTED, {
      needsErrorMessage: false,
      messageGenerator() {
        return `O período para votar começa ${this.startWeekday} às ${this.startTime}.`;
      },
      onButtonClicked: goToMenu,
    }],
    [customizedAlertCodes.ALREADY_EVALUATED, {
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
    [customizedAlertCodes.EVALUATION_FAILED, {
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
