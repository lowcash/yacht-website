import { Hero } from "./components/features/Hero";
import { Services } from "./components/features/Services";
import { Stats } from "./components/features/Stats";
import { About } from "./components/features/About";
import { Testimonials } from "./components/features/Testimonials";
import { Contact } from "./components/features/Contact";
import { Navigation } from "./components/layout/Navigation";
import { SideDotsNavigation } from "./components/layout/SideDotsNavigation";
import { WhatsAppButton } from "./components/shared/WhatsAppButton";
import { ScrollToTop } from "./components/shared/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { ActiveSectionProvider } from "./components/shared/ActiveSectionContext";
import { GoogleAnalytics } from './components/shared/GoogleAnalytics';

export default function App() {
  return (
    <>
      <GoogleAnalytics />
      
      <ActiveSectionProvider>
        <div className="min-h-screen">
          <Navigation />
          <SideDotsNavigation />
          <WhatsAppButton />
          <ScrollToTop />
        
        <main id="main-content" className="snap-y snap-mandatory overflow-y-scroll h-[100dvh] overscroll-none">
          <div className="snap-start h-[100dvh]">
            <Hero />
          </div>
          <div className="snap-start min-h-[100dvh]">
            <Services />
          </div>
          <div className="snap-start min-h-[100dvh]">
            <About />
          </div>
          <div className="snap-start min-h-[100dvh]">
            <Stats />
          </div>
          <div className="snap-start min-h-[100dvh]">
            <Testimonials />
          </div>
          <div className="snap-start min-h-[100dvh]">
            <Contact />
          </div>
        </main>
        
        <Toaster 
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: 'Poppins, sans-serif',
            },
          }}
        />
        </div>
      </ActiveSectionProvider>
    </>
  );
}