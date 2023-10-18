/*
Provides a tile to display information in a list or similar widget.
*/
import {
  LitElement,
  css,
  html,
  choose,
  nothing,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class ZKFListFilterForm extends LitElement {
  static properties = {
    label: {},
    listTitle: {},
    name: {},
    filters: { type: Array },
    field: { type: Object },
    disabled: { type: Boolean },
    required: { type: Boolean },
  };

  static styles = [
    css`
      :host {
        font-family: var(--sl-font-sans);
      }
      .formFieldGroup {
        display: flex;
      }
      sl-button {
        margin-top: 0.75rem;
        margin-left: auto;
      }
      sl-input,
      sl-textarea,
      sl-checkbox,
      sl-select {
        margin-top: 0.75em;
      }
      sl-input::part(form-control-label),
      sl-textarea::part(form-control-label),
      sl-checkbox::part(form-control-label),
      sl-select::part(form-control-label) {
        display: none;
      }
    `,
  ];

  constructor() {
    super();
  }

  render() {
    return html`
      <form>
        <div class="formFieldGroup">
          <sl-select
            @sl-change="${this._changeLookupListener}"
            hoist
            name="${this.field.name}__lookup"
            value="${this.field.lookup_initial || nothing}"
          >
            ${this.field.lookups.map(
              (lookup) =>
                html`
                  <sl-option value="${lookup.value}">${lookup.text}</sl-option>
                `
            )}
          </sl-select>
          <sl-select hoist name="${this.field.name}__include" value="include">
            <sl-option value="include">Include</sl-option>
            <sl-option value="exclude">Exclude</sl-option>
          </sl-select>
        </div>
        ${choose(
          this.field.element,
          [
            [
              "input",
              () => html`
                <sl-input
                  label="${this.field.label}"
                  name="fltr__${this.field.name}"
                  value="${this.field.initial}"
                  type="${this.field.type}"
                  help-text="${this.field.help_text}"
                  clearable="${this.field.clearable || nothing}"
                  required="${this.required || nothing}"
                  disabled="${this.disabled || nothing}"
                ></sl-input>
              `,
            ],
            [
              "select",
              () => html`
                <sl-select
                  hoist
                  label="${this.field.label}"
                  name="fltr__${this.field.name}"
                  value="${this.field.initial}"
                  help-text="${this.field.help_text}"
                  clearable="${this.field.clearable || nothing}"
                  required="${this.required || nothing}"
                  disabled="${this.disabled || nothing}"
                  multiple="${this.field.multiple || nothing}"
                >
                  ${this.field.choices.map(
                    (choice) => html`
                      <sl-option value="${choice.id}">
                        ${choice.display}
                      </sl-option>
                    `
                  )}
                </sl-select>
              `,
            ],
            [
              "textarea",
              () => html`
                <sl-textarea
                  label="${this.field.label}"
                  name="fltr__${this.field.name}"
                  value="${this.field.initial}"
                  help-text="${this.field.help_text}"
                  clearable="${this.field.clearable || nothing}"
                  required="${this.required || nothing}"
                  disabled="${this.disabled || nothing}"
                ></sl-textarea>
              `,
            ],
            [
              "checkbox",
              () => html`
                <sl-checkbox
                  label="${this.field.label}"
                  name="fltr__${this.field.name}"
                  value="${this.field.initial}"
                  help-text="${this.field.help_text}"
                  required="${this.required || nothing}"
                  disabled="${this.disabled || nothing}"
                  checked="${this.field.checked || nothing}"
                ></sl-checkbox>
              `,
            ],
          ],
          () => html`<h4>Error, wrong field defined</h4>`
        )}
        ${this.filters.map(
          (filter) => html`
            <zk-list-filter-menu-item
              label="${filter.label}"
              listTitle="${this.listTitle}"
              .filters="${filter.filters}"
              .field="${filter.field}"
            >
            </zk-list-filter-menu-item>
          `
        )}
        <sl-select hoist name="${this.field.name}__match" value="and">
          <sl-option value="and">Match other filters AND this one</sl-option>
          <sl-option value="or">Match other filters OR this one</sl-option>
        </sl-select>
        <sl-button
          style="float: right;"
          type="submit"
          slot="footer"
          variant="primary"
          >Add Filter</sl-button
        >
      </form>
    `;
  }

  firstUpdated() {
    const form = this.renderRoot.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("zk-add-search-param", {
          bubbles: true,
          composed: true,
          detail: {
            form: form,
          },
        })
      );
      return false;
    });
  }

  _changeLookupListener(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.value == "blank") {
      this.disabled = true;
      this.required = false;
    } else {
      this.disabled = false;
      this.required = true;
    }
  }
}

customElements.define("zk-list-filter-form", ZKFListFilterForm);
