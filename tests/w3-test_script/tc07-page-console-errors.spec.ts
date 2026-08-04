// spec: specs/w3-home-test-plan.md
// seed: tests/seed.spec.ts
// Suite 3 — Edge Cases & Negative Tests
// TC07 - Verify no critical console errors during navigation

import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_STATE = path.resolve('.playwright-mcp/w3-auth-state.json');

// FIXME: w3.ibm.com is IBM internal intranet — requires IBM corporate network/VPN.
// Remove test.fixme when running on IBM network.
test.fixme('TC07 - Verify no critical console errors during navigation', async ({ browser }) => {
  const context = await browser.newContext({ storageState: AUTH_STATE });
  const page = await context.newPage();

  // 1. Collect console errors (exclude known analytics/tracking noise)
  const criticalErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Filter out expected third-party analytics noise
      if (!text.includes('analytics') && !text.includes('_dvs') && !text.includes('divolte')) {
        criticalErrors.push(text);
      }
    }
  });

  // 2. Navigate to W3 home page — check for errors on load
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');

  // 3. Click People tab — check for errors
  const peopleTab = page.getByRole('tab', { name: /people/i })
    .or(page.getByText('People').first());
  await peopleTab.click();
  await page.waitForLoadState('domcontentloaded');

  // 4. Click News tab — check for errors
  const newsTab = page.getByRole('tab', { name: /^news$/i })
    .or(page.getByText('News').first());
  await newsTab.click();
  await page.waitForLoadState('domcontentloaded');

  // 5. Assert no critical JavaScript errors were thrown during navigation
  expect(criticalErrors, `Critical JS errors: ${criticalErrors.join(', ')}`).toHaveLength(0);

  await context.close();
});
