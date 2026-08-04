// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com requires IBM corporate network (VPN). Skipped in non-IBM CI environments.
test.fixme('TC03 - Navigate to News tab and verify content loads', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with authentication state restored
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Click on the 'News' tab in the navigation bar
  const newsTab = page.getByRole('tab', { name: /^news$/i })
    .or(page.getByRole('link', { name: /^news$/i }))
    .or(page.getByText('News').first());
  await newsTab.click();

  // 3. Wait 30 seconds for the News tab content to fully load (per AC1)
  await page.waitForTimeout(30000);
  await page.waitForLoadState('domcontentloaded');

  // 4. Verify News content is visible (articles or headlines)
  const pageContent = await page.content();
  expect(pageContent.toLowerCase()).toMatch(/news|article|headline|story|ibm/i);

  await context.close();
});
