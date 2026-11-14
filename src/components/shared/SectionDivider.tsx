import { m } from 'motion/react'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface SectionDividerProps {
  variant?: 'light' | 'dark'
}

export function SectionDivider({ variant = 'light' }: SectionDividerProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className='absolute right-0 bottom-0 left-0 h-px overflow-hidden'>
      <m.div
        initial={reducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: reducedMotion ? 0 : 1.2, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className={`h-full origin-left ${
          variant === 'light'
            ? 'bg-gradient-to-r from-transparent via-[#153c60]/20 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
        }`}
      />
    </div>
  )
}
