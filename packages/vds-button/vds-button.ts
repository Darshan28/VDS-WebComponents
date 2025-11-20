import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

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
 * @csspart icon - The icon slot container
 */
@customElement('vds-button')
export class VDSButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      --vds-btn-padding-x-sm: var(--vds-spacing-sm, 0.5rem);
      --vds-btn-padding-y-sm: var(--vds-spacing-xs, 0.25rem);
      --vds-btn-padding-x-md: var(--vds-spacing-md, 1rem);
      --vds-btn-padding-y-md: var(--vds-spacing-sm, 0.5rem);
      --vds-btn-padding-x-lg: var(--vds-spacing-lg, 1.5rem);
      --vds-btn-padding-y-lg: var(--vds-spacing-md, 1rem);
      
      --vds-btn-font-size-sm: var(--vds-font-size-sm, 0.875rem);
      --vds-btn-font-size-md: var(--vds-font-size-md, 1rem);
      --vds-btn-font-size-lg: var(--vds-font-size-lg, 1.125rem);
      
      --vds-btn-bg-primary: var(--vds-color-primary, #0066cc);
      --vds-btn-bg-primary-hover: var(--vds-color-primary-hover, #0052a3);
      --vds-btn-bg-secondary: var(--vds-color-secondary, #6c757d);
      --vds-btn-bg-secondary-hover: var(--vds-color-secondary-hover, #5a6268);
      --vds-btn-bg-success: var(--vds-color-success, #28a745);
      --vds-btn-bg-success-hover: var(--vds-color-success-hover, #218838);
      --vds-btn-bg-danger: var(--vds-color-danger, #dc3545);
      --vds-btn-bg-danger-hover: var(--vds-color-danger-hover, #c82333);
      --vds-btn-bg-warning: var(--vds-color-warning, #ffc107);
      --vds-btn-bg-warning-hover: var(--vds-color-warning-hover, #e0a800);
      --vds-btn-bg-info: var(--vds-color-info, #17a2b8);
      --vds-btn-bg-info-hover: var(--vds-color-info-hover, #138496);
      
      --vds-btn-color-primary: var(--vds-color-white, #ffffff);
      --vds-btn-color-secondary: var(--vds-color-white, #ffffff);
      --vds-btn-color-success: var(--vds-color-white, #ffffff);
      --vds-btn-color-danger: var(--vds-color-white, #ffffff);
      --vds-btn-color-warning: var(--vds-color-text-primary, #1f2937);
      --vds-btn-color-info: var(--vds-color-white, #ffffff);
      
      --vds-btn-border-radius: var(--vds-radius-md, 0.375rem);
      --vds-btn-transition: var(--vds-transition-base, 200ms ease-in-out);
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--vds-spacing-xs, 0.25rem);
      font-family: var(--vds-font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-weight: var(--vds-font-weight-medium, 500);
      line-height: var(--vds-line-height-normal, 1.5);
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      border: 1px solid transparent;
      border-radius: var(--vds-btn-border-radius);
      transition: all var(--vds-btn-transition);
      white-space: nowrap;
      box-sizing: border-box;
    }

    button:focus-visible {
      outline: 2px solid var(--vds-color-border-focus, #0066cc);
      outline-offset: 2px;
    }

    button:disabled,
    button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Size Variants */
    button.size-sm {
      padding: var(--vds-btn-padding-y-sm) var(--vds-btn-padding-x-sm);
      font-size: var(--vds-btn-font-size-sm);
    }

    button.size-md {
      padding: var(--vds-btn-padding-y-md) var(--vds-btn-padding-x-md);
      font-size: var(--vds-btn-font-size-md);
    }

    button.size-lg {
      padding: var(--vds-btn-padding-y-lg) var(--vds-btn-padding-x-lg);
      font-size: var(--vds-btn-font-size-lg);
    }

    /* Variant Styles */
    button.variant-primary {
      background-color: var(--vds-btn-bg-primary);
      color: var(--vds-btn-color-primary);
      border-color: var(--vds-btn-bg-primary);
    }

    button.variant-primary:hover:not(:disabled) {
      background-color: var(--vds-btn-bg-primary-hover);
      border-color: var(--vds-btn-bg-primary-hover);
    }

    button.variant-secondary {
      background-color: var(--vds-btn-bg-secondary);
      color: var(--vds-btn-color-secondary);
      border-color: var(--vds-btn-bg-secondary);
    }

    button.variant-secondary:hover:not(:disabled) {
      background-color: var(--vds-btn-bg-secondary-hover);
      border-color: var(--vds-btn-bg-secondary-hover);
    }

    button.variant-success {
      background-color: var(--vds-btn-bg-success);
      color: var(--vds-btn-color-success);
      border-color: var(--vds-btn-bg-success);
    }

    button.variant-success:hover:not(:disabled) {
      background-color: var(--vds-btn-bg-success-hover);
      border-color: var(--vds-btn-bg-success-hover);
    }

    button.variant-danger {
      background-color: var(--vds-btn-bg-danger);
      color: var(--vds-btn-color-danger);
      border-color: var(--vds-btn-bg-danger);
    }

    button.variant-danger:hover:not(:disabled) {
      background-color: var(--vds-btn-bg-danger-hover);
      border-color: var(--vds-btn-bg-danger-hover);
    }

    button.variant-warning {
      background-color: var(--vds-btn-bg-warning);
      color: var(--vds-btn-color-warning);
      border-color: var(--vds-btn-bg-warning);
    }

    button.variant-warning:hover:not(:disabled) {
      background-color: var(--vds-btn-bg-warning-hover);
      border-color: var(--vds-btn-bg-warning-hover);
    }

    button.variant-info {
      background-color: var(--vds-btn-bg-info);
      color: var(--vds-btn-color-info);
      border-color: var(--vds-btn-bg-info);
    }

    button.variant-info:hover:not(:disabled) {
      background-color: var(--vds-btn-bg-info-hover);
      border-color: var(--vds-btn-bg-info-hover);
    }

    button.variant-outline {
      background-color: transparent;
      color: var(--vds-btn-bg-primary);
      border-color: var(--vds-btn-bg-primary);
    }

    button.variant-outline:hover:not(:disabled) {
      background-color: var(--vds-btn-bg-primary);
      color: var(--vds-btn-color-primary);
    }

    button.variant-ghost {
      background-color: transparent;
      color: var(--vds-btn-bg-primary);
      border-color: transparent;
    }

    button.variant-ghost:hover:not(:disabled) {
      background-color: var(--vds-color-gray-100, #f3f4f6);
    }

    /* Icon Slot */
    ::slotted([slot="icon"]) {
      display: inline-flex;
      align-items: center;
    }
  `;

  @property({ type: String, reflect: true })
  accessor variant: ButtonVariant = 'primary';

  @property({ type: String, reflect: true })
  accessor size: ButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String })
  accessor type: 'button' | 'submit' | 'reset' = 'button';

  @query('button')
  accessor buttonElement!: HTMLButtonElement;

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
    const classes = {
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true
    };

    return html`
      <button
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        class=${classMap(classes)}
        aria-label=${this.ariaLabel || nothing}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        role="button"
        tabindex=${this.disabled ? -1 : 0}
      >
        <slot name="icon" part="icon"></slot>
        <span part="label">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-button': VDSButton;
  }
}

