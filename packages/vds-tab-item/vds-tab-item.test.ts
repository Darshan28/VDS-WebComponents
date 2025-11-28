import { expect, fixture, html } from '@open-wc/testing';
import { VDSTabItem } from './vds-tab-item.js';

describe('VDSTabItem', () => {
  it('should be defined', () => {
    expect(VDSTabItem).to.exist;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSTabItem>(html`<vds-tab-item>Tab</vds-tab-item>`);

    expect(el.variant).to.equal('default');
    expect(el.size).to.equal('md');
    expect(el.active).to.be.false;
    expect(el.disabled).to.be.false;
  });

  it('should set aria-selected when active', async () => {
    const el = await fixture<VDSTabItem>(html`<vds-tab-item active>Tab</vds-tab-item>`);
    const container = el.shadowRoot?.querySelector('.container') as HTMLElement;

    expect(el.active).to.be.true;
    expect(container.getAttribute('aria-selected')).to.equal('true');
  });

  it('should dispatch select event on click', async () => {
    const el = await fixture<VDSTabItem>(html`<vds-tab-item value="profile">Tab</vds-tab-item>`);
    let selectEvent: CustomEvent | null = null;

    el.addEventListener('vds-tab-item-select', (event) => {
      selectEvent = event as CustomEvent;
    });

    const container = el.shadowRoot?.querySelector('.container') as HTMLElement;
    container.click();

    expect(selectEvent).to.not.be.null;
    expect(selectEvent?.detail.value).to.equal('profile');
  });

  it('should not dispatch select event when disabled', async () => {
    const el = await fixture<VDSTabItem>(html`<vds-tab-item disabled>Tab</vds-tab-item>`);
    let fired = false;

    el.addEventListener('vds-tab-item-select', () => {
      fired = true;
    });

    const container = el.shadowRoot?.querySelector('.container') as HTMLElement;
    container.click();

    expect(fired).to.be.false;
  });

  it('should dispatch close event when closable button is clicked', async () => {
    const el = await fixture<VDSTabItem>(html`<vds-tab-item closable>Tab</vds-tab-item>`);
    let closeEvent: CustomEvent | null = null;

    el.addEventListener('vds-tab-item-close', (event) => {
      closeEvent = event as CustomEvent;
    });

    const closeButton = el.shadowRoot?.querySelector('.close-button') as HTMLButtonElement;
    closeButton?.click();

    expect(closeEvent).to.not.be.null;
  });

  it('should render badge text via attribute', async () => {
    const el = await fixture<VDSTabItem>(html`<vds-tab-item badge="3">Tab</vds-tab-item>`);
    const badge = el.shadowRoot?.querySelector('.badge');

    expect(badge?.textContent?.trim()).to.equal('3');
  });
});

