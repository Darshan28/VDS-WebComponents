import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import '../vds-tab-item/vds-tab-item.js';
import '../vds-button/vds-button.js';
import '../vds-icon/vds-icon.js';
import '../vds-menu/vds-menu.js';
import '../vds-menu-item/vds-menu-item.js';
import type { TabVariant, TabSize, TabSelectEventDetail, TabCloseEventDetail } from '../vds-tab-item/vds-tab-item.js';

export interface TabChangeEventDetail {
  value?: string;
  originalEvent: Event;
}

/**
 * VDS Tab Component
 *
 * @element vds-tab
 *
 * @fires vds-tab-change - Fired when the active tab changes
 *
 * @csspart container - The main container element
 * @csspart tabs - The tabs container
 * @csspart overflow-button - The overflow button
 * 
 * @slot overflow-icon - Icon for the overflow button (defaults to chevron-down if not provided)
 */
@customElement('vds-tab')
export class VDSTab extends LitElement {
  static styles = css`
    :host {
      display: block;
      --vds-tab-border-color: var(--vds-color-border-default, var(--vds-color-gray-300, #eaeef4));
      --vds-tab-gap: var(--vds-spacing-none, 0px);
      --vds-tab-overflow-button-size: var(--vds-font-size-sm, 0.875rem);
      --vds-tab-overflow-button-color: var(--vds-color-text-primary, #070922);
      --vds-tab-bg-filled: var(--vds-color-bg-primary, var(--vds-color-gray-300, #eaeef4));
      --vds-tab-bg-filled-inverse: var(--vds-color-navy-700, #1d3465);
      --vds-tab-radius: var(--vds-radius-md, 0.375rem);
    }

    .container {
      display: flex;
      align-items: center;
      gap: var(--vds-tab-gap);
      width: 100%;
      position: relative;
    }

    :host([variant='default']) .container {
      border-bottom: 1px solid var(--vds-tab-border-color);
    }

    :host([variant='filled']) .container {
      background-color: var(--vds-color-bg-primary, var(--vds-color-gray-300, #eaeef4));
      border-radius: var(--vds-radius-md, 0.375rem);
      padding: var(--vds-spacing-2xs, 0.09375rem);
    }

    :host([variant='filled-inverse']) .container {
      background-color: var(--vds-tab-bg-filled-inverse);
      border-radius: var(--vds-radius-md, 0.375rem);
      padding: var(--vds-spacing-2xs, 0.09375rem);
    }

    :host([variant='rounded']) .container {
      background-color: var(--vds-color-bg-primary, var(--vds-color-gray-300, #eaeef4));
      border-radius: var(--vds-radius-lg, 0.5rem);
      padding: var(--vds-spacing-xs, 0.1875rem);
    }

    :host([variant='rounded'][size='sm']) .container {
      padding: var(--vds-spacing-2xs, 0.09375rem);
      border-radius: var(--vds-radius-lg, 0.5rem);
    }

    :host([variant='rounded'][size='lg']) .container {
      padding: var(--vds-spacing-sm, 0.375rem);
      border-radius: var(--vds-radius-xl, 0.75rem);
    }

    :host([variant='rounded']) .tabs {
      gap: var(--vds-spacing-xs, 0.1875rem);
    }

    .tabs {
      display: flex;
      align-items: center;
      gap: var(--vds-tab-gap);
      flex: 1;
      min-width: 0;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .tabs::-webkit-scrollbar {
      display: none;
    }

    /* Border radius for filled variants - apply via CSS custom properties */
    :host([variant='filled']) ::slotted(vds-tab-item),
    :host([variant='filled-inverse']) ::slotted(vds-tab-item) {
      --vds-tab-radius: 0;
    }

    /* Remove gap between tabs for filled variants */
    :host([variant='filled']) .tabs,
    :host([variant='filled-inverse']) .tabs {
      gap: 0;
    }

    .overflow-wrapper {
      position: relative;
      flex-shrink: 0;
    }

    .overflow-button {
      flex-shrink: 0;
    }

    :host([variant='default']) .overflow-button {
      margin-bottom: -1px;
    }

    :host([variant='filled']) .overflow-button,
    :host([variant='filled-inverse']) .overflow-button {
      margin-left: var(--vds-spacing-xs, 0.1875rem);
    }

    .overflow-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: var(--vds-spacing-xs, 0.1875rem);
      z-index: var(--vds-z-index-dropdown, 1000);
    }
  `;

  @property({ type: String, reflect: true })
  accessor variant: TabVariant = 'default';

  @property({ type: String, reflect: true })
  accessor size: TabSize = 'md';

  @property({ type: String })
  accessor value = '';

  @property({ type: Number, attribute: 'overflow-count' })
  accessor overflowCount = 0;

