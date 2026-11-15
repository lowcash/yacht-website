import type { ComponentProps, MouseEvent } from 'react'

import { navigateToSection } from '@/lib/navigation-core-adapter'

type SectionLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  id: string
  onNavigate?: () => void
}

/**
 * Real anchor (works without JS). With JS the click is routed through the
 * view-transition navigation helper; modified clicks keep native behaviour.
 */
export function SectionLink({ id, onNavigate, onClick, children, ...props }: SectionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    if (navigateToSection(id)) {
      event.preventDefault()
      onNavigate?.()
    }
  }

  return (
    <a href={id === 'hero' ? '#hero' : `#${id}`} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
