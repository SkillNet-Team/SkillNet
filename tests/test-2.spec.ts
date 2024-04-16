import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Logo' }).click();
  await page.getByRole('link', { name: 'Join Now' }).click();
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Jane');
  await page.getByPlaceholder('First Name').press('Tab');
  await page.getByPlaceholder('Last Name').fill('Smith');
  await page.getByPlaceholder('Last Name').press('Tab');
  await page.getByPlaceholder('Email').fill('jsmith@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password', { exact: true }).fill('test123');
  await page.getByPlaceholder('Password', { exact: true }).press('Tab');
  await page.getByPlaceholder('Confirm Password').fill('test123');
  await page.getByRole('button', { name: 'Sign Up' }).click();
});