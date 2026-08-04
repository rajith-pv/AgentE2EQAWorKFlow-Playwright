// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com requires IBM corporate network (VPN). Skipped in non-IBM CI environments.
test.fixme('TC05 - Navigate to IT Support tab and verify content loads', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with authentication state restored
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Click on the 'IT Support' tab in the navigation bar
  const itSupportTab = page.getByRole('tab', { name: /it support/i })
    .or(page.getByRole('link', { name: /it support/i }))
    .or(page.getByText('IT Support').first());
  await itSupportTab.click();

  // 3. Wait 30 seconds for the IT Support tab content to fully load (per AC1)
  await page.waitForTimeout(30000);
  await page.waitForLoadState('domcontentloaded');

  // 4. Verify IT Support content is visible
  const pageContent = await page.content();
  expect(pageContent.toLowerCase()).toMatch(/it support|helpdesk|support|service desk|ticket/i);

  await context.close();
});
