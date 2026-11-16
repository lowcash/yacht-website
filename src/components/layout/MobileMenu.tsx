import { useEffect, useRef, useState } from 'react'

import { Menu, X } from 'lucide-react'

import { useActiveSection } from '@/components/shared/ActiveSectionContext'
import { SectionLink } from '@/components/shared/SectionLink'
import { NAV_SECTIONS } from '@/lib/constants'

/** Client leaf: disclosure menu for narrow viewports (the desktop nav is plain markup). */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { activeSection } = useActiveSection()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <>
      <button
        ref={toggleRef}
        type='button'
        className='menu-toggle'
        aria-label='Toggle menu'
        aria-expanded={isOpen}
        aria-controls='mobile-menu'
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <X size={22} strokeWidth={1.75} aria-hidden='true' />
        ) : (
          <Menu size={22} strokeWidth={1.75} aria-hidden='true' />
        )}
      </button>
      <div id='mobile-menu' className='menu-panel' hidden={!isOpen}>
        {NAV_SECTIONS.map((section) => (
          <SectionLink
            key={section.id}
            id={section.id}
            aria-current={activeSection === section.id ? 'true' : undefined}
            onNavigate={() => setIsOpen(false)}
          >
            {section.label}
          </SectionLink>
        ))}
      </div>
    </>
  )
}
