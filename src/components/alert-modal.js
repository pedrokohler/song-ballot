import { LitElement, html, css } from "lit-element";

export default class AlertModal extends LitElement {
  static get styles() {
    return css`
            .shell {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
            }
            @-webkit-keyframes slide-down {
                  0% { opacity: 0; -webkit-transform: translate(-50%, -100%); }
                100% { opacity: 1; -webkit-transform: translate(-50%, -50%); }
            }
            @-moz-keyframes slide-down {
                  0% { opacity: 0; -moz-transform: translate(-50%, -100%); }
                100% { opacity: 1; -moz-transform: translate(-50%, -50%); }
            }
            .backdrop {
                position: fixed;
                width: 100vw;
                height: 100vh;
                background-color: rgba(26, 26, 26, 0.7);
                z-index: 1000;
            }

            .modal {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                max-width: 300px;
                width: 70%;
                min-height: 150px;
                max-height: 80vh;
                overflow: auto;
                background-color: #FBFBD3;
                z-index: 1001;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                border-radius: 3px;
                padding: 25px;
                text-align: center;
                -webkit-animation: slide-down .3s ease-out;
                -moz-animation: slide-down .3s ease-out;
            }

            .modal button {
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
        `;
  }

  handleButtonClick() {
    const buttonClickedEvent = new CustomEvent("button-clicked", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(buttonClickedEvent);
  }

  render() {
    return html`
            <section class="shell">
                <section class="backdrop"></section>
                <section class="modal">
                    <p><slot></slot></p>
                    <button @click="${this.handleButtonClick}">ok</button>
                </section>
            </section>
        `;
  }
}

customElements.define("alert-modal", AlertModal);
