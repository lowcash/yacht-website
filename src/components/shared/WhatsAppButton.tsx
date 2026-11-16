import { MessageCircle } from 'lucide-react'

import { COMPANY_INFO } from '@/lib/constants'

export function buildWhatsAppUrl(service?: string | null) {
  const text = service
    ? `${COMPANY_INFO.whatsappMessage} I am interested in: ${service}.`
    : COMPANY_INFO.whatsappMessage
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`
}

const WHATSAPP_URL = buildWhatsAppUrl()

export function WhatsAppButton() {
  return (
    <a
      className='fab'
      href={WHATSAPP_URL}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Contact us on WhatsApp'
    >
      <MessageCircle aria-hidden='true' />
    </a>
  )
}
