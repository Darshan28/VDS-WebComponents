import { expect, fixture, html } from '@open-wc/testing';
import { VDSIcon } from './vds-icon.js';

describe('VDSIcon', () => {
  it('should be defined', () => {
    expect(VDSIcon).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSIcon>(html`<vds-icon></vds-icon>`);

    expect(el.size).to.equal('md');
    expect(el.spin).to.be.false;
    const icon = el.shadowRoot?.querySelector('[part="icon"]');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('should reflect the name attribute', async () => {
    const el = await fixture<VDSIcon>(html`<vds-icon name="check"></vds-icon>`);

    expect(el.getAttribute('name')).to.equal('check');
    expect(el.name).to.equal('check');
  });

  it('should expose an accessible label when provided', async () => {
    const el = await fixture<VDSIcon>(
      html`<vds-icon name="info" label="Information"></vds-icon>`
    );

    await el.updateComplete;

    const icon = el.shadowRoot?.querySelector('[part="icon"]');
    expect(icon?.getAttribute('role')).to.equal('img');
    expect(icon?.getAttribute('aria-label')).to.equal('Information');
    expect(icon?.getAttribute('aria-hidden')).to.equal('false');
  });

  it('should apply custom color via property', async () => {
    const el = await fixture<VDSIcon>(html`<vds-icon color="#ff00ff"></vds-icon>`);

    await el.updateComplete;

    expect(el.style.getPropertyValue('--vds-icon-color')).to.equal('#ff00ff');
  });

  it('should apply the prefixed icon class for the provided name', async () => {
    const el = await fixture<VDSIcon>(html`<vds-icon name="download"></vds-icon>`);
    const icon = el.shadowRoot?.querySelector('[part="icon"]');

    expect(icon?.classList.contains('v-download')).to.be.true;
  });

  it('should mark decorative icons as hidden from assistive tech', async () => {
    const el = await fixture<VDSIcon>(html`<vds-icon decorative name="star"></vds-icon>`);
    await el.updateComplete;

    const icon = el.shadowRoot?.querySelector('[part="icon"]');
    expect(icon?.getAttribute('aria-hidden')).to.equal('true');
    expect(icon?.hasAttribute('aria-label')).to.be.false;
  });
});


