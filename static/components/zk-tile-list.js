import {
  LitElement,
  css,
  html,
  until,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { getData } from "/static/assets/scripts/getdata.js";
export class ZKTileList extends LitElement {
  static properties = {
    modelClass: { type: String },
    theme: { type: String },
    tagList: { type: Array },
    url: { type: String },
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
      }
      div {
        height: 90vh; 
        overflow-y: auto;
      }
    `,
  ];

  constructor() {
    super();
  }


  render() {
    if (this.tagList) {
      let queryString = '';
      this.tagList.forEach(function(tag, index) {
        if (index == 0) {
          queryString = `${tag.queryString}`
        }else {
          queryString = `${queryString}&${tag.queryString}`
        }
      });
      this.url = `/api/${this.modelClass}/?${queryString}`
    } else {
      this.url = `/api/${this.modelClass}/`
    }
    return html`
      ${until(
        this._render(),
        html`<zk-loading-notification></zk-loading-notification>`
      )}
    `;
  }
  // Render the UI as a function of component state

  async _render() {
    const jsonData = await getData(this.url);
    return html`
      <zk-tag-list .tagList="${this.tagList}"></zk-tag-list>
      <zk-list-pagination .pageDict="${jsonData.pagination}"></zk-list-pagination>
      <div>
        ${jsonData.results.map((objDict) => html`
          <zk-tile
            detailState="hidden"
            .objDict="${objDict}"
          ></zk-tile>
        `)}
      </div>
    `;
  }
}

customElements.define("zk-tile-list", ZKTileList);
