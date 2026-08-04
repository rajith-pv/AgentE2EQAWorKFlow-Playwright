import { test, expect, Page } from '@playwright/test';
import path from 'path';

/**
 * SCRUM-101: W3 Home Page Navigation Tests
 *
 * Tests for navigating all five primary tabs on the W3 IBM internal portal.
 * Auth: Uses saved browser storage state (w3id SSO cookies).
 *
 * Healing notes (Round 1):
 *   - Tests ran in fresh browser contexts without auth → redirected to w3id login
 *   - Fix: storageState used at test level to restore auth cookies
 *
 * Healing notes (Round 2):
 *   - "Open menu" button is visibility:hidden at desktop (1280px) viewport
 *   - At desktop width W3 renders a "Main Navigation" bar with direct links
 *   - Fix: TC-001/TC-008/TC-009 use the "Main Navigation" nav instead
 *   - TC-007 timeout: 5 tabs × 3s wait = 15s + navigation = exceeds 30s default
 *   - Fix: TC-007 uses test.setTimeout(90_000)
 *   - TC-009: AskIBM in desktop nav goes to external /ask URL; check aria-current on nav link
 *
 * Navigation:
 *   Hash routing — People=#/people, News=#/news, Apps=#/apps, IT Support=#/support, Home=#/
 *   Desktop nav "Main Navigation" has direct links to all tabs.
 */

const BASE_URL = 'https://w3.ibm.com';
const AUTH_STATE = path.join(__dirname, 'auth-state.json');

/** Navigate to a hash route and wait for the document title to stabilise. */
async function gotoHash(page: Page, hash: string, expectedTitle: RegExp | string) {
  await page.evaluate((h) => { window.location.hash = h; }, hash);
  await expect(page).toHaveTitle(expectedTitle, { timeout: 15_000 });
}

// ---------------------------------------------------------------------------
// Suite 1 – Home Page Load
// ---------------------------------------------------------------------------
test.describe('Suite 1: Home Page Load', () => {
  test('TC-001: W3 home page loads and shows AskIBM widget', async ({ browser }) => {
    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Wait for SPA to hydrate and set title
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });

    // URL should be the base
    expect(page.url()).toMatch(/^https:\/\/w3\.ibm\.com/);

    // W3 banner present
    await expect(page.getByRole('banner', { name: 'w3' })).toBeVisible();

    // Desktop navigation bar present (at 1280px viewport the sidebar/hamburger is hidden)
    const mainNav = page.getByRole('navigation', { name: 'Main Navigation' });
    await expect(mainNav).toBeVisible();

    // AskIBM heading visible in main content
    await expect(page.getByRole('heading', { name: 'AskIBM', level: 1 })).toBeVisible();

    await context.close();
  });
});

// ---------------------------------------------------------------------------
// Suite 2 – Individual Tab Navigation (Happy Path)
// ---------------------------------------------------------------------------
test.describe('Suite 2: Individual Tab Navigation', () => {
  test('TC-002: Navigate to People tab', async ({ browser }) => {
    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });

    // Navigate via hash (most reliable cross-browser SPA strategy)
    await gotoHash(page, '#/people', 'People');
    expect(page.url()).toContain('#/people');

    // Wait 3 seconds as per AC1 dwell requirement
    await page.waitForTimeout(3_000);

    // Page should still be on People after dwell
    expect(page.url()).toContain('#/people');
    await expect(page).toHaveTitle('People');

    await context.close();
  });

  test('TC-003: Navigate to News tab', async ({ browser }) => {
    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });

    await gotoHash(page, '#/news', 'News');
    expect(page.url()).toContain('#/news');

    await page.waitForTimeout(3_000);

    expect(page.url()).toContain('#/news');
    await expect(page).toHaveTitle('News');

    await context.close();
  });

  test('TC-004: Navigate to Apps tab', async ({ browser }) => {
    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });

    await gotoHash(page, '#/apps', /Apps/);
    expect(page.url()).toContain('#/apps');

    await page.waitForTimeout(3_000);

    expect(page.url()).toContain('#/apps');
    await expect(page).toHaveTitle(/Apps/);

    await context.close();
  });

  test('TC-005: Navigate to IT Support tab', async ({ browser }) => {
    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });

    await gotoHash(page, '#/support', 'IT Support');
    expect(page.url()).toContain('#/support');

    await page.waitForTimeout(3_000);

    expect(page.url()).toContain('#/support');
    await expect(page).toHaveTitle('IT Support');

    await context.close();
  });

  test('TC-006: Navigate to AskIBM tab', async ({ browser }) => {
    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });

    // Navigate to a different tab first
    await gotoHash(page, '#/news', 'News');

    // Navigate back to AskIBM (home)
    await gotoHash(page, '#/', 'Home');
    expect(page.url()).toMatch(/w3\.ibm\.com/);

    await page.waitForTimeout(3_000);

    // AskIBM widget still visible
    await expect(page.getByRole('heading', { name: 'AskIBM', level: 1 })).toBeVisible();
    await expect(page).toHaveTitle('Home');

    await context.close();
  });
});

