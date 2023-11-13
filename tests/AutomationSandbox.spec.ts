import {test, Browser, Page, expect} from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

(async () => {
    let browser: Browser;
    let page: Page;
    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀'

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Boton ID Dinámico', async ({ page }) => {

            await test.step('Dado que navego al SandBox de Automation de Free Range Tester ', async () => {
                await page.goto('');   
            })

            await test.step('Puedo hacer click en el botón ID dinámico y validar el mensaje que aparece',async () => {
                await page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto', exact: true})
                .click(); // or crear una constante y hacerle click const botonIdDinamico = xx, botonIdDinámico.click();
                await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
                
            })
        })

        test('Lleno un campo de texto Automation @SandBox', async ({ page }) => {
            await test.step('Dado que navego al SandBox de Automation de Free Range Tester ', async () => {
                await page.goto('');   
            })

            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await expect(page.getByPlaceholder('Ingresá texto'),'El Campo no se puede editar').toBeEditable();
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir); // como opción se puede usar .type(); como tipear con el teclado
                await expect(page.getByPlaceholder('Ingresá texto'),'El campo no contiene un valor').toHaveValue(textoAEscribir);
            })
        })

        //test MODELADO CON POM
        test('Puedo seleccionar y desselecionar Checkboxes en el @SandBox', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                const sandbox = new SandboxPage(page);
                //await page.getByLabel('Pasta 🍝').check(); // repetir dos veces check no desselecciona, se usa uncheck();
                await sandbox.checkPasta();

                await expect(sandbox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();
            })
            
            await test.step('Puedo deseleccionar el checlbox para Pasta', async () => {
                const sandbox = new SandboxPage(page);
                //await page.getByLabel('Pasta 🍝').uncheck();
                await sandbox.uncheckPasta();

                await expect(sandbox.pastaCheckbox, 'El checkbox no estaba desseleccionado').not.toBeChecked();
            })
            
        })

        test('Puedo seleccionar Radio Buttons', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo seleccionar el Radio Button para No', async () => {
                await page.getByLabel('No').check(); //repetir dos veces check no desselecciona, se usa uncheck(); 
            })    
        })

        test('Puedo seleccionar un item del Dropdown', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo seleccionar un deporte del Dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Fútbol'); // dropdown de tipo <select>
            })
            
            await test.step('Valid que la lista de dropdown contiene los deportes esperados', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball', 'Bochas']

                for (let opcion of deportes) {
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if (element) {
                        console.log(`La opción '${opcion}' está presente. `);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente. `);
                    }
                }
            })
            
        })

        test('Puedo seleccionar un día del dropdown Días de la Semana', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Selecciono un día de la semana del dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' ,exact: true }).click(); // abro el dropdown con un click
                await page.getByRole('link', { name:'Martes', exact: true }).click(); // selecciono la opción
            })    
        })

        // Test skippeado aun no existe la opción en el sandbox
        test.skip('Puedo subir archivos a Automation Sandbox', async ({ page }) => { 

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
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
                await page.goto('');
            })

            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByTestId('DragFrom')
                .dragTo(page.getByTestId('Dragto'));
            })    
        })

        test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo',  'Mbappe'];

                // crear un screenshot para agregar al reporte
                await test.info().attach('screenshot',{
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })

                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
        })
        test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                //Creamos un arreglo con todos los valores de la tabla dinámica
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);

                //Reload de la página para que cambien los valores de las tablas dinámicas
                await page.reload();

                //Creamos un segundo arreglo con todos los valores de la tabla dinámica despues de hacer reload de la página
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td',elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);

                //Validamos que todos los valores se modificaron para cada celda
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
            })
        })

        test('Ejemplo de Soft Assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Valido que los elementos de los checkboxes no sean los correctos', async () => {
                await expect.soft(page.getByText('Pizzaa 🍕'),'No se encontró el elemento Pizza 🍕').toBeVisible(); //Falla
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Heladoea 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();//Falla
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
            })
            
        })

        test('Validando dentro de un pop-up', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Cuando hago click en el boton pop-up', async () => {
                await page.getByRole('button', {name: 'Mostrar popup' }).click();
            })

            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', {name: 'Cerrar'}).click();
            })
            
            
        })
        
        
        
    }) 


})();