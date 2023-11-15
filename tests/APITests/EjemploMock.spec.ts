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
});

test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
  //Obtenemos la respuesta y le agregamos un extra
  await page.route('*/**/api/v1/fruits', async route => {  //route =  escuchamos al endpoint
    const response = await route.fetch();
    const json = await response.json();
    json.push({ name: 'Lionel Messi', id: 200});
    //Obtenemos la respuesta real mientras que le agregamos un extra
    //al objeto JSON que va a estar representado
    await route.fulfill({ response, json });
  });

  //vamos a la página
  await page.goto('https://demo.playwright.dev/api-mocking');

  //Validamos que vino la respuesta real con el extra que le sumamos antes
  await expect(page.getByText('Lionel Messi', {exact: true})).toBeVisible();
});

