import { type Page, expect, test } from '@playwright/test'

async function gotoHome(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#hero')).toBeVisible()
}

test.describe('Floating controls layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHome(page)
  })

  test('WhatsApp button is within the max-w-6xl container, not at raw viewport edge', async ({ page }) => {
    const btn = page.getByRole('button', { name: /whatsapp/i })
    await expect(btn).toBeVisible()
    const box = await btn.boundingBox()
    expect(box).not.toBeNull()

    if (!box) {
      throw new Error('WhatsApp button should have measurable bounds')
    }

    const hasContainerAncestor = await btn.evaluate((element) => {
      const container = element.closest('.max-w-6xl')
      if (!container) return false

      const style = getComputedStyle(container)
      return style.maxWidth === '1152px'
    })
    expect(hasContainerAncestor).toBeTruthy()

    expect(box.x).toBeGreaterThan(16)
  })

  test('ScrollToTop button is within the max-w-6xl container, not at raw viewport edge', async ({ page }) => {
    await page.evaluate(() => {
      const main = document.querySelector('main')
      if (main) main.scrollTop = 600
      else window.scrollTo(0, 600)
    })

    const btn = page.getByRole('button', { name: /scroll to top/i })
    await expect(btn).toBeVisible()

    const box = await btn.boundingBox()
    expect(box).not.toBeNull()

    if (!box) {
      throw new Error('ScrollToTop button should have measurable bounds')
    }

    expect(box.x + box.width).toBeLessThan(1320)
  })

  test('side dots stay inside container and support click-through navigation', async ({ page }) => {
    const sideDots = page.locator('[data-testid="side-dots-navigation"]')
    await expect(sideDots).toBeVisible()

    const sideDotsBox = await sideDots.boundingBox()
    expect(sideDotsBox).not.toBeNull()

    if (!sideDotsBox) {
      throw new Error('Side dots container should have measurable bounds')
    }

    expect(sideDotsBox.x).toBeGreaterThan(16)
    expect(sideDotsBox.x + sideDotsBox.width).toBeLessThan(1424)

    const aboutDot = page.locator('[data-testid="side-dot-about"]')
    await expect(aboutDot).toBeVisible()
    await aboutDot.click()
    await expect(page.locator('#about')).toBeInViewport({ ratio: 0.2 })

    const contactDot = page.locator('[data-testid="side-dot-contact"]')
    await expect(contactDot).toBeVisible()
    await contactDot.click()
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.2 })
  })
})
