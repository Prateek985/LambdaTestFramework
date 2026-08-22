

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {

    //private Locators 
    private readonly productheader: Locator;
    private readonly productImages: Locator;
    private readonly productmetadata: Locator;
    private readonly productpricingdata: Locator;
    private readonly cartbutton: Locator;
    private readonly cartsuccessmessage: Locator;
    private readonly ViewCartbutton: Locator;
    private map: Map<string, string | number>;


    //const.... of the class init the locators
    constructor(page: Page) {
        super(page);
        this.productheader = page.getByRole("heading", { level: 1 });
        this.productImages = page.locator("//div[@role='group']");
        this.productmetadata = page.locator("div#entry_216826 li");
        this.productpricingdata = page.locator("div#entry_216829 .price h3");
        this.cartbutton = page.getByRole("button", { name: "ADD TO CART" });
        this.cartsuccessmessage = page.locator(".d-flex.mb-3.align-items-start p");
        this.ViewCartbutton = page.locator("//div[@role='alert']//a[text()='View Cart ']");

        this.map = new Map<string, string | number>;
    };

    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader());
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.map;
    }


    //public page actions(methods)/behaviour

    async getProductHeader(): Promise<string> {
        return await this.productheader.innerText();
    }

    async getProductImageCount(): Promise<number> {
        //await this.page.waitForTimeout(4000);
        await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();
    }


    async getProductMetaData(): Promise<void> {
        let metaData = await this.productmetadata.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(":");
            let metakey = meta[0].trim();
            let metaVal = meta[1].trim();
            this.map.set(metakey, metaVal);
        }
    }

    async getProductPricingData(): Promise<void> {
        let priceData = await this.productpricingdata.allInnerTexts();
        let ProductPrice = priceData[0].trim();
        this.map.set('ProductPrice', ProductPrice);
    }

    async doaddToCart(): Promise<void> {
        await this.cartbutton.click({ timeout: 5000 });
    }

    async doViewCart(): Promise<void> {
        await this.ViewCartbutton.click({ timeout: 5000 });
    } 

    async getSuccessMessage(): Promise<string> {
        return await this.cartsuccessmessage.innerText();
    }



}