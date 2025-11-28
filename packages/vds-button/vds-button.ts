import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'danger' | 'info' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonAppearance = 'filled' | 'outline' | 'text';
export type ButtonShape = 'rounded' | 'pill' | 'sharp';

export interface ButtonClickEventDetail {
  originalEvent: MouseEvent;
}

/**
 * VDS Button Component
 * 
 * @element vds-button
 * 
 * @fires vds-button-click - Fired when the button is clicked
 * 
 * @csspart button - The button element
 * @csspart label - The label/text content
 * @csspart prefix-icon - The leading icon slot
 * @csspart icon - Alias for the deprecated single icon slot (leading)
 * @csspart suffix-icon - The trailing icon slot
 */
@customElement('vds-button')
export class VDSButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      --vds-btn-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-btn-font-weight: var(--vds-font-weight-normal, 400);
      --vds-btn-font-size: var(--vds-font-size-md, 1rem);
      --vds-btn-padding-x: var(--vds-spacing-md, 1rem);
      --vds-btn-padding-y: var(--vds-spacing-sm, 0.5rem);
      --vds-btn-gap: var(--vds-spacing-sm, 0.5rem);
      --vds-btn-min-height: 28px;
      --vds-btn-radius: var(--vds-radius-lg, 0.5rem);
      --vds-btn-accent: var(--vds-color-brand, #00b578);
      --vds-btn-accent-hover: var(--vds-color-brand-hover, #009d68);
      --vds-btn-accent-active: var(--vds-color-brand-active, #007a51);
      --vds-btn-on-accent: var(--vds-color-white, #ffffff);
      --vds-btn-border-color: var(--vds-color-border-success, var(--vds-color-brand, #00b578));
      --vds-btn-muted-bg: var(--vds-color-green-100, #e6f9f3);
      --vds-btn-muted-bg-strong: var(--vds-color-green-200, #b3efd9);
      --vds-btn-focus-ring: var(--vds-color-blue-500, #4366ff);
      --vds-btn-label-color: var(--vds-btn-on-accent);
      --vds-btn-disabled-bg: var(--vds-color-gray-200, #f8f9fb);
      --vds-btn-disabled-color: var(--vds-color-slate-500, #90a0b9);
      --vds-btn-disabled-border: var(--vds-color-gray-300, #eaeef4);
      --vds-btn-transition: var(--vds-transition-base, 200ms ease-in-out);
    }

    :host([size='sm']) {
      --vds-btn-font-size: var(--vds-font-size-sm, 0.875rem);
      --vds-btn-padding-x: var(--vds-spacing-sm, 0.5rem);
      --vds-btn-padding-y: var(--vds-spacing-xs, 0.25rem);
      --vds-btn-gap: var(--vds-spacing-xs, 0.25rem);
      --vds-btn-min-height: 20px;
    }

    :host([size='lg']) {
      --vds-btn-font-size: var(--vds-font-size-lg, 1.125rem);
      --vds-btn-padding-x: var(--vds-spacing-lg, 1.5rem);
      --vds-btn-padding-y: var(--vds-spacing-md, 1rem);
      --vds-btn-gap: var(--vds-spacing-sm, 0.5rem);
      --vds-btn-min-height: 30px;
      --vds-btn-font-weight: var(--vds-font-weight-semibold, 600);
    }

    :host([shape='rounded']) {
      --vds-btn-radius: var(--vds-radius-lg, 0.5rem);
    }

    :host([shape='pill']) {
      --vds-btn-radius: var(--vds-radius-full, 9999px);
    }

    :host([shape='sharp']) {
      --vds-btn-radius: var(--vds-radius-none, 0);
    }

    :host([variant='secondary']) {
      --vds-btn-accent: var(--vds-color-gray-200, #f8f9fb);
      --vds-btn-accent-hover: var(--vds-color-gray-300, #eaeef4);
      --vds-btn-accent-active: var(--vds-color-gray-400, #cdced3);
      --vds-btn-on-accent: var(--vds-color-black, var(--vds-color-text-primary, #070922));
      --vds-btn-border-color: var(--vds-color-gray-300, #eaeef4);
      --vds-btn-muted-bg: var(--vds-color-gray-200, #f8f9fb);
      --vds-btn-muted-bg-strong: var(--vds-color-gray-300, #eaeef4);
    }

    :host([variant='warning']) {
      --vds-btn-accent: var(--vds-color-orange-500, #ff6800);
      --vds-btn-accent-hover: var(--vds-color-orange-600, #f54800);
      --vds-btn-accent-active: var(--vds-color-orange-700, #ca3500);
      --vds-btn-border-color: var(--vds-color-border-warning, var(--vds-color-orange-500, #ff6800));
      --vds-btn-muted-bg: var(--vds-color-orange-100, #ffecd4);
      --vds-btn-muted-bg-strong: var(--vds-color-orange-200, #ffd6a7);
    }

    :host([variant='danger']) {
      --vds-btn-accent: var(--vds-color-red-500, #fb3145);
      --vds-btn-accent-hover: var(--vds-color-red-600, #e02033);
      --vds-btn-accent-active: var(--vds-color-red-700, #b51626);
      --vds-btn-border-color: var(--vds-color-border-error, var(--vds-color-red-500, #fb3145));
      --vds-btn-muted-bg: var(--vds-color-red-100, #ffecee);
      --vds-btn-muted-bg-strong: var(--vds-color-red-200, #ffc8cc);
    }

    :host([variant='info']) {
      --vds-btn-accent: var(--vds-color-blue-500, #4366ff);
      --vds-btn-accent-hover: var(--vds-color-blue-600, #2e4ddb);
      --vds-btn-accent-active: var(--vds-color-blue-700, #233ab0);
      --vds-btn-border-color: var(--vds-color-blue-500, #4366ff);
      --vds-btn-muted-bg: var(--vds-color-blue-100, #eef2ff);
      --vds-btn-muted-bg-strong: var(--vds-color-blue-200, #c7d2fe);
    }

    :host([variant='inverse']) {
      --vds-btn-accent: var(--vds-color-text-inverse, var(--vds-color-white, #ffffff));
      --vds-btn-accent-hover: rgba(255, 255, 255, 0.9);
      --vds-btn-accent-active: rgba(255, 255, 255, 0.8);
      --vds-btn-on-accent: var(--vds-color-text-inverse, var(--vds-color-white, #ffffff));
      --vds-btn-border-color: rgba(255, 255, 255, 0.2);
      --vds-btn-muted-bg: rgba(255, 255, 255, 0.1);
      --vds-btn-muted-bg-strong: rgba(255, 255, 255, 0.15);
      --vds-btn-disabled-bg: rgba(255, 255, 255, 0.05);
      --vds-btn-disabled-color: rgba(255, 255, 255, 0.4);
      --vds-btn-disabled-border: rgba(255, 255, 255, 0.1);
    }

    :host([variant='inverse'][appearance='filled']) {
      --vds-btn-accent: rgba(255, 255, 255, 0.1);
      --vds-btn-accent-hover: rgba(255, 255, 255, 0.15);
      --vds-btn-accent-active: rgba(255, 255, 255, 0.2);
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--vds-btn-gap);
      min-height: var(--vds-btn-min-height);
      padding: var(--vds-btn-padding-y) var(--vds-btn-padding-x);
      border-radius: var(--vds-btn-radius);
      font-family: var(--vds-btn-font-family);
      font-weight: var(--vds-btn-font-weight);
      font-size: var(--vds-btn-font-size);
      line-height: 1;
      letter-spacing: 0.01em;
      background-color: transparent;
      border: 1px solid transparent;
      color: var(--vds-btn-label-color);
      cursor: pointer;
      transition: background-color var(--vds-btn-transition), border-color var(--vds-btn-transition), color var(--vds-btn-transition), box-shadow var(--vds-btn-transition);
      text-decoration: none;
      white-space: nowrap;
      box-sizing: border-box;
    }

    button:focus-visible {
      outline: 2px solid var(--vds-btn-focus-ring);
      outline-offset: 2px;
    }

    button:disabled,
    button[disabled],
    :host([disabled]) button {
      background-color: var(--vds-btn-disabled-bg);
      border-color: var(--vds-btn-disabled-border);
      color: var(--vds-btn-disabled-color);
      cursor: not-allowed;
      opacity: 0.8;
    }

    :host([appearance='filled']) button {
      background-color: var(--vds-btn-accent);
      border-color: var(--vds-btn-border-color, var(--vds-btn-accent));
      color: var(--vds-btn-on-accent);
    }

    :host([appearance='filled']) button:hover:not(:disabled) {
      background-color: var(--vds-btn-accent-hover);
      border-color: var(--vds-btn-accent-hover);
    }

    :host([appearance='filled']) button:active:not(:disabled) {
      background-color: var(--vds-btn-accent-active);
      border-color: var(--vds-btn-accent-active);
    }

    :host([appearance='outline']) {
      --vds-btn-label-color: var(--vds-btn-accent);
    }

    :host([variant='secondary'][appearance='outline']) {
      --vds-btn-label-color: var(--vds-color-text-primary, var(--vds-color-black, #070922));
    }

    :host([appearance='outline']) button {
      background-color: transparent;
      border-color: var(--vds-btn-border-color, var(--vds-btn-accent));
      color: var(--vds-btn-label-color);
    }

    :host([appearance='outline']) button:hover:not(:disabled) {
      background-color: var(--vds-btn-muted-bg);
    }

    :host([appearance='outline']) button:active:not(:disabled) {
      background-color: var(--vds-btn-muted-bg-strong);
    }

    :host([appearance='text']) {
      --vds-btn-label-color: var(--vds-btn-accent);
    }

    :host([variant='secondary'][appearance='text']) {
      --vds-btn-label-color: var(--vds-color-text-primary, var(--vds-color-black, #070922));
    }

    :host([appearance='text']) button {
      background-color: transparent;
      border-color: transparent;
      color: var(--vds-btn-label-color);
    }

    :host([appearance='text']) button:hover:not(:disabled) {
      background-color: var(--vds-btn-muted-bg);
    }

    :host([appearance='text']) button:active:not(:disabled) {
      background-color: var(--vds-btn-muted-bg-strong);
    }

    ::slotted([slot='prefix-icon']),
    ::slotted([slot='suffix-icon']),
    ::slotted([slot='icon']) {
      display: inline-flex;
      align-items: center;
      line-height: 1;
      color: inherit;
    }

    /* Icon-only button styles - square button with equal padding */
    :host([icon-only]) button {
      padding: var(--vds-btn-padding-y);
      aspect-ratio: 1;
      min-width: var(--vds-btn-min-height);
      width: var(--vds-btn-min-height);
      gap: 0 !important;
    }

    :host([icon-only]) button span[part="label"] {
      display: none;
    }

    /* Ensure icon-only secondary buttons use correct colors */
    :host([variant='secondary'][icon-only][appearance='outline']) {
      --vds-btn-label-color: var(--vds-color-text-primary, var(--vds-color-black, #070922));
    }

    :host([variant='secondary'][icon-only][appearance='text']) {
      --vds-btn-label-color: var(--vds-color-text-primary, var(--vds-color-black, #070922));
    }
  `;

  @property({ type: String, reflect: true })
  accessor variant: ButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  accessor size: ButtonSize = 'md';

  @property({ type: String, reflect: true })
  accessor appearance: ButtonAppearance = 'filled';

  @property({ type: String, reflect: true })
  accessor shape: ButtonShape = 'rounded';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String })
  accessor type: 'button' | 'submit' | 'reset' = 'button';

  @query('button')
  accessor buttonElement!: HTMLButtonElement;

  private get defaultSlot(): HTMLSlotElement | null {
    return this.shadowRoot?.querySelector('slot:not([name])') || null;
  }

  private get isIconOnly(): boolean {
    const slot = this.defaultSlot;
    if (!slot) return false;

    const assignedNodes = slot.assignedNodes({ flatten: true });
    const hasTextContent = assignedNodes.some(
      node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    );

    // Check if there's an icon in prefix-icon, suffix-icon, or icon slots
    const hasPrefixIcon = this.querySelector('[slot="prefix-icon"]') !== null;
    const hasSuffixIcon = this.querySelector('[slot="suffix-icon"]') !== null;
    const hasIcon = this.querySelector('[slot="icon"]') !== null;

    // Icon-only if there's no text content but there is an icon
    return !hasTextContent && (hasPrefixIcon || hasSuffixIcon || hasIcon);
  }

  private handleSlotChange(): void {
    this.requestUpdate();
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    
    // Update icon-only attribute on host element
    if (this.isIconOnly) {
      this.setAttribute('icon-only', '');
    } else {
      this.removeAttribute('icon-only');
    }
  }

  private handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const detail: ButtonClickEventDetail = {
      originalEvent: event
    };

    this.dispatchEvent(
      new CustomEvent('vds-button-click', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.buttonElement.click();
    }
  }

  render() {
    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel || nothing}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        role="button"
        tabindex=${this.disabled ? -1 : 0}
      >
        <slot name="prefix-icon" part="prefix-icon" @slotchange=${this.handleSlotChange}></slot>
        <slot name="icon" part="icon" @slotchange=${this.handleSlotChange}></slot>
        <span part="label">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </span>
        <slot name="suffix-icon" part="suffix-icon" @slotchange=${this.handleSlotChange}></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-button': VDSButton;
  }
}

