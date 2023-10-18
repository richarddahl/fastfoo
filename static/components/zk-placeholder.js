import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKPlaceholder extends LitElement {
  static properties = {
    theme: {},
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
        text-align: center;
        color: var(--sl-color-neutral-500);
      }
      <h3>
        font-weight: 600;
      </h3>
    `
  ];

  constructor() {
    super();
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div>
        <img src="/static/assets/images/logo-tagline-${this.theme}.png"/>
        <h3>
          <sl-icon name="piggy-bank"></sl-icon>
          <span>You like Bacon?</span>
        </h3>
        <h3>
          <sl-icon name="emoji-smile"></sl-icon>
          <span>You like Tacos?</span>
        </h3>
        <h3>
          <sl-icon name="cash-stack"></sl-icon>
          <span>You like money?</span>
        </h3>
        <h3>We got a lot in common</h3>
        <div>
          <span>Select from the navigation panel on the left to begin</span>
        </div>
      </div>
    `;
  }
}

customElements.define('zk-placeholder', ZKPlaceholder);
