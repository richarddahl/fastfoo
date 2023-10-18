import { LitElement, css, html, until } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

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
    this.tagList = new Array();
    this.addEventListener("zk-add-search-param", this._addTag);
    this.addEventListener("zk-del-search-param", this._removeTag)
  }

  _removeTag(e) {
    const tagIndex = e.detail.index;
    this.tagList.splice(tagIndex, 1);
    this.tagList = [...this.tagList];
  }

  _addTag(e) {
    const form = e.detail.form;
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString()
    let values = [];
    let lookup, include, match, fieldName, field, fieldLabel;
    for (const [key, val] of formData) {
      if (val) {
        if (key.endsWith("__lookup")) {
          lookup = formData.get(key);
        } else if (key.endsWith("__include")) {
          include = formData.get(key);
        } else if (key.endsWith("__match")) {
          match = formData.get(key);
        } else {
          fieldName = key;
          field = form.querySelector(`[name=${fieldName}]`);
          if (field != null) {
            fieldLabel = field.getAttribute("label");
          } else {
            fieldLabel = key;
          }
        }
      }
    }
    let select = form.querySelector(`sl-select[name=${fieldName}]`);
    if (select != null ) {
      Array.from(select.selectedOptions).forEach(function (option) {
        values.push(option.textContent);
      });
    } else {
      values.push(formData.get(fieldName));
    }
    let index = this.tagList.length;
    this.tagList.push(
      {
        "index": index,
        "fieldLabel": fieldLabel,
        "fieldName": fieldName,
        "lookup": lookup,
        "include": include,
        "match": match,
        "values": values,
        "queryString": queryString,
      }
    );
    this.tagList = [...this.tagList]
  }

  render() {
    if (this.listUrl) {
      return html`
        ${until(this._render(),
          html`<zk-loading-notification></zk-loading-notification>`
        )}
      `;
    }
  }
  // Render the UI as a function of component state
  async _render() {
    if (this.listUrl) {
      return html`
        <zk-list-menu
          .listTitle=${this.listTitle}
          .modelClass=${this.modelClass}
          .tagList=${this.tagList}
        ></zk-list-menu>

        <zk-tile-list
          .modelClass=${this.modelClass}
          .theme=${this.theme}
          .tagList=${this.tagList}
        ></zk-tile-list>
      `;
    } else {
      return html`<zk-placeholder theme=${this.theme}></zk-placeholder>`;
    }
  }
}

customElements.define('zk-list', ZKList);
