
import {Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class LoginPage extends BasePage{ 

    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenpwdLink: Locator;
    private readonly HomeLink: Locator;
    private readonly loginErrormessage:Locator;

    constructor (page: Page){
        super(page);
        this.emailId = page.getByRole("textbox", {name: "E-Mail Address"});
        this.password = page.getByRole("textbox", {name: "Password"});
        this.loginBtn = page.getByRole("button", {name: "Login"});
        this.forgottenpwdLink = page.getByRole("link", {name: "Forgotten Password"}).first();
        this.HomeLink = page.locator("//div[@id='entry_217834']//li[@class='nav-item']//span[contains(text(),'Home')]");
        this.loginErrormessage = page.locator(".alert.alert-danger.alert-dismissible");
    }

    async goToLoginPage(): Promise<void>{
          await this.page.goto('/index.php?route=account/login');
    }

    async getLoginPageTitle(): Promise<string>{
        return await this.page.title();
    }

    async isforgotenPwdLinkExist(): Promise<boolean>{
        return await this.forgottenpwdLink.isVisible();
    }

    async doLogin(username: string, password: string): Promise<void>{
        console.log(`user cred ${username} = ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.HomeLink.click();
    }
    
    async isInvalidLoginErrorDisplayed(): Promise<boolean> {
    return await this.loginErrormessage.isVisible();
}
}