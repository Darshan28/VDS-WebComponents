import { expect, fixture, html } from '@open-wc/testing';
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
});

