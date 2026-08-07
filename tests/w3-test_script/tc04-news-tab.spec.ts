import { test, expect } from '@playwright/test';

/**
 * TC04 — News Tab Navigation
 * Verifies that the News page loads correctly via hash navigation.
 *
 * HEAL NOTE: beforeEach now uses toHaveTitle with a flexible regex and
 * skips the test if redirected to login.
 */
test.describe('TC04 — News Tab Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://w3.ibm.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Home|w3/, { timeout: 45000 });
    if (page.url().includes('login.w3.ibm.com')) {
      test.skip(true, 'Session expired — skipping authenticated tests.');
    }
    await expect(page).toHaveTitle('Home', { timeout: 45000 });
  });

  test('should navigate to News tab and load the News page', async ({ page }) => {
    // Step 1: Navigate to News tab via hash routing
    await page.goto('https://w3.ibm.com/#/news');

    // Step 2: Wait for News page to load
    await expect(page).toHaveTitle('News', { timeout: 30000 });

    // Step 3: Verify URL contains #/news
    expect(page.url()).toContain('#/news');

    // Step 4: Verify main content area is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display News navigation link as accessible from home', async ({ page }) => {
    // Verify News link exists in the nav DOM (hidden at desktop width)
    const nav = page.getByRole('navigation', { name: 'Mobile Navigation' });
    const newsLink = nav.getByRole('link', { name: 'News' });

    await expect(newsLink).toBeAttached();
    await expect(newsLink).toHaveAttribute('href', '#/news');
  });
});
