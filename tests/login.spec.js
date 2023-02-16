const { test, expect } = require('@playwright/test');

// valid user credentials
const username = 'standard_user';
const password = 'secret_sauce';

// Users redirected to this page after login successfully
const successfulLoginPage = 'https://www.saucedemo.com/inventory.html';

// variables declared for repetitively used selectors
const username_selector = '#user-name';
const password_selector = '#password';
const login_selector = '#login-button'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
});

test.describe('Posivite', () => {

    // standart user
    test('Valid user can login', async ({ page }) => {

        // fill username
        await page.locator(username_selector).click();
        await page.locator(username_selector).type(username);

        // fill password
        await page.locator(password_selector).click();
        await page.locator(password_selector).type(password);

        // click login button
        await page.locator(login_selector).click();

        // expect(page.url()).toContain(successfulLoginPage);
        await expect(page).toHaveURL(successfulLoginPage);
    });
});

test.describe('Negative', () => {

    test('Invalid user can not login', async ({ page }) => {

        // fill username
        await page.locator(username_selector).click();
        await page.locator(username_selector).type('invalid');

        // fill password
        await page.locator(password_selector).click();
        await page.locator(password_selector).type(password);

        // click login button
        await page.locator(login_selector).click();

        // check user not logged in and error displayed
        await expect(page).not.toHaveURL(successfulLoginPage);
        await expect(page.locator('[data-test="error"]')).toBeVisible();

    });

    test('Blocked user can not login', async ({ page }) => {

        // fill username
        await page.locator(username_selector).click();
        await page.locator(username_selector).type('blocked_user');

        // fill password
        await page.locator(password_selector).click();
        await page.locator(password_selector).type(password);

        // click login button
        await page.locator(login_selector).click();

        // check user not logged in and error displayed
        await expect(page).not.toHaveURL(successfulLoginPage);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('Empty credentials login attempt', async ({ page }) => {

        // click login button
        await page.locator(login_selector).click();

        // check user not logged in and error displayed
        await expect(page).not.toHaveURL(successfulLoginPage);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('Empty username login attempt', async ({ page }) => {

        // fill password
        await page.locator(password_selector).click();
        await page.locator(password_selector).type(password);

        // click login button
        await page.locator(login_selector).click();

        // check user not logged in and error displayed
        await expect(page).not.toHaveURL(successfulLoginPage);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('Empty password login attempt', async ({ page }) => {
        // fill username
        await page.locator(username_selector).click();
        await page.locator(username_selector).type(username);

        // click login button
        await page.locator(login_selector).click();

        // check user not logged in and error displayed
        await expect(page).not.toHaveURL(successfulLoginPage);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

});