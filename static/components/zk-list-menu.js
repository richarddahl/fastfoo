import { LitElement, css, html, until, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { getData } from "/static/assets/scripts/getdata.js";

export class ZKListMenu extends LitElement {
  static properties = {
    listTitle: { type: String },
    filterUrl: { type: String },
    //filters: { type: Array },
    //sorting: { type: Array },
    //queries: { type: Array },
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
        display: flex;
        justify-content: space-between;
      }
    `
  ];

  constructor() {
    super();
  }
  // Asynchronously get the data for the component state
  async _render() {
    const jsonData = await getData(this.filterUrl);
    return html`
      <span style="font-size:var(--sl-font-size-large)">${this.listTitle}</span>
      <span>
        <zk-list-filter-menu listTitle="${this.listTitle}" .filters="${jsonData.filters || nothing}"></zk-list-filter-menu>
        <zk-list-sort-menu listTitle="${this.listTitle}" .sorting="${jsonData.sorting || nothing}"></zk-list-sort-menu>
        <zk-list-query-menu listTitle="${this.listTitle}" .queries="${jsonData.queries || nothing}"></zk-list-query-menu>
        <zk-list-checkbox-menu></zk-list-menu-checkbox-menu>
      </span>
    `;
  }

  // Render the UI as a function of component state
  render() {
    return html`
      ${until(this._render(),
        html`<zk-loading-notification></zk-loading-notification>`
      )}
    `;
  }

}
customElements.define('zk-list-menu', ZKListMenu);
