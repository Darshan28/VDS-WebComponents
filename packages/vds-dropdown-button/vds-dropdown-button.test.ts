import { expect, fixture, html } from '@open-wc/testing';
import { VDSDropdownButton } from './vds-dropdown-button.js';
import '../vds-icon/vds-icon.js';

describe('VDSDropdownButton', () => {
  it('should be defined', () => {
    expect(VDSDropdownButton).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button>Action</vds-dropdown-button>`
    );

    expect(el.size).to.equal('medium');
    expect(el.shape).to.equal('rounded');
    expect(el.type).to.equal('filled');
    expect(el.buttonStyle).to.equal('split');
    expect(el.variant).to.equal('primary');
    expect(el.disabled).to.equal(false);
  });

  it('should reflect size attribute', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button size="large">Action</vds-dropdown-button>`
    );

    expect(el.getAttribute('size')).to.equal('large');
    expect(el.size).to.equal('large');
  });

  it('should reflect shape attribute', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button shape="pill">Action</vds-dropdown-button>`
    );

    expect(el.getAttribute('shape')).to.equal('pill');
    expect(el.shape).to.equal('pill');
  });

  it('should reflect type attribute', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button type="outline">Action</vds-dropdown-button>`
    );

    expect(el.getAttribute('type')).to.equal('outline');
    expect(el.type).to.equal('outline');
  });

  it('should reflect button-style attribute', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button button-style="regular">Action</vds-dropdown-button>`
    );

    expect(el.getAttribute('button-style')).to.equal('regular');
    expect(el.buttonStyle).to.equal('regular');
  });

  it('should reflect variant attribute', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button variant="secondary">Action</vds-dropdown-button>`
    );

    expect(el.getAttribute('variant')).to.equal('secondary');
    expect(el.variant).to.equal('secondary');
  });

  it('should reflect disabled attribute', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button disabled>Action</vds-dropdown-button>`
    );

    expect(el.getAttribute('disabled')).to.not.be.null;
    expect(el.disabled).to.equal(true);
  });

  it('should render split style with two buttons', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button button-style="split">Action</vds-dropdown-button>`
    );

    const mainButton = el.shadowRoot?.querySelector('.main-button');
    const dropdownButton = el.shadowRoot?.querySelector('.dropdown-button');

    expect(mainButton).to.exist;
    expect(dropdownButton).to.exist;
  });

  it('should render regular style with single button', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button button-style="regular">Action</vds-dropdown-button>`
    );

    const mainButton = el.shadowRoot?.querySelector('.main-button');
    const dropdownButton = el.shadowRoot?.querySelector('.dropdown-button');

    expect(mainButton).to.not.exist;
    expect(dropdownButton).to.exist;
  });

  it('should render divider for split style with primary variant', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button button-style="split" variant="primary">Action</vds-dropdown-button>`
    );

    const divider = el.shadowRoot?.querySelector('.divider');
    expect(divider).to.exist;
  });

  it('should not render divider for split style with secondary variant', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button button-style="split" variant="secondary">Action</vds-dropdown-button>`
    );

    const divider = el.shadowRoot?.querySelector('.divider');
    expect(divider).to.not.exist;
  });

  it('should render chevron icon', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button>Action</vds-dropdown-button>`
    );

    const chevronIcon = el.shadowRoot?.querySelector('vds-icon[name="chevron-down"]');
    expect(chevronIcon).to.exist;
  });

  it('should emit click event when main button is clicked (split style)', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button button-style="split">Action</vds-dropdown-button>`
    );

    let eventDetail: { originalEvent: MouseEvent; part: 'main' | 'dropdown' } | null = null;
    el.addEventListener('vds-dropdown-button-click', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const mainButton = el.shadowRoot?.querySelector('.main-button') as HTMLButtonElement;
    mainButton?.click();

    expect(eventDetail).to.not.be.null;
    expect(eventDetail?.part).to.equal('main');
  });

  it('should emit click event when dropdown button is clicked', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button>Action</vds-dropdown-button>`
    );

    let eventDetail: { originalEvent: MouseEvent; part: 'main' | 'dropdown' } | null = null;
    el.addEventListener('vds-dropdown-button-click', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const dropdownButton = el.shadowRoot?.querySelector('.dropdown-button') as HTMLButtonElement;
    dropdownButton?.click();

    expect(eventDetail).to.not.be.null;
    expect(eventDetail?.part).to.equal('dropdown');
  });

  it('should not emit click event when disabled', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`<vds-dropdown-button disabled>Action</vds-dropdown-button>`
    );

    let eventFired = false;
    el.addEventListener('vds-dropdown-button-click', () => {
      eventFired = true;
    });

    const dropdownButton = el.shadowRoot?.querySelector('.dropdown-button') as HTMLButtonElement;
    dropdownButton?.click();

    expect(eventFired).to.be.false;
  });

  it('should render prefix icon slot', async () => {
    const el = await fixture<VDSDropdownButton>(
      html`
        <vds-dropdown-button>
          <vds-icon slot="prefix-icon" name="plus"></vds-icon>
          Action
        </vds-dropdown-button>
      `
    );

    const prefixIcon = el.querySelector('vds-icon[slot="prefix-icon"]');
    expect(prefixIcon).to.exist;
  });
});

