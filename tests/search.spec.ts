
import {test, expect} from '../src/fixtures/pagefixtures';
import process from 'process';

test.beforeEach(async ({ loginPage, homePage }) => {
     await loginPage.goToLoginPage();
     await loginPage.doLogin(process.env.USERNAMEQ!, process.env.PASSWORDQ!);
     await homePage.dosearch(process.env.searchkey!)
})

    test('verify search with products', async ({  searchResultsPage }) => {
       expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(6));
    });


test('verify user is able to land on the product page', async ({ homePage, searchResultsPage, page }) => {
        await searchResultsPage.selectProduct(process.env.productName!);
        expect(await page.title()).toBe('MacBook Pro');
});