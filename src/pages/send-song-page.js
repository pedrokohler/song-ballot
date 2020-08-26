import { LitElement, html, css } from 'lit-element';
import '../components/default-background';
import '../components/alert-modal';
// import firebase from 'firebase';

export default class SendSongPage extends LitElement {
  static get styles() {
    return css`
        section {
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
            width: 100%;
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
            margin-bottom: 0.5em;
        }
    `;
  }

  //   firstUpdated() {
  //     const getYoutubeTitle = firebase.functions().httpsCallable('getYoutubeTitle');
  //     getYoutubeTitle({ videoId: 'HC3B0GHwOM8' }).then((response) => console.log(response.data));
  //   }

  render() {
    return html`
        <alert-modal></alert-modal>
        <default-background>
            <section>
                <h3>Enviar música</h3>
                <h4>Semana 18/08/20</h4>
                <p>O limite para envio da música é até 12h da terça feira</p>
                <hr/>
                <iframe src="https://www.youtube.com/embed/nXm2x5IRjt0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div>
                    <h4>Enviar segunda música</h4>
                    <h6>Insira o link do vídeo do Youtube</h6>
                </div>
                <input type="url"/>
                <!-- @todo implement real callback -->
                <button @click="${() => this.shadowRoot.querySelector('alert-modal').setAttribute('isOpen', '')}">Carregar</button>
            </section>
        </default-background>
    `;
  }
}

window.customElements.define('send-song-page', SendSongPage);