// ---------------------------------------------------------------------------
// Suite 3 – End-to-End Sequential Navigation (AC1)
// ---------------------------------------------------------------------------
test.describe('Suite 3: End-to-End Sequential Navigation (AC1)', () => {
  test('TC-007: Complete sequential navigation through all 5 tabs', async ({ browser }) => {
    // This test visits 5 tabs with 3s dwell each → extend timeout
    test.setTimeout(90_000);

    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    // --- Step 1: Load home page ---
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });
    await expect(page.getByRole('banner', { name: 'w3' })).toBeVisible();

    // --- Step 2: People tab ---
    await gotoHash(page, '#/people', 'People');
    expect(page.url()).toContain('#/people');
    await page.waitForTimeout(3_000);

    // --- Step 3: News tab ---
    await gotoHash(page, '#/news', 'News');
    expect(page.url()).toContain('#/news');
    await page.waitForTimeout(3_000);

    // --- Step 4: Apps tab ---
    await gotoHash(page, '#/apps', /Apps/);
    expect(page.url()).toContain('#/apps');
    await page.waitForTimeout(3_000);

    // --- Step 5: IT Support tab ---
    await gotoHash(page, '#/support', 'IT Support');
    expect(page.url()).toContain('#/support');
    await page.waitForTimeout(3_000);

    // --- Step 6: AskIBM (home) ---
    await gotoHash(page, '#/', 'Home');
    expect(page.url()).toMatch(/w3\.ibm\.com/);
    await expect(page.getByRole('heading', { name: 'AskIBM', level: 1 })).toBeVisible();
    await page.waitForTimeout(3_000);

    // Final assertion: still on home after full flow
    await expect(page).toHaveTitle('Home');

    await context.close();
  });
});

// ---------------------------------------------------------------------------
// Suite 4 – Navigation UI Validation
// ---------------------------------------------------------------------------
test.describe('Suite 4: Navigation UI Validation', () => {
  test('TC-008: Desktop Main Navigation shows all 5 tabs', async ({ browser }) => {
    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });

    // At desktop viewport (1280px) the Main Navigation bar is visible
    const mainNav = page.getByRole('navigation', { name: 'Main Navigation' });
    await expect(mainNav).toBeVisible();

    // Verify all 5 navigation links are present in the desktop nav
    await expect(mainNav.getByRole('link', { name: 'People' })).toBeVisible();
    await expect(mainNav.getByRole('link', { name: 'News' })).toBeVisible();
    await expect(mainNav.getByRole('link', { name: 'Apps' })).toBeVisible();
    await expect(mainNav.getByRole('link', { name: 'IT Support' })).toBeVisible();
    await expect(mainNav.getByRole('link', { name: 'AskIBM' })).toBeVisible();

    await context.close();
  });

  test('TC-009: Active state is set on People link after navigation', async ({ browser }) => {
    const context = await browser.newContext({ storageState: AUTH_STATE });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle('Home', { timeout: 15_000 });

    await gotoHash(page, '#/people', 'People');

    // People link in Main Navigation should have active indicator
    const peopleLink = page.getByRole('navigation', { name: 'Main Navigation' })
      .getByRole('link', { name: 'People' });
    await expect(peopleLink).toBeVisible();

    // Carbon Design System sets aria-current="page" or uses active class on the current nav item
    const isActive = await peopleLink.evaluate((el) => {
      return el.getAttribute('aria-current') !== null
        || el.getAttribute('data-active') !== null
        || el.classList.toString().includes('active')
        || el.classList.toString().includes('selected')
        || el.classList.toString().includes('current');
    });
    expect(isActive, 'People link should have active indicator after navigation').toBe(true);

    await context.close();
  });
});
