

import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultPage';
import { ProductPage } from '../pages/ProductPage';



//define types for page fixtures:
type pagefixtures = {
    
    loginPage: LoginPage;
    homePage: HomePage;
    searchResultsPage: SearchResultsPage;
    productInfoPage: ProductPage;
 
};

//extend playwright base test:
export let test = baseTest.extend<pagefixtures>({
       
       loginPage: async ({ page }, use) =>{
           let loginPage = new LoginPage(page);
           await use(loginPage);
       },
       
       homePage: async ({ page }, use) =>{
           let homePage = new HomePage(page);
           await use(homePage);
       },

        searchResultsPage: async ({ page }, use) => {
          let searchResultsPage = new SearchResultsPage(page);
          await use(searchResultsPage);
       },

       productInfoPage: async ({ page }, use) => {
         let productInfoPage = new ProductPage(page);
         await use(productInfoPage);
       },
});

export { expect } from '@playwright/test';