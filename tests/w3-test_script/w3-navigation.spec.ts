/**
 * SCRUM-101: W3 IBM Home Navigation Tests
 *
 * Test Suite: W3 Home Page Navigation
 * Application: https://w3.ibm.com/
 *
 * Covers Acceptance Criteria AC1:
 * - Navigate to People, News, Apps, IT Support, AskIBM tabs
 * - Wait for each page to load and verify content
 *
 * Exploratory testing insights used:
 * - Navigation links use href anchors: #/people, #/news, #/apps/category/recommended, #/support
 * - AskIBM navigates to https://w3.ibm.com/ask (full URL, not hash-based)
 * - Nav link selector: nav[aria-label="Main Navigation"] a[href="..."]
 * - Page loads are tracked by page title changes
 * - Apps tab is not always visible on small viewports; using hash navigation as fallback
 *
 * HEALED (STEP 5): Added storageState for authenticated SSO session.
 *   Root cause: Fresh browser contexts hit the w3id login page.
 *   Fix: Use saved authenticated storage state from .playwright-mcp/w3-auth-state.json
 */

import { test, expect, Page } from '@playwright/test';
import * as path from 'path';

const W3_BASE_URL = 'https://w3.ibm.com/';
const NAV_SELECTOR = 'nav[aria-label="Main Navigation"]';
// Saved authenticated storage state from the live logged-in browser session
const AUTH_STATE = path.join(__dirname, '../../.playwright-mcp/w3-auth-state.json');

/**
 * Helper: wait for page title to match expected value
 */
async function waitForTitle(page: Page, expectedTitle: string, timeout = 30000) {
  await expect(page).toHaveTitle(expectedTitle, { timeout });
}

/**
 * Helper: navigate to W3 home and wait for the page to be fully loaded
 */
async function goToW3Home(page: Page) {
  await page.goto(W3_BASE_URL);
  // Wait for the loading overlay to disappear
  await page.waitForFunction(
    () => !document.querySelector('[ref="f9e7"]')?.textContent?.includes('Launching w3...'),
    { timeout: 30000 }
  );
  await expect(page).toHaveTitle('Home', { timeout: 30000 });
}

// ---------------------------------------------------------------------------
// Test Suite
// ---------------------------------------------------------------------------

