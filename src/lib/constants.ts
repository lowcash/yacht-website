import { Anchor, Banknote, FileText, Fuel, Package, Ship, TrendingUp, Wrench } from 'lucide-react'

const SITE_URL = 'https://pinkladyyachtingservices.com'

export const SECTION_IDS = ['hero', 'services', 'about', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export const NAV_SECTIONS = [
  { id: 'hero' as const, label: 'Home' },
  { id: 'services' as const, label: 'Services' },
  { id: 'about' as const, label: 'About' },
  { id: 'contact' as const, label: 'Contact' },
]

export const HERO_TAGLINES = [
  'Excellence in Every Wave',
  'Where Luxury Meets the Sea',
  'Your Voyage, Our Commitment',
  'Setting Sail with Distinction',
  'Navigating Dreams, Delivering Excellence',
  'Beyond Service, Beyond Expectations',
  'The Art of Yachting Perfected',
  'Seamless Service, Endless Horizons',
  'Charting Your Course to Perfection',
  'Where Every Detail Matters',
] as const

export function pickTagline(random: () => number = Math.random) {
  return HERO_TAGLINES[Math.floor(random() * HERO_TAGLINES.length)]
}

export const PORTS = ['Phuket', 'Krabi', 'Koh Samui'] as const

export const COMPANY_INFO = {
  name: 'Pink Lady Yachting Support Services',
  shortName: 'Pink Lady Yachting Services',
  tagline: 'Premium Yachting Support Services in Thailand',
  description:
    'Professional yacht support services in Thailand. Provisioning, logistics, maintenance, bunkering, and yacht management in Phuket, Krabi, and Koh Samui.',
  analyticsDisclosure:
    'This site uses anonymous Vercel Web Analytics for aggregate visit statistics without advertising cookies.',
  email: 'pinkladyyachtingservices@gmail.com',
  phone: '+66851904836',
  phoneDisplay: '+66 85 190 4836',
  whatsappNumber: '66851904836',
  whatsappMessage: "Hello Pink Lady! I'd like to inquire about your yacht services.",
  address: '141, 2, Mai Khao, Thalang District, Phuket 83110, Thailand',
  locationName: 'Phuket Yacht Haven Marina',
  mapLink: 'https://maps.app.goo.gl/hFHh1NGk5wp2XoRg9',
  url: SITE_URL,
}

export const SERVICES = [
  {
    id: 'provisioning',
    title: 'Provisioning',
    description: 'Complete yachting provisioning services',
    details:
      'From fresh provisions to specialized equipment, we source and deliver everything your yacht needs with efficiency and care.',
    icon: Package,
  },
  {
    id: 'logistics',
    title: 'Logistics',
    description: 'Seamless coordination & delivery',
    details:
      'Expert coordination of all yachting operations including berth arrangements, crew changes, and cargo handling across Thailand.',
    icon: Anchor,
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Expert technical support',
    details:
      'Comprehensive maintenance services with certified technicians ensuring your vessel operates at peak performance.',
    icon: Wrench,
  },
  {
    id: 'bunkering',
    title: 'Bunkering',
    description: 'Fuel supply & management',
    details: 'Reliable fuel supply services with competitive pricing and quality assurance for all vessel types.',
    icon: Fuel,
  },
  {
    id: 'formalities',
    title: 'Formalities',
    description: 'Customs & immigration',
    details: 'Complete assistance with customs clearance, immigration procedures, and all regulatory documentation.',
    icon: FileText,
  },
  {
    id: 'banking',
    title: 'Banking Services',
    description: 'Financial assistance',
    details: 'Currency exchange, payment processing, and financial coordination for smooth operations in Thai waters.',
    icon: Banknote,
  },
  {
    id: 'management',
    title: 'Yachting Management',
    description: 'Full vessel management',
    details:
      'Comprehensive yachting management including crew coordination, maintenance scheduling, and operational oversight.',
    icon: Ship,
  },
  {
    id: 'sales',
    title: 'Sales & Charter',
    description: 'Brokerage services',
    details: 'Professional yachting sales and charter services connecting owners with qualified buyers and charterers.',
    icon: TrendingUp,
  },
]

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${COMPANY_INFO.url}/#business`,
    name: COMPANY_INFO.shortName,
    description: COMPANY_INFO.description,
    url: `${COMPANY_INFO.url}/`,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address,
      addressCountry: 'Thailand',
      addressRegion: 'Phuket',
    },
    areaServed: [
      { '@type': 'City', name: 'Phuket' },
      { '@type': 'City', name: 'Krabi' },
      { '@type': 'City', name: 'Koh Samui' },
    ],
    knowsAbout: [
      'Yacht support',
      'Yacht management',
      'Marine logistics',
      'Yacht provisioning',
      'Bunkering',
      'Yacht maintenance',
      'Marine services',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Yacht Support Services',
      itemListElement: SERVICES.slice(0, 4).map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title.startsWith('Yacht') ? service.title : `Yacht ${service.title}`,
        },
      })),
    },
  }
}
