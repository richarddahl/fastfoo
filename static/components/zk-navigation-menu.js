import {
  LitElement,
  css,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class ZKNavigationMenu extends LitElement {
  static properties = {
    theme: {},
  };

  static styles = [
    css`
      :host {
        width: 100%;
      }
      sl-menu {
      }
      sl-menu-label {
        color: var(--sl-color-primary-500);
      }
      sl-menu-item {
        padding-left: var(--sl-spacing-2x-small);
      }
    `,
  ];

  constructor() {
    super();
    this.menuDef = [
      {
        name: "Foos and Stuff",
        items: [
          {
            name: "Foos",
            href: "foos",
          },
          {
            name: "Bars",
            href: "bars",
          },
        ],
      },
      {
        name: "Bazz Kind of Things",
        items: [
          {
            name: "Bazzes",
            href: "bazzes",
          },
        ],
      },
      {
        name: "User Junk",
        items: [
          {
            name: "Users",
            href: "roleusers",
          },
          {
            name: "Groups",
            href: "groups",
          },
          {
            name: "Organizations",
            href: "organizations",
          },
        ],
      },
    ];
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <zk-logo
        logoHref="/"
        logoAlt="foobar: is not real"
        logoSrcDark="/static/assets/images/logo-dark.png"
        logoSrcLight="/static/assets/images/logo-light.png"
        theme="${this.theme}"
        tagline="v 0.0.1a"
      ></zk-logo>
      <zk-toolbar></zk-toolbar>
      <sl-menu style="border: none; border-radius: none;">
        ${this.menuDef.map((menu) =>
          html`
            <sl-divider></sl-divider>
            <sl-menu-label>${menu.name}</sl-menu-label>
            ${menu.items.map((menuItem) =>
              html`<sl-menu-item .value="${menuItem.href}">${menuItem.name}</sl-menu-item>`
            )}
          `
        )}
      </sl-menu>
    `;
  }
}

customElements.define("zk-navigation-menu", ZKNavigationMenu);
