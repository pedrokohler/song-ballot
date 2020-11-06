import CustomizableModalDisplayableMixin, { closeModal } from "./customizable-modal-displayable-mixin";

const customizedAlertCodes = {
  HAS_NOT_VOTED: "has-not-voted",
  FIRST_ROUND_REACHED: "first-round-reached",
};

export default CustomizableModalDisplayableMixin({
  customizedAlertCodes,
  customizedAlerts: new Map([
    [customizedAlertCodes.HAS_NOT_VOTED, {
      needsErrorMessage: false,
      messageGenerator() {
        return "Você só poderá ver os resultados desta rodada após votar.";
      },
      onButtonClicked: closeModal,
    }],
    [customizedAlertCodes.FIRST_ROUND_REACHED, {
      needsErrorMessage: false,
      messageGenerator() {
        return "Você já viu todos os resultados disponíveis.";
      },
      onButtonClicked: closeModal,
    }],
  ]),
});
