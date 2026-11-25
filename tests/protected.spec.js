const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.use({ storageState: { cookies: [], origins: [] } });

test('TC07 halaman terproteksi tanpa login diarahkan ke login', async ({ page }) => {
  const protectedPath = process.env.SIAKAD_DASHBOARD_PATH;
  test.skip(!protectedPath, 'Isi SIAKAD_DASHBOARD_PATH di .env setelah memeriksa dashboard.');
  if (!protectedPath.startsWith('/')) {
    throw new Error('SIAKAD_DASHBOARD_PATH harus berupa path relatif yang diawali "/".');
  }

  await page.goto(protectedPath);
  const loginPage = new LoginPage(page);
  await expect(loginPage.usernameInput).toBeVisible();
});
