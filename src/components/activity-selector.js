import { db } from '../services/firebase';

class ActivitySelector extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    margin-top: 2em;
                    text-align: center;
                }

                ul {
                    height: 100%;
                    list-style-type: none;
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    flex-direction: column;
                    padding-inline-start: 0;
                }

                li {
                    text-align: center;
                    background-color: #f9f9f9;
                    width: 200px;
                    height: 50px;
                    font-weight: 700;
                    cursor: pointer;
                }

                section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    height: 300px;
                }

                li.disabled {
                    cursor: not-allowed;
                }

                @media only screen and (max-width: 600px) {
                    li.disabled {
                    display: none;
                    }
                }
            </style>
            <header>
                <h1>MS-Bruxão</h1>
                <h4>O que deseja fazer?</h4>
            </header>
            <section>
                <ul>
                    <li activity="sendSong" class="disabled"><p>Enviar música</p></li>
                    <li activity="vote" class="disabled"><p>Votar</p></li>
                </ul>
            </section>
        `
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

    async connectedCallback() {
      const settings = await this.getSettings();
      const { evaluationsOn, submissionsOn } = settings[0];

      const sendSongLi = this.shadowRoot.querySelector('li[activity=sendSong]');
      const voteLi = this.shadowRoot.querySelector('li[activity=vote]');

      if (evaluationsOn) {
        voteLi.addEventListener('click', this.handleClick.bind(this));
        voteLi.classList.remove('disabled');
      }

      if (submissionsOn) {
        sendSongLi.addEventListener('click', this.handleClick.bind(this));
        sendSongLi.classList.remove('disabled');
      }
    }

    handleClick(e) {
        const activity = e.currentTarget.attributes.activity.value;
        this.shadowRoot.innerHTML = `
            <phk-select-user
                activity="${activity}"
            ><phk-select-user>
        `;

    }

}

export default customElements.define('phk-activity-selector', ActivitySelector);