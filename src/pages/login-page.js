import { LitElement, html, css } from 'lit-element';

import '../components/google-sing-in-button';

// eslint-disable-next-line no-unused-vars
import Background from '../images/background.jpg'; // so that webpack loads the image
import VerticalLogo from '../images/vertical-logo.png';

export default class LoginPage extends LitElement {
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

      @media only screen and (max-width: 600px) {
        .shell {
          background-size: cover;
          background-position: 40% 10%;
          background-repeat: no-repeat;
        }
      }
    `;
  }

  firstUpdated() {
    this.shadowRoot.querySelector('google-sign-in-button')
      .addEventListener('click', () => {
        window.history.pushState(null, '', 'menu');
      });
  }

  render() {
    return html`
          <section class="shell">
            <header>
              <img class="logo" src=${VerticalLogo} alt="song ballot"/>
            </header>
            <section>
              <google-sign-in-button></google-sign-in-button>
            </section>
          </section>
        `;
  }
}

window.customElements.define('login-page', LoginPage);
