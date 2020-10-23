import { observer } from "mobx-lit-element";
import { store } from "../../store";
import DefaultModalDisplayableMixin from "./modal-displayable-mixins/default-modal-displayable-mixin";

export default function OngoingRoundDependableMixin(superClass) {
  return class OngoingRoundDependable extends
    DefaultModalDisplayableMixin(observer(superClass)) {
    async firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      try {
        if (!store.ongoingRound) {
          await store.getOngoingRound();
        }
      } catch (e) {
        this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU,
          `An error occurred while loading the ongoing round: ${e.message}`);
      }
    }
  };
}
