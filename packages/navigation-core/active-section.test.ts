import { describe, expect, it } from 'vitest'

import { computeActiveSection } from './active-section'
import { buildSectionUrl, normalizeHash, shouldWriteSectionUrl } from './hash'
import { buildSectionBoundaries, resolveScrollBehavior } from './scroll'
import { createSectionRegistry } from './sections'

describe('computeActiveSection', () => {
  const sections = [
    { id: 'hero', offsetTop: 0 },
    { id: 'services', offsetTop: 800 },
    { id: 'about', offsetTop: 1600 },
    { id: 'contact', offsetTop: 2400 },
  ]

  it('returns the section at the marker', () => {
    expect(computeActiveSection({ scrollY: 0, sections, offset: 100 })).toBe('hero')
    expect(computeActiveSection({ scrollY: 750, sections, offset: 100 })).toBe('services')
    expect(computeActiveSection({ scrollY: 1550, sections, offset: 100 })).toBe('about')
  })

  it('selects the bottom section near document end', () => {
    expect(
      computeActiveSection({
        scrollY: 2300,
        sections,
        offset: 100,
        innerHeight: 800,
        documentHeight: 3100,
      }),
    ).toBe('contact')
  })
})

describe('hash helpers', () => {
  it('normalizes hashes', () => {
    expect(normalizeHash('#services')).toBe('services')
    expect(normalizeHash('')).toBeNull()
  })

  it('builds section urls and skips noop writes', () => {
    expect(
      buildSectionUrl({
        pathname: '/',
        search: '',
        sectionId: 'about',
        clearSectionId: 'hero',
      }),
    ).toBe('/#about')
    expect(
      buildSectionUrl({
        pathname: '/',
        search: '',
        sectionId: 'hero',
        clearSectionId: 'hero',
      }),
    ).toBe('/')
    expect(shouldWriteSectionUrl('/#about', '/#about')).toBe(false)
  })
})

describe('scroll helpers', () => {
  it('honors reduced motion for smooth scrolling', () => {
    expect(resolveScrollBehavior('smooth', true)).toBe('auto')
    expect(resolveScrollBehavior('smooth', false)).toBe('smooth')
  })

  it('builds boundaries from resolvers', () => {
    const boundaries = buildSectionBoundaries({
      sectionIds: ['hero', 'missing', 'about'],
      resolveOffsetTop: (id) => (id === 'missing' ? null : id === 'hero' ? 0 : 100),
    })
    expect(boundaries).toEqual([
      { id: 'hero', offsetTop: 0 },
      { id: 'about', offsetTop: 100 },
    ])
  })
})

describe('section registry', () => {
  it('parses known section ids only', () => {
    const registry = createSectionRegistry({ sectionIds: ['hero', 'services'] as const })
    expect(registry.parseSectionId('services')).toBe('services')
    expect(registry.parseSectionId('unknown')).toBeNull()
  })
})
