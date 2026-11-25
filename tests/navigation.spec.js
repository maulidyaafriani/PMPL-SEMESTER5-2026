const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../pages/DashboardPage');

test('TC05 menu Jadwal/KHS membuka halaman tujuan', async ({ page }) => {
  test.skip(
    !process.env.SIAKAD_USER || !process.env.SIAKAD_PASS,
    'Isi SIAKAD_USER dan SIAKAD_PASS di .env lokal.'
  );
  const configuredLabel = process.env.SIAKAD_NAV_MENU_LABEL;
  const targetMarker = process.env.SIAKAD_NAV_PAGE_MARKER;
  if (!configuredLabel || !targetMarker) {
    test.skip(
      true,
      'Isi SIAKAD_NAV_MENU_LABEL dan SIAKAD_NAV_PAGE_MARKER di .env berdasarkan menu yang terlihat.'
    );
  }

  const dashboard = new DashboardPage(page);
  await dashboard.gotoConfiguredDashboard(test);
  await dashboard.assertDashboardMarker(test);

  const menuItem = dashboard.getMenuItem(configuredLabel);
  await expect(menuItem).toBeVisible();
  await menuItem.click();

  await expect(page.getByText(targetMarker, { exact: false }).first()).toBeVisible();
});

test('TC06 logout mengembalikan ke halaman login', async ({ page }) => {
  test.skip(
    !process.env.SIAKAD_USER || !process.env.SIAKAD_PASS,
    'Isi SIAKAD_USER dan SIAKAD_PASS di .env lokal.'
  );
  const logoutLabel = process.env.SIAKAD_LOGOUT_LABEL;
  if (!logoutLabel) {
    test.skip(true, 'Isi SIAKAD_LOGOUT_LABEL di .env sesuai label logout yang terlihat.');
  }

  const dashboard = new DashboardPage(page);
  await dashboard.gotoConfiguredDashboard(test);
  await dashboard.assertDashboardMarker(test);

  await dashboard.getLogoutControl(logoutLabel).click();
  await expect(dashboard.loginUsernameInput).toBeVisible();
});
