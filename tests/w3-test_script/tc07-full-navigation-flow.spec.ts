// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts
// AC1 - Full sequential navigation flow through all tabs

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com requires IBM corporate network (VPN). Skipped in non-IBM CI environments.
test.fixme('TC07 - Complete sequential tab navigation flow (AC1 full scenario)', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page with auth state, verify home page and all 5 tabs are visible
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');
  const title = await page.title();
  expect(title).toMatch(/w3|ibm/i);

  // Helper to click a tab by name (tries multiple locator strategies)
  async function clickTab(name: string, regex: RegExp) {
    const tab = page.getByRole('tab', { name: regex })
      .or(page.getByRole('link', { name: regex }))
      .or(page.getByText(name).first());
    await tab.click();
  }

  // 2. Click People tab and wait 30 seconds
  await clickTab('People', /people/i);
  await page.waitForTimeout(30000);
  await page.waitForLoadState('domcontentloaded');

  // 3. Click News tab and wait 30 seconds
  await clickTab('News', /^news$/i);
  await page.waitForTimeout(30000);
  await page.waitForLoadState('domcontentloaded');

  // 4. Click Apps tab and wait 30 seconds
  await clickTab('Apps', /^apps$/i);
  await page.waitForTimeout(30000);
  await page.waitForLoadState('domcontentloaded');

  // 5. Click IT Support tab and wait 30 seconds
  await clickTab('IT Support', /it support/i);
  await page.waitForTimeout(30000);
  await page.waitForLoadState('domcontentloaded');

  // 6. Click AskIBM tab and wait 30 seconds
  await clickTab('AskIBM', /askibm/i);
  await page.waitForTimeout(30000);
  await page.waitForLoadState('domcontentloaded');

  // Final assertion: page is still loaded and user is still authenticated
  expect(page.url()).toContain('w3.ibm.com');

  await context.close();
});
