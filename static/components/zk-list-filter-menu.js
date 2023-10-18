import { LitElement, css, html, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKListFilterMenu extends LitElement {
  static properties = {
    filters: { type: Array },
    listTitle: {},
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
    this.addEventListener("zk-add-search-param", this._addTag);
  }

  _addTag(e) {
    // Collapses the dropdown menu with the filter form is submitted
    let dropdown = this.renderRoot.querySelector("sl-dropdown");
    dropdown.hide();
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <sl-dropdown hoist>
        <sl-button slot="trigger"><sl-icon name="filter"></sl-icon></sl-button>
        <sl-menu>
          ${this.filters.map(filter =>
            html`
              <zk-list-filter-menu-item
                .listTitle="${this.listTitle}"
                .label="${filter.label}"
                .field="${filter.field}"
                .filters="${filter.filters}"
                .checked="${filter.field.selected || nothing}"
              >
              </zk-list-filter-menu-item>
            `
          )}
        </sl-menu>
      </sl-dropdown>
    `;
  }

}
customElements.define('zk-list-filter-menu', ZKListFilterMenu);
