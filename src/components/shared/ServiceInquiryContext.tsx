import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

import { SERVICES } from '@/lib/constants'

type ServiceInquiryContextType = {
  /** Title of the service the visitor asked about, or null. */
  service: string | null
  setService: (title: string | null) => void
}

const ServiceInquiryContext = createContext<ServiceInquiryContextType | undefined>(undefined)

/** Shared state between the Services CTAs and the Contact section. Also honours `?service=<id>` on load. */
export function ServiceInquiryProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState<string | null>(null)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('service')
    const match = SERVICES.find((item) => item.id === id)
    if (match) {
      setService(match.title)
    }
  }, [])

  const value = useMemo(() => ({ service, setService }), [service])
  return <ServiceInquiryContext.Provider value={value}>{children}</ServiceInquiryContext.Provider>
}

export function useServiceInquiry() {
  const context = useContext(ServiceInquiryContext)
  if (context === undefined) {
    throw new Error('useServiceInquiry must be used within ServiceInquiryProvider')
  }
  return context
}
