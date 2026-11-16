import { About } from './components/features/About'
import { Contact } from './components/features/Contact'
import { Hero } from './components/features/Hero'
import { ServiceStrip } from './components/features/ServiceStrip'
import { Services } from './components/features/Services'
import { Footer } from './components/layout/Footer'
import { Navigation } from './components/layout/Navigation'
import { RouteRail } from './components/layout/RouteRail'
import { ActiveSectionProvider } from './components/shared/ActiveSectionContext'
import { FloatingActions } from './components/shared/FloatingActions'
import { HashSync } from './components/shared/HashSync'
import { RouteProgressFallback } from './components/shared/RouteProgressFallback'
import { ServiceInquiryProvider } from './components/shared/ServiceInquiryContext'

export default function App() {
  return (
    <ActiveSectionProvider>
      <ServiceInquiryProvider>
        <a className='skip' href='#main'>
          Skip to content
        </a>
        <Navigation />
        <RouteRail />
        <main id='main' tabIndex={-1}>
          <Hero />
          <ServiceStrip />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
        <FloatingActions />
        <HashSync />
        <RouteProgressFallback />
      </ServiceInquiryProvider>
    </ActiveSectionProvider>
  )
}
