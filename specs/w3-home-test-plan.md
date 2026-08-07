# Test Plan: SCRUM-101 — W3 IBM Home Page Navigation

## Overview

| Field             | Value                                    |
|-------------------|------------------------------------------|
| **Story**         | SCRUM-101 — W3 Navigation Process        |
| **Application**   | https://w3.ibm.com/                      |
| **Author**        | QA Automation Agent                      |
| **Date**          | 2026-08-07                               |
| **Browser Scope** | Chrome (Chromium), Firefox, Safari (WebKit) |

---

## Application Overview

W3 is IBM's internal employee portal (intranet). It is a Single Page Application (SPA) using hash-based routing (`#/` for home, `#/people`, `#/news`, etc.). Authentication is handled via IBM w3id SSO (IBM Verify), with an `access_token` stored in browser cookies.

### Navigation Structure (discovered via exploration)
- **Home** → `https://w3.ibm.com/` (title: `Home`)
- **People** → `https://w3.ibm.com/#/people` (title: `People`)
- **News** → `https://w3.ibm.com/#/news` (title: `News`)
- **IT Support** → `https://w3.ibm.com/#/support`
- **AskIBM** → accessible from the left sidebar

---

## Test Credentials

| Field    | Value                      |
|----------|----------------------------|
| Username | rajith.pv@in.ibm.com       |
| Password | pws                        |

> Authentication uses IBM w3id SSO. Tests rely on a saved `storageState` (cookies + localStorage) to bypass interactive login.

---

## Acceptance Criteria Coverage

| AC  | Criterion                                             | Test Cases   |
|-----|-------------------------------------------------------|-------------|
| AC1 | Home page loads for a logged-in user                  | TC01, TC02   |
| AC1 | Click People tab → People page loads                  | TC03         |
| AC1 | Click News tab → News page loads                      | TC04         |
| AC1 | Full navigation flow (Home → People → News)           | TC05         |

---

## Test Scenarios

---

### TC01 — Home Page Load

**Description:** Verify that navigating to the W3 home page loads correctly for an authenticated user.

**Test Data:** Saved auth state (w3-auth-state.json)

**Preconditions:** User is authenticated (auth state loaded)

**Steps:**

| Step | Action                                       | Expected Result                                         |
|------|----------------------------------------------|---------------------------------------------------------|
| 1    | Navigate to `https://w3.ibm.com/`            | Page loads without redirecting to login                 |
| 2    | Wait for page title                          | Document title changes to `Home`                        |
| 3    | Verify banner/header is present              | `<banner>` element with role `banner` and label `w3` is visible |
| 4    | Verify navigation links are present          | Links for `Home`, `People`, `News`, `IT Support` are visible in `navigation "Mobile Navigation"` |
| 5    | Verify main content area loads               | `<main>` element is visible and contains AskIBM widget  |
| 6    | Verify profile picture is visible            | `button "Profile"` with `Rajith Venkata Profile Image` is visible |

**Expected Outcome:** Home page fully loads, nav links visible, user is authenticated.

---

### TC02 — Unauthenticated Redirect Check

**Description:** Verify that when no valid auth state exists, the user is redirected to the IBM w3id login page.

**Test Data:** No auth state / cleared cookies

**Preconditions:** User is NOT authenticated

**Steps:**

| Step | Action                                         | Expected Result                                              |
|------|------------------------------------------------|--------------------------------------------------------------|
| 1    | Clear all cookies and navigate to `https://w3.ibm.com/` | Browser redirects to `login.w3.ibm.com`              |
| 2    | Verify login page title                        | Page title contains `w3id`                                   |
| 3    | Verify login prompt is shown                   | Passkey or sign-in option is visible on the page             |

**Expected Outcome:** Unauthenticated user is redirected to IBM login page.

---

### TC03 — People Tab Navigation

**Description:** Verify that clicking the People navigation tab loads the People page.

**Test Data:** Saved auth state

**Preconditions:** Home page is loaded and authenticated

**Steps:**

| Step | Action                                                      | Expected Result                                           |
|------|-------------------------------------------------------------|-----------------------------------------------------------|
| 1    | Navigate to `https://w3.ibm.com/`                           | Home page loads (title: `Home`)                           |
| 2    | Wait for navigation to be visible                           | `navigation "Mobile Navigation"` is present               |
| 3    | Click `link "People"` in the navigation                     | URL changes to `https://w3.ibm.com/#/people`              |
| 4    | Wait for page title                                         | Document title changes to `People`                        |
| 5    | Verify People page content is loaded                        | Page contains People-specific content (search, profiles)  |

