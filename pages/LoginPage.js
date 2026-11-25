class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: /^Login/i });
    this.captcha = page.locator(
      'iframe[title*="captcha" i], iframe[src*="captcha" i], [id*="captcha" i], [class*="captcha" i]'
    );
    this.loginError = page.getByText(
      /(login|username|password).*(gagal|salah|tidak valid|incorrect|invalid)|(gagal|salah|tidak valid|incorrect|invalid).*(login|username|password)/i
    );
  }

  async goto() {
    await this.page.goto('/');
  }

  async skipIfCaptcha(test) {
    const captchaCount = await this.captcha.count();
    for (let index = 0; index < captchaCount; index += 1) {
      if (await this.captcha.nth(index).isVisible()) {
        test.skip(true, 'CAPTCHA terdeteksi; tidak dicoba untuk dilewati.');
      }
    }
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
