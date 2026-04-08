import { useEffect } from 'react'

import { motion } from 'motion/react'

import { scrollToSection } from '@/lib/section-navigation'

import { useActiveSection } from '../shared/ActiveSectionContext'

const sections = [
  { id: 'hero', label: 'Welcome' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export function SideDotsNavigation() {
  const { activeSection, setActiveSection } = useActiveSection()
  // Define which sections have light backgrounds (need dark text)
  const lightSections = ['about', 'contact']
  const isLightSection = lightSections.includes(activeSection)

  // Tooltip color based on active section
  const getTooltipColor = () => {
    if (isLightSection) {
      return '#ff67b1' // Pink for light sections
    }
    return 'white' // White for dark sections (hero, services)
  }

  useEffect(() => {
    // Use a simpler approach: detect which section the center of viewport is currently in
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if viewport center is within this section
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    // Listen to scroll on main element
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll)
      handleScroll() // Initial call
      return () => mainElement.removeEventListener('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Initial call
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [setActiveSection])

  return (
    <div
      className='pointer-events-none fixed inset-x-0 hidden w-full lg:block'
      style={{ top: '50%', transform: 'translateY(-50%)', zIndex: 70 }}
    >
      <div className='mx-auto flex w-full max-w-6xl px-5 sm:px-6' style={{ justifyContent: 'flex-end' }}>
        <div
          className='relative flex w-fit flex-col items-end gap-4'
          data-testid='side-dots-navigation'
          style={{ pointerEvents: 'auto', zIndex: 70 }}
        >
          {sections.map((section) => (
            <div key={section.id} className='group relative'>
              {/* Tooltip - Minimalist Header Style */}
              <div
                className='pointer-events-none absolute top-1/2 right-full mr-4 -translate-y-1/2 text-sm tracking-wide whitespace-nowrap uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                style={{
                  fontFamily: 'Anton, sans-serif',
                  color: getTooltipColor(),
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                }}
              >
                {section.label}
              </div>

              {/* Dot */}
              <motion.button
                onClick={() => scrollToSection(section.id)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className='relative h-3 w-3 cursor-pointer'
                data-testid={`side-dot-${section.id}`}
                aria-label={`Navigate to ${section.label}`}
                style={{ pointerEvents: 'auto' }}
              >
                {/* Outer ring with glass effect */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: activeSection === section.id ? 1.8 : 1,
                    opacity: activeSection === section.id ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className='absolute inset-0 rounded-full border-2 border-[#ff67b1]'
                  style={{
                    boxShadow: activeSection === section.id ? '0 0 12px rgba(255, 103, 177, 0.4)' : 'none',
                  }}
                />

                {/* Inner dot with gradient */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: activeSection === section.id ? 1 : 0.6,
                    backgroundColor: activeSection === section.id ? '#ff67b1' : '#153c60',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className='absolute inset-0 rounded-full'
                  style={{
                    boxShadow:
                      activeSection === section.id
                        ? '0 0 8px rgba(255, 103, 177, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)'
                        : '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
