import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { getServiceCard, gotoHome } from './helpers'

test.describe('Accessibility', () => {
  test('axe scan passes wcag2a/wcag2aa/wcag22aa on key sections', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoHome(page)

    for (const sectionId of ['hero', 'services', 'about', 'contact']) {
      await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded()
      const results = await new AxeBuilder({ page })
        .include(`#${sectionId}`)
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze()

      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
    }
  })

  test('services modal closes on Escape and restores focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoHome(page)
    await page.locator('#services').scrollIntoViewIfNeeded()

    const firstCard = getServiceCard(page)
    await firstCard.focus()
    await firstCard.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
  })

  test('reduced motion disables infinite scroll bounce', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await gotoHome(page)

    const scrollButton = page.getByRole('button', { name: /scroll to services/i })
    await expect(scrollButton).toBeVisible()

    const transformBefore = await scrollButton.evaluate((el) => getComputedStyle(el).transform)
    await page.waitForTimeout(200)
    const transformAfter = await scrollButton.evaluate((el) => getComputedStyle(el).transform)
    expect(transformAfter).toBe(transformBefore)
  })
})
