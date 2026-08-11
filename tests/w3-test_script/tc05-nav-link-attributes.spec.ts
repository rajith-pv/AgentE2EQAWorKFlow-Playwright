import { test, expect } from '@playwright/test';

/**
 * TC05 — Navigation Link Attribute Verification
 * Verifies that India and Opinion nav links have correct href attributes.
 *
 * HEAL NOTE (Round 4): Each test now loads the home page independently
 * (no shared beforeEach) to avoid cascading timeout failures. The
 * beforeEach was the bottleneck for test 2 (Opinion) timing out.
 */
test.describe('TC05 — Navigation Link Attribute Verification', () => {
  test('India nav link should have href pointing to /india', async ({ page }) => {
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    const indiaLink = page.locator('a.m-nv_lnk[href*="/india"]').first();
    await expect(indiaLink).toHaveAttribute('href', /india/);
  });

  test('Opinion nav link should have href pointing to /opinion', async ({ page }) => {
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    const opinionLink = page.locator('a.m-nv_lnk[href*="/opinion"]').first();
    await expect(opinionLink).toHaveAttribute('href', /opinion/);
  });

  test('Both India and Opinion nav links should be in the nav element', async ({ page }) => {
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    const nav = page.locator('nav').first();
    const indiaLink = nav.locator('a[href*="/india"]').first();
    const opinionLink = nav.locator('a[href*="/opinion"]').first();

    await expect(indiaLink).toBeAttached();
    await expect(opinionLink).toBeAttached();
  });
});
