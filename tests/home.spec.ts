import {test, expect} from '@playwright/test';

test.describe('Home', () => {
    test('Open HomePage and verify title', async ({ page }) => {
        //open url
        await page.goto('https://practice.automationbro.com/');
        //verify title
        await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns – Helping you succeed in Software Quality.');
    })
    
    test('Open About sections and verify the title of the page', async ({ page }) => {
        
        await page.goto('https://practice.automationbro.com/about/');

        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
    })

    test('Click get started button using CSS Selector', async ({ page }) => {
        //open url
        await page.goto('https://practice.automationbro.com/');

        //click button
        await page.locator('#get-started').click(); //click action returns a promise so we need await

        // verify url has #get-started
        await expect(page).toHaveURL(/.*#get-started/);

    })
    
    
})
