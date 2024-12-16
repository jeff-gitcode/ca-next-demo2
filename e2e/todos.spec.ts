import { test, expect } from '@playwright/test';
import exp from 'constants';

test('todos e2e test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Todos' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();

  await page.getByRole('link', { name: 'Todos' }).click();
  await expect(page.getByRole('link', { name: 'Create' })).toBeVisible();

  await page.getByRole('link', { name: 'Create' }).click();

  await page.getByPlaceholder('Title').click();
  await page.getByPlaceholder('Title').fill('');
  await page.getByTestId('submit').click();
  await expect(
    page.getByText('String must contain at least 1 character'),
  ).toBeVisible();

  await page.getByPlaceholder('Title').click();
  await page.getByPlaceholder('Title').fill('test02');
  await page.getByPlaceholder('Title').press('Home');
  await page.getByPlaceholder('Title').fill('jefftest02');
  await page.getByTestId('submit').click();
  await expect(
    page.locator('div').filter({ hasText: /^jefftest02EditDelete$/ }),
  ).toBeVisible();

  await page
    .locator('div')
    .filter({ hasText: /^jefftest02EditDelete$/ })
    .getByRole('link')
    .click();
  await page.getByPlaceholder('Title').click();
  await page.getByPlaceholder('Title').fill('jefftest02-update');
  await page.getByTestId('submit').click();
  await expect(
    page.locator('div').filter({ hasText: /^jefftest02-updateEditDelete$/ }),
  ).toBeVisible();

  await page
    .locator('div')
    .filter({ hasText: /^jefftest02-updateEditDelete$/ })
    .getByRole('button')
    .click();
  await page.getByRole('link', { name: 'About' }).click();
});
