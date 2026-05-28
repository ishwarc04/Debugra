import { test, expect } from '@playwright/test';

test('updates advanced editor settings instantly', async ({ page }) => {
  await page.goto('/editor');

  await page.getByRole('button', { name: /Open Settings/i }).click();

  await expect(page.getByText('Tab size')).toBeVisible();

  await page.getByLabel('Tab size').selectOption('2');
  await page.getByLabel('Minimap', { exact: true }).selectOption('disabled');
  await page.getByLabel('Vertical ruler').selectOption('120');

  const editorOptions = await page.evaluate(() => {
    const editor = window.__DEBUGRA_EDITOR__;
    if (!editor) return null;

    const options = editor.getRawOptions();
    const model = editor.getModel();

    return {
      tabSize: model?.getOptions().tabSize,
      minimapEnabled: options.minimap?.enabled,
      rulers: options.rulers,
    };
  });

  expect(editorOptions).not.toBeNull();
  expect(editorOptions.tabSize).toBe(2);
  expect(editorOptions.minimapEnabled).toBe(false);
  expect(editorOptions.rulers).toEqual([{ column: 120 }]);
});
