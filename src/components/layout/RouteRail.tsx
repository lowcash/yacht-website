import { type CSSProperties, useEffect, useState } from 'react'

import { useActiveSection } from '@/components/shared/ActiveSectionContext'
import { SectionLink } from '@/components/shared/SectionLink'
import { NAV_SECTIONS } from '@/lib/constants'
import { getSectionOffsets } from '@/lib/navigation-core-adapter'
import { computeRailPositions } from '@/lib/route'

const ROUTE_PATH = 'M6 0 C 0 12, 12 22, 6 34 S 0 56, 6 68 S 12 88, 6 100'
const DEFAULT_POSITIONS = [0, 34, 68, 100]

/** Pinned route line (>= 80rem): one port per section, drawn by scroll progress. */
export function RouteRail() {
  const { activeSection } = useActiveSection()
  const [positions, setPositions] = useState<number[]>(DEFAULT_POSITIONS)

  useEffect(() => {
    const layout = () => {
      const offsets = getSectionOffsets().map((section) => section.offsetTop)
      if (offsets.length !== NAV_SECTIONS.length) {
        return
      }
      const header = document.querySelector<HTMLElement>('.site-header')
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setPositions(computeRailPositions(offsets, header?.offsetHeight ?? 0, maxScroll))
    }

    layout()
    window.addEventListener('load', layout)
    window.addEventListener('resize', layout)
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(layout) : null
    observer?.observe(document.body)

    return () => {
      window.removeEventListener('load', layout)
      window.removeEventListener('resize', layout)
      observer?.disconnect()
    }
  }, [])

  return (
    <nav className='rail' aria-label='Section navigation' data-testid='route-rail'>
      <svg viewBox='0 0 12 100' preserveAspectRatio='none' aria-hidden='true'>
        <path className='base' d={ROUTE_PATH} pathLength={1} />
        <path className='draw route-progress' d={ROUTE_PATH} pathLength={1} />
      </svg>
      {NAV_SECTIONS.map((section, index) => (
        <SectionLink
          key={section.id}
          id={section.id}
          style={{ '--y': `${positions[index]}%` } as CSSProperties}
          aria-label={`Navigate to ${section.label}`}
          aria-current={activeSection === section.id ? 'true' : undefined}
          data-testid={`rail-port-${section.id}`}
        >
          <span aria-hidden='true'>{section.label}</span>
        </SectionLink>
      ))}
    </nav>
  )
}
