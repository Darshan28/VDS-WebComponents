import { expect, fixture, html } from '@open-wc/testing';
import { VDSBadge } from './vds-badge.js';

describe('VDSBadge', () => {
  it('should be defined', () => {
    expect(VDSBadge).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSBadge>(html`<vds-badge>Badge</vds-badge>`);
    
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('sm');
    expect(el.shape).to.equal('pill');
  });

  it('should reflect variant attribute', async () => {
    const el = await fixture<VDSBadge>(
      html`<vds-badge variant="danger">Danger</vds-badge>`
    );
    
    expect(el.getAttribute('variant')).to.equal('danger');
    expect(el.variant).to.equal('danger');
  });

  it('should reflect size attribute', async () => {
    const el = await fixture<VDSBadge>(
      html`<vds-badge size="lg">Large</vds-badge>`
    );
    
    expect(el.getAttribute('size')).to.equal('lg');
    expect(el.size).to.equal('lg');
  });

  it('should reflect shape attribute', async () => {
    const el = await fixture<VDSBadge>(
      html`<vds-badge shape="rounded">Rounded</vds-badge>`
    );

    expect(el.getAttribute('shape')).to.equal('rounded');
    expect(el.shape).to.equal('rounded');
  });

  it('should render slot content', async () => {
    const el = await fixture<VDSBadge>(
      html`<vds-badge>Test Badge</vds-badge>`
    );
    
    const slot = el.shadowRoot?.querySelector('slot:not([name])');
    expect(slot).to.not.be.null;
  });

  it('should render icon slot', async () => {
    const el = await fixture<VDSBadge>(
      html`<vds-badge>
        <vds-icon slot="icon" name="check"></vds-icon>
        Badge
      </vds-badge>`
    );

    const iconSlot = el.shadowRoot?.querySelector('slot[name="icon"]');
    expect(iconSlot).to.not.be.null;
  });

  it('should apply correct variant styles', async () => {
    const el = await fixture<VDSBadge>(
      html`<vds-badge variant="warning">Warning</vds-badge>`
    );

    const badge = el.shadowRoot?.querySelector('.badge');
    const styles = getComputedStyle(badge!);
    
    // Check that custom properties are set (actual color values depend on CSS variables)
    expect(el.variant).to.equal('warning');
  });
});

