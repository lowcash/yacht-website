import { useEffect, useRef } from 'react'

import { useActiveSection } from '@/components/shared/ActiveSectionContext'
import { getHashSectionId, navigateToSection, parseSectionId, setSectionHash } from '@/lib/navigation-core-adapter'

/** Applies the URL hash on load/hashchange and mirrors the active section back into the hash. */
export function HashSync() {
  const { activeSection, setActiveSection } = useActiveSection()
  const hasInitializedHash = useRef(false)

  useEffect(() => {
    const applyHash = () => {
      const hashSectionId = getHashSectionId()

      if (hashSectionId) {
        navigateToSection(hashSectionId, { immediate: true, updateHash: false })
        setActiveSection(hashSectionId)
      }

      hasInitializedHash.current = true
    }

    const frameId = window.requestAnimationFrame(applyHash)
    window.addEventListener('hashchange', applyHash)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('hashchange', applyHash)
    }
  }, [setActiveSection])

  useEffect(() => {
    if (!hasInitializedHash.current) {
      return
    }

    const sectionId = parseSectionId(activeSection)
    if (sectionId) {
      setSectionHash(sectionId)
    }
  }, [activeSection])

  return null
}
