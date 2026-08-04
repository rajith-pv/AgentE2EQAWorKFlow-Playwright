# Test Plan: SCRUM-101 – W3 Home Page Navigation

**Version:** 1.0  
**Date:** 2026-08-04  
**Author:** QA Agent (Bob)  
**Application:** W3 IBM Internal Portal  
**URL:** https://w3.ibm.com/  
**Test Credentials:** `rajith.pv@in.ibm.com` / `pws`

---

## 1. Overview

This test plan covers the navigation flow across the W3 IBM internal home page as defined in user story SCRUM-101. An IBM employee, once authenticated, should be able to click through all five primary navigation tabs — People, News, Apps, IT Support, and AskIBM — and verify that each page loads correctly.

---

## 2. Application Exploration Findings

From browser exploration the following key facts were discovered:

| Finding | Detail |
|---------|--------|
| Authentication | SSO via `login.w3.ibm.com` (FIDO2/w3id) — browser session already authenticated |
| Navigation Type | Sidebar menu toggled by **"Open menu"** button (`button[aria-label="Open menu"]`) |
| Hash Routing | SPA using `#/people`, `#/news`, `#/apps`, `#/support`, `#/` for AskIBM (home) |
| Page Titles | People, News, Apps - Recommended, IT Support, Home |
| AskIBM | Lives on the default Home page (`#/`) as the primary widget |
| Console Warnings | 52–134 warnings (non-blocking); 3 console errors (non-critical, third-party auth) |
| Mobile Nav | Navigation labels exposed via `navigation[aria-label="Mobile Navigation"]` |

---

## 3. Test Scope

### In Scope
- Navigation to all five tabs: People, News, Apps, IT Support, AskIBM
- Page title verification after navigation
- URL hash change verification
- Visible content loaded confirmation
- Home page load verification

### Out of Scope
- Login / authentication testing
- Content accuracy within each tab
- Performance / load time benchmarking

---

## 4. Test Suites and Test Cases

---

### Suite 1: Home Page Load

#### TC-001: Verify W3 Home Page Loads Successfully

**Priority:** Critical  
**Type:** Smoke / Happy Path

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://w3.ibm.com/` | Page loads without errors |
| 2 | Verify page URL | URL contains `https://w3.ibm.com` |
| 3 | Verify page title | Title is "Home" |
| 4 | Verify W3 logo / banner is visible | `banner[aria-label="w3"]` is present |
| 5 | Verify Open menu button is visible | `button[aria-label="Open menu"]` is visible |
| 6 | Verify AskIBM widget is on page | Heading "AskIBM" visible in main content |

---

### Suite 2: Tab Navigation – Happy Path

#### TC-002: Navigate to People Tab

**Priority:** High  
**Type:** Happy Path  
**AC:** AC1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://w3.ibm.com/` | Home page loads |
| 2 | Click **"Open menu"** button | Navigation sidebar opens |
| 3 | Click **"People"** link in sidebar | Page navigates to `#/people` |
| 4 | Verify URL hash | URL hash is `#/people` |
| 5 | Verify page title | Title is "People" |
| 6 | Verify main content loaded | People page content is visible |
| 7 | Wait 3 seconds | Page remains stable |

---

#### TC-003: Navigate to News Tab

**Priority:** High  
**Type:** Happy Path  
**AC:** AC1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start from Home page | Home page loaded |
| 2 | Click **"Open menu"** button | Sidebar opens |
| 3 | Click **"News"** link in sidebar | Navigates to `#/news` |
| 4 | Verify URL hash | URL hash is `#/news` |
| 5 | Verify page title | Title is "News" |
| 6 | Verify news articles are visible | News content is present |
| 7 | Wait 3 seconds | Page remains stable |

---

#### TC-004: Navigate to Apps Tab

**Priority:** High  
**Type:** Happy Path  
**AC:** AC1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start from Home page | Home page loaded |
| 2 | Click **"Open menu"** button | Sidebar opens |
| 3 | Click **"Apps"** button in sidebar | Navigates to `#/apps` |
| 4 | Verify URL hash | URL hash is `#/apps` |
| 5 | Verify page title | Title contains "Apps" |
| 6 | Verify apps content loaded | Apps page content visible |
| 7 | Wait 3 seconds | Page remains stable |

---

#### TC-005: Navigate to IT Support Tab

**Priority:** High  
**Type:** Happy Path  
**AC:** AC1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start from Home page | Home page loaded |
| 2 | Click **"Open menu"** button | Sidebar opens |
| 3 | Click **"IT Support"** link in sidebar | Navigates to `#/support` |
| 4 | Verify URL hash | URL hash is `#/support` |
| 5 | Verify page title | Title is "IT Support" |
| 6 | Verify IT support content loaded | IT Support page content visible |
| 7 | Wait 3 seconds | Page remains stable |

