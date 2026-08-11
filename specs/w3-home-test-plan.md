# Test Plan: SCRUM-101 — NDTV Home Page Navigation

## Overview

| Field             | Value                                         |
|-------------------|-----------------------------------------------|
| **Story**         | SCRUM-101 — NDTV Navigation Process           |
| **Application**   | https://www.ndtv.com/                         |
| **Author**        | QA Automation Agent                           |
| **Date**          | 2026-08-07                                    |
| **Browser Scope** | Firefox (primary per story); Chromium (cross-browser) |

---

## Application Overview

NDTV.com is a public news portal. Navigation tabs are rendered in a top navigation bar (`<nav>` element) with links using CSS class `m-nv_lnk`. No authentication is required.

### Navigation Structure (discovered via exploration)
- **Home**    → `https://www.ndtv.com/` (title contains `NDTV.com`)
- **Latest**  → `https://www.ndtv.com/latest`
- **India**   → `https://www.ndtv.com/india` (title contains `India News`)
- **World**   → `https://www.ndtv.com/world`
- **Videos**  → `https://www.ndtv.com/video`
- **Opinion** → `https://www.ndtv.com/opinion` (title contains `NDTV Opinions`)
- **Cities**  → `https://www.ndtv.com/cities`

### Key Selectors Discovered
| Element           | Selector                                                          |
|-------------------|-------------------------------------------------------------------|
| Nav bar           | `nav` (first `<nav>` element)                                     |
| India nav link    | `a[href*="/india?pfrom=home-ndtv_mainnavigation"]`                |
| Opinion nav link  | `a[href*="/opinion?pfrom=home-ndtv_mainnavigation"]`              |
| All nav links     | `a.m-nv_lnk`                                                      |
| India by text     | `page.getByRole('link', { name: 'India', exact: true }).first()`  |
| Opinion by text   | `page.getByRole('link', { name: 'Opinion', exact: true }).first()`|

---

## Acceptance Criteria Coverage

| AC  | Criterion                                          | Test Cases    |
|-----|----------------------------------------------------|---------------|
| AC1 | NDTV home page loads                               | TC01          |
| AC1 | India tab navigable → India page loads             | TC02          |
| AC1 | Opinion tab navigable → Opinion page loads         | TC03          |
| AC1 | Full flow: Home → India → Opinion                  | TC04          |

---

## Test Scenarios

---

### TC01 — NDTV Home Page Load

**Description:** Verify the NDTV home page loads correctly.

**Preconditions:** No authentication required

**Steps:**

| Step | Action                                     | Expected Result                                           |
|------|--------------------------------------------|-----------------------------------------------------------|
| 1    | Navigate to `https://www.ndtv.com/`        | Page loads with HTTP 200                                  |
| 2    | Wait for page title                        | Title contains `NDTV`                                     |
| 3    | Verify navigation bar is present           | `<nav>` element is visible                                |
| 4    | Verify India nav link is present           | Link with text `India` visible in nav                     |
| 5    | Verify Opinion nav link is present         | Link with text `Opinion` visible in nav                   |

**Expected Outcome:** NDTV home page loads with all nav links present.

---

### TC02 — India Tab Navigation

**Description:** Verify clicking the India tab loads the India news section.

**Steps:**

| Step | Action                                              | Expected Result                                       |
|------|-----------------------------------------------------|-------------------------------------------------------|
| 1    | Navigate to `https://www.ndtv.com/`                 | Home page loads                                       |
| 2    | Click `India` link in navigation                    | Browser navigates to `/india`                         |
| 3    | Wait for page load                                  | Page title contains `India News`                      |
| 4    | Verify URL contains `/india`                        | URL = `https://www.ndtv.com/india`                    |
| 5    | Verify page content relevant to India news          | `<h1>` or heading with India-related content visible  |

**Expected Outcome:** India page loads with title containing `India News`.

---

### TC03 — Opinion Tab Navigation

**Description:** Verify clicking the Opinion tab loads the Opinion section.

**Steps:**

| Step | Action                                              | Expected Result                                       |
|------|-----------------------------------------------------|-------------------------------------------------------|
| 1    | Navigate to `https://www.ndtv.com/`                 | Home page loads                                       |
| 2    | Click `Opinion` link in navigation                  | Browser navigates to `/opinion`                       |
| 3    | Wait for page load                                  | Page title contains `Opinion`                         |
| 4    | Verify URL contains `/opinion`                      | URL = `https://www.ndtv.com/opinion`                  |
| 5    | Verify page content relevant to opinions            | Opinion articles or heading visible                   |

**Expected Outcome:** Opinion page loads with title containing `Opinion` or `NDTV Opinions`.

---

### TC04 — Full AC1 Navigation Flow (Home → India → Opinion)

**Description:** End-to-end test covering all AC1 acceptance criteria in sequence.

**Steps:**

| Step | Action                                              | Expected Result                                       |
|------|-----------------------------------------------------|-------------------------------------------------------|
| 1    | Navigate to `https://www.ndtv.com/`                 | Home page loads, title contains `NDTV`                |
| 2    | Verify nav bar and India/Opinion links visible       | Both links present in nav                             |
| 3    | Click `India` in navigation                         | URL → `/india`, title contains `India News`           |
| 4    | Navigate back to `https://www.ndtv.com/`            | Home page reloads                                     |
| 5    | Click `Opinion` in navigation                       | URL → `/opinion`, title contains `Opinion`            |

**Expected Outcome:** Full sequential AC1 flow works without errors.

---

### TC05 — Navigation Links Attribute Verification

**Description:** Verify the India and Opinion navigation links have correct `href` attributes.

**Steps:**

| Step | Action                                              | Expected Result                                          |
|------|-----------------------------------------------------|----------------------------------------------------------|
| 1    | Navigate to `https://www.ndtv.com/`                 | Home page loads                                          |
| 2    | Inspect India link `href`                           | Contains `/india`                                        |
| 3    | Inspect Opinion link `href`                         | Contains `/opinion`                                      |

---

## Test Environment

| Item        | Value                       |
|-------------|-----------------------------|
| App URL     | https://www.ndtv.com/       |
| Auth        | None (public site)          |
| Browsers    | Firefox (primary), Chromium |
| Framework   | Playwright + TypeScript     |
| Timeout     | 120000 ms per test          |

---

## Known Observations (from Exploratory Testing)

1. **Navigation uses `m-nv_lnk` CSS class** — all primary nav links share this class.
2. **No auth required** — NDTV is a public news portal, no cookies/session needed.
3. **India and Opinion links use `pfrom` query param** — `?pfrom=home-ndtv_mainnavigation` on nav links.
4. **Page title is reliable** — India page: contains `India News`; Opinion page: contains `Opinion`.
5. **30 console errors on home page** — mostly ad-related (Google DFP, DoubleClick), not blocking.
6. **Direct URL navigation is reliable** — `page.goto('https://www.ndtv.com/india')` works without the `pfrom` param.
7. **Use `waitUntil: 'commit'` for sub-pages** — NDTV home page is ad-heavy and takes 40-50s with domcontentloaded.
