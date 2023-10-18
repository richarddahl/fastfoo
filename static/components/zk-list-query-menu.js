import { LitElement, css, html, until, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { getData } from "/static/assets/scripts/getdata.js";

export class ZKListQueryMenu extends LitElement {
  static properties = {
    queries: { type: Array },
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

  constructor() {
    super();
  }

  render() {
    return html`
      <sl-dropdown hoist>
        <sl-button slot="trigger">
          <sl-icon name="database-gear"></sl-icon>
        </sl-button>
        <sl-menu>
          <sl-menu-item @click=${this._createNewListener}>Create Query</sl-menu-item>
          ${this.queries.map(query =>
            html`
              <sl-menu-item>${query.label}</sl-menu-item>
            `
          )}
        </sl-menu>
      </sl-dropdown>
    `;
  }

}
customElements.define('zk-list-query-menu', ZKListQueryMenu);
