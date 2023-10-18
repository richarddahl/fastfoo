import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class ZKToolbar extends LitElement {
  static properties = {
    theme: {},
  };

  static styles = [
    css`
      .padded {
        padding: .5rem;
      }
      .padded-right {
        padding-right: .25rem;
      }
      #icon-toolbar {
        margin-top: .5rem;
        margin-bottom: .5rem;
        display: flex;
        justify-content: center;
        z-index: 10;
        background: var(--sl-color-neutral-200);
        border-bottom-left-radius: calc(var(--docs-border-radius) * 2);
        border-bottom-right-radius: calc(var(--docs-border-radius) * 2);
        padding: 0.125rem 0.25rem;
      }
    `
  ];

  _handleSLSelect = (e) => {
    e.stopPropagation();
    const oldTheme = localStorage.getItem("theme");
    const theme = e.detail.item.value;
    if (theme == oldTheme) {
      return;
    }
    localStorage.setItem("theme", theme);
    document.documentElement.classList.add(`sl-theme-${theme}`);
    document.documentElement.classList.remove(`sl-theme-${oldTheme}`);
    this.theme = theme
    let changeThemeEvent = new CustomEvent('change-theme', {
      detail: { message: theme },
      bubbles: true,
      composed: true });
      this.dispatchEvent(changeThemeEvent);
  };

  constructor() {
    super();
    this.addEventListener('sl-select', this._handleSLSelect);
  }

  // Render the UI as a function of component state
  render() {
    let themeIcon = "sun";
    const theme = localStorage.getItem("theme");
    if (theme.match("dark")) {
      themeIcon = "moon";
    }
    return html`
      <div id="icon-toolbar">
        <sl-icon class="padded" name="person-circle" aria-hidden="true"></sl-icon>
        <sl-icon class="padded" name="box-arrow-right" aria-hidden="true"></sl-icon>
        <sl-dropdown placement="bottom-end">
          <sl-icon
            class="padded"
            slot="trigger"
            title="Select Theme"
            name="${themeIcon}"
            aria-hidden="true"
          >
          </sl-icon>
          <sl-menu role="menu">
            <sl-menu-item value="light" aria-checked="false" aria-disabled="false" tabindex="0">
              <sl-icon class="padded-right" name="sun" aria-hidden="true"></sl-icon>
              Light
            </sl-menu-item>
            <sl-menu-item value="dark" aria-checked="false" aria-disabled="false" tabindex="-1">
              <sl-icon class="padded-right" name="moon" aria-hidden="true"></sl-icon>
              Dark
            </sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </div>
    `;
  }
}
customElements.define('zk-toolbar', ZKToolbar);
