# Exploratory Testing Report — SCRUM-101 NDTV Navigation

**Tester:** QA Automation Agent
**Date:** 2026-08-07
**Application:** https://www.ndtv.com/
**Browser:** Chromium (via Playwright MCP)
**Auth Required:** None

---

## Summary

| Item                     | Result              |
|--------------------------|---------------------|
| Test Scenarios Executed  | 5                   |
| Passed                   | 5                   |
| Failed / Blocked         | 0                   |
| Issues Discovered        | 2 (Observations)    |
| Screenshots Captured     | 4                   |

---

## Test Execution Results

### TC01 — NDTV Home Page Load
**Status: ✅ PASS**

- Navigated to `https://www.ndtv.com/`
- Page loaded successfully, no authentication required
- Title: `Get Latest News, India News, Breaking News, Today's News - NDTV.com`
- `<nav>` element present with all navigation links
- India link visible: `a[href*="/india?pfrom=home-ndtv_mainnavigation"]`
- Opinion link visible: `a[href*="/opinion?pfrom=home-ndtv_mainnavigation"]`
- Nav links use CSS class `m-nv_lnk m-nv_act`
- **Screenshot:** `screenshots/ndtv-home-page.png`

---

### TC02 — India Tab Navigation
**Status: ✅ PASS**

- Clicked India nav link from home page
- URL navigated to `https://www.ndtv.com/india`
- Page title: `India News | Today's latest updates and breaking news from India, Live India News - NDTV.com`
- India news articles loaded correctly
- **Screenshot:** `screenshots/ndtv-india-tab.png`

---

### TC03 — Opinion Tab Navigation
**Status: ✅ PASS**

- Clicked Opinion nav link from home page
- URL navigated to `https://www.ndtv.com/opinion`
- Page title: `NDTV Opinions: Opinion Article & Analysis by Experts – NDTV.com`
- Opinion articles loaded correctly
- **Screenshot:** `screenshots/ndtv-opinion-tab.png`

---

### TC04 — Full AC1 Navigation Flow (Home → India → Opinion)
**Status: ✅ PASS**

Sequential navigation:
1. `https://www.ndtv.com/` → title contains `NDTV.com` ✅
2. Click `India` → `https://www.ndtv.com/india` → title contains `India News` ✅
3. Navigate home → `https://www.ndtv.com/` ✅
4. Click `Opinion` → `https://www.ndtv.com/opinion` → title contains `Opinion` ✅

---

### TC05 — Nav Link Attribute Verification
**Status: ✅ PASS**

- India link `href`: `https://www.ndtv.com/india?pfrom=home-ndtv_mainnavigation` ✅
- Opinion link `href`: `https://www.ndtv.com/opinion?pfrom=home-ndtv_mainnavigation` ✅
- Both links have CSS class `m-nv_lnk m-nv_act`
- **Screenshot:** `screenshots/ndtv-home-nav.png`

---

## Issues / Observations Discovered

### OBS-001 — High Console Error Count on Home Page
**Severity:** Low (Non-blocking)

- **Description:** NDTV home page generates ~30+ console errors on load, mostly from Google DFP, DoubleClick, and other ad networks.
- **Impact on Automation:** Tests checking for zero console errors would fail — filter to exclude ad-network errors.
- **Evidence:** 30 errors, 10 warnings on initial load

### OBS-002 — `pfrom` Query Parameter on Nav Links
**Severity:** Informational

- **Description:** Navigation links include a tracking query param `?pfrom=home-ndtv_mainnavigation`. When navigating directly (e.g., `page.goto('https://www.ndtv.com/india')`), the param is omitted but the page still loads correctly.
- **Impact on Automation:** Use `toContain('/india')` for URL assertions rather than exact URL matching.

---

## Observed UI Elements & Selectors

| Element                  | Selector Strategy                                                 |
|--------------------------|-------------------------------------------------------------------|
| Navigation bar           | `page.locator('nav').first()`                                     |
| India nav link (exact)   | `page.locator('a.m-nv_lnk[href*="/india"]').first()`             |
| Opinion nav link (exact) | `page.locator('a.m-nv_lnk[href*="/opinion"]').first()`           |
| India by role            | `page.getByRole('link', { name: 'India', exact: true }).first()`  |
| Opinion by role          | `page.getByRole('link', { name: 'Opinion', exact: true }).first()`|

---

## Screenshots

| File                              | Description                         |
|-----------------------------------|-------------------------------------|
| `screenshots/ndtv-home-page.png`  | NDTV home page initial load         |
| `screenshots/ndtv-home-nav.png`   | Navigation bar close-up             |
| `screenshots/ndtv-india-tab.png`  | India tab page                      |
| `screenshots/ndtv-opinion-tab.png`| Opinion tab page                    |

---

## Recommendations for Automation

1. **Use `page.locator('a.m-nv_lnk[href*="/india"]').first()`** for reliable India link selection.
2. **Use `page.locator('a.m-nv_lnk[href*="/opinion"]').first()`** for reliable Opinion link selection.
3. **Wait for `domcontentloaded`** — NDTV loads quickly but ad scripts can cause timing issues.
4. **Use `toContain` for URL assertions** — nav links add `?pfrom=...` tracking params.
5. **Filter console errors** — ad-network errors should be excluded from console-error assertions.
6. **Use `waitUntil: 'commit'` for sub-page navigation** — reduces wait from 40-50s to <10s.
