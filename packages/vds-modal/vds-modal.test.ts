import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { VDSModal } from './vds-modal.js';

describe('VDSModal', () => {
  it('should be defined', () => {
    expect(VDSModal).to.be.ok;
  });

  it('should not be visible by default', async () => {
    const el = await fixture<VDSModal>(html`<vds-modal></vds-modal>`);
    
    expect(el.open).to.equal(false);
    expect(el.hasAttribute('open')).to.be.false;
  });

  it('should show when open attribute is set', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal open></vds-modal>`
    );
    
    expect(el.open).to.equal(true);
    expect(el.hasAttribute('open')).to.be.true;
  });

  it('should reflect size attribute', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal size="lg"></vds-modal>`
    );
    
    expect(el.getAttribute('size')).to.equal('lg');
    expect(el.size).to.equal('lg');
  });

  it('should display title', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal title="Test Modal"></vds-modal>`
    );
    
    const title = el.shadowRoot?.querySelector('.header-title');
    expect(title?.textContent).to.include('Test Modal');
  });

  it('should show close button when closable', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal closable></vds-modal>`
    );
    
    const closeButton = el.shadowRoot?.querySelector('.close-button');
    expect(closeButton).to.not.be.null;
  });

  it('should hide close button when not closable', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal closable="false"></vds-modal>`
    );
    
    const closeButton = el.shadowRoot?.querySelector('.close-button');
    expect(closeButton).to.be.null;
  });

  it('should dispatch vds-modal-close event when close button clicked', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal open closable></vds-modal>`
    );
    let closeEvent: CustomEvent | null = null;

    el.addEventListener('vds-modal-close', (e) => {
      closeEvent = e as CustomEvent;
    });

    const closeButton = el.shadowRoot?.querySelector('.close-button') as HTMLButtonElement;
    closeButton?.click();

    await waitUntil(() => closeEvent !== null, 'Close event should fire');
    expect(closeEvent?.detail.reason).to.equal('close-button');
    expect(closeEvent?.bubbles).to.be.true;
    expect(closeEvent?.composed).to.be.true;
  });

  it('should dispatch vds-modal-close event when backdrop clicked', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal open close-on-backdrop-click></vds-modal>`
    );
    let closeEvent: CustomEvent | null = null;

    el.addEventListener('vds-modal-close', (e) => {
      closeEvent = e as CustomEvent;
    });

    const backdrop = el.shadowRoot?.querySelector('.backdrop') as HTMLElement;
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { value: backdrop });
    backdrop.dispatchEvent(clickEvent);

    await waitUntil(() => closeEvent !== null, 'Close event should fire');
    expect(closeEvent?.detail.reason).to.equal('backdrop');
  });

  it('should not close on backdrop click when close-on-backdrop-click is false', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal open close-on-backdrop-click="false"></vds-modal>`
    );
    let closeEvent: CustomEvent | null = null;

    el.addEventListener('vds-modal-close', () => {
      closeEvent = {} as CustomEvent;
    });

    const backdrop = el.shadowRoot?.querySelector('.backdrop') as HTMLElement;
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { value: backdrop });
    backdrop.dispatchEvent(clickEvent);

    await new Promise(resolve => setTimeout(resolve, 100));
    expect(closeEvent).to.be.null;
  });

  it('should have proper ARIA attributes', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal open title="Test Modal"></vds-modal>`
    );
    
    const dialog = el.shadowRoot?.querySelector('.dialog');
    expect(dialog?.getAttribute('role')).to.equal('dialog');
    expect(dialog?.getAttribute('aria-modal')).to.equal('true');
    expect(dialog?.getAttribute('aria-labelledby')).to.equal('vds-modal-title');
  });

  it('should render footer slot', async () => {
    const el = await fixture<VDSModal>(
      html`<vds-modal open>
        <div slot="footer">Footer content</div>
      </vds-modal>`
    );

    const footer = el.shadowRoot?.querySelector('.footer');
    expect(footer).to.not.be.null;
  });
});

