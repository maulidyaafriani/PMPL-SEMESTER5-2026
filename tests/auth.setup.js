const fs = require('node:fs');
const path = require('node:path');
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

const authFile = path.join(__dirname, '..', '.auth', 'user.json');

test.describe.configure({ retries: 0 });

test('TC04 login valid menyiapkan sesi dashboard', async ({ page }) => {
  const username = process.env.SIAKAD_USER;
  const password = process.env.SIAKAD_PASS;
  test.skip(!username || !password, 'Isi SIAKAD_USER dan SIAKAD_PASS di .env lokal.');

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.skipIfCaptcha(test);
  await expect(loginPage.usernameInput).toBeVisible();
  await loginPage.login(username, password);
  await expect(loginPage.usernameInput).toBeHidden();

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
  await new DashboardPage(page).assertDashboardMarker(test);
});