**Expected Outcome:** People tab is navigable and page title changes to `People`.

---

### TC04 — News Tab Navigation

**Description:** Verify that clicking the News navigation tab loads the News page.

**Test Data:** Saved auth state

**Preconditions:** Home page is loaded and authenticated

**Steps:**

| Step | Action                                                      | Expected Result                                           |
|------|-------------------------------------------------------------|-----------------------------------------------------------|
| 1    | Navigate to `https://w3.ibm.com/`                           | Home page loads (title: `Home`)                           |
| 2    | Wait for navigation to be visible                           | `navigation "Mobile Navigation"` is present               |
| 3    | Click `link "News"` in the navigation                       | URL changes to `https://w3.ibm.com/#/news`                |
| 4    | Wait for page title                                         | Document title changes to `News`                          |
| 5    | Verify News page content is loaded                          | Page contains news articles                               |

**Expected Outcome:** News tab is navigable and page title changes to `News`.

---

### TC05 — Full AC1 Navigation Flow (Home → People → News)

**Description:** End-to-end test covering all steps in Acceptance Criteria AC1.

**Test Data:** Saved auth state

**Preconditions:** Valid authenticated session

**Steps:**

| Step | Action                                                       | Expected Result                                           |
|------|--------------------------------------------------------------|-----------------------------------------------------------|
| 1    | Navigate to `https://w3.ibm.com/`                            | Home page loads (title: `Home`)                           |
| 2    | Verify user is authenticated                                 | Profile button visible with user avatar                   |
| 3    | Click `link "People"` in the navigation                      | URL → `#/people`, title → `People`                        |
| 4    | Navigate back to home (`https://w3.ibm.com/`)                | Title → `Home`                                            |
| 5    | Click `link "News"` in the navigation                        | URL → `#/news`, title → `News`                            |
| 6    | Verify page content shows news articles                      | Articles list with headings is visible                    |

**Expected Outcome:** All AC1 acceptance criteria are satisfied in a sequential flow.

---

### TC06 — Active Navigation State Verification

**Description:** Verify that the active/selected state is correctly reflected in the navigation when switching tabs.

**Test Data:** Saved auth state

**Steps:**

| Step | Action                                                | Expected Result                                           |
|------|-------------------------------------------------------|-----------------------------------------------------------|
| 1    | Navigate to `https://w3.ibm.com/#/people`             | People page loads                                         |
| 2    | Inspect navigation link `People`                      | People link has active/selected styling (aria-current)    |
| 3    | Click `link "News"` in navigation                     | News page loads                                           |
| 4    | Inspect navigation link `News`                        | News link has active/selected styling                     |

---

### TC07 — No Console Errors on Home Page

**Description:** Verify that navigating to the home page does not produce critical JavaScript console errors.

**Steps:**

| Step | Action                                                | Expected Result                                           |
|------|-------------------------------------------------------|-----------------------------------------------------------|
| 1    | Navigate to `https://w3.ibm.com/`                     | Home page loads                                           |
| 2    | Collect console error messages                        | Zero `error`-level console messages related to app logic  |

---

## Test Environment

| Item        | Value                                      |
|-------------|-----------------------------------------|
| App URL     | https://w3.ibm.com/                        |
| Auth Method | Saved storageState (cookies + localStorage)|
| Auth File   | `.playwright-mcp/w3-auth-state.json`       |
| Browsers    | Chromium, Firefox, WebKit                  |
| Framework   | Playwright + TypeScript                    |
| Timeout     | 60000 ms per test                          |

---

## Known Observations (from Exploratory Testing)

1. **Navigation uses hash routing** — tabs use `#/people`, `#/news`, `#/support` paths. Direct URL navigation works.
2. **Nav links are inside `navigation "Mobile Navigation"`** — the sidebar nav is always present but some links may be blocked by an overlay (AskIBM chat widget covers the viewport at default size).
3. **Direct URL navigation is reliable** — using `page.goto('https://w3.ibm.com/#/people')` is the most robust navigation strategy.
4. **Page title is the best indicator of route** — title changes reliably: `Home`, `People`, `News`.
5. **Auth token expiry** — the `access_token` cookie has an expiry; the global-setup.ts refreshes it before each test run.
6. **Load overlay** — W3 shows a `.cds--loading-overlay` during initial load; tests should wait for it to disappear.
