import { m } from 'motion/react'

import { useActiveSection } from '@/components/shared/ActiveSectionContext'
import { NAV_SECTIONS, isLightSection } from '@/lib/constants'
import { scrollToSection } from '@/lib/navigation-core-adapter'

export function SideDotsNavigation() {
  const { activeSection } = useActiveSection()
  const light = isLightSection(activeSection)
  const tooltipColor = light ? '#ff67b1' : 'white'

  return (
    <nav
      aria-label='Section navigation'
      className='pointer-events-none fixed inset-x-0 hidden w-full lg:block'
      style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 70 }}
    >
      <div className='mx-auto flex w-full max-w-6xl px-5 sm:px-6' style={{ justifyContent: 'flex-end' }}>
        <div
          className='relative flex w-fit flex-col items-end gap-4'
          data-testid='side-dots-navigation'
          style={{ pointerEvents: 'auto', zIndex: 70 }}
        >
          {NAV_SECTIONS.map((section) => (
            <div key={section.id} className='group relative'>
              <div
                className='pointer-events-none absolute top-1/2 right-full mr-4 -translate-y-1/2 text-sm tracking-wide whitespace-nowrap uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                style={{
                  fontFamily: 'Anton, sans-serif',
                  color: tooltipColor,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                }}
              >
                {section.label}
              </div>

              <m.button
                type='button'
                onClick={() => scrollToSection(section.id)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className='relative flex h-6 w-6 cursor-pointer items-center justify-center'
                data-testid={`side-dot-${section.id}`}
                aria-label={`Navigate to ${section.label}`}
                aria-current={activeSection === section.id ? 'true' : undefined}
                style={{ pointerEvents: 'auto' }}
              >
                <m.div
                  initial={false}
                  animate={{
                    scale: activeSection === section.id ? 1.8 : 1,
                    opacity: activeSection === section.id ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className='absolute h-3 w-3 rounded-full border-2 border-[#ff67b1]'
                  style={{
                    boxShadow: activeSection === section.id ? '0 0 12px rgba(255, 103, 177, 0.4)' : 'none',
                  }}
                />

                <m.div
                  initial={false}
                  animate={{
                    scale: activeSection === section.id ? 1 : 0.6,
                    backgroundColor: activeSection === section.id ? '#ff67b1' : '#153c60',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className='absolute h-3 w-3 rounded-full'
                  style={{
                    boxShadow:
                      activeSection === section.id
                        ? '0 0 8px rgba(255, 103, 177, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
                        : '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </m.button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
