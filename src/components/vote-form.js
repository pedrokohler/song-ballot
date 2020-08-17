import { db } from '../services/firebase';

class VoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
              <style>
                div {
                    margin-bottom: 2em;
                }

                iframe {
                  width: 560px;
                  height: 315px;
                }

                @media only screen and (max-width: 560px) {
                  iframe {
                    width: 100%;
                  }
                }
              </style>
              <h1>Votação</h1>
              <h4></h4>
              <div>
                <form></form>
              </div>
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

  async getSubmissions() {
    this.settings = await this.getSettings();
    const { startDate, endDate } = this.settings[0];

    return new Promise((resolve, reject) => {
      const submissions = [];
      db.collection('submissions')
        .where('createdAt', '>=', startDate)
        .where('createdAt', '<=', endDate)
        .get()
        .then((querySnapshot) => querySnapshot
          .forEach(
            (doc) => submissions.push({ ...doc.data(), id: doc.id }),
          ))
        .then(() => resolve(submissions))
        .catch((e) => reject(e));
    });
  }

  toKebabCase(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  generateVideoTemplate({ userName, songUrl }, index) {
    return `
    <div>
        <h5>Música ${index + 1}</h5>
        <iframe src="${songUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p>Sua nota: <input type="number" name="${this.toKebabCase(userName)}" min="1" max="10" required></p>
    </div>
    `;
  }

  async connectedCallback() {
    this.getElements();
    this.submissions = await this.getSubmissions();

    this.userName = this.getAttribute('userName');
    this.userId = this.getAttribute('userId');
    this.users = JSON.parse(this.getAttribute('users'));

    if (this.userName) {
      this.subtitle.innerText = `Dê a nota para as músicas abaixo, ${this.userName}`;
      this.evaluator = this.userName;
      this.evaluatorId = this.userId;
      let content = this.submissions
        .filter(
          (submission) => submission.userId !== this.userId
          && this.userId !== submission.lastWinnerId,
        )
        .reduce((html, submission, index) => html.concat(this.generateVideoTemplate(submission, index)), '');
      content = content.concat(`
        <div>
          <p>Assegure-se que sua nota para cada música está correta e clique abaixo para enviar seu voto!</p>
          <button type="submit">Enviar</button>
        </div>
        `);
      this.form.innerHTML = content;
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  disconnectedCallback() {
    this.form.removeEventListener('submit', this.handleSubmit);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.target.disabled) {
      return;
    }
    e.target.disabled = true;

    const results = this.submissions.map((submission) => {
      const userName = this.toKebabCase(submission.userName);
      const entry = this.form[userName];

      if (entry) {
        const evaluation = Number(entry.value);
        const vote = {
          ...submission, evaluation,
        };
        delete vote.createdAt;
        return vote;
      }
      return null;
    }).filter(Boolean);

    db.collection('evaluations').add({
      evaluation: results,
      evaluator: this.evaluator,
      evaluatorId: this.evaluatorId,
      createdAt: new Date(),
    }).then(() => {
      window.alert('Tudo certo! Seu voto foi computado!');
      window.location.reload();
    }).catch((err) => {
      window.alert(err.message);
      e.target.disabled = false;
    });
  }

  getElements() {
    this.subtitle = this.shadowRoot.querySelector('h4');
    this.form = this.shadowRoot.querySelector('form');
  }
}

export default customElements.define('phk-vote-form', VoteForm);
