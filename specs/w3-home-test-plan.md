# W3 IBM Home Navigation Test Plan

## Application Overview

The IBM W3 intranet portal (https://w3.ibm.com) is an employee-facing application providing navigation to People, News, Apps, IT Support, and AskIBM sections. This test plan covers the full tab-navigation workflow described in SCRUM-101: verifying that an authenticated IBM employee can navigate to all five main tabs and that each page loads correctly.

## Test Scenarios

### 1. W3 Home Page Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-001: Verify W3 Home page loads successfully

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ and wait for the page to fully load
    - expect: Page title should be 'Home'
    - expect: Main navigation with Home, People, News, Apps, IT Support, AskIBM tabs should be visible
    - expect: W3 logo/header banner should be visible
  2. Verify all main navigation tabs are visible: Home, People, News, Apps, IT Support, AskIBM
    - expect: All 6 navigation items are visible in the header nav
    - expect: Navigation role is 'Main Navigation'

#### 1.2. TC-002: Navigate to People tab

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. From the W3 home page, click the 'People' tab in the main navigation
    - expect: URL changes to https://w3.ibm.com/#/people
    - expect: Page title changes to 'People'
    - expect: People page content loads
  2. Wait 30 seconds for the People page to fully load and observe content
    - expect: People page content is visible and stable
    - expect: No error messages displayed

#### 1.3. TC-003: Navigate to News tab

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. Click the 'News' tab in the main navigation
    - expect: URL changes to https://w3.ibm.com/#/news
    - expect: Page title changes to 'News'
  2. Wait 30 seconds for the News page to fully load
    - expect: News articles are displayed on the page
    - expect: News page content is stable and readable

#### 1.4. TC-004: Navigate to Apps tab

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. Click the 'Apps' tab in the main navigation
    - expect: URL changes to https://w3.ibm.com/#/apps/category/recommended
    - expect: Page title changes to 'Apps - Recommended'
  2. Wait 30 seconds for the Apps page to fully load
    - expect: Apps catalog content is visible
    - expect: Recommended apps section is displayed

#### 1.5. TC-005: Navigate to IT Support tab

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. Click the 'IT Support' tab in the main navigation
    - expect: URL changes to https://w3.ibm.com/#/support
    - expect: Page title changes to 'IT Support'
  2. Wait 30 seconds for the IT Support page to fully load
    - expect: IT Support content is visible
    - expect: Support articles or categories are displayed

#### 1.6. TC-006: Navigate to AskIBM tab

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. Click the 'AskIBM' tab in the main navigation
    - expect: URL changes to https://w3.ibm.com/ask
    - expect: Page title changes to 'AskIBM'
  2. Wait 30 seconds for the AskIBM page to fully load
    - expect: AskIBM chat interface is visible
    - expect: AskIBM content is displayed correctly

#### 1.7. TC-007: Complete navigation flow — all tabs in sequence

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. Navigate to W3 home page and verify it loads
    - expect: Home page loads with title 'Home'
  2. Click People tab and wait for page load
    - expect: People page loaded, URL contains #/people
  3. Click News tab and wait for page load
    - expect: News page loaded, URL contains #/news
  4. Click Apps tab and wait for page load
    - expect: Apps page loaded, URL contains #/apps
  5. Click IT Support tab and wait for page load
    - expect: IT Support page loaded, URL contains #/support
  6. Click AskIBM tab and wait for page load
    - expect: AskIBM page loaded, URL contains /ask

#### 1.8. TC-008: Verify Home tab navigation returns to home page

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. From People page, click the 'Home' tab in main navigation
    - expect: URL changes back to https://w3.ibm.com/#/
    - expect: Page title changes to 'Home'
    - expect: Home page widgets (AskIBM, Favorites, News, Learning) are visible

#### 1.9. TC-009: Verify main navigation is visible on all tab pages

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. Navigate to each tab page (People, News, Apps, IT Support, AskIBM) and check navigation bar
    - expect: Main navigation banner 'w3' is visible on every page
    - expect: All navigation links remain accessible across pages
    - expect: W3 logo is displayed on each page

#### 1.10. TC-010: Verify page title changes for each tab

**File:** `tests/w3-test_script/w3-navigation.spec.ts`

**Steps:**
  1. Navigate to People tab and capture page title
    - expect: Page title is 'People'
  2. Navigate to News tab and capture page title
    - expect: Page title is 'News'
  3. Navigate to Apps tab and capture page title
    - expect: Page title is 'Apps - Recommended'
  4. Navigate to IT Support tab and capture page title
    - expect: Page title is 'IT Support'
  5. Navigate to AskIBM tab and capture page title
    - expect: Page title is 'AskIBM'
