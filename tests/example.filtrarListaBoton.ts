import {test, Browser, Page, expect} from '@playwright/test';
  
  // Ejemplo de HTML:
                // <ul>
                //     <li>
                //        <h3>PlayStation 5</h3>
                //        <button>Add to Cart</button>
                //     </li>
                //     <li>
                //        <h3>Xbox 360</h3>
                //        <button>Add to Cart</button>
                //     </li>
                // </ul>
    test('Validar hacer click a un boton especifico de una lista', async ({ page }) => {

        await test.step('Ejemplo de como apretar un boton exacto en una lista', async () =>{
            await page.getByRole('listitem') //busco la lista
                .filter({ hasText: 'PlayStation 5'}) // Busco en la lista el titulo Playstation 5
                .getByRole('button', { name: 'Add to cart', exact: true}) //Busco el boton que deseo presionar
                .click();

            //REALIZAR LA MISMA ACCIÓN FILTRANDO POR HEADING (MAS ROBUSTO)
            page.getByRole('listitem')
            .filter({ has: page.getByRole('heading', { name: 'Xbox 360', exact: true})}) // filtramos por locator: heading
            .getByRole('button',{ name: 'Add to cart', exact: true})
            .click();   

            //FILTRAR POR VISIBILIDAD DEL ELEMENTO
            // Ejemplo:
            // <button style='display: none'> No lo ves </button>
            // <button>Lo ves</button>
            await page.locator('button').locator('visible=true').click();

            //ELEMENTOS DE UNA LISTA, COMO UBICAR UNO
            // <ul>
            //     <li>manzana</li>
            //     <li>banana</li>
            //     <li>naranja</li>
            // </ul>
            page.getByRole('listitem')
            .filter({ hasText: 'banana'})
            .click();


            
        });
    });