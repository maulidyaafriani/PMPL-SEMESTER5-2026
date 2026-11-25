const { expect } = require('@playwright/test');

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.loginUsernameInput = page.getByRole('textbox', { name: 'Username' });
  }

  async gotoConfiguredDashboard(test) {
    const dashboardPath = process.env.SIAKAD_DASHBOARD_PATH;
    if (!dashboardPath) {
      test.skip(true, 'Isi SIAKAD_DASHBOARD_PATH di .env setelah memeriksa dashboard.');
    }
    if (!dashboardPath.startsWith('/')) {
      throw new Error('SIAKAD_DASHBOARD_PATH harus berupa path relatif yang diawali "/".');
    }

    await this.page.goto(dashboardPath);
  }

  async assertDashboardMarker(test) {
    const dashboardMarker = process.env.SIAKAD_DASHBOARD_MARKER;
    if (!dashboardMarker) {
      test.skip(true, 'Isi SIAKAD_DASHBOARD_MARKER di .env dengan teks unik yang terlihat di dashboard.');
    }

    await expect(this.page.getByText(dashboardMarker, { exact: false }).first()).toBeVisible();
  }

  getMenuItem(label) {
    return this.page.getByText(label, { exact: true }).first();
  }

  getLogoutControl(label) {
    return this.page.getByText(label, { exact: true }).first();
  }
}

module.exports = { DashboardPage };
