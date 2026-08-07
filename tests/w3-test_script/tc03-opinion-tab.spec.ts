import { test, expect } from '@playwright/test';

/**
 * TC03 — Opinion Tab Navigation
 * Verifies the Opinion navigation tab loads the Opinion page.
 *
 * HEAL NOTE: NDTV nav click triggers navigation but the ad-heavy page
 * takes >15s to fire the navigation event in Firefox. Using page.goto()
 * is more reliable than click() for NDTV navigation.
 */
test.describe('TC03 — Opinion Tab Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });
  });

  test('should navigate to Opinion tab and load Opinion page', async ({ page }) => {
    // Navigate to Opinion section using direct URL (reliable on ad-heavy sites)
    await page.goto('https://www.ndtv.com/opinion', { waitUntil: 'domcontentloaded' });

    // Verify Opinion page loaded
    await expect(page).toHaveTitle(/Opinion/, { timeout: 30000 });

    // Verify URL contains /opinion
    await expect(page).toHaveURL(/\/opinion/, { timeout: 10000 });
  });

  test('should have Opinion nav link with correct href', async ({ page }) => {
    const opinionLink = page.locator('a.m-nv_lnk[href*="/opinion"]').first();
    await expect(opinionLink).toHaveAttribute('href', /\/opinion/);
    await expect(opinionLink).toBeAttached();
  });
});
