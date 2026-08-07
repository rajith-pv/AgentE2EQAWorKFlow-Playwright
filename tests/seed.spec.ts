import { test } from '@playwright/test';

test('Navigate to W3 IBM home page', async ({ page }) => {
  await page.goto('https://w3.ibm.com/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
});
