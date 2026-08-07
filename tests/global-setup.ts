/**
 * Global Setup for NDTV Tests (SCRUM-101)
 *
 * NDTV is a public website — no authentication required.
 * This setup simply confirms the test environment is ready.
 */

import { FullConfig } from '@playwright/test';

async function globalSetup(_config: FullConfig) {
  console.log('\n[Global Setup] NDTV test suite — no authentication required.');
  console.log('[Global Setup] ✅ Ready to run tests against https://www.ndtv.com/');
}

export default globalSetup;
