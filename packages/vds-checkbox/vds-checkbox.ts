import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type CheckboxSize = 'regular' | 'small';
export type CheckboxState = 'unchecked' | 'hover' | 'checked' | 'disabled' | 'indeterminate';

export interface CheckboxChangeEventDetail {
  checked: boolean;
  indeterminate: boolean;
}

/**
 * VDS Checkbox Component
 *
 * @element vds-checkbox
 *
 * @fires vds-checkbox-change - Fired when the checkbox state changes
 *
 * @csspart checkbox - The checkbox container element
 * @csspart input - The native input element (hidden)
 * @csspart box - The visual checkbox box
 * @csspart icon - The check/indeterminate icon
 * @csspart label - The label text element
 */
@customElement('vds-checkbox')
export class VDSCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-sm, 0.5rem);
      cursor: pointer;
      user-select: none;
      --vds-checkbox-size: 12px;
      --vds-checkbox-border-width: 0.6px;
      --vds-checkbox-border-radius: 2px;
      --vds-checkbox-border-color: var(--vds-color-text-tertiary, #898f9a);
      --vds-checkbox-border-color-hover: var(--vds-color-text-primary, #070922);
      --vds-checkbox-border-color-disabled: var(--vds-color-text-disabled, #cdced3);
      --vds-checkbox-bg: transparent;
      --vds-checkbox-bg-checked: var(--vds-color-brand, #00b578);
      --vds-checkbox-icon-color: var(--vds-color-white, #ffffff);
      --vds-checkbox-icon-size: 8px;
      --vds-checkbox-label-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-checkbox-label-font-weight: var(--vds-font-weight-normal, 400);
      --vds-checkbox-label-font-size: var(--vds-font-size-md, 1rem);
      --vds-checkbox-label-color: var(--vds-color-text-primary, #070922);
      --vds-checkbox-label-color-disabled: var(--vds-color-text-disabled, #cdced3);
    }

    :host([size='regular']) {
      --vds-checkbox-size: var(--vds-font-size-md, 1rem);;
      --vds-checkbox-label-font-size: var(--vds-font-size-md, 1rem);
      --vds-checkbox-icon-size: 8px;
    }

    :host([size='small']) {
      --vds-checkbox-size: 10.5px;
      --vds-checkbox-label-font-size: var(--vds-font-size-sm, 0.875rem);
      --vds-checkbox-icon-size: 7px;
    }

    :host([size='regular'][state='unchecked']) {
      --vds-checkbox-border-width: 0.5px;
    }

    .checkbox-container {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-sm, 0.5rem);
      position: relative;
    }

    .input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
      pointer-events: none;
    }

    .box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--vds-checkbox-size);
      height: var(--vds-checkbox-size);
      min-width: var(--vds-checkbox-size);
      min-height: var(--vds-checkbox-size);
      border: var(--vds-checkbox-border-width) solid var(--vds-checkbox-border-color);
      border-radius: var(--vds-checkbox-border-radius);
      background-color: var(--vds-checkbox-bg);
      box-sizing: border-box;
      flex-shrink: 0;
      transition: border-color 200ms ease-in-out, background-color 200ms ease-in-out;
      position: relative;
    }

    :host([state='hover']:not([disabled])) .box {
      border-color: var(--vds-checkbox-border-color-hover);
    }

    :host([state='checked']) .box {
      background-color: var(--vds-checkbox-bg-checked);
      border-color: var(--vds-checkbox-bg-checked);
    }

    :host([state='indeterminate']) .box {
      background-color: var(--vds-checkbox-bg-checked);
      border-color: var(--vds-checkbox-bg-checked);
    }

    :host([disabled]) .box {
      border-color: var(--vds-checkbox-border-color-disabled);
      cursor: not-allowed;
    }

    :host([disabled][state='checked']) .box,
    :host([disabled][state='indeterminate']) .box {
      background-color: var(--vds-checkbox-border-color-disabled);
      border-color: var(--vds-checkbox-border-color-disabled);
    }

    .icon {
      display: none;
      font-size: var(--vds-checkbox-icon-size);
      color: var(--vds-checkbox-icon-color);
      flex-shrink: 0;
    }

    :host([state='checked']) .icon-check {
      display: inline-flex;
    }

    :host([state='indeterminate']) .icon-minus {
      display: inline-flex;
    }

    .label {
      font-family: var(--vds-checkbox-label-font-family);
      font-weight: var(--vds-checkbox-label-font-weight);
      font-size: var(--vds-checkbox-label-font-size);
      color: var(--vds-checkbox-label-color);
      line-height: 1;
      user-select: none;
    }

    :host([disabled]) .label {
      color: var(--vds-checkbox-label-color-disabled);
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.6;
    }

    :host(:focus-visible) .box {
      outline: 2px solid var(--vds-color-border-focus, var(--vds-color-sky-500, #4366ff));
      outline-offset: 2px;
    }
  `;

  @property({ type: String, reflect: true })
  accessor size: CheckboxSize = 'regular';

  @property({ type: String, reflect: true })
  accessor state: CheckboxState = 'unchecked';

  @property({ type: Boolean, reflect: true })
  accessor checked = false;

  @property({ type: Boolean, reflect: true })
  accessor indeterminate = false;

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: String })
  accessor label: string | undefined;

  @property({ type: String })
  accessor name: string | undefined;

  @property({ type: String })
  accessor value: string | undefined;

  private handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }

    this.updateState();
    this.dispatchChangeEvent();
  }

  private handleMouseEnter(): void {
    if (!this.disabled && this.state === 'unchecked') {
      this.state = 'hover';
    }
  }

  private handleMouseLeave(): void {
    if (this.state === 'hover' && !this.disabled) {
      this.state = 'unchecked';
    }
  }

  private updateState(): void {
    if (this.disabled) {
      this.state = 'disabled';
    } else if (this.indeterminate) {
      this.state = 'indeterminate';
    } else if (this.checked) {
      this.state = 'checked';
    } else {
      this.state = 'unchecked';
    }
  }

  private dispatchChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent<CheckboxChangeEventDetail>('vds-checkbox-change', {
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate
        },
        bubbles: true,
        composed: true
      })
    );
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('checked') || changedProperties.has('indeterminate') || changedProperties.has('disabled')) {
      this.updateState();
    }
  }

  render() {
    return html`
      <div
        part="checkbox"
        class="checkbox-container"
        @click=${this.handleClick}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <input
          part="input"
          class="input"
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          .disabled=${this.disabled}
          .name=${this.name || nothing}
          .value=${this.value || nothing}
          tabindex="-1"
          aria-hidden="true"
        />
        <div part="box" class="box">
          <vds-icon part="icon" class="icon icon-check" name="check" aria-hidden="true"></vds-icon>
          <vds-icon part="icon" class="icon icon-minus" name="minus" aria-hidden="true"></vds-icon>
        </div>
        ${this.label
          ? html`<span part="label" class="label">${this.label}</span>`
          : html`<slot></slot>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-checkbox': VDSCheckbox;
  }
}

