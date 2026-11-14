import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { resolveMainActiveSection } from '@/lib/navigation-core-adapter'

type ActiveSectionContextType = {
  activeSection: string
  setActiveSection: (section: string) => void
  requestScrollReset: () => void
  scrollResetToken: number
  scrollTop: number
  scrolled: boolean
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined)

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState('hero')
  const [scrollResetToken, setScrollResetToken] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const isScrollingToTop = useRef(false)

  const setActiveSection = useCallback((section: string) => {
    setActiveSectionState(section)
  }, [])

  const requestScrollReset = useCallback(() => {
    isScrollingToTop.current = true
    setScrolled(false)
    setScrollResetToken((token) => token + 1)
  }, [])

  useEffect(() => {
    const main = document.querySelector('main')
    const target: HTMLElement | Window = main ?? window

    const handleScroll = () => {
      const nextScrollTop = main ? main.scrollTop : window.scrollY
      setScrollTop(nextScrollTop)

      if (isScrollingToTop.current) {
        if (nextScrollTop < 50) {
          isScrollingToTop.current = false
        }
        setScrolled(false)
      } else {
        setScrolled(nextScrollTop > 100)
      }

      const currentSection = resolveMainActiveSection(Math.max(100, window.innerHeight / 2))
      if (currentSection) {
        setActiveSectionState(currentSection)
      }
    }

    handleScroll()
    target.addEventListener('scroll', handleScroll, { passive: true })
    return () => target.removeEventListener('scroll', handleScroll)
  }, [])

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      requestScrollReset,
      scrollResetToken,
      scrollTop,
      scrolled,
    }),
    [activeSection, setActiveSection, requestScrollReset, scrollResetToken, scrollTop, scrolled],
  )

  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext)
  if (context === undefined) {
    throw new Error('useActiveSection must be used within ActiveSectionProvider')
  }
  return context
}
