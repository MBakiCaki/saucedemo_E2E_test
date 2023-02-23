// Complete scenario for a basic user shopping experience
const { test, expect } = require('@playwright/test')

const username = 'standard_user';
const password = 'secret_sauce';

test('Complete user experience' , async ({page}) => {

        // NAVIGATE TO WEBSITE
        await page.goto('https://www.saucedemo.com/')
        
        //LOGIN
        // fill username
        await page.locator('#user-name').click();
        await page.locator('#user-name').type(username);
        // fill password
        await page.locator('#password').click();
        await page.locator('#password').type(password);
        // click login button
        await page.locator('#login-button').click();
        // validate login
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        // ADD A PRODUCT TO CART
        // add product to the cart(from listing page)
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        // navigate to the product details
        await page.locator('#item_2_title_link').click();
        // add product to cart(from product details)
        await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
        // await page.locator('a').filter({ hasText: '1' }).click();

        //CHECKOUT
        // navigate to shpping cart
        await page.locator('a[class="shopping_cart_link"]').click();
        // navigate to checkout
        await page.locator('[data-test="checkout"]').click();
        // fill customer informations
        await page.locator('[data-test="firstName"]').click();
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').click();
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').click();
        await page.locator('[data-test="postalCode"]').fill('111');
        // complete checkout
        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="finish"]').click();
        // validate successful checkout
        // await page.getByRole('img', { name: 'Pony Express' }).click();
        // await page.pause()
        await expect(page.locator('img[alt="Pony Express"]')).toBeVisible();


});