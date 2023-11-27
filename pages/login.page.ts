import { Locator, Page, request } from "@playwright/test";

export class LoginPage {
    protected page: Page;
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.locator("input[data-test-id='input-identifier']")
        this.passwordInput = page.locator("input[data-test-id='input-password']")
        this.signInButton = page.locator("button[data-test-id='submit-btn']")
    }

    // Methods
    async navigate() {
        await this.page.goto(`/account/login`);
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async loginIntoApp (email: string, password: string) {
        await this.enterEmail(email)
        await this.clickSignInButton()
        await this.enterPassword(password)
        await this.clickSignInButton()
        await this.page.waitForURL('https://cloud.scylladb.com');
    }
}
