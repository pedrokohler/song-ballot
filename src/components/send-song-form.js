import { db } from '../services/firebase';

class SendSongForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
            <style>
                * {
                  box-sizing:border-box;
                }

                header {
                  margin-top: 2em;
                  text-align: center;
                }

                section {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-evenly;
                }

                form {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-evenly;
                  text-align: center;
                }

                #form-header {
                  width: 100%;
                  max-width: 600px;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  align-items: baseline;
                  justify-content: center;
                  text-align: center;
                }

                #form-header label > * {
                  margin-bottom: 0.8em;
                  margin-right: 0.8em;
                }

                .error {
                    color: red;
                }

                div {
                    margin-bottom: 2em;
                }

                button {
                  width: 100px;
                  height: 35px;
                }

                iframe {
                  width: 560px;
                  height: 315px;
                }

                @media only screen and (max-width: 560px) {
                  iframe {
                    width: 100%;
                  }

                  #form-header {
                    width: 100%;
                    max-width: 250px;
                  }
                }
            </style>
            <header>
              <h1>Cadastro de música</h1>
              <h4></h4>
            </header>
            <section>
              <form>
                  <div id="form-header">
                      <label>
                          <span>Insira o link</span>
                          <input type='url' name='song-url' id='song-url'>
                      </label>
                      <button type="button" id="load-button">Carregar</button>
                  </div>
                  <p class="error">O URL que você inseriu não é valido. Favor utilizar um URL do formato https://www.youtube.com/watch?v=6UMKjDmulj8 ou https://youtu.be/7FMf11zbLC4</p>
                  <div id="confirmDiv">
                      <iframe src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      <p>Confirme se o seu vídeo está correto</p>
                      <button type="submit">Confirmar Envio</button>
                  </div>
              </form>
            </section>
        `;
  }

  getSettings() {
    return new Promise((resolve, reject) => {
      const settings = [];
      db.collection('settings')
        .get()
        .then((querySnapshot) => querySnapshot
          .forEach(
            (doc) => settings.push({ ...doc.data(), id: doc.id }),
          ))
        .then(() => resolve(settings))
        .catch((e) => reject(e));
    });
  }

  connectedCallback() {
    this.getElements();

    this.userName = this.getAttribute('userName');
    this.userId = this.getAttribute('userId');
    this.cantVote = this.getAttribute('cantVote');

    if (this.userName) {
      this.subtitle.innerText = `Cadastre a sua música da semana, ${this.userName}`;
    }

    this.errorParagraph.setAttribute('hidden', true);
    this.confirmDiv.setAttribute('hidden', true);
    this.confirmButton.addEventListener('click', this.handleConfirm.bind(this));
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  disconnectedCallback() {
    this.form.removeEventListener('submit', this.handleSubmit);
    this.confirmButton.removeEventListener('click', this.handleConfirm);
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (e.target.disabled) {
      return;
    }
    e.target.disabled = true;

    const payload = {
      userId: this.userId,
      userName: this.userName,
      songUrl: this.songUrl,
      createdAt: new Date(),
    };

    if (this.cantVote === 'true') {
      const settings = await this.getSettings();
      const { lastWinnerId } = settings[0];

      payload.lastWinnerId = lastWinnerId;
      payload.cantVote = true;
    }

    db.collection('submissions').add(payload).then(() => {
      window.alert('Tudo certo! Seu vídeo foi enviado!');
      window.location.reload();
    }).catch((err) => {
      window.alert(err.message);
      e.target.disabled = false;
    });
  }

  handleConfirm() {
    this.errorParagraph.setAttribute('hidden', true);
    const url = this.form['song-url'].value;
    const videoId = url.match(/.*\.be\/(.*)$/) || url.match(/.*\.com\/watch\?v=(.*)$/);

    if (videoId) {
      const iframeUrl = `https://www.youtube.com/embed/${videoId[1]}`;
      this.songUrl = iframeUrl;
      this.iframe.setAttribute('src', iframeUrl);
      this.confirmDiv.removeAttribute('hidden');
    } else {
      this.errorParagraph.removeAttribute('hidden');
    }
  }

  getElements() {
    this.subtitle = this.shadowRoot.querySelector('h4');
    this.errorParagraph = this.shadowRoot.querySelector('p.error');
    this.iframe = this.shadowRoot.querySelector('iframe');
    this.confirmDiv = this.shadowRoot.querySelector('div#confirmDiv');
    this.confirmButton = this.shadowRoot.querySelector('button[type=button]');
    this.form = this.shadowRoot.querySelector('form');
  }
}

export default customElements.define('phk-send-song-form', SendSongForm);
