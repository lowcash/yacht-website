import { useEffect, useState } from 'react'

import { COMPANY_INFO, PORTS, pickTagline } from '@/lib/constants'

import { SectionLink } from '../shared/SectionLink'
import { buttonVariants } from '../ui/button'

type SaveDataConnection = { connection?: { saveData?: boolean } }

/** Video is skipped (poster only) under reduced motion or Save-Data. Runs after mount, so SSR stays poster-only. */
function shouldPlayVideo() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = (navigator as Navigator & SaveDataConnection).connection?.saveData === true
  return !reduced && !saveData
}

export function Hero() {
  const [tagline] = useState(() => pickTagline())
  const [playVideo, setPlayVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    setPlayVideo(shouldPlayVideo())
  }, [])

  return (
    <section id='hero' className='hero on-dark'>
      <div className='hero-media' aria-hidden='true'>
        <picture>
          <source srcSet='/poster.avif' type='image/avif' />
          <source srcSet='/poster.webp' type='image/webp' />
          <img src='/poster.webp' alt='' width={1920} height={1080} fetchPriority='high' decoding='async' />
        </picture>
        {playVideo ? (
          <video
            className={videoReady ? 'is-playing' : undefined}
            muted
            loop
            playsInline
            autoPlay
            preload='metadata'
            tabIndex={-1}
            onPlaying={() => setVideoReady(true)}
          >
            <source src='/video/hero-720.mp4' type='video/mp4' media='(max-width: 767px)' />
            <source src='/video/hero-1080.webm' type='video/webm' />
            <source src='/video/hero-1080.mp4' type='video/mp4' />
          </video>
        ) : null}
        <div className='hero-scrim' />
      </div>
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
