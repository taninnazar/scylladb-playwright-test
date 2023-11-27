import { test, expect } from '@playwright/test';
import { NewClusterFooterPage } from '../pages/clusters/new-cluster/new-cluster-footer.page'
import { NewClusterHeaderPage } from '../pages/clusters/new-cluster/new-cluster-header.page'
import { LoginPage } from '../pages/login.page'
import { MyClustersPage } from '../pages/clusters/my-clusters.page'
import { NewClusterDeploymentPage } from '../pages/clusters/new-cluster/new-cluster-deployment.page'
import { testsData } from '../utils/tests-data'

test.describe('Create new cluster tests', () => {
  let loginPage: LoginPage
  let myClustersPage: MyClustersPage
  let newClusterDeploymentPage: NewClusterDeploymentPage
  let newClusterHeaderPage: NewClusterHeaderPage
  let newClusterFooterPage: NewClusterFooterPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    myClustersPage = new MyClustersPage(page)
    newClusterDeploymentPage = new NewClusterDeploymentPage(page)
    newClusterHeaderPage = new NewClusterHeaderPage(page)
    newClusterFooterPage = new NewClusterFooterPage(page)

    await loginPage.navigate();
    await loginPage.loginIntoApp(testsData.email, testsData.password);
    await myClustersPage.clickCreateDedicatedClusterButton();
  });

  test('Should not be able to enter more than 30 characters into the cluster name', async ({page}) => {
    const titleWith31Chars = "Very long dedicate cluster name"

    await expect(newClusterHeaderPage.title).toHaveText("New Cluster")
    await expect(newClusterDeploymentPage.clusterNameInput).toBeVisible()
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).not.toBeVisible()

    await newClusterDeploymentPage.clusterNameInput.fill(titleWith31Chars)
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).toBeVisible()
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).toHaveText("Cluster name should contain a maximum of 30 characters")
  });

  test('Should be able to enter only @ _ & # - special characters into the cluster name', async ({page}) => {
    const notAllowedNameWithSpecialChars = "1qwerty!2"
    const nameWithAllowedSpecialChars = "q#we&r-t_y@2"

    await expect(newClusterHeaderPage.title).toHaveText("New Cluster")
    await expect(newClusterDeploymentPage.clusterNameInput).toBeVisible()
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).not.toBeVisible()

    await newClusterDeploymentPage.clusterNameInput.fill(notAllowedNameWithSpecialChars)
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).toBeVisible()
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).toHaveText("Cluster name should start and end with an alphanumeric character and can contain @ _ & # -")

    await newClusterDeploymentPage.clusterNameInput.clear()
    await newClusterDeploymentPage.clusterNameInput.fill(nameWithAllowedSpecialChars)
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).not.toBeVisible()
  });

  test('Should not be able to move to the NETWORK SETTINGS with missing cluster name', async ({page}) => {
    await expect(newClusterHeaderPage.title).toHaveText("New Cluster")
    await expect(newClusterHeaderPage.activeStep).toHaveText("1Deployment")
    await expect(newClusterDeploymentPage.clusterNameInput).toBeVisible()
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).not.toBeVisible()

    await newClusterFooterPage.launchClusterButton.click()
    await expect(newClusterHeaderPage.activeStep).toHaveText("1Deployment")
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).toBeVisible()
    await expect(newClusterDeploymentPage.clusterNameErrorMessage).toHaveText("This field is required")
  });

  test('Should able to move to the NETWORK SETTINGS after entering cluster name', async ({page}) => {
    await expect(newClusterHeaderPage.title).toHaveText("New Cluster")
    await expect(newClusterHeaderPage.activeStep).toHaveText("1Deployment")

    await newClusterDeploymentPage.clusterNameInput.fill("test cluster")
    await newClusterFooterPage.launchClusterButton.click()
    await expect(newClusterHeaderPage.activeStep).toHaveText("2Network Settings")
  });

  test('Should change the pricing when region is changed', async ({page}) => {
    await expect(newClusterHeaderPage.title).toHaveText("New Cluster")
    await expect(newClusterFooterPage.totalCostPerHour).toHaveText("$1.251/hour")

    await newClusterDeploymentPage.selectRegion('Europe (London)');
    await expect(newClusterFooterPage.totalCostPerHour).toHaveText("$1.326/hour")
  });
});
