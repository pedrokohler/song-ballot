import firebase from 'firebase';
import { LitElement } from 'lit-element';

export default class LogoutPage extends LitElement {
  constructor() {
    super();
    firebase.auth().signOut().then(() => {
      window.history.pushState(null, '', '');
    });
  }
}

customElements.define('logout-page', LogoutPage);
