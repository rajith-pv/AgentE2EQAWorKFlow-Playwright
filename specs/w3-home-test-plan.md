# W3 IBM Home Page Navigation Test Plan — SCRUM-101

## Application Overview

Test plan for SCRUM-101: W3 IBM Home Page Tab Navigation. The application under test is the IBM internal W3 intranet home page (https://w3.ibm.com/). An authenticated IBM employee navigates through the People and News tabs. Tests cover: happy-path tab navigation, home page load verification, unauthenticated redirect, and negative/edge cases. Auth is managed via saved storage state (.playwright-mcp/w3-auth-state.json). Application uses IBM Carbon Design System (React SPA).

## Test Scenarios

### 1. Suite 1 — Home Page Load

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC01 - Verify W3 home page loads for authenticated user

**File:** `tests/w3-test_script/tc01-homepage-load.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with saved auth state (.playwright-mcp/w3-auth-state.json)
    - expect: Page loads without redirecting to login
    - expect: Page title contains 'w3' or 'IBM'
    - expect: Main navigation bar is visible
  2. Verify the navigation bar contains People and News tabs
    - expect: 'People' tab is visible in the navigation bar
    - expect: 'News' tab is visible in the navigation bar

#### 1.2. TC02 - Verify unauthenticated access redirects to IBM login page

**File:** `tests/w3-test_script/tc02-unauthenticated-redirect.spec.ts`

**Steps:**
  1. Open a fresh browser context with no cookies or auth state and navigate to https://w3.ibm.com/
    - expect: Browser is redirected away from w3.ibm.com
    - expect: URL contains 'login.w3.ibm.com' or similar IBM SSO domain
  2. Inspect the redirected page for login form elements
    - expect: A username or email input field is visible
    - expect: Page is clearly an IBM login/authentication page

### 2. Suite 2 — Tab Navigation (AC1)

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC03 - Navigate to People tab and verify content loads

**File:** `tests/w3-test_script/tc03-people-tab.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with auth state restored
    - expect: Home page loads and navigation tabs are visible
  2. Click on the 'People' tab in the navigation bar
    - expect: People tab becomes active/selected
    - expect: Page content updates to show People section
  3. Wait for People tab content to fully load (domcontentloaded)
    - expect: People-related content is visible (directory, search, org chart)
    - expect: No error messages displayed

#### 2.2. TC04 - Navigate to News tab and verify content loads

**File:** `tests/w3-test_script/tc04-news-tab.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with auth state restored
    - expect: Home page loads and navigation tabs are visible
  2. Click on the 'News' tab in the navigation bar
    - expect: News tab becomes active/selected
    - expect: Page content updates to show News section
  3. Wait for News tab content to fully load (domcontentloaded)
    - expect: News articles or headlines are visible
    - expect: No error messages displayed

#### 2.3. TC05 - Full AC1 flow: home page → People tab → News tab

**File:** `tests/w3-test_script/tc05-full-ac1-flow.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with auth state and verify home page is loaded
    - expect: Home page title matches /w3|ibm/i
    - expect: Both People and News tabs are visible
  2. Click on the People tab
    - expect: People tab activates and content loads
  3. Click on the News tab
    - expect: News tab activates and content loads
  4. Verify page URL still contains w3.ibm.com after all navigation
    - expect: User remains on the W3 IBM domain throughout navigation

### 3. Suite 3 — Edge Cases & Negative Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC06 - Verify active tab state changes visually on click

**File:** `tests/w3-test_script/tc06-tab-active-state.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with auth state
    - expect: Home page loads
  2. Note the default active tab aria-selected state before clicking People
    - expect: People tab has aria-selected='false' or is not active initially
  3. Click People tab and check aria-selected attribute
    - expect: People tab now has aria-selected='true' or equivalent active class
  4. Click News tab and check aria-selected attribute
    - expect: News tab now has aria-selected='true'
    - expect: People tab reverts to inactive state

#### 3.2. TC07 - Verify no critical console errors during navigation

**File:** `tests/w3-test_script/tc07-page-console-errors.spec.ts`

**Steps:**
  1. Set up console error listener and navigate to https://w3.ibm.com/ with auth state
    - expect: Page loads without throwing critical JavaScript errors
  2. Click People tab and capture any console errors
    - expect: No critical errors (excluding known analytics/tracking noise)
  3. Click News tab and capture any console errors
    - expect: No critical errors during News tab navigation
