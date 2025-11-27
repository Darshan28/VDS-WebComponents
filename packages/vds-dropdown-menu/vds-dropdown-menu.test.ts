import { expect, fixture, html } from '@open-wc/testing';
import { VDSDropdownMenu } from './vds-dropdown-menu.js';
import '../vds-menu-item/vds-menu-item.js';
import '../vds-icon/vds-icon.js';

describe('VDSDropdownMenu', () => {
  it('should be defined', () => {
    expect(VDSDropdownMenu).to.be.ok;
  });

  it('should render with default properties', async () => {
    const el = await fixture<VDSDropdownMenu>(html`<vds-dropdown-menu></vds-dropdown-menu>`);

    expect(el.heading).to.be.undefined;
    expect(el.searchPlaceholder).to.be.undefined;
    expect(el.scrollable).to.be.false;
    expect(el.showMoreText).to.be.undefined;
  });

  it('should render heading when provided', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu heading="Menu Heading"></vds-dropdown-menu>`
    );

    const heading = el.shadowRoot?.querySelector('.heading-text');
    expect(heading).to.exist;
    expect(heading?.textContent).to.equal('Menu Heading');
  });

  it('should render search input when placeholder is provided', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu search-placeholder="Search..."></vds-dropdown-menu>`
    );

    const searchInput = el.shadowRoot?.querySelector('.search-input');
    expect(searchInput).to.exist;
    expect((searchInput as HTMLInputElement)?.placeholder).to.equal('Search...');
  });

  it('should emit search event on input', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu></vds-dropdown-menu>`
    );

    let eventFired = false;
    el.addEventListener('vds-dropdown-menu-search', (e: CustomEvent) => {
      eventFired = true;
      expect(e.detail.value).to.equal('test');
    });

    const searchInput = el.shadowRoot?.querySelector('.search-input') as HTMLInputElement;
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));

    expect(eventFired).to.be.true;
  });

  it('should render show more button when text is provided', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu show-more-text="Show more"></vds-dropdown-menu>`
    );

    const showMore = el.shadowRoot?.querySelector('.show-more');
    expect(showMore).to.exist;
    expect(showMore?.textContent?.trim()).to.equal('Show more');
  });

  it('should render show more as link when href is provided', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu show-more-text="Show more" show-more-href="/more"></vds-dropdown-menu>`
    );

    const showMore = el.shadowRoot?.querySelector('a.show-more');
    expect(showMore).to.exist;
    expect(showMore?.getAttribute('href')).to.equal('/more');
  });

  it('should emit show-more event when button is clicked', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu show-more-text="Show more"></vds-dropdown-menu>`
    );

    let eventFired = false;
    el.addEventListener('vds-dropdown-menu-show-more', () => {
      eventFired = true;
    });

    const showMore = el.shadowRoot?.querySelector('button.show-more') as HTMLButtonElement;
    showMore?.click();

    expect(eventFired).to.be.true;
  });

  it('should not emit show-more event when link is clicked', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu show-more-text="Show more" show-more-href="/more"></vds-dropdown-menu>`
    );

    let eventFired = false;
    el.addEventListener('vds-dropdown-menu-show-more', () => {
      eventFired = true;
    });

    const showMore = el.shadowRoot?.querySelector('a.show-more') as HTMLAnchorElement;
    showMore?.click();

    expect(eventFired).to.be.false;
  });

  it('should reflect scrollable attribute', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu scrollable></vds-dropdown-menu>`
    );

    expect(el.hasAttribute('scrollable')).to.be.true;
    expect(el.scrollable).to.be.true;
  });

  it('should set max-height when maxHeight property is set', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`<vds-dropdown-menu max-height="300px"></vds-dropdown-menu>`
    );

    expect(el.style.getPropertyValue('--vds-dropdown-menu-max-height')).to.equal('300px');
    expect(el.scrollable).to.be.true;
  });

  it('should render menu items in slot', async () => {
    const el = await fixture<VDSDropdownMenu>(
      html`
        <vds-dropdown-menu>
          <vds-menu-item>Item 1</vds-menu-item>
          <vds-menu-item>Item 2</vds-menu-item>
        </vds-dropdown-menu>
      `
    );

    const content = el.shadowRoot?.querySelector('.content');
    expect(content).to.exist;
    
    const slot = content?.querySelector('slot');
    expect(slot).to.exist;
  });
});

