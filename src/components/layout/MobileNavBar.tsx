import { Menu, X } from 'lucide-react'
import { m } from 'motion/react'

import { BrandLogo } from '@/components/shared/BrandLogo'
import { isLightSection } from '@/lib/constants'
import { useActiveSection } from '@/components/shared/ActiveSectionContext'

type MobileNavBarProps = {
  scrolled: boolean
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onLogoClick: () => void
}

export function MobileNavBar({ scrolled, isOpen, onToggle, onClose, onLogoClick }: MobileNavBarProps) {
  const { activeSection } = useActiveSection()
  const light = isLightSection(activeSection)

  return (
    <>
      <m.div
        className='fixed flex items-center lg:hidden'
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          zIndex: 260,
          top: scrolled && !isOpen ? '1.75rem' : '2.5rem',
          left: '0.5rem',
          height: '3rem',
          transition: 'top 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        }}
      >
        <m.button
          type='button'
          className='relative z-10 flex cursor-pointer items-center bg-transparent p-0'
          style={{ pointerEvents: 'auto' }}
          initial={{ scale: 0.9 }}
          animate={{ scale: isOpen || !scrolled ? 0.85 : 0.45 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onClick={onLogoClick}
          whileHover={{ scale: isOpen || !scrolled ? 0.88 : 0.48 }}
          whileTap={{ scale: isOpen || !scrolled ? 0.82 : 0.42 }}
          aria-label='Go to home'
        >
          <BrandLogo
            className='h-32 w-auto'
            style={{
              filter:
                'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6)) drop-shadow(0 2px 8px rgba(255, 103, 177, 0.4)) brightness(1.1)',
              transformOrigin: 'center left',
              marginTop: 10,
            }}
          />
        </m.button>
      </m.div>

      <div
        className='fixed lg:hidden'
        style={{
          top: '1rem',
          right: '1rem',
          left: scrolled ? '1rem' : 'auto',
          zIndex: 200,
          pointerEvents: isOpen ? 'none' : 'auto',
          transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className='relative flex items-center overflow-visible rounded-3xl'
          style={{
            padding: scrolled ? '0.875rem 1.25rem 0.875rem 6.5rem' : '0.875rem',
            justifyContent: scrolled ? 'flex-end' : 'center',
            background: scrolled
              ? light
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(21, 60, 96, 0.3) 0%, rgba(21, 60, 96, 0.2) 100%)'
              : 'transparent',
            border: scrolled
              ? light
                ? '1px solid rgba(0, 0, 0, 0.15)'
                : '1px solid rgba(255, 255, 255, 0.25)'
              : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
            boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <button
            type='button'
            onClick={onToggle}
            className='relative z-10 shrink-0 rounded-xl p-2.5'
            style={{
              background: light ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
              color: light ? '#153c60' : 'white',
              border: `1px solid ${light ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)'}`,
              transition: 'all 0.3s ease-out',
            }}
            aria-label='Toggle menu'
            aria-expanded={isOpen}
            aria-controls='mobile-menu'
          >
            <Menu
              className='h-6 w-6'
              style={{
                filter: light
                  ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
                  : 'drop-shadow(0 0 4px rgba(21, 60, 96, 0.6)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
              }}
            />
          </button>
        </div>
      </div>

      <m.button
        type='button'
        className='fixed rounded-xl p-2.5 lg:hidden'
        style={{
          top: '1.875rem',
          right: scrolled ? 'calc(1rem + 1.25rem)' : '1.875rem',
          zIndex: 300,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'right 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        whileHover={{
          scale: 1.05,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        aria-label='Close menu'
      >
        <X className='h-6 w-6' style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }} />
      </m.button>
    </>
  )
}
