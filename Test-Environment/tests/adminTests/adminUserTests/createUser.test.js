import { test, expect } from "@playwright/test";
import { createUser, login } from "../../../utils/actions";

const userData = {
  userID: Math.random().toString(36).slice(2, 7),
  firstName: Math.random().toString(36).slice(2, 7),
  lastName: Math.random().toString(36).slice(2, 7),
  password: Math.random().toString(36).slice(2, 7),
};

test("Successfully create an user", async ({ page }) => {
  await login(page);
  await createUser(page, userData);
  const userCard = page.locator("#UserItem" + userData.userID);
  await expect(userCard).toBeVisible();
});

// Schwer zu testen, ob ein "required" Feld gesetzt wird, da die Meldung vom Browser kommt und nicht den DOM manipuliert. Dadurch kann man nicht nach einem bestimmten Element suchen und bewerten.
// Not calling createUser(page, userData), since we are not filling out all fields
test("Create an user without filling out all fields", async ({ page }) => {
  await login(page);
  await page.locator("#OpenUserManagementPageButton").click();
  const userPage = page.locator("#UserManagementPage");
  await expect(userPage).toBeVisible();

  await page.locator("#UserManagementPageCreateUserButton").click();

  const userID = page.locator("#CreateUserComponentEditUserID");
  await userID.click();
  await userID.fill(userData.userID);
  const firstName = page.locator("#CreateUserComponentEditFirstName");
  await firstName.click();
  await firstName.fill(userData.firstName);
  const lastName = page.locator("#CreateUserComponentEditLastName");
  await lastName.click();
  await lastName.fill(userData.lastName);
  const passwordField = page.locator("#CreateUserComponentEditPassword");
  await passwordField.click();
  await passwordField.fill("");

  await page.locator("#CreateUserComponentCreateUserButton").click();
  await page.waitForTimeout(3 * 1000);
  await expect(page.locator(".modal-content")).toBeVisible();
});

// test('Create an user as admin', async ({ page }) => {
//     await login(page);
//     await page.locator('#OpenUserManagementPageButton').click();
//     const userPage = page.locator('#UserManagementPage');
//     await expect(userPage).toBeVisible();
//     // Fills out the form to create a user
//     await page.locator('#UserManagementPageCreateUserButton').click();
//     await page.locator('#CreateUserComponentEditUserID').click();
//     await page.locator('#CreateUserComponentEditUserID').fill(userData.userID);
//     await page.locator('#CreateUserComponentEditFirstName').click();
//     await page.locator('#CreateUserComponentEditFirstName').fill(userData.firstName);
//     await page.locator('#CreateUserComponentEditLastName').click();
//     await page.locator('#CreateUserComponentEditLastName').fill(userData.lastName);
//     await page.locator('#CreateUserComponentEditPassword').click();
//     await page.locator('#CreateUserComponentEditPassword').fill(userData.password);

//     await page.locator('#CreateUserComponentEditIsAdministrator').selectOption({ label: 'Yes' });
//     await page.locator('#CreateUserComponentCreateUserButton').click();
//     await expect(page.locator('#UserManagementPageListComponent')).toBeVisible();

//     const adminStatus = page.locator(`#${userData.userID}UserCardIsAdmin`);
//     await expect(adminStatus).toHaveText('true');
// });

// test('Delete a user', async ({ page }) => {
//     await login(page);
//     await createUser(page, userData);

//     // await page.locator('#OpenUserManagementPageButton').click();
//     const userPage = page.locator('#UserManagementPage');
//     await expect(userPage).toBeVisible();

//     await page.locator(`#UserItemDeleteButton${userData.userID}`).click();
//     const modal = page.locator('.modal-content')
//     await expect(modal).toBeVisible();
//     await page.locator('#DeleteDialogConfirmButton').click();
//     const userCard = page.locator(`UserItem${userData.userID}`)
//     await expect(userCard).not.toBeVisible();
// });
