import { useEffect, useState } from 'react'

import { useActiveSection } from '@/components/shared/ActiveSectionContext'
import { BrandLogo } from '@/components/shared/BrandLogo'
import { SectionLink } from '@/components/shared/SectionLink'
import { NAV_SECTIONS } from '@/lib/constants'

import { MobileMenu } from './MobileMenu'

export function Navigation() {
  const { activeSection } = useActiveSection()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className='site-header' data-scrolled={scrolled ? 'true' : 'false'}>
      <div className='wrap'>
        <SectionLink id='hero' className='brand' aria-label='Pink Lady Yachting Services, home'>
          <BrandLogo className='brand-logo' alt='' sizes='44px' />
          <span className='brand-text'>
            Pink Lady
            <small>Yachting Services</small>
          </span>
        </SectionLink>

        <nav className='nav' aria-label='Main'>
          {NAV_SECTIONS.map((section) => (
            <SectionLink
              key={section.id}
              id={section.id}
              className={section.id === 'contact' ? 'cta' : undefined}
              aria-current={activeSection === section.id ? 'true' : undefined}
              data-testid={`nav-${section.id}`}
            >
              {section.label}
            </SectionLink>
          ))}
        </nav>
        <MobileMenu />
      </div>
      <div className='route-bar' aria-hidden='true'>
        <i className='route-progress' />
      </div>
    </header>
  )
}
