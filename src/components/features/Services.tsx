import { useRef } from 'react'

import { Plus, X } from 'lucide-react'

import { SERVICES } from '@/lib/constants'

import { SectionLink } from '../shared/SectionLink'
import { useServiceInquiry } from '../shared/ServiceInquiryContext'
import { buttonVariants } from '../ui/button'

type Service = (typeof SERVICES)[number]

/**
 * Fixed-layout card; the whole tile is the click target (the "Details" button stretches over it via ::after).
 *  The long text lives in a native modal <dialog> (top layer,
 * focus trap, Escape and focus return built in), so opening it never moves the grid.
 */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { setService } = useServiceInquiry()
  const Icon = service.icon
  const titleId = `service-${service.id}-title`

  return (
    <li className='card'>
      <div className='card-top'>
        <span className='card-no'>{String(index + 1).padStart(2, '0')}</span>
        <Icon aria-hidden='true' />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <button
        type='button'
        className='card-more'
        aria-haspopup='dialog'
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Details: ${service.title}`}
      >
        <span>Details</span>
        <Plus aria-hidden='true' />
      </button>

      <dialog
        ref={dialogRef}
        className='service-dialog'
        aria-labelledby={titleId}
        onClick={(event) => {
          // a click on the backdrop targets the dialog element itself
          if (event.target === event.currentTarget) {
            dialogRef.current?.close()
          }
        }}
      >
        <h3 id={titleId}>{service.title}</h3>
        <p>{service.details}</p>
        <SectionLink
          id='contact'
          className={`${buttonVariants({ variant: 'primary' })} card-cta`}
          aria-label={`Ask about this service: ${service.title}`}
          onClick={() => setService(service.title)}
          onNavigate={() => dialogRef.current?.close()}
        >
          Ask about this service
        </SectionLink>
        <button type='button' className='dialog-close' aria-label='Close' onClick={() => dialogRef.current?.close()}>
          <X aria-hidden='true' />
        </button>
      </dialog>
    </li>
  )
}

export function Services() {
  return (
    <section id='services' className='section services on-dark'>
      <div className='wrap'>
        <div className='sec-head reveal'>
          <p className='eyebrow'>01 — Services</p>
          <h2 className='display'>
            COMPREHENSIVE <em>YACHTING SUPPORT SERVICES</em>
          </h2>
          <p>Your one-stop solution for professional yachting operations in Thailand</p>
        </div>

        <ul className='cards'>
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
