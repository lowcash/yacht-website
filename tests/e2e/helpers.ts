import { type Page, expect } from '@playwright/test'

export async function gotoHome(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#hero')).toBeVisible()
}

export function getServiceCard(page: Page) {
  return page.locator('#services .card').first()
}

export async function getScrollY(page: Page) {
  return page.evaluate(() => window.scrollY)
}
