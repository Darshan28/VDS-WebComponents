import { expect, fixture, html } from '@open-wc/testing';
import * as axeCore from 'axe-core';
import { VDSButton } from './vds-button.js';

// Extend expect with axe matchers
declare global {
  namespace Chai {
    interface Assertion {
      toHaveNoViolations(): void;
    }
  }
}

const toHaveNoViolations = (results: axeCore.AxeResults) => {
  if (results.violations.length > 0) {
    throw new Error(
      `Expected no accessibility violations but found ${results.violations.length}:\n` +
      results.violations.map(v => `- ${v.id}: ${v.description}`).join('\n')
    );
  }
};

describe('VDSButton Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const el = await fixture<VDSButton>(
      html`<vds-button>Click me</vds-button>`
    );
    
    const results = await axeCore.run(el);
    toHaveNoViolations(results);
  });

  it('should have no accessibility violations when disabled', async () => {
    const el = await fixture<VDSButton>(
      html`<vds-button disabled>Disabled</vds-button>`
    );
    
    const results = await axeCore.run(el);
    toHaveNoViolations(results);
  });

  it('should have proper ARIA attributes', async () => {
    const el = await fixture<VDSButton>(
      html`<vds-button aria-label="Submit form">Submit</vds-button>`
    );
    
    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-label')).to.equal('Submit form');
    expect(button?.getAttribute('role')).to.equal('button');
  });
});

