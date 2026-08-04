# W3 IBM Home Page Navigation Test Plan

## Application Overview

Test plan for SCRUM-101: W3 IBM Home Page Tab Navigation. The application under test is the IBM internal W3 home page (https://w3.ibm.com/). An authenticated IBM employee navigates through five main tabs (People, News, Apps, IT Support, AskIBM) and verifies each tab loads correctly with an appropriate wait time. Tests cover happy-path navigation, page-load validation, element visibility, and cross-browser compatibility.

## Test Scenarios

### 1. AC1 - W3 Home Page Tab Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC01 - Verify W3 home page loads successfully after login

**File:** `tests/w3-test_script/tc01-homepage-load.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ and restore authentication state from .playwright-mcp/w3-auth-state.json
    - expect: The W3 IBM home page loads without redirecting to the login page
    - expect: The page title contains 'w3' or 'IBM'
    - expect: The main navigation tabs are visible
  2. Verify the navigation bar is visible and contains the expected tabs
    - expect: Navigation tabs People, News, Apps, IT Support, and AskIBM are all visible in the navigation bar

#### 1.2. TC02 - Navigate to People tab and verify content loads

**File:** `tests/w3-test_script/tc02-people-tab.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with authentication state restored
    - expect: Home page loads successfully and navigation tabs are visible
  2. Click on the 'People' tab in the navigation bar
    - expect: The People tab is clicked and becomes active/highlighted
    - expect: The URL or page content changes to reflect the People section
  3. Wait 30 seconds for the People tab content to fully load
    - expect: People tab content is fully loaded after 30 seconds
    - expect: People-related content (employee search, org chart, or directory) is visible

#### 1.3. TC03 - Navigate to News tab and verify content loads

**File:** `tests/w3-test_script/tc03-news-tab.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with authentication state restored
    - expect: Home page loads successfully
  2. Click on the 'News' tab in the navigation bar
    - expect: The News tab is clicked and becomes active/highlighted
    - expect: The URL or page content changes to reflect the News section
  3. Wait 30 seconds for the News tab content to fully load
    - expect: News tab content is fully loaded
    - expect: News articles or headlines are visible on the page

#### 1.4. TC04 - Navigate to Apps tab and verify content loads

**File:** `tests/w3-test_script/tc04-apps-tab.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with authentication state restored
    - expect: Home page loads successfully
  2. Click on the 'Apps' tab in the navigation bar
    - expect: The Apps tab is clicked and becomes active/highlighted
    - expect: The URL or page content changes to reflect the Apps section
  3. Wait 30 seconds for the Apps tab content to fully load
    - expect: Apps tab content is fully loaded
    - expect: Application tiles or links are visible

#### 1.5. TC05 - Navigate to IT Support tab and verify content loads

**File:** `tests/w3-test_script/tc05-itsupport-tab.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with authentication state restored
    - expect: Home page loads successfully
  2. Click on the 'IT Support' tab in the navigation bar
    - expect: The IT Support tab is clicked and becomes active/highlighted
    - expect: The URL or page content changes to reflect the IT Support section
  3. Wait 30 seconds for the IT Support tab content to fully load
    - expect: IT Support tab content is fully loaded
    - expect: IT support options, help desk links, or service catalog is visible

#### 1.6. TC06 - Navigate to AskIBM tab and verify content loads

**File:** `tests/w3-test_script/tc06-askibm-tab.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with authentication state restored
    - expect: Home page loads successfully
  2. Click on the 'AskIBM' tab in the navigation bar
    - expect: The AskIBM tab is clicked and becomes active/highlighted
    - expect: The URL or page content changes to reflect the AskIBM section
  3. Wait 30 seconds for the AskIBM tab content to fully load
    - expect: AskIBM tab content is fully loaded
    - expect: AskIBM chatbot or search interface is visible

#### 1.7. TC07 - Complete sequential tab navigation flow (AC1 full scenario)

**File:** `tests/w3-test_script/tc07-full-navigation-flow.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with authentication state restored and verify home page is loaded
    - expect: W3 home page loads and all 5 navigation tabs are visible
  2. Click People tab and wait 30 seconds
    - expect: People tab content loads within 30 seconds
  3. Click News tab and wait 30 seconds
    - expect: News tab content loads within 30 seconds
  4. Click Apps tab and wait 30 seconds
    - expect: Apps tab content loads within 30 seconds
  5. Click IT Support tab and wait 30 seconds
    - expect: IT Support tab content loads within 30 seconds
  6. Click AskIBM tab and wait 30 seconds
    - expect: AskIBM tab content loads within 30 seconds

#### 1.8. TC08 - Verify unauthenticated access redirects to login

**File:** `tests/w3-test_script/tc08-unauthenticated-access.spec.ts`

**Steps:**
  1. Open a fresh browser session with no authentication state and navigate to https://w3.ibm.com/
    - expect: The page redirects to the IBM w3id login page
    - expect: Login form is displayed with username and password fields
  2. Verify the login page URL contains 'login.w3.ibm.com' or similar
    - expect: URL confirms the user was redirected to the IBM authentication service

#### 1.9. TC09 - Verify navigation tabs are accessible via keyboard

**File:** `tests/w3-test_script/tc09-keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ with authentication state restored
    - expect: Home page loads successfully
  2. Use Tab key to focus on the navigation area and navigate through tabs using keyboard
    - expect: Each navigation tab receives focus in order
    - expect: Focused tab has a visible focus indicator
  3. Press Enter on a focused tab to activate it
    - expect: The tab activates and its content loads, same as clicking with a mouse

#### 1.10. TC10 - Verify page title and basic metadata for each tab

**File:** `tests/w3-test_script/tc10-page-metadata.spec.ts`

**Steps:**
  1. Navigate to https://w3.ibm.com/ and check page title
    - expect: Page title contains expected text like 'w3', 'IBM' or the tab name
  2. Click each tab (People, News, Apps, IT Support, AskIBM) and check the page title after each
    - expect: Page title updates or remains consistent with the active tab
    - expect: No JavaScript errors appear in the console
