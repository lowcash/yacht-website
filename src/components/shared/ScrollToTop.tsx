import { useEffect, useState } from 'react'

import { ArrowUp } from 'lucide-react'

import { navigateToSection } from '@/lib/navigation-core-adapter'

/** Client leaf: back-to-top button, revealed after 30% of a viewport of scrolling. */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setIsVisible(window.scrollY > window.innerHeight * 0.3)
    }

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <button
      type='button'
      className='fab fab-top'
      data-visible={isVisible}
      onClick={() => navigateToSection('hero')}
      aria-label='Scroll to top'
    >
      <ArrowUp aria-hidden='true' />
    </button>
  )
}
