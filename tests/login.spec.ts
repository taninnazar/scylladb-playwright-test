import { test, expect } from '@playwright/test';
import { NewClusterHeaderPage } from '../pages/clusters/new-cluster/new-cluster-header.page'
import { LoginPage } from '../pages/login.page'
import { MyClustersPage } from '../pages/clusters/my-clusters.page'
import { testsData } from '../utils/tests-data'

test.describe('Login tests', () => {
  let loginPage: LoginPage
  let myClustersPage: MyClustersPage
  let newClusterHeaderPage: NewClusterHeaderPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    myClustersPage = new MyClustersPage(page)
    newClusterHeaderPage = new NewClusterHeaderPage(page)

    await loginPage.navigate();
  });

  test('Should login with valid email and password', async ({page}) => {
    await page.waitForURL('https://cloud.scylladb.com/account/login');

    await loginPage.loginIntoApp(testsData.email, testsData.password)
    await expect(newClusterHeaderPage.title).toBeVisible()
    await expect(newClusterHeaderPage.title).toHaveText("My Clusters")
    await expect(myClustersPage.createClusterButton).toBeVisible()
  });
});