test.describe('W3 Home Page Navigation (SCRUM-101)', () => {

  // HEALED: Use saved authenticated storage state to bypass SSO login
  test.use({ storageState: AUTH_STATE });

  test.beforeEach(async ({ page }) => {
    // Each test starts from the W3 home page
    await goToW3Home(page);
  });

  // -------------------------------------------------------------------------
  // TC-001: Verify W3 Home page loads successfully
  // -------------------------------------------------------------------------
  test('TC-001: Verify W3 Home page loads successfully', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle('Home');

    // Verify main navigation is visible
    const nav = page.locator(NAV_SELECTOR);
    await expect(nav).toBeVisible();

    // Verify all 5 main navigation tabs are present
    const navLinks = [
      { text: 'Home',       href: '#/' },
      { text: 'People',     href: '#/people' },
      { text: 'News',       href: '#/news' },
      { text: 'Apps',       href: '#/apps/category/recommended' },
      { text: 'IT Support', href: '#/support' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`${NAV_SELECTOR} a`).filter({ hasText: link.text });
      await expect(navLink.first()).toBeVisible();
    }

    // Verify w3 logo / header banner
    // HEALED: Use <header> HTML element (implicit banner role) confirmed in exploratory snapshot
    const header = page.locator('header');
    await expect(header.first()).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // TC-002: Navigate to People tab
  // -------------------------------------------------------------------------
  test('TC-002: Navigate to People tab and verify page loads', async ({ page }) => {
    // Click the People tab
    const peopleLink = page.locator(`${NAV_SELECTOR} a[href="#/people"]`);
    await expect(peopleLink).toBeVisible();
    await peopleLink.click();

    // Wait for People page — acceptance criteria: wait for 30 seconds (max)
    await waitForTitle(page, 'People', 30000);

    // Verify URL updated
    await expect(page).toHaveURL(/\/#\/people/);

    // Verify no error messages are displayed
    const errorMessage = page.locator('[role="alert"]').filter({ hasText: /error/i });
    await expect(errorMessage).toHaveCount(0);
  });

  // -------------------------------------------------------------------------
  // TC-003: Navigate to News tab
  // -------------------------------------------------------------------------
  test('TC-003: Navigate to News tab and verify page loads', async ({ page }) => {
    // Click the News tab
    const newsLink = page.locator(`${NAV_SELECTOR} a[href="#/news"]`);
    await expect(newsLink).toBeVisible();
    await newsLink.click();

    // Wait for News page — AC: wait 30 seconds
    await waitForTitle(page, 'News', 30000);

    // Verify URL updated
    await expect(page).toHaveURL(/\/#\/news/);
  });

  // -------------------------------------------------------------------------
  // TC-004: Navigate to Apps tab
  // -------------------------------------------------------------------------
  test('TC-004: Navigate to Apps tab and verify page loads', async ({ page }) => {
    // Apps link may not be visible in narrow viewports; use hash navigation as fallback
    const appsLink = page.locator(`${NAV_SELECTOR} a[href="#/apps/category/recommended"]`);

    if (await appsLink.isVisible()) {
      await appsLink.click();
    } else {
      // Fallback: hash navigation (observed during exploratory testing)
      await page.evaluate(() => { window.location.hash = '#/apps/category/recommended'; });
    }

    // Wait for Apps page — AC: wait 30 seconds
    await waitForTitle(page, 'Apps - Recommended', 30000);

    // Verify URL contains apps
    await expect(page).toHaveURL(/\/#\/apps/);
  });

  // -------------------------------------------------------------------------
  // TC-005: Navigate to IT Support tab
  // -------------------------------------------------------------------------
  test('TC-005: Navigate to IT Support tab and verify page loads', async ({ page }) => {
    const itSupportLink = page.locator(`${NAV_SELECTOR} a[href="#/support"]`);

    if (await itSupportLink.isVisible()) {
      await itSupportLink.click();
    } else {
      await page.evaluate(() => { window.location.hash = '#/support'; });
    }

    // Wait for IT Support page — AC: wait 30 seconds
    await waitForTitle(page, 'IT Support', 30000);

    // Verify URL updated
    await expect(page).toHaveURL(/\/#\/support/);
  });

  // -------------------------------------------------------------------------
  // TC-006: Navigate to AskIBM tab
  // -------------------------------------------------------------------------
  test('TC-006: Navigate to AskIBM tab and verify page loads', async ({ page }) => {
    // AskIBM link navigates to a full URL (not hash-based)
    const askIbmLink = page.locator(`${NAV_SELECTOR} a[href="https://w3.ibm.com/ask"]`);

    if (await askIbmLink.isVisible()) {
      await askIbmLink.click();
    } else {
      await page.goto('https://w3.ibm.com/ask');
    }

    // Wait for AskIBM page — AC: wait 30 seconds
    await waitForTitle(page, 'AskIBM', 30000);

    // Verify URL
    await expect(page).toHaveURL(/w3\.ibm\.com\/ask/);
  });

  // -------------------------------------------------------------------------
  // TC-007: Complete navigation flow — all tabs in sequence (AC1 full scenario)
  // -------------------------------------------------------------------------
  test('TC-007: Complete navigation flow - all tabs in sequence (AC1)', async ({ page }) => {
    // Start: Home page
    await expect(page).toHaveTitle('Home');
    await expect(page).toHaveURL(/w3\.ibm\.com/);

    // Step 1: People tab
    const peopleLink = page.locator(`${NAV_SELECTOR} a[href="#/people"]`);
    await expect(peopleLink).toBeVisible();
    await peopleLink.click();
    await waitForTitle(page, 'People', 30000);
    await expect(page).toHaveURL(/\/#\/people/);

    // Step 2: News tab
    const newsLink = page.locator(`${NAV_SELECTOR} a[href="#/news"]`);
    await expect(newsLink).toBeVisible();
    await newsLink.click();
    await waitForTitle(page, 'News', 30000);
    await expect(page).toHaveURL(/\/#\/news/);

    // Step 3: Apps tab (with fallback)
    const appsLink = page.locator(`${NAV_SELECTOR} a[href="#/apps/category/recommended"]`);
    if (await appsLink.isVisible()) {
      await appsLink.click();
    } else {
      await page.evaluate(() => { window.location.hash = '#/apps/category/recommended'; });
    }
    await waitForTitle(page, 'Apps - Recommended', 30000);
    await expect(page).toHaveURL(/\/#\/apps/);

    // Step 4: IT Support tab (with fallback)
    const itSupportLink = page.locator(`${NAV_SELECTOR} a[href="#/support"]`);
    if (await itSupportLink.isVisible()) {
      await itSupportLink.click();
    } else {
      await page.evaluate(() => { window.location.hash = '#/support'; });
    }
    await waitForTitle(page, 'IT Support', 30000);
    await expect(page).toHaveURL(/\/#\/support/);

    // Step 5: AskIBM tab
    const askIbmLink = page.locator(`${NAV_SELECTOR} a[href="https://w3.ibm.com/ask"]`);
    if (await askIbmLink.isVisible()) {
      await askIbmLink.click();
    } else {
      await page.goto('https://w3.ibm.com/ask');
    }
    await waitForTitle(page, 'AskIBM', 30000);
    await expect(page).toHaveURL(/w3\.ibm\.com\/ask/);
  });

  // -------------------------------------------------------------------------
  // TC-008: Verify Home tab returns to home page from another tab
  // -------------------------------------------------------------------------
  test('TC-008: Verify Home tab returns to home page from People page', async ({ page }) => {
    // First navigate to People
    const peopleLink = page.locator(`${NAV_SELECTOR} a[href="#/people"]`);
    await peopleLink.click();
    await waitForTitle(page, 'People', 30000);

    // Now click Home tab
    const homeLink = page.locator(`${NAV_SELECTOR} a[href="#/"]`);
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    // Verify home page
    await waitForTitle(page, 'Home', 30000);
    await expect(page).toHaveURL(/w3\.ibm\.com/);
  });

  // -------------------------------------------------------------------------
  // TC-009: Verify navigation banner is visible across tab pages
  // -------------------------------------------------------------------------
  test('TC-009: Verify main navigation banner is visible on all tab pages', async ({ page }) => {
    const pages = [
      { url: '#/people',                   title: 'People' },
      { url: '#/news',                      title: 'News' },
      { url: '#/apps/category/recommended', title: 'Apps - Recommended' },
      { url: '#/support',                   title: 'IT Support' },
    ];

    for (const { url, title } of pages) {
      await page.evaluate((hash) => { window.location.hash = hash; }, url);
      await waitForTitle(page, title, 30000);

      // Check navigation banner exists on each page
      const nav = page.locator(NAV_SELECTOR);
      await expect(nav).toBeVisible({ timeout: 5000 });
    }
  });

  // -------------------------------------------------------------------------
  // TC-010: Verify page title changes correctly for each tab
  // -------------------------------------------------------------------------
  test('TC-010: Verify page title changes for each tab', async ({ page }) => {
    const tabTitleMap = [
      { hash: '#/people',                   expectedTitle: 'People' },
      { hash: '#/news',                      expectedTitle: 'News' },
      { hash: '#/apps/category/recommended', expectedTitle: 'Apps - Recommended' },
      { hash: '#/support',                   expectedTitle: 'IT Support' },
    ];

    for (const { hash, expectedTitle } of tabTitleMap) {
      await page.evaluate((h) => { window.location.hash = h; }, hash);
      await waitForTitle(page, expectedTitle, 30000);
      await expect(page).toHaveTitle(expectedTitle);
    }

    // AskIBM (full navigation)
    await page.goto('https://w3.ibm.com/ask');
    await waitForTitle(page, 'AskIBM', 30000);
    await expect(page).toHaveTitle('AskIBM');
  });

});
