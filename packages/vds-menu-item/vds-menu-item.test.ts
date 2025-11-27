import { expect, fixture, html } from '@open-wc/testing';
import { VDSMenuItem } from './vds-menu-item.js';
import '../vds-checkbox/vds-checkbox.js';

describe('VDSMenuItem', () => {
  it('should be defined', () => {
    expect(VDSMenuItem).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item>Menu item</vds-menu-item>`
    );

    expect(el.state).to.equal('normal');
    expect(el.disabled).to.equal(false);
    expect(el.checked).to.be.undefined;
    expect(el.toggle).to.equal(false);
    expect(el.selected).to.equal(false);
  });

  it('should reflect state attribute', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item state="hover">Menu item</vds-menu-item>`
    );

    expect(el.getAttribute('state')).to.equal('hover');
    expect(el.state).to.equal('hover');
  });

  it('should reflect disabled attribute', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item disabled>Menu item</vds-menu-item>`
    );

    expect(el.getAttribute('disabled')).to.not.be.null;
    expect(el.disabled).to.equal(true);
    expect(el.state).to.equal('disabled');
  });

  it('should reflect checked attribute', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item checked>Menu item</vds-menu-item>`
    );

    expect(el.getAttribute('checked')).to.not.be.null;
    expect(el.checked).to.equal(true);
  });

  it('should reflect selected attribute', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item selected>Menu item</vds-menu-item>`
    );

    expect(el.getAttribute('selected')).to.not.be.null;
    expect(el.selected).to.equal(true);
    expect(el.state).to.equal('active');
  });

  it('should render checkbox when checked is set', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item checked>Menu item</vds-menu-item>`
    );

    const checkbox = el.shadowRoot?.querySelector('vds-checkbox');
    expect(checkbox).to.not.be.null;
  });

  it('should render toggle when toggle is true', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item toggle>Menu item</vds-menu-item>`
    );

    const toggle = el.shadowRoot?.querySelector('.toggle');
    expect(toggle).to.not.be.null;
  });

  it('should render selected icon when selected is true and toggle is false', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item selected>Menu item</vds-menu-item>`
    );

    const selectedIcon = el.shadowRoot?.querySelector('.selected-icon');
    expect(selectedIcon).to.not.be.null;
  });

  it('should update state to active when selected is true', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item>Menu item</vds-menu-item>`
    );

    expect(el.state).to.equal('normal');
    
    el.selected = true;
    await el.updateComplete;
    
    expect(el.state).to.equal('active');
  });

  it('should update state to disabled when disabled is true', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item>Menu item</vds-menu-item>`
    );

    expect(el.state).to.equal('normal');
    
    el.disabled = true;
    await el.updateComplete;
    
    expect(el.state).to.equal('disabled');
  });

  it('should emit checkbox-change event when checkbox is clicked', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item checked>Menu item</vds-menu-item>`
    );

    let eventDetail: { checked: boolean } | null = null;
    el.addEventListener('vds-menu-item-checkbox-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const checkbox = el.shadowRoot?.querySelector('vds-checkbox') as any;
    if (checkbox) {
      checkbox.click();
      await el.updateComplete;
      await checkbox.updateComplete;
    }

    expect(eventDetail).to.not.be.null;
    expect(eventDetail?.checked).to.equal(false);
  });

  it('should emit toggle-change event when toggle is clicked', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item toggle>Menu item</vds-menu-item>`
    );

    let eventDetail: { checked: boolean } | null = null;
    el.addEventListener('vds-menu-item-toggle-change', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const toggle = el.shadowRoot?.querySelector('.toggle') as HTMLElement;
    toggle?.click();
    await el.updateComplete;

    expect(eventDetail).to.not.be.null;
    expect(eventDetail?.checked).to.equal(true);
  });

  it('should not emit events when disabled', async () => {
    const el = await fixture<VDSMenuItem>(
      html`<vds-menu-item disabled checked toggle>Menu item</vds-menu-item>`
    );

    let checkboxEventFired = false;
    let toggleEventFired = false;
    
    el.addEventListener('vds-menu-item-checkbox-change', () => {
      checkboxEventFired = true;
    });
    el.addEventListener('vds-menu-item-toggle-change', () => {
      toggleEventFired = true;
    });

    const checkbox = el.shadowRoot?.querySelector('vds-checkbox') as any;
    const toggle = el.shadowRoot?.querySelector('.toggle') as HTMLElement;
    
    if (checkbox) {
      checkbox.click();
      await checkbox.updateComplete;
    }
    toggle?.click();
    await el.updateComplete;

    expect(checkboxEventFired).to.be.false;
    expect(toggleEventFired).to.be.false;
  });
});

