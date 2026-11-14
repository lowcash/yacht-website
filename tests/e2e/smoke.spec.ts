/**
 * Smoke tests for Pink Lady Yachting Services SPA.
 * Run against the Vite preview server on port 3103.
 */
import { expect, test } from '@playwright/test'

import { getServiceCard, gotoHome } from './helpers'

test.describe('Smoke — page load', () => {
  test.beforeEach(async ({ page }) => {
    await gotoHome(page)
  })

  test('head metadata stays canonical and free of duplicate JSON-LD blocks', async ({ page }) => {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://pinkladyyachtingservices.com/')
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/manifest.webmanifest')
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://pinkladyyachtingservices.com/og-image.png',
    )

    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const manifestResponse = await page.request.get('/manifest.webmanifest')
    expect(manifestResponse.ok()).toBe(true)

    const manifest = (await manifestResponse.json()) as { name: string; short_name: string }
    expect(manifest.name).toBe('Pink Lady Yachting Services')
    expect(manifest.short_name).toBe('Pink Lady')
  })

  test('hero section is visible', async ({ page }) => {
    const hero = page.locator('#hero')
    await expect(hero).toBeVisible()
  })

  test('background video uses click-to-load facade', async ({ page }) => {
    const facade = page.getByTestId('hero-video-facade')
    await expect(facade).toBeVisible()
    await facade.click()
    const iframe = page.locator('#hero iframe[src*="youtube.com/embed"]')
    await expect(iframe).toBeAttached({ timeout: 5000 })
    const src = await iframe.getAttribute('src')
    expect(src).toContain('autoplay=1')
    expect(src).toContain('mute=1')
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

  test('hamburger menu opens on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    const menuBtn = page.getByRole('button', { name: /toggle menu/i })
    await expect(menuBtn).toBeVisible()
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    await menuBtn.click()
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible()
  })
})

test.describe('Services section interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoHome(page)
  })

  test('service card in mobile modal shows Contact Us button that scrolls to #contact', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.locator('#services').scrollIntoViewIfNeeded()
    await expect(page.locator('#services h2')).toBeVisible()

    const firstCard = getServiceCard(page)
    await expect(firstCard).toBeVisible()
    await firstCard.click()

    const ctaButton = page.getByRole('button', { name: 'Contact Us', exact: true })
    await expect(ctaButton).toBeVisible()
    await ctaButton.click()

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
  })
})

