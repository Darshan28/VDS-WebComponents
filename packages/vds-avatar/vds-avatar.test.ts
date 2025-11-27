import { expect, fixture, html } from '@open-wc/testing';
import { VDSAvatar } from './vds-avatar.js';

describe('VDSAvatar', () => {
  it('should be defined', () => {
    expect(VDSAvatar).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSAvatar>(html`<vds-avatar></vds-avatar>`);
    
    expect(el.size).to.equal('xs');
    expect(el.variant).to.equal('image');
  });

  it('should reflect size attribute', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar size="lg"></vds-avatar>`
    );
    
    expect(el.getAttribute('size')).to.equal('lg');
    expect(el.size).to.equal('lg');
  });

  it('should reflect variant attribute', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar variant="text"></vds-avatar>`
    );
    
    expect(el.getAttribute('variant')).to.equal('text');
    expect(el.variant).to.equal('text');
  });

  it('should render image when src is provided', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar src="https://example.com/avatar.jpg" alt="User"></vds-avatar>`
    );

    const img = el.shadowRoot?.querySelector('img');
    expect(img).to.not.be.null;
    expect(img?.getAttribute('src')).to.equal('https://example.com/avatar.jpg');
  });

  it('should render text initial when name is provided', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar variant="text" name="John Doe"></vds-avatar>`
    );

    const text = el.shadowRoot?.querySelector('.avatar-text');
    expect(text).to.not.be.null;
    expect(text?.textContent).to.equal('J');
  });

  it('should render single initial for single name', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar variant="text" name="John"></vds-avatar>`
    );

    const text = el.shadowRoot?.querySelector('.avatar-text');
    expect(text?.textContent).to.equal('J');
  });

  it('should render first character of custom initials when provided', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar variant="text" initials="AB"></vds-avatar>`
    );

    const text = el.shadowRoot?.querySelector('.avatar-text');
    expect(text?.textContent).to.equal('A');
  });

  it('should render icon slot when variant is icon', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar variant="icon">
        <vds-icon slot="icon" name="user"></vds-icon>
      </vds-avatar>`
    );

    const iconSlot = el.shadowRoot?.querySelector('slot[name="icon"]');
    expect(iconSlot).to.not.be.null;
  });

  it('should fallback to text when image src is missing', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar variant="image" name="John Doe"></vds-avatar>`
    );

    const text = el.shadowRoot?.querySelector('.avatar-text');
    expect(text).to.not.be.null;
    expect(text?.textContent).to.equal('J');
  });

  it('should apply color scheme based on initial letter for text variant', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar variant="text" name="Alice"></vds-avatar>`
    );

    // A should map to green
    const bgColor = el.style.getPropertyValue('--vds-avatar-bg');
    const textColor = el.style.getPropertyValue('--vds-avatar-text-color');
    expect(bgColor).to.include('green-200');
    expect(textColor).to.include('green-700');
  });

  it('should apply different color scheme for different letters', async () => {
    const elB = await fixture<VDSAvatar>(
      html`<vds-avatar variant="text" name="Bob"></vds-avatar>`
    );

    // B should map to lime
    const bgColorB = elB.style.getPropertyValue('--vds-avatar-bg');
    const textColorB = elB.style.getPropertyValue('--vds-avatar-text-color');
    expect(bgColorB).to.include('lime-200');
    expect(textColorB).to.include('lime-700');
  });

  it('should reset colors when variant is not text', async () => {
    const el = await fixture<VDSAvatar>(
      html`<vds-avatar variant="text" name="Alice"></vds-avatar>`
    );

    // Should have colors set
    expect(el.style.getPropertyValue('--vds-avatar-bg')).to.not.be.empty;

    // Change to icon variant
    el.variant = 'icon';
    await el.updateComplete;

    // Colors should be removed
    expect(el.style.getPropertyValue('--vds-avatar-bg')).to.be.empty;
  });
});

