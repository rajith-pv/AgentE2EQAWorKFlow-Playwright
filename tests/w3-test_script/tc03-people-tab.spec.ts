// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts
// Suite 2 — Tab Navigation (AC1)
// TC03 - Navigate to People tab and verify content loads

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com is IBM internal intranet — requires IBM corporate network/VPN.
// Remove test.fixme when running on IBM network.
test.fixme('TC03 - Navigate to People tab and verify content loads', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with auth state restored
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Click on the 'People' tab (IBM Carbon role=tab locator with text fallback)
  const peopleTab = page.getByRole('tab', { name: /people/i })
    .or(page.getByRole('link', { name: /people/i }))
    .or(page.getByText('People').first());
  await peopleTab.click();

  // 3. Wait for People tab content to fully load
  await page.waitForLoadState('domcontentloaded');

  // 4. Verify People tab is now active (aria-selected="true")
  const activeTab = page.locator('[aria-selected="true"]');
  await expect(activeTab).toContainText(/people/i, { timeout: 10000 });

  // 5. Verify People-related content is visible
  const pageContent = await page.content();
  expect(pageContent.toLowerCase()).toMatch(/people|employee|directory|search/i);

  await context.close();
});
