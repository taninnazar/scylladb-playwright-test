import { Locator, Page } from "@playwright/test";

export class NewClusterHeaderPage {
    protected page: Page;

    readonly title: Locator
    readonly activeStep: Locator

    constructor(page: Page) {
        this.page = page;

        this.title = page.locator("#pageTitle")
        this.activeStep = page.locator("div[data-component='PageHeader'] div[data-component='WizardStepper'] div[class*='activeStep']")
    }

    // Methods
}
