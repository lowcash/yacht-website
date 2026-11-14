import { useEffect, useId, useRef } from 'react'

import { Briefcase, Info, MessageCircle } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'

import { MOBILE_NAV_ITEMS } from '@/lib/constants'
import { useActiveSection } from '@/components/shared/ActiveSectionContext'

const ICONS = {
  services: Briefcase,
  about: Info,
  contact: MessageCircle,
} as const

type MobileMenuOverlayProps = {
  isOpen: boolean
  onClose: () => void
  onNavigate: (id: string) => void
}

export function MobileMenuOverlay({ isOpen, onClose, onNavigate }: MobileMenuOverlayProps) {
  const { activeSection } = useActiveSection()
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    focusable?.[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialog || !focusable || focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence mode='wait'>
      {isOpen ? (
        <m.div
          id='mobile-menu'
          ref={dialogRef}
          role='dialog'
          aria-modal='true'
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className='fixed inset-0 lg:hidden'
          style={{
            zIndex: 250,
            background:
              'linear-gradient(135deg, rgba(21, 60, 96, 0.95) 0%, rgba(21, 60, 96, 0.92) 50%, rgba(255, 103, 177, 0.2) 100%)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          }}
          onClick={onClose}
        >
          <nav className='flex h-full flex-col items-center justify-center px-6' onClick={(e) => e.stopPropagation()}>
            <m.p
              id={titleId}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className='mb-8 text-xs tracking-widest text-white uppercase md:mb-10 md:text-sm'
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Yachting Support Services
            </m.p>

            <div className='w-full max-w-md md:max-w-3xl'>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4'>
                {MOBILE_NAV_ITEMS.map((item) => {
                  const Icon = ICONS[item.id]
                  const isActive = item.id === activeSection
                  return (
                    <button
                      key={item.id}
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation()
                        onNavigate(item.id)
                      }}
                      className={`group flex w-full cursor-pointer items-center gap-4 rounded-2xl border px-6 py-4 transition-all duration-300 md:py-5 ${
                        isActive
                          ? 'border-white/20 bg-white/10'
                          : 'border-white/20 bg-white/10 hover:border-[#ff67b1]/50 hover:bg-white/15'
                      }`}
                      style={{
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        backgroundColor: isActive ? 'rgba(255, 176, 212, 0.08)' : undefined,
                        borderColor: isActive ? 'rgba(255, 176, 212, 0.30)' : undefined,
                        boxShadow: isActive
                          ? '0 4px 24px rgba(255, 176, 212, 0.12), inset 0 1px 0 rgba(255, 176, 212, 0.15)'
                          : '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl md:h-14 md:w-14'>
                        <Icon
                          className='transition-colors'
                          style={{ color: isActive ? '#ffb0d4' : 'white' }}
                          size={24}
                        />
                      </div>
                      <span
                        className='text-lg uppercase transition-colors md:text-xl'
                        style={{
                          fontFamily: 'Anton, sans-serif',
                          letterSpacing: '0.05em',
                          color: isActive ? '#ffb0d4' : 'white',
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </nav>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
