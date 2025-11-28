import { expect, fixture, html } from '@open-wc/testing';
import { VDSTab } from './vds-tab.js';

describe('VDSTab', () => {
  it('should be defined', () => {
    expect(VDSTab).to.exist;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSTab>(
      html`
        <vds-tab>
          <vds-tab-item value="tab1">Tab 1</vds-tab-item>
          <vds-tab-item value="tab2">Tab 2</vds-tab-item>
        </vds-tab>
      `
    );

    expect(el.variant).to.equal('default');
    expect(el.size).to.equal('md');
  });

  it('should set variant and size on tab items', async () => {
    const el = await fixture<VDSTab>(
      html`
        <vds-tab variant="filled" size="lg">
          <vds-tab-item value="tab1">Tab 1</vds-tab-item>
          <vds-tab-item value="tab2">Tab 2</vds-tab-item>
        </vds-tab>
      `
    );

    const items = el.querySelectorAll('vds-tab-item');
    items.forEach((item: any) => {
      expect(item.variant).to.equal('filled');
      expect(item.size).to.equal('lg');
    });
  });

  it('should set active tab based on value', async () => {
    const el = await fixture<VDSTab>(
      html`
        <vds-tab value="tab2">
          <vds-tab-item value="tab1">Tab 1</vds-tab-item>
          <vds-tab-item value="tab2">Tab 2</vds-tab-item>
        </vds-tab>
      `
    );

    const items = el.querySelectorAll('vds-tab-item');
    const tab1 = items[0] as any;
    const tab2 = items[1] as any;

    expect(tab1.active).to.be.false;
    expect(tab2.active).to.be.true;
  });

  it('should dispatch change event when tab is selected', async () => {
    const el = await fixture<VDSTab>(
      html`
        <vds-tab>
          <vds-tab-item value="tab1">Tab 1</vds-tab-item>
          <vds-tab-item value="tab2">Tab 2</vds-tab-item>
        </vds-tab>
      `
    );

    let changeEvent: CustomEvent | null = null;
    el.addEventListener('vds-tab-change', (event) => {
      changeEvent = event as CustomEvent;
    });

    const tab2 = el.querySelector('vds-tab-item[value="tab2"]') as any;
    tab2.click();

    expect(changeEvent).to.not.be.null;
    expect(changeEvent?.detail.value).to.equal('tab2');
  });

  it('should show overflow button when overflowCount is set', async () => {
    const el = await fixture<VDSTab>(
      html`
        <vds-tab overflow-count="3">
          <vds-tab-item value="tab1">Tab 1</vds-tab-item>
        </vds-tab>
      `
    );

    const overflowButton = el.shadowRoot?.querySelector('.overflow-button');
    expect(overflowButton).to.exist;
  });

  it('should use custom overflow text when provided', async () => {
    const el = await fixture<VDSTab>(
      html`
        <vds-tab overflow-count="3" overflow-text="Show more">
          <vds-tab-item value="tab1">Tab 1</vds-tab-item>
        </vds-tab>
      `
    );

    const button = el.shadowRoot?.querySelector('vds-button') as any;
    expect(button?.textContent?.trim()).to.include('Show more');
  });

  it('should not show overflow button when overflowCount is 0', async () => {
    const el = await fixture<VDSTab>(
      html`
        <vds-tab>
          <vds-tab-item value="tab1">Tab 1</vds-tab-item>
        </vds-tab>
      `
    );

    const overflowButton = el.shadowRoot?.querySelector('.overflow-button');
    expect(overflowButton).to.not.exist;
  });
});

