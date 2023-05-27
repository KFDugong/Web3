import { test, expect } from "@playwright/test";
import { createDegreeCourse, login } from "../../../utils/actions";

const degreeCourseData = {
    name: Math.random().toString(36).slice(2, 7),
    shortName: Math.random().toString(36).slice(2, 7),
    universityName: Math.random().toString(36).slice(2, 7),
    universityShortName: Math.random().toString(36).slice(2, 7),
    departmentName: Math.random().toString(36).slice(2, 7),
    departmentShortName: Math.random().toString(36).slice(2, 7)
}

const secondDegreeCourseData = {
    name: Math.random().toString(36).slice(2, 7),
    shortName: Math.random().toString(36).slice(2, 7),
    universityName: Math.random().toString(36).slice(2, 7),
    universityShortName: Math.random().toString(36).slice(2, 7),
    departmentName: Math.random().toString(36).slice(2, 7),
    departmentShortName: Math.random().toString(36).slice(2, 7)
}

const applicationData = {
    applicantName: Math.random().toString(36).slice(2, 7),
    targetYear: "2024",
}

test('Delete degree course application', async ({ page }) => {
    await login(page);
    await createDegreeCourse(page, degreeCourseData);

    const degreeCourseCard = page.locator(`#DegreeCourseItem${degreeCourseData.name}`);
    await expect(degreeCourseCard).toBeVisible();
    await page.locator('#OpenDegreeCourseManagementPageButton').click();
    await page.locator(`#CreateDegreeCourseApplicationForDegreeCourse${degreeCourseData.name}`).click();

    await expect(page.locator('#CreateDegreeComponentEditDepartmentShortName')).toBeDisabled();
    await expect(page.locator('#CreateDegreeComponentEditDepartmentShortName')).toHaveValue(degreeCourseData.name);

    await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').click();
    await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').type("2024")
    await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodName').selectOption({ label: 'Winter semester' });
    await page.locator('#CreateDegreeCourseApplicationCreateButton').click();

    await expect(page.locator('#DegreeCourseManagementPage')).toBeVisible();

    await page.locator('#OpenDegreeCourseApplicationManagementPageButton').click();
    await expect(page.locator(`#DegreeCourseApplicationItem${degreeCourseData.name + applicationData.targetYear}`)).toBeVisible();

    await page.locator(`#DegreeCourseApplicationItemDeleteButton${degreeCourseData.name}${applicationData.targetYear}`).click();
    await page.locator('#DeleteDialogConfirmButton').click();
    await expect(page.locator(`#DegreeCourseApplicationItem${degreeCourseData.name}${applicationData.targetYear}`)).not.toBeVisible();
});

test('Cancel deleting a degree course application', async ({ page }) => {
    await login(page);
    await createDegreeCourse(page, secondDegreeCourseData);

    const degreeCourseCard = page.locator(`#DegreeCourseItem${secondDegreeCourseData.name}`);
    await expect(degreeCourseCard).toBeVisible();
    await page.locator('#OpenDegreeCourseManagementPageButton').click();
    await page.locator(`#CreateDegreeCourseApplicationForDegreeCourse${secondDegreeCourseData.name}`).click();

    await expect(page.locator('#CreateDegreeComponentEditDepartmentShortName')).toBeDisabled();
    await expect(page.locator('#CreateDegreeComponentEditDepartmentShortName')).toHaveValue(secondDegreeCourseData.name);

    await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').click();
    await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodYear').type("2024")
    await page.locator('#CreateDegreeCourseApplicationEditTargetPeriodName').selectOption({ label: 'Winter semester' });
    await page.locator('#CreateDegreeCourseApplicationCreateButton').click();

    await expect(page.locator('#DegreeCourseManagementPage')).toBeVisible();

    await page.locator('#OpenDegreeCourseApplicationManagementPageButton').click();
    await expect(page.locator(`#DegreeCourseApplicationItem${secondDegreeCourseData.name + applicationData.targetYear}`)).toBeVisible();

    await page.locator(`#DegreeCourseApplicationItemDeleteButton${secondDegreeCourseData.name}${applicationData.targetYear}`).click();
    await page.locator('#DeleteDialogCancelButton').click();
    await expect(page.locator(`#DegreeCourseApplicationItem${secondDegreeCourseData.name + applicationData.targetYear}`)).toBeVisible();
}); 