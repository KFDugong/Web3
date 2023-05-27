import { test, expect } from "@playwright/test";
import { createUser, login } from "../../../utils/actions";

const userData = {
  userID: Math.random().toString(36).slice(2, 7),
  firstName: Math.random().toString(36).slice(2, 7),
  lastName: Math.random().toString(36).slice(2, 7),
  password: Math.random().toString(36).slice(2, 7),
};

test("Delete a user", async ({ page }) => {
  await login(page);
  await createUser(page, userData);
  await page.locator("#OpenUserManagementPageButton").click();
  const userPage = page.locator("#UserManagementPage");
  await expect(userPage).toBeVisible();

  await page.locator(`#UserItemDeleteButton${userData.userID}`).click();
  const modal = page.locator(".modal-content");
  await expect(modal).toBeVisible();
  await page.locator("#DeleteDialogConfirmButton").click();
  const userCard = page.locator(`UserItem${userData.userID}`);
  await expect(userCard).not.toBeVisible();
});
