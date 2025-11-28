import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import flatpickr from 'flatpickr';
import type { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import 'flatpickr/dist/flatpickr.min.css';

export type DateType = 'date' | 'time' | 'datetime' | 'daterange';
export type DateState = 'normal' | 'read-only' | 'disabled' | 'error' | 'active';

export interface DateChangeEventDetail {
  value: string;
  originalEvent: Event;
}

export interface DateInputEventDetail {
  value: string;
  originalEvent: Event;
}

/**
 * VDS Date/Time Picker Component
 * 
 * @element vds-date
 * 
 * @fires vds-date-change - Fired when the date value changes and loses focus
 * @fires vds-date-input - Fired on every date value change
 * 
 * @csspart wrapper - The wrapper container
 * @csspart label - The label element (contains the label text and info icon slot)
 * @csspart info-icon - The info icon slot
 * @csspart input-container - The outer input container (for active state border ring)
 * @csspart input-wrapper - The inner input wrapper
 * @csspart input - The input element
 * @csspart suffix-icon - The suffix icon slot
 * @csspart helper-text - The helper text container
 */
@customElement('vds-date')
export class VDSDate extends LitElement {
  static styles = css`
    :host {
      display: block;
      --vds-date-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-date-font-weight: var(--vds-font-weight-normal, 400);
      --vds-date-font-size: var(--vds-font-size-md, 1rem);
      --vds-date-label-font-size: var(--vds-font-size-sm, 10.5px);
      --vds-date-helper-font-size: var(--vds-font-size-xs, 9px);
      --vds-date-padding-x: var(--vds-spacing-md, 12px);
      --vds-date-padding-y: var(--vds-spacing-sm, 6px);
      --vds-date-gap: var(--vds-spacing-xs, 3px);
      --vds-date-radius: var(--vds-radius-lg, 6px);
      --vds-date-icon-size: 13.5px;
      --vds-date-info-icon-size: 10.5px;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--vds-date-gap);
      width: 100%;
    }

    .label {
      font-family: var(--vds-date-font-family);
      font-weight: var(--vds-date-font-weight);
      font-size: var(--vds-date-label-font-size);
      line-height: 1;
      color: var(--vds-color-text-secondary, #485775);
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: var(--vds-date-gap);
    }

    :host([state='disabled']) .label {
      color: var(--vds-color-text-disabled, #cdced3);
    }

    ::slotted([slot='info-icon']) {
      font-size: var(--vds-date-info-icon-size);
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
      border-radius: var(--vds-date-radius);
      box-sizing: border-box;
    }

    :host([state='active']) .input-container {
      border-color: var(--vds-color-green-100, #e6f9f3);
    }

    /* Inner input wrapper */
    .input-wrapper {
      display: flex;
      align-items: center;
      flex: 1;
      position: relative;
      background-color: var(--vds-color-white, #ffffff);
      border: 1px solid var(--vds-color-gray-300, #eaeef4);
      border-radius: var(--vds-date-radius);
      height: var(--vds-input-height);
      min-height: var(--vds-input-height);
      gap: var(--vds-date-padding-x);
      padding: var(--vds-date-padding-y) var(--vds-date-padding-x);
      box-sizing: border-box;
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

    input {
      flex: 1;
      min-width: 0;
      font-family: var(--vds-date-font-family);
      font-weight: var(--vds-date-font-weight);
      font-size: var(--vds-date-font-size);
      line-height: 1;
      color: var(--vds-color-text-primary, #070922);
      background: transparent;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
    }

    input::placeholder {
      color: var(--vds-color-text-tertiary, #898f9a);
      opacity: 1;
    }

    :host([state='read-only']) input {
      color: var(--vds-color-text-primary, #070922);
    }

    :host([state='disabled']) input {
      color: var(--vds-color-text-disabled, #cdced3);
      cursor: not-allowed;
    }

    input:disabled {
      cursor: not-allowed;
    }

    ::slotted([slot='suffix-icon']) {
      font-size: var(--vds-date-icon-size);
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

    .helper-text {
      font-family: var(--vds-date-font-family);
      font-weight: var(--vds-date-font-weight);
      font-size: var(--vds-date-helper-font-size);
      line-height: 1;
      color: var(--vds-color-text-secondary, #485775);
      padding-top: var(--vds-date-gap);
    }

    :host([state='error']) .helper-text {
      color: var(--vds-color-border-error, var(--vds-color-red-500, #fb3145));
    }
  `;

  @property({ type: String, reflect: true })
  accessor type: DateType = 'date';

  @property({ type: String, reflect: true })
  accessor state: DateState = 'normal';

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
  accessor ariaLabel = '';

  @property({ type: String })
  accessor ariaDescribedBy = '';

  @property({ type: String, attribute: 'error-message' })
  accessor errorMessage = '';

  // Date/Time format properties
  @property({ type: String, attribute: 'date-format' })
  accessor dateFormat = 'Y-m-d';

  @property({ type: String, attribute: 'time-format' })
  accessor timeFormat = 'H:i';

  @property({ type: String, attribute: 'datetime-format' })
  accessor datetimeFormat = 'Y-m-d H:i';

  @property({ type: String, attribute: 'daterange-format' })
  accessor daterangeFormat = 'Y-m-d';

  @property({ type: Boolean, attribute: 'time-24hr' })
  accessor time24hr = true;

  // Human-friendly dates (altInput)
  @property({ type: Boolean, attribute: 'alt-input' })
  accessor altInput = false;

  @property({ type: String, attribute: 'alt-format' })
  accessor altFormat = 'F j, Y';

  // Date constraints
  @property({ type: String, attribute: 'min-date' })
  accessor minDate = '';

  @property({ type: String, attribute: 'max-date' })
  accessor maxDate = '';

  // Time constraints
  @property({ type: String, attribute: 'min-time' })
  accessor minTime = '';

  @property({ type: String, attribute: 'max-time' })
  accessor maxTime = '';

  // Disable/enable dates (as JSON string for complex values)
  @property({ type: String, attribute: 'disable-dates' })
  accessor disableDates = '';

  @property({ type: String, attribute: 'enable-dates' })
  accessor enableDates = '';

  // Multiple date selection
  @property({ type: Boolean, attribute: 'multiple-dates' })
  accessor multipleDates = false;

  @property({ type: String, attribute: 'conjunction' })
  accessor conjunction = ', ';

  // Display options
  @property({ type: Boolean, attribute: 'week-numbers' })
  accessor weekNumbers = false;

  // External elements (wrap)
  @property({ type: Boolean, attribute: 'wrap' })
  accessor wrap = false;

  private flatpickrInstance: FlatpickrInstance | null = null;

  @query('input')
  accessor inputElement!: HTMLInputElement;

  connectedCallback(): void {
    super.connectedCallback();
    // Inject Flatpickr custom styles if not already injected
    this.injectFlatpickrStyles();
    // Initialize Flatpickr after the component is connected to the DOM
    requestAnimationFrame(() => {
      this.initDatePicker();
    });
  }

  private injectFlatpickrStyles(): void {
    // Check if styles are already injected
    if (document.getElementById('vds-flatpickr-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'vds-flatpickr-styles';
    style.textContent = `
      /* VDS Flatpickr Theme - Matches VDS Design System */
      .flatpickr-calendar {
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-size: var(--vds-font-size-sm, 0.875rem) !important;
        background: var(--vds-color-white, #ffffff) !important;
        border: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
        border-radius: var(--vds-radius-lg, 0.5rem) !important;
        box-shadow: var(--vds-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)) !important;
        padding: var(--vds-spacing-sm, 0.5rem) !important;
        color: var(--vds-color-text-primary, #070922) !important;
      }

      .flatpickr-months {
        padding: var(--vds-spacing-xs, 0.25rem) 0 !important;
        margin-bottom: var(--vds-spacing-xs, 0.25rem) !important;
      }

      .flatpickr-month {
        color: var(--vds-color-text-primary, #070922) !important;
        fill: var(--vds-color-text-primary, #070922) !important;
      }

      .flatpickr-current-month {
        font-size: var(--vds-font-size-md, 1rem) !important;
        font-weight: var(--vds-font-weight-semibold, 600) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        padding: var(--vds-spacing-xs, 0.25rem) 0 !important;
      }

      .flatpickr-prev-month,
      .flatpickr-next-month {
        fill: var(--vds-color-text-secondary, #485775) !important;
        padding: var(--vds-spacing-xs, 0.25rem) !important;
        border-radius: var(--vds-radius-sm, 0.25rem) !important;
        transition: all var(--vds-transition-fast, 150ms ease-in-out) !important;
      }

      .flatpickr-prev-month:hover,
      .flatpickr-next-month:hover {
        fill: var(--vds-color-brand, #00b578) !important;
        background: var(--vds-color-gray-100, #fafbfc) !important;
      }

      .flatpickr-prev-month:active,
      .flatpickr-next-month:active {
        background: var(--vds-color-gray-200, #f8f9fb) !important;
      }

      .flatpickr-weekdays {
        background: transparent !important;
        border-bottom: 1px solid var(--vds-color-gray-200, #f8f9fb) !important;
        padding: var(--vds-spacing-xs, 0.25rem) 0 !important;
        margin-bottom: var(--vds-spacing-xs, 0.25rem) !important;
      }

      .flatpickr-weekday {
        color: var(--vds-color-text-secondary, #485775) !important;
        font-size: var(--vds-font-size-xs, 0.75rem) !important;
        font-weight: var(--vds-font-weight-medium, 500) !important;
        text-transform: uppercase !important;
        letter-spacing: 0.05em !important;
      }

      .flatpickr-days {
        padding: var(--vds-spacing-xs, 0.25rem) 0 !important;
      }

      .flatpickr-day {
        color: var(--vds-color-text-primary, #070922) !important;
        border-radius: var(--vds-radius-md, 0.375rem) !important;
        border: 1px solid transparent !important;
        font-size: var(--vds-font-size-sm, 0.875rem) !important;
        font-weight: var(--vds-font-weight-normal, 400) !important;
        transition: all var(--vds-transition-fast, 150ms ease-in-out) !important;
        margin: 1px !important;
      }

      .flatpickr-day:hover {
        background: var(--vds-color-gray-100, #fafbfc) !important;
        border-color: var(--vds-color-gray-300, #eaeef4) !important;
        color: var(--vds-color-text-primary, #070922) !important;
      }

      .flatpickr-day.today {
        border-color: var(--vds-color-brand, #00b578) !important;
        color: var(--vds-color-brand, #00b578) !important;
        font-weight: var(--vds-font-weight-semibold, 600) !important;
      }

      .flatpickr-day.today:hover {
        background: var(--vds-color-green-100, #e6f9f3) !important;
        border-color: var(--vds-color-brand, #00b578) !important;
      }

      .flatpickr-day.selected,
      .flatpickr-day.startRange,
      .flatpickr-day.endRange {
        background: var(--vds-color-brand, #00b578) !important;
        border-color: var(--vds-color-brand, #00b578) !important;
        color: var(--vds-color-white, #ffffff) !important;
        font-weight: var(--vds-font-weight-semibold, 600) !important;
        box-shadow: none !important;
      }

      .flatpickr-day.selected:hover,
      .flatpickr-day.startRange:hover,
      .flatpickr-day.endRange:hover {
        background: var(--vds-color-brand-hover, #009d68) !important;
        border-color: var(--vds-color-brand-hover, #009d68) !important;
      }

      .flatpickr-day.inRange {
        background: var(--vds-color-green-100, #e6f9f3) !important;
        border-color: var(--vds-color-green-200, #b3efd9) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        box-shadow: -2px 0 0 var(--vds-color-green-100, #e6f9f3), 2px 0 0 var(--vds-color-green-100, #e6f9f3) !important;
      }

      .flatpickr-day.inRange:hover {
        background: var(--vds-color-green-200, #b3efd9) !important;
      }

      .flatpickr-day.flatpickr-disabled,
      .flatpickr-day.prevMonthDay,
      .flatpickr-day.nextMonthDay {
        color: var(--vds-color-text-disabled, #cdced3) !important;
        cursor: not-allowed !important;
      }

      .flatpickr-day.flatpickr-disabled:hover,
      .flatpickr-day.prevMonthDay:hover,
      .flatpickr-day.nextMonthDay:hover {
        background: transparent !important;
        border-color: transparent !important;
      }

      /* Time picker styles */
      .flatpickr-time {
        border-top: 1px solid var(--vds-color-gray-200, #f8f9fb) !important;
        padding: var(--vds-spacing-sm, 0.5rem) 0 !important;
      }

      .flatpickr-time input {
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-size: var(--vds-font-size-sm, 0.875rem) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        background: transparent !important;
        border: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
        border-radius: var(--vds-radius-md, 0.375rem) !important;
        padding: var(--vds-spacing-xs, 0.25rem) var(--vds-spacing-sm, 0.5rem) !important;
        transition: all var(--vds-transition-fast, 150ms ease-in-out) !important;
      }

      .flatpickr-time input:hover {
        border-color: var(--vds-color-brand, #00b578) !important;
      }

      .flatpickr-time input:focus {
        outline: none !important;
        border-color: var(--vds-color-brand, #00b578) !important;
        box-shadow: 0 0 0 3px var(--vds-color-green-100, #e6f9f3) !important;
      }

      .flatpickr-time .flatpickr-time-separator {
        color: var(--vds-color-text-secondary, #485775) !important;
      }

      .flatpickr-am-pm {
        color: var(--vds-color-text-primary, #070922) !important;
        border: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
        border-radius: var(--vds-radius-md, 0.375rem) !important;
        padding: var(--vds-spacing-xs, 0.25rem) var(--vds-spacing-sm, 0.5rem) !important;
        transition: all var(--vds-transition-fast, 150ms ease-in-out) !important;
      }

      .flatpickr-am-pm:hover {
        background: var(--vds-color-gray-100, #fafbfc) !important;
        border-color: var(--vds-color-brand, #00b578) !important;
      }

      .flatpickr-am-pm.selected {
        background: var(--vds-color-brand, #00b578) !important;
        border-color: var(--vds-color-brand, #00b578) !important;
        color: var(--vds-color-white, #ffffff) !important;
      }

      /* Dark mode support */
      [data-theme="dark"] .flatpickr-calendar {
        background: var(--vds-color-dark-800, #14151c) !important;
        border-color: var(--vds-color-dark-500, #3b3c48) !important;
        color: var(--vds-color-text-primary, var(--vds-color-slate-100)) !important;
      }

      [data-theme="dark"] .flatpickr-month,
      [data-theme="dark"] .flatpickr-current-month {
        color: var(--vds-color-text-primary, var(--vds-color-slate-100)) !important;
        fill: var(--vds-color-text-primary, var(--vds-color-slate-100)) !important;
      }

      [data-theme="dark"] .flatpickr-prev-month,
      [data-theme="dark"] .flatpickr-next-month {
        fill: var(--vds-color-text-secondary, var(--vds-color-slate-300)) !important;
      }

      [data-theme="dark"] .flatpickr-prev-month:hover,
      [data-theme="dark"] .flatpickr-next-month:hover {
        fill: var(--vds-color-brand, #00b578) !important;
        background: var(--vds-color-dark-700, #1e1f29) !important;
      }

      [data-theme="dark"] .flatpickr-weekday {
        color: var(--vds-color-text-secondary, var(--vds-color-slate-300)) !important;
      }

      [data-theme="dark"] .flatpickr-day {
        color: var(--vds-color-text-primary, var(--vds-color-slate-100)) !important;
      }

      [data-theme="dark"] .flatpickr-day:hover {
        background: var(--vds-color-dark-700, #1e1f29) !important;
        border-color: var(--vds-color-dark-500, #3b3c48) !important;
      }

      [data-theme="dark"] .flatpickr-day.inRange {
        background: var(--vds-color-green-900, #003522) !important;
        border-color: var(--vds-color-green-800, #00573a) !important;
        box-shadow: -2px 0 0 var(--vds-color-green-900, #003522), 2px 0 0 var(--vds-color-green-900, #003522) !important;
      }

      [data-theme="dark"] .flatpickr-day.flatpickr-disabled,
      [data-theme="dark"] .flatpickr-day.prevMonthDay,
      [data-theme="dark"] .flatpickr-day.nextMonthDay {
        color: var(--vds-color-text-disabled, var(--vds-color-slate-600)) !important;
      }

      [data-theme="dark"] .flatpickr-time input {
        background: var(--vds-color-dark-700, #1e1f29) !important;
        border-color: var(--vds-color-dark-500, #3b3c48) !important;
        color: var(--vds-color-text-primary, var(--vds-color-slate-100)) !important;
      }

      [data-theme="dark"] .flatpickr-time input:hover {
        border-color: var(--vds-color-brand, #00b578) !important;
      }

      [data-theme="dark"] .flatpickr-am-pm {
        background: var(--vds-color-dark-700, #1e1f29) !important;
        border-color: var(--vds-color-dark-500, #3b3c48) !important;
        color: var(--vds-color-text-primary, var(--vds-color-slate-100)) !important;
      }

      [data-theme="dark"] .flatpickr-am-pm:hover {
        background: var(--vds-color-dark-600, #2c2d38) !important;
      }
    `;
    document.head.appendChild(style);
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

    // Reinitialize Flatpickr if any Flatpickr-related properties changed
    if (
      changedProperties.has('type') ||
      changedProperties.has('dateFormat') ||
      changedProperties.has('timeFormat') ||
      changedProperties.has('datetimeFormat') ||
      changedProperties.has('daterangeFormat') ||
      changedProperties.has('time24hr') ||
      changedProperties.has('altInput') ||
      changedProperties.has('altFormat') ||
      changedProperties.has('minDate') ||
      changedProperties.has('maxDate') ||
      changedProperties.has('minTime') ||
      changedProperties.has('maxTime') ||
      changedProperties.has('disableDates') ||
      changedProperties.has('enableDates') ||
      changedProperties.has('multipleDates') ||
      changedProperties.has('conjunction') ||
      changedProperties.has('weekNumbers') ||
      changedProperties.has('wrap')
    ) {
      this.initDatePicker();
    } else if (changedProperties.has('value') && this.flatpickrInstance && this.value !== this.flatpickrInstance.input.value) {
      this.flatpickrInstance.setDate(this.value, false);
    }
  }

  disconnectedCallback(): void {
    this.destroyDatePicker();
    super.disconnectedCallback();
  }

  private handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.emitInputEvent(event);
  }

  private handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.emitChangeEvent(event);
  }

  private handleFocus(): void {
    if (this.state === 'normal') {
      this.state = 'active';
    }
  }

  private handleBlur(): void {
    // Only reset to normal if currently active (not error)
    if (this.state === 'active') {
      this.state = 'normal';
    }
  }

  private emitInputEvent(originalEvent: Event): void {
    const detail: DateInputEventDetail = {
      value: this.value,
      originalEvent
    };

    this.dispatchEvent(
      new CustomEvent('vds-date-input', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private emitChangeEvent(originalEvent: Event): void {
    const detail: DateChangeEventDetail = {
      value: this.value,
      originalEvent
    };

    this.dispatchEvent(
      new CustomEvent('vds-date-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const inputId = this.id || `vds-date-${Math.random().toString(36).substr(2, 9)}`;

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
          <div class="input-wrapper" part="input-wrapper">
            <input
              part="input"
              id=${inputId}
              type="text"
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
            <slot name="suffix-icon" part="suffix-icon"></slot>
          </div>
        </div>
        ${this.helperText || (this.state === 'error' && this.errorMessage)
          ? html`
              <div class="helper-text" part="helper-text" id=${`${inputId}-desc`}>
                ${this.state === 'error' && this.errorMessage ? this.errorMessage : this.helperText}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private initDatePicker(): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    // Query the shadow DOM directly to ensure we get the element
    // Flatpickr works with type="text" inputs
    const input = this.shadowRoot?.querySelector('input[part="input"]') as HTMLInputElement | null;
    if (!input) {
      // If not found, try using the @query decorator as fallback
      const fallbackInput = this.inputElement as HTMLInputElement | undefined;
      if (!fallbackInput) {
        // Retry after a short delay if input still not found
        setTimeout(() => {
          const retryInput = this.shadowRoot?.querySelector('input[part="input"]') as HTMLInputElement | null;
          if (retryInput) {
            this.initializeFlatpickr(retryInput);
          }
        }, 50);
        return;
      }
      this.initializeFlatpickr(fallbackInput);
      return;
    }

    this.initializeFlatpickr(input);
  }

  private initializeFlatpickr(input: HTMLInputElement): void {
    if (!input) {
      return;
    }

    // Only destroy if instance exists and is attached to a different input
    if (this.flatpickrInstance) {
      if (this.flatpickrInstance.input === input) {
        // Same input, instance already exists - don't reinitialize
        return;
      }
      // Different input, destroy old instance
      try {
        this.flatpickrInstance.destroy();
      } catch (e) {
        // Ignore destroy errors
      }
      this.flatpickrInstance = null;
    }

    // Change input type to text to avoid browser native picker conflicts
    // Flatpickr will handle the picker UI
    if (input.type === 'date' || input.type === 'time' || input.type === 'datetime-local') {
      input.type = 'text';
    }

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

    // Human-friendly dates (altInput)
    if (this.altInput) {
      baseConfig.altInput = true;
      baseConfig.altFormat = this.altFormat;
    }

    // Date constraints
    if (this.minDate) {
      baseConfig.minDate = this.minDate;
    }
    if (this.maxDate) {
      baseConfig.maxDate = this.maxDate;
    }

    // Time constraints
    if (this.minTime) {
      baseConfig.minTime = this.minTime;
    }
    if (this.maxTime) {
      baseConfig.maxTime = this.maxTime;
    }

    // Disable dates
    if (this.disableDates) {
      try {
        const disableValue = JSON.parse(this.disableDates);
        baseConfig.disable = Array.isArray(disableValue) ? disableValue : [disableValue];
      } catch (e) {
        // If not JSON, treat as single date string
        baseConfig.disable = [this.disableDates];
      }
    }

    // Enable dates (opposite of disable)
    if (this.enableDates) {
      try {
        const enableValue = JSON.parse(this.enableDates);
        baseConfig.enable = Array.isArray(enableValue) ? enableValue : [enableValue];
      } catch (e) {
        // If not JSON, treat as single date string
        baseConfig.enable = [this.enableDates];
      }
    }

    // Display options
    if (this.weekNumbers) {
      baseConfig.weekNumbers = true;
    }
    if (this.wrap) {
      baseConfig.wrap = true;
    }

    switch (this.type) {
      case 'date':
        baseConfig.dateFormat = this.dateFormat;
        // Multiple dates mode
        if (this.multipleDates) {
          baseConfig.mode = 'multiple';
          baseConfig.conjunction = this.conjunction;
        }
        break;
      case 'time':
        baseConfig.enableTime = true;
        baseConfig.noCalendar = true;
        baseConfig.dateFormat = this.timeFormat;
        baseConfig.time_24hr = this.time24hr;
        break;
      case 'datetime':
        baseConfig.enableTime = true;
        baseConfig.dateFormat = this.datetimeFormat;
        baseConfig.time_24hr = this.time24hr;
        break;
      case 'daterange':
        baseConfig.mode = 'range';
        baseConfig.dateFormat = this.daterangeFormat;
        break;
    }

    try {
      this.flatpickrInstance = flatpickr(input, baseConfig);
    } catch (error) {
      console.error('Failed to initialize Flatpickr:', error);
    }
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
    'vds-date': VDSDate;
  }
}

