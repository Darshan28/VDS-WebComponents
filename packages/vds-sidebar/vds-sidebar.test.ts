import { expect, fixture, html } from '@open-wc/testing';
import { VDSSidebar } from './vds-sidebar.js';

describe('VDSSidebar', () => {
  it('should be defined', () => {
    expect(VDSSidebar).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSSidebar>(html`<vds-sidebar></vds-sidebar>`);

    expect(el.variant).to.equal('default');
    expect(el.collapsed).to.equal(false);
  });

  it('should reflect variant attribute', async () => {
    const el = await fixture<VDSSidebar>(
      html`<vds-sidebar variant="inverse"></vds-sidebar>`
    );

    expect(el.getAttribute('variant')).to.equal('inverse');
    expect(el.variant).to.equal('inverse');
  });

  it('should toggle collapsed state when toggle button is clicked', async () => {
    const el = await fixture<VDSSidebar>(html`<vds-sidebar></vds-sidebar>`);
    const toggleButton = el.shadowRoot?.querySelector(
      '.toggle-button'
    ) as HTMLButtonElement;

    expect(el.collapsed).to.be.false;

    toggleButton?.click();

    expect(el.collapsed).to.be.true;
  });

  it('should emit vds-sidebar-toggle event on toggle', async () => {
    const el = await fixture<VDSSidebar>(html`<vds-sidebar></vds-sidebar>`);
    let eventDetail: any = null;

    el.addEventListener('vds-sidebar-toggle', (e: any) => {
      eventDetail = e.detail;
    });

    const toggleButton = el.shadowRoot?.querySelector(
      '.toggle-button'
    ) as HTMLButtonElement;
    toggleButton?.click();

    expect(eventDetail).to.not.be.null;
    expect(eventDetail).to.have.property('collapsed', true);
  });

  it('should temporarily expand on hover when collapsed', async () => {
    const el = await fixture<VDSSidebar>(
      html`<vds-sidebar collapsed></vds-sidebar>`
    );

    const aside = el.shadowRoot?.querySelector('aside') as HTMLElement;

    expect(el.collapsed).to.be.true;
    expect((el as any).hoverExpanded).to.be.false;

    aside?.dispatchEvent(new Event('mouseenter'));
    expect((el as any).hoverExpanded).to.be.true;

    aside?.dispatchEvent(new Event('mouseleave'));
    expect((el as any).hoverExpanded).to.be.false;
  });
}


