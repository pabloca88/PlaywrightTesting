import {test, Browser, Page, expect} from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;
    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀'

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Boton ID Dinámico', async ({ page }) => {

            await test.step('Dado que navego al SandBox de Automation de Free Range Tester ', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');   
            })

            await test.step('Puedo hacer click en el botón ID dinámico',async () => {
                await page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto', exact: true})
                .click(); // or crear una constante y hacerle click const botonIdDinamico = xx, botonIdDinámico.click();
                
            })
        })

        test('Lleno un campo de texto Automation SandBox', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Range Tester ', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');   
            })

            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir); // como opción se puede usar .type(); como tipear con el teclado

            })
        })

        test('Puedo seleccionar Checkboxes', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                await page.getByLabel('Pasta 🍝').check(); // repetir dos veces check no desselecciona, se usa uncheck(); 
            })    
        })

        test('Puedo seleccionar Radio Buttons', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar el Radio Button para No', async () => {
                await page.getByLabel('No').check(); // repetir dos veces check no desselecciona, se usa uncheck(); 
            })    
        })

        test('Puedo seleccionar un item del Dropdown', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo seleccionar un deporte del Dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Fútbol'); // dropdown de tipo <select>
            })    
        })

        test('Puedo seleccionar un día del dropdown Días de la Semana', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Selecciono un día de la semana del dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' ,exact: true }).click(); // abro el dropdown con un click
                await page.getByRole('link', { name:'Martes', exact: true }).click(); // selecciono la opción
            })    
        })

        // Test skippeado aun no existe la opción en el sandbox
        test.skip('Puedo subir archivos a Automation Sandbox', async ({ page }) => { 

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Agrego archivos para ser subidos', async () => {
                 //como subir archivos a una página; mas de uno usar []
                await  page.getByLabel('Upload File').setInputFiles(['pathAlArchivo.pdf','Invoice1.pdf']); 
               
                //como deseleccionar archivos subidos
                await  page.getByLabel('Upload File').setInputFiles([]); 
            })    
        })

        // Test skippeado aun no existe la opción en el sandbox
        test.skip('Puedo hacer un drag and drop de elementos en  Automation Sandbox', async ({ page }) => { 

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByTestId('DragFrom')
                .dragTo(page.getByTestId('Dragto'));
            })    
        })
        
        
        
    })
    
})();
