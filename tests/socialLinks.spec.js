const { test, expect } = require('@playwright/test');

// valid user credentials
const username = 'standard_user';
const password = 'secret_sauce';

const baseUrl = 'https://www.saucedemo.com';

// Users redirected to this page after login successfully
const successfulLoginPage = 'https://www.saucedemo.com/inventory.html';

test.beforeEach(async ({ page }) => {

    // navigate to he page
    await page.goto(baseUrl);
    // login
    await page.locator('#user-name').click();
    await page.locator('#user-name').type(username);
    await page.locator('#password').click();
    await page.locator('#password').type(password);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(successfulLoginPage);
});

test.describe('Social Links', () => {

    test('Twitter link works', async ({ page }) => {

        // Start waiting for popup before clicking.
        let popupPromise = page.waitForEvent('popup');

        // Click Twitter icon
        await page.getByRole('link', { name: 'Twitter' }).click();

        // Wait for the popup to load.
        let popup = await popupPromise;
        await popup.waitForLoadState();

        // Check url of the opened tab
        await expect(popup).toHaveURL(new RegExp("^https://twitter.com/saucelabs"));
    });

    test('Facebook link works', async ({ page }) => {

        // Start waiting for popup before clicking.
        let popupPromise = page.waitForEvent('popup');

        // Click Facebook icon
        await page.getByRole('link', { name: 'Facebook' }).click();

        // Wait for the popup to load.
        let popup = await popupPromise;
        await popup.waitForLoadState();

        // Check url of the opened tab
        await expect(popup).toHaveURL(new RegExp("^https://www.facebook.com/saucelabs"));
    });

    test('Linkedin link works', async ({ page }) => {

        // Start waiting for popup before clicking.
        let popupPromise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Linkedin' }).click();

        // Wait for the popup to load.
        let popup = await popupPromise;
        await popup.waitForLoadState();

        // Check url of the opened tab
        await expect(popup).toHaveURL(new RegExp("^https://www.linkedin.com/"));
    });


})