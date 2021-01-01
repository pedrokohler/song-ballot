import { LitElement, html, css } from "lit-element";
import "@polymer/paper-progress/paper-progress";

import "../components/default-background";
import "../components/alert-modal";
import "../components/input-modal";
import ModalDisplayableMixin from "./mixins/modal-displayable-mixin";
import OngoingRoundDependableMixin from "./mixins/ongoing-round-dependable-mixin";
import SendSongAggregateMixin from "./mixins/aggregates/send-song-aggregate";

const BaseClass = SendSongAggregateMixin(
  ModalDisplayableMixin(
    OngoingRoundDependableMixin(
      LitElement,
    ),
  ),
);

export default class SendSongPage extends BaseClass {
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

        h3, div {
            margin-right: auto;
        }

        hr {
            border: none;
            width: 85%;
            height: 1px;
            margin-bottom: 20px;
            background-color: rgba(0, 0, 0, 0.2);
        }

        h4 {
            font-weight: 500;
            text-transform: uppercase;
        }

        div h4 {
            margin-bottom: 0;
            text-transform: none;
            text-align: left;
        }

        div h6 {
            margin-top: 0;
            font-weight: 400;
            text-align: left;
            margin-bottom: 1em;
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
            margin-right: auto;
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

        iframe {
            width: 100%;
            height: 300px;
            max-height: 50%;
            margin-bottom: 1em;
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
                <h3>Enviar música</h3>
                <h4>Semana ${this.startDateString}</h4>
                <p>O limite para envio da música é até ${this.endTimeString} de ${this.endWeekdayString}</p>
                <hr/>
                <div>
                    <h4>Carregar música</h4>
                    <h6>Insira o link do vídeo do Youtube</h6>
                </div>
                <input type="url"/>
                <button
                  @click="${this.handleConfirmationClick}"
                  ?disabled=${this.hasOngoingRequest}
                >Carregar</button>
                ${this.videoId ? this.videoTemplate() : ""}
            </section>
        </default-background>
    `;
  }

  videoTemplate() {
    return html`
        <hr/>
        <h4>${this.videoTitle}</h4>
        <iframe src=${this.videoURL} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <button
            @click=${this.handleSendVideoClick}
            ?disabled=${this.hasOngoingRequest}
        >
        Enviar
        </button>
    `;
  }
}

window.customElements.define("send-song-page", SendSongPage);
