// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts
// Suite 2 — Tab Navigation (AC1)
// TC05 - Full AC1 flow: home page → People tab → News tab

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com is IBM internal intranet — requires IBM corporate network/VPN.
// Remove test.fixme when running on IBM network.
test.fixme('TC05 - Full AC1 flow: home page → People tab → News tab', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. GIVEN: Navigate to W3 home page with auth state
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // Verify home page loaded correctly
  const title = await page.title();
  expect(title).toMatch(/w3|ibm/i);
  expect(page.url()).toContain('w3.ibm.com');

  // 2. WHEN: Click on the People tab
  const peopleTab = page.getByRole('tab', { name: /people/i })
    .or(page.getByRole('link', { name: /people/i }))
    .or(page.getByText('People').first());
  await peopleTab.click();
  await page.waitForLoadState('domcontentloaded');

  // Verify People tab content loaded
  const afterPeople = await page.content();
  expect(afterPeople.toLowerCase()).toMatch(/people|employee|directory/i);

  // 3. AND: Click on the News tab
  const newsTab = page.getByRole('tab', { name: /^news$/i })
    .or(page.getByRole('link', { name: /^news$/i }))
    .or(page.getByText('News').first());
  await newsTab.click();
  await page.waitForLoadState('domcontentloaded');

  // Verify News tab content loaded
  const afterNews = await page.content();
  expect(afterNews.toLowerCase()).toMatch(/news|article|headline/i);

  // 4. Verify user remains on W3 IBM domain throughout
  expect(page.url()).toContain('ibm.com');

  await context.close();
});
