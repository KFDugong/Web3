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

const secondDegreeCourseData = {
  name: Math.random().toString(36).slice(2, 7),
  shortName: Math.random().toString(36).slice(2, 7),
  universityName: Math.random().toString(36).slice(2, 7),
  universityShortName: Math.random().toString(36).slice(2, 7),
  departmentName: Math.random().toString(36).slice(2, 7),
  departmentShortName: Math.random().toString(36).slice(2, 7),
};

test("Edit a degree course", async ({ page }) => {
  const newShortName = "MHT";
  await login(page);
  await createDegreeCourse(page, degreeCourseData);

  await page
    .locator(`#DegreeCourseItemEditButton${degreeCourseData.name}`)
    .click();
  await expect(page.locator(".modal-content")).toBeVisible();
  await expect(page.locator("#EditDegreeCourseComponentEditName")).toHaveValue(
    degreeCourseData.name
  );
  await expect(
    page.locator("#EditDegreeCourseComponentEditShortName")
  ).toHaveValue(degreeCourseData.shortName);
  await expect(
    page.locator("#EditDegreeCourseComponentEditUniversityName")
  ).toHaveValue(degreeCourseData.universityName);

  await expect(
    page.locator("#EditDegreeCourseComponentEditDepartmentName")
  ).toHaveValue(degreeCourseData.departmentName);
  await expect(
    page.locator("#EditDegreeCourseComponentEditDepartmentShortName")
  ).toHaveValue(degreeCourseData.departmentShortName);

  await page.locator("#EditDegreeCourseComponentEditDepartmentName").click();
  await page
    .locator("#EditDegreeCourseComponentEditDepartmentName")
    .fill(newShortName);

  await page
    .locator("#EditDegreeCourseComponentSaveDegreeCourseButton")
    .click();

  await expect(
    page.locator(`#degreeCourseDepartment${degreeCourseData.name}`)
  ).toHaveText("MHT");
});

test("Cancel editing a degree course", async ({ page }) => {
  const newShortName = "BHASDFHT";
  await login(page);
  await createDegreeCourse(page, secondDegreeCourseData);

  await page
    .locator(`#DegreeCourseItemEditButton${secondDegreeCourseData.name}`)
    .click();
  await expect(page.locator(".modal-content")).toBeVisible();

  await page.locator("#EditDegreeCourseComponentEditDepartmentName").click();
  await page
    .locator("#EditDegreeCourseComponentEditDepartmentName")
    .fill(newShortName);

  await page
    .locator("#OpenDegreeCourseManagementPageListComponentButton")
    .click();

  // await expect(page.locator(`#degreeCourseDepartment${degreeCourseData.name}`)).toHaveText(degreeCourseData.departmentName);
  await expect(
    page.locator(`#degreeCourseDepartment${secondDegreeCourseData.name}`)
  ).toHaveText(secondDegreeCourseData.departmentName);
});
