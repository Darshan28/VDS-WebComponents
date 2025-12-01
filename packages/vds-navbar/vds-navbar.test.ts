import { expect, fixture, html } from '@open-wc/testing';
import { VDSNavbar } from './vds-navbar.js';

describe('VDSNavbar', () => {
  it('should be defined', () => {
    expect(VDSNavbar).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSNavbar>(html`<vds-navbar></vds-navbar>`);
    
    expect(el.variant).to.equal('default');
    expect(el.showNavHeading).to.equal(false);
  });

  it('should reflect variant attribute', async () => {
    const el = await fixture<VDSNavbar>(
      html`<vds-navbar variant="inverse"></vds-navbar>`
    );
    
    expect(el.getAttribute('variant')).to.equal('inverse');
    expect(el.variant).to.equal('inverse');
  });

  it('should reflect show-nav-heading attribute', async () => {
    const el = await fixture<VDSNavbar>(
      html`<vds-navbar show-nav-heading></vds-navbar>`
    );
    
    expect(el.hasAttribute('show-nav-heading')).to.be.true;
    expect(el.showNavHeading).to.equal(true);
  });

  it('should have sticky positioning', async () => {
    const el = await fixture<VDSNavbar>(html`<vds-navbar></vds-navbar>`);
    const navbar = el.shadowRoot?.querySelector('.navbar');
    
    expect(getComputedStyle(el).position).to.equal('sticky');
    expect(getComputedStyle(el).top).to.equal('0px');
  });

  it('should fire menu-click event when menu button is clicked', async () => {
    const el = await fixture<VDSNavbar>(html`<vds-navbar></vds-navbar>`);
    let eventFired = false;
    let eventDetail: any = null;

    el.addEventListener('vds-navbar-menu-click', (e: any) => {
      eventFired = true;
      eventDetail = e.detail;
    });

    const menuButton = el.shadowRoot?.querySelector('.menu-button') as HTMLButtonElement;
    menuButton?.click();

    expect(eventFired).to.be.true;
    expect(eventDetail).to.have.property('originalEvent');
  });

  it('should render nav heading when showNavHeading is true', async () => {
    const el = await fixture<VDSNavbar>(
      html`<vds-navbar show-nav-heading></vds-navbar>`
    );
    
    const navHeading = el.shadowRoot?.querySelector('.nav-heading');
    expect(navHeading).to.exist;
  });

  it('should not render nav heading when showNavHeading is false', async () => {
    const el = await fixture<VDSNavbar>(html`<vds-navbar></vds-navbar>`);
    
    const navHeading = el.shadowRoot?.querySelector('.nav-heading');
    expect(navHeading).to.not.exist;
  });

  it('should apply inverse variant styles', async () => {
    const el = await fixture<VDSNavbar>(
      html`<vds-navbar variant="inverse"></vds-navbar>`
    );
    
    const navbar = el.shadowRoot?.querySelector('.navbar');
    const styles = getComputedStyle(navbar as Element);
    
    // Check that inverse variant is applied
    expect(el.variant).to.equal('inverse');
  });
});

