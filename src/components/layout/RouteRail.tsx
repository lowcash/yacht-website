import { type CSSProperties, useEffect, useRef, useState } from 'react'

import { useActiveSection } from '@/components/shared/ActiveSectionContext'
import { SectionLink } from '@/components/shared/SectionLink'
import { NAV_SECTIONS } from '@/lib/constants'
import { getSectionOffsets } from '@/lib/navigation-core-adapter'
import { computeRailPositions, computeRailProgress } from '@/lib/route'

const ROUTE_PATH = 'M6 0 C 0 12, 12 22, 6 34 S 0 56, 6 68 S 12 88, 6 100'
const DEFAULT_POSITIONS = [0, 34, 68, 100]

/** Pinned route line (>= 80rem): one port per section, drawn by scroll progress. */
export function RouteRail() {
  const { activeSection } = useActiveSection()
  const [positions, setPositions] = useState<number[]>(DEFAULT_POSITIONS)
  const railRef = useRef<HTMLElement>(null)
  const stopsRef = useRef<{ scroll: number[]; pos: number[] }>({ scroll: [0], pos: [0] })

  useEffect(() => {
    let frame = 0

    const paint = () => {
      frame = 0
      const { scroll, pos } = stopsRef.current
      railRef.current?.style.setProperty('--p', String(computeRailProgress(window.scrollY, scroll, pos) / 100))
    }
    const schedule = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(paint)
      }
    }

    const layout = () => {
      const offsets = getSectionOffsets().map((section) => section.offsetTop)
      if (offsets.length !== NAV_SECTIONS.length) {
        return
      }
      const header = document.querySelector<HTMLElement>('.site-header')
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const next = computeRailPositions(offsets, header?.offsetHeight ?? 0, maxScroll)
      setPositions(next)
      // a port lights up exactly when its section becomes active, so the line reaches it at that scroll
      const markerOffset = Math.max(100, window.innerHeight / 2)
      stopsRef.current = {
        scroll: offsets.map((offset, index) =>
          index === 0 ? 0 : Math.min(Math.max(0, maxScroll), Math.max(0, offset - markerOffset)),
        ),
        pos: next,
      }
      schedule()
    }

    layout()
    window.addEventListener('load', layout)
    window.addEventListener('resize', layout)
    window.addEventListener('scroll', schedule, { passive: true })
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(layout) : null
    observer?.observe(document.body)

    return () => {
      window.removeEventListener('load', layout)
      window.removeEventListener('resize', layout)
      window.removeEventListener('scroll', schedule)
      observer?.disconnect()
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <nav
      ref={railRef}
      className='rail'
      aria-label='Section navigation'
      data-testid='route-rail'
      style={{ '--p': 0 } as CSSProperties}
    >
      <svg viewBox='0 0 12 100' preserveAspectRatio='none' aria-hidden='true'>
        <path className='base' d={ROUTE_PATH} pathLength={1} />
        <path className='draw' d={ROUTE_PATH} pathLength={1} />
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
