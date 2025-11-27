import { Ship, Anchor, Map, Phone, Mail, Clock, Shield, Award, Users, Zap, FileCheck, Landmark, Settings, Sailboat, Package, Wrench, Fuel, FileText, Banknote, TrendingUp } from "lucide-react";

export const COMPANY_INFO = {
  name: "Pink Lady Yacht Support Services",
  tagline: "Premium Yacht Management in Thailand",
  email: "pinkladyyachtingservices@gmail.com",
  phone: "+66851904836",
  phoneDisplay: "+66 85 190 4836",
  address: "141, 2, Mai Khao, Thalang District, Phuket 83110, Thailand",
  locationName: "Phuket Yacht Haven Marina",
  mapLink: "https://maps.app.goo.gl/hFHh1NGk5wp2XoRg9",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  }
};

export const NAV_LINKS = [
  { name: "Welcome", href: "hero" },
  { name: "Services", href: "services" },
  { name: "About", href: "about" },
  { name: "Stats", href: "stats" },
  { name: "Reviews", href: "testimonials" },
  { name: "Contact", href: "contact" },
];

export const SERVICES = [
  {
    id: "provisioning",
    title: "Provisioning",
    description: "Complete yacht provisioning services",
    details: "From fresh provisions to specialized equipment, we source and deliver everything your yacht needs with efficiency and care.",
    icon: Package,
  },
  {
    id: "logistics",
    title: "Logistics",
    description: "Seamless coordination & delivery",
    details: "Expert coordination of all yacht operations including berth arrangements, crew changes, and cargo handling across Thailand.",
    icon: Anchor,
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Expert technical support",
    details: "Comprehensive maintenance services with certified technicians ensuring your vessel operates at peak performance.",
    icon: Wrench,
  },
  {
    id: "bunkering",
    title: "Bunkering",
    description: "Fuel supply & management",
    details: "Reliable fuel supply services with competitive pricing and quality assurance for all vessel types.",
    icon: Fuel,
  },
  {
    id: "formalities",
    title: "Formalities",
    description: "Customs & immigration",
    details: "Complete assistance with customs clearance, immigration procedures, and all regulatory documentation.",
    icon: FileText,
  },
  {
    id: "banking",
    title: "Banking Services",
    description: "Financial assistance",
    details: "Currency exchange, payment processing, and financial coordination for smooth operations in Thai waters.",
    icon: Banknote,
  },
  {
    id: "management",
    title: "Yacht Management",
    description: "Full vessel management",
    details: "Comprehensive yacht management including crew coordination, maintenance scheduling, and operational oversight.",
    icon: Ship,
  },
  {
    id: "sales",
    title: "Sales & Charter",
    description: "Brokerage services",
    details: "Professional yacht sales and charter services connecting owners with qualified buyers and charterers.",
    icon: TrendingUp,
  },
];
