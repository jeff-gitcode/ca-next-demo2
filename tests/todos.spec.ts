import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/todos');

  const title = await page.innerText('h1');
  expect(title).toBe('Todos');
});