---

#### TC-006: Navigate to AskIBM Tab

**Priority:** High  
**Type:** Happy Path  
**AC:** AC1

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start from any tab page | Different tab page loaded |
| 2 | Click **"Open menu"** button | Sidebar opens |
| 3 | Click **"AskIBM"** button in sidebar | Navigates back to `#/` |
| 4 | Verify URL | URL is `https://w3.ibm.com/#/` or `https://w3.ibm.com/` |
| 5 | Verify page title | Title is "Home" |
| 6 | Verify AskIBM widget visible | Heading "AskIBM" is visible |
| 7 | Wait 3 seconds | Page remains stable |

---

### Suite 3: Full Sequential Navigation Flow

#### TC-007: Complete Sequential Tab Navigation (AC1 End-to-End)

**Priority:** Critical  
**Type:** End-to-End / Happy Path  
**AC:** AC1 (full)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://w3.ibm.com/` | Home page loads, title "Home" |
| 2 | Navigate to People tab (via hash `#/people`) | Title "People", URL `#/people` |
| 3 | Wait 3 seconds | Page stable |
| 4 | Navigate to News tab (via hash `#/news`) | Title "News", URL `#/news` |
| 5 | Wait 3 seconds | Page stable |
| 6 | Navigate to Apps tab (via hash `#/apps`) | Title contains "Apps", URL `#/apps` |
| 7 | Wait 3 seconds | Page stable |
| 8 | Navigate to IT Support tab (via hash `#/support`) | Title "IT Support", URL `#/support` |
| 9 | Wait 3 seconds | Page stable |
| 10 | Navigate to AskIBM (via hash `#/`) | Title "Home", AskIBM widget visible |
| 11 | Wait 3 seconds | Page stable |

---

### Suite 4: Navigation UI Validation

#### TC-008: Verify Navigation Menu Opens and Closes

**Priority:** Medium  
**Type:** UI Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to home page | Home page loads |
| 2 | Verify "Open menu" button visible | Button is clickable |
| 3 | Click "Open menu" | Navigation sidebar becomes visible |
| 4 | Verify all 5 navigation items present | People, News, Apps, IT Support, AskIBM visible |
| 5 | Click "Open menu" again to close | Sidebar closes / collapses |

---

#### TC-009: Verify Home Navigation Item Active State

**Priority:** Low  
**Type:** UI Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `#/people` | People tab active |
| 2 | Open menu | Navigation sidebar opens |
| 3 | Verify "People" link has active indicator | `[active]` attribute present on People link |

---

## 5. Test Data

| Parameter | Value |
|-----------|-------|
| Application URL | `https://w3.ibm.com/` |
| People URL | `https://w3.ibm.com/#/people` |
| News URL | `https://w3.ibm.com/#/news` |
| Apps URL | `https://w3.ibm.com/#/apps` |
| IT Support URL | `https://w3.ibm.com/#/support` |
| AskIBM URL | `https://w3.ibm.com/#/` |
| Username | `rajith.pv@in.ibm.com` |
| Password | `pws` |

---

## 6. Element Locator Reference

Discovered during exploratory testing:

| Element | Selector Strategy |
|---------|------------------|
| Open Menu Button | `page.getByRole('button', { name: 'Open menu' })` |
| People Link | `page.getByRole('link', { name: 'People' })` |
| News Link | `page.getByRole('link', { name: 'News' })` |
| Apps Button | `page.getByRole('button', { name: 'Apps' })` |
| IT Support Link | `page.getByRole('link', { name: 'IT Support' })` |
| AskIBM Button (sidebar) | `navigation[aria-label="Mobile Navigation"] >> button:has-text("AskIBM")` |
| AskIBM Widget Heading | `page.getByRole('heading', { name: 'AskIBM', level: 1 })` |
| Main Banner | `page.getByRole('banner', { name: 'w3' })` |

**Note:** Navigation is a hash-based SPA. For automation, `page.evaluate(() => window.location.hash = '#/route')` or `page.goto('https://w3.ibm.com/#/route')` are the most reliable navigation strategies.

---

## 7. Pass/Fail Criteria

| Criteria | Definition |
|----------|------------|
| PASS | All assertions met; URL, title, and key content visible |
| FAIL | Any assertion fails; page does not load; element not found |
| BLOCKED | Authentication session expired; network error |

---

## 8. Test Environment

| Component | Detail |
|-----------|--------|
| Browser | Chromium (primary), Firefox |
| Playwright version | 1.62.1 |
| OS | Windows 10 |
| Base URL | `https://w3.ibm.com/` |
| Auth Method | Pre-authenticated session (browser state) |
