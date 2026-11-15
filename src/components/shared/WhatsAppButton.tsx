import { MessageCircle } from 'lucide-react'

import { COMPANY_INFO } from '@/lib/constants'

export const WHATSAPP_URL = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(COMPANY_INFO.whatsappMessage)}`

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
