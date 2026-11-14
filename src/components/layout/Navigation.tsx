import { useCallback, useEffect, useRef, useState } from 'react'

import { useActiveSection } from '@/components/shared/ActiveSectionContext'
import { scrollToSection } from '@/lib/navigation-core-adapter'

import { DesktopBrand } from './DesktopBrand'
import { MobileMenuOverlay } from './MobileMenuOverlay'
import { MobileNavBar } from './MobileNavBar'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrolled, requestScrollReset } = useActiveSection()
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const main = document.querySelector('main')
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (main) {
        main.style.overflow = 'hidden'
      }
    } else {
      document.body.style.overflow = ''
      if (main) {
        main.style.overflow = ''
      }
    }

    return () => {
      document.body.style.overflow = ''
      if (main) {
        main.style.overflow = ''
      }
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (navTimeoutRef.current) {
        clearTimeout(navTimeoutRef.current)
      }
    }
  }, [])

  const handleSectionNavigation = useCallback((id: string) => {
    setIsOpen(false)
    if (navTimeoutRef.current) {
      clearTimeout(navTimeoutRef.current)
    }
    navTimeoutRef.current = setTimeout(() => {
      scrollToSection(id)
    }, 300)
  }, [])

  const handleLogoClick = useCallback(() => {
    if (isOpen) setIsOpen(false)
    requestScrollReset()
    handleSectionNavigation('hero')
  }, [handleSectionNavigation, isOpen, requestScrollReset])

  return (
    <>
      <MobileNavBar
        scrolled={scrolled}
        isOpen={isOpen}
        onToggle={() => setIsOpen((open) => !open)}
        onClose={() => setIsOpen(false)}
        onLogoClick={handleLogoClick}
      />
      <DesktopBrand scrolled={scrolled} />
      <MobileMenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} onNavigate={handleSectionNavigation} />
    </>
  )
}
