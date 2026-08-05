import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * TC-007: No Console Errors During Navigation
 *
 * Healing Notes (v2): If auth/w3-session.json does not exist, test is skipped.
 */

const W3_URL = 'https://w3.ibm.com/';
const SESSION_PATH = path.join(__dirname, '../../auth/w3-session.json');
const SESSION_EXISTS = fs.existsSync(SESSION_PATH);

test.describe('TC-007: No Console Errors on Navigation', () => {
  test.use({
    storageState: SESSION_EXISTS ? SESSION_PATH : undefined,
  });

  test('no console errors during page load and tab navigation', async ({ page }) => {
    if (!SESSION_EXISTS) {
      test.skip(true, 'Skipped: auth/w3-session.json not found. Run on IBM network to create session.');
    }

    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
    });
    page.on('pageerror', err => consoleErrors.push(`[pageerror] ${err.message}`));

    await page.goto(W3_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 });

    const peopleTab = page
      .getByRole('tab', { name: /people/i })
      .or(page.getByRole('link', { name: /people/i }));
    await expect(peopleTab).toBeVisible({ timeout: 10000 });
    await peopleTab.click();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    const newsTab = page
      .getByRole('tab', { name: /news/i })
      .or(page.getByRole('link', { name: /news/i }));
    await expect(newsTab).toBeVisible({ timeout: 10000 });
    await newsTab.click();
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    if (consoleErrors.length > 0) {
      console.error('Console errors detected:');
      consoleErrors.forEach(err => console.error(err));
    }

    expect(consoleErrors, `Console errors found:\n${consoleErrors.join('\n')}`).toHaveLength(0);
    console.log('TC-007 PASSED: No console errors during navigation');
  });
});