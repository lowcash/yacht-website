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

  test('hero has the brand h1, a static tagline and no video embed', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/PINK LADY\s+YACHTING SERVICES/)
    await expect(page.locator('.hero-tag')).not.toBeEmpty()
    await expect(page.locator('#hero iframe')).toHaveCount(0)
  })

  test('prerendered HTML contains real content and no horizontal overflow', async ({ page, request }) => {
    const html = await (await request.get('/')).text()
    expect(html).toContain('<h1')
    expect(html).toContain('COMPREHENSIVE')
    expect(html).toContain('READY TO SET SAIL?')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('marquee lists every service and duplicates it hidden from assistive tech', async ({ page }) => {
    await expect(page.locator('.marquee ul').first().locator('li')).toHaveCount(8)
    await expect(page.locator('.marquee ul[aria-hidden="true"] li')).toHaveCount(8)
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

  test('hamburger menu opens on mobile and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    const menuBtn = page.getByRole('button', { name: /toggle menu/i })
    await expect(menuBtn).toBeVisible()
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    await menuBtn.click()
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true')

    const aboutLink = page.locator('#mobile-menu').getByRole('link', { name: 'About' })
    await expect(aboutLink).toBeVisible()
    await aboutLink.click()
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#about')).toBeInViewport({ ratio: 0.2 })
  })

  test('header links keep working without a view transition API', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.evaluate(() => {
      // simulate engines without document.startViewTransition (smooth scroll fallback)
      ;(document as unknown as { startViewTransition?: unknown }).startViewTransition = undefined
    })
    await page.getByTestId('nav-services').click()
    await expect(page.locator('#services')).toBeInViewport({ ratio: 0.3 })
    await expect(page.getByTestId('nav-services')).toHaveAttribute('aria-current', 'true')
  })
})

test.describe('Services section interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await gotoHome(page)
  })

  test('service cards render eight numbered items with native details', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded()
    await expect(page.locator('#services .card')).toHaveCount(8)
    await expect(page.locator('#services .card details')).toHaveCount(8)
    await expect(page.locator('#services .card-no').first()).toHaveText('01')
  })

  test('opening details reveals the long description without leaving the section', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded()
    const card = getServiceCard(page)
    await card.locator('summary').click()
    await expect(card.locator('details p')).toBeVisible()
    await expect(page.locator('#services')).toBeInViewport({ ratio: 0.1 })
  })
})
