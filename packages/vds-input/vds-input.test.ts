import { expect, fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';

const flatpickrMock = vi.fn((element: HTMLElement) => ({
  destroy: vi.fn(),
  setDate: vi.fn(),
  input: element as HTMLInputElement
}));

vi.mock('flatpickr', () => ({
  default: flatpickrMock
}));
import { VDSInput } from './vds-input.js';

describe('VDSInput', () => {
  it('should be defined', () => {
    expect(VDSInput).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSInput>(html`<vds-input></vds-input>`);
    
    expect(el.type).to.equal('text');
    expect(el.value).to.equal('');
    expect(el.disabled).to.equal(false);
    expect(el.required).to.equal(false);
  });

  it('should reflect type attribute', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input type="email"></vds-input>`
    );
    
    expect(el.type).to.equal('email');
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.type).to.equal('email');
  });

  it('should reflect value property', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input value="test value"></vds-input>`
    );
    
    expect(el.value).to.equal('test value');
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.value).to.equal('test value');
  });

  it('should reflect disabled attribute', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input disabled></vds-input>`
    );
    
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.disabled).to.be.true;
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.disabled).to.be.true;
  });

  it('should reflect required attribute', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input required></vds-input>`
    );
    
    expect(el.hasAttribute('required')).to.be.true;
    expect(el.required).to.be.true;
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.required).to.be.true;
  });

  it('should display label', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input label="Email Address"></vds-input>`
    );
    
    const label = el.shadowRoot?.querySelector('label');
    expect(label?.textContent).to.include('Email Address');
  });

  it('should display required indicator in label', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input label="Email" required></vds-input>`
    );
    
    const label = el.shadowRoot?.querySelector('label');
    expect(label?.classList.contains('required')).to.be.true;
  });

  it('should display error message', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input error-message="This field is required"></vds-input>`
    );
    
    const errorText = el.shadowRoot?.querySelector('.error-text');
    expect(errorText?.textContent).to.include('This field is required');
  });

  it('should display helper text', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input helper-text="Enter your email address"></vds-input>`
    );
    
    const helperText = el.shadowRoot?.querySelector('.helper-text');
    expect(helperText?.textContent).to.include('Enter your email address');
  });

  it('should dispatch vds-input-input event on input', async () => {
    const el = await fixture<VDSInput>(html`<vds-input></vds-input>`);
    let inputEvent: CustomEvent | null = null;

    el.addEventListener('vds-input-input', (e) => {
      inputEvent = e as CustomEvent;
    });

    const input = el.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new Event('input', { bubbles: true }));

    expect(inputEvent).to.not.be.null;
    expect(inputEvent?.bubbles).to.be.true;
    expect(inputEvent?.composed).to.be.true;
  });

  it('should dispatch vds-input-change event on change', async () => {
    const el = await fixture<VDSInput>(html`<vds-input></vds-input>`);
    let changeEvent: CustomEvent | null = null;

    el.addEventListener('vds-input-change', (e) => {
      changeEvent = e as CustomEvent;
    });

    const input = el.shadowRoot?.querySelector('input');
    input?.dispatchEvent(new Event('change', { bubbles: true }));

    expect(changeEvent).to.not.be.null;
    expect(changeEvent?.bubbles).to.be.true;
    expect(changeEvent?.composed).to.be.true;
  });

  it('should update value on input', async () => {
    const el = await fixture<VDSInput>(html`<vds-input></vds-input>`);
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    
    input.value = 'new value';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    expect(el.value).to.equal('new value');
  });

  it('should initialize flatpickr for date input', async () => {
    flatpickrMock.mockClear();
    await fixture<VDSInput>(html`<vds-input type="date"></vds-input>`);
    expect(flatpickrMock).toHaveBeenCalledTimes(1);
  });

  it('should initialize flatpickr for time input', async () => {
    flatpickrMock.mockClear();
    await fixture<VDSInput>(html`<vds-input type="time"></vds-input>`);
    expect(flatpickrMock).toHaveBeenCalledTimes(1);
  });

  it('should initialize flatpickr for datetime input', async () => {
    flatpickrMock.mockClear();
    await fixture<VDSInput>(html`<vds-input type="datetime"></vds-input>`);
    expect(flatpickrMock).toHaveBeenCalledTimes(1);
  });

  it('should initialize flatpickr for daterange input', async () => {
    flatpickrMock.mockClear();
    await fixture<VDSInput>(html`<vds-input type="daterange"></vds-input>`);
    expect(flatpickrMock).toHaveBeenCalledTimes(1);
  });

  it('should render password toggle button', async () => {
    const el = await fixture<VDSInput>(html`<vds-input type="password"></vds-input>`);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector('.toggle-visibility') as HTMLButtonElement;
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

    expect(button).to.exist;
    expect(input.type).to.equal('password');

    button.click();
    await el.updateComplete;
    expect(input.type).to.equal('text');

    button.click();
    await el.updateComplete;
    expect(input.type).to.equal('password');
  });

  it('should validate email format on blur', async () => {
    const el = await fixture<VDSInput>(html`<vds-input type="email" validate-on-blur></vds-input>`);
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

    // Set invalid email
    input.value = 'invalid-email';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    // Blur to trigger validation
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    await el.updateComplete;

    expect(el.state).to.equal('error');
    expect(el.errorMessage).to.equal('Please enter a valid email address');
  });

  it('should clear error state when valid email is entered', async () => {
    const el = await fixture<VDSInput>(html`<vds-input type="email" validate-on-blur></vds-input>`);
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

    // Set invalid email and blur
    input.value = 'invalid-email';
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    await el.updateComplete;
    expect(el.state).to.equal('error');

    // Enter valid email
    input.value = 'valid@example.com';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    // Blur to trigger validation
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    await el.updateComplete;

    expect(el.state).to.equal('normal');
  });

  it('should allow custom error message', async () => {
    const el = await fixture<VDSInput>(
      html`<vds-input type="email" error-message="Custom error message"></vds-input>`
    );
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement;

    input.value = 'invalid-email';
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    await el.updateComplete;

    expect(el.errorMessage).to.equal('Custom error message');
  });

  it('should provide validate() method', async () => {
    const el = await fixture<VDSInput>(html`<vds-input type="email" value="invalid-email"></vds-input>`);
    
    const isValid = el.validate();
    expect(isValid).to.be.false;
    expect(el.state).to.equal('error');

    el.value = 'valid@example.com';
    const isValidAfter = el.validate();
    expect(isValidAfter).to.be.true;
    expect(el.state).to.equal('normal');
  });

  it('should use custom date format', async () => {
    flatpickrMock.mockClear();
    const el = await fixture<VDSInput>(
      html`<vds-input type="date" date-format="m/d/Y"></vds-input>`
    );
    expect(flatpickrMock).toHaveBeenCalledTimes(1);
    const config = flatpickrMock.mock.calls[0][1];
    expect(config.dateFormat).to.equal('m/d/Y');
  });

  it('should use custom time format', async () => {
    flatpickrMock.mockClear();
    const el = await fixture<VDSInput>(
      html`<vds-input type="time" time-format="h:i K" time-24hr="false"></vds-input>`
    );
    expect(flatpickrMock).toHaveBeenCalledTimes(1);
    const config = flatpickrMock.mock.calls[0][1];
    expect(config.dateFormat).to.equal('h:i K');
    expect(config.time_24hr).to.be.false;
  });

  it('should use custom datetime format', async () => {
    flatpickrMock.mockClear();
    const el = await fixture<VDSInput>(
      html`<vds-input type="datetime" datetime-format="m/d/Y h:i K"></vds-input>`
    );
    expect(flatpickrMock).toHaveBeenCalledTimes(1);
    const config = flatpickrMock.mock.calls[0][1];
    expect(config.dateFormat).to.equal('m/d/Y h:i K');
  });

  it('should use custom daterange format', async () => {
    flatpickrMock.mockClear();
    const el = await fixture<VDSInput>(
      html`<vds-input type="daterange" daterange-format="m/d/Y"></vds-input>`
    );
    expect(flatpickrMock).toHaveBeenCalledTimes(1);
    const config = flatpickrMock.mock.calls[0][1];
    expect(config.dateFormat).to.equal('m/d/Y');
    expect(config.mode).to.equal('range');
  });
});

