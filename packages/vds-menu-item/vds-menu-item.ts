import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type MenuItemState = 'normal' | 'hover' | 'active' | 'disabled';

/**
 * VDS Menu Item Component
 * 
 * @element vds-menu-item
 * 
 * @csspart menu-item - The menu item container element
 * @csspart prefix - The prefix content slot container
 * @csspart content - The main content/text slot container
 * @csspart suffix - The suffix content slot container
 */
@customElement('vds-menu-item')
export class VDSMenuItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      --vds-menu-item-bg: var(--vds-color-white, #ffffff);
      --vds-menu-item-bg-hover: var(--vds-color-gray-200, #f8f9fb);
      --vds-menu-item-bg-active: var(--vds-color-gray-200, #f8f9fb);
      --vds-menu-item-padding: var(--vds-spacing-sm, 0.5rem);
      --vds-menu-item-gap: var(--vds-spacing-sm, 0.5rem);
      --vds-menu-item-radius: var(--vds-radius-md, 0.375rem);
      --vds-menu-item-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-menu-item-font-weight: var(--vds-font-weight-normal, 400);
      --vds-menu-item-font-size: var(--vds-font-size-md, 0.75rem);
      --vds-menu-item-text-color: var(--vds-color-black, var(--vds-color-text-primary, #070922));
      --vds-menu-item-text-color-disabled: var(--vds-color-text-disabled, #cdced3);
      --vds-menu-item-toggle-width: 22px;
      --vds-menu-item-toggle-height: 12px;
      --vds-menu-item-toggle-bg: var(--vds-color-brand, #00b578);
      --vds-menu-item-toggle-radius: var(--vds-radius-full, 9999px);
      --vds-menu-item-toggle-thumb-size: 8px;
      --vds-menu-item-icon-size: var(--vds-menu-item-font-size);
      --vds-menu-item-icon-color: var(--vds-color-text-primary, #070922);
      --vds-menu-item-icon-color-disabled: var(--vds-color-text-disabled, #cdced3);
      --vds-menu-item-icon-color-selected: var(--vds-color-brand, #00b578);
    }

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-menu-item-gap);
      padding: var(--vds-menu-item-padding);
      border-radius: var(--vds-menu-item-radius);
      background-color: var(--vds-menu-item-bg);
      cursor: pointer;
      transition: background-color 200ms ease-in-out;
      box-sizing: border-box;
    }

    :host([disabled]) .menu-item {
      cursor: not-allowed;
      opacity: 0.6;
    }

    :host([state='hover']:not([disabled])) .menu-item {
      background-color: var(--vds-menu-item-bg-hover);
    }

    :host([state='active']:not([disabled])) .menu-item {
      background-color: var(--vds-menu-item-bg-active);
    }

    .menu-item-content {
      display: flex;
      align-items: center;
      gap: var(--vds-menu-item-gap);
      flex: 1 0 0;
      min-width: 0;
    }

    .menu-item-text {
      font-family: var(--vds-menu-item-font-family);
      font-weight: var(--vds-menu-item-font-weight);
      font-size: var(--vds-menu-item-font-size);
      color: var(--vds-menu-item-text-color);
      white-space: nowrap;
      flex: 1;
      min-width: 0;
    }

    :host([disabled]) .menu-item-text {
      color: var(--vds-menu-item-text-color-disabled);
    }

    .menu-item-prefix {
      display: flex;
      align-items: center;
      gap: var(--vds-menu-item-gap);
      flex-shrink: 0;
    }

    .menu-item-suffix {
      display: flex;
      align-items: center;
      gap: var(--vds-menu-item-gap);
      flex-shrink: 0;
    }

    /* Sidebar-collapsed mode: show only icon (no label or suffix content),
       but keep prefix alignment stable to avoid icon jumping horizontally. */
    .menu-item-text {
      transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out;
    }

    .menu-item-suffix {
      transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out;
    }

    :host([sidebar-collapsed]) .menu-item-text {
      opacity: 0;
      visibility: hidden;
      display: block; /* Keep display: block for smooth transition */
    }

    :host([sidebar-collapsed]) .menu-item-suffix {
      opacity: 0;
      visibility: hidden;
      display: flex; /* Keep display: flex for smooth transition */
    }

    /* Remove gap in prefix when collapsed to eliminate extra spacing next to icon */
    :host([sidebar-collapsed]) .menu-item-prefix {
      gap: 0;
      transition: gap 300ms ease-in-out;
    }

    /* Checkbox styles */
    ::slotted(vds-checkbox) {
      flex-shrink: 0;
    }

    /* Toggle switch styles */
    .toggle {
      width: var(--vds-menu-item-toggle-width);
      height: var(--vds-menu-item-toggle-height);
      background-color: var(--vds-color-gray-300, #eaeef4);
      border-radius: var(--vds-menu-item-toggle-radius);
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      transition: background-color 200ms ease-in-out, justify-content 200ms ease-in-out;
      box-sizing: border-box;
      position: relative;
      flex-shrink: 0;
    }

    :host([toggle-checked]) .toggle {
      background-color: var(--vds-menu-item-toggle-bg);
      justify-content: flex-end;
    }

    :host([disabled]) .toggle {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .toggle-thumb {
      width: var(--vds-menu-item-toggle-thumb-size);
      height: var(--vds-menu-item-toggle-thumb-size);
      background-color: var(--vds-color-white, #ffffff);
      border-radius: var(--vds-radius-full, 9999px);
      flex-shrink: 0;
    }

    .toggle-checkmark {
      position: absolute;
      left: 4px;
      width: 6px;
      height: 6px;
      color: var(--vds-color-white, #ffffff);
      display: none;
    }

    :host([toggle-checked]) .toggle-checkmark {
      display: block;
    }

    /* Selected icon styles */
    .selected-icon {
      font-size: var(--vds-menu-item-icon-size);
      color: var(--vds-menu-item-icon-color-selected);
      flex-shrink: 0;
      display: inline-flex;
    }

    /* Icon slot styles */
    ::slotted([slot='prefix-icon']),
    ::slotted([slot='suffix-icon']) {
      font-size: var(--vds-menu-item-icon-size);
      color: var(--vds-menu-item-icon-color);
      flex-shrink: 0;
    }

    :host([disabled]) ::slotted([slot='prefix-icon']),
    :host([disabled]) ::slotted([slot='suffix-icon']) {
      color: var(--vds-menu-item-icon-color-disabled);
      opacity: 0.5;
    }

    /* Avatar slot styles */
    ::slotted([slot='prefix-avatar']) {
      flex-shrink: 0;
    }

    :host([disabled]) ::slotted([slot='prefix-avatar']) {
      opacity: 0.5;
    }
  `;

  @property({ type: String, reflect: true })
  accessor state: MenuItemState = 'normal';

  @property({ type: Boolean, reflect: true })
  accessor checked: boolean | undefined;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor toggle = false;

  @property({ type: Boolean, reflect: true, attribute: 'toggle-checked' })
  accessor toggleChecked = false;

  @property({ type: Boolean, reflect: true })
  accessor selected = false;

  @property({ type: String })
  accessor value = '';

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    
    // Update state based on selected and disabled properties
    if (this.disabled) {
      this.state = 'disabled';
    } else if (this.selected) {
      this.state = 'active';
    } else if (this.state === 'disabled' && !this.disabled) {
      this.state = 'normal';
    } else if (this.state === 'active' && !this.selected) {
      this.state = 'normal';
    }
  }

  private handleCheckboxChange(event: CustomEvent): void {
    if (this.checked !== undefined) {
      this.checked = event.detail.checked;
      this.dispatchEvent(
        new CustomEvent('vds-menu-item-checkbox-change', {
          detail: { checked: this.checked },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private handleClick(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const target = event.target as HTMLElement;

    // Toggle switch if clicked directly on toggle
    if (target.closest('.toggle')) {
      if (this.toggle) {
        this.toggleChecked = !this.toggleChecked;
        this.dispatchEvent(
          new CustomEvent('vds-menu-item-toggle-change', {
            detail: { checked: this.toggleChecked },
            bubbles: true,
            composed: true
          })
        );
      }
      event.stopPropagation();
      return;
    }

    // Dispatch select event when menu item is clicked
    this.dispatchEvent(
      new CustomEvent('vds-menu-item-select', {
        detail: { 
          value: this.value || '',
          originalEvent: event 
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleMouseEnter(): void {
    if (!this.disabled && !this.selected && this.state === 'normal') {
      this.state = 'hover';
    }
  }

  private handleMouseLeave(): void {
    if (this.state === 'hover' && !this.selected && !this.disabled) {
      this.state = 'normal';
    }
  }

  render() {
    return html`
      <div
        part="menu-item"
        class="menu-item"
        @click=${this.handleClick}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div part="prefix" class="menu-item-prefix">
          <slot name="prefix-checkbox">
            ${this.checked !== undefined
              ? html`
                  <vds-checkbox
                    size="small"
                    .checked=${this.checked}
                    .disabled=${this.disabled}
                    @vds-checkbox-change=${this.handleCheckboxChange}
                  ></vds-checkbox>
                `
              : nothing}
          </slot>
          <slot name="prefix-avatar"></slot>
          <slot name="prefix-icon"></slot>
        </div>
        <div part="content" class="menu-item-content">
          <span part="text" class="menu-item-text">
            <slot></slot>
          </span>
        </div>
        <div part="suffix" class="menu-item-suffix">
          ${this.toggle
            ? html`
                <div class="toggle">
                  <svg class="toggle-checkmark" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="toggle-thumb"></div>
                </div>
              `
            : nothing}
          <slot name="suffix-icon"></slot>
          ${this.selected
            ? html`
                <vds-icon class="selected-icon" name="check" aria-hidden="true"></vds-icon>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-menu-item': VDSMenuItem;
  }
}

