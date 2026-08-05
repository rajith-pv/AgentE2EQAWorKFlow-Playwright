import { test, expect } from '@playwright/test';

/**
 * TC-002: Unauthenticated User Redirect
 * Verifies that unauthenticated users are redirected to the IBM SSO login page
 * and cannot access w3 content directly.
 */

const W3_URL = 'https://w3.ibm.com/';

test.describe('TC-002: Unauthenticated User Redirect', () => {
  test('unauthenticated user is redirected to IBM SSO login', async ({ page }) => {
    await page.goto(W3_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForURL(/login|sso|ibm\.com\/auth|w3id/i, { timeout: 20000 });

    const currentUrl = page.url();
    console.log(`Redirected to: ${currentUrl}`);
    expect(currentUrl).toMatch(/login|sso|ibm\.com\/auth|w3id/i);

    const loginIndicator = page
      .getByRole('textbox', { name: /username|email|user id/i })
      .or(page.getByText(/sign in|log in|authenticate/i).first());
    await expect(loginIndicator).toBeVisible({ timeout: 10000 });

    console.log('TC-002 PASSED: Unauthenticated user redirected to SSO login');
  });
});