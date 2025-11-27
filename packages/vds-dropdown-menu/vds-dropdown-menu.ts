import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * VDS Dropdown Menu Component
 *
 * @element vds-dropdown-menu
 *
 * @csspart dropdown-menu - The dropdown menu container element
 * @csspart header - The header section (heading and search)
 * @csspart heading - The heading element
 * @csspart search - The search input container
 * @csspart content - The menu items container
 * @csspart footer - The footer section (show more button)
 */
@customElement('vds-dropdown-menu')
export class VDSDropdownMenu extends LitElement {
  static styles = css`
    :host {
      display: block;
      --vds-dropdown-menu-bg: var(--vds-color-white, #ffffff);
      --vds-dropdown-menu-padding: var(--vds-radius-xl, 0.5625rem);
      --vds-dropdown-menu-gap: var(--vds-spacing-xs, 0.25rem);
      --vds-dropdown-menu-radius: var(--vds-radius-lg, 0.375rem);
      --vds-dropdown-menu-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
      --vds-dropdown-menu-min-width: 160px;
      --vds-dropdown-menu-max-width: 260px;
      --vds-dropdown-menu-max-height: none;
      --vds-dropdown-menu-heading-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-dropdown-menu-heading-font-weight: var(--vds-font-weight-semibold, 600);
      --vds-dropdown-menu-heading-font-size: var(--vds-font-size-md, 1rem);
      --vds-dropdown-menu-heading-color: var(--vds-color-text-primary, #070922);
      --vds-dropdown-menu-heading-padding-bottom: var(--vds-radius-lg, 0.375rem);
      --vds-dropdown-menu-search-border: 3px solid var(--vds-color-green-100, #e6f9f3);
      --vds-dropdown-menu-search-radius: var(--vds-radius-lg, 0.375rem);
      --vds-dropdown-menu-search-gap: var(--vds-spacing-md, 1rem);
      --vds-dropdown-menu-divider-color: var(--vds-color-border-default, var(--vds-color-gray-300, #eaeef4));
      --vds-dropdown-menu-show-more-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-dropdown-menu-show-more-font-weight: var(--vds-font-weight-normal, 400);
      --vds-dropdown-menu-show-more-font-size: var(--vds-font-size-sm, 0.875rem);
      --vds-dropdown-menu-show-more-color: var(--vds-color-blue-500, #4366ff);
      --vds-dropdown-menu-show-more-padding: var(--vds-spacing-xs, 0.25rem) var(--vds-spacing-sm, 0.5rem);
      --vds-dropdown-menu-show-more-radius: var(--vds-radius-md, 0.375rem);
      --vds-dropdown-menu-scrollbar-width: var(--vds-size-4xs, 0.333rem);
      --vds-dropdown-menu-scrollbar-color: var(--vds-color-dark-100, #e1e2ea);
      --vds-dropdown-menu-scrollbar-radius: var(--vds-radius-full, 9999px);
    }

    .dropdown-menu {
      display: flex;
      flex-direction: column;
      gap: var(--vds-dropdown-menu-gap);
      background-color: var(--vds-dropdown-menu-bg);
      padding: var(--vds-dropdown-menu-padding);
      border-radius: var(--vds-dropdown-menu-radius);
      box-shadow: var(--vds-dropdown-menu-shadow);
      min-width: var(--vds-dropdown-menu-min-width);
      max-width: var(--vds-dropdown-menu-max-width);
      max-height: var(--vds-dropdown-menu-max-height);
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
    }

    :host([scrollable]) .dropdown-menu {
      overflow-y: auto;
      overflow-x: hidden;
    }

    .header {
      display: flex;
      flex-direction: column;
      gap: var(--vds-dropdown-menu-gap);
      flex-shrink: 0;
      position: sticky;
      top: 0;
      background-color: var(--vds-dropdown-menu-bg);
      z-index: 1;
    }

    .heading {
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-md, 1rem);
      padding-bottom: var(--vds-dropdown-menu-heading-padding-bottom);
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
      flex-shrink: 0;
    }

    .heading-text {
      font-family: var(--vds-dropdown-menu-heading-font-family);
      font-weight: var(--vds-dropdown-menu-heading-font-weight);
      font-size: var(--vds-dropdown-menu-heading-font-size);
      color: var(--vds-dropdown-menu-heading-color);
      line-height: 1;
      white-space: nowrap;
    }

    .search-container {
      display: flex;
      flex-direction: column;
      gap: var(--vds-dropdown-menu-search-gap);
      border: var(--vds-dropdown-menu-search-border);
      border-radius: var(--vds-dropdown-menu-search-radius);
      flex-shrink: 0;
    }

    .search-input-wrapper {
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-sm, 0.5rem);
      background-color: var(--vds-color-white, #ffffff);
      border: 1px solid var(--vds-color-brand, #00b578);
      border-radius: var(--vds-dropdown-menu-search-radius);
      padding: var(--vds-spacing-sm, 0.5rem) var(--vds-spacing-md, 1rem);
      box-sizing: border-box;
    }

    .search-icon {
      font-size: 13.5px;
      color: var(--vds-color-text-tertiary, #898f9a);
      flex-shrink: 0;
    }

    .search-input {
      flex: 1 0 0;
      min-width: 0;
      font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-weight: var(--vds-font-weight-normal, 400);
      font-size: var(--vds-font-size-md, 1rem);
      color: var(--vds-color-text-tertiary, #898f9a);
      border: none;
      outline: none;
      background: transparent;
      padding: 0;
    }

    .search-input::placeholder {
      color: var(--vds-color-text-tertiary, #898f9a);
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: var(--vds-dropdown-menu-gap);
      flex: 1;
      min-height: 0;
    }

    ::slotted(hr),
    ::slotted(.divider) {
      height: 1px;
      border: none;
      border-top: 1px solid var(--vds-dropdown-menu-divider-color);
      margin: 0;
      flex-shrink: 0;
      width: 100%;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .show-more {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--vds-spacing-xs, 0.25rem);
      padding: var(--vds-dropdown-menu-show-more-padding);
      border-radius: var(--vds-dropdown-menu-show-more-radius);
      font-family: var(--vds-dropdown-menu-show-more-font-family);
      font-weight: var(--vds-dropdown-menu-show-more-font-weight);
      font-size: var(--vds-dropdown-menu-show-more-font-size);
      color: var(--vds-dropdown-menu-show-more-color);
      background: transparent;
      border: none;
      cursor: pointer;
      text-decoration: none;
      line-height: 1;
      box-sizing: border-box;
    }

    .show-more:hover {
      text-decoration: underline;
    }

    /* Custom scrollbar styling */
    :host([scrollable]) .dropdown-menu::-webkit-scrollbar {
      width: var(--vds-dropdown-menu-scrollbar-width);
    }

    :host([scrollable]) .dropdown-menu::-webkit-scrollbar-track {
      background: transparent;
    }

    :host([scrollable]) .dropdown-menu::-webkit-scrollbar-thumb {
      background-color: var(--vds-dropdown-menu-scrollbar-color);
      border-radius: var(--vds-dropdown-menu-scrollbar-radius);
    }

    :host([scrollable]) .dropdown-menu::-webkit-scrollbar-thumb:hover {
      background-color: var(--vds-color-dark-200, #b1b3c4);
    }
  `;

