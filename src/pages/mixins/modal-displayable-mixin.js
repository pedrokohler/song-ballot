export default function ModalDisplaybleMixin(superClass) {
  return class ModalDisplayable extends superClass {
    static get isPrototypeOfModalDisplayableMixin() {
      return true;
    }

    get alertCodes() {
      return {
        HAS_NOT_VOTED: "has-not-voted",
        FIRST_ROUND_REACHED: "first-round-reached",
        EVALUATION_PERIOD_OVER: "evaluation-period-over",
        EVALUATION_PERIOD_NOT_STARTED: "evaluation-period-not-started",
        ALREADY_EVALUATED: "already-evaluated",
        NO_SONGS: "no-songs",
        EVALUATION_FAILED: "evaluation-failed",
        INVALID_SCORE: "invalid-score",
        VOTE_SUCCESS: "evaluation-success",
        SUBMISSION_PERIOD_OVER: "submission-period-over",
        MAX_NUMBER_OF_SONGS: "max-number-of-songs",
        INVALID_URL: "invalid-url",
        SUBMISSION_SUCCESS: "submission-success",
        DUPLICATED_SONG: "duplicated-song",
        UNEXPECTED_ERROR_GO_MENU: "unexpected-error-go-menu",
        UNEXPECTED_ERROR_CLOSE_MODAL: "unexpected-error-close-modal",
      };
    }

    generateAlerts() {
      return new Map([
        [this.alertCodes.HAS_NOT_VOTED, {
          needsErrorMessage: false,
          messageGenerator() {
            return "Você só poderá ver os resultados desta rodada após votar.";
          },
          onButtonClicked: this.closeModal,
        }],
        [this.alertCodes.FIRST_ROUND_REACHED, {
          needsErrorMessage: false,
          messageGenerator() {
            return "Você já viu todos os resultados disponíveis.";
          },
          onButtonClicked: this.closeModal,
        }],
        [this.alertCodes.EVALUATION_PERIOD_OVER, {
          needsErrorMessage: false,
          messageGenerator() {
            return `O período para votar acabou ${this.endWeekday} às ${this.endTime}.`;
          },
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.EVALUATION_PERIOD_NOT_STARTED, {
          needsErrorMessage: false,
          messageGenerator() {
            return `O período para votar começa ${this.startWeekday} às ${this.startTime}.`;
          },
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.ALREADY_EVALUATED, {
          needsErrorMessage: false,
          messageGenerator() {
            return "Você já votou esta semana.";
          },
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.NO_SONGS, {
          needsErrorMessage: false,
          messageGenerator() {
            return "Não há músicas para votar.";
          },
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.EVALUATION_FAILED, {
          needsErrorMessage: false,
          messageGenerator() {
            return "Houve um problema ao tentar enviar seu voto. Tente novamente mais tarde.";
          },
          onButtonClicked: this.closeModal,
        }],
        [this.alertCodes.INVALID_SCORE, {
          needsErrorMessage: false,
          messageGenerator() {
            return "Você não pontuou todas as músicas com um valor válido.";
          },
          onButtonClicked: this.closeModal,
        }],
        [this.alertCodes.VOTE_SUCCESS, {
          needsErrorMessage: false,
          messageGenerator() {
            return "Voto enviado com sucesso!";
          },
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.SUBMISSION_PERIOD_OVER, {
          needsErrorMessage: false,
          messageGenerator() {
            return `O período para enviar músicas acabou ${this.endWeekdayString} ${this.endTimeString}.`;
          },
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.MAX_NUMBER_OF_SONGS, {
          needsErrorMessage: false,
          messageGenerator() { return "Você já enviou o número máximo de músicas para esta rodada"; },
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.INVALID_URL, {
          needsErrorMessage: false,
          messageGenerator() { return "O URL que você inseriu não é valido."; },
          onButtonClicked: this.closeModal,
        }],
        [this.alertCodes.SUBMISSION_SUCCESS, {
          needsErrorMessage: false,
          messageGenerator() {
            return `Música enviada com sucesso! ${this.userSubmissionsSent < this.userSubmissionsLimit
              ? "Você ainda pode enviar mais uma música!"
              : ""}`;
          },
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.DUPLICATED_SONG, {
          needsErrorMessage: false,
          messageGenerator() { return "A música que você enviou já foi enviada antes. Tente outra música."; },
          onButtonClicked: this.closeModal,
        }],
        [this.alertCodes.UNEXPECTED_ERROR_GO_MENU, {
          needsErrorMessage: true,
          messageGenerator: (errorMessage) => errorMessage,
          onButtonClicked: this.goToMenu,
        }],
        [this.alertCodes.UNEXPECTED_ERROR_CLOSE_MODAL, {
          needsErrorMessage: true,
          messageGenerator: (errorMessage) => errorMessage,
          onButtonClicked: this.closeModal,
        }],
      ]);
    }

    openAlertModal(alertCode, errorMessage) {
      const alerts = this.generateAlerts();
      if (!alerts.has(alertCode)) {
        throw new Error(`openAlertModal: Invalid alertCode. '${alertCode}' is not valid.`);
      }

      const { needsErrorMessage, messageGenerator, onButtonClicked } = alerts.get(alertCode);
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
        onButtonClicked: onButtonClicked.bind(this),
      });
    }

    safeOpenAlertModal(alertCode, errorMessage = "") {
      try {
        this.openAlertModal(alertCode, errorMessage);
      } catch (e) {
        this.openAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU, e.message);
      }
    }

    insertModalIntoShadowRoot({ type, text, onButtonClicked }) {
      const types = new Map([
        ["input", "input-modal"],
        ["alert", "alert-modal"],
      ]);

      if (types.has(type)) {
        const node = document.createElement(types.get(type));
        const textNode = document.createTextNode(text);
        node.appendChild(textNode);
        node.addEventListener("button-clicked", (e) => {
          const shouldCloseModal = onButtonClicked(e);
          if (shouldCloseModal) {
            node.remove();
          }
        });
        this.shadowRoot.insertBefore(node, this.shadowRoot.firstChild);
        return node;
      }

      throw new Error(`insertModalIntoShadowRoot: Invalid modal type ${type}.`
       + "Please insert a valid modal type.");
    }

    goToMenu() {
      this.ownerDocument.defaultView.history.replaceState(null, "", "menu");
      return true;
    }

    closeModal() {
      return true;
    }
  };
}
