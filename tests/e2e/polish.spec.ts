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

    test('navigation is transparent over the hero and turns into blurred glass on scroll', async ({ page }) => {
      const read = () =>
        page.locator('.site-header').evaluate((el) => {
          const cs = getComputedStyle(el)
          return { bg: cs.backgroundColor, image: cs.backgroundImage, filter: cs.backdropFilter }
        })
      const top = await read()
      expect(top.bg).toBe('rgba(0, 0, 0, 0)')
      expect(['none', '']).toContain(top.filter)

      await page.evaluate(() => window.scrollTo(0, 1200))
      await expect(page.locator('.site-header')).toHaveAttribute('data-scrolled', 'true')
      await expect.poll(async () => (await read()).filter).toContain('blur')
      expect((await read()).bg).toMatch(/^(rgba|rgb|oklch|color)\(/)

      if (viewport.width < 640) {
        await page.getByRole('button', { name: /toggle menu/i }).click()
        const panel = await page.locator('#mobile-menu').evaluate((el) => getComputedStyle(el).backgroundColor)
        expect(panel).not.toBe('rgba(0, 0, 0, 0)')
      }
    })

    test('WhatsApp and scroll-to-top form one aligned stack without overlap', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, 1400))
      // on mobile the stack hides while scrolling down; a small scroll up brings it back
      await page.waitForTimeout(100)
      await page.evaluate(() => window.scrollBy(0, -40))
      await page.waitForTimeout(500) // let the slide-in transition settle
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

    test('floating stack: hides on scroll down on mobile only, returns on scroll up and near the edges', async ({
      page,
    }) => {
      const stack = page.locator('.float-actions')
      const hidden = () => stack.evaluate((el) => getComputedStyle(el).visibility === 'hidden')
      const scrollTo = async (y: number) => {
        await page.evaluate((top) => window.scrollTo(0, top), y)
        await page.waitForTimeout(150)
      }
      await scrollTo(600)
      await scrollTo(1200)
      if (viewport.width < 768) {
        await expect.poll(hidden).toBe(true)
        await scrollTo(1100)
        await expect.poll(hidden).toBe(false)
        await scrollTo(1300)
        await expect.poll(hidden).toBe(true)
        await scrollTo(0)
        await expect.poll(hidden).toBe(false)
        await page.evaluate(() => window.scrollTo(0, 800))
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
        await expect.poll(hidden).toBe(false)
      } else {
        await expect.poll(hidden).toBe(false)
        await scrollTo(1600)
        expect(await hidden()).toBe(false)
      }
    })

    test('navigation is slim (56-64px) with a hairline and no translucency', async ({ page }) => {
      const header = await page.locator('.site-header').evaluate((el) => {
        const cs = getComputedStyle(el)
        return { height: el.getBoundingClientRect().height, border: cs.borderBottomWidth }
      })
      expect(header.height).toBeGreaterThanOrEqual(56)
      expect(header.height).toBeLessThanOrEqual(64)
      expect(header.border).toBe('1px')
    })

    test('only the hero is viewport-tall; other sections stack at content height without snapping', async ({
      page,
    }) => {
      const info = await page.evaluate(() => {
        const html = getComputedStyle(document.documentElement)
        const body = getComputedStyle(document.body)
        const sections = ['hero', 'services', 'about', 'contact'].map((id) => {
          const el = document.getElementById(id)!
          const cs = getComputedStyle(el)
          const kids = [...el.children].reduce((sum, c) => sum + c.getBoundingClientRect().height, 0)
          return { id, min: cs.minHeight, height: el.getBoundingClientRect().height, kids }
        })
        return { snapHtml: html.scrollSnapType, snapBody: body.scrollSnapType, sections }
      })
      expect(info.snapHtml).toBe('none')
      expect(info.snapBody).toBe('none')
      for (const s of info.sections) {
        if (s.id === 'hero') {
          expect(s.height).toBeGreaterThanOrEqual(viewport.height - 1)
        } else {
          expect(['0px', 'auto']).toContain(s.min)
          // content plus symmetric padding only: no big empty area
          expect(s.height - s.kids).toBeLessThanOrEqual(Math.max(viewport.width * 0.08, 64) * 2 + 4)
        }
      }
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
