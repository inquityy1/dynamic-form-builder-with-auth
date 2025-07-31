import { test, expect } from '@playwright/test';

test('Full Dynamic Form Flow', async ({ page }) => {
  // Go to login page
  await page.goto('http://localhost:3000/login');

  // Login
  await page.fill('input[placeholder="Username"]', 'admin');
  await page.fill('input[placeholder="Password"]', 'admin123');
  await page.click('button:has-text("Login")');

  // Assert dashboard is visible
  await expect(page.locator('h1')).toHaveText('Admin Dashboard');

  // Add new form
  await page.click('button:has-text("+ Add New Form")');
  await expect(page.locator('h3').nth(1)).toHaveText('Form #2');

  // Fill form
  await page.fill('input[placeholder="Name"]', 'John Doe');
  await page.fill('input[placeholder="Email"]', 'john@example.com');
  await page.fill('textarea[placeholder="Message"]', 'Hello World');

  // Submit form
  await page.click('button:has-text("Submit")');

  // Export this form (check button exists)
  await expect(page.locator('button:has-text("Export This Form")').nth(1)).toBeVisible();

  // Export all submissions
  await expect(page.locator('button:has-text("Export All Submissions")')).toBeVisible();

  // Delete form
  await page.click('button:has-text("Delete")');

  // Logout
  await page.click('button:has-text("Logout")');

  // Verify redirect back to login
  await expect(page.locator('h1')).toHaveText('Login');
});