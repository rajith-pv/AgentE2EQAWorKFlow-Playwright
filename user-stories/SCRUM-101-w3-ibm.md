# User Story: SCRUM-101 - W3 Navigation process

## Story Title
As a Employee, I want navigate to various w3 tabas and capture information 

## Story Description
Implement a complete navigation flow that allows Employees to visit various tabs in w3 home page.

## Application URL
https://w3.ibm.com/

## Test Credentials
- Username: `rajith.pv@in.ibm.com`
- Password: `pws`

## Acceptance Criteria

### AC1: Navigate to all tabs in w3 home page
- GIVEN I am a logged in user to w3 home page
- WHEN w3 home page is loaded 
- THEN click on People Tab and wait for 30 seconds 
- AND click on News Tab and wait for 30 seconds
- AND click on Apps Tab and wait for 30 seconds
- AND click on IT Support Tab and wait for 30 seconds
- AND click on AskIBM Tab and wait for 30 seconds


## Business Rules
1. Home page should be loaded 
2. Should be able to navigate to all tabas

## Technical Notes
- Use Playwright for test automation
- Test across Chrome, Firefox, and Safari browsers
- Validate all form validation messages

## Definition of Done
- [x] All acceptance criteria have test cases
- [x] Manual exploratory testing completed
- [x] Automated test scripts created and passing
- [x] Test results documented
- [x] Bugs logged for any failures
- [x] Code committed to repository