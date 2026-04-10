import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { motion } from 'motion/react'

import lineQRCode from '../../assets/line-qr-code.webp'
import { COMPANY_INFO } from '../../lib/constants'

export function Contact() {
  return (
    <section
      id='contact'
      className='relative flex min-h-screen snap-start flex-col justify-center overflow-hidden py-32 md:py-40'
    >
      {/* Minimalist Gradient Background */}
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

        {/* Contact Information - Full Width */}
        <div className='mx-auto w-full max-w-2xl' style={{ maxWidth: '39rem' }}>
          <div className='h-full space-y-5 rounded-3xl bg-[#153c60] p-6 text-white md:p-8'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl uppercase' style={{ fontFamily: 'Anton, sans-serif' }}>
                GET IN TOUCH
              </h3>

              {/* Social Media */}
              <div className='flex gap-2'>
                {COMPANY_INFO.social?.facebook && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={COMPANY_INFO.social.facebook}
                    className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[#ff67b1] transition-colors hover:bg-[#ff4d9f]'
                    aria-label='Facebook'
                  >
                    <Facebook size={16} />
                  </motion.a>
                )}
                {COMPANY_INFO.social?.instagram && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={COMPANY_INFO.social.instagram}
                    className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[#ff67b1] transition-colors hover:bg-[#ff4d9f]'
                    aria-label='Instagram'
                  >
                    <Instagram size={16} />
                  </motion.a>
                )}
                {COMPANY_INFO.social?.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={COMPANY_INFO.social.linkedin}
                    className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[#ff67b1] transition-colors hover:bg-[#ff4d9f]'
                    aria-label='LinkedIn'
                  >
                    <Linkedin size={16} />
                  </motion.a>
                )}
              </div>
            </div>

            <div className='space-y-4'>
              <a
                href={COMPANY_INFO.mapLink}
                target='_blank'
                rel='noopener noreferrer'
                className='contact-link group inline-flex cursor-pointer items-center gap-4 transition-all duration-300'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ff67b1] transition-all duration-300'>
                  <MapPin className='h-5 w-5 text-white' />
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
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ff67b1] transition-all duration-300'>
                  <Phone className='h-5 w-5 text-white' />
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
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ff67b1] transition-all duration-300'>
                  <Mail className='h-5 w-5 text-white' />
                </div>
                <div className='transition-all duration-300' style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <p className='contact-text text-sm text-white/80 transition-colors duration-300'>Email</p>
                  <p className='contact-text text-sm break-all whitespace-nowrap text-white transition-colors duration-300'>
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </a>
            </div>

            {/* Line QR Code */}
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

        {/* Contact Form - COMMENTED OUT FOR NOW */}
        {/*
        <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl mt-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label 
                htmlFor="name"
                className="text-[#153c60]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 border-[#153c60]/30 focus:border-[#ff67b1] focus:ring-[#ff67b1]"
                placeholder="Your name"
              />
            </div>

            <div>
              <Label 
                htmlFor="email"
                className="text-[#153c60]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 border-[#153c60]/30 focus:border-[#ff67b1] focus:ring-[#ff67b1]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label 
                htmlFor="message"
                className="text-[#153c60]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 min-h-[120px] border-[#153c60]/30 focus:border-[#ff67b1] focus:ring-[#ff67b1]"
                placeholder="Tell us about your yacht support needs..."
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-[#ff67b1] hover:bg-[#ff4d9f] text-white py-6 text-lg rounded-full uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                SEND MESSAGE
              </Button>
            </motion.div>
          </form>
        </div>
        */}

        {/* Footer Section - Integrated */}
        <div className='relative mt-8 pt-8 md:mt-12 md:pt-12'>
          {/* Minimalist Top Border Gradient */}
          <div className='absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-[#ff67b1] to-transparent opacity-50' />

          <div className='mx-auto flex max-w-2xl flex-col items-center justify-center space-y-4 pb-4 text-center md:space-y-6'>
            {/* Brand */}
            <div>
              <h3
                className='mb-2 text-2xl text-[#153c60] uppercase md:text-3xl'
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                <span className='text-[#ff67b1]'>PINK LADY</span>
              </h3>
              <p className='text-xs text-[#153c60]/70 md:text-sm' style={{ fontFamily: 'Poppins, sans-serif' }}>
                Premium Yachting Services
              </p>
            </div>

            {/* Social Links */}
            <div className='flex gap-3'>
              {COMPANY_INFO.social?.facebook && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={COMPANY_INFO.social.facebook}
                  className='flex h-10 w-10 items-center justify-center rounded-xl border border-[#153c60]/10 bg-[#153c60]/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#ff67b1]/20'
                  aria-label='Facebook'
                >
                  <Facebook size={18} className='text-[#153c60]/70 hover:text-[#ff67b1]' />
                </motion.a>
              )}
              {COMPANY_INFO.social?.instagram && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={COMPANY_INFO.social.instagram}
                  className='flex h-10 w-10 items-center justify-center rounded-xl border border-[#153c60]/10 bg-[#153c60]/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#ff67b1]/20'
                  aria-label='Instagram'
                >
                  <Instagram size={18} className='text-[#153c60]/70 hover:text-[#ff67b1]' />
                </motion.a>
              )}
              {COMPANY_INFO.social?.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={COMPANY_INFO.social.linkedin}
                  className='flex h-10 w-10 items-center justify-center rounded-xl border border-[#153c60]/10 bg-[#153c60]/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#ff67b1]/20'
                  aria-label='LinkedIn'
                >
                  <Linkedin size={18} className='text-[#153c60]/70 hover:text-[#ff67b1]' />
                </motion.a>
              )}
            </div>

            {/* Copyright & Tagline */}
            <div className='space-y-2 pt-3 md:pt-4'>
              <p className='text-xs text-[#153c60]/50 md:text-sm' style={{ fontFamily: 'Poppins, sans-serif' }}>
                © {new Date().getFullYear()} Pink Lady Yacht Support Services. All rights reserved.
              </p>
              <p className='text-xs text-[#153c60]/40' style={{ fontFamily: 'Poppins, sans-serif' }}>
                Proudly serving yacht owners and crews across Thailand's beautiful waters
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
