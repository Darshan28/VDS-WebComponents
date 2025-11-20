import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface ModalCloseEventDetail {
  reason: 'backdrop' | 'escape' | 'close-button' | 'programmatic';
}

/**
 * VDS Modal Component
 * 
 * @element vds-modal
 * 
 * @fires vds-modal-open - Fired when the modal opens
 * @fires vds-modal-close - Fired when the modal closes
 * 
 * @csspart backdrop - The backdrop element
 * @csspart dialog - The dialog container
 * @csspart header - The header section
 * @csspart body - The body/content section
 * @csspart footer - The footer section
 * @csspart close-button - The close button
 */
@customElement('vds-modal')
export class VDSModal extends LitElement {
  static styles = css`
    :host {
      display: none;
      --vds-modal-z-index: var(--vds-z-index-modal, 1050);
      --vds-modal-backdrop-z-index: var(--vds-z-index-modal-backdrop, 1040);
      --vds-modal-bg: var(--vds-color-bg-primary, #ffffff);
      --vds-modal-backdrop-bg: var(--vds-color-bg-overlay, rgba(0, 0, 0, 0.5));
      --vds-modal-border-radius: var(--vds-radius-lg, 0.5rem);
      --vds-modal-shadow: var(--vds-shadow-2xl, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
      --vds-modal-max-width: 32rem;
      --vds-modal-max-width-sm: 24rem;
      --vds-modal-max-width-lg: 48rem;
      --vds-modal-max-width-xl: 64rem;
      --vds-modal-padding: var(--vds-spacing-lg, 1.5rem);
      --vds-modal-transition: var(--vds-transition-base, 200ms ease-in-out);
    }

    :host([open]) {
      display: block;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--vds-modal-backdrop-bg);
      z-index: var(--vds-modal-backdrop-z-index);
      display: none;
      align-items: center;
      justify-content: center;
      padding: var(--vds-spacing-md, 1rem);
      opacity: 0;
      transition: opacity var(--vds-modal-transition);
      pointer-events: none;
    }

    :host([open]) .backdrop {
      display: flex;
      opacity: 1;
      pointer-events: auto;
    }

    .dialog {
      position: relative;
      background-color: var(--vds-modal-bg);
      border-radius: var(--vds-modal-border-radius);
      box-shadow: var(--vds-modal-shadow);
      width: 100%;
      max-width: var(--vds-modal-max-width);
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      transform: scale(0.95);
      transition: transform var(--vds-modal-transition);
      overflow: hidden;
    }

    :host([open]) .dialog {
      transform: scale(1);
    }

    .dialog.size-sm {
      max-width: var(--vds-modal-max-width-sm);
    }

    .dialog.size-lg {
      max-width: var(--vds-modal-max-width-lg);
    }

    .dialog.size-xl {
      max-width: var(--vds-modal-max-width-xl);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--vds-modal-padding);
      padding-bottom: var(--vds-spacing-md, 1rem);
      border-bottom: 1px solid var(--vds-color-border-default, #e5e7eb);
    }

    .header-title {
      font-family: var(--vds-font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-size: var(--vds-font-size-xl, 1.25rem);
      font-weight: var(--vds-font-weight-semibold, 600);
      line-height: var(--vds-line-height-tight, 1.25);
      color: var(--vds-color-text-primary, #1f2937);
      margin: 0;
    }

    .close-button {
      background: none;
      border: none;
      padding: var(--vds-spacing-xs, 0.25rem);
      cursor: pointer;
      color: var(--vds-color-text-secondary, #6b7280);
      font-size: var(--vds-font-size-xl, 1.25rem);
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--vds-radius-sm, 0.25rem);
      transition: background-color var(--vds-modal-transition), color var(--vds-modal-transition);
    }

    .close-button:hover {
      background-color: var(--vds-color-gray-100, #f3f4f6);
      color: var(--vds-color-text-primary, #1f2937);
    }

    .close-button:focus-visible {
      outline: 2px solid var(--vds-color-border-focus, #0066cc);
      outline-offset: 2px;
    }

    .body {
      padding: var(--vds-modal-padding);
      overflow-y: auto;
      flex: 1;
      font-family: var(--vds-font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-size: var(--vds-font-size-md, 1rem);
      line-height: var(--vds-line-height-normal, 1.5);
      color: var(--vds-color-text-primary, #1f2937);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--vds-spacing-sm, 0.5rem);
      padding: var(--vds-modal-padding);
      padding-top: var(--vds-spacing-md, 1rem);
      border-top: 1px solid var(--vds-color-border-default, #e5e7eb);
    }

    .footer:empty {
      display: none;
    }
  `;

  @property({ type: Boolean, reflect: true })
  accessor open = false;

  @property({ type: String, reflect: true })
  accessor size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @property({ type: String })
  accessor title = '';

