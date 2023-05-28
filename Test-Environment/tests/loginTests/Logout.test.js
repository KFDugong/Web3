import { test, expect } from "@playwright/test";
import { login } from "../../utils/actions";

test("Logout as default user: admin", async ({ page }) => {
  await login(page);
  const welcomeMessage = page.locator("h1");
  await expect(welcomeMessage).toHaveText(
    "Welcome, " + process.env.ADMIN_LOGIN_USERNAME + " !"
  );
  await page.locator("#LogoutButton").click();
  await expect(page.locator("h2")).toHaveText(
    "Welcome to our application portal, the platform for your next career move!"
  );
});
