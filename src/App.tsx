import { About } from './components/features/About'
import { Contact } from './components/features/Contact'
import { Hero } from './components/features/Hero'
import { Marquee } from './components/features/Marquee'
import { Services } from './components/features/Services'
import { Footer } from './components/layout/Footer'
import { Navigation } from './components/layout/Navigation'
import { RouteRail } from './components/layout/RouteRail'
import { ActiveSectionProvider } from './components/shared/ActiveSectionContext'
import { FloatingActions } from './components/shared/FloatingActions'
import { HashSync } from './components/shared/HashSync'
import { RouteProgressFallback } from './components/shared/RouteProgressFallback'

export default function App() {
  return (
    <ActiveSectionProvider>
      <a className='skip' href='#main'>
        Skip to content
      </a>
      <Navigation />
      <RouteRail />
      <main id='main' tabIndex={-1}>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <HashSync />
      <RouteProgressFallback />
    </ActiveSectionProvider>
  )
}
