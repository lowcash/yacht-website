import { useState } from 'react'

import { COMPANY_INFO, PORTS, pickTagline } from '@/lib/constants'

import { SectionLink } from '../shared/SectionLink'
import { buttonVariants } from '../ui/button'

export function Hero() {
  const [tagline] = useState(() => pickTagline())

  return (
    <section id='hero' className='hero on-dark'>
      <div className='wrap hero-grid'>
        <div>
          <p className='eyebrow'>{PORTS.join(' · ')}</p>
          <h1 className='display'>
            <span className='l1'>PINK LADY</span> YACHTING SERVICES
          </h1>
          <p className='hero-tag'>{tagline}</p>
          <p className='hero-lede'>{COMPANY_INFO.tagline}. Every yacht. Every crew. Every journey expertly managed.</p>
          <div className='hero-actions'>
            <SectionLink id='contact' className={buttonVariants({ variant: 'primary' })}>
              CONTACT NOW
            </SectionLink>
            <SectionLink id='services' className={buttonVariants({ variant: 'ghost' })}>
              Our services
            </SectionLink>
          </div>
          <SectionLink id='services' className='scroll-cue' aria-label='Scroll to services'>
            Scroll
          </SectionLink>
        </div>

        <div className='ports reveal' role='group' aria-labelledby='ports-heading'>
          <h2 id='ports-heading'>Our waters</h2>
          <ol>
            {PORTS.map((port, index) => (
              <li key={port}>
                {port} <span>{String(index + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
