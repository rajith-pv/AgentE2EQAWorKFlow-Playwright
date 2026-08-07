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

### TC02 — India Tab Navigation
**Status: ✅ PASS**

- Clicked India nav link from home page
- URL navigated to `https://www.ndtv.com/india`
- Page title: `India News | Today's latest updates and breaking news from India, Live India News - NDTV.com`
- India news articles loaded correctly
- **Screenshot:** `screenshots/ndtv-india-tab.png`

### TC03 — Opinion Tab Navigation
**Status: ✅ PASS**

- Clicked Opinion nav link from home page
- URL navigated to `https://www.ndtv.com/opinion`
- Page title: `NDTV Opinions: Opinion Article & Analysis by Experts – NDTV.com`
- Opinion articles loaded correctly
- **Screenshot:** `screenshots/ndtv-opinion-tab.png`

### TC04 — Full AC1 Navigation Flow (Home → India → Opinion)
**Status: ✅ PASS**

Sequential navigation:
1. `https://www.ndtv.com/` → title contains `NDTV.com` ✅
2. Click `India` → `https://www.ndtv.com/india` → title contains `India News` ✅
3. Navigate home → `https://www.ndtv.com/` ✅
4. Click `Opinion` → `https://www.ndtv.com/opinion` → title contains `Opinion` ✅

### TC05 — Nav Link Attribute Verification
**Status: ✅ PASS**

- India link `href`: `https://www.ndtv.com/india?pfrom=home-ndtv_mainnavigation` ✅
- Opinion link `href`: `https://www.ndtv.com/opinion?pfrom=home-ndtv_mainnavigation` ✅
- **Screenshot:** `screenshots/ndtv-home-nav.png`

---

## Issues / Observations

### OBS-001 — High Console Error Count on Home Page
- **Severity:** Low (Non-blocking)
- ~30+ console errors from ad networks (Google DFP, DoubleClick, Akamai)
- **Impact:** Filter ad-network errors in console-error assertions

### OBS-002 — `pfrom` Query Parameter on Nav Links
- **Severity:** Informational
- Nav links include tracking param `?pfrom=home-ndtv_mainnavigation`
- **Impact:** Use `toContain('/india')` not exact URL matching

---

## Recommendations for Automation

1. Use `page.locator('a.m-nv_lnk[href*="/india"]').first()` for India link
2. Use `page.locator('a.m-nv_lnk[href*="/opinion"]').first()` for Opinion link
3. Use `waitUntil: 'domcontentloaded'` — avoid waiting for all ad scripts
4. Use `toContain` for URL assertions (not exact match)
