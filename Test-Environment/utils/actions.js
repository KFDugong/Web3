import { Page } from "@playwright/test";

const envCredentials = {
  username: process.env.ADMIN_LOGIN_USERNAME || "",
  password: process.env.ADMIN_LOGIN_PASSWORD || "",
};

// Vorerst http anstatt https. Weitere Konfiguration nötig, um die SSL Meldung zu umgehen.
const localURL = process.env.BASE_URL;
// const localURL = "http://localhost:3000"

// SSL_UNKOWN_ERROR durch das Zertifikatsprobleme, die von Playwright schwierig abgedeckt werden.
export async function login(page = Page, credentials = envCredentials) {
  await page.goto(localURL);
  const loginButton = page.locator("#OpenLoginDialogButton").last();
  await loginButton.click();
  await page.locator("#LoginDialogUserIDText").click();
  await page.locator("#LoginDialogUserIDText").fill(credentials.username);
  await page.locator("#LoginDialogPasswordText").click();
  await page.locator("#LoginDialogPasswordText").fill(credentials.password);
  await page.locator("#PerformLoginButton").click();
}

export async function createUser(page = Page, userData) {
  await page.locator("#OpenUserManagementPageButton").click();
  await page.locator("#UserManagementPageCreateUserButton").click();
  await page.locator("#CreateUserComponentEditUserID").click();
  await page.locator("#CreateUserComponentEditUserID").fill(userData.userID);
  await page.locator("#CreateUserComponentEditFirstName").click();
  await page
    .locator("#CreateUserComponentEditFirstName")
    .fill(userData.firstName);
  await page.locator("#CreateUserComponentEditLastName").click();
  await page
    .locator("#CreateUserComponentEditLastName")
    .fill(userData.lastName);
  await page.locator("#CreateUserComponentEditPassword").click();
  await page
    .locator("#CreateUserComponentEditPassword")
    .fill(userData.password);
  await page.locator("#CreateUserComponentCreateUserButton").click();
}

export async function createDegreeCourse(page = Page, degreeCourseData) {
  await page.locator("#OpenDegreeCourseManagementPageButton").click();
  await page
    .locator("#DegreeCourseManagementPageCreateDegreeCourseButton")
    .click();
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
  await page.locator("#CreateDegreeCourseComponentEditDepartmentName").click();
  await page
    .locator("#CreateDegreeCourseComponentEditDepartmentName")
    .fill(degreeCourseData.departmentName);
  await page
    .locator("#CreateDegreeCourseComponentEditDepartmentShortName")
    .click();
  await page
    .locator("#CreateDegreeCourseComponentEditDepartmentShortName")
    .fill(degreeCourseData.departmentShortName);
  await page
    .locator("#CreateDegreeCourseComponentCreateDegreeCourseButton")
    .click();
}
