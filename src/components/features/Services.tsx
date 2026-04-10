import { useEffect, useState } from 'react'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { SERVICES } from '../../lib/constants'
import { scrollToSection } from '../../lib/section-navigation'
import { SectionDivider } from '../shared/SectionDivider'

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  return (
    <section
      id='services'
      className='relative flex min-h-screen snap-start flex-col justify-center overflow-hidden bg-[#153c60] px-3 py-32 text-white md:px-6 md:py-40'
    >
      {/* Clean Minimalist Background */}
      <div className='absolute inset-0 bg-[#153c60]' />

      {/* Content */}
      <div className='relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center md:mb-16'>
          <h2
            className='mb-4 text-3xl leading-tight tracking-wide uppercase md:text-4xl lg:text-5xl xl:text-6xl'
            style={{
              fontFamily: 'Anton, sans-serif',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <span className='text-white'>COMPREHENSIVE</span>
            <br />
            <span className='text-[#ff67b1]'>YACHTING SUPPORT SERVICES</span>
          </h2>
          <p
            className='mx-auto max-w-2xl text-base text-white/90 md:text-lg'
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Your one-stop solution for professional yachting operations in Thailand
          </p>
        </div>

        {/* Services Grid */}
        <div className='mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4'>
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={service.title} className='relative'>
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    const isMobileViewport = window.innerWidth < 768
                    if (isMobileViewport) {
                      setSelectedIndex(index)
                    } else {
                      scrollToSection('contact')
                    }
                  }}
                  className='group flex h-full cursor-pointer flex-col rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#ff67b1]/50 md:p-6'
                >
                  <div className='mb-4 flex justify-center'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-full border border-[#ff67b1]/40 bg-[#ff67b1]/20 transition-all duration-300 group-hover:bg-[#ff67b1]/30'>
                      <Icon className='h-8 w-8 text-[#ff67b1] transition-transform duration-300 group-hover:scale-110' />
                    </div>
                  </div>
                  <h3
                    className='mb-2 text-lg leading-tight tracking-wide text-white uppercase'
                    style={{ fontFamily: 'Anton, sans-serif' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className='grow text-sm leading-relaxed text-white/75'
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {service.description}
                  </p>

                  {/* Desktop: Tooltip */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ scale: 0.9, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className='absolute bottom-full left-1/2 z-20 mb-3 hidden w-72 -translate-x-1/2 rounded-xl border-2 border-[#ff67b1]/30 bg-white/98 p-4 shadow-2xl backdrop-blur-xl md:block'
                        style={{ pointerEvents: 'none' }}
                      >
                        <div className='mb-2 flex items-start gap-3'>
                          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff67b1]'>
                            <Icon className='h-5 w-5 text-white' />
                          </div>
                          <h4 className='text-sm text-[#153c60] uppercase' style={{ fontFamily: 'Anton, sans-serif' }}>
                            {service.title}
                          </h4>
                        </div>
                        <p
                          className='text-xs leading-relaxed text-[#153c60]'
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {service.details}
                        </p>
                        <div className='absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-[#ff67b1]/30 bg-white/98' />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-500 flex items-center justify-center bg-black/60 p-6 backdrop-blur-md md:hidden'
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className='relative w-full max-w-md rounded-3xl border-2 border-white/40 p-8 shadow-2xl backdrop-blur-xl'
              style={{
                background: 'linear-gradient(135deg, rgba(255, 103, 177, 0.15) 0%, rgba(21, 60, 96, 0.9) 100%)',
                boxShadow:
                  '0 20px 60px rgba(21, 60, 96, 0.3), 0 8px 24px rgba(255, 103, 177, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
              // Removed stopPropagation to allow clicking anywhere to close
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className='absolute top-4 right-4 cursor-pointer p-2 text-white transition-colors hover:text-[#ff67b1]'
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
              >
                <X size={28} />
              </button>

              {selectedIndex !== null && (
                <>
                  <div className='mb-6 flex items-center gap-4'>
                    <div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-lg'>
                      {(() => {
                        const Icon = SERVICES[selectedIndex].icon
                        return <Icon className='h-10 w-10 text-[#ff67b1]' />
                      })()}
                    </div>
                    <h3
                      className='text-3xl text-white uppercase'
                      style={{
                        fontFamily: 'Anton, sans-serif',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {SERVICES[selectedIndex].title}
                    </h3>
                  </div>
                  <p
                    className='text-lg leading-relaxed text-white/95'
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {SERVICES[selectedIndex].details}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedIndex(null)
                      scrollToSection('contact')
                    }}
                    className='mt-6 w-full cursor-pointer rounded-xl bg-[#ff67b1] px-6 py-3 tracking-wide text-white uppercase transition-all hover:bg-[#ff4da6]'
                    style={{ fontFamily: 'Anton, sans-serif' }}
                  >
                    Contact Us
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Divider */}
      <SectionDivider variant='dark' />
    </section>
  )
}
