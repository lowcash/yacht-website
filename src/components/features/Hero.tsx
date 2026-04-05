import { useEffect, useState } from 'react'

import { ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'

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

export function Hero() {
  const [quote, setQuote] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  // Parallax effect
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    setQuote(randomQuote)
    setIsTyping(true)
  }, [])

  useEffect(() => {
    const enableVideoDelay = window.setTimeout(() => {
      setIsVideoReady(true)
    }, 800)

    return () => window.clearTimeout(enableVideoDelay)
  }, [])

  // Typing effect
  useEffect(() => {
    if (!isTyping || !quote) return

    let currentIndex = 0
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
  }, [quote, isTyping])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id='hero'
      className='relative flex min-h-screen snap-start items-center justify-center overflow-hidden bg-[#0a2540]'
    >
      {/* Mobile Logo moved to Navigation.tsx */}

      {/* Background Video - More Visible with Parallax */}
      <motion.div className='pointer-events-none absolute inset-0 z-0 h-full w-full' style={{ y }}>
        <div className='pointer-events-none absolute inset-0 h-full w-full overflow-hidden'>
          {isVideoReady ? (
            <iframe
              src='https://www.youtube.com/embed/ZNehZ52kNb0?autoplay=1&mute=1&loop=1&playlist=ZNehZ52kNb0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3'
              className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75'
              style={{
                width: 'max(200vw, 300vh)',
                height: 'max(200vh, 300vw)',
                minWidth: 'max(200vw, 300vh)',
                minHeight: 'max(200vh, 300vw)',
              }}
              allow='autoplay; encrypted-media'
              frameBorder='0'
              loading='lazy'
              title='Background Video'
            />
          ) : null}
          {/* Gradient Overlay - Top & Bottom only for cinematic look */}
          <div className='pointer-events-none absolute inset-0 bg-linear-to-b from-[#0a2540]/60 via-transparent to-[#0a2540]/70' />
          {/* Subtle side vignette */}
          <div className='pointer-events-none absolute inset-0 bg-linear-to-r from-[#0a2540]/40 via-transparent to-[#0a2540]/40' />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className='relative z-10 mx-auto max-w-6xl px-4 pt-32 pb-16 text-center sm:px-6 lg:px-8'
        style={{ opacity }}
      >
        <div className='space-y-8 md:space-y-12'>
          <h1
            className='text-4xl leading-tight tracking-wider uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
            style={{
              fontFamily: 'Anton, sans-serif',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(255, 103, 177, 0.3)',
            }}
          >
            <span className='text-[#ff67b1]'>PINK LADY</span>
            <br />
            <span className='text-white'>YACHTING SERVICES</span>
          </h1>

          <p
            className='mx-auto min-h-[3rem] max-w-4xl text-xl text-white/90 italic md:text-2xl lg:text-3xl'
            style={{
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
            }}
          >
            {displayedText}
            {isTyping && <span className='animate-pulse'>|</span>}
          </p>

          <div className='pt-4 md:pt-8'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('contact')}
                size='lg'
                className='cursor-pointer rounded-full border-2 border-[#ff67b1]/30 bg-[#ff67b1] px-12 py-6 text-xl tracking-wider text-white uppercase shadow-2xl transition-all duration-300 hover:bg-[#ff67b1]/90 md:px-16 md:py-8 md:text-2xl'
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                CONTACT NOW
              </Button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className='flex cursor-pointer flex-col items-center gap-2 opacity-70 transition-opacity hover:opacity-100'
              onClick={() => scrollToSection('services')}
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
              <ChevronDown className='text-[#ff67b1] drop-shadow-lg' size={24} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Section Divider */}
      <SectionDivider variant='dark' />
    </section>
  )
}
