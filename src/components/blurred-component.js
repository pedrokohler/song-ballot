import { LitElement, html, css } from "lit-element";

export default class BlurredComponent extends LitElement {
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
            <slot class="blurred"></slot>
        `;
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.scrambleText();
  }

  scrambleText() {
    const processText = (text) => btoa(text);
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
}

customElements.define("blurred-component", BlurredComponent);
