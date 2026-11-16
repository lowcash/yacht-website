import { useEffect, useRef } from 'react'

import { SERVICES } from '@/lib/constants'

const SLOW_RATE = 0.2
const EASE = 0.06

/** Pink band with a slow marquee of the services. Hover or focus eases it down to a crawl; reduced motion shows a static list. */
export function ServiceStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return
    let target = 1
    let rate = 1
    let frame = 0
    const step = () => {
      rate += (target - rate) * EASE
      if (Math.abs(target - rate) < 0.005) rate = target
      for (const animation of track.getAnimations()) animation.playbackRate = rate
      frame = rate === target ? 0 : requestAnimationFrame(step)
    }
    const go = (value: number) => () => {
      target = value
      if (!frame) frame = requestAnimationFrame(step)
    }
    const slow = go(SLOW_RATE)
    const fast = go(1)
    const strip = track.parentElement
    strip?.addEventListener('pointerenter', slow)
    strip?.addEventListener('pointerleave', fast)
    return () => {
      cancelAnimationFrame(frame)
      strip?.removeEventListener('pointerenter', slow)
      strip?.removeEventListener('pointerleave', fast)
    }
  }, [])

  return (
    <div className='strip' role='group' aria-label='Services'>
      <div className='strip-track' ref={trackRef}>
        <ul>
          {SERVICES.map((service) => (
            <li key={service.id}>{service.title}</li>
          ))}
        </ul>
        <ul aria-hidden='true' className='strip-copy'>
          {SERVICES.map((service) => (
            <li key={service.id}>{service.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
