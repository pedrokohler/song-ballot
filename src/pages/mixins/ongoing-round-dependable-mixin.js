import { observer } from "mobx-lit-element";
import { store } from "../../store";
import DefaultModalDisplayableMixin from "./modal-displayable-mixins/default-modal-displayable-mixin";

export default function OngoingRoundDependableMixin(superClass) {
  const observedSuperClass = observer(superClass);

  const SuperClass = superClass.isPrototypeOfModalDisplayableMixin
    ? observedSuperClass
    : DefaultModalDisplayableMixin(observedSuperClass);
  return class OngoingRoundDependable extends SuperClass {
    async firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      if (!store.ongoingRound) {
        await this.refreshOngoingRound();
      }
    }

    async refreshOngoingRound() {
      try {
        await store.getOngoingRound();
      } catch (e) {
        this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU,
          `Ocorreu um erro ao carregar a rodada atual: ${e.message}`);
      }
    }
  };
}