  @property({ type: Boolean, reflect: true })
  accessor closable = true;

  @property({ type: Boolean, reflect: true })
  accessor closeOnBackdropClick = true;

  @property({ type: Boolean, reflect: true })
  accessor closeOnEscape = true;

  @state()
  accessor previousActiveElement: HTMLElement | null = null;

  @query('.backdrop')
  accessor backdropElement!: HTMLElement;

  @query('.dialog')
  accessor dialogElement!: HTMLElement;

  @query('.close-button')
  accessor closeButtonElement!: HTMLButtonElement;

  private focusableElements: HTMLElement[] = [];
  private firstFocusableElement: HTMLElement | null = null;
  private lastFocusableElement: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscapeKey);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleEscapeKey);
    if (this.open) {
      this.restoreFocus();
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('open')) {
      // Defer show/hide to avoid update cycle warnings
      // Use requestAnimationFrame to schedule after current update completes
      requestAnimationFrame(() => {
        if (this.open) {
          this.show();
        } else {
          this.hide();
        }
      });
    }
  }

  private handleEscapeKey = (event: KeyboardEvent): void => {
    if (this.open && this.closeOnEscape && event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.close('escape');
    }
  };

  private handleBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick && event.target === this.backdropElement) {
      this.close('backdrop');
    }
  }

  private handleCloseClick(): void {
    this.close('close-button');
  }

  private getFocusableElements(): HTMLElement[] {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(this.dialogElement.querySelectorAll<HTMLElement>(selector));
  }

  private trapFocus(): void {
    this.focusableElements = this.getFocusableElements();
    this.firstFocusableElement = this.focusableElements[0] || this.closeButtonElement;
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1] || this.closeButtonElement;

    // Focus first element
    if (this.firstFocusableElement) {
      this.firstFocusableElement.focus();
    }

    // Trap focus within modal
    this.dialogElement.addEventListener('keydown', this.handleTabKey);
  }

  private handleTabKey = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') {
      return;
    }

    if (this.focusableElements.length === 0) {
      event.preventDefault();
      if (this.firstFocusableElement) {
        this.firstFocusableElement.focus();
      }
      return;
    }

    if (event.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        event.preventDefault();
        this.lastFocusableElement?.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusableElement) {
        event.preventDefault();
        this.firstFocusableElement?.focus();
      }
    }
  };

  private releaseFocus(): void {
    this.dialogElement.removeEventListener('keydown', this.handleTabKey);
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }

  private saveActiveElement(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
  }

  private restoreFocus(): void {
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  private show(): void {
    this.saveActiveElement();
    document.body.style.overflow = 'hidden';
    this.trapFocus();
    
    // Dispatch open event after a short delay to allow animation
    // Use setTimeout to ensure it's after the update cycle
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('vds-modal-open', {
          bubbles: true,
          composed: true
        })
      );
    }, 0);
  }

  private hide(): void {
    this.releaseFocus();
    document.body.style.overflow = '';
    // Defer focus restoration to avoid update cycle
    setTimeout(() => {
      this.restoreFocus();
    }, 0);
  }

  public close(reason: ModalCloseEventDetail['reason'] = 'programmatic'): void {
    if (!this.open) {
      return;
    }

    const detail: ModalCloseEventDetail = { reason };

    // Set open to false, which will trigger updated() and hide()
    this.open = false;

    // Dispatch event after a microtask to ensure it's after the update
    Promise.resolve().then(() => {
      this.dispatchEvent(
        new CustomEvent('vds-modal-close', {
          detail,
          bubbles: true,
          composed: true
        })
      );
    });
  }

  public showModal(): void {
    if (this.open) {
      return;
    }
    this.open = true;
  }

  render() {
    const dialogClasses = {
      [`size-${this.size}`]: true
    };

    return html`
      <div
        part="backdrop"
        class="backdrop"
        @click=${this.handleBackdropClick}
        role="presentation"
      >
        <div
          part="dialog"
          class="dialog ${classMap(dialogClasses)}"
          role="dialog"
          aria-modal="true"
          aria-labelledby=${this.title ? 'vds-modal-title' : nothing}
          aria-label=${this.ariaLabel || nothing}
        >
          ${this.title || this.closable
            ? html`
                <div part="header" class="header">
                  ${this.title
                    ? html`
                        <h2 part="title" class="header-title" id="vds-modal-title">
                          ${this.title}
                        </h2>
                      `
                    : html`<div></div>`}
                  ${this.closable
                    ? html`
                        <button
                          part="close-button"
                          class="close-button"
                          aria-label="Close modal"
                          @click=${this.handleCloseClick}
                        >
                          ×
                        </button>
                      `
                    : nothing}
                </div>
              `
            : nothing}
          <div part="body" class="body">
            <slot></slot>
          </div>
          <div part="footer" class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-modal': VDSModal;
  }
}

