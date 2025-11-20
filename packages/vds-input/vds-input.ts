import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';

export interface InputChangeEventDetail {
  value: string;
  originalEvent: Event;
}

export interface InputInputEventDetail {
  value: string;
  originalEvent: Event;
}

/**
 * VDS Input Component
 * 
 * @element vds-input
 * 
 * @fires vds-input-change - Fired when the input value changes and loses focus
 * @fires vds-input-input - Fired on every input value change
 * 
 * @csspart input - The input element
 * @csspart label - The label element
 * @csspart wrapper - The wrapper container
 * @csspart error - The error message container
 * @csspart helper - The helper text container
 */
@customElement('vds-input')
export class VDSInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      --vds-input-padding-x: var(--vds-spacing-md, 1rem);
      --vds-input-padding-y: var(--vds-spacing-sm, 0.5rem);
      --vds-input-font-size: var(--vds-font-size-md, 1rem);
      --vds-input-line-height: var(--vds-line-height-normal, 1.5);
      --vds-input-border-radius: var(--vds-radius-md, 0.375rem);
      --vds-input-border-width: 1px;
      --vds-input-border-color: var(--vds-color-border-default, #e5e7eb);
      --vds-input-border-color-focus: var(--vds-color-border-focus, #0066cc);
      --vds-input-border-color-error: var(--vds-color-border-error, #dc3545);
      --vds-input-bg: var(--vds-color-bg-primary, #ffffff);
      --vds-input-color: var(--vds-color-text-primary, #1f2937);
      --vds-input-color-placeholder: var(--vds-color-text-secondary, #6b7280);
      --vds-input-transition: var(--vds-transition-base, 200ms ease-in-out);
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-xs, 0.25rem);
    }

    label {
      font-family: var(--vds-font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-size: var(--vds-font-size-sm, 0.875rem);
      font-weight: var(--vds-font-weight-medium, 500);
      color: var(--vds-color-text-primary, #1f2937);
      line-height: var(--vds-line-height-normal, 1.5);
    }

    label.required::after {
      content: ' *';
      color: var(--vds-color-danger, #dc3545);
    }

    input {
      width: 100%;
      padding: var(--vds-input-padding-y) var(--vds-input-padding-x);
      font-family: var(--vds-font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-size: var(--vds-input-font-size);
      line-height: var(--vds-input-line-height);
      color: var(--vds-input-color);
      background-color: var(--vds-input-bg);
      border: var(--vds-input-border-width) solid var(--vds-input-border-color);
      border-radius: var(--vds-input-border-radius);
      transition: border-color var(--vds-input-transition), box-shadow var(--vds-input-transition);
      box-sizing: border-box;
    }

    input::placeholder {
      color: var(--vds-input-color-placeholder);
      opacity: 1;
    }

    input:focus {
      outline: none;
      border-color: var(--vds-input-border-color-focus);
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }

    input:disabled {
      background-color: var(--vds-color-bg-disabled, #f3f4f6);
      cursor: not-allowed;
      opacity: 0.6;
    }

    input.error {
      border-color: var(--vds-input-border-color-error);
    }

    input.error:focus {
      border-color: var(--vds-input-border-color-error);
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    .helper-text,
    .error-text {
      font-family: var(--vds-font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-size: var(--vds-font-size-sm, 0.875rem);
      line-height: var(--vds-line-height-normal, 1.5);
    }

    .helper-text {
      color: var(--vds-color-text-secondary, #6b7280);
    }

    .error-text {
      color: var(--vds-color-danger, #dc3545);
    }
  `;

  @property({ type: String })
  accessor type: InputType = 'text';

  @property({ type: String })
  accessor value = '';

  @property({ type: String })
  accessor placeholder = '';

  @property({ type: String })
  accessor label = '';

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor id = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor required = false;

  @property({ type: Boolean, reflect: true })
  accessor readonly = false;

  @property({ type: String })
  accessor errorMessage = '';

  @property({ type: String })
  accessor helperText = '';

  @property({ type: String })
  accessor ariaLabel?: string;

  @property({ type: String })
  accessor ariaDescribedBy?: string;

  @query('input')
  accessor inputElement!: HTMLInputElement;

  private handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    const detail: InputInputEventDetail = {
      value: this.value,
      originalEvent: event
    };

    this.dispatchEvent(
      new CustomEvent('vds-input-input', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    const detail: InputChangeEventDetail = {
      value: this.value,
      originalEvent: event
    };

    this.dispatchEvent(
      new CustomEvent('vds-input-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private handleBlur(): void {
    // Validate on blur if needed
    this.requestUpdate();
  }

  get validity(): ValidityState {
    return this.inputElement?.validity || {
      valid: true,
      valueMissing: false,
      typeMismatch: false,
      patternMismatch: false,
      tooLong: false,
      tooShort: false,
      rangeUnderflow: false,
      rangeOverflow: false,
      stepMismatch: false,
      badInput: false,
      customError: false
    } as ValidityState;
  }

  get validationMessage(): string {
    return this.inputElement?.validationMessage || '';
  }

  checkValidity(): boolean {
    return this.inputElement?.checkValidity() ?? true;
  }

  reportValidity(): boolean {
    return this.inputElement?.reportValidity() ?? true;
  }

  render() {
    const inputId = this.id || `vds-input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!this.errorMessage || (this.inputElement && !this.inputElement.validity.valid);
    const errorMsg = this.errorMessage || (this.inputElement && !this.inputElement.validity.valid ? this.inputElement.validationMessage : '');

    return html`
      <div class="wrapper" part="wrapper">
        ${this.label
          ? html`
              <label
                part="label"
                for=${inputId}
                class=${classMap({ required: this.required })}
              >
                ${this.label}
              </label>
            `
          : nothing}
        <input
          part="input"
          id=${inputId}
          type=${this.type}
          name=${this.name || nothing}
          .value=${this.value}
          placeholder=${this.placeholder || nothing}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          aria-label=${this.ariaLabel || nothing}
          aria-describedby=${this.ariaDescribedBy || (errorMsg || this.helperText ? `${inputId}-desc` : nothing)}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-required=${this.required ? 'true' : nothing}
          class=${classMap({ error: hasError })}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        />
        ${errorMsg
          ? html`
              <div part="error" class="error-text" id=${`${inputId}-desc`}>
                ${errorMsg}
              </div>
            `
          : this.helperText
          ? html`
              <div part="helper" class="helper-text" id=${`${inputId}-desc`}>
                ${this.helperText}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-input': VDSInput;
  }
}

