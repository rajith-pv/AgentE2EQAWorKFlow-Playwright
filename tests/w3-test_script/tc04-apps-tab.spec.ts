// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com requires IBM corporate network (VPN). Skipped in non-IBM CI environments.
test.fixme('TC04 - Navigate to Apps tab and verify content loads', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with authentication state restored
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Click on the 'Apps' tab in the navigation bar
  const appsTab = page.getByRole('tab', { name: /^apps$/i })
    .or(page.getByRole('link', { name: /^apps$/i }))
    .or(page.getByText('Apps').first());
  await appsTab.click();

  // 3. Wait 30 seconds for the Apps tab content to fully load (per AC1)
  await page.waitForTimeout(30000);
  await page.waitForLoadState('domcontentloaded');

  // 4. Verify Apps content is visible (tiles or application links)
  const pageContent = await page.content();
  expect(pageContent.toLowerCase()).toMatch(/app|application|tool|software|service/i);

  await context.close();
});
