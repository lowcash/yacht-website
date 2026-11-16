import { expect, test } from '@playwright/test'

import { getScrollY, gotoHome } from './helpers'

test.describe('Floating controls layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHome(page)
  })

  test('WhatsApp link sits bottom-right inside the viewport', async ({ page }) => {
    const link = page.locator('.float-actions').getByRole('link', { name: /whatsapp/i })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', /^https:\/\/wa\.me\//)
    const box = await link.boundingBox()
    expect(box).not.toBeNull()
    if (!box) throw new Error('WhatsApp link should have measurable bounds')
    expect(box.x + box.width).toBeLessThanOrEqual(1440 - 16)
    expect(box.y + box.height).toBeLessThanOrEqual(900 - 16)
  })

  test('ScrollToTop appears after scrolling and returns to the top', async ({ page }) => {
    const btn = page.getByRole('button', { name: /scroll to top/i })
    await expect(btn).toBeHidden()

    await page.evaluate(() => window.scrollTo(0, 900))
    await expect(btn).toBeVisible()
    await btn.click()
    await expect.poll(() => getScrollY(page), { timeout: 5000 }).toBeLessThan(5)
  })

  test('route rail shows one port per section and supports click-through navigation', async ({ page }) => {
    const rail = page.getByTestId('route-rail')
    await expect(rail).toBeVisible()
    const box = await rail.boundingBox()
    expect(box).not.toBeNull()
    if (!box) throw new Error('Route rail should have measurable bounds')
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThan(200)

    await expect(rail.locator('a')).toHaveCount(4)

    await page.getByTestId('rail-port-about').click()
    await expect(page.locator('#about')).toBeInViewport({ ratio: 0.2 })
    await expect(page.getByTestId('rail-port-about')).toHaveAttribute('aria-current', 'true')

    await page.getByTestId('rail-port-contact').click()
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.2 })
  })

  test('rail ports map to real section offsets', async ({ page }) => {
    const rail = page.getByTestId('route-rail')
    await expect(rail).toBeVisible()
    await page.waitForTimeout(300)
    const data = await page.evaluate(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const header = document.querySelector<HTMLElement>('.site-header')!.offsetHeight
      const railBox = document.querySelector('.rail')!.getBoundingClientRect()
      return ['hero', 'services', 'about', 'contact'].map((id) => {
        const top = document.getElementById(id)!.getBoundingClientRect().top + window.scrollY
        const expected = Math.min(1, Math.max(0, (id === 'hero' ? 0 : top - header) / maxScroll))
        const port = document.querySelector(`[data-testid="rail-port-${id}"]`)!.getBoundingClientRect()
        const actual = (port.top + port.height / 2 - railBox.top) / railBox.height
        return { id, expected, actual }
      })
    })
    for (const d of data) expect(Math.abs(d.expected - d.actual)).toBeLessThan(0.02)
    for (let i = 1; i < data.length; i++) expect(data[i].actual).toBeGreaterThan(data[i - 1].actual)
  })

  test('route line draws with scroll progress', async ({ page }) => {
    const draw = page.locator('.rail .draw')
    const read = () => draw.evaluate((el) => Number(getComputedStyle(el).getPropertyValue('--p')))
    await page.evaluate(() => window.scrollTo(0, 0))
    await expect.poll(read).toBe(0)
    await expect(page.getByTestId('rail-port-hero')).toHaveAttribute('aria-current', 'true')
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    // the line ends exactly at the last port (contact), which sits above the page foot
    const portFraction = await page.evaluate(() => {
      const rail = document.querySelector('.rail')!.getBoundingClientRect()
      const port = document.querySelector('[data-testid="rail-port-contact"]')!.getBoundingClientRect()
      return (port.top + port.height / 2 - rail.top) / rail.height
    })
    await expect.poll(read).toBeGreaterThan(portFraction - 0.02)
    await expect(page.getByTestId('rail-port-contact')).toHaveAttribute('aria-current', 'true')
  })
})

test.describe('Desktop navigation behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await gotoHome(page)
  })

  test('header marks the active section with aria-current', async ({ page }) => {
    await expect(page.getByTestId('nav-hero')).toHaveAttribute('aria-current', 'true')

    await page.getByTestId('nav-about').click()
    await expect(page.getByTestId('nav-about')).toHaveAttribute('aria-current', 'true')
    await expect(page.getByTestId('nav-hero')).not.toHaveAttribute('aria-current', 'true')
  })

  test('the whole service card opens its details dialog without scrolling', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded()
    const y = await getScrollY(page)
    const card = page.locator('#services .card').first()
    expect(await card.evaluate((el) => getComputedStyle(el).cursor)).toBe('pointer')
    await card.click()
    await expect(card.getByRole('dialog')).toBeVisible()
    expect(Math.abs((await getScrollY(page)) - y)).toBeLessThan(5)
  })

  test('URL hash follows navigation and clears on hero', async ({ page }) => {
    await page.getByTestId('nav-contact').click()
    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('#contact')

    await page.getByTestId('nav-hero').click()
    await expect.poll(() => page.evaluate(() => window.location.hash), { timeout: 3000 }).toBe('')
  })

  test('deep link to #about lands on the About section', async ({ page }) => {
    await page.goto('/#about', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('#about')).toBeInViewport({ ratio: 0.3 })
  })
})
