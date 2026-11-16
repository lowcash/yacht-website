import { Mail, MapPin, Phone } from 'lucide-react'

import lineQRCode from '@/assets/line-qr-code.webp'
import { COMPANY_INFO } from '@/lib/constants'

import { useServiceInquiry } from '../shared/ServiceInquiryContext'
import { buildWhatsAppUrl } from '../shared/WhatsAppButton'
import { Button } from '../ui/button'

export function Contact() {
  const { service, setService } = useServiceInquiry()
  const mailto = service
    ? `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Enquiry: ${service}`)}`
    : `mailto:${COMPANY_INFO.email}`

  return (
    <section id='contact' className='section contact'>
      <div className='wrap'>
        <div className='sec-head reveal'>
          <p className='eyebrow'>03 — Contact</p>
          <h2 className='display'>READY TO SET SAIL?</h2>
          <p>Contact us today for personalized yachting assistance anywhere in Thailand.</p>
        </div>

        <div className='panel reveal'>
          <h3>GET IN TOUCH</h3>
          {service ? (
            <p className='inquiry' role='status'>
              Enquiring about: <b>{service}</b>
              <button type='button' onClick={() => setService(null)}>
                Clear
              </button>
            </p>
          ) : null}
          <div className='panel-grid'>
            <ul className='contact-list'>
              <li>
                <a href={COMPANY_INFO.mapLink} target='_blank' rel='noopener noreferrer'>
                  <span className='ico'>
                    <MapPin aria-hidden='true' />
                  </span>
                  <span>
                    <small>{COMPANY_INFO.locationName}</small>
                    <b>{COMPANY_INFO.address}</b>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY_INFO.phone}`}>
                  <span className='ico'>
                    <Phone aria-hidden='true' />
                  </span>
                  <span>
                    <small>Phone</small>
                    <b>{COMPANY_INFO.phoneDisplay}</b>
                  </span>
                </a>
              </li>
              <li>
                <a href={mailto}>
                  <span className='ico'>
                    <Mail aria-hidden='true' />
                  </span>
                  <span>
                    <small>Email</small>
                    <b>{COMPANY_INFO.email}</b>
                  </span>
                </a>
              </li>
            </ul>

            <div className='panel-side'>
              <Button asChild variant='primary'>
                <a href={buildWhatsAppUrl(service)} target='_blank' rel='noopener noreferrer'>
                  Message on WhatsApp
                </a>
              </Button>

              <div className='qr'>
                <img src={lineQRCode} alt='Line QR Code' width={384} height={384} loading='lazy' decoding='async' />
                <div>
                  <h3>CONNECT ON LINE</h3>
                  <p>Scan to chat instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
