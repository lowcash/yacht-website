import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

import { resolveActiveSection } from '@/lib/navigation-core-adapter'

type ActiveSectionContextType = {
  activeSection: string
  setActiveSection: (section: string) => void
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined)

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const current = resolveActiveSection()
      if (current) {
        setActiveSection(current)
      }
    }

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  const value = useMemo(() => ({ activeSection, setActiveSection }), [activeSection])

  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext)
  if (context === undefined) {
    throw new Error('useActiveSection must be used within ActiveSectionProvider')
  }
  return context
}
