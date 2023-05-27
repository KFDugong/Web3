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

test("Create degree course", async ({ page }) => {
  await login(page);
  await createDegreeCourse(page, degreeCourseData);
  const degreeCourseCard = page.locator(
    `#DegreeCourseItem${degreeCourseData.name}`
  );
  await expect(degreeCourseCard).toBeVisible();
});

test("Create degree course without filling all fields", async ({ page }) => {
  await login(page);
  await page.locator("#OpenDegreeCourseManagementPageButton").click();
  await expect(
    page.locator("#DegreeCourseManagementPageListComponent")
  ).toBeVisible();
  await expect(
    page.locator("#DegreeCourseManagementPageCreateDegreeCourseButton")
  ).toBeVisible();
  await page
    .locator("#DegreeCourseManagementPageCreateDegreeCourseButton")
    .click();
  await expect(page.locator(".modal-content")).toBeVisible();

  await page.locator("#CreateDegreeCourseComponentEditName").click();
  await page
    .locator("#CreateDegreeCourseComponentEditName")
    .fill(degreeCourseData.name);

  await page.locator("#CreateDegreeCourseComponentEditShortName").click();
  await page
    .locator("#CreateDegreeCourseComponentEditShortName")
    .fill(degreeCourseData.shortName);

  await page.locator("#CreateDegreeCourseComponentEditUniversityName").click();
  await page
    .locator("#CreateDegreeCourseComponentEditUniversityName")
    .fill(degreeCourseData.universityName);

  await page
    .locator("#CreateDegreeCourseComponentEditUniversityShortName")
    .click();
  await page
    .locator("#CreateDegreeCourseComponentEditUniversityShortName")
    .fill(degreeCourseData.universityName);

  await page
    .locator("#CreateDegreeCourseComponentCreateDegreeCourseButton")
    .click();

  await page.waitForTimeout(3 * 1000);
  await expect(page.locator(".modal-content")).toBeVisible();
});
