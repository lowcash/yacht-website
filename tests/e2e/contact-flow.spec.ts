import { expect, test } from '@playwright/test'

import { gotoHome } from './helpers'

test.describe('Contact flow', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('hero CTA scrolls to contact section', async ({ page }) => {
    const cta = page.getByRole('button', { name: 'CONTACT NOW', exact: true })
    await expect(cta).toBeVisible()
    await cta.click()

    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const main = document.querySelector('main')
            return main ? main.scrollTop : window.scrollY
          }),
        { timeout: 5000 },
      )
      .toBeGreaterThan(50)

    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.1 })
    await expect(page.getByRole('heading', { name: /ready to set sail/i })).toBeVisible()
  })

  test('contact section exposes primary contact actions', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await expect(page.locator('#contact a[href^="tel:"]')).toHaveCount(1)
    await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(1)
    await expect(page.locator('#contact a[target="_blank"][href^="http"]')).toHaveCount(1)
    await expect(page.getByAltText('Line QR Code')).toBeVisible()
  })
})
