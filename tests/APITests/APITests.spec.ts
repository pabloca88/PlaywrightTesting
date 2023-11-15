import {test, expect} from '@playwright/test'

const USER = 'pabloca88'
const REPO = 'RepoTestPW'

test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            name: REPO
        }
    });
    //console.log(response);
    expect(response.ok()).toBeTruthy();
})


test('Se puede crear un bug en el repo de Github', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            "title" : "[Bug] Exploto todo",
            "body" : "Descripcion del bug",
        }
    });
    console.log(newIssue.json());
    expect(newIssue.status()).toBe(201);

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        "title" : "[Bug] Exploto todo",
        "body" : "Descripcion del bug",
    }));
});

test('Puedo crear un feature request', async ({ request }) => {
    const newIssue =  await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            "title" : "[Feature] Quiero que haga helados",
            "body" : "Estaria buenisimo que el repo haga helados 🍦"
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        "title" : "[Feature] Quiero que haga helados",
        "body" : "Estaria buenisimo que el repo haga helados 🍦"
    }));
});


test.afterAll(async ({ request }) => {
    const reponse = await request.delete(`/repos/${USER}/${REPO}`);
    expect(reponse.ok()).toBeTruthy();
});
