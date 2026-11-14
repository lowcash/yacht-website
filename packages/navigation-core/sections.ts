import type { SectionRegistryConfig } from './types'

export function createSectionRegistry<SectionId extends string>({ sectionIds }: SectionRegistryConfig<SectionId>) {
  const sectionIdSet = new Set(sectionIds)

  function isSectionId(value: string): value is SectionId {
    return sectionIdSet.has(value as SectionId)
  }

  function parseSectionId(value: string) {
    return isSectionId(value) ? value : null
  }

  return {
    isSectionId,
    parseSectionId,
  }
}
