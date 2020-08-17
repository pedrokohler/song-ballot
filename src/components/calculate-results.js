import { db } from '../services/firebase';
import _ from 'lodash';

class CalculateResults extends HTMLElement {
  constructor() {
    super();
    this.password = '';
    this.passwordTarget = 'showresult';
    this.attachShadow({ mode: 'open' });
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

  async getEvaluations() {
    const settings = await this.getSettings();
    const { startDate, endDate } = settings[0];

    return new Promise((resolve, reject) => {
      const evaluations = [];
      db.collection('evaluations')
        .where('createdAt', '>=', startDate)
        .where('createdAt', '<=', endDate)
        .get()
        .then((querySnapshot) => querySnapshot
          .forEach(
            (doc) => evaluations.push({ ...doc.data(), id: doc.id }),
          ))
        .then(() => resolve(evaluations))
        .catch((e) => reject(e));
    });
  }

  tableRowTemplate({
    userName, total, note, evaluations,
  }) {
    return `
        <tr>
            <td>${userName}</td>
            <td>${JSON.stringify(evaluations)}</td>
            <td>${total}</td>
            <td>${note}</td>
        </tr>
      `;
  }

  async connectedCallback() {
    this.evaluations = await this.getEvaluations();
    const allEvaluations = this.evaluations
      .reduce((arr, evaluation) => arr.concat(evaluation.evaluation), []);

    const evaluationsPerUser = _.chain(allEvaluations)
      .groupBy('userId')
      .map((evaluations, userId) => ({
        userId,
        userName: evaluations[0].userName,
        evaluations: evaluations.map((ev) => ev.evaluation),
      }))
      .value();

    const resultsPerUser = evaluationsPerUser
      .map((ev) => ({
        ...ev,
        total: ev.evaluations.reduce((sum, note) => sum + note, 0),
      }))
      .map((ev) => ({
        ...ev,
        note: Math.round(((ev.total / ev.evaluations.length) + Number.EPSILON) * 100) / 100,
      }));

    this.shadowRoot.innerHTML = `
        <table hidden>
            <tr>
                <th>Usuário</th>
                <th>Avaliações</th>
                <th>Total</th>
                <th>Nota</th>
            </tr>
            ${resultsPerUser.map(this.tableRowTemplate).reduce((str, el) => str.concat(el), '')}
        </table>
      `;

    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.password = '';
        this.shadowRoot.querySelector('table').setAttribute('hidden', true);
        return;
      }

      const char = String.fromCharCode(e.keyCode).toLowerCase();
      if (char) {
        this.password = this.password.concat(char);
        if (this.password === this.passwordTarget) {
          this.shadowRoot.querySelector('table').removeAttribute('hidden');
        }
      }
    });
  }
}

export default customElements.define('phk-calculate-results', CalculateResults);