  @property({ type: String, attribute: 'overflow-text' })
  accessor overflowText = '';

  @state()
  private accessor activeValue = '';

  @state()
  private accessor visibleTabIndices: number[] = [];

  @state()
  private accessor overflowTabIndices: number[] = [];

  @state()
  private accessor overflowMenuOpen = false;

  @state()
  private accessor hasCustomOverflowIconState = false;

  @query('.tabs')
  private accessor tabsContainer!: HTMLElement;

  @query('.container')
  private accessor container!: HTMLElement;

  private resizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    // Check for custom overflow icon early in the lifecycle
    this.hasCustomOverflowIconState = this.querySelector('[slot="overflow-icon"]') !== null;
    this.updateTabItems();
    this.updateActiveTab();
  }

  protected firstUpdated(): void {
    this.updateTabItems();
    this.updateActiveTab();
    this.setupResizeObserver();
    this.calculateVisibleTabs();
    // Check for custom overflow icon
    this.hasCustomOverflowIconState = this.querySelector('[slot="overflow-icon"]') !== null;
    this.updateOverflowIcon();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.calculateVisibleTabs();
      });
      if (this.container) {
        this.resizeObserver.observe(this.container);
      }
    }
  }

  protected updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('variant') || changedProperties.has('size')) {
      this.updateTabItems();
    }

    if (changedProperties.has('value')) {
      this.updateActiveTab();
      // Reapply border radius after active tab changes
      if (this.variant === 'filled' || this.variant === 'filled-inverse') {
        this.updateTabItems();
      }
    }

    if (changedProperties.has('variant') || changedProperties.has('size') || changedProperties.has('overflowCount')) {
      // Recalculate visible tabs when variant, size, or overflowCount changes
      requestAnimationFrame(() => {
        this.calculateVisibleTabs();
      });
    }

    // Check for custom overflow icon (check both overflow-icon and icon slots in case it was already moved)
    const hasIcon = this.querySelector('[slot="overflow-icon"]') !== null || 
                    this.querySelector('[slot="icon"]') !== null;
    if (hasIcon !== this.hasCustomOverflowIconState) {
      this.hasCustomOverflowIconState = hasIcon;
    }
    // Move overflow-icon slot content to button's icon slot
    this.updateOverflowIcon();
  }

  private updateOverflowIcon(): void {
    // Hide the original icon in the light DOM since we're rendering it in the button template
    const overflowIcon = this.querySelector('[slot="overflow-icon"]');
    if (overflowIcon) {
      // Hide the original icon since we're rendering a copy in the button
      (overflowIcon as HTMLElement).style.display = 'none';
    }
  }

  private updateTabItems(): void {
    const items = Array.from(this.querySelectorAll('vds-tab-item'));
    items.forEach((item, index) => {
      const tabItem = item as any;
      if (tabItem.variant !== this.variant) {
        tabItem.variant = this.variant;
      }
      if (tabItem.size !== this.size) {
        tabItem.size = this.size;
      }
      
      // Set border radius for filled variants
      if (this.variant === 'filled' || this.variant === 'filled-inverse') {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        // Calculate inner radius: container radius - padding
        // Container uses --vds-radius-md (0.375rem) with padding of --vds-spacing-2xs (0.09375rem)
        // Inner radius = 0.375rem - 0.09375rem = 0.28125rem ≈ 4.5px
        const radius = 'calc(var(--vds-radius-md, 0.375rem) - var(--vds-spacing-2xs, 0.09375rem))';
        
        // Use !important to ensure border radius is applied even when tab is active
        if (isFirst && isLast) {
          // Only one tab - all corners rounded
          item.style.setProperty('border-radius', radius, 'important');
        } else if (isFirst) {
          // First tab - left corners rounded
          item.style.setProperty('border-top-left-radius', radius, 'important');
          item.style.setProperty('border-bottom-left-radius', radius, 'important');
          item.style.setProperty('border-top-right-radius', '0', 'important');
          item.style.setProperty('border-bottom-right-radius', '0', 'important');
        } else if (isLast) {
          // Last tab - right corners rounded
          item.style.setProperty('border-top-right-radius', radius, 'important');
          item.style.setProperty('border-bottom-right-radius', radius, 'important');
          item.style.setProperty('border-top-left-radius', '0', 'important');
          item.style.setProperty('border-bottom-left-radius', '0', 'important');
        } else {
          // Middle tabs - no rounded corners
          item.style.setProperty('border-radius', '0', 'important');
        }
      } else {
        // Reset border radius for other variants
        item.style.borderRadius = '';
        item.style.borderTopLeftRadius = '';
        item.style.borderBottomLeftRadius = '';
        item.style.borderTopRightRadius = '';
        item.style.borderBottomRightRadius = '';
      }
    });
  }

  private updateActiveTab(): void {
    const items = Array.from(this.querySelectorAll('vds-tab-item'));
    const targetValue = this.value || this.activeValue;

    items.forEach((item) => {
      const tabItem = item as any;
      const isActive = tabItem.value === targetValue || (!targetValue && tabItem.active);
      tabItem.active = isActive;
      if (isActive && tabItem.value) {
        this.activeValue = tabItem.value;
      }
    });
    
    // Reapply border radius after active state changes
    if (this.variant === 'filled' || this.variant === 'filled-inverse') {
      requestAnimationFrame(() => {
        this.updateTabItems();
      });
    }
  }

  private calculateVisibleTabs(): void {
    // If overflowCount is explicitly set, use manual overflow
    if (this.overflowCount > 0) {
      const items = Array.from(this.querySelectorAll('vds-tab-item')) as HTMLElement[];
      const totalItems = items.length;
      const visibleCount = totalItems - this.overflowCount;
      
      this.visibleTabIndices = Array.from({ length: visibleCount }, (_, i) => i);
      this.overflowTabIndices = Array.from({ length: this.overflowCount }, (_, i) => visibleCount + i);
      
      // Show/hide tabs based on manual overflow
      items.forEach((item, index) => {
        if (index < visibleCount) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      return;
    }

    // Otherwise, use automatic calculation
    if (!this.container || !this.tabsContainer) {
      return;
    }

    const items = Array.from(this.querySelectorAll('vds-tab-item')) as HTMLElement[];
    if (items.length === 0) {
      this.visibleTabIndices = [];
      this.overflowTabIndices = [];
      return;
    }

    // First, make all items visible to measure them
    items.forEach(item => {
      item.style.display = '';
    });

    // Wait for layout to update
    requestAnimationFrame(() => {
      const tabsRect = this.tabsContainer.getBoundingClientRect();
      
      // Get gap between tabs (0 for filled variants, xs for others)
      const gap = this.variant === 'filled' || this.variant === 'filled-inverse' 
        ? 0 
        : parseFloat(getComputedStyle(this.tabsContainer).gap) || 0;
      
      // Approximate overflow button width (we'll measure it if it exists)
      let overflowButtonWidth = 0;
      if (this.overflowTabIndices.length > 0) {
        const overflowButton = this.shadowRoot?.querySelector('.overflow-button') as HTMLElement;
        if (overflowButton) {
          overflowButtonWidth = overflowButton.getBoundingClientRect().width + gap;
        } else {
          overflowButtonWidth = 60; // Fallback estimate
        }
      }
      
      const availableWidth = tabsRect.width - overflowButtonWidth;
      
      let totalWidth = 0;
      const visible: number[] = [];
      const overflow: number[] = [];

      // Measure each tab item
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemWidth = itemRect.width;
        const gapForThisItem = visible.length > 0 ? gap : 0; // No gap before first item
        
        if (totalWidth + gapForThisItem + itemWidth <= availableWidth) {
          totalWidth += gapForThisItem + itemWidth;
          visible.push(index);
          item.style.display = '';
        } else {
          overflow.push(index);
          item.style.display = 'none';
        }
      });

      // If we have overflow but didn't account for button width, recalculate
      if (overflow.length > 0 && overflowButtonWidth === 0) {
        const overflowButton = this.shadowRoot?.querySelector('.overflow-button') as HTMLElement;
        const actualButtonWidth = overflowButton 
          ? overflowButton.getBoundingClientRect().width + gap 
          : 60;
        
        const newAvailableWidth = tabsRect.width - actualButtonWidth;
        totalWidth = 0;
        const newVisible: number[] = [];
        const newOverflow: number[] = [];

        items.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemWidth = itemRect.width;
          const gapForThisItem = newVisible.length > 0 ? gap : 0;
          
          if (totalWidth + gapForThisItem + itemWidth <= newAvailableWidth) {
            totalWidth += gapForThisItem + itemWidth;
            newVisible.push(index);
            item.style.display = '';
          } else {
            newOverflow.push(index);
            item.style.display = 'none';
          }
        });

        this.visibleTabIndices = newVisible;
        this.overflowTabIndices = newOverflow;
      } else {
        this.visibleTabIndices = visible;
        this.overflowTabIndices = overflow;
      }
    });
  }

  private handleTabSelect(event: CustomEvent<TabSelectEventDetail>): void {
    const detail = event.detail;
    if (detail.value) {
      this.value = detail.value;
      this.activeValue = detail.value;
    }
    this.updateActiveTab();

    this.dispatchEvent(
      new CustomEvent<TabChangeEventDetail>('vds-tab-change', {
        detail: {
          value: detail.value,
          originalEvent: detail.originalEvent
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleTabClose(event: CustomEvent<TabCloseEventDetail>): void {
    const detail = event.detail;
    const item = event.target as HTMLElement;
    if (item.parentNode) {
      item.parentNode.removeChild(item);
      this.updateTabItems();
      this.calculateVisibleTabs();
    }

    this.dispatchEvent(
      new CustomEvent<TabChangeEventDetail>('vds-tab-change', {
        detail: {
          value: undefined,
          originalEvent: detail.originalEvent
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleOverflowClick(event: Event): void {
    event.stopPropagation();
    this.overflowMenuOpen = !this.overflowMenuOpen;
  }

  private handleOverflowTabSelect(event: Event): void {
    const target = event.target as HTMLElement;
    const menuItem = target.closest('vds-menu-item') as any;
    if (!menuItem) return;

    const value = menuItem.value || '';
    if (value) {
      this.value = value;
      this.activeValue = value;
    }
    this.updateActiveTab();
    this.overflowMenuOpen = false;

    this.dispatchEvent(
      new CustomEvent<TabChangeEventDetail>('vds-tab-change', {
        detail: {
          value: value,
          originalEvent: event
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleClickOutside(event: MouseEvent): void {
    if (this.overflowMenuOpen && !this.shadowRoot?.contains(event.target as Node)) {
      this.overflowMenuOpen = false;
    }
  }

  private get hasOverflow(): boolean {
    // Use manual overflowCount if set, otherwise use automatic calculation
    if (this.overflowCount > 0) {
      return this.overflowCount > 0;
    }
    return this.overflowTabIndices.length > 0;
  }

  private get overflowButtonText(): string {
    // Use overflowText if provided
    if (this.overflowText) {
      return this.overflowText;
    }
    
    // Use manual overflowCount if set, otherwise use automatic calculation
    const count = this.overflowCount > 0 ? this.overflowCount : this.overflowTabIndices.length;
    return `${count} more`;
  }

  private get hasCustomOverflowIcon(): boolean {
    return this.hasCustomOverflowIconState;
  }

  private getOverflowIconName(): string | null {
    const icon = this.querySelector('[slot="overflow-icon"]') || this.querySelector('[slot="icon"]');
    if (icon && icon instanceof HTMLElement) {
      return icon.getAttribute('name') || null;
    }
    return null;
  }

  private renderOverflowIcon() {
    // Check if user provided an icon
    if (this.hasCustomOverflowIcon) {
      const iconName = this.getOverflowIconName();
      if (iconName) {
        // Render the icon directly in the button's icon slot
        return html`<vds-icon name=${iconName} slot="icon"></vds-icon>`;
      }
      return nothing;
    }
    // Default icon (only shown when there's text)
    return html`<vds-icon name="chevron-down" slot="suffix-icon"></vds-icon>`;
  }


  render() {
    return html`
      <div class="container" part="container">
        <div class="tabs" part="tabs" role="tablist">
          <slot
            @vds-tab-item-select=${this.handleTabSelect}
            @vds-tab-item-close=${this.handleTabClose}
          ></slot>
        </div>
        ${this.hasOverflow
          ? html`
              <div class="overflow-wrapper">
                <vds-button
                  class="overflow-button"
                  part="overflow-button"
                  variant="secondary"
                  appearance="text"
                  size=${this.size}
                  icon-only=${this.hasCustomOverflowIcon}
                  @click=${this.handleOverflowClick}
                >
                  ${this.hasCustomOverflowIcon ? nothing : this.overflowButtonText}
                  ${this.renderOverflowIcon()}
                </vds-button>
                ${this.overflowMenuOpen
                  ? html`
                      <vds-menu
                        class="overflow-menu"
                        @click=${this.handleOverflowTabSelect}
                      >
                        ${this.overflowTabIndices.map((index) => {
                          const items = Array.from(this.querySelectorAll('vds-tab-item'));
                          const item = items[index] as any;
                          if (!item) return nothing;
                          
                          const isActive = item.value === this.value || item.active;
                          // Get text content from the tab item
                          const textContent = item.textContent?.trim() || '';
                          // Get icon if present
                          const iconSlot = item.querySelector('[slot="prefix-icon"]');
                          const iconName = iconSlot?.getAttribute('name') || '';
                          
                          return html`
                            <vds-menu-item
                              ?selected=${isActive}
                              value=${item.value || ''}
                            >
                              ${iconName ? html`<vds-icon name=${iconName} slot="prefix-icon"></vds-icon>` : nothing}
                              ${textContent}
                            </vds-menu-item>
                          `;
                        })}
                      </vds-menu>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-tab': VDSTab;
  }
}

