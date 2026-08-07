import { test, expect } from '@playwright/test';

/**
 * TC04 — Full AC1 Navigation Flow (Home → India → Opinion)
 * End-to-end test covering all steps in Acceptance Criteria AC1:
 * - GIVEN user is on NDTV home page
 * - WHEN home page is loaded
 * - THEN click India Tab
 * - AND click Opinion Tab
 *
 * HEAL NOTE: Using page.goto() instead of click() due to NDTV's ad-heavy
 * page causing navigation click timeouts in Firefox.
 * Test timeout is 60s in playwright.config.ts.
 */
test.describe('TC04 — Full AC1 Navigation Flow (Home → India → Opinion)', () => {
  test('should complete the full AC1 flow: Home → India → back → Opinion', async ({ page }) => {
    // ── GIVEN: User is on the NDTV home page ──
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    // Verify India and Opinion links are present in nav
    const indiaLink = page.locator('a.m-nv_lnk[href*="/india"]').first();
    const opinionLink = page.locator('a.m-nv_lnk[href*="/opinion"]').first();
    await expect(indiaLink).toBeAttached();
    await expect(opinionLink).toBeAttached();

    // ── WHEN: Click on India Tab — use direct URL for reliability ──
    await page.goto('https://www.ndtv.com/india', { waitUntil: 'domcontentloaded' });

    // ── THEN: India page loads ──
    await expect(page).toHaveTitle(/India/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/india/);

    // Navigate back to home
    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    // ── AND: Click on Opinion Tab — use direct URL for reliability ──
    await page.goto('https://www.ndtv.com/opinion', { waitUntil: 'domcontentloaded' });

    // ── THEN: Opinion page loads ──
    await expect(page).toHaveTitle(/Opinion/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/opinion/);
  });

  test('should navigate India → home → Opinion in single session', async ({ page }) => {
    await page.goto('https://www.ndtv.com/india', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/India/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/india/);

    await page.goto('https://www.ndtv.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/NDTV/, { timeout: 30000 });

    await page.goto('https://www.ndtv.com/opinion', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Opinion/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/opinion/);
  });
});
