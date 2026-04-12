import {
  buildSectionBoundaries,
  buildSectionUrl,
  computeActiveSection,
  createSectionRegistry,
  normalizeHash,
  resolveScrollBehavior,
  shouldWriteSectionUrl,
} from '../../packages/navigation-core'
import type { HashWriteMode, ScrollTargetOptions } from '../../packages/navigation-core'

const SECTION_IDS = ['hero', 'services', 'about', 'contact'] as const

type SectionId = (typeof SECTION_IDS)[number]

const sectionRegistry = createSectionRegistry({ sectionIds: SECTION_IDS })
const HERO_SECTION_ID: SectionId = 'hero'

function getCurrentUrl() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

function getMainScrollContainer() {
  return document.querySelector('main')
}

function getMainScrollMetrics() {
  const main = getMainScrollContainer()

  if (!main) {
    return {
      scrollY: window.scrollY,
      innerHeight: window.innerHeight,
      documentHeight: document.documentElement.scrollHeight,
    }
  }

  return {
    scrollY: main.scrollTop,
    innerHeight: main.clientHeight,
    documentHeight: main.scrollHeight,
  }
}

export function parseSectionId(value: string) {
  return sectionRegistry.parseSectionId(value)
}

export function setSectionHash(sectionId: SectionId, mode: HashWriteMode = 'replace') {
  const nextUrl = buildSectionUrl({
    pathname: window.location.pathname,
    search: window.location.search,
    sectionId,
    clearSectionId: HERO_SECTION_ID,
  })

  if (!shouldWriteSectionUrl(getCurrentUrl(), nextUrl)) {
    return
  }

  if (mode === 'push') {
    window.history.pushState(null, '', nextUrl)
    return
  }

  window.history.replaceState(null, '', nextUrl)
}

export function getHashSectionId() {
  const hashId = normalizeHash(window.location.hash)
  if (!hashId) {
    return null
  }

  return parseSectionId(hashId)
}

export function scrollToSection(
  sectionId: string,
  { behavior = 'smooth', updateHash = true }: ScrollTargetOptions = {},
) {
  const parsedSectionId = parseSectionId(sectionId)
  if (!parsedSectionId) {
    return false
  }

  const main = getMainScrollContainer()
  const section = document.getElementById(parsedSectionId)

  if (!main || !section) {
    return false
  }

  const resolvedBehavior = resolveScrollBehavior(
    behavior,
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const targetTop = parsedSectionId === HERO_SECTION_ID ? 0 : section.offsetTop

  main.scrollTo({ top: targetTop, behavior: resolvedBehavior })

  if (updateHash) {
    setSectionHash(parsedSectionId)
  }

  return true
}

export function resolveMainActiveSection(offset: number) {
  const metrics = getMainScrollMetrics()

  const boundaries = buildSectionBoundaries({
    sectionIds: SECTION_IDS,
    resolveOffsetTop: (sectionId) => {
      const section = document.getElementById(sectionId)
      if (!section) {
        return null
      }

      return section.offsetTop
    },
  })

  return computeActiveSection({
    scrollY: metrics.scrollY,
    sections: boundaries,
    offset,
    innerHeight: metrics.innerHeight,
    documentHeight: metrics.documentHeight,
  })
}
