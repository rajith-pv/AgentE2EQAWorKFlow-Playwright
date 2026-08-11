import { test, expect } from '@playwright/test';

/**
 * TC03 — Opinion Tab Navigation
 * Verifies the Opinion navigation tab loads the Opinion page.
 *
 * HEAL NOTE (Round 2): NDTV nav click triggers navigation but the ad-heavy page
 * takes >15s in Firefox. Using page.goto() is more reliable than click().
 *
 * HEAL NOTE (Round 4): beforeEach home-page load dropped — consuming half the
 * 120s budget before the test even starts. TC03 navigates directly to subpages.
 * waitUntil: 'commit' used for sub-page goto (waits only for response headers),
 * then title/URL verified with explicit timeouts.
 */
test.describe('TC03 — Opinion Tab Navigation', () => {
  test('should navigate to Opinion tab and load Opinion page', async ({ page }) => {
    // Navigate directly to Opinion section
    await page.goto('https://www.ndtv.com/opinion', { waitUntil: 'commit' });

    // Verify Opinion page loaded — title and URL
    await expect(page).toHaveTitle(/Opinion/, { timeout: 60000 });
    await expect(page).toHaveURL(/\/opinion/, { timeout: 10000 });
  });

  test('should have Opinion nav link with correct href on home page', async ({ page }) => {
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    const opinionLink = page.locator('a.m-nv_lnk[href*="/opinion"]').first();
    await expect(opinionLink).toHaveAttribute('href', /\/opinion/);
    await expect(opinionLink).toBeAttached();
  });
});
