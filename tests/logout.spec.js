const { test, expect } = require('@playwright/test');

// valid user credentials
const username = 'standard_user';
const password = 'secret_sauce';

const baseUrl = 'https://www.saucedemo.com';

// Users redirected to this page after login successfully
const successfulLoginPage = 'https://www.saucedemo.com/inventory.html';

test('User can logout', async ({ page }) => {

    // navigate to he page
    await page.goto(baseUrl);
    // login
    await page.locator('#user-name').click();
    await page.locator('#user-name').type(username);
    await page.locator('#password').click();
    await page.locator('#password').type(password);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(successfulLoginPage);

    // open left menu
    await page.locator('#react-burger-menu-btn').click();

    // click logout
    await page.locator('text=LOGOUT').click();

    // check successful logout
    await expect(page).toHaveURL(baseUrl);
});