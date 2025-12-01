import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../vds-icon/vds-icon.js';
import '../vds-avatar/vds-avatar.js';
import '../vds-button/vds-button.js';

export type NavbarVariant = 'default' | 'inverse';

/**
 * VDS Navbar Component
 * 
 * @element vds-navbar
 * 
 * @fires vds-navbar-menu-click - Fired when the menu button is clicked
 * 
 * @csspart navbar - The main navbar container
 * @csspart left-content - The left section container
 * @csspart menu-button - The menu button container
 * @csspart nav-heading - The navigation heading container
 * @csspart right-content - The right section container
 * @csspart divider - The divider elements
 * @csspart profile-container - The profile container (brand logo + avatar)
 * @csspart brand-logo - The brand logo container
 * 
 * @slot menu-icon - Icon for the menu button (defaults to bars icon)
 * @slot nav-heading - Navigation heading/label content
 * @slot tabs - Tab navigation content
 * @slot actions - Action buttons (search, new button, etc.)
 * @slot shortcuts - Shortcut icons
 * @slot brand-logo - Brand logo image displayed before the avatar
 * @slot profile - Profile/avatar content
 */
@customElement('vds-navbar')
export class VDSNavbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: var(--vds-navbar-z-index, 1000);
      width: 100%;
      --vds-navbar-height: var(--vds-size-2xl, 36px);
      --vds-navbar-bg-default: var(--vds-color-bg-secondary, #f8f9fb);
      --vds-navbar-bg-inverse: var(--vds-color-navy-700, #1d3465);
      --vds-navbar-border-color-default: var(--vds-color-border-default, #eaeef4);
      --vds-navbar-border-color-inverse: var(--vds-color-navy-600, #2e4883);
      --vds-navbar-text-color-default: var(--vds-color-text-primary, #070922);
      --vds-navbar-text-color-inverse: var(--vds-color-text-inverse, #ffffff);
      --vds-navbar-text-secondary-default: var(--vds-color-text-secondary, #485775);
      --vds-navbar-text-secondary-inverse: rgba(255, 255, 255, 0.85);
      --vds-navbar-gap: var(--vds-spacing-3xl, 48px);
      --vds-navbar-padding-x: var(--vds-spacing-md, 12px);
      --vds-navbar-padding-y: 0;
      --vds-navbar-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-navbar-font-size: var(--vds-font-size-md, 12px);
      --vds-navbar-font-weight-normal: var(--vds-font-weight-normal, 400);
      --vds-navbar-font-weight-semibold: var(--vds-font-weight-semibold, 600);
      --vds-navbar-divider-color-default: var(--vds-color-border-default, #eaeef4);
      --vds-navbar-divider-color-inverse: rgba(56, 90, 163, 1);
      /* Override tab background to transparent in navbar */
      --vds-color-bg-primary: transparent;
      --vds-tab-bg-filled: transparent;
      --vds-tab-bg-filled-inverse: transparent;
      /* Match tab height to navbar height */
      --vds-tab-min-height: var(--vds-size-2xl, 3rem);
    }
    
    /* Ensure tabs match navbar height when inside navbar */
    ::slotted([slot='tabs']) vds-tab {
      height: 100%;
    }
    
    ::slotted([slot='tabs']) vds-tab .tabs {
      height: 100%;
    }

    .navbar {
      display: flex;
      align-items: center;
      gap: var(--vds-navbar-gap);
      padding-left: 0;
      padding-right: var(--vds-navbar-padding-x);
      padding-top: var(--vds-navbar-padding-y);
      padding-bottom: var(--vds-navbar-padding-y);
      width: 100%;
      box-sizing: border-box;
      background-color: var(--vds-navbar-bg-default);
      font-family: var(--vds-navbar-font-family);
      font-size: var(--vds-navbar-font-size);
    }

    :host([variant='inverse']) .navbar {
      background-color: var(--vds-navbar-bg-inverse);
    }

    .left-content {
      display: flex;
      flex: 1 0 0;
      // min-height: var(--vds-size-2xl, 3rem);
      align-items: center;
      overflow: hidden;
      min-width: 0;
    }

    .menu-button-wrapper {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 1rem;
      border-right: 1px solid var(--vds-navbar-border-color-default);
      box-sizing: border-box;
    }

    :host([variant='inverse']) .menu-button-wrapper {
      border-right-color: var(--vds-navbar-border-color-inverse);
    }

    .menu-button {
      aspect-ratio: 30/30;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: var(--vds-spacing-sm, 6px);
      background: transparent;
      border: none;
      cursor: pointer;
      border-radius: var(--vds-radius-lg, 6px);
      color: var(--vds-navbar-text-color-default);
      transition: background-color 200ms ease-in-out;
    }

    :host([variant='inverse']) .menu-button {
      color: var(--vds-navbar-text-color-inverse);
    }

    .menu-button:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    :host([variant='inverse']) .menu-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .menu-button:focus {
      outline: 2px solid var(--vds-color-brand, #00b578);
      outline-offset: 2px;
    }

    .nav-heading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 var(--vds-spacing-sm, 6px);
      gap: 10px;
      flex-shrink: 0;
    }

    .nav-heading-text {
      font-family: var(--vds-navbar-font-family);
      font-weight: var(--vds-navbar-font-weight-semibold);
      font-size: var(--vds-font-size-lg, 13.5px);
      line-height: normal;
      color: var(--vds-navbar-text-color-default);
      white-space: nowrap;
    }

    :host([variant='inverse']) .nav-heading-text {
      color: var(--vds-navbar-text-color-inverse);
    }
    
    /* Style slotted content in nav-heading slot */
    ::slotted([slot='nav-heading']) {
      color: var(--vds-navbar-text-color-default);
      font-family: var(--vds-navbar-font-family);
      font-weight: var(--vds-navbar-font-weight-semibold);
      font-size: var(--vds-font-size-lg, 13.5px);
    }
    
    :host([variant='inverse']) ::slotted([slot='nav-heading']) {
      color: var(--vds-navbar-text-color-inverse);
    }

    .right-content {
      display: flex;
      gap: var(--vds-spacing-md, 12px);
      align-items: center;
      flex-shrink: 0;
    }

    .divider {
      display: flex;
      height: 18px;
      align-items: center;
      justify-content: center;
      width: 0;
      flex-shrink: 0;
    }

    .divider-line {
      flex: none;
      transform: rotate(90deg);
      height: 0;
      position: relative;
      width: 18px;
    }

    .divider-line::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      bottom: 0;
      border-top: 1px solid var(--vds-navbar-divider-color-default);
    }

    :host([variant='inverse']) .divider-line::before {
      border-top-color: var(--vds-navbar-divider-color-inverse);
    }

    .profile-container {
      display: flex !important;
      align-items: center;
      padding-left: 0;
      padding-right: 2px;
      padding-top: 0;
      padding-bottom: 0;
      flex-shrink: 0;
      gap: 0;
      visibility: visible !important;
      overflow: visible !important;
    }

    .brand-logo-wrapper {
      height: 24px;
      width: auto;
      min-width: 24px;
      max-width: 42px;
      margin-right: 4px;
      flex-shrink: 0;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      background: transparent !important;
    }

    .brand-logo-wrapper[hidden] {
      display: none !important;
    }

    .divider[hidden] {
      display: none !important;
    }

    .brand-logo-wrapper img,
    .brand-logo-wrapper ::slotted(img),
    .brand-logo-wrapper ::slotted(*) {
      display: block;
      max-width: 100%;
      width: auto;
      height: 24px;
      object-fit: contain;
      object-position: center;
      background: transparent !important;
    }


    /* Ensure avatar in profile slot has proper spacing and visibility */
    .profile-container ::slotted([slot='profile']) {
      margin-left: 0;
      display: inline-flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: relative;
      z-index: 2;
      flex-shrink: 0;
    }
    
    /* Direct styling for vds-avatar in profile slot */
    .profile-container vds-avatar {
      margin-left: 0;
      display: inline-flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: relative;
      z-index: 2;
      flex-shrink: 0;
    }

    /* Tabs in navbar will inherit transparent background via CSS variables set on :host */
    
    /* Ensure tabs in navbar have proper width constraints for overflow handling */
    /* The tab component automatically handles overflow when it has constrained width */
    ::slotted([slot='tabs']) {
      flex: 1 1 0;
      min-width: 0;
      max-width: 100%;
      display: block;
      height: 100%;
    }
    

    /* Hide slots that are empty - but not profile/avatar as it's a component */
    ::slotted([slot='nav-heading']:empty),
    ::slotted([slot='tabs']:empty),
    ::slotted([slot='actions']:empty),
    ::slotted([slot='shortcuts']:empty),
    ::slotted([slot='brand-logo']:empty) {
      display: none;
    }

    /* Apply min-height to navbar only when tabs are not present */
    :host([no-tabs]) .navbar {
      min-height: var(--vds-size-2xl, 3rem);
    }
    
    :host([no-tabs]) .left-content {
      min-height: var(--vds-size-2xl, 3rem);
    }

    /* Search button styling */
    .search-button {
      --vds-btn-gap: var(--vds-spacing-sm, 6px);
      // width: 120px;
    }

    .search-button vds-icon[slot="prefix-icon"] {
      font-size: 13.5px;
      width: 13.5px;
      height: 13.5px;
    }

    .search-button .search-text {
      flex: 1 1 0;
      min-width: 0;
    }

    .search-button .keyboard-shortcut {
      opacity: 0.75;
      font-size: 12px;
      flex-shrink: 0;
      font-family: 'Nunito Sans', 'Noto Sans', sans-serif;
      white-space: nowrap;
    }

    :host([variant='inverse']) .search-button::part(button) {
      --vds-btn-label-color: rgba(255, 255, 255, 0.75);
      color: rgba(255, 255, 255, 0.75);
    }

    :host([variant='inverse']) .search-button .keyboard-shortcut {
      color: rgba(255, 255, 255, 0.75);
    }

    :host([variant='inverse']) .search-button::part(label) {
      color: rgba(255, 255, 255, 0.75);
      flex: 1 1 0;
      min-width: 0;
    }
  `;

  @property({ type: String, reflect: true })
  accessor variant: NavbarVariant = 'default';

  @property({ type: Boolean, attribute: 'show-nav-heading' })
  accessor showNavHeading = false;

  @property({ type: Boolean, attribute: 'show-search' })
  accessor showSearch = false;

  @query('slot[name="tabs"]')
  accessor tabsSlot!: HTMLSlotElement;

  @query('slot[name="shortcuts"]')
  accessor shortcutsSlot!: HTMLSlotElement;

  @query('slot[name="brand-logo"]')
  accessor brandLogoSlot!: HTMLSlotElement;

  @query('slot[name="actions"]')
  accessor actionsSlot!: HTMLSlotElement;

  private checkTabsPresence(): void {
    if (!this.tabsSlot) return;
    
    const assignedNodes = this.tabsSlot.assignedNodes({ flatten: true });
    const hasTabs = assignedNodes.some(node => 
      node.nodeType === Node.ELEMENT_NODE && 
      (node as HTMLElement).tagName === 'VDS-TAB'
    );
    
    if (hasTabs) {
      this.removeAttribute('no-tabs');
    } else {
      this.setAttribute('no-tabs', '');
    }
  }

  private setShortcutsButtonSize(): void {
    if (!this.shortcutsSlot) return;
    
    const assignedElements = this.shortcutsSlot.assignedElements({ flatten: true });
    
    assignedElements.forEach(element => {
      // Check if element is a button or contains buttons
      if (element.tagName === 'VDS-BUTTON') {
        const button = element as HTMLElement;
        if (!button.hasAttribute('size')) {
          button.setAttribute('size', 'md');
        }
      } else {
        // Look for nested buttons
        const buttons = element.querySelectorAll('vds-button');
        buttons.forEach(button => {
          if (!button.hasAttribute('size')) {
            button.setAttribute('size', 'md');
          }
        });
      }
    });
  }

  private checkBrandLogoPresence(): void {
    if (!this.brandLogoSlot) return;
    
    const assignedNodes = this.brandLogoSlot.assignedNodes({ flatten: true });
    const hasBrandLogo = assignedNodes.some(node => 
      node.nodeType === Node.ELEMENT_NODE
    );
    
    const brandLogoWrapper = this.shadowRoot?.querySelector('.brand-logo-wrapper');
    if (brandLogoWrapper) {
      if (hasBrandLogo) {
        brandLogoWrapper.removeAttribute('hidden');
      } else {
        brandLogoWrapper.setAttribute('hidden', '');
      }
    }
  }

  private checkDividersVisibility(): void {
    // Check if actions slot has content (including built-in search button)
    const actionsNodes = this.actionsSlot ? this.actionsSlot.assignedNodes({ flatten: true }) : [];
    const hasCustomActions = actionsNodes.some(node => node.nodeType === Node.ELEMENT_NODE);
    const hasActions = hasCustomActions || this.showSearch;
    
    // Check if shortcuts slot has content
    const hasShortcuts = this.shortcutsSlot ? 
      this.shortcutsSlot.assignedElements({ flatten: true }).length > 0 : false;
    
    // divider-1: between actions and shortcuts - show only if both have content
    const divider1Slot = this.shadowRoot?.querySelector('slot[name="divider-1"]') as HTMLSlotElement;
    const divider1El = divider1Slot?.assignedElements({ flatten: true })?.[0] as HTMLElement || 
                       this.shadowRoot?.querySelector('.divider-1') as HTMLElement;
    
    if (divider1El) {
      if (hasActions && hasShortcuts) {
        divider1El.removeAttribute('hidden');
      } else {
        divider1El.setAttribute('hidden', '');
      }
    }
    
    // divider-2: between shortcuts and profile - show only if shortcuts has content
    const divider2Slot = this.shadowRoot?.querySelector('slot[name="divider-2"]') as HTMLSlotElement;
    const divider2El = divider2Slot?.assignedElements({ flatten: true })?.[0] as HTMLElement || 
                       this.shadowRoot?.querySelector('.divider-2') as HTMLElement;
    
    if (divider2El) {
      if (hasShortcuts) {
        divider2El.removeAttribute('hidden');
      } else {
        divider2El.setAttribute('hidden', '');
      }
    }
  }

  protected firstUpdated(): void {
    this.checkTabsPresence();
    this.setShortcutsButtonSize();
    this.checkBrandLogoPresence();
    this.checkDividersVisibility();
    
    // Listen for slot changes
    if (this.tabsSlot) {
      this.tabsSlot.addEventListener('slotchange', () => {
        this.checkTabsPresence();
      });
    }
    
    if (this.shortcutsSlot) {
      this.shortcutsSlot.addEventListener('slotchange', () => {
        this.setShortcutsButtonSize();
        this.checkDividersVisibility();
      });
    }
    
    if (this.brandLogoSlot) {
      this.brandLogoSlot.addEventListener('slotchange', () => {
        this.checkBrandLogoPresence();
      });
    }
    
    if (this.actionsSlot) {
      this.actionsSlot.addEventListener('slotchange', () => {
        this.checkDividersVisibility();
      });
    }
  }

  protected updated(): void {
    this.setShortcutsButtonSize();
    this.checkBrandLogoPresence();
    this.checkDividersVisibility();
  }

  private handleMenuClick(event: MouseEvent): void {
    this.dispatchEvent(
      new CustomEvent('vds-navbar-menu-click', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    return html`
      <nav part="navbar" class="navbar" role="navigation" aria-label="Main navigation">
        <div part="left-content" class="left-content">
          <div part="menu-button" class="menu-button-wrapper">
            <button
              class="menu-button"
              aria-label="Toggle menu"
              @click=${this.handleMenuClick}
            >
              <slot name="menu-icon">
                <vds-icon name="bars" size="md"></vds-icon>
              </slot>
            </button>
          </div>
          
          ${this.showNavHeading
            ? html`
                <div part="nav-heading" class="nav-heading">
                  <slot name="nav-heading">
                    <span class="nav-heading-text">Label</span>
                  </slot>
                </div>
              `
            : html`
                <slot name="nav-heading"></slot>
              `}
          
          <slot name="tabs"></slot>
        </div>

        <div part="right-content" class="right-content">
          <slot name="actions">
            ${this.showSearch
              ? html`
                  <vds-button
                    class="search-button"
                    size="sm"
                    variant=${this.variant}
                    appearance="filled"
                  >
                    <vds-icon slot="prefix-icon" name="magnifying-glass"></vds-icon>
                    Search
                    <span slot="suffix-icon" class="keyboard-shortcut">⌘K</span>
                  </vds-button>
                `
              : nothing}
          </slot>
          
          <slot name="divider-1">
            <div part="divider" class="divider divider-1">
              <div class="divider-line"></div>
            </div>
          </slot>
          
          <slot name="shortcuts"></slot>
          
          <slot name="divider-2">
            <div part="divider" class="divider divider-2">
              <div class="divider-line"></div>
            </div>
          </slot>
          
          <div part="profile-container" class="profile-container">
            <div part="brand-logo" class="brand-logo-wrapper">
              <slot name="brand-logo">
                <!-- Default empty - users should provide their brand logo -->
              </slot>
            </div>
            <slot name="profile"></slot>
          </div>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-navbar': VDSNavbar;
  }
}

