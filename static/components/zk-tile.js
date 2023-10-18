/*
Provides a tile to display information in a list or similar widget.
*/
import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKTile extends LitElement {
  static properties = {
    objDict: { type: Object },
    detailState: {},
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
      }
      .title {
        font-weight: bold;
        margin-bottom: .25rem;
      }
      .summary {
        font-family: var(--sl-font-sans);
        font-size: var(--sl-font-size-small);
        font-weight: var(--sl-font-weight-semibold);
        line-height: var(--sl-line-height-normal);
        letter-spacing: var(--sl-letter-spacing-normal);
        color: var(--sl-color-neutral-500);
      }
      sl-card {
        display: block;
        margin-bottom: .5rem;
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        margin-top: .25rem;
        margin-bottom: .25rem;
      }
    `
  ];

  _deleteClickListener() {
  }


  _displayForm() {
    if (this.detailState == "open") {
      return html`
        <zk-form href="${this.objDict.href}?display=form"></zk-form>
      `
    }
  }

  _slShowListener(e) {
    this.detailState = "open";
    e.stopPropagation(); // make sure not parent events respond
  }

  _slHideListener(e) {
    this.detailState = "closed";
    e.stopPropagation(); // make sure not parent events respond
  }

  constructor() {
    super();
    this.addEventListener('sl-show', this._slShowListener);
    this.addEventListener('sl-hide', this._slHideListener);
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <sl-card>
        <div class="card-header">
          ${this.objDict.title}
          <div style="display: flex; align-items: center !important;">
            <sl-icon-button
              @click="${this._editClickListener}"
              name="pencil-square"
              label="Edit"
            ></sl-icon-button>
            <sl-icon-button
              @click="${this._detailClickListener}"
              name="arrow-right-square"
              label="Detail"
            ></sl-icon-button>
            <sl-icon-button
              @click="${this._deleteClickListener}"
              name="trash3"
              label="Delete"
            ></sl-icon-button>
            <span href="${this.objDict.id}">
              <sl-checkbox></sl-checkbox>
            </span>
          </div>
        </div>
        <sl-details>
          <div slot="summary" class="summary">${this.objDict.summary}</div>
          ${this._displayForm()}
        </sl-details>
      </sl-card>
    `;
  }
}

customElements.define('zk-tile', ZKTile);
