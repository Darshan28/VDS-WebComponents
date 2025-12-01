import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import Choices from 'choices.js';
import type { Options as ChoicesOptions } from 'choices.js';
import '../vds-icon/vds-icon.js';
import '../vds-avatar/vds-avatar.js'; // Import vds-avatar

export type SelectState = 'normal' | 'read-only' | 'disabled' | 'error' | 'active';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  groupValue?: string;
  avatar?: string; // URL for avatar image
  customData?: Record<string, unknown>; // Additional custom data for templates
}

export interface SelectChangeEventDetail {
  value: string | string[];
  selectedOptions: SelectOption[];
  originalEvent: Event;
}

/**
 * VDS Select Component
 * 
 * @element vds-select
 * 
 * @fires vds-select-change - Fired when the select value changes
 * @fires vds-select-add-item - Fired when an item is added (multiple mode)
 * @fires vds-select-remove-item - Fired when an item is removed (multiple mode)
 * 
 * @csspart wrapper - The wrapper container
 * @csspart label - The label element
 * @csspart info-icon - The info icon slot
 * @csspart select - The select element container
 * @csspart helper-text - The helper text container
 */
@customElement('vds-select')
export class VDSSelect extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      display: block;
      --vds-select-font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --vds-select-font-weight: var(--vds-font-weight-normal, 400);
      --vds-select-font-size: var(--vds-font-size-md, 1rem);
      --vds-select-label-font-size: var(--vds-font-size-sm, 10.5px);
      --vds-select-helper-font-size: var(--vds-font-size-xs, 9px);
      --vds-select-padding-x: var(--vds-spacing-md, 12px);
      --vds-select-padding-y: var(--vds-spacing-sm, 6px);
      --vds-select-gap: var(--vds-spacing-sm, 3px);
      // --vds-select-height: 28px;
      --vds-select-radius: var(--vds-radius-lg, 0.5rem);
      --vds-select-info-icon-size: 10.5px;
      --vds-select-bg: var(--vds-color-white, #ffffff);
      --vds-select-dropdown-width: 100%;
      --vds-select-dropdown-min-width: auto;
      --vds-select-dropdown-max-width: none;
      --vds-select-border-color: var(--vds-color-gray-300, #eaeef4);
      --vds-select-text-color: var(--vds-color-text-primary, #070922);
      --vds-select-placeholder-color: var(--vds-color-text-tertiary, #898f9a);
      --vds-select-disabled-bg: var(--vds-color-gray-200, #f8f9fb);
      --vds-select-disabled-text: var(--vds-color-text-disabled, #cdced3);
      --vds-select-error-border: var(--vds-color-red-500, #fb3145);
      --vds-select-active-border: var(--vds-color-brand, var(--vds-color-green-500, #00b578));
      --vds-select-active-shadow: 0 0 0 3px var(--vds-color-green-100, #e6f9f3);
      --vds-select-height-calc: calc(var(--vds-select-padding-y) * 2 + var(--vds-select-font-size) * var(--vds-line-height-normal, 1.5));
    --vds-avatar-padding: 0px !important;
      }


    .wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--vds-select-gap);
      width: 100%;
    }

    .label {
      font-family: var(--vds-select-font-family);
      font-weight: var(--vds-select-font-weight);
      font-size: var(--vds-select-label-font-size);
      color: var(--vds-color-text-secondary, #485775);
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: var(--vds-select-gap);
    }

    :host([state='disabled']) .label {
      color: var(--vds-select-disabled-text);
    }

    ::slotted([slot='info-icon']) {
      font-size: var(--vds-select-info-icon-size);
      color: var(--vds-color-text-secondary, #485775);
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }

    :host([state='disabled']) ::slotted([slot='info-icon']) {
      color: var(--vds-select-disabled-text);
    }

    .select-container {
      position: relative;
      min-height: var(--vds-select-height);
      width: 100%;
    }

    /* Choices.js styling overrides to match VDS design system */
    :host ::slotted(select),
    .choices {
      font-family: var(--vds-select-font-family);
      font-size: var(--vds-select-font-size);
      font-weight: var(--vds-select-font-weight);
    }

    /* Choices.js container - ensure it's visible */
    .choices {
      position: relative;
      margin-bottom: 0;
      width: 100%;
      display: block;
    }
    
    /* Ensure Choices.js inner container is visible */
    :host .choices__inner {
      display: flex !important;
      visibility: visible !important;
      justify-content: space-between !important;
    }

    /* Single select input */
    .choices__inner {
      background-color: var(--vds-color-white, #ffffff) !important;
      border: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
      border-radius: var(--vds-select-radius) !important;
      padding: var(--vds-select-padding-y) var(--vds-select-padding-x) !important;
      min-height: var(--vds-select-height) !important;
      // height: var(--vds-select-height) !important;
      font-size: var(--vds-select-font-size) !important;
      font-family: var(--vds-select-font-family) !important;
      font-weight: var(--vds-select-font-weight) !important;
      color: var(--vds-select-text-color) !important;
      transition: border-color var(--vds-transition-base, 200ms ease-in-out),
                  box-shadow var(--vds-transition-base, 200ms ease-in-out) !important;
      box-sizing: border-box !important;
      display: flex !important;
      align-items: center !important;
      cursor: pointer !important;
      visibility: visible !important;
      box-shadow: none !important;
    }

    :host([state='active']) .choices__inner {
      border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
      box-shadow: 0 0 0 3px var(--vds-color-green-100, #e6f9f3) !important;
    }

    :host([state='error']) .choices__inner {
      border-color: var(--vds-color-red-500, #fb3145) !important;
      box-shadow: none !important;
    }

    :host([state='read-only']) .choices__inner {
      background-color: var(--vds-color-gray-300, #eaeef4) !important;
      border-color: var(--vds-color-gray-300, #eaeef4) !important;
      box-shadow: none !important;
    }

    :host([state='disabled']) .choices__inner {
      background-color: var(--vds-color-gray-200, #f8f9fb) !important;
      border-color: var(--vds-color-gray-300, #eaeef4) !important;
      cursor: not-allowed !important;
      box-shadow: none !important;
    }

    /* Placeholder */
    .choices__placeholder {
      opacity: 1;
      color: var(--vds-select-placeholder-color);
    }

    /* Input field (for search) */
    .choices__input {
      background-color: transparent !important;
      font-size: var(--vds-select-font-size) !important;
      font-family: var(--vds-select-font-family) !important;
      font-weight: var(--vds-select-font-weight) !important;
      color: var(--vds-select-text-color) !important;
      border: none !important;
      padding: 8px 16 !important;
      margin: 0 !important;
    }
    
    .choices__input--cloned {
      display: none !important;
    }

    .choices__input::placeholder {
      color: var(--vds-select-placeholder-color);
      opacity: 1;
    }

    /* Single select display */
    .choices__list--single .choices__item {
      padding: 0 !important;
      color: var(--vds-select-text-color);
      display: flex;
      align-items: center;
      gap: var(--vds-select-gap);
    }

    /* Multiple select - selected items */
    .choices__list--multiple .choices__item {
      background-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
      border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
      color: var(--vds-color-white, #ffffff) !important;
      padding: 2px var(--vds-spacing-sm, 8px) !important;
      margin: 2px !important;
      border-radius: var(--vds-radius-md, 0.375rem) !important;
      font-size: var(--vds-font-size-sm, 0.875rem) !important;
      font-family: var(--vds-select-font-family) !important;
    }

    .choices__list--multiple .choices__item.is-highlighted {
      background-color: var(--vds-color-brand-hover, var(--vds-color-green-600, #009d68)) !important;
      border-color: var(--vds-color-brand-hover, var(--vds-color-green-600, #009d68)) !important;
    }

    .choices__button {
      background-image: url("data:image/svg+xml,%3Csvg width='21' height='21' viewBox='0 0 21 21' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.592.044l18.364 18.364-2.548 2.548L.044 2.592z'/%3E%3Cpath d='M0 18.364L18.364 0l2.548 2.548L2.548 20.912z'/%3E%3C/svg%3E");
      border: none;
      width: 8px;
      height: 8px;
      padding: 0;
      margin-left: 4px;
      opacity: 0.75;
    }

    .choices__button:hover,
    .choices__button:focus {
      opacity: 1;
    }

    /* Hide default Choices.js arrow */
    .choices__arrow {
      display: none !important;
    }

    /* Custom chevron icon */
    .chevron-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 12px;
      color: var(--vds-select-text-color);
      transition: transform var(--vds-transition-base, 200ms ease-in-out);
      pointer-events: none;
    }

    .chevron-icon.open {
      transform: rotate(180deg);
    }

    :host([state='disabled']) .chevron-icon {
      color: var(--vds-select-disabled-text);
    }



    /* Dropdown list */
    .choices__list--dropdown {
    width: 100% !important;
      background-color: var(--vds-color-white, #ffffff) !important;
      border: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
      border-radius: var(--vds-select-radius) !important;
      box-shadow: var(--vds-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)) !important;
      margin-top: 4px !important;
      max-height: 300px !important;
      overflow-y: auto !important;
      z-index: var(--vds-z-index-dropdown, 1000) !important;
    }

    .choices__list--dropdown.is-active {
        border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
        width: 100% !important;
      }

    /* Dropdown items */
    .choices__list--dropdown .choices__item {
      display: flex;
      align-items: center;
      gap: var(--vds-select-gap);
      padding: var(--vds-select-padding-y) var(--vds-select-padding-x) !important;
      font-size: var(--vds-select-font-size) !important;
      font-family: var(--vds-select-font-family) !important;
      color: var(--vds-select-text-color) !important;
      line-height: var(--vds-line-height-normal, 1.5) !important;
    }

    .choices__list--dropdown .choices__item--selectable.is-highlighted {
      background-color: var(--vds-color-green-100, #e6f9f3) !important;
      color: var(--vds-select-text-color) !important;
    }

    .choices__list--dropdown .choices__item--selectable.is-selected {
      background-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
      color: var(--vds-color-white, #ffffff) !important;
    }
    
    .choices__list--dropdown .choices__item--selectable.is-selected.is-highlighted {
      background-color: var(--vds-color-brand-hover, var(--vds-color-green-600, #009d68)) !important;
    }

    .choices__list--dropdown .choices__item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Group labels */
    .choices__heading {
      font-size: var(--vds-font-size-sm, 0.875rem) !important;
      font-weight: var(--vds-font-weight-semibold, 600) !important;
      font-family: var(--vds-select-font-family) !important;
      color: var(--vds-color-text-secondary, #485775) !important;
      padding: var(--vds-select-padding-y) var(--vds-select-padding-x) !important;
      border-bottom: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
    }

    /* Helper text */
    .helper-text {
      font-family: var(--vds-select-font-family);
      font-weight: var(--vds-select-font-weight);
      font-size: var(--vds-select-helper-font-size);
      color: var(--vds-color-text-secondary, #485775);
      padding-top: var(--vds-select-gap);
    }

    :host([state='error']) .helper-text {
      color: var(--vds-color-border-error, var(--vds-color-red-500, #fb3145));
    }

    /* Hide native select - Choices.js will replace it with its own UI */
    /* Don't hide with display:none as Choices.js needs to read the element */
    ::slotted(select) {
      position: absolute;
      left: -9999px;
      width: 1px;
      opacity: 0;
    }
    
    .select-container > select {
      /* Keep select accessible for Choices.js initialization */
      position: absolute;
      left: -9999px;
      width: 1px;
      opacity: 0;
    }
  `;

  @property({ type: String, reflect: true })
  accessor state: SelectState = 'normal';

  @property({ type: String })
  accessor value: string | string[] = '';

  @property({ type: String })
  accessor placeholder = '';

  @property({ type: String })
  accessor label = '';

  @property({ type: String, attribute: 'helper-text' })
  accessor helperText = '';

  @property({ type: String, attribute: 'error-message' })
  accessor errorMessage = '';

  @property({ type: String })
  accessor name = '';

  @property({ type: String })
  accessor id = '';

  @property({ type: Boolean, reflect: true })
  accessor disabled = false;

  @property({ type: Boolean, reflect: true })
  accessor readonly = false;

  @property({ type: Boolean, attribute: 'multiple' })
  accessor multiple = false;

  @property({ type: Boolean, attribute: 'search-enabled' })
  accessor searchEnabled = true;

  @property({ type: Boolean, attribute: 'remove-item-button' })
  accessor removeItemButton = false;

  @property({ type: Boolean, attribute: 'unique-values-only' })
  accessor uniqueValuesOnly = false;

  @property({ type: String, attribute: 'no-results-text' })
  accessor noResultsText = 'No results found';

  @property({ type: String, attribute: 'no-choices-text' })
  accessor noChoicesText = 'No choices to choose from';

  @property({ type: String, attribute: 'item-select-text' })
  accessor itemSelectText = 'Press to select';

  @property({ type: Boolean, attribute: 'add-items' })
  accessor addItems = false;

  @property({ type: String, attribute: 'add-item-text' })
  accessor addItemText = 'Press Enter to add';

  @property({ type: String })
  accessor ariaLabel = '';

  @property({ type: String })
  accessor ariaDescribedBy = '';

  private _options: SelectOption[] = [];

  private choicesInstance: InstanceType<typeof Choices> | null = null;

  private selectElement: HTMLSelectElement | null = null;
  private preventFocusAfterSelection = false;
  private isInitializing = false; // Flag to track initialization state
  private static stylesInjected = false;
  private static cssLoaded = false;
  
  @state()
  accessor isDropdownOpen = false;

  private resizeObserver: ResizeObserver | null = null;
  private overflowCheckTimeout: number | null = null; // Can be setTimeout or requestAnimationFrame ID
  private isCheckingOverflow = false; // Flag to prevent re-entrancy

  connectedCallback(): void {
    super.connectedCallback();
    // Load Choices.js CSS from npm package
    this.loadChoicesCSS();
    // Initialize immediately - no delay needed
    this.initSelect();
  }

  private loadChoicesCSS(): void {
    if (VDSSelect.cssLoaded) return;
    
    // Check if CSS is already loaded
    if (document.querySelector('link[href*="choices"]') || document.querySelector('style[data-choices-css]')) {
      VDSSelect.cssLoaded = true;
      return;
    }

    // Load CSS from npm package using Vite's asset handling
    // Vite will resolve this from node_modules during dev/build
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    // Use import.meta.url to resolve relative to module
    // In Vite, we can use a direct path that gets resolved
    link.href = new URL('choices.js/public/assets/styles/choices.min.css', import.meta.url).href;
    link.onload = () => {
      VDSSelect.cssLoaded = true;
    };
    link.onerror = () => {
      // Fallback: try alternative path resolution
      const fallbackLink = document.createElement('link');
      fallbackLink.rel = 'stylesheet';
      // Try node_modules path (works in Vite dev server)
      fallbackLink.href = '/node_modules/choices.js/public/assets/styles/choices.min.css';
      fallbackLink.onload = () => {
        VDSSelect.cssLoaded = true;
      };
      fallbackLink.onerror = () => {
        console.warn('vds-select: Could not load Choices.js CSS automatically. Please import it manually: import "choices.js/public/assets/styles/choices.min.css"');
      };
      document.head.appendChild(fallbackLink);
    };
    document.head.appendChild(link);
  }

  firstUpdated(): void {
    // Also try on first update - initialize immediately if select element exists
    if (this.shadowRoot?.querySelector('select') || this.querySelector('select')) {
      this.initSelect();
    }
  }

  private initSelect(): void {
    // Skip if already initialized with a valid instance
    if (this.choicesInstance) {
      try {
        // Check if the instance is still valid
        const element = this.choicesInstance.passedElement?.element;
        if (element && element.isConnected) {
          return; // Already initialized and valid
        }
      } catch (e) {
        // Instance is invalid, destroy it
        this.destroyChoices();
      }
    }

    // Check for slotted select element first (in light DOM)
    const slottedSelect = this.querySelector('select') as HTMLSelectElement | null;
    if (slottedSelect && slottedSelect.isConnected) {
      this.selectElement = slottedSelect;
      // Sync attributes
      if (this.multiple) {
        slottedSelect.multiple = true;
      }
      if (this.name) {
        slottedSelect.name = this.name;
      }
      if (this.id) {
        slottedSelect.id = this.id;
      }
      // Read options from slotted select
      if (this._options.length === 0) {
        this.readOptionsFromSelect();
      }
      // Only initialize if we have options
      if (slottedSelect.options.length > 0 || this._options.length > 0) {
        this.initializeChoices();
      }
      return;
    }

    // Use rendered select element from shadow DOM
    const renderedSelect = this.shadowRoot?.querySelector('select') as HTMLSelectElement | null;
    if (renderedSelect) {
      this.selectElement = renderedSelect;
      if (this._options.length === 0) {
        // Read options from rendered select if no programmatic options
        this.readOptionsFromSelect();
      }
      // Only initialize if we have options
      if (renderedSelect.options.length > 0 || this._options.length > 0) {
        this.initializeChoices();
      }
    }
  }

  private handleSlotChange(): void {
    // Re-check for slotted select when slot changes
    this.initSelect();
  }

  private readOptionsFromSelect(): void {
    if (!this.selectElement) return;

    const options: SelectOption[] = [];
    const optgroups = Array.from(this.selectElement.querySelectorAll('optgroup')) as HTMLOptGroupElement[];
    const directOptions = Array.from(this.selectElement.querySelectorAll(':scope > option')) as HTMLOptionElement[];

    // Read direct options
    directOptions.forEach(opt => {
      if (opt.value || opt.textContent) {
        options.push({
          value: opt.value,
          label: opt.textContent || opt.value,
          disabled: opt.disabled,
          selected: opt.selected
        });
      }
    });

    // Read options from optgroups
    optgroups.forEach(group => {
      const groupLabel = group.label;
      Array.from(group.querySelectorAll('option') as NodeListOf<HTMLOptionElement>).forEach(opt => {
        if (opt.value || opt.textContent) {
          options.push({
            value: opt.value,
            label: opt.textContent || opt.value,
            disabled: opt.disabled,
            selected: opt.selected,
            groupValue: groupLabel
          });
        }
      });
    });

    if (options.length > 0) {
      // Store options synchronously (not reactive to avoid conflicts)
      this._options = options;
      // Don't trigger update here - initialization will handle it
      // This is called during initSelect, so we avoid conflicts with Lit's update cycle
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.destroyChoices();
    // Clean up focus observer if it exists
    if ((this as any).__focusObserver) {
      (this as any).__focusObserver.disconnect();
      (this as any).__focusObserver = null;
    }
    // Clean up resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    // Clear overflow check timeout/animation frame
    if (this.overflowCheckTimeout !== null) {
      cancelAnimationFrame(this.overflowCheckTimeout);
      this.overflowCheckTimeout = null;
    }
    // Clean up remove button observer
    if ((this as any).__removeButtonObserver) {
      (this as any).__removeButtonObserver.disconnect();
      (this as any).__removeButtonObserver = null;
    }
    // Clean up input observer
    if ((this as any).__inputObserver) {
      (this as any).__inputObserver.disconnect();
      (this as any).__inputObserver = null;
    }
    // Clean up placeholder watcher
    if ((this as any).__placeholderInputWatcher) {
      (this as any).__placeholderInputWatcher.disconnect();
      (this as any).__placeholderInputWatcher = null;
    }
    // Clean up placeholder observers and intervals
    if (this.selectElement) {
      const container = this.selectElement.closest('.choices') as HTMLElement;
      if (container) {
        const inputs = container.querySelectorAll('.choices__input');
        inputs.forEach((input) => {
          const inputEl = input as HTMLInputElement;
          if ((inputEl as any).__placeholderObserver) {
            ((inputEl as any).__placeholderObserver as MutationObserver).disconnect();
            (inputEl as any).__placeholderObserver = null;
          }
          if ((inputEl as any).__placeholderCheckInterval) {
            clearInterval((inputEl as any).__placeholderCheckInterval);
            (inputEl as any).__placeholderCheckInterval = null;
          }
        });
      }
    }
    // Clean up avatar observer
    if ((this as any).__avatarObserver) {
      (this as any).__avatarObserver.disconnect();
      (this as any).__avatarObserver = null;
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

    // Reinitialize Choices when key properties change
    // Note: We don't check for '_options' here to avoid conflicts - 
    // initialization will happen via setOptions or connectedCallback
    if (
      changedProperties.has('multiple') ||
      changedProperties.has('searchEnabled') ||
      changedProperties.has('placeholder') ||
      changedProperties.has('addItems') ||
      changedProperties.has('addItemText')
    ) {
      this.updateComplete.then(() => {
        this.destroyChoices();
        this.initializeChoices();
      });
    }

    // Update value in Choices when value property changes programmatically
    if (changedProperties.has('value') && this.choicesInstance) {
      this.updateChoicesValue();
    }
  }

  private initializeChoices(): void {
    if (!this.selectElement) {
      return;
    }

    // Don't reinitialize if already initialized with the same element
    if (this.choicesInstance) {
      try {
        const currentElement = this.choicesInstance.passedElement?.element as HTMLSelectElement;
        if (currentElement === this.selectElement && currentElement.isConnected) {
          return; // Already initialized correctly
        }
      } catch (e) {
        // Instance is invalid, destroy it
        this.destroyChoices();
      }
    }

    // Destroy existing instance if any
    if (this.choicesInstance) {
      this.destroyChoices();
    }

    // Ensure select element has options before initializing Choices
    if (this.selectElement.options.length === 0 && this._options.length === 0) {
      return; // No options to show
    }

    // Make sure the select element is accessible (not hidden) when initializing
    const originalDisplay = this.selectElement.style.display;
    const originalVisibility = this.selectElement.style.visibility;
    this.selectElement.style.display = 'block';
    this.selectElement.style.visibility = 'visible';
    this.selectElement.style.position = 'absolute';
    this.selectElement.style.left = '-9999px';

    const placeholderValue = this.placeholder || undefined;
    
    // For multi-select, always enable search in dropdown (even if searchEnabled is false)
    // Search will appear in the dropdown, not inline
    const shouldEnableSearch = this.searchEnabled && !this.readonly && !this.disabled;
    const forceSearchForMultiple = this.multiple; // Force search for all multi-select dropdowns
    
    const options: Partial<ChoicesOptions> = {
      removeItemButton: this.removeItemButton,
      // Enable search if explicitly enabled OR if it's a multi-select (search in dropdown)
      searchEnabled: shouldEnableSearch || forceSearchForMultiple,
      itemSelectText: this.itemSelectText,
      placeholder: placeholderValue ? true : false,
      placeholderValue: placeholderValue,
      // For both single and multiple select, use searchPlaceholderValue for dropdown search
      searchPlaceholderValue: placeholderValue || 'Search...',
      noResultsText: this.noResultsText,
      noChoicesText: this.noChoicesText,
      uniqueItemText: 'Only unique values can be added',
      shouldSort: false,
      silent: true // Use silent mode during initialization to prevent auto-opening
    };
    
    // Add addItems option if enabled (cast to any since type definition may not include it)
    if (this.addItems && !this.readonly && !this.disabled) {
      (options as any).addItems = true;
      (options as any).addItemText = this.addItemText;
    }

    // Disable search only if readonly or disabled AND it's not a multi-select
    // Multi-select always needs search in dropdown for better UX
    if ((this.readonly || this.disabled || this.state === 'disabled' || this.state === 'read-only') && !this.multiple) {
      options.searchEnabled = false;
    }

    // Disable Choices.js interaction for read-only state
    if (this.readonly || this.state === 'read-only') {
      options.shouldSort = false;
      options.removeItemButton = false;
    }

    // Add custom templates if any option has avatar
    const hasAvatars = this._options.some(opt => opt.avatar);
    if (hasAvatars) {
      // Store reference to component for template functions
      const component = this;
      const currentOptions = [...this._options]; // Copy options array
      
      // Custom template for choice items (dropdown options)
      // TypeScript doesn't include these in the type definition, so we cast to any
      (options as any).choice = (item: any) => {
        const option = currentOptions.find(opt => opt.value === item.value || opt.value === String(item.value));
        if (option?.avatar) {
          // Check if this item is currently selected
          const isSelected = component.value === item.value || 
                            (Array.isArray(component.value) && component.value.includes(item.value)) ||
                            option.selected;
          const checkmarkSvg = isSelected ? '<svg class="vds-choice-checkmark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '';
            return `
            <div class="choices__item choices__item--selectable vds-choice-with-avatar" data-value="${String(item.value)}" data-id="${item.id}">
              <vds-avatar variant="image" src="${option.avatar}" alt="${option.label}" size="md" class="vds-choice-avatar"></vds-avatar>
              <span class="vds-choice-label">${item.label || option.label}</span>
              ${checkmarkSvg}
            </div>
          `;
        }
        return null; // Use default template
      };
      
      // Custom template for selected item (single select)
      if (!this.multiple) {
        (options as any).item = (item: any) => {
          const option = currentOptions.find(opt => opt.value === item.value || opt.value === String(item.value));
          if (option?.avatar) {
            return `
              <div class="choices__item choices__item--selectable vds-item-with-avatar" data-item data-id="${item.id}" data-value="${String(item.value)}" data-choice>
                <vds-avatar variant="image" src="${option.avatar}" alt="${option.label}" size="md" class="vds-item-avatar"></vds-avatar>
                <span class="vds-item-label">${item.label || option.label}</span>
              </div>
            `;
          }
          return null; // Use default template
        };
      }
    }

    try {
      // Mark as initializing
      this.isInitializing = true;
      
      // Initialize Choices.js with silent mode to prevent auto-opening
      this.choicesInstance = new Choices(this.selectElement, options);
      
      // Immediately hide dropdown after initialization (before any other operations)
      // This prevents the dropdown from showing by default, especially in programmatic usage
      // Force close via multiple methods to ensure it's hidden
      try {
        if (this.choicesInstance && this.choicesInstance.dropdown) {
          this.choicesInstance.dropdown.isActive = false;
        }
        this.choicesInstance.hideDropdown();
        this.isDropdownOpen = false;
      } catch (e) {
        // Ignore errors if dropdown not ready yet
      }
      
      // IMMEDIATELY check DOM and force close - do this synchronously before anything else
      const container = this.selectElement?.closest('.choices') as HTMLElement;
      if (container) {
        const dropdown = container.querySelector('.choices__list--dropdown') as HTMLElement;
        if (dropdown) {
          dropdown.classList.remove('is-active');
          // Store original display value for later restoration
          if (!dropdown.dataset.originalDisplay) {
            dropdown.dataset.originalDisplay = dropdown.style.display || '';
          }
          // CRITICAL: Always ensure position: absolute to prevent layout shift
          dropdown.style.position = 'absolute';
          // Force remove via style as well as a backup (only during initialization)
          dropdown.style.display = 'none';
          dropdown.style.visibility = 'hidden';
        }
        container.classList.remove('is-open');
        container.classList.remove('is-focused');
      }
      
      // Inject global styles for Choices.js (since it renders outside shadow DOM)
      this.injectGlobalStyles();
      
      // Restore original styles (Choices will handle hiding)
      this.selectElement.style.display = originalDisplay || '';
      this.selectElement.style.visibility = originalVisibility || '';
      
      // Apply VDS styles to the Choices instance
      this.applyVDSStyles();
      
      // Set width 100% to choices__list programmatically with inline CSS (but not for multiple select)
      requestAnimationFrame(() => {
        const container = this.selectElement?.closest('.choices') as HTMLElement;
        if (container) {
          // Only set width 100% for single select list, not multiple (multiple should size naturally)
          if (!this.multiple) {
            const choicesList = container.querySelector('.choices__list--single') as HTMLElement;
            if (choicesList) {
              // Set inline CSS to ensure width is 100%
              choicesList.style.setProperty('width', '100%', 'important');
            }
          }
          // Always set width 100% for dropdown list
          const dropdownList = container.querySelector('.choices__list--dropdown') as HTMLElement;
          if (dropdownList) {
            dropdownList.style.setProperty('width', '100%', 'important');
          }
        }
      });
      
      // Force close dropdown via DOM manipulation immediately after styles are injected
      const choicesContainer = this.selectElement?.closest('.choices') as HTMLElement;
      if (choicesContainer) {
        const dropdownEl = choicesContainer.querySelector('.choices__list--dropdown') as HTMLElement;
        if (dropdownEl) {
          // Aggressively remove is-active class and force hide
          dropdownEl.classList.remove('is-active');
          dropdownEl.style.display = 'none';
          // Also remove from container
          choicesContainer.classList.remove('is-open');
          choicesContainer.classList.remove('is-focused');
        }
      }
      
      // Update dropdown items with avatars if needed
      if (hasAvatars) {
        // Wait for vds-avatar to be defined, then update avatars
        customElements.whenDefined('vds-avatar').then(() => {
          // Use requestAnimationFrame for DOM manipulation after Choices.js renders
          requestAnimationFrame(() => {
            this.updateDropdownItemsWithAvatars();
          });
        }).catch(() => {
          // If vds-avatar is not available, still try to update (might work without it)
          requestAnimationFrame(() => {
            this.updateDropdownItemsWithAvatars();
          });
        });
      }
      
      // Replace remove buttons with vds-icon if removeItemButton is enabled
      requestAnimationFrame(() => {
        if (this.removeItemButton && this.multiple) {
          this.replaceRemoveButtons();
        }
      });
      
      // Ensure dropdown is closed initially - multiple checks
      // Hide immediately and also on next frame to ensure it stays closed
      try {
        if (this.choicesInstance) {
          this.choicesInstance.hideDropdown();
          this.isDropdownOpen = false;
        }
      } catch (e) {
        // Ignore errors
      }
      
      // Also ensure via DOM manipulation immediately
      const choicesContainer2 = this.selectElement?.closest('.choices') as HTMLElement;
      if (choicesContainer2) {
        const dropdownEl2 = choicesContainer2.querySelector('.choices__list--dropdown') as HTMLElement;
        if (dropdownEl2) {
          dropdownEl2.classList.remove('is-active');
        }
        choicesContainer2.classList.remove('is-open');
      }
      
      // Double-check on next frame (only during initialization)
      // Use multiple requestAnimationFrames to catch any delayed opening
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Force close multiple times to catch any delayed opening during initialization
          if (this.isInitializing && this.choicesInstance) {
            try {
              this.choicesInstance.hideDropdown();
              this.isDropdownOpen = false;
            } catch (e) {
              // Ignore errors
            }
            
            const choicesContainer3 = this.selectElement?.closest('.choices') as HTMLElement;
            if (choicesContainer3) {
              const dropdownEl3 = choicesContainer3.querySelector('.choices__list--dropdown') as HTMLElement;
              if (dropdownEl3) {
                // Always remove is-active and force hide during initialization
                dropdownEl3.classList.remove('is-active');
                dropdownEl3.style.display = 'none';
              }
              choicesContainer3.classList.remove('is-open');
              choicesContainer3.classList.remove('is-focused');
            }
          }
        });
      });
      
      // Set initial value
      if (this.value) {
        this.updateChoicesValue();
      }

      // Attach event listeners
      this.attachEventListeners();
      
      // For multi-select, ensure search is always enabled in dropdown
      if (this.multiple && this.choicesInstance) {
        requestAnimationFrame(() => {
          const choicesInstance = this.choicesInstance as any;
          if (choicesInstance.config) {
            // Force enable search for multi-select dropdowns
            if (choicesInstance.config.searchEnabled !== true) {
              choicesInstance.config.searchEnabled = true;
            }
          }
        });
      }
      
      // For multi-select, set placeholder on input element after initialization
      if (this.multiple && this.placeholder) {
        // Use multiple requestAnimationFrames to ensure Choices.js has finished rendering
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const container = this.selectElement?.closest('.choices') as HTMLElement;
            if (container) {
              const setupPlaceholder = (inputEl: HTMLInputElement) => {
                if (!inputEl || inputEl.classList.contains('choices__input--cloned')) return;
                
                // Force set placeholder - HTML placeholders only show when value is empty
                const setPlaceholder = () => {
                  // Always set placeholder attribute - browser will show it when value is empty
                  // Clear any value that might prevent placeholder from showing
                  const currentValue = inputEl.value || '';
                  // Only show placeholder if input is truly empty
                  if (!currentValue || currentValue.trim() === '') {
                    inputEl.placeholder = this.placeholder;
                    inputEl.setAttribute('placeholder', this.placeholder);
                    // Force clear any whitespace or hidden values
                    if (inputEl.value !== '') {
                      inputEl.value = '';
                    }
                  } else {
                    // If there's a value, clear placeholder so it doesn't show
                    // (normal HTML behavior - placeholder only shows when empty)
                    if (inputEl.placeholder === this.placeholder) {
                      // Keep placeholder attribute but browser won't show it when value exists
                    }
                  }
                };
                
                // Set immediately
                setPlaceholder();
                
                // Watch for attribute changes (if Choices.js removes placeholder)
                if (!(inputEl as any).__placeholderObserver) {
                  const attrObserver = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                      if (mutation.type === 'attributes' && mutation.attributeName === 'placeholder') {
                        // If placeholder was removed, restore it
                        if (!inputEl.placeholder || inputEl.placeholder === '') {
                          setPlaceholder();
                        }
                      }
                    });
                  });
                  attrObserver.observe(inputEl, {
                    attributes: true,
                    attributeFilter: ['placeholder']
                  });
                  (inputEl as any).__placeholderObserver = attrObserver;
                }
                
                // Watch for value changes and restore placeholder when empty
                const checkAndSetPlaceholder = () => {
                  setPlaceholder();
                };
                
                // Check on various events
                ['input', 'blur', 'keyup', 'focus', 'change'].forEach(eventType => {
                  inputEl.addEventListener(eventType, checkAndSetPlaceholder, { passive: true });
                });
                
                // Also check periodically (as backup)
                if (!(inputEl as any).__placeholderCheckInterval) {
                  (inputEl as any).__placeholderCheckInterval = setInterval(() => {
                    if (!inputEl.isConnected) {
                      clearInterval((inputEl as any).__placeholderCheckInterval);
                      return;
                    }
                    setPlaceholder();
                  }, 200);
                }
              };
              
              // Set up placeholder for existing inputs
              const inputs = container.querySelectorAll('.choices__input:not(.choices__input--cloned)');
              inputs.forEach((input) => {
                if (input && input.tagName === 'INPUT') {
                  setupPlaceholder(input as HTMLInputElement);
                }
              });
              
              // Watch for new inputs being added
              const inputWatcher = new MutationObserver(() => {
                const newInputs = container.querySelectorAll('.choices__input:not(.choices__input--cloned)');
                newInputs.forEach((input) => {
                  if (input && input.tagName === 'INPUT' && !(input as any).__placeholderSet) {
                    (input as any).__placeholderSet = true;
                    setupPlaceholder(input as HTMLInputElement);
                  }
                });
              });
              
              inputWatcher.observe(container, {
                childList: true,
                subtree: true
              });
              
              // Store watcher for cleanup
              (this as any).__placeholderInputWatcher = inputWatcher;
            }
          });
        });
      }
      
      // Ensure choices__list has width 100% after event listeners are attached (inline CSS)
      // But not for multiple select - let it size naturally based on content
      requestAnimationFrame(() => {
        const container = this.selectElement?.closest('.choices') as HTMLElement;
        if (container) {
          // Only set width 100% for single select list, not multiple
          if (!this.multiple) {
            const choicesList = container.querySelector('.choices__list--single') as HTMLElement;
            if (choicesList) {
              // Set inline CSS with important flag
              choicesList.style.setProperty('width', '100%', 'important');
            }
          }
          // Always ensure dropdown list has width 100%
          const dropdownList = container.querySelector('.choices__list--dropdown') as HTMLElement;
          if (dropdownList) {
            dropdownList.style.setProperty('width', '100%', 'important');
          }
        }
      });
      
      // One more check after event listeners are attached
      requestAnimationFrame(() => {
        if (this.choicesInstance) {
          try {
            this.choicesInstance.hideDropdown();
            this.isDropdownOpen = false;
          } catch (e) {
            // Ignore errors
          }
        }
        
        // Also force close via DOM one more time (only during initialization)
        if (this.isInitializing) {
          const choicesContainer4 = this.selectElement?.closest('.choices') as HTMLElement;
          if (choicesContainer4) {
            const dropdownEl4 = choicesContainer4.querySelector('.choices__list--dropdown') as HTMLElement;
            if (dropdownEl4) {
              dropdownEl4.classList.remove('is-active');
              dropdownEl4.style.display = 'none';
            }
            choicesContainer4.classList.remove('is-open');
          }
        }
      });
      
      // Add a MutationObserver to watch for dropdown opening during initialization
      // This ensures it stays closed even if something tries to open it
      const choicesContainerObserver = this.selectElement?.closest('.choices') as HTMLElement;
      if (choicesContainerObserver) {
        const dropdownObserver = choicesContainerObserver.querySelector('.choices__list--dropdown') as HTMLElement;
        if (dropdownObserver && !(this as any).__dropdownCloseObserver) {
          const observer = new MutationObserver(() => {
            // Watch during initialization period
            if (this.isInitializing && dropdownObserver.classList.contains('is-active')) {
              // During initialization, always close if it opens
              if (this.choicesInstance) {
                try {
                  this.choicesInstance.hideDropdown();
                  if (this.choicesInstance.dropdown) {
                    this.choicesInstance.dropdown.isActive = false;
                  }
                } catch (e) {
                  // Ignore errors
                }
              }
              dropdownObserver.classList.remove('is-active');
              dropdownObserver.style.display = 'none';
              choicesContainerObserver.classList.remove('is-open');
              choicesContainerObserver.classList.remove('is-focused');
              this.isDropdownOpen = false;
            }
            // Don't interfere after initialization - let user interaction handle it
          });
          
          observer.observe(dropdownObserver, {
            attributes: true,
            attributeFilter: ['class']
          });
          
          (this as any).__dropdownCloseObserver = observer;
          
          // Stop watching after 500ms - by then initialization should be complete
          window.setTimeout(() => {
            // Make sure dropdown is still closed when we finish initializing
            const container = this.selectElement?.closest('.choices') as HTMLElement;
            if (container) {
              const dropdown = container.querySelector('.choices__list--dropdown') as HTMLElement;
              if (dropdown) {
                // Force close one more time
                dropdown.classList.remove('is-active');
                // Keep display:none until user clicks
                dropdown.style.display = 'none';
              }
              container.classList.remove('is-open');
            }
            
            // Only mark as no longer initializing AFTER ensuring it's closed
            this.isInitializing = false;
            observer.disconnect();
            delete (this as any).__dropdownCloseObserver;
            
            // DON'T remove display:none here - keep it until user clicks
            // The showDropdown override will remove it when user explicitly opens
          }, 500);
        }
      }
      
      // Setup overflow handling for multiple select
      if (this.multiple) {
        this.setupOverflowHandling();
      }
    } catch (error) {
      console.error('vds-select: Error initializing Choices.js', error);
      // Restore styles on error
      this.selectElement.style.display = originalDisplay || '';
      this.selectElement.style.visibility = originalVisibility || '';
    }
  }

  private injectGlobalStyles(): void {
    const styleId = 'vds-select-global-styles';
    
    // Remove existing styles if they exist (to allow updates)
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
      VDSSelect.stylesInjected = false; // Reset flag so we can re-inject
    }
    
    if (VDSSelect.stylesInjected) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* VDS Select - Using vds-input, vds-dropdown-menu, and vds-menu-item styles */
      
      /* Choices container - matches vds-input wrapper */
      .choices {
        position: relative;
        margin-bottom: 0;
        width: 100%;
        display: block;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      }

      /* Choices inner - matches vds-input .input styles exactly */
      .choices__inner {
        display: flex !important;
        align-items: center !important;
        flex: 1 !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
        position: relative !important;
        background-color: var(--vds-color-white, #ffffff) !important;
        border: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
        border-radius: var(--vds-radius-lg, 0.375rem) !important;
        // min-height: 28px !important;
        // height: 28px !important;
        // gap: var(--vds-spacing-md, 12px) !important;
        padding: var(--vds-spacing-sm, 6px) var(--vds-spacing-md, 12px) !important;
        padding-right: calc(var(--vds-spacing-md, 12px) + 24px) !important; /* Extra space for chevron */
        box-sizing: border-box !important;
        overflow: hidden !important; /* Prevent content from overflowing and increasing height */
        box-shadow: none !important;
        transition: border-color var(--vds-transition-base, 200ms ease-in-out), box-shadow var(--vds-transition-base, 200ms ease-in-out) !important;
        cursor: pointer !important;
      }

      /* Active state - matches vds-input[state='active'] .input */
      /* Only show focus when state is explicitly active, not when Choices.js adds is-focused */
      vds-select[state='active'] .choices__inner {
        background-color: var(--vds-color-white, #ffffff) !important;
        border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
        box-shadow: 0 0 0 3px var(--vds-color-green-100, #e6f9f3) !important;
      }

      /* Override Choices.js default focus styles - but allow when state is active (higher specificity) */
      /* When state is active, show focus styling even with is-open/is-focused */
      vds-select[state='active'] .choices__inner.is-focused,
      vds-select[state='active'] .choices__inner.is-open,
      vds-select[state='active'] .choices.is-focused .choices__inner,
      vds-select[state='active'] .choices.is-open .choices__inner {
        background-color: var(--vds-color-white, #ffffff) !important;
        border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
        box-shadow: 0 0 0 3px var(--vds-color-green-100, #e6f9f3) !important;
      }

      /* Prevent Choices.js default focus styles when state is NOT active (lower specificity) */
      /* Also add more specific rules to ensure box-shadow is removed after selection */
      .choices__inner.is-focused,
      .choices__inner.is-open,
      .choices.is-focused .choices__inner,
      .choices.is-open .choices__inner,
      vds-select:not([state='active']) .choices__inner.is-focused,
      vds-select:not([state='active']) .choices__inner.is-open,
      vds-select:not([state='active']) .choices.is-focused .choices__inner,
      vds-select:not([state='active']) .choices.is-open .choices__inner {
        background-color: var(--vds-color-white, #ffffff) !important;
        border-color: var(--vds-color-gray-300, #eaeef4) !important;
        box-shadow: none !important;
      }

      /* Error state - matches vds-input[state='error'] .input */
      vds-select[state='error'] .choices__inner {
        background-color: var(--vds-color-white, #ffffff) !important;
        border-color: var(--vds-color-red-500, #fb3145) !important;
        box-shadow: none !important;
      }

      /* Read-only state - matches vds-input[state='read-only'] .input */
      vds-select[state='read-only'] .choices__inner {
        background-color: var(--vds-color-gray-300, #eaeef4) !important;
        border-color: var(--vds-color-gray-300, #eaeef4) !important;
        box-shadow: none !important;
        cursor: default !important;
        pointer-events: none !important;
      }

      /* Prevent interaction with read-only select */
      vds-select[state='read-only'] .choices__inner * {
        pointer-events: none !important;
        cursor: default !important;
      }

      /* Re-enable pointer events for read-only select itself to maintain layout */
      vds-select[state='read-only'] .choices__inner {
        pointer-events: auto !important;
      }

      /* Disabled state - matches vds-input[state='disabled'] .input */
      vds-select[state='disabled'] .choices__inner {
        background-color: var(--vds-color-gray-200, #f8f9fb) !important;
        border-color: var(--vds-color-gray-300, #eaeef4) !important;
        box-shadow: none !important;
        cursor: not-allowed !important;
      }

      /* Placeholder - matches vds-input placeholder */
      .choices__placeholder {
        opacity: 1 !important;
        color: var(--vds-color-text-tertiary, #898f9a) !important;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-weight: var(--vds-font-weight-normal, 400) !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
      }

      /* Input field - base styles */
      .choices .choices__inner .choices__input,
      .choices__input {
        flex: 1 !important;
        min-width: 0 !important;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-weight: var(--vds-font-weight-normal, 400) !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        background: transparent !important;
        border: none !important;
        outline: none !important;
        margin: 0 !important;
      }

      /* Single select input - matches vds-input input/textarea styles exactly */
      .choices:not(.is-multiple) .choices__inner .choices__input,
      .choices:not(.is-multiple) .choices__input,
      vds-select:not([multiple]) .choices .choices__input,
      vds-select:not([multiple]) .choices__input {
        flex: 1 !important;
        min-width: 0 !important;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-weight: var(--vds-font-weight-normal, 400) !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        background: transparent !important;
        border: none !important;
        outline: none !important;
        padding: 6px 12px !important;
        margin: 0 !important;
        box-sizing: border-box !important;
      }

      /* Multiple select inline input - hidden (search is in dropdown only) */
      /* Only hide input in choices__list--multiple, NOT in choices__list--dropdown */
      .choices.is-multiple .choices__list--multiple .choices__input,
      .choices.is-multiple .choices__inner:not(.choices__list--dropdown) .choices__input,
      vds-select[multiple] .choices .choices__list--multiple .choices__input,
      vds-select[multiple] .choices .choices__inner:not(.choices__list--dropdown) .choices__input {
        display: none !important;
        visibility: hidden !important;
        width: 0 !important;
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      /* Single select input padding - default for non-multiple, must be after multiple rule */
      .choices:not(.is-multiple) .choices__inner .choices__input,
      .choices:not(.is-multiple) .choices__input,
      vds-select:not([multiple]) .choices .choices__input,
      vds-select:not([multiple]) .choices__input {
        padding: 6px 12px !important;
      }


      /* Placeholder - matches vds-input */
      .choices:not(.is-multiple) .choices__inner .choices__input::placeholder,
      .choices:not(.is-multiple) .choices__input::placeholder,
      vds-select:not([multiple]) .choices .choices__input::placeholder,
      vds-select:not([multiple]) .choices__input::placeholder {
        color: var(--vds-color-text-tertiary, #898f9a) !important;
        opacity: 1 !important;
      }

      /* Focus state - matches vds-input */
      .choices:not(.is-multiple) .choices__inner .choices__input:focus,
      .choices:not(.is-multiple) .choices__input:focus,
      vds-select:not([multiple]) .choices .choices__input:focus,
      vds-select:not([multiple]) .choices__input:focus {
        outline: none !important;
      }

      /* Disabled state for single select input - matches vds-input */
      vds-select:not([multiple])[state='disabled'] .choices .choices__input,
      vds-select:not([multiple])[state='disabled'] .choices__input {
        color: var(--vds-color-text-disabled, #cdced3) !important;
        cursor: not-allowed !important;
      }

      /* Read-only state for single select input - matches vds-input */
      vds-select:not([multiple])[state='read-only'] .choices .choices__input,
      vds-select:not([multiple])[state='read-only'] .choices__input {
        color: var(--vds-color-text-primary, #070922) !important;
      }

      /* Single select display text */
      .choices__list--single .choices__item {
        padding: 0 !important;
        padding-right: 28px !important; /* Space for chevron */
        color: var(--vds-color-text-primary, #070922) !important;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-weight: var(--vds-font-weight-normal, 400) !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }

      /* Multiple select list - horizontal layout, prevent wrapping */
      .choices__list--multiple {
        display: flex !important;
        flex-wrap: nowrap !important; /* Prevent wrapping - use overflow handling instead */
        gap: var(--vds-spacing-xs, 3px) !important;
        align-items: center !important;
        flex-direction: row !important;
        width: auto !important; /* Don't force 100% width - let it size naturally */
        max-width: 100% !important; /* But don't exceed container width */
        overflow: hidden !important; /* Hide overflowing items */
      }
      
      /* Hide inline input in multi-select - search will be in dropdown only */
      .choices__list--multiple .choices__input {
        display: none !important;
        visibility: hidden !important;
        width: 0 !important;
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      /* Multiple select tags - keep brand color, horizontal layout */
      .choices__list--multiple .choices__item {
        background-color: var(--vds-color-gray-200, #f8f9fb) !important;
        border-color: var(--vds-color-gray-300, #eaeef4) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        padding: 2px var(--vds-spacing-sm, 8px) !important;
        margin: 0 !important;
        border-radius: var(--vds-radius-md, 0.375rem) !important;
        font-size: var(--vds-font-size-sm, 0.875rem) !important;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        display: inline-flex !important;
        align-items: center !important;
        white-space: nowrap !important;
        flex-shrink: 0 !important;
      }

      /* Hide items that don't fit */
      .choices__list--multiple .choices__item.vds-hidden {
        display: none !important;
      }

      .choices__list--multiple .choices__item.is-highlighted {
        background-color: var(--vds-color-brand-hover, var(--vds-color-green-600, #009d68)) !important;
        border-color: var(--vds-color-brand-hover, var(--vds-color-green-600, #009d68)) !important;
      }

      /* More count indicator for multiple select */
      .choices__list--multiple .choices__item.choices__item--more {
        background-color: var(--vds-color-gray-200, #f8f9fb) !important;
        border-color: var(--vds-color-gray-300, #eaeef4) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        cursor: default !important;
      }

      .choices__list--multiple .choices__item.choices__item--more:hover {
        background-color: var(--vds-color-gray-200, #f8f9fb) !important;
        border-color: var(--vds-color-gray-300, #eaeef4) !important;
      }

      /* Dropdown list - matches vds-dropdown-menu .dropdown-menu */
      .choices__list--dropdown {
        /* CRITICAL: Always position absolute, even when hidden, to prevent layout shift */
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0 !important;
        z-index: var(--vds-z-index-dropdown, 1000) !important;
        
        /* Hide by default */
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        
        /* Layout properties */
        flex-direction: column !important;
        gap: var(--vds-spacing-xs, 0.25rem) !important;
        background-color: var(--vds-color-white, #ffffff) !important;
        padding: var(--vds-radius-xl, 0.5625rem) !important;
        border-radius: var(--vds-radius-lg, 0.375rem) !important;
        box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        /* Match the width of the select input (choices__inner) */
        width: 100% !important;
        min-width: 100% !important;
        max-width: 100% !important;
        /* Ensure it matches the parent container width exactly */
        box-sizing: border-box !important;
        max-height: 300px !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        box-sizing: border-box !important;
        margin-top: 4px !important;
        border: none !important;
        /* Ensure dropdown doesn't affect layout */
        margin-bottom: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

      /* Show dropdown when active */
      .choices__list--dropdown.is-active {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100% !important;
      }
      
      /* Ensure choices container has relative positioning */
      .choices {
        position: relative !important;
        overflow: visible !important; /* Allow dropdown to overflow container */
        width: 100% !important; /* Ensure container takes full width */
      }
      
      /* Ensure choices inner doesn't affect layout */
      .choices__inner {
        position: relative !important;
        width: 100% !important; /* Ensure inner takes full width */
        box-sizing: border-box !important;
      }
      
      /* Ensure the choices inner container doesn't affect layout */
      .choices__inner {
        position: relative !important;
        line-height: normal !important;
      }

      /* Dropdown items - matches vds-menu-item .menu-item */
      .choices__list--dropdown .choices__item {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: var(--vds-spacing-sm, 0.5rem) !important;
        padding: var(--vds-spacing-sm, 0.5rem) !important;
        border-radius: var(--vds-radius-md, 0.375rem) !important;
        background-color: var(--vds-color-white, #ffffff) !important;
        cursor: pointer !important;
        transition: background-color 200ms ease-in-out !important;
        box-sizing: border-box !important;
      }

      /* Dropdown item text - matches vds-menu-item .menu-item-text */
      .choices__list--dropdown .choices__item .choices__item--selectable {
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-weight: var(--vds-font-weight-normal, 400) !important;
        font-size: var(--vds-font-size-md, 0.75rem) !important;
        color: var(--vds-color-black, var(--vds-color-text-primary, #070922)) !important;
        line-height: 1 !important;
        white-space: nowrap !important;
      }

      /* Hover state - matches vds-menu-item[state='hover'] */
      .choices__list--dropdown .choices__item--selectable.is-highlighted {
        background-color: var(--vds-color-gray-200, #f8f9fb) !important;
        color: var(--vds-color-text-primary, #070922) !important;
      }

      /* Selected state - keep brand color */
      .choices__list--dropdown .choices__item--selectable.is-selected {
        background-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
        color: var(--vds-color-white, #ffffff) !important;
      }

      .choices__list--dropdown .choices__item--selectable.is-selected.is-highlighted {
        background-color: var(--vds-color-brand-hover, var(--vds-color-green-600, #009d68)) !important;
      }

      /* Disabled item - matches vds-menu-item[disabled] */
      .choices__list--dropdown .choices__item--disabled {
        cursor: not-allowed !important;
        opacity: 0.6 !important;
      }

      .choices__list--dropdown .choices__item--disabled .choices__item--selectable {
        color: var(--vds-color-text-disabled, #cdced3) !important;
      }

      /* Dropdown search input - styled for both single and multiple select */
      /* Must override the multi-select hiding rules with higher specificity */
      .choices__list--dropdown .choices__input,
      .choices.is-multiple .choices__list--dropdown .choices__input,
      vds-select[multiple] .choices .choices__list--dropdown .choices__input {
        display: block !important;
        visibility: visible !important;
        width: 100% !important;
        padding: var(--vds-spacing-sm, 8px) var(--vds-spacing-md, 12px) !important;
        margin: 0 0 var(--vds-spacing-xs, 4px) 0 !important;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-weight: var(--vds-font-weight-normal, 400) !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        background: var(--vds-color-white, #ffffff) !important;
        border: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
        border-radius: var(--vds-radius-md, 0.375rem) !important;
        outline: none !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      .choices__list--dropdown .choices__input:focus {
        border-color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
        box-shadow: 0 0 0 3px var(--vds-color-green-100, #e6f9f3) !important;
      }

      .choices__list--dropdown .choices__input::placeholder {
        color: var(--vds-color-text-tertiary, #898f9a) !important;
        opacity: 1 !important;
      }

      /* Avatar-based choice items */
      .choices__list--dropdown .choices__item.vds-choice-with-avatar {
        display: flex !important;
        align-items: center !important;
        gap: var(--vds-spacing-sm, 8px) !important;
        padding: var(--vds-spacing-sm, 8px) var(--vds-spacing-md, 12px) !important;
        cursor: pointer !important;
      }

      .vds-choice-avatar {
        flex-shrink: 0 !important;
      }
      
      .vds-choice-avatar[size="md"] {
        --vds-avatar-size: 32px !important;
      }

      .vds-choice-label {
        flex: 1 !important;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
        color: var(--vds-color-text-primary, #070922) !important;
      }

      .vds-choice-checkmark {
        width: 16px !important;
        height: 16px !important;
        flex-shrink: 0 !important;
        color: var(--vds-color-brand, var(--vds-color-green-500, #00b578)) !important;
      }

      .vds-choice-checkmark path {
        stroke: currentColor !important;
      }

      /* Highlight selected avatar item */
      .choices__list--dropdown .choices__item.vds-choice-with-avatar.is-selected .vds-choice-label {
        color: var(--vds-color-white, #ffffff) !important;
      }

      .choices__list--dropdown .choices__item.vds-choice-with-avatar.is-selected .vds-choice-checkmark {
        color: var(--vds-color-white, #ffffff) !important;
      }

      /* Avatar-based selected item (single select) */
      .choices__inner .choices__item.vds-item-with-avatar {
        display: flex !important;
        align-items: center !important;
        gap: var(--vds-spacing-sm, 8px) !important;
        padding: 0 !important;
      }

      .vds-item-avatar {
        flex-shrink: 0 !important;
      }
      
      .vds-item-avatar[size="sm"] {
        --vds-avatar-size: 24px !important;
      }

      .vds-item-label {
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
        color: var(--vds-color-text-primary, #070922) !important;
      }

      /* Group heading - matches vds-dropdown-menu .heading-text */
      .choices__heading {
        display: flex !important;
        align-items: center !important;
        gap: var(--vds-spacing-md, 1rem) !important;
        padding-bottom: var(--vds-radius-lg, 0.375rem) !important;
        padding-top: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        font-family: var(--vds-font-family-sans, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif) !important;
        font-weight: var(--vds-font-weight-semibold, 600) !important;
        font-size: var(--vds-font-size-md, 1rem) !important;
        color: var(--vds-color-text-primary, #070922) !important;
        line-height: 1 !important;
        white-space: nowrap !important;
        border-bottom: 1px solid var(--vds-color-gray-300, #eaeef4) !important;
        margin-bottom: var(--vds-spacing-xs, 0.25rem) !important;
      }

      /* Hide default Choices.js arrow - we use vds-icon instead */
      .choices__arrow {
        display: none !important;
      }

      /* Hide default Choices.js ::after pseudo-element for single select - we use custom chevron */
      .choices[data-type*="select-one"]::after {
        display: none !important;
        content: none !important;
      }

      /* Custom chevron icon - positioned at the end */
      .choices__inner::after {
        content: '';
        display: none;
      }

      /* Add chevron icon via JavaScript - styles for positioning */
      vds-select .chevron-icon-wrapper {
        position: absolute;
        right: var(--vds-spacing-md, 12px);
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 1;
      }

      .choices__inner .chevron-icon-wrapper {
        position: absolute !important;
        right: var(--vds-spacing-md, 12px) !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        pointer-events: none !important;
        z-index: 10 !important;
        flex-shrink: 0 !important;
        flex-grow: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        width: auto !important;
        height: auto !important;
        /* Ensure it's positioned at the absolute end, not in flex flow */
        order: 999 !important;
      }

      vds-select .chevron-icon-wrapper vds-icon,
      .choices__inner .chevron-icon-wrapper vds-icon {
        font-size: 12px;
        color: var(--vds-color-text-primary, #070922);
        transition: transform var(--vds-transition-base, 200ms ease-in-out);
      }

      vds-select .chevron-icon-wrapper.open vds-icon,
      .choices__inner .chevron-icon-wrapper.open vds-icon {
        transform: rotate(180deg);
      }

      vds-select[state='disabled'] .chevron-icon-wrapper vds-icon,
      .choices__inner .chevron-icon-wrapper vds-icon[aria-disabled='true'] {
        color: var(--vds-color-text-disabled, #cdced3);
      }
    `;
    
    document.head.appendChild(style);
    VDSSelect.stylesInjected = true;
    
    // Force a reflow to ensure styles are applied
    void document.body.offsetHeight;
  }

  private applyVDSStyles(): void {
    if (!this.choicesInstance) return;
    
    // Apply styles to the choices container
    const container = this.selectElement?.closest('.choices') as HTMLElement;
    if (!container) return;
    
    // Add class based on multiple state
    if (this.multiple) {
      container.classList.add('is-multiple');
    } else {
      container.classList.remove('is-multiple');
    }
    
    const inner = container.querySelector('.choices__inner') as HTMLElement;
    if (inner && this.state === 'active') {
      inner.classList.add('is-focused');
    }
    
    // Add chevron icon to the inner element
    this.addChevronIcon(container);
    
    // Apply padding directly via JavaScript for single select only
    // Multi-select uses dropdown search only (no inline input)
    if (!this.multiple) {
      const applyInputPadding = () => {
        // Try multiple selectors to find the input (only for single select)
        const selectors = [
          '.choices__input:not(.choices__input--cloned)',
          '.choices__inner .choices__input',
          '.choices__input'
        ];
        
        for (const selector of selectors) {
          const inputs = container.querySelectorAll(selector);
          inputs.forEach((input) => {
            const inputEl = input as HTMLElement;
            // Skip inputs in dropdown (choices__list--dropdown) - only style main input
            if (inputEl && inputEl.tagName === 'INPUT' && !inputEl.closest('.choices__list--dropdown')) {
              // For single select, apply padding matching vds-input (6px vertical, 12px horizontal)
              inputEl.style.setProperty('padding', '6px 12px', 'important');
              inputEl.setAttribute('data-vds-padding', 'true');
            }
          });
        }
      };
      
      // Apply immediately
      applyInputPadding();
      
      // Also apply on next frame to catch any late-rendered inputs
      requestAnimationFrame(() => {
        applyInputPadding();
      });
      
      // Watch for new inputs being added with MutationObserver (only for single select)
      const inputObserver = new MutationObserver((mutations) => {
        let shouldApply = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as HTMLElement;
                // Only apply to main input, not dropdown inputs
                if ((el.classList.contains('choices__input') || el.querySelector('.choices__input')) &&
                    !el.closest('.choices__list--dropdown')) {
                  shouldApply = true;
                }
              }
            });
          }
        });
        if (shouldApply) {
          applyInputPadding();
        }
      });
      
      inputObserver.observe(container, {
        childList: true,
        subtree: true,
        attributes: false
      });
      
      // Clean up observer after a delay (input should be stable by then)
      setTimeout(() => {
        inputObserver.disconnect();
      }, 2000);
    }

      // Watch for Choices.js adding focus classes and remove them ONLY after selection
      // Keep this observer running continuously - reuse if already exists
      if (!(this as any).__focusObserver) {
        let isProcessing = false; // Prevent infinite loops
        
        const focusObserver = new MutationObserver((mutations) => {
          // Only act if we're preventing focus after selection AND we're not already processing
          // Also check if dropdown is actually closing (not opening)
          const dropdownIsClosing = !this.choicesInstance?.dropdown?.isActive;
          const shouldPrevent = this.preventFocusAfterSelection && dropdownIsClosing;
          
          if (isProcessing || !shouldPrevent) {
            return;
          }
          
          isProcessing = true;
          
          // Use requestAnimationFrame to batch changes and prevent loops
          requestAnimationFrame(() => {
            try {
              mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                  const target = mutation.target as HTMLElement;
                  
                  // Check if classes exist
                  const hasFocusClasses = target.classList.contains('is-focused') || target.classList.contains('is-open');
                  
                  // Only remove if classes exist and we're in prevention mode after selection
                  if (hasFocusClasses && this.preventFocusAfterSelection && dropdownIsClosing) {
                    // Temporarily disconnect to prevent loop
                    focusObserver.disconnect();
                    
                    // Remove from container
                    if (target === container) {
                      target.classList.remove('is-focused', 'is-open');
                    }
                    // Remove from inner and force remove box-shadow
                    if (target.classList.contains('choices__inner')) {
                      target.classList.remove('is-focused', 'is-open');
                      (target as HTMLElement).style.setProperty('box-shadow', 'none', 'important');
                    }
                    
                    // Also ensure box-shadow is removed from inner if target is container
                    if (target === container) {
                      const inner = container.querySelector('.choices__inner') as HTMLElement;
                      if (inner) {
                        inner.classList.remove('is-focused', 'is-open');
                        inner.style.setProperty('box-shadow', 'none', 'important');
                      }
                    }
                    
                    // Reconnect after a short delay
                    setTimeout(() => {
                      if (container && container.isConnected) {
                        focusObserver.observe(container, {
                          attributes: true,
                          attributeFilter: ['class'],
                          subtree: true
                        });
                      }
                    }, 10);
                  }
                }
              });
            } finally {
              isProcessing = false;
            }
          });
        });
        
        focusObserver.observe(container, {
          attributes: true,
          attributeFilter: ['class'],
          subtree: true
        });
        
        // Store observer so we can clean it up later - keep it running
        (this as any).__focusObserver = focusObserver;
      }
  }

  private addChevronIcon(container: HTMLElement): void {
    const inner = container.querySelector('.choices__inner') as HTMLElement;
    if (!inner) return;
    
    // Remove existing chevron if present
    const existingChevron = inner.querySelector('.chevron-icon-wrapper');
    if (existingChevron) {
      existingChevron.remove();
    }
    
    // Create chevron icon wrapper
    const chevronWrapper = document.createElement('div');
    chevronWrapper.className = 'chevron-icon-wrapper';
    if (this.isDropdownOpen) {
      chevronWrapper.classList.add('open');
    }
    
    // Create vds-icon
    const chevronIcon = document.createElement('vds-icon');
    chevronIcon.setAttribute('name', 'chevron-down');
    chevronIcon.setAttribute('aria-hidden', 'true');
    if (this.state === 'disabled') {
      chevronIcon.setAttribute('aria-disabled', 'true');
    }
    
    chevronWrapper.appendChild(chevronIcon);
    inner.appendChild(chevronWrapper);
    
    // Update icon state when dropdown state changes
    const updateChevron = () => {
      if (this.isDropdownOpen) {
        chevronWrapper.classList.add('open');
      } else {
        chevronWrapper.classList.remove('open');
      }
    };
    
    // Store update function for later use
    (chevronWrapper as any).__updateChevron = updateChevron;
  }

  private updateDropdownItemsWithAvatars(): void {
    // Use requestAnimationFrame to ensure Choices.js has finished rendering
    requestAnimationFrame(() => {
      if (!this.choicesInstance) return;
        
        const container = this.selectElement?.closest('.choices') as HTMLElement;
        if (!container) return;
        
        const dropdownItems = container.querySelectorAll('.choices__list--dropdown .choices__item--selectable');
        
        dropdownItems.forEach((itemEl) => {
          // Skip if already processed
          if (itemEl.classList.contains('vds-choice-with-avatar')) return;
          
          // Try multiple ways to get the value
          const value = (itemEl as HTMLElement).getAttribute('data-value') || 
                        (itemEl as HTMLElement).getAttribute('data-id') ||
                        (itemEl as HTMLElement).getAttribute('id')?.replace('choices--', '') ||
                        itemEl.textContent?.trim();
          
          if (!value) return;
          
          // Find the option with this value - try exact match first, then string conversion
          let option = this._options.find(opt => opt.value === value);
          if (!option) {
            option = this._options.find(opt => String(opt.value) === String(value));
          }
          // Also try to match by label text if value doesn't match
          if (!option && value) {
            option = this._options.find(opt => opt.label === value);
          }
          
          if (option?.avatar) {
            // Check if item is selected
            const isSelected = this.value === option.value || 
                              (Array.isArray(this.value) && this.value.includes(option.value)) ||
                              option.selected ||
                              itemEl.classList.contains('is-selected');
            
            const checkmarkSvg = isSelected ? '<svg class="vds-choice-checkmark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '';
            
            // Replace the content but preserve data attributes
            const dataValue = (itemEl as HTMLElement).getAttribute('data-value');
            const dataId = (itemEl as HTMLElement).getAttribute('data-id');
            itemEl.classList.add('vds-choice-with-avatar');
            
            // Create avatar element properly to ensure it's upgraded as custom element
            const avatarEl = document.createElement('vds-avatar');
            avatarEl.setAttribute('variant', 'image');
            avatarEl.setAttribute('src', option.avatar);
            avatarEl.setAttribute('alt', option.label);
            avatarEl.setAttribute('size', 'lg');
            avatarEl.className = 'vds-choice-avatar';
            
            const labelEl = document.createElement('span');
            labelEl.className = 'vds-choice-label';
            labelEl.textContent = option.label;
            
            // Clear and append elements
            itemEl.innerHTML = '';
            itemEl.appendChild(avatarEl);
            itemEl.appendChild(labelEl);
            if (checkmarkSvg) {
              const checkmarkContainer = document.createElement('div');
              checkmarkContainer.innerHTML = checkmarkSvg;
              const checkmark = checkmarkContainer.firstElementChild;
              if (checkmark) {
                itemEl.appendChild(checkmark);
              }
            }
            
            // Ensure avatar is upgraded as custom element (if not already)
            if (customElements.get('vds-avatar')) {
              customElements.upgrade(avatarEl);
            }
            // Restore data attributes
            if (dataValue) (itemEl as HTMLElement).setAttribute('data-value', dataValue);
            if (dataId) (itemEl as HTMLElement).setAttribute('data-id', dataId);
          }
        });
        
        // Also update selected item in single select
        if (!this.multiple) {
          const selectedItem = container.querySelector('.choices__list--single .choices__item') as HTMLElement;
          if (selectedItem && !selectedItem.classList.contains('vds-item-with-avatar')) {
            const value = this.value as string;
            const option = this._options.find(opt => opt.value === value);
            
            if (option?.avatar) {
              selectedItem.classList.add('vds-item-with-avatar');
              
              // Create avatar element properly to ensure it's upgraded as custom element
              const avatarEl = document.createElement('vds-avatar');
              avatarEl.setAttribute('variant', 'image');
              avatarEl.setAttribute('src', option.avatar);
              avatarEl.setAttribute('alt', option.label);
              avatarEl.setAttribute('size', 'lg');
              avatarEl.className = 'vds-item-avatar';
              
              const labelEl = document.createElement('span');
              labelEl.className = 'vds-item-label';
              labelEl.textContent = option.label;
              
              // Clear and append elements
              selectedItem.innerHTML = '';
              selectedItem.appendChild(avatarEl);
              selectedItem.appendChild(labelEl);
              
              // Ensure avatar is upgraded as custom element (if not already)
              if (customElements.get('vds-avatar')) {
                customElements.upgrade(avatarEl);
              }
            }
          }
        }
        
                // Watch for new items being added to the dropdown
                const dropdownList = container.querySelector('.choices__list--dropdown');
                if (dropdownList && !(this as any).__avatarObserver) {
                  const observer = new MutationObserver(() => {
                    // Wait for vds-avatar to be defined before updating
                    customElements.whenDefined('vds-avatar').then(() => {
                      // Use requestAnimationFrame for DOM manipulation
                      requestAnimationFrame(() => {
                        this.updateDropdownItemsWithAvatars();
                      });
                    }).catch(() => {
                      // If vds-avatar is not available, still try to update
                      requestAnimationFrame(() => {
                        this.updateDropdownItemsWithAvatars();
                      });
                    });
                  });
                  
                  observer.observe(dropdownList, {
                    childList: true,
                    subtree: true
                  });
                  
                  (this as any).__avatarObserver = observer;
                }
    });
  }

  private replaceRemoveButtons(): void {
    if (!this.choicesInstance) return;
    
    const container = this.selectElement?.closest('.choices') as HTMLElement;
    if (!container) return;
    
    const replaceButtons = () => {
      const buttons = container.querySelectorAll('.choices__list--multiple .choices__item .choices__button');
      buttons.forEach((button) => {
        // Check if already replaced
        if (button.querySelector('vds-icon')) {
          return;
        }
        
        // Clear button content
        button.innerHTML = '';
        button.textContent = '';
        
        // Create vds-icon
        const icon = document.createElement('vds-icon');
        icon.setAttribute('name', 'xmark');
        icon.setAttribute('aria-hidden', 'true');
        button.appendChild(icon);
        
      });
    };
    
    // Replace immediately
    replaceButtons();
    
    // Watch for new buttons being added (when items are added)
    const observer = new MutationObserver(() => {
      replaceButtons();
    });
    
    const itemsList = container.querySelector('.choices__list--multiple');
    if (itemsList) {
      observer.observe(itemsList, {
        childList: true,
        subtree: true
      });
    }
    
    // Store observer for cleanup
    (this as any).__removeButtonObserver = observer;
  }

  private updateChevronIcon(container?: HTMLElement): void {
    const targetContainer = container || this.selectElement?.closest('.choices') as HTMLElement;
    if (!targetContainer) return;
    
    const chevronWrapper = targetContainer.querySelector('.chevron-icon-wrapper') as HTMLElement;
    if (chevronWrapper) {
      if (this.isDropdownOpen) {
        chevronWrapper.classList.add('open');
      } else {
        chevronWrapper.classList.remove('open');
      }
    }
  }

  private destroyChoices(): void {
    // Clean up focus observer if it exists
    if ((this as any).__focusObserver) {
      (this as any).__focusObserver.disconnect();
      (this as any).__focusObserver = null;
    }
    
    if (this.choicesInstance) {
      try {
        this.choicesInstance.destroy();
      } catch (error) {
        console.error('Error destroying Choices.js instance:', error);
      }
      this.choicesInstance = null;
    }
  }

  private updateChoicesValue(): void {
    if (!this.choicesInstance) return;

    try {
      if (this.multiple && Array.isArray(this.value)) {
        this.choicesInstance.setChoiceByValue(this.value);
      } else if (!this.multiple && typeof this.value === 'string') {
        this.choicesInstance.setChoiceByValue(this.value);
      }
    } catch (error) {
      console.error('Error updating Choices value:', error);
    }
  }

  private attachEventListeners(): void {
    if (!this.choicesInstance || !this.selectElement) return;

    // Change event
    this.selectElement.addEventListener('change', this.handleChange.bind(this));

    // Choices.js custom events
    this.choicesInstance.passedElement.element.addEventListener(
      'choice',
      this.handleChoice.bind(this) as EventListener
    );
    this.choicesInstance.passedElement.element.addEventListener(
      'addItem',
      this.handleAddItem.bind(this) as EventListener
    );
    this.choicesInstance.passedElement.element.addEventListener(
      'removeItem',
      this.handleRemoveItem.bind(this) as EventListener
    );

    // Focus/blur for state management - attach to Choices.js container in light DOM
    const choicesContainer = this.selectElement?.closest('.choices') as HTMLElement;
    const choicesInner = choicesContainer?.querySelector('.choices__inner') as HTMLElement;
    
    if (choicesInner) {
      // Add focus/blur listeners to the inner element
      choicesInner.addEventListener('focusin', () => {
        // Prevent focus in read-only or disabled state
        if (this.state === 'read-only' || this.state === 'disabled' || this.readonly || this.disabled) {
          return;
        }
        if (!this.preventFocusAfterSelection) {
          this.handleFocus();
        }
      });
      
      choicesInner.addEventListener('focusout', (e) => {
        // Only blur if focus is not moving to a dropdown item
        const relatedTarget = (e as FocusEvent).relatedTarget as HTMLElement;
        if (!relatedTarget || !relatedTarget.closest('.choices__list--dropdown')) {
          this.handleBlur();
        }
      });
      
      // Also listen to click to trigger focus state, but only if dropdown is not already active
      // Don't prevent default - let Choices.js handle the click to open dropdown
      choicesInner.addEventListener('click', (e) => {
        // Prevent interaction in read-only or disabled state
        if (this.state === 'read-only' || this.state === 'disabled' || this.readonly || this.disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        
        // Ensure display:none, visibility, and opacity are removed when clicking
        const container = this.selectElement?.closest('.choices') as HTMLElement;
        if (container) {
          const dropdown = container.querySelector('.choices__list--dropdown') as HTMLElement;
          if (dropdown) {
            // Always ensure position: absolute is set
            dropdown.style.position = 'absolute';
            // Remove forced styles when clicking to ensure dropdown can open
            if (dropdown.style.display === 'none') {
              dropdown.style.display = '';
            }
            if (dropdown.style.visibility === 'hidden') {
              dropdown.style.visibility = '';
            }
            if (dropdown.style.opacity === '0') {
              dropdown.style.opacity = '';
            }
            // Also ensure the container allows opening
            container.classList.remove('is-disabled');
          }
        }
        
        // Manually trigger showDropdown if Choices.js doesn't do it automatically
        // This is a fallback in case the click handler doesn't work
        if (this.choicesInstance && !this.isDropdownOpen) {
          // Use setTimeout to let Choices.js try first, then manually trigger if needed
          setTimeout(() => {
            const dropdown = container?.querySelector('.choices__list--dropdown') as HTMLElement;
            if (dropdown && !dropdown.classList.contains('is-active') && !this.isDropdownOpen) {
              // Choices.js didn't open it, manually trigger
              try {
                this.choicesInstance?.showDropdown();
              } catch (err) {
                // Ignore errors
              }
            }
          }, 10);
        }
        
        // Don't prevent default - let Choices.js handle opening the dropdown
        // Only add focus if we're not preventing focus after selection
        // Let Choices.js handle the dropdown opening, we just manage focus state
        if (!this.preventFocusAfterSelection) {
          // Use setTimeout to let Choices.js handle the click first
          setTimeout(() => {
            this.handleFocus();
          }, 0);
        }
      });
      
      // Listen to dropdown open/close events from Choices.js
      if (this.choicesInstance) {
        // Add event listener when dropdown opens/closes
        const originalShow = this.choicesInstance.showDropdown.bind(this.choicesInstance);
        const originalHide = this.choicesInstance.hideDropdown.bind(this.choicesInstance);
        
        this.choicesInstance.showDropdown = () => {
          // Prevent opening dropdown in read-only or disabled state
          if (this.state === 'read-only' || this.state === 'disabled' || this.readonly || this.disabled) {
            return;
          }
          
          // Call original show
          originalShow();
          
          // Ensure dropdown is visible (remove any forced display:none from initialization)
          const currentContainer = this.selectElement?.closest('.choices') as HTMLElement;
          let dropdown: HTMLElement | null = null;
          if (currentContainer) {
            dropdown = currentContainer.querySelector('.choices__list--dropdown') as HTMLElement;
            if (dropdown) {
              // Ensure position: absolute is always set first
              dropdown.style.position = 'absolute';
              // Override !important CSS rules with inline styles when opening
              // Use 'flex' to match the CSS .is-active rule (display: flex)
              dropdown.style.display = 'block';
              dropdown.style.visibility = 'visible';
              dropdown.style.opacity = '1';
              // Ensure is-active class is present (in case it was removed)
              dropdown.classList.add('is-active');
            }
            currentContainer.classList.add('is-open');
          }
          
          // Update dropdown state
          this.isDropdownOpen = true;
          
          // For multi-select, always ensure the dropdown search input is visible
          // Search is always enabled for multi-select dropdowns for better UX
          if (this.multiple && dropdown) {
            requestAnimationFrame(() => {
              // Use double requestAnimationFrame to ensure Choices.js has rendered the input
              requestAnimationFrame(() => {
                // Ensure search input exists in dropdown
                let dropdownInput = dropdown?.querySelector('.choices__input') as HTMLInputElement;
                
                // If search input doesn't exist and Choices.js didn't create it, ensure search is enabled
                if (!dropdownInput && this.choicesInstance) {
                  // Force Choices.js to show search by ensuring searchEnabled is true
                  // This might trigger a re-render, so we'll check again
                  const choicesInstance = this.choicesInstance as any;
                  if (choicesInstance.config && choicesInstance.config.searchEnabled !== true) {
                    choicesInstance.config.searchEnabled = true;
                    // Trigger Choices to re-render with search
                    try {
                      choicesInstance.render();
                    } catch (e) {
                      // Ignore render errors
                    }
                    // Check again after potential re-render
                    dropdownInput = dropdown?.querySelector('.choices__input') as HTMLInputElement;
                  }
                }
                
                if (dropdownInput) {
                  // Force visibility and proper styling
                  dropdownInput.style.display = 'block';
                  dropdownInput.style.visibility = 'visible';
                  dropdownInput.style.opacity = '1';
                  dropdownInput.style.width = '100%';
                  dropdownInput.style.padding = 'var(--vds-spacing-sm, 8px) var(--vds-spacing-md, 12px)';
                  dropdownInput.style.margin = '0 0 var(--vds-spacing-xs, 4px) 0';
                  dropdownInput.style.color = 'var(--vds-color-text-primary, #070922)';
                  dropdownInput.style.background = 'var(--vds-color-white, #ffffff)';
                  dropdownInput.style.border = '1px solid var(--vds-color-gray-300, #eaeef4)';
                  dropdownInput.style.borderRadius = 'var(--vds-radius-md, 0.375rem)';
                  dropdownInput.style.pointerEvents = 'auto';
                  
                  // Set placeholder
                  dropdownInput.placeholder = this.placeholder || 'Search...';
                  dropdownInput.setAttribute('placeholder', this.placeholder || 'Search...');
                }
              });
            });
          }
          
          // Update chevron icon
          if (currentContainer) {
            this.updateChevronIcon(currentContainer);
          }
          // Reset prevent flag when opening dropdown (user is actively interacting)
          this.preventFocusAfterSelection = false;
          // Allow normal focus when opening
          this.handleFocus();
        };
        
        this.choicesInstance.hideDropdown = () => {
          originalHide();
          // Update dropdown state
          this.isDropdownOpen = false;
          
          // Ensure dropdown is properly closed via DOM
          const currentContainer = this.selectElement?.closest('.choices') as HTMLElement;
          if (currentContainer) {
            const dropdown = currentContainer.querySelector('.choices__list--dropdown') as HTMLElement;
            if (dropdown) {
              dropdown.classList.remove('is-active');
              // Ensure position: absolute is maintained when closing (prevents layout shift)
              dropdown.style.position = 'absolute';
              // Hide the dropdown but keep it absolutely positioned
              dropdown.style.display = 'none';
              dropdown.style.visibility = 'hidden';
              dropdown.style.opacity = '0';
            }
            currentContainer.classList.remove('is-open');
          }
          
          // Update chevron icon
          if (currentContainer) {
            this.updateChevronIcon(currentContainer);
          }
          
          // Clear focus state immediately when dropdown closes
          // Use setTimeout to ensure it happens after Choices.js finishes its cleanup
          setTimeout(() => {
            this.handleBlur();
            // Ensure preventFocusAfterSelection is set to prevent focus from being re-added
            this.preventFocusAfterSelection = true;
            setTimeout(() => {
              this.preventFocusAfterSelection = false;
            }, 200);
          }, 0);
        };
      }
    }
  }

  private handleChange(event: Event): void {
    if (!this.choicesInstance) return;

    const values = this.multiple
      ? this.choicesInstance.getValue(true) as string[]
      : this.choicesInstance.getValue(true) as string;

    this.value = values;

    const selectedOptions = this.getSelectedOptions();

    const detail: SelectChangeEventDetail = {
      value: values,
      selectedOptions,
      originalEvent: event
    };

    this.dispatchEvent(
      new CustomEvent('vds-select-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private handleChoice(event: Event): void {
    // Prevent choice selection in read-only or disabled state
    if (this.state === 'read-only' || this.state === 'disabled' || this.readonly || this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    // This is fired when a choice is selected
    this.handleChange(event);
    
    // For single select, close the dropdown after selection
    if (!this.multiple && this.choicesInstance) {
      // Use setTimeout to ensure the change event is processed first
      setTimeout(() => {
        if (this.choicesInstance) {
          try {
            // Call hideDropdown which will handle everything
            this.choicesInstance.hideDropdown();
            this.isDropdownOpen = false;
            
            // Also ensure via DOM manipulation as a backup
            const container = this.selectElement?.closest('.choices') as HTMLElement;
            if (container) {
              const dropdown = container.querySelector('.choices__list--dropdown') as HTMLElement;
              if (dropdown) {
                dropdown.classList.remove('is-active');
                // Force hide the dropdown
                dropdown.style.display = 'none';
              }
              container.classList.remove('is-open');
              container.classList.remove('is-focused');
            }
          } catch (e) {
            // If hideDropdown fails, force close via DOM
            const container = this.selectElement?.closest('.choices') as HTMLElement;
            if (container) {
              const dropdown = container.querySelector('.choices__list--dropdown') as HTMLElement;
              if (dropdown) {
                dropdown.classList.remove('is-active');
                dropdown.style.display = 'none';
              }
              container.classList.remove('is-open');
            }
            this.isDropdownOpen = false;
          }
        }
      }, 50); // Small delay to let Choices.js process the selection
    }
    
    // Prevent focus from being re-added after selection
    this.preventFocusAfterSelection = true;
    
    // Clear focus state immediately after selection to prevent focus color from persisting
    this.handleBlur();
    
    // Aggressively remove Choices.js focus classes and box-shadow
    const removeChoicesFocusClasses = () => {
      const container = this.selectElement?.closest('.choices') as HTMLElement;
      if (container) {
        container.classList.remove('is-focused', 'is-open');
        const inner = container.querySelector('.choices__inner') as HTMLElement;
        if (inner) {
          inner.classList.remove('is-focused', 'is-open');
          // Force remove box-shadow via inline style
          inner.style.setProperty('box-shadow', 'none', 'important');
        }
      }
    };
    
    // Remove classes immediately and multiple times
    removeChoicesFocusClasses();
    requestAnimationFrame(removeChoicesFocusClasses);
    
    // Only close dropdown for single select, keep it open for multi-select
    if (!this.multiple) {
      // Ensure dropdown closes for single select and focus is cleared
      requestAnimationFrame(() => {
        if (this.choicesInstance) {
          this.choicesInstance.hideDropdown();
        }
        // Double-check to ensure focus state is cleared
        this.handleBlur();
        removeChoicesFocusClasses();
        
        // Continue removing classes for a bit
        setTimeout(() => {
          this.handleBlur();
          removeChoicesFocusClasses();
        }, 50);
        
        // Reset the prevent flag after a delay
        setTimeout(() => {
          this.preventFocusAfterSelection = false;
        }, 400);
      });
    } else {
      // For multi-select, just clear focus classes and reset flag
      setTimeout(() => {
        this.handleBlur();
        removeChoicesFocusClasses();
        this.preventFocusAfterSelection = false;
      }, 200);
    }
  }

  private handleAddItem(event: CustomEvent): void {
    if (!this.choicesInstance) return;
    
    // Prevent adding items in read-only or disabled state
    if (this.state === 'read-only' || this.state === 'disabled' || this.readonly || this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Get the new item that was added
    const newChoice = event.detail.choice;
    if (newChoice) {
      // Add the new option to our internal options array
      const newOption: SelectOption = {
        value: newChoice.value,
        label: newChoice.label || newChoice.value,
        selected: true
      };
      
      // Check if option already exists (shouldn't happen, but just in case)
      const existingIndex = this._options.findIndex(opt => opt.value === newOption.value);
      if (existingIndex === -1) {
        this._options.push(newOption);
      } else {
        // Update existing option
        this._options[existingIndex] = { ...this._options[existingIndex], ...newOption };
      }
    }

    const values = this.multiple
      ? this.choicesInstance.getValue(true) as string[]
      : this.choicesInstance.getValue(true) as string;

    this.value = values;

    this.dispatchEvent(
      new CustomEvent('vds-select-add-item', {
        detail: {
          value: newChoice?.value,
          label: newChoice?.label || newChoice?.value,
          originalEvent: event
        },
        bubbles: true,
        composed: true
      })
    );

    this.handleChange(event);
    
    // Re-check overflow after adding an item
    if (this.multiple) {
      this.checkOverflow();
    }
    
    // Replace remove buttons for newly added items
    if (this.removeItemButton && this.multiple) {
      setTimeout(() => {
        this.replaceRemoveButtons();
      }, 50);
    }
  }

  private handleRemoveItem(event: CustomEvent): void {
    if (!this.choicesInstance) return;
    
    // Prevent removing items in read-only or disabled state
    if (this.state === 'read-only' || this.state === 'disabled' || this.readonly || this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const values = this.multiple
      ? this.choicesInstance.getValue(true) as string[]
      : this.choicesInstance.getValue(true) as string;

    this.value = values;

    this.dispatchEvent(
      new CustomEvent('vds-select-remove-item', {
        detail: {
          value: event.detail.choice?.value,
          originalEvent: event
        },
        bubbles: true,
        composed: true
      })
    );

    // Restore placeholder when all items are removed (multi-select only)
    if (this.multiple && this.placeholder) {
      requestAnimationFrame(() => {
        const container = this.selectElement?.closest('.choices') as HTMLElement;
        if (container) {
          const inputs = container.querySelectorAll('.choices__input:not(.choices__input--cloned)');
          inputs.forEach((input) => {
            const inputEl = input as HTMLInputElement;
            if (inputEl && inputEl.tagName === 'INPUT') {
              // Check if value is empty (no selected items)
              const hasSelectedItems = Array.isArray(this.value) ? this.value.length > 0 : Boolean(this.value);
              if (!hasSelectedItems && (!inputEl.value || inputEl.value === '')) {
                inputEl.placeholder = this.placeholder;
                inputEl.setAttribute('placeholder', this.placeholder);
              }
            }
          });
        }
      });
    }

    this.handleChange(event);
  }

  private handleFocus(): void {
    // Don't add focus if we're preventing it after selection
    if (this.preventFocusAfterSelection) {
      return;
    }
    
    if (this.state !== 'disabled' && this.state !== 'read-only') {
      // Add is-focused class directly to the choices inner element (doesn't trigger Lit)
      const container = this.selectElement?.closest('.choices') as HTMLElement;
      const inner = container?.querySelector('.choices__inner') as HTMLElement;
      if (inner) {
        inner.classList.add('is-focused');
      }
      
      // Update state property only when safe - wait for any pending updates to complete
      if (this.state !== 'active') {
        // Always wait for updateComplete before changing state to avoid conflicts
        Promise.resolve().then(() => {
          return this.updateComplete;
        }).then(() => {
          // Small additional delay to ensure we're out of any synchronous update cycle
          return new Promise(resolve => setTimeout(resolve, 0));
        }).then(() => {
          if (this.isConnected && this.state !== 'active' && this.state !== 'disabled' && this.state !== 'read-only') {
            this.state = 'active';
          }
        });
      }
    }
  }

  private handleBlur(): void {
    // Remove is-focused and is-open classes and reset to normal state
    const container = this.selectElement?.closest('.choices') as HTMLElement;
    if (container) {
      // Remove classes from container (doesn't trigger Lit)
      container.classList.remove('is-focused', 'is-open');
      
      // Remove classes from inner
      const inner = container.querySelector('.choices__inner') as HTMLElement;
      if (inner) {
        inner.classList.remove('is-focused', 'is-open');
      }
    }
    
    // Update state property only when safe - wait for any pending updates to complete
    if (this.state === 'active') {
      // Always wait for updateComplete before changing state to avoid conflicts
      Promise.resolve().then(() => {
        return this.updateComplete;
      }).then(() => {
        // Small additional delay to ensure we're out of any synchronous update cycle
        return new Promise(resolve => setTimeout(resolve, 0));
      }).then(() => {
        if (this.isConnected && this.state === 'active') {
          this.state = 'normal';
        }
      });
    }
  }

  private getSelectedOptions(): SelectOption[] {
    if (!this.choicesInstance) return [];

    const values = this.multiple
      ? (this.choicesInstance.getValue(true) as string[])
      : [this.choicesInstance.getValue(true) as string];

    return this._options.filter(opt => values.includes(opt.value));
  }

  /**
   * Public method to set options
   */
  public setOptions(options: SelectOption[]): void {
    // Store options synchronously (not reactive to avoid conflicts)
    this._options = options;
    
    // If component is not connected yet, options will be used when it connects
    if (!this.isConnected) {
      return;
    }
    
    // Find select element in shadow DOM first (might already exist)
    if (!this.selectElement) {
      this.selectElement = this.shadowRoot?.querySelector('select') as HTMLSelectElement;
    }
    
    // If select element exists and we already have a Choices instance, just update it
    if (this.selectElement && this.choicesInstance) {
      // Destroy and reinitialize with new options
      this.destroyChoices();
      // Request a render update to show the new options
      this.requestUpdate();
      // Initialize immediately if select exists
      this.updateComplete.then(() => {
        this.initializeChoices();
      });
      return;
    }
    
    // Request a render update to show the new options
    this.requestUpdate();
    
    // Wait for render to complete, then initialize
    // Use a simple promise chain without extra delays
    Promise.resolve().then(() => {
      return this.updateComplete;
    }).then(() => {
      // Find select element in shadow DOM
      if (!this.selectElement) {
        this.selectElement = this.shadowRoot?.querySelector('select') as HTMLSelectElement;
      }
      
      if (this.selectElement) {
        // Initialize or reinitialize Choices.js
        if (this.choicesInstance) {
          this.destroyChoices();
        }
        this.initializeChoices();
      } else {
        // If still not found after render, try once more on next frame
        requestAnimationFrame(() => {
          this.selectElement = this.shadowRoot?.querySelector('select') as HTMLSelectElement;
          if (this.selectElement) {
            if (this.choicesInstance) {
              this.destroyChoices();
            }
            this.initializeChoices();
          }
        });
      }
    });
  }


  /**
   * Public method to get current value
   */
  public getValue(): string | string[] {
    return this.value;
  }

  /**
   * Public method to clear selection
   */
  public clearValue(): void {
    if (this.choicesInstance) {
      this.choicesInstance.clearStore();
      this.value = this.multiple ? [] : '';
    }
  }

  render() {
    const selectId = this.id || `vds-select-${Math.random().toString(36).substr(2, 9)}`;
    // Check if there's a slotted select in light DOM
    const hasSlottedSelect = this.querySelector('select') !== null;

    return html`
      <div class="wrapper" part="wrapper">
        ${this.label
          ? html`
              <label class="label" part="label" for=${selectId}>
                ${this.label}
                <slot name="info-icon" part="info-icon"></slot>
              </label>
            `
          : nothing}
        <div class="select-container" part="select">
          <slot @slotchange=${this.handleSlotChange.bind(this)}></slot>
          ${!hasSlottedSelect
            ? html`
                <select
                  id=${selectId}
                  name=${this.name || nothing}
                  ?multiple=${this.multiple}
                  ?disabled=${this.disabled || this.state === 'disabled' || this.state === 'read-only'}
                  aria-label=${this.ariaLabel || nothing}
                  aria-describedby=${this.ariaDescribedBy || (this.helperText ? `${selectId}-desc` : nothing)}
                >
                  ${this.placeholder && !this.multiple && this._options.length === 0
                    ? html`<option value="" disabled selected>${this.placeholder}</option>`
                    : nothing}
                  ${this._options.length > 0
                    ? this._options.map(
                        option => html`
                          <option
                            value=${option.value}
                            ?disabled=${option.disabled}
                            ?selected=${option.selected}
                          >
                            ${option.label}
                          </option>
                        `
                      )
                    : this.placeholder && !this.multiple
                    ? nothing
                    : html`<option value="">No options</option>`}
                </select>
              `
            : nothing}
        </div>
        ${this.helperText || (this.state === 'error' && this.errorMessage)
          ? html`
              <div class="helper-text" part="helper-text" id=${`${selectId}-desc`}>
                ${this.state === 'error' && this.errorMessage ? this.errorMessage : this.helperText}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private setupOverflowHandling(): void {
    if (!this.multiple) return;
    
    const container = this.selectElement?.closest('.choices') as HTMLElement;
    if (!container) {
      // Retry on next frame if container not found
      requestAnimationFrame(() => {
        if (!this.selectElement?.closest('.choices')) {
          requestAnimationFrame(() => this.setupOverflowHandling());
        } else {
          this.setupOverflowHandling();
        }
      });
      return;
    }

    const inner = container.querySelector('.choices__inner') as HTMLElement;
    if (!inner) {
      requestAnimationFrame(() => {
        if (!container.querySelector('.choices__inner')) {
          requestAnimationFrame(() => this.setupOverflowHandling());
        } else {
          this.setupOverflowHandling();
        }
      });
      return;
    }

    // Initial check
    this.checkOverflow();

    // Setup ResizeObserver to watch for container size changes
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    this.resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame for immediate but batched updates
      if (this.overflowCheckTimeout !== null) {
        cancelAnimationFrame(this.overflowCheckTimeout);
      }
      this.overflowCheckTimeout = requestAnimationFrame(() => {
        this.checkOverflow();
        this.overflowCheckTimeout = null;
      });
    });

    this.resizeObserver.observe(inner);

    // Also watch for DOM changes (items being added/removed)
    const mutationObserver = new MutationObserver(() => {
      // Use requestAnimationFrame for immediate but batched updates
      if (this.overflowCheckTimeout !== null) {
        cancelAnimationFrame(this.overflowCheckTimeout);
      }
      this.overflowCheckTimeout = requestAnimationFrame(() => {
        this.checkOverflow();
        this.overflowCheckTimeout = null;
      });
    });

    mutationObserver.observe(inner, {
      childList: true,
      subtree: true,
      attributes: false
    });
  }

  private checkOverflow(): void {
    if (!this.multiple || !this.choicesInstance) return;
    
    // Prevent re-entrancy - if already checking, skip
    if (this.isCheckingOverflow) return;
    
    this.isCheckingOverflow = true;

    const container = this.selectElement?.closest('.choices') as HTMLElement;
    if (!container) {
      this.isCheckingOverflow = false;
      return;
    }

    const inner = container.querySelector('.choices__inner') as HTMLElement;
    if (!inner) {
      this.isCheckingOverflow = false;
      return;
    }

    const itemsList = inner.querySelector('.choices__list--multiple') as HTMLElement;
    if (!itemsList) {
      this.isCheckingOverflow = false;
      return;
    }

    // Get all choice items (excluding any existing "more" indicator)
    // Note: No inline input in multi-select mode (search is in dropdown only)
    const allItems = Array.from(itemsList.children).filter(
      (child) => {
        const el = child as HTMLElement;
        return (
          el.classList.contains('choices__item') &&
          !el.classList.contains('vds-more-count') &&
          !el.classList.contains('choices__input')
        );
      }
    ) as HTMLElement[];

    if (allItems.length === 0) {
      this.isCheckingOverflow = false;
      return;
    }

    // Remove ALL existing "more" indicators (in case multiple were created)
    const existingMore = itemsList.querySelectorAll('.vds-more-count');
    existingMore.forEach((more) => more.remove());

    // Remove hidden class and restore visibility from all items
    allItems.forEach((item) => {
      item.classList.remove('vds-hidden');
      item.style.display = '';
      item.style.visibility = '';
      item.style.opacity = '';
    });

    // Get available width (accounting for padding and chevron only - no inline input in multi-select)
    const chevron = inner.querySelector('.chevron-icon-wrapper') as HTMLElement;
    const innerPadding = parseFloat(getComputedStyle(inner).paddingLeft) + parseFloat(getComputedStyle(inner).paddingRight);
    const chevronWidth = chevron ? chevron.offsetWidth + 8 : 0; // Add some spacing
    const availableWidth = inner.offsetWidth - innerPadding - chevronWidth;

    // Calculate how many items fit
    let totalWidth = 0;
    let visibleCount = 0;
    const gap = 3; // Gap between items

    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      // Ensure item is visible to measure it
      item.style.display = '';
      item.style.visibility = 'visible';
      const itemWidth = item.offsetWidth + gap;
      
      // Reserve space for "more" indicator if there are more items after this one
      const hasMoreItems = i < allItems.length - 1;
      const remainingCount = allItems.length - (i + 1);
      // Estimate width for "X more" indicator (depends on number of digits)
      const moreIndicatorWidth = hasMoreItems ? (remainingCount > 9 ? 75 : 65) : 0;
      
      if (totalWidth + itemWidth + moreIndicatorWidth <= availableWidth) {
        totalWidth += itemWidth;
        visibleCount++;
      } else {
        // Hide remaining items
        for (let j = visibleCount; j < allItems.length; j++) {
          allItems[j].classList.add('vds-hidden');
          allItems[j].style.display = 'none';
          allItems[j].style.visibility = 'hidden';
        }
        
        // Add "more" indicator (only if we haven't already added one)
        const hiddenCount = allItems.length - visibleCount;
        if (hiddenCount > 0 && !itemsList.querySelector('.vds-more-count')) {
          const moreItem = document.createElement('div');
          moreItem.className = 'choices__item choices__item--more vds-more-count';
          moreItem.setAttribute('role', 'status');
          moreItem.setAttribute('aria-live', 'polite');
          moreItem.textContent = `${hiddenCount} more`;
          moreItem.style.flexShrink = '0';
          moreItem.style.display = 'inline-flex';
          moreItem.style.visibility = 'visible';
          // Append to the end of the items list (no inline input to insert before)
          itemsList.appendChild(moreItem);
        }
        break;
      }
    }
    
    // If all items fit, make sure none are hidden
    if (visibleCount === allItems.length) {
      allItems.forEach((item) => {
        item.classList.remove('vds-hidden');
        item.style.display = '';
        item.style.visibility = '';
      });
    }
    
    // Reset the flag
    this.isCheckingOverflow = false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vds-select': VDSSelect;
  }
}
