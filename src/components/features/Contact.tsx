import { Mail, MapPin, Phone } from 'lucide-react'

import lineQRCode from '@/assets/line-qr-code.webp'
import { COMPANY_INFO } from '@/lib/constants'

export function Contact() {
  return (
    <section
      id='contact'
      className='relative flex min-h-screen snap-start flex-col justify-center overflow-hidden py-32 md:py-40'
    >
      <div className='absolute inset-0 z-0 bg-linear-to-br from-white via-[#fef8fb] to-white' />

      <div className='relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h2
            className='mb-4 text-3xl tracking-wide text-[#153c60] uppercase md:text-4xl lg:text-5xl'
            style={{
              fontFamily: 'Anton, sans-serif',
              textShadow: '0 2px 8px rgba(21, 60, 96, 0.1)',
            }}
          >
            READY TO SET SAIL?
          </h2>
          <p
            className='elegant-text mx-auto max-w-2xl text-base text-[#153c60]/80 md:text-lg'
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Contact us today for personalized yachting assistance anywhere in Thailand.
          </p>
        </div>

        <div className='mx-auto w-full max-w-2xl' style={{ maxWidth: '39rem' }}>
          <div className='h-full space-y-5 rounded-3xl bg-[#153c60] p-6 text-white md:p-8'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl uppercase' style={{ fontFamily: 'Anton, sans-serif' }}>
                GET IN TOUCH
              </h3>
            </div>

            <div className='space-y-4'>
              <a
                href={COMPANY_INFO.mapLink}
                target='_blank'
                rel='noopener noreferrer'
                className='contact-link group inline-flex cursor-pointer items-center gap-4 transition-all duration-300'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-pink)] transition-all duration-300'>
                  <MapPin className='h-5 w-5 text-white' aria-hidden='true' />
                </div>
                <div className='transition-all duration-300' style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <p className='contact-text text-sm text-white/80 transition-colors duration-300'>
                    {COMPANY_INFO.locationName}
                  </p>
                  <p className='contact-text text-sm text-white transition-colors duration-300'>
                    {COMPANY_INFO.address}
                  </p>
                </div>
              </a>

              <br />

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className='contact-link group inline-flex cursor-pointer items-center gap-4 transition-all duration-300'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-pink)] transition-all duration-300'>
                  <Phone className='h-5 w-5 text-white' aria-hidden='true' />
                </div>
                <div className='transition-all duration-300' style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <p className='contact-text text-sm text-white/80 transition-colors duration-300'>Phone</p>
                  <p className='contact-text text-sm text-white transition-colors duration-300'>
                    {COMPANY_INFO.phoneDisplay}
                  </p>
                </div>
              </a>

              <br />

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className='contact-link group inline-flex cursor-pointer items-center gap-4 transition-all duration-300'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-pink)] transition-all duration-300'>
                  <Mail className='h-5 w-5 text-white' aria-hidden='true' />
                </div>
                <div className='transition-all duration-300' style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <p className='contact-text text-sm text-white/80 transition-colors duration-300'>Email</p>
                  <p className='contact-text text-sm break-all whitespace-nowrap text-white transition-colors duration-300'>
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </a>
            </div>

            <div className='border-t border-white/20 pt-4'>
              <div className='space-y-4 text-center'>
                <p className='text-xl uppercase' style={{ fontFamily: 'Anton, sans-serif' }}>
                  CONNECT ON LINE
                </p>
                <div className='flex justify-center'>
                  <div className='rounded-2xl bg-white p-4 shadow-xl'>
                    <img
                      src={lineQRCode}
                      alt='Line QR Code'
                      className='h-40 w-40 object-contain md:h-48 md:w-48'
                      width='384'
                      height='384'
                    />
                  </div>
                </div>
                <p className='text-sm opacity-90' style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Scan to chat instantly
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className='relative mt-8 pt-8 md:mt-12 md:pt-12'>
          <div className='absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-[var(--color-pink)] to-transparent opacity-50' />

          <div className='mx-auto flex max-w-2xl flex-col items-center justify-center space-y-4 pb-4 text-center md:space-y-6'>
            <div>
              <p
                className='mb-2 text-2xl text-[#153c60] uppercase md:text-3xl'
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                <span className='text-[var(--color-pink-on-light)]'>PINK LADY</span>
              </p>
              <p
                className='text-xs text-[var(--color-navy-muted)] md:text-sm'
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Premium Yachting Services
              </p>
            </div>

            <div className='space-y-2 pt-3 md:pt-4'>
              <p
                className='text-xs text-[var(--color-navy-muted)] md:text-sm'
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                © {new Date().getFullYear()} Pink Lady Yacht Support Services. All rights reserved.
              </p>
              <p className='text-xs text-[var(--color-navy-subtle)]' style={{ fontFamily: 'Poppins, sans-serif' }}>
                Proudly serving yacht owners and crews across Thailand's beautiful waters
              </p>
              <p
                className='mx-auto max-w-xl text-xs leading-relaxed text-[var(--color-navy-subtle)]'
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {COMPANY_INFO.analyticsDisclosure}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
