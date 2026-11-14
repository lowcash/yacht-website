import { useEffect, useState } from 'react'

import { ChevronDown, Play } from 'lucide-react'
import { m, useScroll, useTransform } from 'motion/react'

import { useMainScrollRef } from '@/components/shared/MainScrollContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { scrollToSection } from '@/lib/navigation-core-adapter'
import { SectionDivider } from '../shared/SectionDivider'
import { Button } from '../ui/button'

const QUOTES = [
  'Excellence in Every Wave',
  'Where Luxury Meets the Sea',
  'Your Voyage, Our Commitment',
  'Setting Sail with Distinction',
  'Navigating Dreams, Delivering Excellence',
  'Beyond Service, Beyond Expectations',
  'The Art of Yachting Perfected',
  'Seamless Service, Endless Horizons',
  'Charting Your Course to Perfection',
  'Where Every Detail Matters',
]

const YOUTUBE_ID = 'ZNehZ52kNb0'
const YOUTUBE_EMBED = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`
const YOUTUBE_POSTER = `https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`

function pickQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

export function Hero() {
  const [quote] = useState(pickQuote)
  const reducedMotion = usePrefersReducedMotion()
  const [displayedText, setDisplayedText] = useState(reducedMotion ? quote : '')
  const [isTyping, setIsTyping] = useState(!reducedMotion)
  const [videoActive, setVideoActive] = useState(false)
  const mainRef = useMainScrollRef()

  const { scrollY } = useScroll({ container: mainRef })
  const y = useTransform(scrollY, [0, 500], [0, reducedMotion ? 0 : 150])
  const opacity = useTransform(scrollY, [0, 300], [1, reducedMotion ? 1 : 0])

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(quote)
      setIsTyping(false)
      return
    }

    let currentIndex = 0
    setDisplayedText('')
    setIsTyping(true)
    const typingInterval = setInterval(() => {
      if (currentIndex <= quote.length) {
        setDisplayedText(quote.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [quote, reducedMotion])

  return (
    <section
      id='hero'
      className='relative flex min-h-screen snap-start items-center justify-center overflow-hidden bg-[var(--color-navy-deep)]'
    >
      <m.div className='pointer-events-none absolute inset-0 z-0 h-full w-full' style={{ y }}>
        <div className='pointer-events-none absolute inset-0 h-full w-full overflow-hidden'>
          {videoActive && !reducedMotion ? (
            <iframe
              src={YOUTUBE_EMBED}
              className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75'
              style={{
                width: 'max(200vw, 300vh)',
                height: 'max(200vh, 300vw)',
                minWidth: 'max(200vw, 300vh)',
                minHeight: 'max(200vh, 300vw)',
              }}
              allow='autoplay; encrypted-media'
              title='Background video'
              tabIndex={-1}
              aria-hidden='true'
            />
          ) : (
            <div
              className='absolute inset-0 bg-cover bg-center'
              style={{ backgroundImage: `url(${YOUTUBE_POSTER})` }}
              aria-hidden='true'
            />
          )}
          <div className='pointer-events-none absolute inset-0 bg-linear-to-b from-[var(--color-navy-deep)]/60 via-transparent to-[var(--color-navy-deep)]/70' />
          <div className='pointer-events-none absolute inset-0 bg-linear-to-r from-[var(--color-navy-deep)]/40 via-transparent to-[var(--color-navy-deep)]/40' />
        </div>
      </m.div>

      {!videoActive && !reducedMotion ? (
        <button
          type='button'
          className='absolute top-28 right-4 z-20 flex cursor-pointer items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-white backdrop-blur-sm md:top-36 md:right-8'
          onClick={() => setVideoActive(true)}
          aria-label='Play background video'
          data-testid='hero-video-facade'
        >
          <Play className='h-4 w-4' aria-hidden='true' />
          <span className='text-sm' style={{ fontFamily: 'Poppins, sans-serif' }}>
            Play video
          </span>
        </button>
      ) : null}

      <m.div
        className='relative z-10 mx-auto max-w-6xl px-4 pt-32 pb-16 text-center sm:px-6 lg:px-8'
        style={{ opacity, pointerEvents: 'auto' }}
      >
        <div className='space-y-8 md:space-y-12'>
          <h1
            className='text-4xl leading-tight tracking-wider uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
            style={{
              fontFamily: 'Anton, sans-serif',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(255, 103, 177, 0.3)',
            }}
          >
            <span className='text-[var(--color-pink)]'>PINK LADY</span>
            <br />
            <span className='text-white'>YACHTING SERVICES</span>
          </h1>

          <p
            className='mx-auto min-h-[3rem] max-w-4xl text-xl text-white/90 italic md:text-2xl lg:text-3xl'
            style={{
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
            }}
            aria-live='polite'
          >
            {displayedText}
            {isTyping && !reducedMotion ? (
              <span className='animate-pulse' aria-hidden='true'>
                |
              </span>
            ) : null}
          </p>

          <div className='pt-4 md:pt-8'>
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('contact')}
                size='lg'
                className='cursor-pointer rounded-full border-2 border-[var(--color-pink-cta)]/30 bg-[var(--color-pink-cta)] px-12 py-6 text-xl tracking-wider text-white uppercase shadow-2xl transition-all duration-300 hover:bg-[var(--color-pink-hover)] md:px-16 md:py-8 md:text-2xl'
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                CONTACT NOW
              </Button>
            </m.div>
          </div>

          <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
            <m.button
              type='button'
              animate={reducedMotion ? undefined : { y: [0, 10, 0] }}
              transition={reducedMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className='flex cursor-pointer flex-col items-center gap-2 border-0 bg-transparent opacity-70 transition-opacity hover:opacity-100'
              onClick={() => scrollToSection('services')}
              aria-label='Scroll to services'
            >
              <span
                className='text-sm tracking-wider text-white uppercase'
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                }}
              >
                Scroll
              </span>
              <ChevronDown className='text-[var(--color-pink)] drop-shadow-lg' size={24} aria-hidden='true' />
            </m.button>
          </div>
        </div>
      </m.div>

      <SectionDivider variant='dark' />
    </section>
  )
}
