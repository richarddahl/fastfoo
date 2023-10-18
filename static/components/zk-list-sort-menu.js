import { LitElement, css, html, until, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { getData } from "/static/assets/scripts/getdata.js";

export class ZKListSortMenu extends LitElement {
  static properties = {
    sorting: { type: Array },
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
      sl-menu-item {
        display: flex;
        align-items: center;
        padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
        user-select: none;
        white-space: nowrap;
      }
      .menu-item {
        user-select: none;
        white-space: nowrap;
        padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
        cursor: pointer;
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
          <sl-icon name="sort-down">
          </sl-icon>
        </sl-button>
        <sl-menu>
          ${this.sorting.map(sortItem => 
            html`
              <sl-menu-item>
                <sl-icon
                  class="menu-item"
                  @click="${this._sortIconClicked}"
                  value="${sortItem.value}"
                  name="sort-down-alt"
                ></sl-icon>
                <sl-icon
                  class="menu-item"
                  @click="${this._sortIconClicked}"
                  value="-${sortItem.value}"
                  name="sort-up-alt"
                ></sl-icon>
                <span style="padding: var(--sl-spacing-2x-small);">${sortItem.label}</span>
              </sl-menu-item>
            `
          )}
        </sl-menu>
      </sl-dropdown>
    `;
  }

}
customElements.define('zk-list-sort-menu', ZKListSortMenu);
