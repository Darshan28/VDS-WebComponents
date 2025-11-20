import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from '@axe-core/playwright';

test.describe('VDS Modal E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
  });

  test('should open and close modal', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/packages/vds-modal/dist/vds-modal.js"></script>
        </head>
        <body>
          <vds-modal id="test-modal" title="Test Modal">
            <p>Modal content</p>
          </vds-modal>
          <button id="open-btn">Open Modal</button>
          <script>
            document.getElementById('open-btn').addEventListener('click', () => {
              document.getElementById('test-modal').showModal();
            });
          </script>
        </body>
      </html>
    `);

    const modal = page.locator('vds-modal');
    await expect(modal).not.toHaveAttribute('open', '');

    await page.click('#open-btn');
    await expect(modal).toHaveAttribute('open', '');

    const closeButton = modal.locator('button[aria-label="Close modal"]');
    await closeButton.click();
    await expect(modal).not.toHaveAttribute('open', '');
  });

  test('should trap focus within modal', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/packages/vds-modal/dist/vds-modal.js"></script>
        </head>
        <body>
          <button id="outside">Outside</button>
          <vds-modal id="test-modal" open title="Test Modal">
            <button id="inside">Inside</button>
          </vds-modal>
        </body>
      </html>
    `);

    const insideButton = page.locator('#inside');
    await expect(insideButton).toBeFocused();
  });

  test('should close on Escape key', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/packages/vds-modal/dist/vds-modal.js"></script>
        </head>
        <body>
          <vds-modal id="test-modal" open title="Test Modal">
            <p>Modal content</p>
          </vds-modal>
        </body>
      </html>
    `);

    const modal = page.locator('vds-modal');
    await expect(modal).toHaveAttribute('open', '');

    await page.keyboard.press('Escape');
    await expect(modal).not.toHaveAttribute('open', '');
  });

  test('should be accessible', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/packages/vds-modal/dist/vds-modal.js"></script>
        </head>
        <body>
          <vds-modal open title="Test Modal">
            <p>Modal content</p>
          </vds-modal>
        </body>
      </html>
    `);

    await checkA11y(page);
  });
});

