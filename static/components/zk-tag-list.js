import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKTagList extends LitElement {
  static properties = {
    tagList: { type: Array },
    filters: { type: Array },
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
      }
      div {
        margin-bottom: .75rem;
      }
      sl-tag {
        margin-right: .25rem;
      }
    `
  ];

  constructor() {
    super();
  }

  _removeTag(e) {
    this.dispatchEvent(
      new CustomEvent("zk-del-search-param", {
        bubbles: true,
        composed: true,
        detail: {
          searchParam: e.target.getAttribute("searchParam"),
        },
      })
    )
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div>
        ${this.tagList.map(tag => html`
          <sl-tag
            @sl-remove="${this._removeTag}"
            searchParam="${tag.searchParam}"
            removable
            variant="primary"
          >
            ${tag.fieldLabel}
          </sl-tag>
        `)}
      </div>
    `;
  }
}

customElements.define('zk-tag-list', ZKTagList);
