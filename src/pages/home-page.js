import { LitElement, html, css } from 'lit-element';
import './login-page';
import './menu-page';

class HomePage extends LitElement {
  static get styles() {
    return css`
            .shell {
                box-sizing: border-box;
                width: 100vw;
                height: 100%;
                margin: 0;
            }
        `;
  }

  render() {
    const loggedIn = true;

    return html`
        <section class="shell">
            ${loggedIn ? html`<menu-page></menu-page>` : html`<login-page></login-page>`}
        </section>
    `;
  }
}

export default customElements.define('home-page', HomePage);
