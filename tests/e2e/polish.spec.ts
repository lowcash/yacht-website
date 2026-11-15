import { expect, test } from '@playwright/test'

import { gotoHome } from './helpers'

const VIEWPORTS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]

for (const viewport of VIEWPORTS) {
  test.describe(`Polish at ${viewport.width}px`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(viewport)
      await gotoHome(page)
    })

    test('service card +/x icons sit at the same place in every card', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.locator('#services').scrollIntoViewIfNeeded()
      const rows = await page.locator('#services .card').evaluateAll((cards) =>
        cards.map((card) => {
          const c = card.getBoundingClientRect()
          const b = card.querySelector('.card-more')!.getBoundingClientRect()
          const i = card.querySelector('.card-more svg')!.getBoundingClientRect()
          return {
            top: Math.round(c.top),
            height: Math.round(c.height),
            iconRight: Math.round(c.right - i.right),
            iconBottom: Math.round(c.bottom - i.bottom),
            iconSize: Math.round(i.width),
            btnBottom: Math.round(c.bottom - b.bottom),
          }
        }),
      )
      expect(rows).toHaveLength(8)
      for (const r of rows) {
        expect(r.iconRight).toBe(rows[0].iconRight)
        expect(r.iconBottom).toBe(rows[0].iconBottom)
        expect(r.iconSize).toBe(rows[0].iconSize)
        expect(r.btnBottom).toBe(rows[0].btnBottom)
      }
      // cards in the same grid row share one height
      const byRow = new Map<number, Set<number>>()
      for (const r of rows) byRow.set(r.top, (byRow.get(r.top) ?? new Set()).add(r.height))
      for (const heights of byRow.values()) expect(heights.size).toBe(1)
    })

    test('opening and closing a service dialog causes no layout shift', async ({ page, browserName }) => {
      await page.locator('#services').scrollIntoViewIfNeeded()
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.waitForTimeout(200)
      const snapshot = () =>
        page.evaluate(() => ({
          cards: [...document.querySelectorAll('#services .card, #services .sec-head, #about, #contact')].map((el) => {
            const r = el.getBoundingClientRect()
            return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]
          }),
          docHeight: document.documentElement.scrollHeight,
          scrollWidth: document.documentElement.scrollWidth,
        }))

      if (browserName === 'chromium') {
        await page.evaluate(() => {
          const w = window as unknown as { __cls: number }
          w.__cls = 0
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
              if (!entry.hadRecentInput) w.__cls += entry.value
            }
          }).observe({ type: 'layout-shift', buffered: false })
        })
      }

      const before = await snapshot()
      const card = page.locator('#services .card').nth(3)
      await card.locator('.card-more').click()
      const dialog = card.getByRole('dialog')
      await expect(dialog).toBeVisible()
      const dialogBox = await dialog.boundingBox()
      expect(dialogBox).not.toBeNull()
      expect(dialogBox!.x).toBeGreaterThanOrEqual(0)
      expect(dialogBox!.x + dialogBox!.width).toBeLessThanOrEqual(viewport.width)
      expect(await snapshot()).toEqual(before)
      await dialog.getByRole('button', { name: 'Close' }).click()
      await expect(dialog).toBeHidden()
      expect(await snapshot()).toEqual(before)

      if (browserName === 'chromium') {
        const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls)
        expect(cls).toBe(0)
      }
    })

    test('navigation is a solid navy-deep surface (no translucency, no blur)', async ({ page }) => {
      const read = () =>
        page.locator('.site-header').evaluate((el) => {
          const cs = getComputedStyle(el)
          return { bg: cs.backgroundColor, filter: cs.backdropFilter, opacity: cs.opacity }
        })
      const header = await read()
      expect(header.bg).toMatch(/^(rgb|oklch|color)\(/)
      expect(header.bg).not.toMatch(/rgba|\//) // any alpha channel would show up as rgba() or '/ a'
      expect(['none', '']).toContain(header.filter)
      expect(header.opacity).toBe('1')
      await page.evaluate(() => window.scrollTo(0, 1200))
      expect(await read()).toEqual(header)

      if (viewport.width < 640) {
        await page.getByRole('button', { name: /toggle menu/i }).click()
        const panel = await page.locator('#mobile-menu').evaluate((el) => {
          const cs = getComputedStyle(el)
          return { bg: cs.backgroundColor, filter: cs.backdropFilter }
        })
        expect(panel.bg).toBe(header.bg)
        expect(['none', '']).toContain(panel.filter)
      }
    })

    test('WhatsApp and scroll-to-top form one aligned stack without overlap', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 1400))
      const top = page.getByRole('button', { name: /scroll to top/i })
      const wa = page.locator('.float-actions').getByRole('link', { name: /whatsapp/i })
      await expect(top).toBeVisible()
      await expect(wa).toBeVisible()
      const a = (await top.boundingBox())!
      const b = (await wa.boundingBox())!
      expect(Math.round(a.width)).toBe(Math.round(b.width))
      expect(Math.round(a.height)).toBe(Math.round(b.height))
      expect(Math.round(a.x + a.width / 2)).toBe(Math.round(b.x + b.width / 2))
      const gap = b.y - (a.y + a.height)
      expect(gap).toBeGreaterThanOrEqual(8)
      expect(gap).toBeLessThanOrEqual(16)
      expect(b.x + b.width).toBeLessThanOrEqual(viewport.width)
      expect(b.y + b.height).toBeLessThanOrEqual(viewport.height)
      expect(a.y).toBeGreaterThanOrEqual(0)
    })

    test('no decorative wave texture and no horizontal overflow', async ({ page }) => {
      const hero = await page.locator('#hero').evaluate((el) => {
        const cs = getComputedStyle(el, '::before')
        return { content: cs.content, image: cs.backgroundImage }
      })
      expect(['none', 'normal']).toContain(hero.content)
      expect(hero.image).toBe('none')
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })
  })
}
