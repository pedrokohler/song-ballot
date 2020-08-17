import { db } from '../services/firebase';

class SelectUser extends HTMLElement {
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
                  flex-direction: row;
                  padding-inline-start: 0;
                  flex-wrap: wrap;
                }

                li {
                  margin-right: 1em;
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
                  padding-top: 2em;
                  height: 300px;
                }

                @media only screen and (max-width: 600px) {
                  li {
                    margin-right: initial;
                  }
                }
              </style>
              <header>
                <h1>Quem é você?</h1>
                <h4>Clique no seu nome</h4>
              </header>
              <section>
                <ul></ul>
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

  async getSubmissions() {
    const settings = await this.getSettings();
    const { startDate, endDate } = settings[0];

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

  async filterUsers(allUsers) {
    let filteredUsers = allUsers;

    if (this.activity === 'sendSong') {
      const submissions = await this.getSubmissions();
      const submissionUserIds = submissions.map((sub) => sub.userId);
      filteredUsers = filteredUsers.filter((user) => !submissionUserIds.includes(user.id));
    } else if (this.activity === 'vote') {
      const usersThatCanVote = filteredUsers.filter((user) => !user.cantVote);
      const evaluations = await this.getEvaluations();
      const evaluationUserIds = evaluations.map((evaluation) => evaluation.evaluatorId);
      filteredUsers = usersThatCanVote.filter((user) => !evaluationUserIds.includes(user.id));
    }
    return filteredUsers;
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      const users = [];
      db.collection('users')
        .where('active', '==', true)
        .get()
        .then((querySnapshot) => querySnapshot
          .forEach(
            (doc) => users.push({ ...doc.data(), id: doc.id }),
          ))
        .then(() => resolve(users))
        .catch((e) => reject(e));
    });
  }

  async connectedCallback() {
    this.activity = this.getAttribute('activity');
    this.users = await this.getUsers();
    const filteredUsers = await this.filterUsers(this.users);

    const userListHTML = filteredUsers
      .reduce((html, user) => html.concat(`
      <li
        userId="${user.id}"
        userName="${user.userName}"
        cantVote="${user.cantVote}"
      >
        <p>${user.userName}</p>
      </li>
      `), '');
    this.list = this.shadowRoot.querySelector('ul');
    this.list.innerHTML = userListHTML;

    this.items = this.shadowRoot.querySelectorAll('li');

    this.items.forEach((item) => item.addEventListener('click', this.handleClick.bind(this)));
  }

  handleClick(e) {
    const userId = e.currentTarget.attributes.userId.value;
    const userName = e.currentTarget.attributes.userName.value;
    const cantVote = e.currentTarget.attributes.cantVote.value;

    if (this.activity === 'sendSong') {
      this.shadowRoot.innerHTML = `
              <phk-send-song-form
                  userName="${userName}"
                  userId="${userId}"
                  cantVote="${cantVote}"
              ><phk-send-song-form>
          `;
    } else if (this.activity === 'vote') {
      this.shadowRoot.innerHTML = `
          <phk-vote-form
              userName="${userName}"
              userId="${userId}"
              users="${JSON.stringify(this.users).replace(/"/g, '&quot;')}"
          ><phk-vote-form>
      `;
    }
  }
}

export default customElements.define('phk-select-user', SelectUser);
