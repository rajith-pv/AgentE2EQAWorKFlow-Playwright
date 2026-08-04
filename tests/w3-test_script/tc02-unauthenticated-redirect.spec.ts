// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts
// Suite 1 — Home Page Load
// TC02 - Verify unauthenticated access redirects to IBM login page

import { test, expect } from '@playwright/test';

// FIXME: w3.ibm.com is IBM internal intranet — requires IBM corporate network/VPN.
// Remove test.fixme when running on IBM network.
test.fixme('TC02 - Verify unauthenticated access redirects to IBM login page', async ({ browser }) => {
  // 1. Open a fresh context with NO auth cookies
  const context = await browser.newContext();
  const page = await context.newPage();

  // 2. Navigate without authentication — expect redirect to IBM SSO
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 3. Verify URL is IBM login/SSO domain (not w3.ibm.com)
  const currentUrl = page.url();
  expect(currentUrl).toMatch(/login\.w3\.ibm\.com|w3id\.sso\.ibm\.com/i);

  // 4. Verify login form input is visible
  await expect(
    page.locator('input[type="email"], input[type="text"], input[name*="user"]').first()
  ).toBeVisible({ timeout: 10000 });

  await context.close();
});
