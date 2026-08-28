

import process from 'process';
import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
     await loginPage.goToLoginPage();
});

test('login page title test', async ({loginPage}) =>{
     const pageTitle = await loginPage.getLoginPageTitle();
     console.log('login page title', pageTitle);
     expect(pageTitle).toBe('Account Login');
});
    
test('forget password link exist test', async ({loginPage}) =>{
     expect(await loginPage.isforgotenPwdLinkExist()).toBeTruthy();
});

test('User is able to login to app test', async ({loginPage, homePage}) => {
     await loginPage.doLogin(process.env.Email!, process.env.PASSWORD!);
     expect(await homePage.getHomePageTitle()).toBe('Your Store');
});


// Data-Driven approch part no 1 = with fixtures, parellel mode, read csv data directly and loop the test method row wise....

// test('login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) => {
//         for(let row of testData){
//            await loginPage.doLogin(row.username, row.password);
//            expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
//           } 
//      });


// //Data-Driven approch part no 2 = sequence mode --- only one test is running with test data one by one using testdata from fixtures  
// let testData = CsvHelper.readCsv('src/data/loginData.csv');
// for(let row of testData){
//      test(`invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage}) => {
//            await loginPage.doLogin(row.username, row.password);
//            expect(await loginPage.isInvalidLoginErrorDisplayed()).toBe("Warning: No match for E-Mail Address and/or Password.");
//      });
// }        