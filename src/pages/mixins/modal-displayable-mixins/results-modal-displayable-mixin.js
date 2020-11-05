import CustomizableModalDisplayableMixin, { closeModal } from "./customizable-modal-displayable-mixin";

const customizedAlertCodes = {
  HAS_NOT_VOTED: "has-not-voted",
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
  ]),
});
