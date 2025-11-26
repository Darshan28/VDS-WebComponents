import { LitElement, css, html, nothing, unsafeCSS } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import iconStyles from './assets/icon-classes.css?raw';

const ICON_CLASS_PREFIX = 'v-';

@customElement('vds-icon')
export class VDSIcon extends LitElement {
  static styles = [
    css`
      @font-face {
        font-family: 'vds';
        src: url('./assets/fonts/vds.eot?zftt44');
        src: url('./assets/fonts/vds.eot?zftt44#iefix') format('embedded-opentype'),
          url('./assets/fonts/vds.ttf?zftt44') format('truetype'),
          url('./assets/fonts/vds.woff?zftt44') format('woff'),
          url('./assets/fonts/vds.svg?zftt44#vds') format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: block;
      }

      :host {
        --vds-icon-color: currentColor;
        --vds-icon-rotation: 0deg;
        display: inline-flex;
        inline-size: auto;
        block-size: auto;
        vertical-align: middle;
        color: var(--vds-icon-color);
        font-size: inherit;
        line-height: 1;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1em;
        height: 1em;
        font-size: inherit;
        transform: rotate(var(--vds-icon-rotation));
      }

      :host([spin]) .icon {
        animation: vds-icon-spin 1s linear infinite;
      }

      @keyframes vds-icon-spin {
        from {
          transform: rotate(var(--vds-icon-rotation));
        }
        to {
          transform: rotate(calc(var(--vds-icon-rotation) + 360deg));
        }
      }
    `,
    unsafeCSS(iconStyles)
  ];

  @property({ type: String, reflect: true })
  accessor name = '';

  @property({ type: Boolean, reflect: true })
  accessor spin = false;

  @property({ type: Number })
  accessor rotate = 0;

  @property({ type: String })
  accessor label: string | null = null;

  @property({ type: Boolean, reflect: true })
  accessor decorative = false;

  @property({ type: String })
  accessor color: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.syncCustomStyles();
  }

  protected updated(changed: PropertyValues<VDSIcon>): void {
    super.updated(changed);

    if (changed.has('color') || changed.has('rotate')) {
      this.syncCustomStyles();
    }
  }

  private syncCustomStyles(): void {
    if (this.color) {
      this.style.setProperty('--vds-icon-color', this.color);
    } else {
      this.style.removeProperty('--vds-icon-color');
    }

    if (this.rotate) {
      this.style.setProperty('--vds-icon-rotation', `${this.rotate}deg`);
    } else {
      this.style.removeProperty('--vds-icon-rotation');
    }
  }

  private get iconClass(): string | null {
    return this.name ? `${ICON_CLASS_PREFIX}${this.name}` : null;
  }

  render() {
    const iconClasses: Record<string, boolean> = { icon: true };

    if (this.iconClass) {
      iconClasses[this.iconClass] = true;
    }

    return html`
      <span
        part="icon"
        class=${classMap(iconClasses)}
        role=${this.decorative || !this.label ? nothing : 'img'}
        aria-label=${this.decorative || !this.label ? nothing : this.label}
        aria-hidden=${this.decorative || !this.label ? 'true' : 'false'}
      ></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-icon': VDSIcon;
  }
}


