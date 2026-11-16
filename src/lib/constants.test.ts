import { describe, expect, it } from 'vitest'

import { HERO_TAGLINES, NAV_SECTIONS, SECTION_IDS, SERVICES, pickTagline } from './constants'

describe('constants', () => {
  it('keeps the four-section hash model in sync with navigation', () => {
    expect(NAV_SECTIONS.map((section) => section.id)).toEqual([...SECTION_IDS])
  })

  it('picks a hero tagline from the configured set', () => {
    expect(HERO_TAGLINES).toContain(pickTagline(() => 0))
    expect(pickTagline(() => 0.9999)).toBe(HERO_TAGLINES[HERO_TAGLINES.length - 1])
  })

  it('has unique service ids', () => {
    expect(new Set(SERVICES.map((service) => service.id)).size).toBe(SERVICES.length)
  })
})
