import { LitElement, html, css } from 'lit-element';
import HorizontalLogo from '../images/horizontal-logo.png';

export default class DefaultBackground extends LitElement {
  static get styles() {
    return css`
        .shell {
            position: relative;
            box-sizing: border-box;
            width: 100vw;
            min-height: 100%;
            min-width: 320px;
            margin: 0;
        }

        .logo {
            width: 160px;
            height: 72px;
        }

        header {
            z-index: 20;
            position: fixed;
            width: 100%;
            height: 72px;
            background-color: #FBC303;
        }

        header, section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }

        .yellow {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 100%;
            /* max-width: 600px; */
            height: 30%;
            max-height: 200px;
            background-color: #FBC303;
        }
        .grey {
            position: fixed;
            z-index: -2;
            top: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 100%;
            /* max-width: 600px; */
            height: 100%;
            background-color: #CCCCCC;
        }

        ::slotted(*:nth-of-type(1)){
            margin-top: 100px;
        }

        ::slotted(*) {
            position: relative;
            z-index: 19;
        }

    `;
  }

  render() {
    return html`
        <section class="shell">
            <header>
                <img class="logo" src=${HorizontalLogo} alt="song ballot"/>
            </header>
            <section class="yellow"></section>
            <section class="grey"></section>
            <slot></slot>
        </section>
    `;
  }
}

window.customElements.define('default-background', DefaultBackground);
