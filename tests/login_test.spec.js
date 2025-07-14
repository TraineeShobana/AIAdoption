const { test, expect } = require('@playwright/test');

test('Valid login and locked out user scenarios', async ({ page }) => {
  // Scenario 1: Valid Login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Assert redirected to /inventory.html
  await expect(page).toHaveURL(/\/inventory\.html$/);
  // Assert no error message is visible
  await expect(page.locator('[data-test="error"]')).toHaveCount(0);
  // Assert inventory page is displayed (Products title and at least one inventory item)
  await expect(page.locator('.title')).toHaveText('Products');
  const itemCount = await page.locator('.inventory_item').count();
  expect(itemCount).toBeGreaterThan(0);

  // Logout to return to login page
  await page.click('#react-burger-menu-btn');
  await page.waitForSelector('#logout_sidebar_link', { state: 'visible', timeout: 5000 });
  await page.click('#logout_sidebar_link');

  // Scenario 2: Locked Out User
  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Assert error message is displayed
  await expect(page.locator('[data-test="error"]')).toHaveText(/locked out/i);
  // Assert still on login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
}); 