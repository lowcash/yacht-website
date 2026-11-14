import type { SectionBoundary } from './types'

export function resolveScrollBehavior(requestedBehavior: ScrollBehavior | undefined, prefersReducedMotion: boolean) {
  const behavior = requestedBehavior ?? 'smooth'

  if (behavior === 'smooth' && prefersReducedMotion) {
    return 'auto' satisfies ScrollBehavior
  }

  return behavior
}

export function buildSectionBoundaries(params: {
  sectionIds: readonly string[]
  resolveOffsetTop: (sectionId: string) => number | null
}) {
  const boundaries: SectionBoundary[] = []

  for (const sectionId of params.sectionIds) {
    const offsetTop = params.resolveOffsetTop(sectionId)
    if (typeof offsetTop !== 'number') {
      continue
    }

    boundaries.push({ id: sectionId, offsetTop })
  }

  return boundaries
}
