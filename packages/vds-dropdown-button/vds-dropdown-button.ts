import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { VDSIcon } from '../vds-icon/vds-icon.js';

export type DropdownButtonSize = 'small' | 'medium' | 'large';
export type DropdownButtonShape = 'rounded' | 'sharp' | 'pill';
export type DropdownButtonType = 'filled' | 'outline';
export type DropdownButtonStyle = 'split' | 'regular';
export type DropdownButtonVariant = 'primary' | 'secondary';
export type DropdownButtonPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

export interface DropdownButtonClickEventDetail {
  originalEvent: MouseEvent;
  part: 'main' | 'dropdown';
}

/**
 * VDS Dropdown Button Component
 *
 * @element vds-dropdown-button
 *
 * @fires vds-dropdown-button-click - Fired when either the main button or dropdown button is clicked
 *
 * @csspart container - The main container element
 * @csspart main-button - The main button element (split style only)
 * @csspart dropdown-button - The dropdown button element
 * @csspart divider - The divider element between buttons (split style, primary variant only)
 * @csspart label - The label/text content
 * @csspart prefix-icon - The leading icon slot
 * @csspart chevron-icon - The chevron dropdown icon
 */
@customElement('vds-dropdown-button')
export class VDSDropdownButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      --vds-dropdown-btn-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-dropdown-btn-font-weight: var(--vds-font-weight-normal, 400);
      --vds-dropdown-btn-font-size: var(--vds-font-size-md, 0.75rem);
      --vds-dropdown-btn-padding-x: var(--vds-spacing-md, 1rem);
      --vds-dropdown-btn-padding-y: var(--vds-spacing-sm, 0.5rem);
      --vds-dropdown-btn-gap: var(--vds-spacing-xs, 0.1875rem);
      --vds-dropdown-btn-min-height: 28px;
      --vds-dropdown-btn-radius: var(--vds-radius-lg, 0.5rem);
      --vds-dropdown-btn-accent: var(--vds-color-brand, #00b578);
      --vds-dropdown-btn-accent-hover: var(--vds-color-brand-hover, #009d68);
      --vds-dropdown-btn-accent-active: var(--vds-color-brand-active, #007a51);
      --vds-dropdown-btn-on-accent: var(--vds-color-white, #ffffff);
      --vds-dropdown-btn-border-color: var(--vds-color-border-success, var(--vds-color-brand, #00b578));
      --vds-dropdown-btn-muted-bg: var(--vds-color-green-100, #e6f9f3);
      --vds-dropdown-btn-muted-bg-strong: var(--vds-color-green-200, #b3efd9);
      --vds-dropdown-btn-label-color: var(--vds-dropdown-btn-on-accent);
      --vds-dropdown-btn-disabled-bg: var(--vds-color-gray-200, #f8f9fb);
      --vds-dropdown-btn-disabled-color: var(--vds-color-slate-500, #90a0b9);
      --vds-dropdown-btn-disabled-border: var(--vds-color-gray-300, #eaeef4);
      --vds-dropdown-btn-transition: var(--vds-transition-base, 200ms ease-in-out);
      --vds-dropdown-btn-divider-color: var(--vds-color-green-200, #b3efd9);
      --vds-dropdown-btn-icon-size: var(--vds-dropdown-btn-font-size);
    }

    /* Sizes */
    :host([size='small']) {
      --vds-dropdown-btn-font-size: var(--vds-font-size-sm, 0.65625rem);
      --vds-dropdown-btn-padding-x: var(--vds-spacing-sm, 0.375rem);
      --vds-dropdown-btn-padding-y: var(--vds-spacing-xs, 0.1875rem);
      --vds-dropdown-btn-gap: var(--vds-spacing-xs, 0.1875rem);
      --vds-dropdown-btn-min-height: 20px;
    }

    :host([size='large']) {
      --vds-dropdown-btn-font-size: var(--vds-font-size-lg, 0.84375rem);
      --vds-dropdown-btn-padding-x: var(--vds-spacing-lg, 1.125rem);
      --vds-dropdown-btn-padding-y: var(--vds-spacing-md, 0.75rem);
      --vds-dropdown-btn-gap: var(--vds-spacing-sm, 0.375rem);
      --vds-dropdown-btn-min-height: 30px;
      --vds-dropdown-btn-font-weight: var(--vds-font-weight-semibold, 600);
    }

    /* Shapes */
    :host([shape='rounded']) {
      --vds-dropdown-btn-radius: var(--vds-radius-md, 0.28125rem);
    }

    :host([size='small'][shape='rounded']) {
      --vds-dropdown-btn-radius: var(--vds-radius-md, 0.28125rem);
    }

    :host([size='medium'][shape='rounded']),
    :host([size='large'][shape='rounded']) {
      --vds-dropdown-btn-radius: var(--vds-radius-lg, 0.375rem);
    }

    :host([shape='pill']) {
      --vds-dropdown-btn-radius: var(--vds-radius-full, 9999px);
    }

    :host([shape='sharp']) {
      --vds-dropdown-btn-radius: var(--vds-radius-none, 0);
    }

    /* Variants */
    :host([variant='secondary']) {
      --vds-dropdown-btn-accent: var(--vds-color-gray-200, #f8f9fb);
      --vds-dropdown-btn-accent-hover: var(--vds-color-gray-300, #eaeef4);
      --vds-dropdown-btn-accent-active: var(--vds-color-gray-400, #cdced3);
      --vds-dropdown-btn-on-accent: var(--vds-color-black, var(--vds-color-text-primary, #070922));
      --vds-dropdown-btn-border-color: var(--vds-color-gray-300, #eaeef4);
      --vds-dropdown-btn-muted-bg: var(--vds-color-gray-200, #f8f9fb);
      --vds-dropdown-btn-muted-bg-strong: var(--vds-color-gray-300, #eaeef4);
      --vds-dropdown-btn-divider-color: transparent;
    }

    .container {
      display: inline-flex;
      align-items: center;
      position: relative;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--vds-dropdown-btn-gap);
      min-height: var(--vds-dropdown-btn-min-height);
      padding: var(--vds-dropdown-btn-padding-y) var(--vds-dropdown-btn-padding-x);
      border-radius: var(--vds-dropdown-btn-radius);
      font-family: var(--vds-dropdown-btn-font-family);
      font-weight: var(--vds-dropdown-btn-font-weight);
      font-size: var(--vds-dropdown-btn-font-size);
      line-height: 1;
      letter-spacing: 0.01em;
      background-color: transparent;
      border: 1px solid transparent;
      color: var(--vds-dropdown-btn-label-color);
      cursor: pointer;
      transition: background-color var(--vds-dropdown-btn-transition), border-color var(--vds-dropdown-btn-transition), color var(--vds-dropdown-btn-transition);
      text-decoration: none;
      white-space: nowrap;
      box-sizing: border-box;
    }

    .button:focus-visible {
      outline: 2px solid var(--vds-color-blue-500, #4366ff);
      outline-offset: 2px;
    }

    .button:disabled,
    :host([disabled]) .button {
      background-color: var(--vds-dropdown-btn-disabled-bg);
      border-color: var(--vds-dropdown-btn-disabled-border);
      color: var(--vds-dropdown-btn-disabled-color);
      cursor: not-allowed;
      opacity: 0.8;
    }

    /* Split style */
    :host([button-style='split']) .main-button {
      margin-right: -1px;
    }

    :host([button-style='split'][shape='rounded']) .main-button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    :host([button-style='split'][shape='pill']) .main-button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    :host([button-style='split'][shape='sharp']) .main-button {
      border-right: none;
    }

    :host([button-style='split'][shape='rounded']) .dropdown-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    :host([button-style='split'][shape='pill']) .dropdown-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    :host([button-style='split']) .dropdown-button {
      padding-left: var(--vds-spacing-sm, 0.375rem);
      padding-right: var(--vds-spacing-sm, 0.375rem);
    }

    :host([size='small'][button-style='split']) .dropdown-button {
      padding-left: var(--vds-spacing-xs, 0.1875rem);
      padding-right: var(--vds-spacing-xs, 0.1875rem);
    }

    :host([size='large'][button-style='split']) .dropdown-button {
      padding-left: var(--vds-spacing-md, 0.75rem);
      padding-right: var(--vds-spacing-md, 0.75rem);
    }

    /* Divider for split style, primary variant */
    .divider {
      width: 1px;
      height: 100%;
      background-color: var(--vds-dropdown-btn-divider-color);
      flex-shrink: 0;
    }

    /* Hide divider for outline type - borders provide separation */
    :host([type='outline']) .divider {
      display: none;
    }

    :host([variant='secondary']) .divider {
      display: none;
    }

    /* Type: filled */
    :host([type='filled']) .button {
      background-color: var(--vds-dropdown-btn-accent);
      border-color: var(--vds-dropdown-btn-border-color, var(--vds-dropdown-btn-accent));
      color: var(--vds-dropdown-btn-on-accent);
    }

    :host([type='filled']) .button:hover:not(:disabled) {
      background-color: var(--vds-dropdown-btn-accent-hover);
      border-color: var(--vds-dropdown-btn-accent-hover);
    }

    :host([type='filled']) .button:active:not(:disabled) {
      background-color: var(--vds-dropdown-btn-accent-active);
      border-color: var(--vds-dropdown-btn-accent-active);
    }

    /* Type: outline */
    :host([type='outline']) {
      --vds-dropdown-btn-label-color: var(--vds-dropdown-btn-accent);
    }

    /* For outline secondary, use text-primary color instead of accent */
    :host([type='outline'][variant='secondary']) {
      --vds-dropdown-btn-label-color: var(--vds-color-black, var(--vds-color-text-primary, #070922));
    }

    :host([type='outline']) .button {
      background-color: transparent;
      border-color: var(--vds-dropdown-btn-border-color, var(--vds-dropdown-btn-accent));
      color: var(--vds-dropdown-btn-label-color);
    }

    :host([type='outline']) .button:hover:not(:disabled) {
      background-color: var(--vds-dropdown-btn-muted-bg);
    }

    :host([type='outline']) .button:active:not(:disabled) {
      background-color: var(--vds-dropdown-btn-muted-bg-strong);
    }

    /* Icon styles */
    ::slotted([slot='prefix-icon']) {
      display: inline-flex;
      align-items: center;
      line-height: 1;
      color: inherit;
      font-size: var(--vds-dropdown-btn-icon-size);
    }

    .chevron-icon {
      font-size: var(--vds-dropdown-btn-icon-size);
      color: inherit;
      display: inline-flex;
      align-items: center;
      line-height: 1;
    }
  `;

  @property({ type: String, reflect: true })
  accessor size: DropdownButtonSize = 'medium';

  @property({ type: String, reflect: true })
  accessor shape: DropdownButtonShape = 'rounded';

  @property({ type: String, reflect: true })
  accessor type: DropdownButtonType = 'filled';

  @property({ type: String, reflect: true, attribute: 'button-style' })
  accessor buttonStyle: DropdownButtonStyle = 'split';

  @property({ type: String, reflect: true })
  accessor variant: DropdownButtonVariant = 'primary';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String, reflect: true })
  accessor position: DropdownButtonPosition = 'bottom-left';

  private get containerElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('.container') as HTMLElement || null;
  }

  private findAssociatedMenu(): HTMLElement | null {
    // Try to find menu by ID pattern (search in parent container first, then document)
    const buttonId = this.getAttribute('id');
    if (buttonId) {
      const menuId = buttonId.replace('dropdown-btn', 'dropdown-menu');
      // Search in parent container first
      if (this.parentElement) {
        const menu = this.parentElement.querySelector(`#${menuId}`) as HTMLElement;
        if (menu) return menu;
      }
      // Fallback to document search
      const menu = document.querySelector(`#${menuId}`) as HTMLElement;
      if (menu) return menu;
    }

    // Find next sibling dropdown-menu
    let current: Element | null = this.nextElementSibling;
    while (current) {
      if (current.tagName === 'VDS-DROPDOWN-MENU') {
        return current as HTMLElement;
      }
      current = current.nextElementSibling;
    }

    // Find within parent
    if (this.parentElement) {
      const menu = this.parentElement.querySelector('vds-dropdown-menu') as HTMLElement;
      if (menu) return menu;
    }

    return null;
  }

  private positionMenu(menu: HTMLElement): void {
    if (!this.containerElement) return;

    const gap = 4; // 0.25rem = 4px

    // Ensure menu's parent container has position: relative
    const container = this.parentElement;
    if (container && getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }

    // Reset positioning
    menu.style.position = 'absolute';
    menu.style.top = '';
    menu.style.bottom = '';
    menu.style.left = '';
    menu.style.right = '';
    menu.style.transform = '';
    menu.style.zIndex = '1000';
    menu.style.marginTop = '';
    menu.style.marginBottom = '';
    menu.style.marginLeft = '';
    menu.style.marginRight = '';

    switch (this.position) {
      case 'bottom-left':
        menu.style.top = '100%';
        menu.style.left = '0';
        menu.style.marginTop = `${gap}px`;
        break;
      case 'bottom-right':
        menu.style.top = '100%';
        menu.style.right = '0';
        menu.style.marginTop = `${gap}px`;
        break;
      case 'top-left':
        menu.style.bottom = '100%';
        menu.style.left = '0';
        menu.style.marginBottom = `${gap}px`;
        break;
      case 'top-right':
        menu.style.bottom = '100%';
        menu.style.right = '0';
        menu.style.marginBottom = `${gap}px`;
        break;
      case 'left-top':
        menu.style.top = '0';
        menu.style.right = '100%';
        menu.style.marginRight = `${gap}px`;
        break;
      case 'left-bottom':
        menu.style.bottom = '0';
        menu.style.right = '100%';
        menu.style.marginRight = `${gap}px`;
        break;
      case 'right-top':
        menu.style.top = '0';
        menu.style.left = '100%';
        menu.style.marginLeft = `${gap}px`;
        break;
      case 'right-bottom':
        menu.style.bottom = '0';
        menu.style.left = '100%';
        menu.style.marginLeft = `${gap}px`;
        break;
    }
  }

  private handleClick(event: MouseEvent, part: 'main' | 'dropdown'): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const detail: DropdownButtonClickEventDetail = {
      originalEvent: event,
      part
    };

    this.dispatchEvent(
      new CustomEvent('vds-dropdown-button-click', {
        detail,
        bubbles: true,
        composed: true
      })
    );

    // Position menu if dropdown part was clicked
    if (part === 'dropdown') {
      this.updateComplete.then(() => {
        const menu = this.findAssociatedMenu();
        if (menu) {
          this.positionMenu(menu);
        }
      });
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    
    // Reposition menu if position property changed
    if (changedProperties.has('position')) {
      this.updateComplete.then(() => {
        const menu = this.findAssociatedMenu();
        if (menu && menu.style.display !== 'none') {
          this.positionMenu(menu);
        }
      });
    }
  }

  render() {
    const chevronIcon = html`<vds-icon class="chevron-icon" name="chevron-down" aria-hidden="true"></vds-icon>`;

    if (this.buttonStyle === 'split') {
      return html`
        <div part="container" class="container">
          <button
            part="main-button"
            class="button main-button"
            ?disabled=${this.disabled}
            @click=${(e: MouseEvent) => this.handleClick(e, 'main')}
          >
            <slot name="prefix-icon" part="prefix-icon"></slot>
            <span part="label">
              <slot></slot>
            </span>
          </button>
          ${this.variant === 'primary'
            ? html`<div part="divider" class="divider"></div>`
            : nothing}
          <button
            part="dropdown-button"
            class="button dropdown-button"
            ?disabled=${this.disabled}
            @click=${(e: MouseEvent) => this.handleClick(e, 'dropdown')}
            aria-label="Open dropdown menu"
          >
            ${chevronIcon}
          </button>
        </div>
      `;
    } else {
      // Regular style
      return html`
        <div part="container" class="container">
          <button
            part="dropdown-button"
            class="button"
            ?disabled=${this.disabled}
            @click=${(e: MouseEvent) => this.handleClick(e, 'dropdown')}
          >
            <slot name="prefix-icon" part="prefix-icon"></slot>
            <span part="label">
              <slot></slot>
            </span>
            ${chevronIcon}
          </button>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-dropdown-button': VDSDropdownButton;
  }
}

