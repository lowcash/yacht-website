import { useEffect, useState } from 'react'

import { ScrollToTop } from './ScrollToTop'
import { WhatsAppButton } from './WhatsAppButton'

const MOBILE_QUERY = '(max-width: 47.99rem)'
const EDGE_PX = 120
const DELTA_PX = 8

/**
 * Mobile only (< 768px): the stack hides while scrolling down and returns on scroll up
 * or near the top/bottom of the page, so it never covers content. Desktop stays always visible.
 */
function useHideOnScrollDown() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE_QUERY)
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      if (!mobile.matches) {
        setHidden(false)
        lastY = window.scrollY
        return
      }
      const y = window.scrollY
      const nearTop = y < EDGE_PX
      const nearBottom = document.documentElement.scrollHeight - (y + window.innerHeight) < EDGE_PX
      const delta = y - lastY
      if (nearTop || nearBottom) {
        setHidden(false)
        lastY = y
      } else if (Math.abs(delta) >= DELTA_PX) {
        setHidden(delta > 0)
        lastY = y
      }
    }

    const onScroll = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    mobile.addEventListener('change', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      mobile.removeEventListener('change', onScroll)
      if (frame !== 0) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return hidden
}

export function FloatingActions() {
  const hidden = useHideOnScrollDown()

  return (
    <div className='float-actions' data-hidden={hidden}>
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  )
}
