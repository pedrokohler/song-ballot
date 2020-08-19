import { LitElement, html, css } from 'lit-element';

const options = [
  'Perfil',
  'Enviar música',
  'Votar',
  'Resultado',
  'Histórico',
  'Favoritas',
];

class MenuPage extends LitElement {
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
            height: 1px;
            background-color: rgba(251, 251, 211, 0.1);

        }
        li {
            display: block;
            padding: 10px;
            text-transform: uppercase;
        }
    `;
  }

  renderListItem(option, index) {
    if (index > 0) {
      return html`
        <hr/>
        <li>${option}</li>
      `;
    }
    return html`
      <li>${option}</li>
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

export default customElements.define('menu-page', MenuPage);
