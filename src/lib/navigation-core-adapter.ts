import {
  buildSectionBoundaries,
  buildSectionUrl,
  computeActiveSection,
  createSectionRegistry,
  normalizeHash,
  resolveScrollBehavior,
  shouldWriteSectionUrl,
} from '../../packages/navigation-core'
import { SECTION_IDS, type SectionId } from './constants'

const sectionRegistry = createSectionRegistry({ sectionIds: SECTION_IDS })
const HERO_SECTION_ID: SectionId = 'hero'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown
}

function getCurrentUrl() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`
}

export function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION_QUERY).matches
}

export function parseSectionId(value: string) {
  return sectionRegistry.parseSectionId(value)
}

export function setSectionHash(sectionId: SectionId) {
  const nextUrl = buildSectionUrl({
    pathname: window.location.pathname,
    search: window.location.search,
    sectionId,
    clearSectionId: HERO_SECTION_ID,
  })

  if (!shouldWriteSectionUrl(getCurrentUrl(), nextUrl)) {
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

function jumpToSection(section: HTMLElement, sectionId: SectionId) {
  if (sectionId === HERO_SECTION_ID) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  } else {
    section.scrollIntoView({ behavior: 'instant', block: 'start' })
  }

  section.setAttribute('tabindex', '-1')
  section.focus({ preventScroll: true })
}

type NavigateOptions = {
  /** Skip the view transition and the smooth scroll (initial hash, hashchange). */
  immediate?: boolean
  updateHash?: boolean
}

/**
 * Scroll to a section. Crossfades through a View Transition when supported,
 * falls back to smooth scrollIntoView, and jumps instantly under reduced motion.
 */
export function navigateToSection(sectionId: string, { immediate = false, updateHash = true }: NavigateOptions = {}) {
  const parsedSectionId = parseSectionId(sectionId)
  const section = parsedSectionId ? document.getElementById(parsedSectionId) : null

  if (!parsedSectionId || !section) {
    return false
  }

  const commit = () => {
    jumpToSection(section, parsedSectionId)
    if (updateHash) {
      setSectionHash(parsedSectionId)
    }
  }

  const reduced = prefersReducedMotion()
  const transitionDocument = document as ViewTransitionDocument

  if (immediate || reduced) {
    commit()
  } else if (typeof transitionDocument.startViewTransition === 'function') {
    transitionDocument.startViewTransition(commit)
  } else {
    const behavior = resolveScrollBehavior('smooth', reduced)
    if (parsedSectionId === HERO_SECTION_ID) {
      window.scrollTo({ top: 0, behavior })
    } else {
      section.scrollIntoView({ behavior, block: 'start' })
    }
    if (updateHash) {
      setSectionHash(parsedSectionId)
    }
  }

  return true
}

export function getSectionOffsets() {
  return buildSectionBoundaries({
    sectionIds: SECTION_IDS,
    resolveOffsetTop: (sectionId) => {
      const section = document.getElementById(sectionId)
      if (!section) {
        return null
      }

      return section.getBoundingClientRect().top + window.scrollY
    },
  })
}

export function resolveActiveSection() {
  return computeActiveSection({
    scrollY: window.scrollY,
    sections: getSectionOffsets(),
    offset: Math.max(100, window.innerHeight / 2),
    innerHeight: window.innerHeight,
    documentHeight: document.documentElement.scrollHeight,
  })
}
