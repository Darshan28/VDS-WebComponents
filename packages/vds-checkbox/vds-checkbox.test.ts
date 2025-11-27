import { expect, fixture, html } from '@open-wc/testing';
import { VDSCheckbox } from './vds-checkbox.js';

describe('VDSCheckbox', () => {
  it('should be defined', () => {
    expect(VDSCheckbox).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox></vds-checkbox>`);

    expect(el.size).to.equal('regular');
    expect(el.state).to.equal('unchecked');
    expect(el.checked).to.be.false;
    expect(el.indeterminate).to.be.false;
    expect(el.disabled).to.be.false;
  });

  it('should reflect size attribute', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox size="small"></vds-checkbox>`);
    expect(el.getAttribute('size')).to.equal('small');
    expect(el.size).to.equal('small');
  });

  it('should reflect checked attribute', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox checked></vds-checkbox>`);
    expect(el.hasAttribute('checked')).to.be.true;
    expect(el.checked).to.be.true;
    expect(el.state).to.equal('checked');
  });

  it('should reflect indeterminate attribute', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox indeterminate></vds-checkbox>`);
    expect(el.hasAttribute('indeterminate')).to.be.true;
    expect(el.indeterminate).to.be.true;
    expect(el.state).to.equal('indeterminate');
  });

  it('should reflect disabled attribute', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox disabled></vds-checkbox>`);
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.disabled).to.be.true;
    expect(el.state).to.equal('disabled');
  });

  it('should toggle checked state on click', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox></vds-checkbox>`);
    const container = el.shadowRoot?.querySelector('.checkbox-container');

    expect(el.checked).to.be.false;
    container?.click();
    await el.updateComplete;

    expect(el.checked).to.be.true;
    expect(el.state).to.equal('checked');
  });

  it('should emit change event when toggled', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox></vds-checkbox>`);
    const container = el.shadowRoot?.querySelector('.checkbox-container');
    let eventFired = false;

    el.addEventListener('vds-checkbox-change', (e: CustomEvent) => {
      eventFired = true;
      expect(e.detail.checked).to.be.true;
      expect(e.detail.indeterminate).to.be.false;
    });

    container?.click();
    await el.updateComplete;

    expect(eventFired).to.be.true;
  });

  it('should not toggle when disabled', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox disabled></vds-checkbox>`);
    const container = el.shadowRoot?.querySelector('.checkbox-container');

    expect(el.checked).to.be.false;
    container?.click();
    await el.updateComplete;

    expect(el.checked).to.be.false;
    expect(el.state).to.equal('disabled');
  });

  it('should show hover state on mouse enter', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox></vds-checkbox>`);
    const container = el.shadowRoot?.querySelector('.checkbox-container');

    container?.dispatchEvent(new MouseEvent('mouseenter'));
    await el.updateComplete;

    expect(el.state).to.equal('hover');
  });

  it('should revert to unchecked on mouse leave from hover', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox></vds-checkbox>`);
    const container = el.shadowRoot?.querySelector('.checkbox-container');

    container?.dispatchEvent(new MouseEvent('mouseenter'));
    await el.updateComplete;
    expect(el.state).to.equal('hover');

    container?.dispatchEvent(new MouseEvent('mouseleave'));
    await el.updateComplete;
    expect(el.state).to.equal('unchecked');
  });

  it('should not show hover state when disabled', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox disabled></vds-checkbox>`);
    const container = el.shadowRoot?.querySelector('.checkbox-container');

    container?.dispatchEvent(new MouseEvent('mouseenter'));
    await el.updateComplete;

    expect(el.state).to.equal('disabled');
  });

  it('should convert indeterminate to checked on click', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox indeterminate></vds-checkbox>`);
    const container = el.shadowRoot?.querySelector('.checkbox-container');

    expect(el.indeterminate).to.be.true;
    expect(el.checked).to.be.false;

    container?.click();
    await el.updateComplete;

    expect(el.indeterminate).to.be.false;
    expect(el.checked).to.be.true;
    expect(el.state).to.equal('checked');
  });

  it('should render label when provided', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox label="Test Label"></vds-checkbox>`);
    const label = el.shadowRoot?.querySelector('.label');

    expect(label).to.exist;
    expect(label?.textContent).to.equal('Test Label');
  });

  it('should render slot content when no label', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox>Slot content</vds-checkbox>`);
    const slot = el.shadowRoot?.querySelector('slot');

    expect(slot).to.exist;
  });

  it('should update state when checked property changes', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox></vds-checkbox>`);

    expect(el.state).to.equal('unchecked');
    el.checked = true;
    await el.updateComplete;

    expect(el.state).to.equal('checked');
  });

  it('should update state when indeterminate property changes', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox></vds-checkbox>`);

    expect(el.state).to.equal('unchecked');
    el.indeterminate = true;
    await el.updateComplete;

    expect(el.state).to.equal('indeterminate');
  });

  it('should prioritize indeterminate over checked', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox checked indeterminate></vds-checkbox>`);

    expect(el.state).to.equal('indeterminate');
  });

  it('should prioritize disabled over other states', async () => {
    const el = await fixture<VDSCheckbox>(html`<vds-checkbox checked disabled></vds-checkbox>`);

    expect(el.state).to.equal('disabled');
  });
});

