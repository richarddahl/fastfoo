import { LitElement, css, html, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKListFilterDialog extends LitElement {
  static properties = {
    label: {},
    listTitle: {},
    filters: { type: Array },
    field : { type: Object },
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
      <sl-dialog
        label="Filter ${this.listTitle} by: ${this.label}"
      >
        <div style="min-height: 20vh;">
          ${this.filters.map(filter =>
            html`
              <div
                label="${filter.label}"
                .filters="${filter.filters}"
                .field="${filter.field}"
              ></div>
            `
          )}
          <zk-list-menu-filter-form
            label="${this.label}"
            required="${true}"
            listTitle="${this.listTitle}"
            .filters="${this.filters}"
            .field="${this.field}"
          >
          </zk-list-menu-filter-form>
        </div>
      </sl-dialog>
    `
  }
}

customElements.define('zk-list-filter-dialog', ZKListFilterDialog);
