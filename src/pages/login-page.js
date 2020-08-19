import { LitElement, html, css } from 'lit-element';
import VerticalLogo from '../images/vertical-logo.png';
import NormalGoogleSignInButton from '../images/btn_google_signin_light_normal_web.png';
// eslint-disable-next-line no-unused-vars
import Background from '../images/background.jpg'; // so that webpack loads the image

class LoginPage extends LitElement {
  static get styles() {
    return css`
      .shell {
        width: 100vw;
        height: 100vh;
        background-image: url("images/background.jpg");
        background-size: cover;
        margin: 0;
      }

      .logo {
        width: 320px;
        height: 145px;
      }

      button, button:active {
        margin-bottom: 70px;
        font-size: 100%;
        background: none;
        color: inherit;
        border: 0;
        padding: 0;
        font-family: inherit;
        cursor: pointer;
        outline: inherit;
      }

      button img {
        display:  block;
      }

      header, section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }

      @media only screen and (max-width: 600px) {
        .shell {
          background-size: auto 100vh;
          background-position: 40% 10%;
          background-repeat: no-repeat;
        }
      }
    `;
  }

  render() {
    return html`
          <section class="shell">
            <header>
              <img class="logo" src=${VerticalLogo} alt="song ballot"/>
            </header>
            <section>
              <button>
                <img src=${NormalGoogleSignInButton} alt="sign in with google"/>
              </button>
            </section>
          </section>
        `;
  }
}

export default customElements.define('login-page', LoginPage);
