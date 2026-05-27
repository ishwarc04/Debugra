import { test, expect } from '@playwright/test';

test('has title and can navigate to authentication modal', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Debugra/);

  // Click the "Join Room" button
  await page.getByRole('button', { name: /Join Room/i }).first().click();

  // Expect an Auth Modal to appear since user is not logged in
  await expect(page.locator('.modal-content')).toBeVisible();
  await expect(page.locator('text=Sign In')).toBeVisible();
});
