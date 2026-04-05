export const SECTION_IDS = ['hero', 'services', 'about', 'contact'] as const

type SectionId = (typeof SECTION_IDS)[number]

type ScrollToSectionOptions = {
  behavior?: ScrollBehavior
  updateHash?: boolean
}

function isSectionId(value: string): value is SectionId {
  return SECTION_IDS.includes(value as SectionId)
}

function getMainScrollContainer() {
  return document.querySelector('main')
}

export function setSectionHash(sectionId: SectionId) {
  const nextUrl =
    sectionId === 'hero'
      ? `${window.location.pathname}${window.location.search}`
      : `${window.location.pathname}${window.location.search}#${sectionId}`

  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

  if (currentUrl !== nextUrl) {
    window.history.replaceState(null, '', nextUrl)
  }
}

export function scrollToSection(
  sectionId: string,
  { behavior = 'smooth', updateHash = true }: ScrollToSectionOptions = {},
) {
  if (!isSectionId(sectionId)) {
    return false
  }

  const main = getMainScrollContainer()
  const section = document.getElementById(sectionId)

  if (!main || !section) {
    return false
  }

  const targetTop = sectionId === 'hero' ? 0 : section.offsetTop

  main.scrollTo({ top: targetTop, behavior })

  if (updateHash) {
    setSectionHash(sectionId)
  }

  return true
}

export function getHashSectionId() {
  const hashId = window.location.hash.replace('#', '')
  return isSectionId(hashId) ? hashId : null
}