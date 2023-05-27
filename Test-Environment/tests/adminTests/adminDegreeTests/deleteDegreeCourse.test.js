import { test, expect } from "@playwright/test";
import { createDegreeCourse, login } from "../../../utils/actions";

const degreeCourseData = {
  name: Math.random().toString(36).slice(2, 7),
  shortName: Math.random().toString(36).slice(2, 7),
  universityName: Math.random().toString(36).slice(2, 7),
  universityShortName: Math.random().toString(36).slice(2, 7),
  departmentName: Math.random().toString(36).slice(2, 7),
  departmentShortName: Math.random().toString(36).slice(2, 7),
};

test("Delete a degree course", async ({ page }) => {
  await login(page);
  await createDegreeCourse(page, degreeCourseData);

  await expect(
    page.locator("#DegreeCourseManagementPageListComponent")
  ).toBeVisible();

  await page
    .locator(`#DegreeCourseItemDeleteButton${degreeCourseData.name}`)
    .click();
  await page.locator("#DeleteDialogConfirmButton").click();
  await expect(
    page.locator(`#DegreeCourseItem${degreeCourseData.name}`)
  ).not.toBeVisible();
});

test("Cancel deleting a degree course", async ({ page }) => {
  await login(page);
  await createDegreeCourse(page, degreeCourseData);

  await page
    .locator(`#DegreeCourseItemDeleteButton${degreeCourseData.name}`)
    .click();
  await page.locator("#DeleteDialogCancelButton").click();
  await expect(
    page.locator("#DegreeCourseManagementPageListComponent")
  ).toBeVisible();
  await expect(
    page.locator(`#DegreeCourseItem${degreeCourseData.name}`)
  ).toBeVisible();
});
