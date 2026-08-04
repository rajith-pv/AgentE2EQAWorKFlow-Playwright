// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts
// Suite 2 — Tab Navigation (AC1)
// TC04 - Navigate to News tab and verify content loads

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com is IBM internal intranet — requires IBM corporate network/VPN.
// Remove test.fixme when running on IBM network.
test.fixme('TC04 - Navigate to News tab and verify content loads', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with auth state restored
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Click on the 'News' tab (IBM Carbon role=tab locator with text fallback)
  const newsTab = page.getByRole('tab', { name: /^news$/i })
    .or(page.getByRole('link', { name: /^news$/i }))
    .or(page.getByText('News').first());
  await newsTab.click();

  // 3. Wait for News tab content to fully load
  await page.waitForLoadState('domcontentloaded');

  // 4. Verify News tab is now active (aria-selected="true")
  const activeTab = page.locator('[aria-selected="true"]');
  await expect(activeTab).toContainText(/news/i, { timeout: 10000 });

  // 5. Verify News articles or headlines are visible
  const pageContent = await page.content();
  expect(pageContent.toLowerCase()).toMatch(/news|article|headline|story/i);

  await context.close();
});
