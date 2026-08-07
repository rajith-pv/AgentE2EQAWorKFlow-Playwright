import { test } from '@playwright/test';

/**
 * Seed test for playwright-test-planner
 * Navigates to NDTV home page to set up browser context.
 */
test('Navigate to NDTV home page', async ({ page }) => {
  await page.goto('https://www.ndtv.com/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
});
