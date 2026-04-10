import { useEffect, useRef } from 'react'

import { About } from './components/features/About'
import { Contact } from './components/features/Contact'
import { Hero } from './components/features/Hero'
import { Services } from './components/features/Services'
import { Navigation } from './components/layout/Navigation'
import { SideDotsNavigation } from './components/layout/SideDotsNavigation'
import { ActiveSectionProvider, useActiveSection } from './components/shared/ActiveSectionContext'
import { ScrollToTop } from './components/shared/ScrollToTop'
import { WhatsAppButton } from './components/shared/WhatsAppButton'
import { Toaster } from './components/ui/sonner'
import { getHashSectionId, parseSectionId, scrollToSection, setSectionHash } from './lib/section-navigation'

function AppContent() {
  const { activeSection, setActiveSection } = useActiveSection()
  const hasInitializedHash = useRef(false)

  useEffect(() => {
    const applyHashNavigation = () => {
      const hashSectionId = getHashSectionId()

      if (hashSectionId) {
        scrollToSection(hashSectionId, { behavior: 'auto', updateHash: false })
        setActiveSection(hashSectionId)
      }

      hasInitializedHash.current = true
    }

    const frameId = window.requestAnimationFrame(applyHashNavigation)
    window.addEventListener('hashchange', applyHashNavigation)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('hashchange', applyHashNavigation)
    }
  }, [setActiveSection])

  useEffect(() => {
    if (!hasInitializedHash.current) {
      return
    }

    const sectionId = parseSectionId(activeSection)
    if (!sectionId) {
      return
    }

    setSectionHash(sectionId)
  }, [activeSection])

  return (
    <div className='min-h-screen'>
      <Navigation />
      <SideDotsNavigation />
      <WhatsAppButton />
      <ScrollToTop />

      <main className='h-screen snap-y snap-mandatory overflow-y-scroll'>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>

      <Toaster
        position='top-right'
        richColors
        toastOptions={{
          style: {
            fontFamily: 'Poppins, sans-serif',
          },
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <ActiveSectionProvider>
      <AppContent />
    </ActiveSectionProvider>
  )
}
