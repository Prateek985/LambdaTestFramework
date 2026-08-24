
import { test, expect} from '../src/fixtures/pagefixtures';
import process from 'process';

test.beforeEach(async ({ loginPage, homePage, searchResultsPage }) => {
     await loginPage.goToLoginPage();
     await loginPage.doLogin(process.env.USERNAMEQ!, process.env.PASSWORDQ!);
     await homePage.dosearch(process.env.searchkey!);
     await searchResultsPage.selectProduct(process.env.productName!);
     
})

test('verify product images count', async ({productInfoPage}) => {
     let imgCount = await productInfoPage.getProductImageCount();
     console.log('total images: ', imgCount);
     expect(imgCount).toBe(5);
});

test('verify product Information/Data', async ({productInfoPage}) => {
     let actualProductInfoMap = await productInfoPage.getProductInfo();
     console.log('Actual Product Details:', actualProductInfoMap);
     expect.soft(actualProductInfoMap.get('ProductHeader')).toBe(process.env.ProductHeader);
     expect.soft(actualProductInfoMap.get('Brand')).toBe(process.env.Brand);
     //expect.soft(actualProductInfoMap.get('Viewed')).toBe('89842');
     expect.soft(actualProductInfoMap.get('Reward Points')).toBe(process.env.RewardPoints);
     expect.soft(actualProductInfoMap.get('Availability')).toBe(process.env.Availability);

});

test('verify user able to view add to card message', async ({homePage, searchResultsPage, productInfoPage}) => {
     await productInfoPage.doaddToCart();
     let addtocartmessage = await productInfoPage.getSuccessMessage();
     expect.soft(addtocartmessage).toBe("Success: You have added MacBook Pro to your shopping cart!");
});