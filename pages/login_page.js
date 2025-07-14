class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async assertErrorVisible(expectedText) {
    await this.page.waitForSelector(this.errorMessage, { state: 'visible' });
    const errorText = await this.page.textContent(this.errorMessage);
    expect(errorText).toContain(expectedText);
  }

  async assertNoError() {
    await expect(this.page.locator(this.errorMessage)).toHaveCount(0);
  }

  async assertOnInventoryPage() {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.locator('.title')).toHaveText('Products');
    const itemCount = await this.page.locator('.inventory_item').count();
    expect(itemCount).toBeGreaterThan(0);
  }
}

module.exports = { LoginPage }; 