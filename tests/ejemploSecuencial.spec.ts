import {test, type Page} from '@playwright/test'

//Anotamos todos los tests bajo Serial

test.describe.configure({ mode: 'serial' }); //hacemos que se ejecute en secuencia

let page : Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async ({ browser }) => {
    await page.close();
});

test('Si no corro el primero exploto', async () => {
    await page.goto('https://playwright.dev/');
});

test('Si no corro el segundo exploto', async () => {
    await page.getByText('Get Started').click();
})




