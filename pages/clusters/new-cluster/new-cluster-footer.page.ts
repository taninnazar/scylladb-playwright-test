import { Locator, Page } from "@playwright/test";

export class NewClusterFooterPage {
    protected page: Page;

    readonly totalCostPerHour: Locator
    readonly launchClusterButton: Locator

    constructor(page: Page) {
        this.page = page;

        this.totalCostPerHour = page.locator("#totalCostPerHour")
        this.launchClusterButton = page.locator("#launchClusterBtn")
    }

    // Methods
}
