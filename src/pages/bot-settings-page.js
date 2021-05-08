import { LitElement, html, css } from "lit-element";
import "@polymer/paper-progress/paper-progress";

import "../components/default-background";
import "../components/alert-modal";
import "../components/input-modal";
import ModalDisplayableMixin from "./mixins/modal-displayable-mixin";
import { store } from "../store";

const BaseClass = ModalDisplayableMixin(LitElement);

export default class BotSettingsPage extends BaseClass {
  static get styles() {
    return css`
        section {
            border-radius: 3px;
            min-height: 200px;
            height: inherit;
            width: 90%;
            min-width: 300px;
            max-width: 600px;
            background-color: #FFFFFF;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 25px;
            padding-top: 20px;
            box-sizing: border-box;
        }

        h1,h2,h3,h4,h5,h6,p {
            margin-top: 0;
            margin-bottom: 0.6em;
            text-align: center;
        }

        div {
            width: 100%;
            margin-right: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        input {
            height: 1.5em;
            width: calc(100% - 4px);
            border-radius: 3px;
            margin-bottom: 1em;
            font-family: inherit;
            border-style: solid;
            border-width: 1px;
            font-size: 1em;
            background-color: #F2F2F2;
        }

        button {
            margin-bottom: 1em;
            width: 100px;
            height: 35px;
            text-transform: uppercase;
            background-color: #FBC303;
            font-weight: 900;
            font-family: inherit;
            border: none;
            border-radius: 3px;
            vertical-align: baseline;
            cursor: pointer;
        }

        paper-progress {
          width: 100vw;
          --paper-progress-active-color: #FBC303;
        }
    `;
  }

  render() {
    if (this.isLoading) {
      return html`
        <paper-progress class="blue" indeterminate></paper-progress>
      `;
    }

    return html`
        <default-background>
            <section>
                <h3>Configurações do Bot do Telegram</h3>
                <h5>ID do Chat</h3>
                <input type="text" .value=${this.telegramChatId} @input="${this.handleInput}"/>
                <div>
                  <button
                    @click="${this.handleCancelationClick}"
                    ?disabled=${this.hasOngoingRequest}
                  >Cancelar</button>
                  <button
                    @click="${this.handleConfirmationClick}"
                    ?disabled=${this.hasOngoingRequest}
                  >Salvar</button>
                </div>
            </section>
        </default-background>
    `;
  }

  static get properties() {
    return {
      chatId: {
        type: String,
      },
      hasOngoingRequest: {
        type: Boolean,
      },
      isLoading: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.telegramChatId = store.currentUser.telegramChatId;
  }

  handleInput(e) {
    this.telegramChatId = e.target.value;
  }

  handleCancelationClick() {
    this.ownerDocument.defaultView.history.replaceState(null, "", "menu");
  }

  async handleConfirmationClick() {
    this.hasOngoingRequest = true;
    try {
      await store.setTelegramChatId(this.telegramChatId);
      this.safeOpenAlertModal(this.alertCodes.SAVE_BOT_SETTINGS_SUCCESS);
    } catch (e) {
      this.safeOpenAlertModal(this.alertCodes.SAVE_BOT_SETTINGS_ERROR);
    }
    this.hasOngoingRequest = false;
  }
}

window.customElements.define("bot-settings-page", BotSettingsPage);
