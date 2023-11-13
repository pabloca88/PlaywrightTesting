import {test, expect} from '@playwright/test'

test('Hace un mock de una fruta que no viene de la API real', async ({ page }) => {
    // Hacemos un mock de la API antes de navergar
    await page.route('*/**/api/v1/fruits',async route => {
      const json = [{name: 'Melocotón', id: 26}];
      await route.fulfill({ json });  
    });

    // vamos a la pagina
    await page.goto('https://demo.playwright.dev/api-mocking');

    //validamos que Melocoton no esta disponible
    await expect(page.getByText('Melocotón')).toBeVisible();
})