  @property({ type: String })
  accessor heading: string | undefined;

  @property({ type: String, attribute: 'search-placeholder' })
  accessor searchPlaceholder: string | undefined;

  @property({ type: Boolean, reflect: true })
  accessor scrollable = false;

  @property({ type: String })
  accessor maxHeight: string | undefined;

  @property({ type: String, attribute: 'show-more-text' })
  accessor showMoreText: string | undefined;

  @property({ type: String, attribute: 'show-more-href' })
  accessor showMoreHref: string | undefined;

  private handleShowMoreClick(event: Event): void {
    if (!this.showMoreHref) {
      event.preventDefault();
      this.dispatchEvent(
        new CustomEvent('vds-dropdown-menu-show-more', {
          bubbles: true,
          composed: true
        })
      );
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('maxHeight')) {
      if (this.maxHeight) {
        this.style.setProperty('--vds-dropdown-menu-max-height', this.maxHeight);
        if (!this.scrollable) {
          this.scrollable = true;
        }
      } else {
        this.style.removeProperty('--vds-dropdown-menu-max-height');
      }
    }
  }

  render() {
    return html`
      <div part="dropdown-menu" class="dropdown-menu">
        ${this.heading || this.searchPlaceholder
          ? html`
              <div part="header" class="header">
                ${this.heading
                  ? html`
                      <div part="heading" class="heading">
                        <span class="heading-text">${this.heading}</span>
                      </div>
                    `
                  : nothing}
                ${this.searchPlaceholder
                  ? html`
                      <div part="search" class="search-container">
                        <div class="search-input-wrapper">
                          <vds-icon class="search-icon" name="magnifying-glass" aria-hidden="true"></vds-icon>
                          <input
                            part="search-input"
                            class="search-input"
                            type="text"
                            placeholder=${this.searchPlaceholder}
                            @input=${(e: Event) => {
                              const input = e.target as HTMLInputElement;
                              this.dispatchEvent(
                                new CustomEvent('vds-dropdown-menu-search', {
                                  detail: { value: input.value },
                                  bubbles: true,
                                  composed: true
                                })
                              );
                            }}
                          />
                        </div>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
        <div part="content" class="content">
          <slot></slot>
          <slot name="divider"></slot>
        </div>
        ${this.showMoreText
          ? html`
              <div part="footer" class="footer">
                ${this.showMoreHref
                  ? html`
                      <a part="show-more" class="show-more" href=${this.showMoreHref} @click=${this.handleShowMoreClick}>
                        ${this.showMoreText}
                      </a>
                    `
                  : html`
                      <button part="show-more" class="show-more" @click=${this.handleShowMoreClick}>
                        ${this.showMoreText}
                      </button>
                    `}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-dropdown-menu': VDSDropdownMenu;
  }
}

