import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { cirrusGrid } from '/static/assets/styles/cirrus-grid-css.js';

export class ZKAppFooter extends LitElement {
  static properties = {
    theme: {},
  };

  static styles = [
    css`
      host: {
        font-family: var(--sl-font-sans);
      }
      a {
        text-decoration: none;
      }
      footer {
        text-align: center;
        align-items: center;
      }
      h4{
        font-family: var(--sl-font-sans);
        color: var(--sl-color-white);
        align-items: center;
      }
      .subtitle {
        font-size: 1.2em;
      }
    `
  ];

  constructor() {
    super();
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <footer>
        <div>
          <img src="/static/assets/images/logo-tagline-${this.theme}.png" width="200px"/>
        </div>
        <div style="display: flex; align-items: center; text-align: center; justify-content: center">
          <div>
            <div><a href="#">home</a></div>
            <div><a href="#">signup</a></div>
          </div>
          <sl-divider vertical></sl-divider>
          <div>
            <div><a href="#">company</a></div>
            <div><a href="#">contact</a></div>
          </div>
          <sl-divider vertical></sl-divider>
          <div>
            <div><a href="#">faq</a></div>
            <div><a href="#">help</a></div>
          </div>
        </div>
        <h4></h4>
      </footer>
    `
  }
}

customElements.define('zk-app-footer', ZKAppFooter); 
