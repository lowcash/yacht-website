import { m } from 'motion/react'

import { BrandLogo } from '@/components/shared/BrandLogo'
import { isLightSection } from '@/lib/constants'
import { scrollToSection } from '@/lib/navigation-core-adapter'
import { useActiveSection } from '@/components/shared/ActiveSectionContext'

type DesktopBrandProps = {
  scrolled: boolean
}

export function DesktopBrand({ scrolled }: DesktopBrandProps) {
  const { activeSection } = useActiveSection()
  const light = isLightSection(activeSection)

  const desktopBrandSurfaceStyle = light
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

  return (
    <header
      className='fixed top-0 right-0 left-0 z-50 hidden py-8 transition-all duration-600 ease-in-out lg:block'
      style={{ pointerEvents: 'none' }}
    >
      <div className='mx-auto max-w-7xl px-8'>
        <div className='flex items-center justify-between'>
          <m.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('hero')}
            className='cursor-pointer'
            style={{ pointerEvents: 'auto' }}
          >
            <div
              className='flex items-center gap-4 rounded-3xl px-4 py-3 transition-all duration-600 ease-in-out'
              style={desktopBrandSurfaceStyle}
              data-testid='desktop-brand-surface'
            >
              <div className='relative'>
                <BrandLogo
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

              <div>
                <p
                  className='text-3xl leading-none tracking-wide text-white uppercase transition-all duration-600 ease-in-out xl:text-4xl'
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    textShadow: scrolled
                      ? '0 2px 4px rgba(0, 0, 0, 0.3)'
                      : '0 4px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <span className='text-[var(--color-pink)]'>PINK LADY</span>
                </p>
                <p
                  className={`mt-1 text-xs tracking-widest uppercase transition-all duration-600 ease-in-out ${
                    light ? 'text-[#0f2e4a]' : 'text-white/90'
                  }`}
                  data-testid='desktop-brand-subtitle'
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: scrolled
                      ? light
                        ? '0 1px 2px rgba(255, 255, 255, 0.45), 0 1px 4px rgba(0, 0, 0, 0.15)'
                        : '0 1px 2px rgba(0, 0, 0, 0.2)'
                      : '0 2px 8px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  Yachting Support Services
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </header>
  )
}
