// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com requires IBM corporate network (VPN). Skipped in non-IBM CI environments.
test.fixme('TC09 - Verify navigation tabs are accessible via keyboard', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with authentication state restored
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Use Tab key to move focus into navigation area
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  // 3. Verify a focusable element is now focused (active element should be a tab/link)
  const focusedElement = await page.evaluate(() => {
    const el = document.activeElement;
    return {
      tagName: el?.tagName?.toLowerCase(),
      role: el?.getAttribute('role'),
      text: el?.textContent?.trim(),
    };
  });
  // Active element should be a tab, link, or button in the nav
  expect(['a', 'button', 'li']).toContain(focusedElement.tagName);

  // 4. Press Enter on a focused nav item to activate it
  await page.keyboard.press('Enter');
  await page.waitForLoadState('domcontentloaded');

  // 5. Verify page is still on w3.ibm.com (not navigated away unexpectedly)
  expect(page.url()).toContain('ibm.com');

  await context.close();
});
