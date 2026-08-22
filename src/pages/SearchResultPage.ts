
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage{

//private Locators 
private readonly searchResults: Locator;


//const.... of the class init the locators
constructor(page: Page){
    super(page);
    this.searchResults = page.locator('div.product-layout');
};

//public page actions(methods)/behaviour

async getProductSearchResultsCount(): Promise<number> {
    await this.searchResults.first().waitFor({ state: 'visible', timeout: 10000 });
    return await this.searchResults.count();
}

async selectProduct(productName: string): Promise<void> {
    const productLink = this.page.getByRole('link', { name: productName, exact: true }).first();
    await productLink.scrollIntoViewIfNeeded();
    await productLink.waitFor({ state: 'visible', timeout: 5000 });
    await productLink.click();
    //await this.page.getByRole('link', {name: productName,exact: true}).first().click();
}



}