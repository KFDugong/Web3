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

const applicationData = {
    applicantName: Math.random().toString(36).slice(2, 7),
    targetYear: "2024",
}

test('Create degree course application with default settings', async ({ page }) => {
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
});