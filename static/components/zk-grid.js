import { LitElement, css, html, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { cirrusGrid } from '/static/assets/styles/cirrus-grid-css.js';

export class ZKGrid extends LitElement {
  static properties = {
    modelClass: { type: String },
    listTitle: { type: String },
    theme: { type: String },
    listUrl: { type: String },
  };

  static styles = [
    cirrusGrid, 
    css`
      :host {
        font-family: var(--sl-font-sans);
      }
      .row {
        padding: 1rem;
        margin-right: auto;
        margin-left: auto;
        width: 90%;
        overflow: hidden;
        height: 100vh;
      }
      .footer {
        height: fit-content;
      }
    `
  ];

  constructor() {
    super();
    // Responds to selection from navigation menu
    this.addEventListener('sl-select', this._handleAppMenuSelect);
    // Responds to changing theme
    this.addEventListener('change-theme', function (e) {
      this.theme = e.detail.message;
    });
  }

  _handleAppMenuSelect = (e) => {
    this.modelClass = e.detail.item.value;
    this.listTitle = e.detail.item.getTextLabel();
    this.listUrl = `/api/${this.modelClass}`
    this.filterUrl = `/api/filters/${this.modelClass}`
  };

  // Render the UI as a function of component state
  render() {
    this.theme = localStorage.getItem('theme');
    return html`
      <div class="row">

        <div class="col-1">
          <zk-navigation-menu .theme="${this.theme}"></zk-navigation-menu> 
        </div>
        <sl-divider vertical></sl-divider>

        <div class="col-3">
          <zk-list
            .theme="${this.theme}"
            .listTitle="${this.listTitle || nothing}"
            .modelClass="${this.modelClass || nothing}"
            .listUrl="${this.listUrl || nothing}"
            .filterUrl="${this.filterUrl || nothing}"
          >
          </zk-list>
        </div>
        <sl-divider vertical></sl-divider>

        <div class="col">
          <zk-detail></zk-detail>
        </div>
  
      </div>
      <sl-divider></sl-divider>

      <div class="row footer">
        <div class="col">
          <zk-app-footer .theme="${this.theme}"></zk-app-footer>
        </div> 
      </div> 
    `;
  }
}

customElements.define('zk-grid', ZKGrid);
