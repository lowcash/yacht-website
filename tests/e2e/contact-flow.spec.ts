import { expect, test } from '@playwright/test'

async function gotoHome(page: import('@playwright/test').Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#hero')).toBeVisible()
}

test.describe('Contact flow', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('hero CTA scrolls to contact section', async ({ page }) => {
    const cta = page.getByRole('button', { name: /contact now/i })
    await expect(cta).toBeVisible()
    await cta.click()

    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.2 })
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
