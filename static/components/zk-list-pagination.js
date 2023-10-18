import { LitElement, css, html, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKListPagination extends LitElement {
  static properties = {
    pageDict: { type: Object },
  };

  static styles = [
    css`
      .pages {
        display: flex;
        justify-content: space-between;
        padding-bottom: .5rem;
      }
      .page-links {
        display: flex;
        justify-content: center;
        padding-top: .5rem;
        padding-bottom: 1rem;
      }
      sl-button {
        margin-left: .5rem;
        margin-right: .5rem
      }
    `
  ];

  constructor() {
    super();
  }

  _clickListener(e){
    e.preventDefault();
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="pages">
        ${this.pageDict.start} to ${this.pageDict.end} of ${this.pageDict.total}
        <div>Page ${this.pageDict.current_page} of ${this.pageDict.num_pages}</div>
      </div>
      <div class="page-links">
        ${this.pageDict.page_links.map((pageLink) =>
          html`
            <sl-button
              variant="${pageLink.variant || nothing}"
              disabled="${pageLink.disabled || nothing}"
              href="${pageLink.href}"
              @click=${this._clickListener}
            >
              ${pageLink.text}
            </sl-button>
          `)}
      </div>
    `;
  }

}
customElements.define('zk-list-pagination', ZKListPagination);
