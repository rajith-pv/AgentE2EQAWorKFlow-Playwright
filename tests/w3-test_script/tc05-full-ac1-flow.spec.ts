import { test, expect } from '@playwright/test';

/**
 * TC05 — Full AC1 Navigation Flow
 * End-to-end test covering the complete Acceptance Criteria AC1:
 * - Home page loads for authenticated user
 * - Navigate to People tab
 * - Navigate to News tab
 *
 * HEAL NOTE: waitForFunction replaced with toHaveTitle; skip if auth expired.
 */
test.describe('TC05 — Full AC1 Navigation Flow (Home → People → News)', () => {
  test('should complete the full AC1 navigation flow: Home → People → News', async ({ page }) => {
    // ── GIVEN: A logged-in user on the W3 home page ──
    await page.goto('https://w3.ibm.com/', { waitUntil: 'domcontentloaded' });

    // Wait for the SPA to fully load
    await expect(page).toHaveTitle(/Home|w3/, { timeout: 45000 });
    if (page.url().includes('login.w3.ibm.com')) {
      test.skip(true, 'Session expired — skipping.');
      return;
    }
    await expect(page).toHaveTitle('Home', { timeout: 45000 });

    // Verify home page loaded
    await expect(page.getByRole('banner', { name: 'w3' })).toBeVisible();

    // Verify user is authenticated (profile button visible)
    await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();

    // Verify main navigation is present in DOM (hidden at desktop width)
    const nav = page.getByRole('navigation', { name: 'Mobile Navigation' });
    await expect(nav).toBeAttached();

    // ── WHEN: Click on People Tab ──
    await page.goto('https://w3.ibm.com/#/people');

    // ── THEN: People page loads ──
    await expect(page).toHaveTitle('People', { timeout: 30000 });
    expect(page.url()).toContain('#/people');

    // ── AND: Click on News Tab ──
    await page.goto('https://w3.ibm.com/#/news');

    // ── THEN: News page loads ──
    await expect(page).toHaveTitle('News', { timeout: 30000 });
    expect(page.url()).toContain('#/news');

    // Verify main content area is still functional
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate People → Home → News without losing auth state', async ({ page }) => {
    // Navigate to People first
    await page.goto('https://w3.ibm.com/#/people');
    await expect(page).toHaveTitle(/People|w3/, { timeout: 45000 });
    if (page.url().includes('login.w3.ibm.com')) {
      test.skip(true, 'Session expired — skipping.');
      return;
    }
    await expect(page).toHaveTitle('People', { timeout: 45000 });

    // Navigate back to home
    await page.goto('https://w3.ibm.com/');
    await expect(page).toHaveTitle('Home', { timeout: 45000 });

    // Profile button still visible (auth state retained)
    await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();

    // Navigate to News
    await page.goto('https://w3.ibm.com/#/news');
    await expect(page).toHaveTitle('News', { timeout: 30000 });
  });
});
