import {test,expect} from '@playwright/test'

const USER = 'pabloca88'
const REPO = 'FreeRangePW'

// el contexto de la solicitud es reutilizado por todas las pruebas en el archivo.
let apiContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        //todos los request que enviamos van a este endpoint
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            //configuramos este Header como nos dicen en la docu de Github
            'Accept': 'application/vnd.github.v3+json',
            //Agregamos el token de autorizacion de todos los request
            //Acá ponemos el token que generamos en Github
            'Authorization' : `token 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`,//`token ${process.env.API_TOKEN}`,
        },
    });
});

test.afterAll(async ({ }) => {
    //nos deshacemos de todas las respuestas al final
    await apiContext.dispose();
})

test('El ultimo issue creado es el primero en la lista', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            "title": "[Feature] Que el framework me planche la ropa",
        }
    });
    //console.log(newIssue);
    expect(newIssue.ok()).toBeTruthy();

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
});
