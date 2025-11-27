import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import flatpickr from 'flatpickr';
import type { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import 'flatpickr/dist/flatpickr.min.css';
import '../vds-dropdown-button/vds-dropdown-button.js';
import '../vds-icon/vds-icon.js';

export type InputType =
  | 'text'
  | 'textarea'
  | 'relationship'
  | 'phone'
  | 'currency'
  | 'email'
  | 'password'
  | 'date'
  | 'time'
  | 'datetime'
  | 'daterange';
export type InputState = 'normal' | 'read-only' | 'disabled' | 'error' | 'active';

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
 * @fires vds-input-nav - Fired when navigation buttons are clicked (relationship type)
 *
 * @csspart wrapper - The wrapper container
 * @csspart label - The label element (contains the label text and info icon slot)
 * @csspart info-icon - The info icon slot
 * @csspart input-container - The outer input container (for active state border ring)
 * @csspart prefix-dropdown - The prefix dropdown button (for phone/currency)
 * @csspart input-wrapper - The inner input wrapper
 * @csspart input - The input/textarea element
 * @csspart suffix-icon - The suffix icon slot
 * @csspart nav-button-prev - The previous navigation button (for relationship)
 * @csspart nav-button-next - The next navigation button (for relationship)
 * @csspart helper-text - The helper text container
 */
@customElement('vds-input')
export class VDSInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      --vds-input-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-input-font-weight: var(--vds-font-weight-normal, 400);
      --vds-input-font-size: var(--vds-font-size-md, 1rem);
      --vds-input-label-font-size: var(--vds-font-size-sm, 10.5px);
      --vds-input-helper-font-size: var(--vds-font-size-xs, 9px);
      --vds-input-padding-x: var(--vds-spacing-md, 12px);
      --vds-input-padding-y: var(--vds-spacing-sm, 6px);
      --vds-input-gap: var(--vds-spacing-xs, 3px);
      // --vds-input-height: 28px;
      --vds-input-textarea-height: 60px;
      --vds-input-radius: var(--vds-radius-lg, 6px);
      --vds-input-icon-size: 13.5px;
      --vds-input-info-icon-size: 10.5px;
      --vds-input-nav-button-size: 28px;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--vds-input-gap);
      width: 100%;
    }

    .label {
      font-family: var(--vds-input-font-family);
      font-weight: var(--vds-input-font-weight);
      font-size: var(--vds-input-label-font-size);
      line-height: 1;
      color: var(--vds-color-text-secondary, #485775);
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: var(--vds-input-gap);
    }

    :host([state='disabled']) .label {
      color: var(--vds-color-text-disabled, #cdced3);
    }

    ::slotted([slot='info-icon']) {
      font-size: var(--vds-input-info-icon-size);
      color: var(--vds-color-text-secondary, #485775);
      display: inline-flex;
      align-items: center;
      line-height: 1;
      flex-shrink: 0;
    }

    :host([state='disabled']) ::slotted([slot='info-icon']) {
      color: var(--vds-color-text-disabled, #cdced3);
    }

    /* Outer container for active state 3px border ring */
    .input-container {
      display: flex;
      align-items: stretch;
      position: relative;
      border: 3px solid transparent;
      border-radius: var(--vds-input-radius);
      box-sizing: border-box;
    }

    :host([state='active']) .input-container {
      border-color: var(--vds-color-green-100, #e6f9f3);
    }

    /* Prefix dropdown button (for phone/currency) */
    .prefix-dropdown {
      flex-shrink: 0;
      // height: 100%;
      display: inline-flex;
      align-items: stretch;
      --vds-dropdown-btn-min-height: var(--vds-input-height) !important;
      --vds-dropdown-btn-padding-x: var(--vds-input-padding-x);
      --vds-dropdown-btn-padding-y: var(--vds-input-padding-y);
      --vds-dropdown-btn-font-size: var(--vds-input-font-size);
      --vds-dropdown-btn-radius: var(--vds-input-radius);
    }

    .prefix-dropdown::part(container) {
      height: 100% !important;
      display: flex;
      align-items: stretch;
    }

    .prefix-dropdown::part(dropdown-button) {
      height: 100% !important;
      line-height: 1 !important;
      padding: var(--vds-input-padding-y) var(--vds-input-padding-x) !important;
      border-top-left-radius: var(--vds-input-radius);
      border-bottom-left-radius: var(--vds-input-radius);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
      font-family: var(--vds-input-font-family);
      font-weight: var(--vds-input-font-weight);
      font-size: var(--vds-input-font-size);
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
    }

    /* Phone prefix: no background in normal, gray-200 in read-only/disabled */
    :host([type='phone']) .prefix-dropdown::part(dropdown-button) {
      background-color: transparent;
      border-color: var(--vds-color-gray-300, #eaeef4);
      color: var(--vds-color-text-primary, #070922);
    }

    :host([type='phone'][state='read-only']) .prefix-dropdown::part(dropdown-button),
    :host([type='phone'][state='disabled']) .prefix-dropdown::part(dropdown-button) {
      background-color: var(--vds-color-gray-200, #f8f9fb);
      border-color: var(--vds-color-gray-300, #eaeef4);
    }

    /* Currency prefix: always gray-200 background */
    :host([type='currency']) .prefix-dropdown::part(dropdown-button) {
      background-color: var(--vds-color-gray-200, #f8f9fb);
      border-color: var(--vds-color-gray-300, #eaeef4);
      color: var(--vds-color-text-primary, #070922);
    }

    /* Active state borders */
    :host([state='active'][type='phone']) .prefix-dropdown::part(dropdown-button),
    :host([state='active'][type='currency']) .prefix-dropdown::part(dropdown-button) {
      border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578));
    }

    /* Error state borders */
    :host([state='error'][type='phone']) .prefix-dropdown::part(dropdown-button),
    :host([state='error'][type='currency']) .prefix-dropdown::part(dropdown-button) {
      border-color: var(--vds-color-red-500, #fb3145);
    }

    /* Disabled state */
    :host([state='disabled']) .prefix-dropdown {
      pointer-events: none;
      opacity: 1;
    }

    :host([state='disabled']) .prefix-dropdown::part(dropdown-button) {
      color: var(--vds-color-text-disabled, #cdced3);
    }

    /* Inner input wrapper */
    .input-wrapper {
      display: flex;
      align-items: center;
      flex: 1;
      position: relative;
      background-color: var(--vds-color-white, #ffffff);
      border: 1px solid var(--vds-color-gray-300, #eaeef4);
      border-radius: var(--vds-input-radius);
      height: var(--vds-input-height);
      min-height: var(--vds-input-height);
      gap: var(--vds-input-padding-x);
      padding: var(--vds-input-padding-y) var(--vds-input-padding-x);
      box-sizing: border-box;
    }

    /* Textarea specific height */
    :host([type='textarea']) .input-wrapper {
      height: var(--vds-input-textarea-height);
      min-height: var(--vds-input-textarea-height);
      align-items: flex-start;
      padding-top: var(--vds-input-padding-y);
    }

    /* Active state - inner border */
    :host([state='active']) .input-wrapper {
      background-color: var(--vds-color-white, #ffffff);
      border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578));
    }

    /* Error state */
    :host([state='error']) .input-wrapper {
      background-color: var(--vds-color-white, #ffffff);
      border-color: var(--vds-color-red-500, #fb3145);
    }

    /* Read-only state */
    :host([state='read-only']) .input-wrapper {
      background-color: var(--vds-color-gray-300, #eaeef4);
      border-color: var(--vds-color-gray-300, #eaeef4);
    }

    /* Disabled state */
    :host([state='disabled']) .input-wrapper {
      background-color: var(--vds-color-gray-200, #f8f9fb);
      border-color: var(--vds-color-gray-300, #eaeef4);
    }

    /* For relationship type - no border radius on right */
    :host([type='relationship']) .input-wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-right: -1px;
    }

    /* For phone/currency - no border radius on left if prefix exists */
    :host([type='phone']) .input-wrapper,
    :host([type='currency']) .input-wrapper {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-left: -1px;
    }

    input,
    textarea {
      flex: 1;
      min-width: 0;
      font-family: var(--vds-input-font-family);
      font-weight: var(--vds-input-font-weight);
      font-size: var(--vds-input-font-size);
      line-height: 1;
      color: var(--vds-color-text-primary, #070922);
      background: transparent;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
    }

    textarea {
      resize: none;
      line-height: 1.5;
      height: 100%;
    }

    input::placeholder,
    textarea::placeholder {
      color: var(--vds-color-text-tertiary, #898f9a);
      opacity: 1;
    }

    :host([state='read-only']) input,
    :host([state='read-only']) textarea {
      color: var(--vds-color-text-primary, #070922);
    }

    :host([state='disabled']) input,
    :host([state='disabled']) textarea {
      color: var(--vds-color-text-disabled, #cdced3);
      cursor: not-allowed;
    }

    input:disabled,
    textarea:disabled {
      cursor: not-allowed;
    }

    ::slotted([slot='suffix-icon']) {
      font-size: var(--vds-input-icon-size);
      color: var(--vds-color-text-primary, #070922);
      display: inline-flex;
      align-items: center;
      line-height: 1;
      flex-shrink: 0;
      height: 100%;
    }

    :host([state='disabled']) ::slotted([slot='suffix-icon']) {
      color: var(--vds-color-text-disabled, #cdced3);
    }

    /* Navigation buttons (for relationship type) */
    .nav-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--vds-input-nav-button-size);
      height: 100%;
      min-height: var(--vds-input-height);
      padding: var(--vds-input-padding-x);
      background-color: var(--vds-color-gray-200, #f8f9fb);
      border: 1px solid var(--vds-color-gray-300, #eaeef4);
      border-left: none;
      cursor: pointer;
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .nav-button:first-of-type {
      border-left: 1px solid var(--vds-color-gray-300, #eaeef4);
    }

    .nav-button:last-of-type {
      border-top-right-radius: var(--vds-input-radius);
      border-bottom-right-radius: var(--vds-input-radius);
    }

    /* Active state nav buttons */
    :host([state='active'][type='relationship']) .nav-button {
      border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578));
    }

    /* Error state nav buttons */
    :host([state='error'][type='relationship']) .nav-button {
      border-color: var(--vds-color-red-500, #fb3145);
    }

    /* Disabled state nav buttons */
    :host([state='disabled']) .nav-button {
      background-color: var(--vds-color-gray-200, #f8f9fb);
      border-color: var(--vds-color-gray-300, #eaeef4);
      cursor: not-allowed;
    }

    .nav-button-icon {
      font-size: 12px;
      color: var(--vds-color-text-primary, #070922);
      display: inline-flex;
      align-items: center;
      line-height: 1;
    }

    :host([state='disabled']) .nav-button-icon {
      color: var(--vds-color-text-disabled, #cdced3);
    }

    .toggle-visibility {
      border: none;
      background: transparent;
      padding: 0;
      margin: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--vds-color-text-primary, #070922);
    }

    .toggle-visibility:focus-visible {
      outline: 2px solid var(--vds-color-brand, #00b578);
      outline-offset: 2px;
      border-radius: 999px;
    }

    .visibility-icon {
      font-size: var(--vds-input-icon-size);
      line-height: 1;
    }

    .helper-text {
      font-family: var(--vds-input-font-family);
      font-weight: var(--vds-input-font-weight);
      font-size: var(--vds-input-helper-font-size);
      line-height: 1;
      color: var(--vds-color-text-secondary, #485775);
      padding-top: var(--vds-input-gap);
    }

    :host([state='error']) .helper-text {
      color: var(--vds-color-border-error, var(--vds-color-red-500, #fb3145));
    }
  `;

  @property({ type: String, reflect: true })
  accessor type: InputType = 'text';

  @property({ type: String, reflect: true })
  accessor state: InputState = 'normal';

  @property({ type: String })
  accessor value = '';

  @property({ type: String })
  accessor placeholder = '';

  @property({ type: String })
  accessor label = '';

  @property({ type: String, attribute: 'helper-text' })
  accessor helperText = '';

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor id = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor readonly = false;

  @property({ type: String })
  accessor prefixDropdownText = '';

  @property({ type: String })
  accessor ariaLabel = '';

  @property({ type: String })
  accessor ariaDescribedBy = '';

  private showPassword = false;
  private flatpickrInstance: FlatpickrInstance | null = null;

  @query('input, textarea')
  accessor inputElement!: HTMLInputElement | HTMLTextAreaElement;

  connectedCallback(): void {
    super.connectedCallback();
    // Initialize Flatpickr after the component is connected to the DOM
    if (this.type === 'date' || this.type === 'time' || this.type === 'datetime' || this.type === 'daterange') {
      // Use requestAnimationFrame to ensure the DOM is ready
      requestAnimationFrame(() => {
        this.initDatePicker();
      });
    }
  }

  updated(changedProperties: Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);

    // Sync disabled/readonly with state
    if (changedProperties.has('state')) {
      if (this.state === 'disabled') {
        this.disabled = true;
        this.readonly = false;
      } else if (this.state === 'read-only') {
        this.readonly = true;
        this.disabled = false;
      } else {
        this.disabled = false;
        this.readonly = false;
      }
    }

    if (changedProperties.has('disabled') && this.disabled && this.state !== 'disabled') {
      this.state = 'disabled';
    }

    if (changedProperties.has('readonly') && this.readonly && this.state !== 'read-only') {
      this.state = 'read-only';
    }

    if (changedProperties.has('type') && this.type !== 'password' && this.showPassword) {
      this.showPassword = false;
      this.requestUpdate();
    }

    if (this.type === 'date' || this.type === 'time' || this.type === 'datetime' || this.type === 'daterange') {
      this.initDatePicker();
      if (changedProperties.has('value') && this.flatpickrInstance && this.value !== this.flatpickrInstance.input.value) {
        this.flatpickrInstance.setDate(this.value, false);
      }
    } else {
      this.destroyDatePicker();
    }
  }

  disconnectedCallback(): void {
    this.destroyDatePicker();
    super.disconnectedCallback();
  }

  private handleInput(event: Event): void {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = input.value;
    this.emitInputEvent(event);
  }

  private handleChange(event: Event): void {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = input.value;
    this.emitChangeEvent(event);
  }

  private handleFocus(): void {
    if (this.state === 'normal') {
      this.state = 'active';
    }
  }

  private handleBlur(): void {
    if (this.state === 'active') {
      this.state = 'normal';
    }
  }

  private handleNavButtonClick(direction: 'prev' | 'next'): void {
    if (this.disabled || this.state === 'disabled') return;

    this.dispatchEvent(
      new CustomEvent('vds-input-nav', {
        detail: { direction },
        bubbles: true,
        composed: true
      })
    );
  }

  private emitInputEvent(originalEvent: Event): void {
    const detail: InputInputEventDetail = {
      value: this.value,
      originalEvent
    };

    this.dispatchEvent(
      new CustomEvent('vds-input-input', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private emitChangeEvent(originalEvent: Event): void {
    const detail: InputChangeEventDetail = {
      value: this.value,
      originalEvent
    };

    this.dispatchEvent(
      new CustomEvent('vds-input-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const inputId = this.id || `vds-input-${Math.random().toString(36).substr(2, 9)}`;
    const isTextarea = this.type === 'textarea';
    const hasPrefix = this.type === 'phone' || this.type === 'currency';
    const hasNavButtons = this.type === 'relationship';
    const nativeInputType =
      this.type === 'relationship' || this.type === 'currency'
        ? 'text'
        : this.type === 'phone'
          ? 'tel'
          : this.type === 'email'
            ? 'email'
            : this.type === 'password'
              ? this.showPassword
                ? 'text'
                : 'password'
              : this.type === 'date' || this.type === 'time' || this.type === 'datetime' || this.type === 'daterange'
                ? 'text'
                : 'text';

    return html`
      <div class="wrapper" part="wrapper">
        ${this.label
          ? html`
              <label class="label" part="label" for=${inputId}>
                ${this.label}
                <slot name="info-icon" part="info-icon"></slot>
              </label>
            `
          : nothing}
        <div class="input-container" part="input-container">
          ${hasPrefix
            ? html`
                <vds-dropdown-button
                  part="prefix-dropdown"
                  class="prefix-dropdown"
                  button-style="regular"
                  variant="secondary"
                  type="outline"
                  size="medium"
                  ?disabled=${this.disabled || this.state === 'disabled'}
                >
                  ${this.prefixDropdownText || (this.type === 'phone' ? '+91' : '$ Dollar')}
                </vds-dropdown-button>
              `
            : nothing}
          <div class="input-wrapper" part="input-wrapper">
            ${isTextarea
              ? html`
                  <textarea
                    part="input"
                    id=${inputId}
                    name=${this.name || nothing}
                    .value=${this.value}
                    placeholder=${this.placeholder || nothing}
                    ?disabled=${this.disabled || this.state === 'disabled'}
                    ?readonly=${this.readonly || this.state === 'read-only'}
                    aria-label=${this.ariaLabel || nothing}
                    aria-describedby=${this.ariaDescribedBy || (this.helperText ? `${inputId}-desc` : nothing)}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                  ></textarea>
                `
              : html`
                  <input
                    part="input"
                    id=${inputId}
                    type=${nativeInputType}
                    name=${this.name || nothing}
                    .value=${this.value}
                    placeholder=${this.placeholder || nothing}
                    ?disabled=${this.disabled || this.state === 'disabled'}
                    ?readonly=${this.readonly || this.state === 'read-only'}
                    aria-label=${this.ariaLabel || nothing}
                    aria-describedby=${this.ariaDescribedBy || (this.helperText ? `${inputId}-desc` : nothing)}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                  />
                `}
            ${this.type === 'password'
              ? html`
                  <slot name="suffix-icon" part="suffix-icon"></slot>
                  <button
                    class="toggle-visibility"
                    part="password-toggle"
                    type="button"
                    aria-label=${this.showPassword ? 'Hide password' : 'Show password'}
                    @click=${this.togglePasswordVisibility}
                  >
                    <vds-icon
                      class="visibility-icon"
                      name=${this.showPassword ? 'eye-slash' : 'eye'}
                      aria-hidden="true"
                    ></vds-icon>
                  </button>
                `
              : html`<slot name="suffix-icon" part="suffix-icon"></slot>`}
          </div>
          ${hasNavButtons
            ? html`
                <button
                  part="nav-button-prev"
                  class="nav-button"
                  ?disabled=${this.disabled || this.state === 'disabled'}
                  type="button"
                  aria-label="Previous"
                  @click=${() => this.handleNavButtonClick('prev')}
                >
                  <vds-icon class="nav-button-icon" name="arrow-left" aria-hidden="true"></vds-icon>
                </button>
                <button
                  part="nav-button-next"
                  class="nav-button"
                  ?disabled=${this.disabled || this.state === 'disabled'}
                  type="button"
                  aria-label="Next"
                  @click=${() => this.handleNavButtonClick('next')}
                >
                  <vds-icon class="nav-button-icon" name="arrow-right" aria-hidden="true"></vds-icon>
                </button>
              `
            : nothing}
        </div>
        ${this.helperText
          ? html`
              <div class="helper-text" part="helper-text" id=${`${inputId}-desc`}>
                ${this.helperText}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const input = this.inputElement as HTMLInputElement | undefined;
    if (input) {
      input.type = this.showPassword ? 'text' : 'password';
      input.focus();
    }
    this.requestUpdate();
  }

  private initDatePicker(): void {
    const flatpickrTypes = ['date', 'time', 'datetime', 'daterange'];
    if (!flatpickrTypes.includes(this.type) || typeof window === 'undefined') return;
    
    // Query the shadow DOM directly to ensure we get the element
    // Flatpickr works with type="text" inputs
    const input = this.shadowRoot?.querySelector('input[part="input"]') as HTMLInputElement | null;
    if (!input) {
      // If not found, try using the @query decorator as fallback
      const fallbackInput = this.inputElement as HTMLInputElement | undefined;
      if (!fallbackInput) return;
      this.initializeFlatpickr(fallbackInput);
      return;
    }

    this.initializeFlatpickr(input);
  }

  private initializeFlatpickr(input: HTMLInputElement): void {
    // Don't reinitialize if already initialized on the same element
    if (this.flatpickrInstance && this.flatpickrInstance.input === input) {
      return;
    }

    // Change input type to text to avoid browser native picker conflicts
    // Flatpickr will handle the picker UI
    if (input.type === 'date' || input.type === 'time' || input.type === 'datetime-local') {
      input.type = 'text';
    }

    this.flatpickrInstance?.destroy();

    // Configure Flatpickr based on input type
    const baseConfig: any = {
      allowInput: true,
      disableMobile: true,
      defaultDate: this.value || undefined,
      onChange: (_selectedDates: Date[], dateStr: string) => {
        if (this.value === dateStr) return;
        this.value = dateStr;
        const syntheticEvent = new Event('change');
        this.emitInputEvent(syntheticEvent);
        this.emitChangeEvent(syntheticEvent);
      }
    };

    switch (this.type) {
      case 'date':
        baseConfig.dateFormat = 'Y-m-d';
        break;
      case 'time':
        baseConfig.enableTime = true;
        baseConfig.noCalendar = true;
        baseConfig.dateFormat = 'H:i';
        baseConfig.time_24hr = true;
        break;
      case 'datetime':
        baseConfig.enableTime = true;
        baseConfig.dateFormat = 'Y-m-d H:i';
        baseConfig.time_24hr = true;
        break;
      case 'daterange':
        baseConfig.mode = 'range';
        baseConfig.dateFormat = 'Y-m-d';
        break;
    }

    this.flatpickrInstance = flatpickr(input, baseConfig);
  }

  private destroyDatePicker(): void {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
      this.flatpickrInstance = null;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-input': VDSInput;
  }
}
