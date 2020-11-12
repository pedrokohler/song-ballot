import { LitElement, html, css } from "lit-element";

import forwardArrows from "../images/forward-arrows.png";
import backwardArrows from "../images/backward-arrows.png";

export default class NavigationButtons extends LitElement {
  static get styles() {
    return css`
            :host {
                width: 100%;
            }

            section {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 1em;
            }

            img {
                width: 15px;
                height: 15px;
                vertical-align: middle;
            }

            span {
                display: inline;
                vertical-align: middle;
                text-transform: uppercase;
                margin: 0 10px;
            }

            button {
                background-color: transparent;
                border: none;
                font-family: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            button:focus {
                outline: none;
            }

            button:disabled span {
                color: #CCCCCC;
                cursor: not-allowed;
            }

            button:disabled img {
                filter: invert(91%) hue-rotate(135deg) brightness(92%) contrast(89%);
            }
        `;
  }

  static get properties() {
    return {
      forwardArrowsAlt: {
        type: String,
      },
      backwardArrowsAlt: {
        type: String,
      },
      forwardArrowsDisabled: {
        type: Boolean,
      },
      backwardArrowsDisabled: {
        type: Boolean,
      },
      forwardArrowsLabel: {
        type: String,
      },
      backwardArrowsLabel: {
        type: String,
      },

    };
  }

  render() {
    return html`
      <section>
          <button
              ?disabled="${this.backwardArrowsDisabled}"
              @click="${this.onBackwardArrowsClicked}"
          >
              <img src="${backwardArrows}" alt="${this.backwardArrowsAlt}"/>
              <span>${this.backwardArrowsLabel || "voltar"}</span>
          </button>
          <button
              ?disabled="${this.forwardArrowsDisabled}"
              @click="${this.onForwardArrowsClicked}"
          >
              <span>${this.forwardArrowsLabel || "avançar"}</span>
              <img src=${forwardArrows} alt="${this.forwardArrowsAlt}"/>
          </button>
      </section>
    `;
  }

  onForwardArrowsClicked() {
    const forwardArrowsClicked = new CustomEvent("forward-arrows-clicked", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(forwardArrowsClicked);
  }

  onBackwardArrowsClicked() {
    const backwardArrowsClicked = new CustomEvent("backward-arrows-clicked", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(backwardArrowsClicked);
  }
}

window.customElements.define("navigation-buttons", NavigationButtons);
