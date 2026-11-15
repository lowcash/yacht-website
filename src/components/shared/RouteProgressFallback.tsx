import { useEffect } from 'react'

import { prefersReducedMotion } from '@/lib/navigation-core-adapter'

/**
 * Drives --p (route progress) from scroll when scroll-driven animations are unsupported.
 * Renders nothing and attaches nothing where `animation-timeline: scroll()` exists
 * or under reduced motion (route stays fully drawn via the @property initial value).
 */
export function RouteProgressFallback() {
  useEffect(() => {
    if (CSS.supports('animation-timeline', 'scroll()') || prefersReducedMotion()) {
      return
    }

    const root = document.documentElement
    let frame = 0

    const update = () => {
      frame = 0
      const max = root.scrollHeight - window.innerHeight
      root.style.setProperty('--p', String(max > 0 ? Math.min(1, window.scrollY / max) : 0))
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
      root.style.removeProperty('--p')
    }
  }, [])

  return null
}
