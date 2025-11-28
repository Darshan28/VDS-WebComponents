import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * VDS Menu Component
 *
 * @element vds-menu
 *
 * @csspart menu - The menu container element
 */
@customElement('vds-menu')
export class VDSMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
      --vds-menu-bg: var(--vds-color-white, #ffffff);
      --vds-menu-padding: var(--vds-spacing-xs, 0.1875rem);
      --vds-menu-gap: var(--vds-spacing-2xs, 0.09375rem);
      --vds-menu-radius: var(--vds-radius-lg, 0.5rem);
      --vds-menu-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
      --vds-menu-min-width: 160px;
      --vds-menu-max-width: 260px;
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: var(--vds-menu-gap);
      background-color: var(--vds-menu-bg);
      padding: var(--vds-menu-padding);
      border-radius: var(--vds-menu-radius);
      box-shadow: var(--vds-menu-shadow);
      min-width: var(--vds-menu-min-width);
      max-width: var(--vds-menu-max-width);
      box-sizing: border-box;
    }
  `;

  render() {
    return html`
      <div class="menu" part="menu" role="menu">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-menu': VDSMenu;
  }
}

