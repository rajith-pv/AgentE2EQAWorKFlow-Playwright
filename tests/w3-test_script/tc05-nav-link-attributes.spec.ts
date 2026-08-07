import { test, expect } from '@playwright/test';

/**
 * TC05 — Navigation Link Attribute Verification
 * Verifies that India and Opinion nav links have correct href attributes.
 */
test.describe('TC05 — Navigation Link Attribute Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 15000 });
  });

  test('India nav link should have href pointing to /india', async ({ page }) => {
    const indiaLink = page.locator('a.m-nv_lnk[href*="/india"]').first();
    await expect(indiaLink).toHaveAttribute('href', /india/);
  });

  test('Opinion nav link should have href pointing to /opinion', async ({ page }) => {
    const opinionLink = page.locator('a.m-nv_lnk[href*="/opinion"]').first();
    await expect(opinionLink).toHaveAttribute('href', /opinion/);
  });

  test('Both India and Opinion nav links should be in the nav element', async ({ page }) => {
    const nav = page.locator('nav').first();
    const indiaLink = nav.locator('a[href*="/india"]').first();
    const opinionLink = nav.locator('a[href*="/opinion"]').first();

    await expect(indiaLink).toBeAttached();
    await expect(opinionLink).toBeAttached();
  });
});
