import { LitElement, html, css } from "lit-element";

export default class BlurredComponent extends LitElement {
  static get properties() {
    return {
      blurred: {
        type: Boolean,
        attribute: true,
        reflect: true,
      },
    };
  }

  static get styles() {
    return css`
        .blurred {
            color: transparent;
            text-shadow: 0 0 5px rgba(0,0,0,0.5);
            user-select: none;
        }
    `;
  }

  render() {
    return html`
            <slot class="${this.blurred ? "blurred" : ""}"></slot>
        `;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);

    if (this.blurred) {
      this.handleBlur(true);
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    const alreadyRendered = !!this.shadowRoot.querySelector("slot");
    if (name === "blurred" && alreadyRendered) {
      this.handleBlur(newVal === "");
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  handleBlur(shouldBlur) {
    const processText = shouldBlur ? this.scrambleText : this.unscrambleText;
    this.updateText(processText);
  }

  updateText(processText) {
    const slotContent = this.shadowRoot.querySelector("slot");
    const slotChildNodes = Array.from(slotContent.assignedNodes())
      .filter((node) => node.nodeType !== Node.TEXT_NODE);
    this.handleHTMLNodes(processText, slotChildNodes);
  }

  processLeafText(processText) {
    return (leaf) => {
      const oldText = leaf.innerText;
      leaf.innerText = processText(oldText);
    };
  }

  processSubtreeText(processText) {
    return (subtree) => {
      const childNodes = Array.from(subtree.childNodes)
        .filter((node) => node.nodeType !== Node.TEXT_NODE);
      this.handleHTMLNodes(processText, childNodes);
    };
  }

  handleHTMLNodes(processText, nodes) {
    const subtrees = nodes.filter((node) => node.childElementCount > 0);
    const leaves = nodes.filter((node) => node.childElementCount === 0);

    leaves.forEach(this.processLeafText(processText));
    subtrees.forEach(this.processSubtreeText(processText));
  }

  scrambleText(text) {
    return btoa(text);
  }

  unscrambleText(text) {
    return atob(text);
  }
}

customElements.define("blurred-component", BlurredComponent);
