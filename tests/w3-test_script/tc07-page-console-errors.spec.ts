import { test, expect } from '@playwright/test';

/**
 * TC07 — Console Error Check
 * Verifies no critical JavaScript errors appear on home page load.
 *
 * HEAL NOTE: Skip if auth expired; use toHaveTitle instead of waitForFunction.
 */
test.describe('TC07 — No Critical Console Errors on Home Page', () => {
  test('should load the home page without critical JavaScript errors', async ({ page }) => {
    const errors: string[] = [];

    // Collect console error messages
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Navigate to home
    await page.goto('https://w3.ibm.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Home|w3/, { timeout: 45000 });

    if (page.url().includes('login.w3.ibm.com')) {
      test.skip(true, 'Session expired — skipping.');
      return;
    }

    await expect(page).toHaveTitle('Home', { timeout: 45000 });

    // Allow a short time for any deferred errors
    await page.waitForTimeout(2000);

    // Filter only truly critical errors (ignore third-party / network errors)
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('net::ERR_') &&
        !e.includes('Failed to load resource') &&
        !e.includes('favicon') &&
        !e.includes('analytics') &&
        !e.includes('adobe') &&
        !e.includes('doubleclick') &&
        !e.includes('adrum')
    );

    // No critical app-level errors should be present
    expect(criticalErrors).toHaveLength(0);
  });

  test('should load the People page without critical JavaScript errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('https://w3.ibm.com/#/people', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/People|w3/, { timeout: 45000 });

    if (page.url().includes('login.w3.ibm.com')) {
      test.skip(true, 'Session expired — skipping.');
      return;
    }

    await expect(page).toHaveTitle('People', { timeout: 45000 });
    await page.waitForTimeout(2000);

    const criticalErrors = errors.filter(
      (e) =>
        !e.includes('net::ERR_') &&
        !e.includes('Failed to load resource') &&
        !e.includes('favicon') &&
        !e.includes('analytics') &&
        !e.includes('adobe') &&
        !e.includes('doubleclick') &&
        !e.includes('adrum')
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
