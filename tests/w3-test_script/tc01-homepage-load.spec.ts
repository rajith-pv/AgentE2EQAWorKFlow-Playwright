// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com requires IBM corporate network (VPN). Skipped in non-IBM CI environments.
test.fixme('TC01 - Verify W3 home page loads successfully after login', async ({ browser }) => {
  // Restore authenticated session using saved auth state
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with authentication state
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Verify page title contains 'w3' or 'IBM'
  const title = await page.title();
  expect(title.toLowerCase()).toMatch(/w3|ibm/i);

  // 3. Verify navigation tabs are visible (People, News, Apps, IT Support, AskIBM)
  const nav = page.locator('nav').first();
  await expect(nav).toBeVisible({ timeout: 15000 });

  // 4. Verify each tab is present in the navigation bar
  await expect(page.getByRole('tab', { name: /people/i }).or(page.getByText('People').first())).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole('tab', { name: /news/i }).or(page.getByText('News').first())).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole('tab', { name: /apps/i }).or(page.getByText('Apps').first())).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole('tab', { name: /it support/i }).or(page.getByText('IT Support').first())).toBeVisible({ timeout: 15000 });
  await expect(page.getByRole('tab', { name: /askibm/i }).or(page.getByText('AskIBM').first())).toBeVisible({ timeout: 15000 });

  await context.close();
});
