import {Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class HomePage extends BasePage{ 

    private readonly Heading1: Locator;
    private readonly Heading2: Locator;
    private readonly Heading3: Locator;
    private readonly searchtextbox: Locator;
    private readonly searchbutton: Locator;
    

    constructor (page: Page){
        super(page);
        this.Heading1 = page.getByRole("heading", {level: 3, name: "Top Trending Categories"});
        this.Heading2 = page.getByRole("heading", {level: 3, name: "Top Products"});
        this.Heading3 = page.getByRole("heading", {level: 3, name: "Top Collection"});
        this.searchtextbox = page.getByRole("textbox", {name: "Search For Products"});
        this.searchbutton = page.getByRole("button", {name: "SEARCH"});
    }

    async getHomePageTitle(): Promise<string>{
        return await this.page.title();
    }

    async isSearchBtnExist(): Promise<string>{
        return await this.Heading3.innerText();
    }

    async getHomePageHeaders1(){
        return await this.Heading1.innerText();
    }
    
    async getHomePageHeaders2(){
        return await this.Heading2.innerText();
    }

    async dosearch(searchkey: string){
        console.log(` search key: ${searchkey}`);
        await this.searchtextbox.fill(searchkey);
        await this.searchbutton.click();
    }
}