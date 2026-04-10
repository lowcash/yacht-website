import { useEffect, useState } from 'react'

import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { resolveMainActiveSection, scrollToSection } from '@/lib/section-navigation'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLightSection, setIsLightSection] = useState(false)

  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return

    let hideTimeout: ReturnType<typeof setTimeout> | null = null
    let isResetting = false

    const handleReset = () => {
      setIsVisible(false)
      isResetting = true
      // Unlock after scroll animation (approx 1s)
      setTimeout(() => {
        isResetting = false
      }, 1000)
    }
    window.addEventListener('reset-navigation', handleReset)

    const handleScroll = () => {
      if (isResetting) return

      const currentScrollTop = main.scrollTop
      const shouldShow = currentScrollTop > window.innerHeight * 0.3

      // Clear any pending hide timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout)
        hideTimeout = null
      }

      if (shouldShow) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      const currentSection = resolveMainActiveSection(window.innerHeight - 100) ?? 'hero'

      // Light sections
      const lightSections = ['about', 'contact']
      setIsLightSection(lightSections.includes(currentSection))
    }

    handleScroll() // Initial check
    main.addEventListener('scroll', handleScroll)
    return () => {
      main.removeEventListener('scroll', handleScroll)
      window.removeEventListener('reset-navigation', handleReset)
      if (hideTimeout) clearTimeout(hideTimeout)
    }
  }, [])

  const scrollToTop = () => {
    scrollToSection('hero')
  }

  return (
    <div
      className='pointer-events-none fixed right-0 bottom-6 left-0 z-40'
      style={{ left: 0, right: 0, pointerEvents: 'none' }}
    >
      <div
        className='mx-auto flex w-full max-w-6xl px-5 sm:px-6'
        style={{
          width: '100%',
          maxWidth: '72rem',
          justifyContent: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className='group rounded-2xl p-3 transition-all duration-300'
              style={{
                background: isLightSection
                  ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                border: isLightSection ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: isLightSection
                  ? '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label='Scroll to top'
            >
              <ArrowUp
                className={`h-5 w-5 transition-transform group-hover:scale-110 sm:h-6 sm:w-6 ${
                  isLightSection ? 'text-[#153c60]' : 'text-white'
                }`}
                style={{
                  filter: isLightSection
                    ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
                    : 'drop-shadow(0 0 4px rgba(21, 60, 96, 0.6)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
