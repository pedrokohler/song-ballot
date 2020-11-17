import { LitElement } from "lit-element";
import { logout } from "../services/firebase";

export default class LogoutPage extends LitElement {
  constructor() {
    super();
    logout().then(() => {
      this.ownerDocument.defaultView.history.pushState(null, "", "");
    });
  }
}

customElements.define("logout-page", LogoutPage);
