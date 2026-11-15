import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { getServiceCard, gotoHome } from './helpers'

test.describe('Accessibility', () => {
  test('axe scan passes wcag2a/wcag2aa/wcag22aa on key sections', async ({ page }) => {
    // scroll-driven reveals are mid-fade while sections enter; contrast is measured on the settled state
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoHome(page)

    for (const selector of ['.site-header', '.rail', '#hero', '.strip', '#services', '#about', '#contact', 'footer']) {
      await page.locator(selector).first().scrollIntoViewIfNeeded()
      const results = await new AxeBuilder({ page })
        .include(selector)
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze()

      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
    }
  })

  test('axe scan passes on mobile with the menu open', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoHome(page)
    await page.getByRole('button', { name: /toggle menu/i }).click()

    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze()
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
  })

  test('service dialog opens with the keyboard, traps focus semantics, closes on Escape and returns focus', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoHome(page)
    await page.locator('#services').scrollIntoViewIfNeeded()

    const card = getServiceCard(page)
    const trigger = card.getByRole('button', { name: /^details/i })
    await trigger.focus()
    await page.keyboard.press('Enter')
    const dialog = card.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAccessibleName('Provisioning')
    const results = await new AxeBuilder({ page })
      .include('.service-dialog[open]')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('mobile menu closes on Escape and restores focus to the toggle', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoHome(page)

    const toggle = page.getByRole('button', { name: /toggle menu/i })
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
  })

  test('reduced motion: reveal animations are off, route fully drawn', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHome(page)

    const card = getServiceCard(page)
    expect(await card.evaluate((el) => getComputedStyle(el).animationName)).toBe('none')
    expect(await card.evaluate((el) => getComputedStyle(el).opacity)).toBe('1')

    const progress = await page
      .locator('.rail .draw')
      .evaluate((el) => getComputedStyle(el).getPropertyValue('--p').trim())
    expect(progress).toBe('1')
  })
})
