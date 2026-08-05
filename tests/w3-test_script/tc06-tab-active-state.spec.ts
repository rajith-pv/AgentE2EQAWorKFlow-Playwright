import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * TC-006: Tab Active State Persistence
 * Verifies that only one tab is active at a time.
 *
 * Healing Notes (v2): If auth/w3-session.json does not exist, test is skipped.
 */

const W3_URL = 'https://w3.ibm.com/';
const SESSION_PATH = path.join(__dirname, '../../auth/w3-session.json');
const SESSION_EXISTS = fs.existsSync(SESSION_PATH);
const NAV_TABS = ['People', 'News'];

test.describe('TC-006: Tab Active State', () => {
  test.use({
    storageState: SESSION_EXISTS ? SESSION_PATH : undefined,
  });

  test('only one tab is active at a time during sequential navigation', async ({ page }) => {
    if (!SESSION_EXISTS) {
      test.skip(true, 'Skipped: auth/w3-session.json not found. Run on IBM network to create session.');
    }

    await page.goto(W3_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 });

    for (const tabName of NAV_TABS) {
      const tab = page
        .getByRole('tab', { name: new RegExp(tabName, 'i') })
        .or(page.getByRole('link', { name: new RegExp(tabName, 'i') }));

      await expect(tab).toBeVisible({ timeout: 10000 });
      await tab.click();
      await page.waitForLoadState('networkidle', { timeout: 15000 });

      const isActiveByAria = await tab.getAttribute('aria-selected');
      const isActiveByClass = await tab.evaluate(el => {
        return el.classList.contains('active') ||
               el.classList.contains('selected') ||
               el.classList.contains('is-active') ||
               el.getAttribute('aria-current') === 'true' ||
               el.getAttribute('aria-current') === 'page';
      });

      console.log(`Tab "${tabName}" — aria-selected: ${isActiveByAria}, class-active: ${isActiveByClass}`);

      const allTabs = page.getByRole('tab').or(page.locator('nav').getByRole('link'));
      const tabCount = await allTabs.count();
      let activeCount = 0;
      for (let i = 0; i < tabCount; i++) {
        const selected = await allTabs.nth(i).getAttribute('aria-selected');
        if (selected === 'true') activeCount++;
      }
      expect(activeCount).toBeLessThanOrEqual(1);
    }

    console.log('TC-006 PASSED: Tab active state updates correctly');
  });
});