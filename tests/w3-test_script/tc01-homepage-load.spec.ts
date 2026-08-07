import { test, expect } from '@playwright/test';

/**
 * TC01 — NDTV Home Page Load
 * Verifies the NDTV home page loads correctly with navigation links present.
 * No authentication required — public site.
 *
 * HEAL NOTE: NDTV is ad-heavy; test timeout increased to 60s in config.
 * waitUntil: 'domcontentloaded' used to avoid waiting for all ad scripts.
 */
test.describe('TC01 — NDTV Home Page Load', () => {
  test('should load the NDTV home page with title and navigation', async ({ page }) => {
    // Step 1: Navigate to NDTV home page
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Verify page title contains NDTV
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    // Step 3: Verify navigation bar is present
    await expect(page.locator('nav').first()).toBeVisible({ timeout: 15000 });

    // Step 4: Verify India nav link is present in nav
    // Uses CSS class m-nv_lnk discovered during exploratory testing
    const indiaLink = page.locator('a.m-nv_lnk[href*="/india"]').first();
    await expect(indiaLink).toBeAttached({ timeout: 15000 });

    // Step 5: Verify Opinion nav link is present in nav
    const opinionLink = page.locator('a.m-nv_lnk[href*="/opinion"]').first();
    await expect(opinionLink).toBeAttached({ timeout: 15000 });
  });
});
