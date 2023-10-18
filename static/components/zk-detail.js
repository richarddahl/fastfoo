import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKDetail extends LitElement {
  static properties = {
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
      }
    `
  ];

  constructor() {
    super();
  }

  // Render the UI as a function of component state
  render() {
    return html`
      Object Detail
    `;
  }
}

customElements.define('zk-detail', ZKDetail);
