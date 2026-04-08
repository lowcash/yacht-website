import { Anchor, Banknote, FileText, Fuel, Package, Ship, TrendingUp, Wrench } from 'lucide-react'

export const SITE_URL = 'https://pinkladyyachtingservices.com'

type SocialLinks = {
  facebook?: string
  instagram?: string
  linkedin?: string
}

export const COMPANY_INFO = {
  name: 'Pink Lady Yachting Support Services',
  tagline: 'Premium Yachting Support Services in Thailand',
  email: 'pinkladyyachtingservices@gmail.com',
  phone: '+66851904836',
  phoneDisplay: '+66 85 190 4836',
  address: '141, 2, Mai Khao, Thalang District, Phuket 83110, Thailand',
  locationName: 'Phuket Yacht Haven Marina',
  mapLink: 'https://maps.app.goo.gl/hFHh1NGk5wp2XoRg9',
  social: {} as SocialLinks,
}

export const NAV_LINKS = [
  { name: 'Welcome', href: 'hero' },
  { name: 'Services', href: 'services' },
  { name: 'About', href: 'about' },
  { name: 'Contact', href: 'contact' },
]

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
