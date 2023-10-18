/*
Provides a tile to display information in a list or similar widget.
*/
import { LitElement, css, html, until, nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { getData } from '/static/assets/scripts/getdata.js';

export class ZKForm extends LitElement {
  static properties = {
    href: {},
    fields: { type: Array }
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
      }
      .form-control--has-label.form-control--medium .form-control__label {
        margin-bottom: .5rem;
      }
      sl-input,
      sl-select,
      sl-textarea,
      sl-checkbox,
      sl-radio,
      sl-button {
        margin-top: .75em;
      }
    `
  ];


  _slShowHideListener(e) {
    // Don't let the events bubble up to the parent sl-detail
    e.stopPropagation();
  }

  constructor() {
    super();
    /* these are necessary to avoid the parent sl-detail from 
      responding to the select elements sl-show and sl-hide events
    */
    this.addEventListener('sl-show', this._slShowHideListener);
    this.addEventListener('sl-hide', this._slShowHideListener);

  }

  _getCheckbox(field) {
    return html`
      <sl-checkbox
        required="${field.required || nothing}"
        name="${field.name}"
        disabled="${field.disabled || nothing}"
        value="${field.initial}"
        help-text="${field.help_text}"
        checked="${field.checked || nothing}"
      >${field.label}</sl-checkbox>
    `;
  }
  _getInput(field) {
    return html`
      <sl-input
        label="${field.label}"
        clearable="${field.clearable || nothing}"
        required="${field.required || nothing}"
        name="${field.name}"
        disabled="${field.disabled || nothing}"
        type="${field.type}"
        value="${field.initial}"
        help-text="${field.help_text}"
        minLength="${field.min_length || nothing}"
        maxLength="${field.max_length || nothing}"
        min="${field.min_size || nothing}"
        max="${field.max_size || nothing}"
        step="${field.step_size || nothing}"
      ></sl-input>
    `;
  }

  _getSelect(field) {
    return html`
      <sl-select
        label="${field.label}"
        value="${field.initial}"
        clearable="${field.clearable || nothing}"
        required="${field.required || nothing}"
        name="${field.name}"
        disabled="${field.disabled || nothing}"
        help-text="${field.help_text}"
        multiple="${field.multiple || nothing}"
      >
        ${field.choices.map(choice => html`
          <sl-option value="${choice.id}">${choice.display}</sl-option>`
        )}
      </sl-select>
    `
  }

  _getTextArea(field) {
    return html`
      <sl-textarea
        label="${field.label}"
        value="${field.initial}"
        help-text="${field.help_text}"
        clearable="${field.clearable || nothing}"
        required="${field.required || nothing}"
        name="${field.name}"
        disabled="${field.disabled || nothing}"
      ></sl-textarea>
    `
  }

  _getField(field){
    if (field.element == "input") {
      return(this._getInput(field));
    } else if (field.element == "select") {
      return(this._getSelect(field));
    } else if (field.element == "textarea") {
      return(this._getTextArea(field));
    } else if (field.element == "checkbox") {
      return(this._getCheckbox(field));
    }
  }

  async _renderForm() {
    if (this.href) {
      let jsonData = await getData(this.href);
      return html`
        <form>
          ${jsonData.fields.map(field => html`${this._getField(field)}`)}
          <sl-button type="submit">Save</sl-button>
        </form>
      `;
    } else {
      return html`
        <form>
          ${this.fields.map(field => html`${this._getField(field)}`)}
          <sl-button type="submit">Submit</sl-button>
        </form>
      `;
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`
      ${until(this._renderForm(), html`
        <zk-loading-notification></zk-loading-notification>
      `)}
    `;
  }
}

customElements.define('zk-form', ZKForm);