

import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
     loginPage = new LoginPage(page);
     await loginPage.goToLoginPage();
     await loginPage.doLogin(process.env.Email!, process.env.PASSWORD!);
     homePage = new HomePage(page);
});

test('Home page title test', async () =>{
     const HomePageTitle = await homePage.getHomePageTitle();
     console.log('login page title', HomePageTitle);
     expect(HomePageTitle).toBe('Your Store');
});
    
test('search Button exist test', async () =>{
     expect(await homePage.isSearchBtnExist()).toBeTruthy();
});

test('Home page header1 test exist or not', async () => {
    let header1 =  await homePage.getHomePageHeaders1();
    expect(header1).toBe('TOP TRENDING CATEGORIES');
});

test('Home page header2 test exist or not', async () => {
    let header2 =  await homePage.getHomePageHeaders2();
    expect(header2).toBe('TOP PRODUCTS');
});