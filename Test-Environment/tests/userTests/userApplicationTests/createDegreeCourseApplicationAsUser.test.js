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

// test("Create application for a degree course", async ({ page }) => {
//   await login(page);
//   await createUser(page, userData);
//   await createDegreeCourse(page, degreeCourseData);
//   await page.locator("#LogoutButton").click();
//   await page.locator("#OpenLoginDialogButton").last().click();
//   await page.locator("#LoginDialogUserIDText").click();
//   await page.locator("#LoginDialogUserIDText").fill(userData.userID);
//   await page.locator("#LoginDialogPasswordText").click();
//   await page.locator("#LoginDialogPasswordText").fill(userData.password);
//   await page.locator("#PerformLoginButton").click();

//   await page.locator('#OpenDegreeCourseManagementPageButton').click();
//   await page.locator(`#CreateDegreeCourseApplicationForDegreeCourse${degreeCourseData.name}`).click();
//   await expect(page.locator('#CreateDegreeCourseApplicationEditUserID')).toBeDisabled();
//   await expect(page.locator('#CreateDegreeComponentEditDepartmentShortName')).toBeDisabled();
//   await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').type('2023');
//   await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodName').selectOption({label: 'WiSe'});
//   await page.locator('#createDegreeCourseApplicationCreateButton').click();
//   await page.locator('#OpenDegreeCourseApplicationManagementPageButton').click();
//   // await expect(page.locator(`#ApplicationShortYear${degreeCourseData.name}2023`)).toHaveText('WiSe');
//   // await expect(page.locator(`#ApplicationName${degreeCourseData.name}2023`)).toHaveText(`${userData.firstName} ${userData.lastName}`);
// });
