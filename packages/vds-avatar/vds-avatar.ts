import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type AvatarVariant = 'image' | 'text' | 'icon';

interface ColorScheme {
  bg: string;
  text: string;
}

/**
 * VDS Avatar Component
 * 
 * @element vds-avatar
 * 
 * @csspart avatar - The avatar container element
 * @csspart image - The image element (when variant is image)
 * @csspart text - The text/initial element (when variant is text)
 * @csspart icon - The icon slot container (when variant is icon)
 */
@customElement('vds-avatar')
export class VDSAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      --vds-avatar-size: 16px;
      --vds-avatar-radius: var(--vds-radius-sm, 0.25rem);
      --vds-avatar-bg: var(--vds-color-green-200, #b3efd9);
      --vds-avatar-text-color: var(--vds-color-green-700, #007a51);
      --vds-avatar-icon-color: var(--vds-color-violet-700, #7107e7);
      --vds-avatar-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-avatar-font-weight: var(--vds-font-weight-normal, 400);
      --vds-avatar-font-size: var(--vds-font-size-xs, 0.75rem);
      --vds-avatar-icon-size: var(--vds-font-size-xs, 0.75rem);
      --vds-avatar-padding: 0;
    }

    :host([size='xs']) {
      --vds-avatar-size: 16px;
      --vds-avatar-radius: var(--vds-radius-sm, 0.25rem);
      --vds-avatar-font-size: var(--vds-font-size-xs, 0.75rem);
      --vds-avatar-icon-size: var(--vds-font-size-xs, 0.75rem);
      --vds-avatar-padding: 0;
    }

    :host([size='sm']) {
      --vds-avatar-size: 20px;
      --vds-avatar-radius: var(--vds-radius-md, 0.375rem);
      --vds-avatar-font-size: var(--vds-font-size-sm, 0.875rem);
      --vds-avatar-icon-size: var(--vds-font-size-sm, 0.875rem);
      --vds-avatar-padding: 5px;
    }

    :host([size='md']) {
      --vds-avatar-size: 24px;
      --vds-avatar-radius: var(--vds-radius-md, 0.375rem);
      --vds-avatar-font-size: var(--vds-font-size-md, 1rem);
      --vds-avatar-icon-size: var(--vds-font-size-md, 1rem);
      --vds-avatar-padding: 5px;
    }

    :host([size='lg']) {
      --vds-avatar-size: 28px;
      --vds-avatar-radius: var(--vds-radius-md, 0.5rem);
      --vds-avatar-font-size: var(--vds-font-size-lg, 1.125rem);
      --vds-avatar-font-weight: var(--vds-font-weight-semibold, 600);
      --vds-avatar-icon-size: var(--vds-font-size-lg, 1.125rem);
      --vds-avatar-padding: 5px;
    }

    :host([size='xl']) {
      --vds-avatar-size: 32px;
      --vds-avatar-radius: var(--vds-radius-lg, 0.5rem);
      --vds-avatar-font-size: var(--vds-font-size-xl, 1.25rem);
      --vds-avatar-font-weight: var(--vds-font-weight-bold, 700);
      --vds-avatar-icon-size: var(--vds-font-size-xl, 1.25rem);
      --vds-avatar-padding: 5px;
    }

    :host([size='2xl']) {
      --vds-avatar-size: 36px;
      --vds-avatar-radius: var(--vds-radius-xl, 0.75rem);
      --vds-avatar-font-size: var(--vds-font-size-2xl, 1.5rem);
      --vds-avatar-font-weight: var(--vds-font-weight-semibold, 600);
      --vds-avatar-icon-size: var(--vds-font-size-2xl, 1.5rem);
      --vds-avatar-padding: 5px;
    }

    :host([size='3xl']) {
      --vds-avatar-size: 40px;
      --vds-avatar-radius: var(--vds-radius-xl, 0.75rem);
      --vds-avatar-font-size: var(--vds-font-size-3xl, 1.875rem);
      --vds-avatar-font-weight: var(--vds-font-weight-bold, 700);
      --vds-avatar-icon-size: var(--vds-font-size-3xl, 1.875rem);
      --vds-avatar-padding: 5px;
    }

    :host([size='4xl']) {
      --vds-avatar-size: 48px;
      --vds-avatar-radius: var(--vds-radius-xl, 1rem);
      --vds-avatar-font-size: var(--vds-font-size-4xl, 2.25rem);
      --vds-avatar-font-weight: var(--vds-font-weight-bold, 700);
      --vds-avatar-icon-size: var(--vds-font-size-4xl, 2.25rem);
      --vds-avatar-padding: 5px;
    }

    :host([variant='image']) {
      --vds-avatar-bg: transparent;
      border-radius: var(--vds-avatar-radius);
    }

    :host([variant='text']) {
      --vds-avatar-bg: var(--vds-color-green-200, #b3efd9);
      --vds-avatar-text-color: var(--vds-color-green-700, #007a51);
    }

    :host([variant='icon']) {
      --vds-avatar-bg: var(--vds-color-violet-200, #ddd6ff);
      --vds-avatar-icon-color: var(--vds-color-violet-700, #7107e7);
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--vds-avatar-size);
      height: var(--vds-avatar-size);
      min-width: var(--vds-avatar-size);
      min-height: var(--vds-avatar-size);
      border-radius: var(--vds-avatar-radius);
      background-color: var(--vds-avatar-bg);
      // padding: var(--vds-avatar-padding);
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
    }

    .avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }

    .avatar-text {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-family: var(--vds-avatar-font-family);
      font-weight: var(--vds-avatar-font-weight);
      font-size: var(--vds-avatar-font-size);
      color: var(--vds-avatar-text-color);
      line-height: 1;
      text-align: center;
      text-transform: uppercase;
      white-space: nowrap;
    }

    ::slotted([slot='icon']) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: var(--vds-avatar-icon-size);
      color: var(--vds-avatar-icon-color);
      flex-shrink: 0;
    }
  `;

  @property({ type: String, reflect: true })
  accessor size: AvatarSize = 'xs';

  @property({ type: String, reflect: true })
  accessor variant: AvatarVariant = 'image';

  @property({ type: String })
  accessor src: string | undefined;

  @property({ type: String })
  accessor alt: string = '';

  @property({ type: String })
  accessor name: string = '';

  @property({ type: String })
  accessor initials: string | undefined;

  private getInitials(): string {
    if (this.initials) {
      return this.initials.toUpperCase().slice(0, 1);
    }
    if (this.name) {
      const parts = this.name.trim().split(/\s+/);
      return parts[0][0].toUpperCase();
    }
    return '?';
  }

  private getColorSchemeForLetter(letter: string): ColorScheme {
    const upperLetter = letter.toUpperCase();
    
    // Map letters to color schemes based on Figma design
    const colorMap: Record<string, ColorScheme> = {
      'A': { bg: 'var(--vds-color-green-200, #b3efd9)', text: 'var(--vds-color-green-700, #007a51)' },
      'B': { bg: 'var(--vds-color-lime-200, #d9fa98)', text: 'var(--vds-color-lime-700, #477d00)' },
      'C': { bg: 'var(--vds-color-emerald-200, #a4f4d0)', text: 'var(--vds-color-emerald-700, #007a56)' },
      'D': { bg: 'var(--vds-color-teal-200, #95f6e4)', text: 'var(--vds-color-emerald-700, #007a56)' },
      'E': { bg: 'var(--vds-color-blue-200, #c7d2fe)', text: 'var(--vds-color-blue-700, #233ab0)' },
      'F': { bg: 'var(--vds-color-sky-200, #b8e5ff)', text: 'var(--vds-color-sky-700, #0068a8)' },
      'G': { bg: 'var(--vds-color-indigo-200, #c6d2ff)', text: 'var(--vds-color-indigo-700, #432dd6)' },
      'H': { bg: 'var(--vds-color-violet-200, #ddd6ff)', text: 'var(--vds-color-violet-700, #7107e7)' },
      'I': { bg: 'var(--vds-color-yellow-200, #feefc5)', text: 'var(--vds-color-yellow-700, #b86f00)' },
      'J': { bg: 'var(--vds-color-purple-200, #e8d4ff)', text: 'var(--vds-color-purple-700, #8200da)' },
      'K': { bg: 'var(--vds-color-red-200, #ffc8cc)', text: 'var(--vds-color-red-700, #b51626)' },
      'L': { bg: 'var(--vds-color-amber-200, #fee585)', text: 'var(--vds-color-amber-700, #ba4c00)' },
      'M': { bg: 'var(--vds-color-orange-200, #ffd6a7)', text: 'var(--vds-color-orange-700, #ca3500)' },
      'N': { bg: 'var(--vds-color-pink-200, #fccee7)', text: 'var(--vds-color-pink-700, #c7005c)' },
      'O': { bg: 'var(--vds-color-fuchsia-200, #f6d0ff)', text: 'var(--vds-color-fuchsia-700, #a900b7)' },
      'P': { bg: 'var(--vds-color-cyan-200, #a3f4fd)', text: 'var(--vds-color-cyan-700, #007495)' },
      'Q': { bg: 'var(--vds-color-gray-300, #eaeef4)', text: 'var(--vds-color-gray-700, #555560)' },
      'R': { bg: 'var(--vds-color-green-200, #b3efd9)', text: 'var(--vds-color-green-700, #007a51)' },
      'S': { bg: 'var(--vds-color-lime-200, #d9fa98)', text: 'var(--vds-color-lime-700, #477d00)' },
      'T': { bg: 'var(--vds-color-emerald-200, #a4f4d0)', text: 'var(--vds-color-emerald-700, #007a56)' },
      'U': { bg: 'var(--vds-color-teal-200, #95f6e4)', text: 'var(--vds-color-emerald-700, #007a56)' },
      'V': { bg: 'var(--vds-color-blue-200, #c7d2fe)', text: 'var(--vds-color-blue-700, #233ab0)' },
      'W': { bg: 'var(--vds-color-sky-200, #b8e5ff)', text: 'var(--vds-color-sky-700, #0068a8)' },
      'X': { bg: 'var(--vds-color-indigo-200, #c6d2ff)', text: 'var(--vds-color-indigo-700, #432dd6)' },
      'Y': { bg: 'var(--vds-color-violet-200, #ddd6ff)', text: 'var(--vds-color-violet-700, #7107e7)' },
      'Z': { bg: 'var(--vds-color-yellow-200, #feefc5)', text: 'var(--vds-color-yellow-700, #b86f00)' },
    };

    return colorMap[upperLetter] || { bg: 'var(--vds-color-green-200, #b3efd9)', text: 'var(--vds-color-green-700, #007a51)' };
  }

  private getDisplayVariant(): AvatarVariant {
    if (this.variant === 'image' && this.src) {
      return 'image';
    }
    if (this.variant === 'text' || (this.variant === 'image' && !this.src && (this.name || this.initials))) {
      return 'text';
    }
    if (this.variant === 'icon' || (this.variant === 'image' && !this.src && !this.name && !this.initials)) {
      return 'icon';
    }
    return this.variant;
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    
    // Update color scheme based on initial letter when variant is text
    const displayVariant = this.getDisplayVariant();
    if (displayVariant === 'text') {
      const initial = this.getInitials();
      const colorScheme = this.getColorSchemeForLetter(initial);
      this.style.setProperty('--vds-avatar-bg', colorScheme.bg);
      this.style.setProperty('--vds-avatar-text-color', colorScheme.text);
    } else {
      // Reset to default when not in text variant
      this.style.removeProperty('--vds-avatar-bg');
      this.style.removeProperty('--vds-avatar-text-color');
    }
  }

  render() {
    const displayVariant = this.getDisplayVariant();

    return html`
      <div part="avatar" class="avatar">
        ${displayVariant === 'image' && this.src
          ? html`<img part="image" class="avatar-image" src=${this.src} alt=${this.alt || nothing} />`
          : nothing}
        ${displayVariant === 'text'
          ? html`<span part="text" class="avatar-text">${this.getInitials()}</span>`
          : nothing}
        ${displayVariant === 'icon'
          ? html`<slot name="icon" part="icon"></slot>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-avatar': VDSAvatar;
  }
}

