import { expect } from '@open-wc/testing';
import * as axe from 'axe-core';

// Extend expect with axe matchers
declare global {
  namespace Chai {
    interface Assertion {
      toBeAccessible(): void;
    }
  }
}

// Make axe available globally for tests
(window as any).axe = axe;

