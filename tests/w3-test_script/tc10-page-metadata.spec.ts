// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// Tab definitions for data-driven testing
const TABS = [
  { name: 'People',     regex: /people/i },
  { name: 'News',       regex: /^news$/i },
  { name: 'Apps',       regex: /^apps$/i },
  { name: 'IT Support', regex: /it support/i },
  { name: 'AskIBM',     regex: /askibm/i },
];

// FIXME: w3.ibm.com requires IBM corporate network (VPN). Skipped in non-IBM CI environments.
test.fixme('TC10 - Verify page title and basic metadata for each tab', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Navigate to W3 home page and check initial title
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');
  const homeTitle = await page.title();
  expect(homeTitle).toMatch(/w3|ibm/i);

  // 2. Capture console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 3. For each tab, click it and verify title and no critical JS errors
  for (const tab of TABS) {
    const tabLocator = page.getByRole('tab', { name: tab.regex })
      .or(page.getByRole('link', { name: tab.regex }))
      .or(page.getByText(tab.name).first());

    await tabLocator.click();
    await page.waitForLoadState('domcontentloaded');

    // Title should contain IBM or w3 at minimum
    const tabTitle = await page.title();
    expect(tabTitle).toMatch(/w3|ibm/i);
  }

  // 4. Assert no critical JavaScript errors were thrown
  const criticalErrors = consoleErrors.filter(e =>
    !e.includes('analytics') && !e.includes('tracking') && !e.includes('_dvs')
  );
  expect(criticalErrors.length).toBe(0);

  await context.close();
});
