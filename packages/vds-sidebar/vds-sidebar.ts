import { LitElement, html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import '../vds-icon/vds-icon.js';

export type SidebarVariant = 'default' | 'inverse';

/**
 * VDS Sidebar Component
 *
 * Collapsible navigation sidebar which can show only icons (collapsed)
 * or icons with labels (expanded).
 *
 * @element vds-sidebar
 *
 * @fires vds-sidebar-toggle - Fired when the sidebar collapsed state changes
 *
 * @csspart sidebar - The main sidebar container
 * @csspart header - The header area (typically shows logo)
 * @csspart toggle - The collapse/expand toggle button container
 * @csspart content - The scrollable content area containing navigation items
 *
 * @slot header - Area for logo/brand/avatar at the top of the sidebar
 * @slot default - Navigation content (usually `vds-menu-item` elements)
 * @slot footer - Optional footer area at the bottom of the sidebar
 */
@customElement('vds-sidebar')
export class VDSSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
      --vds-sidebar-width-expanded: 16rem; /* 256px */
      --vds-sidebar-width-collapsed: 3.5rem; /* 72px */
      --vds-sidebar-bg-default: var(--vds-color-bg-default, var(--vds-color-white, #ffffff));
      --vds-sidebar-bg-inverse: var(--vds-color-navy-700, #1d3465);
      --vds-sidebar-border-color-default: var(--vds-color-border-default, var(--vds-color-gray-300, #eaeef4));
      --vds-sidebar-border-color-inverse: var(--vds-color-navy-600, #2e4883);
      --vds-sidebar-text-color-default: var(--vds-color-text-primary);
      --vds-sidebar-text-color-inverse: var(--vds-color-text-inverse);
      --vds-sidebar-padding-x: var(--vds-spacing-sm);
      --vds-sidebar-padding-y: var(--vds-spacing-sm);
      --vds-sidebar-header-height: 3.5rem; /* 56px */
      --vds-sidebar-footer-height: auto;
      --vds-sidebar-gap: var(--vds-spacing-sm);
      --vds-sidebar-radius: var(--vds-radius-xl);
      --vds-sidebar-toggle-size: var(--vds-size-md); /* 2rem / 32px */
      --vds-sidebar-toggle-radius: var(--vds-radius-lg);
      --vds-sidebar-toggle-bg-hover: rgba(0, 0, 0, 0.04);
      --vds-sidebar-toggle-bg-hover-inverse: rgba(255, 255, 255, 0.12);
      --vds-sidebar-font-family: var(--vds-font-family-sans);
      color: var(--vds-sidebar-text-color-default);
    }

    .sidebar {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: var(--vds-sidebar-width-expanded);
      max-width: 100%;
      height: 100%;
      background-color: var(--vds-sidebar-bg-default);
      border-right: 1px solid var(--vds-sidebar-border-color-default);
      padding: var(--vds-sidebar-padding-y) var(--vds-sidebar-padding-x);
      border-radius: 0;
      font-family: var(--vds-sidebar-font-family);
      transition:
        width 300ms ease-in-out,
        background-color 200ms ease,
        border-color 200ms ease;
      box-shadow: var(--vds-shadow-sm);
      position: relative;
      overflow: visible; /* Allow header dropdowns to escape sidebar bounds */
    }

    :host([variant='inverse']) .sidebar {
      background-color: var(--vds-sidebar-bg-inverse);
      border-right-color: var(--vds-sidebar-border-color-inverse);
      color: var(--vds-sidebar-text-color-inverse);
    }

    :host([collapsed]) .sidebar {
      width: 3.5rem; /* 72px */
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-sidebar-gap);
      min-height: var(--vds-sidebar-header-height);
      padding-inline: 4px;
      box-sizing: border-box;
      position: relative;
      z-index: 10; /* Above sidebar body but below navigation bars */
      overflow: visible; /* Allow dropdowns to escape header bounds */
    }

    .header-main {
      display: flex;
      align-items: center;
      gap: var(--vds-sidebar-gap);
      flex: 1;
      min-width: 0;
      position: relative;
      z-index: 10;
      overflow: visible;
    }

    .header-logo {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .header-title {
      white-space: nowrap;
      overflow: visible; /* Changed from hidden to visible to allow dropdown to show */
      text-overflow: ellipsis;
      font-weight: 600;
      font-size: var(--vds-font-size-md, 0.875rem);
      position: relative;
      z-index: 10;
      flex: 1;
      min-width: 0;
      max-width: calc(100% - var(--vds-sidebar-toggle-size) - var(--vds-sidebar-gap));
      opacity: 1;
      visibility: visible;
      transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out;
    }

    /* Hide title area when fully collapsed, unless hover-expanded is active */
    :host([collapsed]) .header-title {
      opacity: 0;
      visibility: hidden;
      display: block; /* Keep display: block for smooth transition */
    }

    :host([collapsed][hover-expanded]) .header-title {
      opacity: 1;
      visibility: visible;
    }

    /* Ensure select dropdown in header appears above sidebar body */
    .header-title ::slotted(vds-select),
    .header-title vds-select {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 100%;
    }

    /* Constrain Choices.js dropdown from select in header to stay within sidebar */
    .header-title ::slotted(vds-select) .choices,
    .header-title vds-select .choices {
      position: relative !important;
      width: 100% !important;
      max-width: 100% !important;
    }

    /* Ensure Choices.js dropdown from select in header appears above everything and stays within bounds */
    .header-title ::slotted(vds-select) .choices__list--dropdown,
    .header-title vds-select .choices__list--dropdown,
    .header-title ::slotted(vds-select) ~ .choices__list--dropdown {
      z-index: var(--vds-z-index-dropdown, 1000) !important; /* Use standard dropdown z-index */
      max-width: calc(100% - var(--vds-sidebar-toggle-size) - var(--vds-sidebar-gap) - 4px) !important;
      left: 0 !important;
      right: auto !important;
    }

    /* When collapsed and hover-expanded, constrain dropdown to expanded width */
    :host([collapsed][hover-expanded]) .header-title ::slotted(vds-select) .choices__list--dropdown,
    :host([collapsed][hover-expanded]) .header-title vds-select .choices__list--dropdown {
      max-width: calc(var(--vds-sidebar-width-expanded) - var(--vds-sidebar-padding-x) * 2 - 8px) !important;
    }

    .toggle-button {
      border: none;
      background: transparent;
      padding: 0;
      width: var(--vds-sidebar-toggle-size);
      height: var(--vds-sidebar-toggle-size);
      border-radius: var(--vds-sidebar-toggle-radius);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: inherit;
      transition: background-color 150ms ease-in-out;
      flex-shrink: 0;
    }

    .toggle-button:hover {
      background-color: var(--vds-sidebar-toggle-bg-hover);
    }

    :host([variant='inverse']) .toggle-button:hover {
      background-color: var(--vds-sidebar-toggle-bg-hover-inverse);
    }

    .toggle-button:focus-visible {
      outline: 2px solid var(--vds-color-brand, #00b578);
      outline-offset: 2px;
    }

    .toggle {
      flex-shrink: 0;
      position: relative;
      z-index: 11; /* Slightly higher than header for clickability */
    }

    /* Hide toggle button in collapsed mode, but show it again on hover-expand */
    :host([collapsed]) .toggle {
      opacity: 0;
      visibility: hidden;
      display: block; /* Keep display: block for smooth transition */
      transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out;
    }

    :host([collapsed][hover-expanded]) .toggle {
      opacity: 1;
      visibility: visible;
    }

    .body {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      margin-top: var(--vds-sidebar-gap);
      position: relative;
      z-index: 1; /* Lower than header to ensure header dropdowns appear above */
    }

    .content {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding-inline: 4px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 2px;
      position: relative;
      z-index: 1; /* Ensure content stays below header */
    }

    .footer {
      margin-top: var(--vds-sidebar-gap);
      padding-inline: 4px;
      box-sizing: border-box;
    }

    /* Hover expand: when collapsed, hovering the sidebar temporarily expands width. */
    :host([collapsed][hover-expanded]) .sidebar {
      width: var(--vds-sidebar-width-expanded);
    }
  `;

  @property({ type: String, reflect: true })
  accessor variant: SidebarVariant = 'default';

  /**
   * Internal state used to temporarily expand the sidebar
   * when the user hovers over a collapsed sidebar.
   *
   * This is reflected as an attribute to allow CSS overrides,
   * but is not intended as a public API.
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'hover-expanded'
  })
  protected accessor hoverExpanded = false;

  /**
   * Controls whether the sidebar is in collapsed mode.
   * In collapsed mode only icons are visible; labels are visually hidden.
   */
  @property({ type: Boolean, reflect: true })
  accessor collapsed = false;

  /**
   * Accessible label for the collapse/expand toggle button.
   * Will switch between "Collapse sidebar" and "Expand sidebar" when not provided.
   */
  @property({ type: String, attribute: 'toggle-aria-label' })
  accessor toggleAriaLabel: string | null = null;

  @queryAssignedElements()
  private accessor defaultSlotElements!: HTMLElement[];

  @queryAssignedElements({ slot: 'footer' })
  private accessor footerSlotElements!: HTMLElement[];

  private updateMenuItemsCollapsedState(): void {
    // In collapsed mode without hover, show icons only.
    // When hover-expanded, temporarily show full content.
    const shouldCollapseItems = this.collapsed && !this.hoverExpanded;

    const updateItems = (elements: HTMLElement[]) => {
      if (!elements) return;
      elements.forEach((el) => {
        if (el.tagName === 'VDS-MENU-ITEM') {
          if (shouldCollapseItems) {
            el.setAttribute('sidebar-collapsed', '');
          } else {
            el.removeAttribute('sidebar-collapsed');
          }
        }
        // Also handle nested menu items (e.g., inside divs)
        const nestedItems = el.querySelectorAll('vds-menu-item');
        nestedItems.forEach((item) => {
          if (shouldCollapseItems) {
            item.setAttribute('sidebar-collapsed', '');
          } else {
            item.removeAttribute('sidebar-collapsed');
          }
        });
      });
    };

    updateItems(this.defaultSlotElements);
    updateItems(this.footerSlotElements);
  }

  private handleMouseEnter(): void {
    if (this.collapsed) {
      this.hoverExpanded = true;
    }
  }

  private handleMouseLeave(): void {
    if (this.collapsed) {
      this.hoverExpanded = false;
    }
  }

  private handleToggleClick(): void {
    this.collapsed = !this.collapsed;
    // Reset hover-expanded when toggling explicitly
    if (!this.collapsed) {
      this.hoverExpanded = false;
    }
    this.updateMenuItemsCollapsedState();
    this.dispatchEvent(
      new CustomEvent('vds-sidebar-toggle', {
        detail: {
          collapsed: this.collapsed
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private getToggleLabel(): string {
    if (this.toggleAriaLabel) {
      return this.toggleAriaLabel;
    }
    return this.collapsed ? 'Expand sidebar' : 'Collapse sidebar';
  }

  protected firstUpdated(): void {
    this.updateMenuItemsCollapsedState();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    if (changed.has('collapsed') || changed.has('hoverExpanded')) {
      this.updateMenuItemsCollapsedState();
    }
  }

  render() {
    return html`
      <aside
        part="sidebar"
        class="sidebar"
        role="navigation"
        aria-label="Sidebar navigation"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div part="header" class="header">
          <div class="header-main">
            <div class="header-logo">
              <slot name="header"></slot>
            </div>
            <div class="header-title">
              <slot name="title"></slot>
            </div>
          </div>
          <div part="toggle" class="toggle">
            <button
              class="toggle-button"
              type="button"
              @click=${this.handleToggleClick}
              aria-label=${this.getToggleLabel()}
              aria-expanded=${!this.collapsed}
            >
              ${this.collapsed
                ? html`<vds-icon name="chevron-right" size="sm"></vds-icon>`
                : html`<vds-icon name="chevron-left" size="sm"></vds-icon>`}
            </button>
          </div>
        </div>
        <div class="body">
          <div part="content" class="content">
            <slot></slot>
          </div>
          <div part="footer" class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-sidebar': VDSSidebar;
  }
}


