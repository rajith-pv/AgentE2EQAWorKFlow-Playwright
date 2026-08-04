// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

// FIXME: w3.ibm.com requires IBM corporate network (VPN). Skipped in non-IBM CI environments.
test.fixme('TC08 - Verify unauthenticated access redirects to login', async ({ browser }) => {
  // 1. Open a fresh browser context with NO authentication state
  const context = await browser.newContext();
  const page = await context.newPage();

  // 2. Navigate to W3 home page without any auth cookies
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 3. Verify the page redirects to the IBM login page
  const currentUrl = page.url();
  expect(currentUrl).toMatch(/login\.w3\.ibm\.com|w3id\.sso\.ibm\.com|ibm\.com\/login/i);

  // 4. Verify login form elements are present
  const loginElements = page.locator('input[type="text"], input[type="email"], input[name*="user"], input[name*="email"]');
  await expect(loginElements.first()).toBeVisible({ timeout: 10000 });

  await context.close();
});
