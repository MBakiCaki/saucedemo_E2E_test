const { test, expect }= require('@playwright/test')
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

test.describe('Inventory tests', () => {

    let backpack_item_description = "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.";
    let backpack_item_price = "$29.99";

    test('Product list page', async ({ page }) => {
        /**inventory item that has #item_4_title_link contains */
        
        let backpack_item = await page.locator('.inventory_item:has(#item_4_title_link)');
        await expect(backpack_item).toContainText('Sauce Labs Backpack');
        await expect(backpack_item).toContainText(backpack_item_description);
        await expect(backpack_item).toContainText(backpack_item_price);
        // await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });

    test('Product details page', async ({ page }) => {

        // navigate to product details
        await page.locator('#item_4_title_link').click();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");

        // check product details displayed
        await expect.soft(page.locator('#inventory_item_container')).toContainText("Sauce Labs Backpack");
        await expect(page.locator('#inventory_item_container')).toContainText(backpack_item_description);
        await expect(page.locator('#inventory_item_container')).toContainText(backpack_item_price);
        
        // check add to cart feature works
        await page.locator('#add-to-cart-sauce-labs-backpack').click();
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();
        
    });

});

    

