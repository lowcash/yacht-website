import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Stats } from "./components/Stats";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Navigation } from "./components/Navigation";
import { SideDotsNavigation } from "./components/SideDotsNavigation";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { ActiveSectionProvider } from "./components/ActiveSectionContext";

export default function App() {
  return (
    <ActiveSectionProvider>
      <div className="min-h-screen">
        <Navigation />
        <SideDotsNavigation />
        <WhatsAppButton />
        <ScrollToTop />
      
      <main className="snap-y snap-mandatory overflow-y-scroll h-screen">
        <div className="snap-start">
          <Hero />
        </div>
        <div className="snap-start">
          <Services />
        </div>
        <div className="snap-start">
          <About />
        </div>
        <div className="snap-start">
          <Stats />
        </div>
        <div className="snap-start">
          <Testimonials />
        </div>
        <div className="snap-start">
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
  );
}
