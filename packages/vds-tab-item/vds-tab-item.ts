import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '../vds-icon/vds-icon.js';
import '../vds-button/vds-button.js';
import '../vds-button/vds-button.js';

export type TabVariant = 'default' | 'filled' | 'filled-inverse' | 'rounded';
export type TabSize = 'sm' | 'md' | 'lg';

export interface TabSelectEventDetail {
  value?: string;
  originalEvent: Event;
}

export interface TabCloseEventDetail {
  value?: string;
  originalEvent: Event;
}

const SLOT_OPTIONS = { flatten: true };

@customElement('vds-tab-item')
export class VDSTabItem extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      --vds-tab-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-tab-font-weight: var(--vds-font-weight-normal, 400);
      --vds-tab-font-size: var(--vds-font-size-md, 0.75rem);
      --vds-tab-gap: var(--vds-spacing-xs, 0.1875rem);
      --vds-tab-padding-x: var(--vds-spacing-md, 0.75rem);
      --vds-tab-padding-y: var(--vds-spacing-sm, 0.375rem);
      --vds-tab-radius: var(--vds-radius-md, 0.375rem);
      --vds-tab-text-color: var(--vds-color-text-secondary, #485775);
      --vds-tab-text-color-active: var(--vds-color-text-primary, #070922);
      --vds-tab-text-color-disabled: var(--vds-color-text-disabled, #cdced3);
      --vds-tab-bg: transparent;
      --vds-tab-bg-hover: var(--vds-color-gray-200, #f8f9fb);
      --vds-tab-bg-active: transparent;
      --vds-tab-indicator-height: 1.5px;
      --vds-tab-badge-bg: var(--vds-color-gray-200, #f8f9fb);
      --vds-tab-badge-color: var(--vds-color-text-secondary, #485775);
      --vds-tab-badge-radius: var(--vds-radius-sm, 0.1875rem);
      --vds-tab-close-color: var(--vds-color-text-secondary, #485775);
      --vds-tab-close-color-hover: var(--vds-color-text-primary, #070922);
      --vds-tab-close-bg: transparent;
      --vds-tab-min-height: 24px;
    }

    :host([size='sm']) {
      --vds-tab-font-size: var(--vds-font-size-sm, 0.656rem);
      --vds-tab-padding-x: var(--vds-spacing-sm, 0.375rem);
      --vds-tab-padding-y: var(--vds-spacing-xs, 0.1875rem);
      --vds-tab-indicator-height: 1.5px;
      --vds-tab-min-height: 20px;
    }

    :host([size='lg']) {
      --vds-tab-font-size: var(--vds-font-size-lg, 0.84375rem);
      --vds-tab-padding-x: var(--vds-spacing-lg, 1.125rem);
      --vds-tab-padding-y: var(--vds-spacing-md, 0.75rem);
      --vds-tab-indicator-height: 3px;
      --vds-tab-min-height: 32px;
      --vds-tab-font-weight: var(--vds-font-weight-semibold, 600);
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: 0.7;
      cursor: not-allowed;
    }

    .container {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-tab-gap);
      font-family: var(--vds-tab-font-family);
      font-size: var(--vds-tab-font-size);
      font-weight: var(--vds-tab-font-weight);
      color: var(--vds-tab-text-color);
      background-color: var(--vds-tab-bg);
      border-radius: var(--vds-tab-radius);
      padding: var(--vds-tab-padding-y) var(--vds-tab-padding-x);
      cursor: pointer;
      position: relative;
      line-height: normal;
      min-height: var(--vds-tab-min-height);
      box-sizing: border-box;
      transition: background-color 150ms ease, color 150ms ease;
      outline: none;
      overflow: hidden;
      max-width: 100%;
      /* Min width: 4 characters of text + padding */
      min-width: calc(var(--vds-tab-padding-x) * 2 + 4ch);
    }
    
    /* When closable, add button space to min-width */
    :host([closable]) .container {
      min-width: calc(var(--vds-tab-padding-x) * 2 + 4ch + var(--vds-btn-min-height, 20px) + var(--vds-spacing-xs, 4px));
    }

    .container:focus-visible {
      box-shadow: 0 0 0 2px var(--vds-color-blue-200, rgba(67, 102, 255, 0.3));
    }

    :host(:not([disabled]):not([active]):hover) .container {
      background-color: var(--vds-tab-bg-hover);
    }

    :host([active]) .container {
      color: var(--vds-tab-text-color-active);
      background-color: var(--vds-tab-bg-active);
    }

    /* Active tabs should retain their background color on hover */
    :host([active]:hover) .container {
      background-color: var(--vds-tab-bg-active);
    }

    :host([disabled]) .container {
      color: var(--vds-tab-text-color-disabled);
    }

    .content {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-tab-gap);
      min-width: 0;
      flex: 1;
      overflow: hidden;
    }

    .prefix[hidden],
    .badge[hidden] {
      display: none;
    }

    .label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      color: inherit;
      min-width: 0;
      flex: 1 1 0%;
      max-width: 100%;
    }
    
    /* When closable tab is hovered, reduce label max-width to account for close button */
    :host([closable]:hover) .label {
      max-width: calc(100% - var(--vds-btn-min-height, 20px) - var(--vds-spacing-xs, 4px));
    }

    .badge {
      padding: var(--vds-spacing-2xs, 0.09375rem) var(--vds-spacing-xs, 0.1875rem);
      background-color: var(--vds-tab-badge-bg);
      color: var(--vds-tab-badge-color);
      border-radius: var(--vds-tab-badge-radius);
      font-size: var(--vds-font-size-xs, 0.5625rem);
      font-weight: var(--vds-font-weight-normal, 400);
      line-height: normal;
    }

    .close-button {
      display: none;
      position: absolute;
      right: var(--vds-tab-padding-x, 8px);
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      flex-shrink: 0;
    }
    
    /* Show close button on hover or when tab is active */
    :host(:hover) .close-button,
    :host([active]) .close-button {
      display: inline-block;
    }
    
    /* Style vds-button - use inverse variant's built-in styling */
    .close-button {
      /* Inverse variant will handle hover colors automatically */
    }
    
    /* Set close button icon color to match tab text color for better visibility */
    .close-button vds-icon {
      --vds-icon-color: var(--vds-tab-text-color, var(--vds-color-text-secondary, #485775));
      color: var(--vds-icon-color);
    }
    
    /* Override button's label color to match icon - important for active tabs */
    .close-button {
      --vds-btn-label-color: var(--vds-tab-text-color, var(--vds-color-text-secondary, #485775));
    }
    
    /* Active tabs - use active text color for close button */
    :host([active]) .close-button {
      --vds-btn-label-color: var(--vds-tab-text-color-active, var(--vds-color-text-primary, #070922)) !important;
      --vds-btn-accent: var(--vds-tab-text-color-active, var(--vds-color-text-primary, #070922)) !important;
    }
    
    :host([active]) .close-button[icon-only]::part(button) {
      background-color: var(--vds-tab-bg-active, transparent) !important;
      color: var(--vds-tab-text-color-active, var(--vds-color-text-primary, #070922)) !important;
    }
    
    :host([active]) .close-button vds-icon {
      --vds-icon-color: var(--vds-tab-text-color-active, var(--vds-color-text-primary, #070922)) !important;
      color: var(--vds-icon-color) !important;
    }
    
    /* For filled-inverse variant - use white/light color */
    :host([variant='filled-inverse']) .close-button {
      --vds-btn-label-color: var(--vds-tab-close-color, rgba(255, 255, 255, 0.9)) !important;
      --vds-btn-accent: var(--vds-tab-close-color, rgba(255, 255, 255, 0.9)) !important;
    }
    
    :host([variant='filled-inverse']) .close-button vds-icon {
      --vds-icon-color: var(--vds-tab-close-color, rgba(255, 255, 255, 0.9)) !important;
      color: var(--vds-icon-color) !important;
    }
    
    /* Active filled-inverse tabs have white background, so use dark color for contrast */
    :host([variant='filled-inverse'][active]) .close-button {
      --vds-btn-label-color: var(--vds-tab-text-color-active, var(--vds-color-text-primary, #070922)) !important;
      --vds-btn-accent: var(--vds-tab-text-color-active, var(--vds-color-text-primary, #070922)) !important;
    }
    
    /* Ensure button background matches tab's active background */
    :host([variant='filled-inverse'][active]) .close-button[icon-only]::part(button) {
      background-color: var(--vds-tab-bg-active, var(--vds-color-white, #ffffff)) !important;
      color: var(--vds-tab-text-color-active, var(--vds-color-text-primary, #070922)) !important;
    }
    
    :host([variant='filled-inverse'][active]) .close-button vds-icon {
      --vds-icon-color: var(--vds-tab-text-color-active, var(--vds-color-text-primary, #070922)) !important;
      color: var(--vds-icon-color) !important;
    }
    
    
    /* Hover state for close button icon */
    :host(:hover) .close-button vds-icon {
      --vds-icon-color: var(--vds-tab-close-color-hover, var(--vds-color-text-primary, #070922));
      color: var(--vds-icon-color) !important;
    }
    
    :host([variant='filled-inverse']:hover) .close-button vds-icon {
      --vds-icon-color: var(--vds-tab-close-color-hover, var(--vds-color-white, #ffffff));
      color: var(--vds-icon-color) !important;
    }

    .indicator {
      position: absolute;
      left: var(--vds-spacing-none, 0px);
      right: var(--vds-spacing-none, 0px);
      bottom: 0;
      height: var(--vds-tab-indicator-height);
      background-color: transparent;
      border-radius: var(--vds-radius-full, 9999px);
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 150ms ease, background-color 150ms ease;
      pointer-events: none;
    }

    :host([variant='default'][active]) .indicator {
      background-color: var(--vds-color-border-success, #00b578);
      transform: scaleX(1);
    }

    :host(:not([variant='default'])) .indicator {
      display: none;
    }

    :host([variant='default']) {
      --vds-tab-bg-active: transparent;
    }

    /* Filled variant - normal state (inactive tabs) */
    :host([variant='filled']) {
      --vds-tab-bg: transparent;
      --vds-tab-bg-hover: rgba(0, 0, 0, 0.05);
    }

    /* Filled variant - active state */
    :host([variant='filled'][active]) {
      --vds-tab-bg: var(--vds-color-white, #ffffff);
      --vds-tab-bg-active: var(--vds-color-white, #ffffff);
      --vds-tab-text-color: var(--vds-tab-text-color-active);
    }

    /* When inside vds-tab, remove default border radius for filled variants */
    :host([variant='filled']) {
      --vds-tab-radius: 0;
    }

    :host([variant='filled-inverse']) {
      --vds-tab-radius: 0;
    }

    :host([variant='filled-inverse']) {
      --vds-tab-bg: transparent;
      --vds-tab-bg-hover: var(--vds-color-navy-500, #2d4379);
      --vds-tab-bg-active: var(--vds-color-white, #ffffff);
      --vds-tab-text-color: var(--vds-color-white, #ffffff);
      --vds-tab-text-color-active: var(--vds-color-text-primary, #070922);
      --vds-tab-badge-bg: var(--vds-color-white, #ffffff);
      --vds-tab-badge-color: var(--vds-color-text-tertiary, #898f9a);
      --vds-tab-close-color: rgba(255, 255, 255, 0.9);
      --vds-tab-close-color-hover: var(--vds-color-white, #ffffff);
    }

    :host([variant='filled-inverse']) .badge {
      opacity: 0.9;
    }

    :host([variant='rounded']) {
      --vds-tab-radius: var(--vds-radius-md, 0.375rem);
    }

    :host([variant='rounded'][size='sm']) {
      --vds-tab-radius: 0.28125rem; /* 4.5px - matches Figma design */
    }

    :host([variant='rounded'][size='md']) {
      --vds-tab-radius: 0.375rem; /* 6px - matches Figma design */
    }

    :host([variant='rounded'][size='lg']) {
      --vds-tab-radius: 0.5625rem; /* 9px - matches Figma design */
    }

    :host([variant='rounded'][active]) {
      --vds-tab-bg: var(--vds-color-bg-default, var(--vds-color-white, #ffffff));
      --vds-tab-bg-active: var(--vds-color-bg-default, var(--vds-color-white, #ffffff));
    }

    /* Rounded variant active tabs should retain background on hover */
    :host([variant='rounded'][active]:hover) {
      --vds-tab-bg: var(--vds-color-bg-default, var(--vds-color-white, #ffffff));
      --vds-tab-bg-active: var(--vds-color-bg-default, var(--vds-color-white, #ffffff));
    }

    :host([variant='rounded']:not([disabled]):not([active]):hover) {
      --vds-tab-bg: transparent;
    }
  `;

  @property({ type: String, reflect: true })
  accessor variant: TabVariant = 'default';

  @property({ type: String, reflect: true })
  accessor size: TabSize = 'md';

  @property({ type: Boolean, reflect: true })
  accessor active = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor closable = false;

  @property({ type: String })
  accessor badge = '';

  @property({ type: String })
  accessor value = '';

  @property({ type: String, attribute: 'close-label' })
  accessor closeLabel = 'Close tab';

  @property({ type: String, attribute: 'aria-controls' })
  accessor ariaControls = '';

  @state()
  private accessor hasPrefixIcon = false;

  @state()
  private accessor hasBadgeSlot = false;

  @query('slot[name="prefix-icon"]')
  accessor prefixSlot!: HTMLSlotElement;

  @query('slot[name="badge"]')
  accessor badgeSlot!: HTMLSlotElement;

  protected firstUpdated(): void {
    this.updateSlotState();
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    
    // Ensure styles are recalculated when active state changes
    if (changedProperties.has('active')) {
      // Force a reflow to ensure CSS custom properties are applied
      void this.offsetHeight;
    }
  }

  private updateSlotState(): void {
    this.hasPrefixIcon = this.slotHasContent(this.prefixSlot);
    this.hasBadgeSlot = this.slotHasContent(this.badgeSlot);
  }

  private slotHasContent(slot?: HTMLSlotElement | null): boolean {
    if (!slot) return false;
    const nodes = slot.assignedNodes(SLOT_OPTIONS);
    return nodes.some(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      return node.textContent?.trim();
    });
  }

  private get hasBadgeContent(): boolean {
    return Boolean(this.badge?.length) || this.hasBadgeSlot;
  }

  private get computedTabIndex(): number {
    if (this.disabled) return -1;
    return this.active ? 0 : -1;
  }

  private handleSelect(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.emitSelect(event);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.emitSelect(event);
    }
  }

  private handleClose(event: CustomEvent): void {
    event.stopPropagation();
    const originalEvent = event.detail?.originalEvent || event;
    this.dispatchEvent(
      new CustomEvent<TabCloseEventDetail>('vds-tab-item-close', {
        detail: {
          value: this.value || undefined,
          originalEvent: originalEvent
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private emitSelect(originalEvent: Event): void {
    this.dispatchEvent(
      new CustomEvent<TabSelectEventDetail>('vds-tab-item-select', {
        detail: {
          value: this.value || undefined,
          originalEvent
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleBadgeSlotChange(): void {
    this.hasBadgeSlot = this.slotHasContent(this.badgeSlot);
  }

  private handlePrefixSlotChange(): void {
    this.hasPrefixIcon = this.slotHasContent(this.prefixSlot);
  }

  render() {
    return html`
      <div
        class="container"
        part="container"
        role="tab"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-selected=${this.active ? 'true' : 'false'}
        aria-controls=${this.ariaControls || nothing}
        tabindex=${this.computedTabIndex}
        @click=${this.handleSelect}
        @keydown=${this.handleKeyDown}
      >
        <div class="content" part="content">
          <span class="prefix" part="prefix" ?hidden=${!this.hasPrefixIcon}>
            <slot name="prefix-icon" @slotchange=${this.handlePrefixSlotChange}></slot>
          </span>
          <span class="label" part="label">
            <slot></slot>
          </span>
          ${this.badge
            ? html`
                <span class="badge" part="badge">${this.badge}</span>
              `
            : html`
                <span class="badge" part="badge" ?hidden=${!this.hasBadgeContent}>
                  <slot name="badge" @slotchange=${this.handleBadgeSlotChange}></slot>
                </span>
              `}
          ${this.closable
            ? html`
                <vds-button
                  class="close-button"
                  part="close-button"
                  icon-only
                  size="sm"
                  variant="inverse"
                  appearance="text"
                  aria-label=${this.closeLabel}
                  @vds-button-click=${this.handleClose}
                >
                  <vds-icon slot="icon" name="xmark" aria-hidden="true"></vds-icon>
                </vds-button>
              `
            : nothing}
        </div>
        <span class="indicator" part="indicator"></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-tab-item': VDSTabItem;
  }
}

