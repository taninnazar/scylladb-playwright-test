import { Locator, Page } from "@playwright/test";

export class NewClusterDeploymentPage {
    protected page: Page;

    readonly title: Locator
    readonly clusterNameInput: Locator
    readonly clusterNameErrorMessage: Locator
    readonly regionSelect: Locator
    readonly allRegionSelectOption: Locator

    constructor(page: Page) {
        this.page = page;

        this.title = page.locator("#pageTitle")
        this.clusterNameInput = page.locator("#clusterNameInp")
        this.clusterNameErrorMessage = page.locator("#clusterNameInp-helper-text")
        this.regionSelect = page.locator("div[data-testid='CloudProviderRegionSelect']")
        this.allRegionSelectOption = page.locator("#menu-region li")
    }

    // Methods
    async selectRegion (region: string) {
        await this.regionSelect.click()
        await this.allRegionSelectOption.and(this.page.getByText(region)).scrollIntoViewIfNeeded();
        await this.allRegionSelectOption.and(this.page.getByText(region)).click();
    }
}
