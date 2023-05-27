import { test, expect } from "@playwright/test";
import { createDegreeCourse, createUser, login } from "../../../utils/actions";

const userData = {
  userID: Math.random().toString(36).slice(2, 7),
  firstName: Math.random().toString(36).slice(2, 7),
  lastName: Math.random().toString(36).slice(2, 7),
  password: Math.random().toString(36).slice(2, 7),
};

const degreeCourseData = {
  name: Math.random().toString(36).slice(2, 7),
  shortName: Math.random().toString(36).slice(2, 7),
  universityName: Math.random().toString(36).slice(2, 7),
  universityShortName: Math.random().toString(36).slice(2, 7),
  departmentName: Math.random().toString(36).slice(2, 7),
  departmentShortName: Math.random().toString(36).slice(2, 7),
};

test("Open degree course management page.", async ({ page }) => {
  await login(page);
  await createUser(page, userData);
  await createDegreeCourse(page, degreeCourseData);
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
  await page.locator("#OpenDegreeCourseManagementPageButton").click();
  await expect(
    page.locator("#DegreeCourseManagementPageCreateDegreeCourseButton")
  ).not.toBeVisible();
  await expect(
    page.locator(`#DegreeCourseItem${degreeCourseData.name}`)
  ).toBeVisible();
  await expect(
    page.locator(`#DegreeCourseItemEditButton${degreeCourseData.name}`)
  ).not.toBeVisible();
  await expect(
    page.locator(`#DegreeCourseItemDeleteButton${degreeCourseData.name}`)
  ).not.toBeVisible();
  await expect(
    page.locator(
      `#CreateDegreeCourseApplicationForDegreeCourse${degreeCourseData.name}`
    )
  ).toBeVisible();
});
