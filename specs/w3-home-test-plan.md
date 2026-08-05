# Test Plan: SCRUM-101 — W3 Home Page Navigation

**Story:** SCRUM-101 — W3 Navigation Process  
**Application URL:** https://w3.ibm.com/  
**Prepared by:** QA Automation Agent  
**Date:** 2025-07-14  
**Version:** 1.0

---

## 1. Scope

This test plan covers the end-to-end navigation of the IBM W3 home page including:
- Page load and authentication redirect
- Tab navigation (People, News, Apps, IT Support, Ask IBM)
- Active state validation for navigation tabs
- Console error checks during navigation

---

## 2. Test Environment

| Field         | Value                          |
|---------------|--------------------------------|
| Application   | https://w3.ibm.com/            |
| Username      | rajith.pv@in.ibm.com           |
| Password      | pws                            |
| Browsers      | Chrome, Firefox, Safari        |
| Test Tool     | Playwright                     |
| Network       | IBM Corporate Network required |

---

## 3. Test Scenarios

### TC-001: Home Page Loads Successfully

**Priority:** Critical  
**Type:** Functional — Happy Path  
**Acceptance Criteria:** AC1 (pre-condition)

**Steps:**

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to https://w3.ibm.com/ | Page begins loading |
| 2 | Observe the page title | Title contains "w3" or "IBM" |
| 3 | Wait for DOM content to load | Page is fully loaded with no spinner |
| 4 | Verify the top navigation bar is visible | Navigation bar with tabs is visible |
| 5 | Take screenshot | Screenshot captured as `tc001-home-loaded.png` |

**Test Data:** None  
**Pass Criteria:** Home page loads within 10 seconds; navigation tabs are visible.

---

### TC-002: Unauthenticated User Redirected to Login

**Priority:** High  
**Type:** Functional — Negative / Security  
**Acceptance Criteria:** AC1 (pre-condition — must be logged in)

**Steps:**

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open a fresh browser (no existing session) | New browser session started |
| 2 | Navigate to https://w3.ibm.com/ | Page loads or redirect occurs |
| 3 | Observe URL after navigation | URL should redirect to IBM login/SSO page |
| 4 | Verify login form is present | Username/password fields or SSO prompt visible |

**Test Data:** None (unauthenticated)  
**Pass Criteria:** Unauthenticated users are redirected to a login page; w3 content is NOT accessible.

---

### TC-003: Navigate to People Tab

**Priority:** Critical  
**Type:** Functional — Happy Path  
**Acceptance Criteria:** AC1 step 3

**Pre-condition:** User is logged in to w3 home page.

**Steps:**

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Verify home page is loaded with navigation tabs visible | Navigation tabs present |
| 2 | Locate the "People" tab in the navigation bar | "People" tab is visible and clickable |
| 3 | Click on the "People" tab | Tab registers the click |
| 4 | Wait for page/section to load | People section content is displayed |
| 5 | Verify the "People" tab is now in active/selected state | Active indicator (underline, highlight, bold) on People tab |
| 6 | Verify the page content is relevant to "People" | Section heading or content references "People" |
| 7 | Take screenshot | Screenshot captured as `tc002-people-tab.png` |

**Test Data:** None  
**Pass Criteria:** People tab is clicked; relevant content loads; tab shows active state.

---

### TC-004: Navigate to News Tab

**Priority:** Critical  
**Type:** Functional — Happy Path  
**Acceptance Criteria:** AC1 step 4

**Pre-condition:** User is logged in to w3 home page.

**Steps:**

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Verify home page is loaded with navigation tabs visible | Navigation tabs present |
| 2 | Locate the "News" tab in the navigation bar | "News" tab is visible and clickable |
| 3 | Click on the "News" tab | Tab registers the click |
| 4 | Wait for page/section to load | News section content is displayed |
| 5 | Verify the "News" tab is now in active/selected state | Active indicator on News tab |
| 6 | Verify the page content is relevant to "News" | Section heading or content references "News" or news articles |
| 7 | Take screenshot | Screenshot captured as `tc003-news-tab.png` |

**Test Data:** None  
**Pass Criteria:** News tab is clicked; relevant content loads; tab shows active state.

---

### TC-005: Full AC1 Flow — Home → People → News (Sequential)

**Priority:** Critical  
**Type:** End-to-End — Happy Path  
**Acceptance Criteria:** AC1 (complete flow)

**Pre-condition:** User is logged in to w3 home page.

**Steps:**

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Navigate to https://w3.ibm.com/ | Home page loads |
| 2 | Confirm home page is the active/default view | Home/default content is displayed |
| 3 | Click on the "People" tab | People content loads; People tab is active |
| 4 | Click on the "News" tab | News content loads; News tab is active |
| 5 | Verify People tab is no longer active | People tab returns to inactive state |
| 6 | Verify News tab is active | News tab has active indicator |
| 7 | Take screenshot of final state | Screenshot captured |

**Test Data:** None  
**Pass Criteria:** Complete navigation sequence executes without error; correct active states maintained.

---

### TC-006: Tab Active State Persistence

**Priority:** Medium  
**Type:** Functional — UI Validation

**Pre-condition:** User is on w3 home page.

**Steps:**

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Click on each available tab in sequence | Each tab loads without error |
| 2 | For each tab, verify the active state indicator updates | Only the currently-selected tab shows active state |
| 3 | Verify no two tabs are simultaneously active | Only one tab active at any time |

**Test Data:** All available navigation tabs  
**Pass Criteria:** Active state is exclusive to selected tab; no double-active states.

---

### TC-007: No Console Errors on Navigation

**Priority:** Medium  
**Type:** Non-Functional — Quality

**Pre-condition:** User is on w3 home page.

**Steps:**

| # | Action | Expected Result |
|---|--------|----------------|
| 1 | Open browser with console monitoring enabled | Console listener attached |
| 2 | Navigate to https://w3.ibm.com/ | Home page loads |
| 3 | Click People tab | People content loads |
| 4 | Click News tab | News content loads |
| 5 | Collect all console errors | Zero critical console errors (type: error) during navigation |

**Pass Criteria:** No JavaScript `console.error` messages fired during tab navigation.

---

## 4. Out of Scope

- IBM W3 authentication flow (login form submission — requires SSO/SAML which cannot be automated)
- Write operations (commenting, editing profiles)
- Mobile viewport testing (deferred to future sprint)
- Performance benchmarking

---

## 5. Risks

| Risk | Impact | Mitigation |
|------|--------|----------|
| IBM SSO / w3 requires corporate network | High | Tests must run on IBM-connected machine |
| Tab selectors may change with W3 updates | Medium | Use role-based and text-based locators |
| Session expiry mid-test | Low | Use `storageState` to persist authenticated session |

---

## 6. Traceability Matrix

| Test Case | Acceptance Criteria | Type |
|-----------|--------------------|----||
| TC-001 | AC1 (pre-condition) | Functional |
| TC-002 | AC1 (security/auth gate) | Negative |
| TC-003 | AC1 — People Tab | Functional |
| TC-004 | AC1 — News Tab | Functional |
| TC-005 | AC1 — Full flow | E2E |
| TC-006 | AC1 — UI state | UI Validation |
| TC-007 | Business Rule 2 | Non-Functional |