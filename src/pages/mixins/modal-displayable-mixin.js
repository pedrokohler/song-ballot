export const goToMenu = () => {
  window.history.replaceState(null, "", "menu");
  return true;
};

export const closeModal = () => true;

export default function ModalDisplaybleMixin({ customizedAlertCodes, customizedAlerts }) {
  return function CustomizedModalDisplaybleMixin(superClass) {
    return class ModalDisplayable extends superClass {
      constructor() {
        super();
        this.goToMenu = goToMenu;
        this.closeModal = closeModal;
      }

      get alertCodes() {
        return {
          ...customizedAlertCodes,
          UNEXPECTED_ERROR_GO_MENU: "unexpected-error-go-menu",
          UNEXPECTED_ERROR_CLOSE_MODAL: "unexpected-error-close-modal",
        };
      }

      generateAlerts() {
        return new Map([
          ...customizedAlerts,
          [this.alertCodes.UNEXPECTED_ERROR_GO_MENU, {
            needsErrorMessage: true,
            messageGenerator: (errorMessage) => errorMessage,
            onCloseFunction: this.goToMenu,
          }],
          [this.alertCodes.UNEXPECTED_ERROR_CLOSE_MODAL, {
            needsErrorMessage: true,
            messageGenerator: (errorMessage) => errorMessage,
            onCloseFunction: this.closeModal,
          }],
        ]);
      }

      openAlertModal(alertCode, errorMessage) {
        const alerts = this.generateAlerts();
        if (!alerts.has(alertCode)) {
          throw new Error(`openAlertModal: Invalid alertCode. '${alertCode}' is not valid.`);
        }

        const { needsErrorMessage, messageGenerator, onCloseFunction } = alerts.get(alertCode);
        if (needsErrorMessage && !errorMessage) {
          throw new Error(
            `openAlertModal: Can't use '${alertCode}' alert without 'errorMessage' parameter. `
            + "Please pass an errorMessage parameter.",
          );
        }
        const alertModalMessage = messageGenerator.bind(this)(errorMessage);
        this.insertModalIntoShadowRoot({
          type: "alert",
          text: alertModalMessage,
          onClose: onCloseFunction.bind(this),
        });
      }

      safeOpenAlertModal(alertCode, errorMessage = "") {
        try {
          this.openAlertModal(alertCode, errorMessage);
        } catch (e) {
          this.openAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU, e.message);
        }
      }

      insertModalIntoShadowRoot({ type, text, onClose }) {
        const types = new Map([
          ["input", "input-modal"],
          ["alert", "alert-modal"],
        ]);

        if (types.has(type)) {
          const node = document.createElement(types.get(type));
          const textNode = document.createTextNode(text);
          node.appendChild(textNode);
          node.addEventListener("button-clicked", (e) => {
            if (onClose(e)) {
              node.remove();
            }
          });
          this.shadowRoot.insertBefore(node, this.shadowRoot.firstChild);
          return node;
        }

        throw new Error(`insertModalIntoShadowRoot: Invalid modal type ${type}.`
       + "Please insert a valid modal type.");
      }
    };
  };
}
