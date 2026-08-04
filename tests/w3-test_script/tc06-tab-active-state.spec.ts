// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts
// Suite 3 — Edge Cases & Negative Tests
// TC06 - Verify active tab state changes visually on click

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com is IBM internal intranet — requires IBM corporate network/VPN.
// Remove test.fixme when running on IBM network.
test.fixme('TC06 - Verify active tab state changes visually on click', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2. Locate People and News tabs
  const peopleTab = page.getByRole('tab', { name: /people/i })
    .or(page.getByText('People').first());
  const newsTab = page.getByRole('tab', { name: /^news$/i })
    .or(page.getByText('News').first());

  // 3. Click People tab — verify it becomes aria-selected="true"
  await peopleTab.click();
  await page.waitForLoadState('domcontentloaded');
  const peopleSelected = await page.locator('[aria-selected="true"]').first().textContent();
  expect(peopleSelected?.toLowerCase()).toMatch(/people/i);

  // 4. Click News tab — verify News becomes active, People becomes inactive
  await newsTab.click();
  await page.waitForLoadState('domcontentloaded');
  const newsSelected = await page.locator('[aria-selected="true"]').first().textContent();
  expect(newsSelected?.toLowerCase()).toMatch(/news/i);

  await context.close();
});
