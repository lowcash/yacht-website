/**
 * Smoke tests for Pink Lady Yachting Services SPA.
 *
 * Verify that the core sections render, the navigation functions, and
 * the floating action buttons are positioned within the layout grid
 * (not anchored to the raw viewport edge on wide screens).
 *
 * Run against the Vite preview server: npm run preview (port 4173)
 */
import { type Page, expect, test } from '@playwright/test'

async function gotoHome(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#hero')).toBeVisible()
}

test.describe('Smoke — page load', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('hero section is visible', async ({ page }) => {
    const hero = page.locator('#hero')
    await expect(hero).toBeVisible()
  })

  test('page title is set', async ({ page }) => {
    await expect(page).toHaveTitle(/Pink Lady|Yachting/i)
  })

  test('all main sections exist in the DOM', async ({ page }) => {
    for (const id of ['hero', 'services', 'about', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
  })
})

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('desktop navigation is visible on large viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    const desktopBrand = page.getByText('PINK LADY').first()
    await expect(desktopBrand).toBeVisible()
  })

  test('desktop brand subtitle adapts contrast between dark and light sections', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })

    const subtitle = page.locator('[data-testid="desktop-brand-subtitle"]')
    await expect(subtitle).toBeVisible()

    await page.locator('[data-testid="side-dot-hero"]').click()

    await expect
      .poll(async () => {
        const color = await subtitle.evaluate((element) => getComputedStyle(element).color)
        return /255|oklab\(/.test(color)
      })
      .toBeTruthy()

    const heroColor = await subtitle.evaluate((element) => getComputedStyle(element).color)

    await page.locator('[data-testid="side-dot-about"]').click()

    await expect
      .poll(async () => {
        const color = await subtitle.evaluate((element) => getComputedStyle(element).color)
        return /21,\s*60,\s*96/.test(color)
      })
      .toBeTruthy()

    const aboutColor = await subtitle.evaluate((element) => getComputedStyle(element).color)
    expect(aboutColor).not.toBe(heroColor)
  })

  test('hamburger menu opens on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    const menuBtn = page.getByRole('button', { name: /toggle menu/i })
    await expect(menuBtn).toBeVisible()
    await menuBtn.click()
    await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible()
  })
})

test.describe('Floating controls layout', () => {
  test('WhatsApp button is within the max-w-6xl container, not at raw viewport edge', async ({ page }) => {
    test.skip(
      test.info().project.name !== 'desktop-chrome',
      'Floating control edge assertions are desktop layout checks.',
    )

    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHome(page)

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

    // Keep a small safe offset from the raw left edge to avoid viewport-anchored regressions.
    expect(box.x).toBeGreaterThan(16)
  })

  test('ScrollToTop button is within the max-w-6xl container, not at raw viewport edge', async ({ page }) => {
    test.skip(
      test.info().project.name !== 'desktop-chrome',
      'Floating control edge assertions are desktop layout checks.',
    )

    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHome(page)

    // Scroll down so the ScrollToTop button becomes visible
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

    // Right edge of the button should be well inside the viewport
    // On 1440px: max-w-6xl right edge is at ~1296px; button should be left of ~1310px
    expect(box.x + box.width).toBeLessThan(1320)
  })

  test('side dots stay inside container and support click-through navigation', async ({ page }) => {
    test.skip(test.info().project.name !== 'desktop-chrome', 'Side dots are desktop-only navigation.')

    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHome(page)

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
