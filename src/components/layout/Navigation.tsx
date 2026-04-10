import { useEffect, useRef, useState } from 'react'

import { Briefcase, Info, Menu, MessageCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import logoImage from '../../assets/pink-lady-logo.png'
import { resolveMainActiveSection, scrollToSection } from '../../lib/section-navigation'
import { useActiveSection } from '../shared/ActiveSectionContext'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { activeSection, setActiveSection } = useActiveSection()
  const isScrollingToTop = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main')
      const scrollPosition = mainElement ? mainElement.scrollTop : window.scrollY

      // If we are forcing scroll to top, ignore the > 100 check and keep it false
      if (isScrollingToTop.current) {
        if (scrollPosition < 50) {
          isScrollingToTop.current = false
        }
        if (scrolled) setScrolled(false)
        return
      }

      // Simple logic: scrolled = true when scroll > 100px
      const newScrolled = scrollPosition > 100

      if (newScrolled !== scrolled) {
        setScrolled(newScrolled)
      }

      const currentSection = resolveMainActiveSection(100)
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => mainElement.removeEventListener('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled, setActiveSection])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSectionNavigation = (id: string) => {
    setIsOpen(false)
    setTimeout(() => {
      scrollToSection(id)
    }, 300)
  }

  const handleLogoClick = () => {
    // Immediate reset
    if (isOpen) setIsOpen(false)
    window.dispatchEvent(new CustomEvent('reset-navigation'))

    // Force scrolled to false immediately and lock it
    isScrollingToTop.current = true
    setScrolled(false)

    handleSectionNavigation('hero')
  }

  // Determine if current section is light (about/contact) or dark (hero/services)
  const isLightSection = activeSection === 'about' || activeSection === 'contact'

  const desktopBrandSurfaceStyle = isLightSection
    ? {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid transparent',
        backdropFilter: 'blur(10px) saturate(105%)',
        WebkitBackdropFilter: 'blur(10px) saturate(105%)',
        boxShadow: 'none',
      }
    : {
        background: 'transparent',
        border: '1px solid transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        boxShadow: 'none',
      }

  const navItems = [
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ]

  return (
    <>
      {/* MOBILE: Floating Logo - Above Everything */}
      <motion.div
        className='fixed flex items-center lg:hidden'
        initial={{ opacity: 1 }}
        animate={{
          opacity: 1,
        }}
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
        <motion.div
          className='relative z-10 flex cursor-pointer items-center'
          style={{
            pointerEvents: 'auto',
          }}
          initial={{ scale: 0.9 }}
          animate={{
            scale: isOpen || !scrolled ? 0.85 : 0.45,
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onClick={handleLogoClick}
          whileHover={{ scale: isOpen || !scrolled ? 0.88 : 0.48 }}
          whileTap={{ scale: isOpen || !scrolled ? 0.82 : 0.42 }}
        >
          <img
            src={logoImage}
            alt='Pink Lady'
            className='h-32 w-auto'
            style={{
              filter:
                'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6)) drop-shadow(0 2px 8px rgba(255, 103, 177, 0.4)) brightness(1.1)',
              transformOrigin: 'center left',
              marginTop: 10,
            }}
          />
        </motion.div>
      </motion.div>

      {/* MOBILE: Navbar with Hamburger */}
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
        {/* Wrapper with all transitions in CSS */}
        <div
          className='relative flex items-center overflow-visible rounded-3xl'
          style={{
            padding: scrolled ? '0.875rem 1.25rem 0.875rem 6.5rem' : '0.875rem',
            justifyContent: scrolled ? 'flex-end' : 'center',
            background: scrolled
              ? isLightSection
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(21, 60, 96, 0.3) 0%, rgba(21, 60, 96, 0.2) 100%)'
              : 'transparent',
            border: scrolled
              ? isLightSection
                ? '1px solid rgba(0, 0, 0, 0.15)'
                : '1px solid rgba(255, 255, 255, 0.25)'
              : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
            boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='relative z-10 shrink-0 rounded-xl p-2.5'
            style={{
              background: isLightSection ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
              color: isLightSection ? '#153c60' : 'white',
              border: `1px solid ${isLightSection ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)'}`,
              transition: 'all 0.3s ease-out',
            }}
            aria-label='Toggle menu'
          >
            <Menu
              className='h-6 w-6'
              style={{
                filter: isLightSection
                  ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
                  : 'drop-shadow(0 0 4px rgba(21, 60, 96, 0.6)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
              }}
            />
          </button>
        </div>
      </div>

      {/* X button - Glass style */}
      <motion.button
        className='fixed rounded-xl p-2.5 lg:hidden'
        style={{
          top: scrolled ? '1.875rem' : '1.875rem',
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
        onClick={() => setIsOpen(false)}
        aria-label='Close menu'
      >
        <X
          className='h-6 w-6'
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
          }}
        />
      </motion.button>

      {/* DESKTOP: Floating Logo - No Wrapper */}
      <div
        className={`fixed top-0 right-0 left-0 z-50 hidden transition-all duration-600 ease-in-out lg:block ${
          scrolled ? 'py-8' : 'py-8'
        }`}
        style={{ pointerEvents: 'none' }}
      >
        {/* Content Container */}
        <div className='mx-auto max-w-7xl px-8'>
          <div className='flex items-center justify-between'>
            {/* Logo Section - Direct, No Wrapper */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSectionNavigation('hero')}
              className='cursor-pointer'
              style={{ pointerEvents: 'auto' }}
            >
              <div
                className='flex items-center gap-4 rounded-3xl px-4 py-3 transition-all duration-600 ease-in-out'
                style={desktopBrandSurfaceStyle}
                data-testid='desktop-brand-surface'
              >
                {/* Logo - Menší zmenšení */}
                <div className='relative'>
                  <img
                    src={logoImage}
                    alt='Pink Lady'
                    className={`w-auto transition-all duration-1000 ease-in-out ${
                      scrolled ? 'h-32 xl:h-36' : 'h-44 xl:h-48'
                    }`}
                    style={{
                      filter: scrolled
                        ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))'
                        : 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                      transitionDuration: '1000ms',
                    }}
                  />
                </div>

                {/* Text - Barva podle sekce */}
                <div>
                  <h1
                    className='text-3xl leading-none tracking-wide text-white uppercase transition-all duration-600 ease-in-out xl:text-4xl'
                    style={{
                      fontFamily: 'Anton, sans-serif',
                      textShadow: scrolled
                        ? '0 2px 4px rgba(0, 0, 0, 0.3)'
                        : '0 4px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <span className='text-[#ff67b1]'>PINK LADY</span>
                  </h1>
                  <p
                    className={`mt-1 text-xs tracking-widest uppercase transition-all duration-600 ease-in-out ${
                      isLightSection ? 'text-[#0f2e4a]' : 'text-white/90'
                    }`}
                    data-testid='desktop-brand-subtitle'
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: scrolled
                        ? isLightSection
                          ? '0 1px 2px rgba(255, 255, 255, 0.45), 0 1px 4px rgba(0, 0, 0, 0.15)'
                          : '0 1px 2px rgba(0, 0, 0, 0.2)'
                        : '0 2px 8px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    Yachting Support Services
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fullscreen Centered Overlay */}
      <AnimatePresence mode='wait'>
        {isOpen && (
          <>
            {/* Fullscreen Dark Backdrop with Heavy Blur */}
            <motion.div
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
              onClick={() => setIsOpen(false)}
            >
              {/* Centered Menu Container */}
              <div
                className='flex h-full flex-col items-center justify-center px-6'
                onClick={(e) => e.stopPropagation()}
              >
                {/* Subtitle at Top */}
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className='mb-8 text-xs tracking-widest text-white uppercase md:mb-10 md:text-sm'
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Yachting Support Services
                </motion.p>

                {/* Menu Items - Stack na mobilu, Grid na tabletu */}
                <div className='w-full max-w-md md:max-w-3xl'>
                  <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4'>
                    {navItems.map((item, _index) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSectionNavigation(item.id)
                          }}
                          className='group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 transition-all duration-300 hover:border-[#ff67b1]/60 hover:bg-white/20 md:py-5'
                          style={{
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff67b1]/30 transition-colors group-hover:bg-[#ff67b1]/50 md:h-14 md:w-14'>
                            <Icon className='text-white' size={24} />
                          </div>
                          <span
                            className='text-lg text-white uppercase md:text-xl'
                            style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em' }}
                          >
                            {item.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
