import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'info' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'pill' | 'rounded';

/**
 * VDS Badge Component
 * 
 * @element vds-badge
 * 
 * @csspart badge - The badge container element
 * @csspart icon - The icon slot container
 * @csspart label - The label/text content
 */
@customElement('vds-badge')
export class VDSBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      --vds-badge-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-badge-font-weight: var(--vds-font-weight-normal, 400);
      --vds-badge-font-size: var(--vds-font-size-xs, 0.75rem);
      --vds-badge-padding-x: var(--vds-spacing-sm, 0.5rem);
      --vds-badge-padding-y: var(--vds-spacing-2xs, 0.125rem);
      --vds-badge-gap: var(--vds-spacing-xs, 0.25rem);
      --vds-badge-min-width: 1rem;
      --vds-badge-radius: var(--vds-radius-full, 9999px);
      --vds-badge-bg: var(--vds-color-green-100, #e6f9f3);
      --vds-badge-text: var(--vds-color-brand, #00b578);
      --vds-badge-icon-size: 9px;
      --vds-badge-line-height: 1;
    }

    :host([size='sm']) {
      --vds-badge-font-size: var(--vds-font-size-xs, 0.75rem);
      --vds-badge-padding-x: var(--vds-spacing-sm, 0.5rem);
      --vds-badge-padding-y: var(--vds-spacing-2xs, 0.125rem);
      --vds-badge-gap: var(--vds-spacing-xs, 0.25rem);
      --vds-badge-min-width: 15px;
      --vds-badge-icon-size: 9px;
    }

    :host([size='md']) {
      --vds-badge-font-size: var(--vds-font-size-sm, 0.875rem);
      --vds-badge-padding-x: var(--vds-spacing-sm, 0.5rem);
      --vds-badge-padding-y: var(--vds-spacing-2xs, 0.125rem);
      --vds-badge-gap: var(--vds-spacing-xs, 0.25rem);
      --vds-badge-min-width: 17px;
      --vds-badge-icon-size: 10.5px;
    }

    :host([size='lg']) {
      --vds-badge-font-size: var(--vds-font-size-md, 1rem);
      --vds-badge-padding-x: var(--vds-spacing-sm, 0.5rem);
      --vds-badge-padding-y: var(--vds-spacing-2xs, 0.125rem);
      --vds-badge-gap: var(--vds-spacing-xs, 0.25rem);
      --vds-badge-min-width: 19px;
      --vds-badge-icon-size: 12px;
    }

    :host([shape='rounded']) {
      --vds-badge-radius: var(--vds-radius-sm, 0.25rem);
    }

    :host([shape='pill']) {
      --vds-badge-radius: var(--vds-radius-full, 9999px);
    }

    :host([variant='primary']) {
      --vds-badge-bg: var(--vds-color-green-100, #e6f9f3);
      --vds-badge-text: var(--vds-color-brand, #00b578);
    }

    :host([variant='secondary']) {
      --vds-badge-bg: var(--vds-color-gray-300, #eaeef4);
      --vds-badge-text: var(--vds-color-slate-700, #485775);
    }

    :host([variant='tertiary']) {
      --vds-badge-bg: var(--vds-color-gray-200, #f8f9fb);
      --vds-badge-text: var(--vds-color-gray-500, #898f9a);
    }

    :host([variant='warning']) {
      --vds-badge-bg: var(--vds-color-orange-100, #ffecd4);
      --vds-badge-text: var(--vds-color-orange-500, #ff6800);
    }

    :host([variant='info']) {
      --vds-badge-bg: var(--vds-color-blue-100, #eef2ff);
      --vds-badge-text: var(--vds-color-blue-500, #4366ff);
    }

    :host([variant='danger']) {
      --vds-badge-bg: var(--vds-color-red-100, #ffecee);
      --vds-badge-text: var(--vds-color-red-500, #fb3145);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--vds-badge-gap);
      min-width: var(--vds-badge-min-width);
      padding: var(--vds-badge-padding-y) var(--vds-badge-padding-x);
      border-radius: var(--vds-badge-radius);
      background-color: var(--vds-badge-bg);
      color: var(--vds-badge-text);
      font-family: var(--vds-badge-font-family);
      font-weight: var(--vds-badge-font-weight);
      font-size: var(--vds-badge-font-size);
      line-height: var(--vds-badge-line-height);
      white-space: nowrap;
      box-sizing: border-box;
    }

    ::slotted([slot='icon']) {
      display: inline-flex;
      align-items: center;
      line-height: 1;
      width: var(--vds-badge-icon-size);
      height: var(--vds-badge-icon-size);
      color: inherit;
      flex-shrink: 0;
    }

    .label {
      display: inline-flex;
      align-items: center;
      text-align: center;
    }
  `;

  @property({ type: String, reflect: true })
  accessor variant: BadgeVariant = 'primary';

  @property({ type: String, reflect: true })
  accessor size: BadgeSize = 'sm';

  @property({ type: String, reflect: true })
  accessor shape: BadgeShape = 'pill';

  render() {
    return html`
      <div part="badge" class="badge">
        <slot name="icon" part="icon"></slot>
        <span part="label" class="label">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-badge': VDSBadge;
  }
}

