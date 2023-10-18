import { LitElement, css, html, until } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { getData } from "/static/assets/scripts/getdata.js";

export class ZKList extends LitElement {
  /* 
  The overall container for the list of objects obtained from the API
  Includes the elements:
    Heading object name
    Filter/Sort/Query/Checkbox Menus
    The tile list
  Responds to the following events:
    refresh-list
      Sent by the filter, sort, and query menus
  */

  static properties = {
    modelClass: { type: String },
    listTitle: { type: String },
    theme: { type: String },
    tagList: { type: Array },
    listUrl: { type: String },
    filterUrl: { type: String },
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
    this._baseUrl = this.listUrl;
    this._searchParams = new URLSearchParams();
    this.tagList = new Array();
    this.addEventListener("zk-add-search-param", this._addSearchParam);
    this.addEventListener("zk-del-search-param", this._delSearchParam)
  }
  
  // Render the UI as a function of component state
  render() {
    if (this.listUrl) {
      if (this._baseUrl == undefined) {
        this._baseUrl = this.listUrl;
      }
      return html`
        ${until(this._render(),
          html`<zk-loading-notification></zk-loading-notification>`
        )}
      `;
    } else {
      return html`<zk-placeholder theme=${this.theme}></zk-placeholder>`;
    }
  }

  // Asynchronously get the data for the component state
  async _render() {
    const jsonData = await getData(this.listUrl);
    //this._createTags();
    return html`
      <zk-list-menu .filterUrl="${this.filterUrl}" .listTitle="${this.listTitle}" ></zk-list-menu>
      
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

  _createTags() {
    let iconName;
    for (const key in this._searchParams.keys()) {
      if (
        !key.includes("__lookup") &&
        !key.includes("__include") &&
        !key.includes("__match")
      ){
        if (key.includes("__asc")) {
          iconName = "sort-up";
        } else if (key.includes("__dsc")) {
          iconName = "sort-down";
        } else if (key.includes("qry__")){
          iconName == "database-gear";
        } else if (key.includes("fltr__")) {
          console.log(key);
          iconName = "filter"
        }
        if (iconName == undefined ) {
          return;
        }
        this.tagList.push(
          {
            "searchParamKey": key,
            "iconName": iconName,
            "label": key.replace("fltr__", " "),
          }
        )
      }
    };
  }

  _delSearchParam(e) {
    const searchParamKey = e.target.getAttribute("searchParamKey");
    e.target.closest("sl-tag").remove();
    for (const key in this._searchParams.keys()) {
      if (key.includes(searchParamKey))
      this._searchParams.delete(searchParamKey)
    }
    this.listUrl = `${this._baseUrl}?${this._searchParams.toString()}`
  }

  _addSearchParam(e) {
    const form = e.detail.form;
    const formData = new FormData(form);
    const newSearchParams = new URLSearchParams(formData);
    for (const key of newSearchParams.keys()) {
      this._searchParams.set(key, newSearchParams.getAll(key));
    }
    this.listUrl = `${this._baseUrl}?${this._searchParams.toString()}`
  }
}

customElements.define('zk-list', ZKList);
