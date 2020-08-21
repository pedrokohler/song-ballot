import { LitElement, html, css } from 'lit-element';
import '../components/default-background';
import '../components/alert-modal';
import forwardArrows from '../images/forward-arrows.png';
import backwardArrows from '../images/backward-arrows.png';

export default class VotePage extends LitElement {
  static get styles() {
    return css`
        .shell {
            border-radius: 3px;
            min-height: 200px;
            height: inherit;
            width: 90%;
            min-width: 300px;
            max-width: 600px;
            background-color: #FBFBD3;
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

        .song-title {
            text-transform: none;
            margin-right: auto;
        }

        div h4 {
            margin-bottom: 0;
            text-transform: none;
        }

        div h6 {
            margin-top: 0;
            font-weight: 400;
            text-align: left;
            margin-bottom: 1em;
        }

        input {
            height: 1.5em;
            width: 120px;
            border-radius: 3px;
            margin-bottom: 1em;
            font-family: inherit;
            border-style: solid;
            border-width: 1px;
            font-size: 1em;
            background-color: #F2F2F2;
            text-align: center;
        }

        .navigation-section {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .navigation-btn {
            background-color: transparent;
            border: none;
            font-family: inherit;
            font-weight: 600;
        }

        .navigation-btn:focus {
            outline: none;
        }

        .navigation-btn:disabled span {
            color: #CCCCCC;
        }

        .navigation-btn:disabled img {
            filter: invert(91%) hue-rotate(135deg) brightness(92%) contrast(89%);
        }

        .navigation-section img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
        }

        .navigation-section span {
            display: inline;
            vertical-align: middle;
            text-transform: uppercase;
            margin: 0 10px;
        }

        iframe {
            width: 100%;
            height: 300px;
            max-height: 50%;
            margin-bottom: 1em;
        }
    `;
  }

  render() {
    return html`
        <alert-modal></alert-modal>
        <default-background>
            <section class="shell">
                <h3>Votar</h3>
                <h4>Semana 18/08/20</h4>
                <p>O limite para votação é até 20h00 de domingo</p>
                <hr/>
                <h4 class="song-title">Música 1</h4>
                <iframe src="https://www.youtube.com/embed/nXm2x5IRjt0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <input type="number" max="10" min="1"/>
                <section class="navigation-section">
                    <button disabled class="navigation-btn">
                        <img src=${backwardArrows} alt=""/>
                        <span>anterior</span>
                    </button>
                    <button class="navigation-btn">
                        <span>próxima</span>
                        <img src=${forwardArrows} alt=""/>
                    </button>
                </section>
            </section>
        </default-background>
    `;
  }
}

window.customElements.define('vote-page', VotePage);
