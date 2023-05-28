import { test, expect } from "@playwright/test";
import { login, createUser } from "../../../utils/actions";

const userData = {
  userID: Math.random().toString(36).slice(2, 7),
  firstName: Math.random().toString(36).slice(2, 7),
  lastName: Math.random().toString(36).slice(2, 7),
  password: Math.random().toString(36).slice(2, 7),
};

test("Create a user first then login as the user", async ({ page }) => {
  login(page);
  createUser(page, userData);
  await page.locator("#OpenUserManagementPageButton").click();
  await expect(page.locator(`#UserItem${userData.userID}`)).toBeVisible();
  await page.locator("#LogoutButton").click();

  await page.locator("#OpenLoginDialogButton").last().click();
  await page.locator("#LoginDialogUserIDText").click();
  await page.locator("#LoginDialogUserIDText").fill(userData.userID);
  await page.locator("#LoginDialogPasswordText").click();
  await page.locator("#LoginDialogPasswordText").fill(userData.password);
  await page.locator("#PerformLoginButton").click();

  await expect(page.locator("h1")).toHaveText(`Welcome, ${userData.userID} !`);
});

// test("Visibility of navigation buttons", async ({ page }) => {
//   await login(page);
//   await createUser(page, userData);
//   // await page.locator('#OpenUserManagementPageButton').click();
//   await expect(page.locator(`#UserItem${userData.userID}`)).toBeVisible();
//   await page.locator("#LogoutButton").click();

//   await page.locator("#OpenLoginDialogButton").last().click();
//   await page.locator("#LoginDialogUserIDText").click();
//   await page.locator("#LoginDialogUserIDText").fill(userData.userID);
//   await page.locator("#LoginDialogPasswordText").click();
//   await page.locator("#LoginDialogPasswordText").fill(userData.password);
//   await page.locator("#PerformLoginButton").click();

//   await expect(page.locator("#OpenUserManagementPageButton")).not.toBeVisible();
//   await expect(
//     page.locator("#OpenDegreeCourseManagementPageButton")
//   ).toBeVisible();
//   await expect(
//     page.locator("#OpenDegreeCourseApplicationManagementPageButton")
//   ).toBeVisible();
// });
