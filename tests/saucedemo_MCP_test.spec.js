
import { test } from '@playwright/test';

test('SauceDemoMCP_2025-07-11', async ({ page }) => {
  
    // Navigate to URL
    await page.goto('https://www.saucedemo.com/');

    // Take screenshot
    await page.screenshot({ path: 'screenshots/Loginpage.png', fullPage: true });

    // Fill input field
    await page.fill('#user-name', 'standard_user');

    // Fill input field
    await page.fill('#password', 'secret_sauce');

    // Click element
    await page.click('#login-button');

    // Take screenshot
    await page.screenshot({ path: 'screenshots/HomePage.png', fullPage: true });

    // Click element
    await page.click("button[data-test='add-to-cart-sauce-labs-backpack']");

    // Click element
    await page.click('a.shopping_cart_link');

    // Take screenshot
    await page.screenshot({ path: 'screenshots/CartPage.png', fullPage: true });
});