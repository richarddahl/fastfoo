import { LitElement, css, html, until, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { getData } from "/static/assets/scripts/getdata.js";

export class ZKListCheckboxMenu extends LitElement {
  static properties = {
    anySelected: { type: Boolean},
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
      }
      sl-dropdown {
        margin-bottom: 1rem;
        margin-left: .5rem;
      }
    `
  ];

  get _dropdown() {
    return this.renderRoot.querySelector('sl-dropdown');
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <sl-dropdown hoist>
        <sl-button slot="trigger">
          <sl-icon name="check2-square"></sl-icon>
        </sl-button>
        <sl-menu>
          <sl-menu-item>Select All</sl-menu-item>
          <sl-menu-item disabled="${this.anySelected || nothing}">Delete Selected</sl-menu-item>
          <sl-menu-item disabled="${this.anySelected || nothing}">Compare Selected</sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    `;
  }

}
customElements.define('zk-list-checkbox-menu', ZKListCheckboxMenu);
