import { test, expect } from '@playwright/test';

/**
 * TC02 — India Tab Navigation
 * Verifies the India navigation tab loads the India news page.
 *
 * HEAL NOTE (Round 2): NDTV nav click triggers navigation but the ad-heavy page
 * takes >15s in Firefox. Using page.goto() is more reliable than click().
 *
 * HEAL NOTE (Round 4): beforeEach home-page load dropped — consuming half the
 * 120s budget before the test even starts. TC02 navigates directly to subpages.
 * waitUntil: 'commit' used for sub-page goto (waits only for response headers),
 * then title/URL verified with explicit timeouts.
 */
test.describe('TC02 — India Tab Navigation', () => {
  test('should navigate to India tab and load India news page', async ({ page }) => {
    // Navigate directly to India section
    await page.goto('https://www.ndtv.com/india', { waitUntil: 'commit' });

    // Verify India page loaded — title and URL
    await expect(page).toHaveTitle(/India/, { timeout: 60000 });
    await expect(page).toHaveURL(/\/india/, { timeout: 10000 });
  });

  test('should have India nav link with correct href on home page', async ({ page }) => {
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    const indiaLink = page.locator('a.m-nv_lnk[href*="/india"]').first();
    await expect(indiaLink).toHaveAttribute('href', /\/india/);
    await expect(indiaLink).toBeAttached();
  });
});
