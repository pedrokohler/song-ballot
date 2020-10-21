import { LitElement, html, css } from "lit-element";
import { observer } from "mobx-lit-element";
import "@polymer/paper-progress/paper-progress";

import { store } from "../store";
import { handleGoogleSignIn } from "../services/firebase";
import "../components/google-sing-in-button";
import "../components/alert-modal";

// eslint-disable-next-line no-unused-vars
import Background from "../images/background.jpg"; // so that webpack loads the image
import VerticalLogo from "../images/vertical-logo.png";

export default class LoginPage extends observer(LitElement) {
  static get styles() {
    return css`
      .shell {
        box-sizing: border-box;
        width: 100vw;
        height: 100%;
        min-width: 320px;
        background-image: url("images/background.jpg");
        background-size: cover;
        margin: 0;
      }

      .logo {
        width: 320px;
        height: 145px;
      }

      google-sign-in-button {
        margin-bottom: 70px;
      }

      header, section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }

      paper-progress {
        width: 100%;
        --paper-progress-active-color: #FBC303;
      }

      @media only screen and (max-width: 600px) {
        .shell {
          background-size: cover;
          background-position: 40% 10%;
          background-repeat: no-repeat;
        }
      }
    `;
  }

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get("redirectTo");

    if (!store.authStateChecked) {
      return html`
      <section>
        <paper-progress class="blue" indeterminate></paper-progress>
      </section>
      `;
    }

    if (!store.currentUser) {
      return html`
            <section class="shell">
              <header>
                <img class="logo" src=${VerticalLogo} alt="song ballot"/>
              </header>
              <section>
                <google-sign-in-button @click=${handleGoogleSignIn}></google-sign-in-button>
              </section>
            </section>
          `;
    }

    if (!store.currentGroup) {
      return html`
      <alert-modal
        isOpen
        @button-clicked="${() => window.history.pushState(null, "", "logout")}"
      >
        Você precisa ser incluído em um grupo. Solicite a sua inclusão antes de prosseguir.
      </alert-modal>`;
    }

    window.history.pushState(null, "", redirectTo || "menu");
    return "";
  }
}

window.customElements.define("login-page", LoginPage);
