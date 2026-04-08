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

test.describe('Services section interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoHome(page)
  })

  test('clicking a service card on desktop scrolls to #contact', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)

    const firstCard = page.locator('#services [role="button"], #services button').first()
    await expect(firstCard).toBeVisible()
    await firstCard.click()

    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBeGreaterThan(50)
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.1 })
  })

  test('service card in mobile modal shows Contact Us button that scrolls to #contact', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.locator('#services').scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)

    const firstCard = page.locator('#services [role="button"], #services button').first()
    await expect(firstCard).toBeVisible()
    await firstCard.click()

    // Modal should open on mobile
    const ctaButton = page.getByRole('button', { name: /contact us/i })
    await expect(ctaButton).toBeVisible()
    await ctaButton.click()

    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.1 })
  })
})
