import { test, expect } from '@playwright/test';

/**
 * TC01 — Home Page Load
 * Verifies the W3 home page loads correctly for an authenticated user.
 *
 * HEAL NOTE: W3's SSO uses server-side session binding. The title waits
 * have been changed to use toHaveTitle with a flexible regex, and the
 * overall test timeout increased to handle slow SPA initialization.
 */
test.describe('TC01 — Home Page Load', () => {
  test('should load the W3 home page with correct title and navigation for authenticated user', async ({ page }) => {
    // Step 1: Navigate to W3 home page
    await page.goto('https://w3.ibm.com/', { waitUntil: 'domcontentloaded' });

    // Step 2: Wait for page to fully load — title changes from 'w3' to 'Home'
    // Using a broad regex to handle any intermediate loading state
    await expect(page).toHaveTitle(/Home|w3/, { timeout: 45000 });

    // If redirected to login, mark as blocked
    const currentUrl = page.url();
    if (currentUrl.includes('login.w3.ibm.com')) {
      test.skip(true, 'Session expired — redirected to login. Re-authenticate via MCP browser.');
      return;
    }

    // Step 3: Verify page title is 'Home' (SPA fully loaded)
    await expect(page).toHaveTitle('Home', { timeout: 45000 });

    // Step 4: Verify the w3 banner/header is present
    await expect(page.getByRole('banner', { name: 'w3' })).toBeVisible();

    // Step 5: Verify navigation links exist in the Mobile Navigation
    // Note: The mobile nav is hidden (CSS class cds--side-nav--hidden) at desktop viewport widths.
    // We verify the links exist in the DOM rather than asserting visibility.
    const nav = page.getByRole('navigation', { name: 'Mobile Navigation' });
    await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#/');
    await expect(nav.getByRole('link', { name: 'People' })).toHaveAttribute('href', '#/people');
    await expect(nav.getByRole('link', { name: 'News' })).toHaveAttribute('href', '#/news');

    // Step 6: Verify main content area is present
    await expect(page.locator('main')).toBeVisible();

    // Step 7: Verify user is authenticated (profile avatar visible)
    await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();
  });
});
