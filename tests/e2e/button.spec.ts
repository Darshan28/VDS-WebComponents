import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from '@axe-core/playwright';

test.describe('VDS Button E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
  });

  test('should render button and be accessible', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/packages/vds-button/dist/vds-button.js"></script>
        </head>
        <body>
          <vds-button>Click me</vds-button>
        </body>
      </html>
    `);

    const button = page.locator('vds-button');
    await expect(button).toBeVisible();
    
    await checkA11y(page);
  });

  test('should handle click events', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/packages/vds-button/dist/vds-button.js"></script>
        </head>
        <body>
          <vds-button id="test-btn">Click me</vds-button>
          <div id="result"></div>
          <script>
            document.getElementById('test-btn').addEventListener('vds-button-click', () => {
              document.getElementById('result').textContent = 'clicked';
            });
          </script>
        </body>
      </html>
    `);

    const button = page.locator('vds-button');
    await button.click();

    const result = page.locator('#result');
    await expect(result).toHaveText('clicked');
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module" src="/packages/vds-button/dist/vds-button.js"></script>
        </head>
        <body>
          <vds-button id="test-btn">Click me</vds-button>
          <div id="result"></div>
          <script>
            document.getElementById('test-btn').addEventListener('vds-button-click', () => {
              document.getElementById('result').textContent = 'keyboard-clicked';
            });
          </script>
        </body>
      </html>
    `);

    const button = page.locator('vds-button');
    await button.focus();
    await page.keyboard.press('Enter');

    const result = page.locator('#result');
    await expect(result).toHaveText('keyboard-clicked');
  });
});

