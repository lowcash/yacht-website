export type SectionBoundary = {
  id: string
  offsetTop: number
}

export type ComputeActiveSectionInput = {
  scrollY: number
  sections: SectionBoundary[]
  offset: number
  innerHeight?: number
  documentHeight?: number
  bottomEpsilon?: number
}

export type ScrollTargetOptions = {
  behavior?: ScrollBehavior
  updateHash?: boolean
}

export type SectionRegistryConfig<SectionId extends string> = {
  sectionIds: readonly SectionId[]
}
