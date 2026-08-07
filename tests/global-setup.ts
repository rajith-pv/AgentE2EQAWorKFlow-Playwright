/**
 * Global Setup for W3 IBM Tests
 *
 * This setup simply verifies the auth state file exists.
 * The auth state is saved by the MCP browser after manual login.
 * We do NOT attempt to re-navigate with the stored state, as doing so
 * in a fresh headless context triggers W3's SSO re-authentication flow.
 */

import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const AUTH_STATE_PATH = path.join(__dirname, '..', '.playwright-mcp', 'w3-auth-state.json');

async function globalSetup(_config: FullConfig) {
  console.log('\n[Global Setup] Checking W3 authentication state...');

  if (!fs.existsSync(AUTH_STATE_PATH)) {
    console.log('[Global Setup] ⚠️  No auth state file found.');
    console.log('[Global Setup] To fix: Open MCP browser, navigate to https://w3.ibm.com and authenticate,');
    console.log('[Global Setup] then the auth state will be saved automatically to .playwright-mcp/w3-auth-state.json');
    return;
  }

  try {
    const stateRaw = fs.readFileSync(AUTH_STATE_PATH, 'utf-8');
    const state = JSON.parse(stateRaw);
    const cookieCount = state.cookies?.length ?? 0;
    const hasAccessToken = state.cookies?.some((c: { name: string }) => c.name === 'access_token');

    if (cookieCount === 0) {
      console.log('[Global Setup] ⚠️  Auth state file is empty. Please re-authenticate.');
      return;
    }

    if (!hasAccessToken) {
      console.log('[Global Setup] ⚠️  No access_token cookie found. Session may have expired.');
      console.log('[Global Setup] To fix: Open MCP browser, navigate to https://w3.ibm.com and authenticate.');
      return;
    }

    console.log(`[Global Setup] ✅ Auth state loaded — ${cookieCount} cookies, access_token present.`);
  } catch (err) {
    console.error('[Global Setup] Failed to parse auth state:', (err as Error).message);
  }
}

export default globalSetup;
