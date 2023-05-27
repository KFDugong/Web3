import { test, expect } from "@playwright/test";
import { login, createUser } from "../../../utils/actions";

const userData = {
  userID: Math.random().toString(36).slice(2, 7),
  firstName: Math.random().toString(36).slice(2, 7),
  lastName: Math.random().toString(36).slice(2, 7),
  password: Math.random().toString(36).slice(2, 7),
};

test("Edit the created user", async ({ page }) => {
  const newFirstName = "Matthias";
  await login(page);
  await createUser(page, userData);

  await page.locator("#OpenUserManagementPageButton").click();
  const userPage = page.locator("#UserManagementPage");
  await expect(userPage).toBeVisible();

  await page.locator("#UserItemEditButton" + userData.userID).click();
  const userIDField = page.locator("#EditUserComponentEditUserID");
  await expect(userIDField).toBeDisabled();
  await page.locator("#EditUserComponentEditFirstName").click();
  await page.locator("#EditUserComponentEditFirstName").fill(newFirstName);
  await page.locator("#EditUserComponentSaveUserButton").click();
  const firstNameField = page.locator(`#${userData.userID}UserCardFirstName`);
  await expect(firstNameField).toHaveText("Matthias");
});
