import { LitElement, css, html, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKListFilterMenuItem extends LitElement {
  static properties = {
    label: {},
    listTitle: {},
    filters: { type: Array },
    field: { type: Object },
    checked: { type: Boolean },
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
    this.checked = false;
    this.addEventListener("zk-add-search-param", this._addSearchParam);
  }

  _addSearchParam(e) {
    // hides the dialog when the filter form is submitted
    this.checked = true;
    let dialog = this.renderRoot.querySelector("sl-dialog");
    dialog.hide();
  }

  _openFilterDialog(e) {
    e.target.nextElementSibling.show();
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <sl-menu-item
        type="checkbox"
        checked="${this.checked || nothing}"
        @click="${this._openFilterDialog}"
      >
        ${this.label}
      </sl-menu-item>
      <sl-dialog
        label="Filter ${this.listTitle} by: ${this.label}"
        open="${this.open || nothing}"
      >
        <div style="in-height: 20vh;">
          ${this.filters.map(filter =>
            html`
              <div
                label="${filter.label}"
                .filters="${filter.filters}"
                .field="${filter.field}"
              ></div>
            `
          )}
          <zk-list-filter-form
            label="${this.label}"
            required="${true}"
            listTitle="${this.listTitle}"
            .filters="${this.filters}"
            .field="${this.field}"
          ></zk-list-filter-form>
        </div>
      </sl-dialog>
    `;
  }

}
customElements.define('zk-list-filter-menu-item', ZKListFilterMenuItem);
