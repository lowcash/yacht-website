import { SectionDivider } from '../shared/SectionDivider'

export function About() {
  return (
    <section
      id='about'
      className='relative flex min-h-screen snap-start flex-col justify-center overflow-hidden py-32 md:py-40'
    >
      {/* Clean Minimalist Background */}
      <div className='absolute inset-0 bg-linear-to-br from-[#f8fbff] via-white to-[#f0f7ff]' />

      {/* Content */}
      <div className='relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <div className='rounded-3xl border border-[#153c60]/5 bg-white/90 p-8 shadow-lg backdrop-blur-sm md:p-12 lg:p-16'>
            <div className='space-y-8'>
              <h2
                className='text-3xl leading-tight tracking-wide text-[#153c60] uppercase md:text-4xl lg:text-5xl'
                style={{
                  fontFamily: 'Anton, sans-serif',
                  textShadow: '0 1px 3px rgba(21, 60, 96, 0.08)',
                }}
              >
                AT <span className='text-[#ff67b1]'>PINK LADY</span>
                <br />
                YACHT SUPPORT SERVICES
              </h2>

              <div
                className='space-y-5 text-base leading-relaxed text-[#153c60]/90 md:text-lg'
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <p className='elegant-text'>
                  We pride ourselves on exceptional service, professionalism, and discretion. Every yacht. Every crew.
                  Every journey expertly managed.
                </p>
                <p className='elegant-text'>Enjoy Thailand's stunning waters knowing your vessel is in expert hands.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <SectionDivider variant='light' />
    </section>
  )
}
