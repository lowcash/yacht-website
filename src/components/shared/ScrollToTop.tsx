import { ArrowUp } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'

import { useActiveSection } from '@/components/shared/ActiveSectionContext'
import { isLightSection } from '@/lib/constants'
import { scrollToSection } from '@/lib/navigation-core-adapter'

export function ScrollToTop() {
  const { activeSection, scrollTop } = useActiveSection()
  const light = isLightSection(activeSection)
  const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.3 : 240
  const isVisible = scrollTop > threshold

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
          {isVisible ? (
            <m.button
              type='button'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection('hero')}
              className='group rounded-2xl p-3 transition-all duration-300'
              style={{
                background: light
                  ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
                border: light ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: light
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
                  light ? 'text-[#153c60]' : 'text-white'
                }`}
                style={{
                  filter: light
                    ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
                    : 'drop-shadow(0 0 4px rgba(21, 60, 96, 0.6)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                }}
              />
            </m.button>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
