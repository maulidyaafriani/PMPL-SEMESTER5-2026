const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe.configure({ retries: 0 });
test.use({ storageState: { cookies: [], origins: [] } });

test('TC01 halaman login menampilkan username, password, dan tombol login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.skipIfCaptcha(test);

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('TC02 submit field kosong tetap di halaman login atau memunculkan validasi', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.skipIfCaptcha(test);
  await loginPage.loginButton.click();

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(page).toHaveURL('/');
});

test('TC03 kredensial salah menampilkan pesan error (satu kali)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.skipIfCaptcha(test);
  await loginPage.login(
    `e2e-invalid-${Date.now()}@invalid.polinema.ac.id`,
    'invalid-e2e-password'
  );

  await expect(loginPage.loginError).toBeVisible();
  await expect(loginPage.usernameInput).toBeVisible();
});
