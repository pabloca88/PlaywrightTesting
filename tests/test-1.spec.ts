import {test, Browser, Page, expect} from '@playwright/test';

    test.describe('Navegación en www.freerangetester.com', () => {

        const secciones = [
            { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
            { nombre: 'Udemy', url:  '/udemy', tituloEsperado: 'Udemy' },
            { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
            { nombre: 'Blog', url: '/login', tituloEsperado: 'Acceder a Free Range Testers'}
            // Agregar mas secciones de ser necesario 
        ];
        for (const seccion of secciones) {
        
            test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {
                
                await test.step(`Estando yo en la web principal www.freerangetester.com`, async () => {
                    page.goto('https://www.freerangetesters.com');
                    await expect(page).toHaveTitle('Free Range Testers');
                });

                await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
                    page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true}).click();
                    await page.waitForURL(`**${seccion.url}`);
                });
                
                await test.step(`Soy redirigido a la sección de título "${seccion.tituloEsperado}"`, async () => {
                    await expect(page).toHaveTitle(seccion.tituloEsperado);
                });
            });
       }

    });
