// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts
// Suite 1 — Home Page Load
// TC01 - Verify W3 home page loads for authenticated user

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com is IBM internal intranet — requires IBM corporate network/VPN.
// Remove test.fixme when running on IBM network.
test.fixme('TC01 - Verify W3 home page loads for authenticated user', async ({ browser }) => {
  // Restore authenticated session using saved auth state
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with saved auth state
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Verify page title contains 'w3' or 'IBM'
  const title = await page.title();
  expect(title).toMatch(/w3|ibm/i);

  // 3. Verify main navigation bar is visible
  await expect(page.locator('nav').first()).toBeVisible({ timeout: 15000 });

  // 4. Verify People and News tabs are present in the navigation bar
  await expect(
    page.getByRole('tab', { name: /people/i }).or(page.getByText('People').first())
  ).toBeVisible({ timeout: 15000 });
  await expect(
    page.getByRole('tab', { name: /news/i }).or(page.getByText('News').first())
  ).toBeVisible({ timeout: 15000 });

  await context.close();
});
