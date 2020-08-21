import { LitElement, html, css } from 'lit-element';

const options = [
  { label: 'Enviar música', path: 'send-song' },
  { label: 'Votar', path: 'vote' },
  { label: 'Resultado', path: '' },
  { label: 'Histórico', path: '' },
  { label: 'Favoritas', path: '' },
  { label: 'Perfil', path: '' },
];

export default class MenuPage extends LitElement {
  static get styles() {
    return css`
        .shell {
            box-sizing: border-box;
            width: 100vw;
            height: 100%;
            margin: 0;
            background-color: #1A1A1A;
            color: #FBFBD3;
        }
        ul {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 0;
            list-style-type: none;
        }
        hr {
            border: none;
            width: 65%;
            max-width: 300px;
            height: 1px;
            background-color: rgba(251, 251, 211, 0.1);
        }
        li {
            display: block;
            padding: 10px;
            text-transform: uppercase;
            cursor: pointer;
        }
    `;
  }

  renderListItem(option, index) {
    if (index > 0) {
      return html`
        <hr/>
        <router-link path=${option.path}>
          <li>${option.label}</li>
        </router-link>
      `;
    }
    return html`
      <router-link path=${option.path}>
        <li>${option.label}</li>
      </router-link>
    `;
  }

  render() {
    return html`
          <section class="shell">
            <ul>
              ${options.map(this.renderListItem)}
            </ul>
          </section>
        `;
  }
}

window.customElements.define('menu-page', MenuPage);
