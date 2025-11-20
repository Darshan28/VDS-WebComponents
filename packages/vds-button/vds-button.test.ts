import { expect, fixture, html } from '@open-wc/testing';
import { VDSButton } from './vds-button.js';

describe('VDSButton', () => {
  it('should be defined', () => {
    expect(VDSButton).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSButton>(html`<vds-button>Click me</vds-button>`);
    
    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.equal(false);
    expect(el.type).to.equal('button');
  });

  it('should reflect variant attribute', async () => {
    const el = await fixture<VDSButton>(
      html`<vds-button variant="danger">Delete</vds-button>`
    );
    
    expect(el.getAttribute('variant')).to.equal('danger');
    expect(el.variant).to.equal('danger');
  });

  it('should reflect size attribute', async () => {
    const el = await fixture<VDSButton>(
      html`<vds-button size="lg">Large Button</vds-button>`
    );
    
    expect(el.getAttribute('size')).to.equal('lg');
    expect(el.size).to.equal('lg');
  });

  it('should reflect disabled attribute', async () => {
    const el = await fixture<VDSButton>(
      html`<vds-button disabled>Disabled</vds-button>`
    );
    
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.disabled).to.be.true;
  });

  it('should dispatch vds-button-click event on click', async () => {
    const el = await fixture<VDSButton>(html`<vds-button>Click me</vds-button>`);
    let clickEvent: CustomEvent | null = null;

    el.addEventListener('vds-button-click', (e) => {
      clickEvent = e as CustomEvent;
    });

    const button = el.shadowRoot?.querySelector('button');
    button?.click();

    expect(clickEvent).to.not.be.null;
    expect(clickEvent?.bubbles).to.be.true;
    expect(clickEvent?.composed).to.be.true;
  });

  it('should not dispatch click event when disabled', async () => {
    const el = await fixture<VDSButton>(
      html`<vds-button disabled>Disabled</vds-button>`
    );
    let clickEvent: CustomEvent | null = null;

    el.addEventListener('vds-button-click', () => {
      clickEvent = {} as CustomEvent;
    });

    const button = el.shadowRoot?.querySelector('button');
    button?.click();

    expect(clickEvent).to.be.null;
  });

  it('should handle keyboard Enter key', async () => {
    const el = await fixture<VDSButton>(html`<vds-button>Click me</vds-button>`);
    let clickEvent: CustomEvent | null = null;

    el.addEventListener('vds-button-click', (e) => {
      clickEvent = e as CustomEvent;
    });

    const button = el.shadowRoot?.querySelector('button');
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    button?.dispatchEvent(enterEvent);

    expect(clickEvent).to.not.be.null;
  });

  it('should handle keyboard Space key', async () => {
    const el = await fixture<VDSButton>(html`<vds-button>Click me</vds-button>`);
    let clickEvent: CustomEvent | null = null;

    el.addEventListener('vds-button-click', (e) => {
      clickEvent = e as CustomEvent;
    });

    const button = el.shadowRoot?.querySelector('button');
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    button?.dispatchEvent(spaceEvent);

    expect(clickEvent).to.not.be.null;
  });

  it('should render icon slot', async () => {
    const el = await fixture<VDSButton>(
      html`<vds-button>
        <span slot="icon">⭐</span>
        With Icon
      </vds-button>`
    );

    const iconSlot = el.shadowRoot?.querySelector('slot[name="icon"]');
    expect(iconSlot).to.not.be.null;
  });
});

