import { Locator, Page } from "@playwright/test";

export class MyClustersPage {
    protected page: Page;

    readonly createClusterButton: Locator

    constructor(page: Page) {
        this.page = page;

        this.createClusterButton = page.locator("a[id='createNewClusterBtn']")
    }

    // Methods
    async clickCreateDedicatedClusterButton() {
        await this.createClusterButton.click();
    }
}
