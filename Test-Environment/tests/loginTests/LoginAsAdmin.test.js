import { test, expect } from "@playwright/test";
import { login } from "../../utils/actions";

test("Login as default user: admin", async ({ page }) => {
  await login(page);
  const welcomeMessage = page.locator("h1");
  await expect(welcomeMessage).toHaveText(
    "Welcome, " + process.env.ADMIN_LOGIN_USERNAME + " !"
  );
});

test("Login with wrong credentials", async ({ page }) => {
  await login(page, { username: "1231412", password: "12401994hbjkbl" });
  const errorMessage = page.getByRole("alert");
  await expect(errorMessage).toHaveText("Alles falsch.");
});
