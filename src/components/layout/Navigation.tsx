import { useState, useEffect, useRef } from "react";
import { Menu, X, Briefcase, Info, MessageCircle, TrendingUp, Star } from "lucide-react";
import logoImage from "../../assets/pink-lady-logo.png";
import { motion, AnimatePresence } from "motion/react";
import { useActiveSection } from "../shared/ActiveSectionContext";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection();
  const isScrollingToTop = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = document.querySelector('main');
      const scrollPosition = mainElement ? mainElement.scrollTop : window.scrollY;
      
      // If we are forcing scroll to top, ignore the > 100 check and keep it false
      if (isScrollingToTop.current) {
        if (scrollPosition < 50) {
          isScrollingToTop.current = false;
        }
        if (scrolled) setScrolled(false);
        return;
      }

      // Simple logic: scrolled = true when scroll > 100px
      const newScrolled = scrollPosition > 100;
      
      if (newScrolled !== scrolled) {
        setScrolled(newScrolled);
      }
      
      // Detect which section the logo is currently over
      const sections = ["hero", "about", "services", "stats", "testimonials", "contact", "footer"];
      const logoPosition = 100;
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= logoPosition && rect.bottom >= logoPosition) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => mainElement.removeEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [scrolled]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleLogoClick = () => {
    // Immediate reset
    if (isOpen) setIsOpen(false);
    window.dispatchEvent(new CustomEvent('reset-navigation'));
    
    // Force scrolled to false immediately and lock it
    isScrollingToTop.current = true;
    setScrolled(false);

    scrollToSection("hero");
  };

  // Determine if current section is light (about/contact/testimonials) or dark (hero/services/stats/footer)
  const isLightSection = activeSection === "about" || activeSection === "contact" || activeSection === "testimonials";

  const navItems = [
    { id: "services", label: "Services", icon: Briefcase },
    { id: "about", label: "About", icon: Info },
    { id: "stats", label: "Stats", icon: TrendingUp },
    { id: "testimonials", label: "Reviews", icon: Star },
    { id: "contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <>
      {/* MOBILE: Floating Logo - Above Everything */}
      <motion.div
        className="lg:hidden fixed flex items-center"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          zIndex: 260,
          top: (scrolled && !isOpen) ? '1.75rem' : '2.5rem',
          left: '0.5rem',
          height: '3rem',
          transition: 'top 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none'
        }}
      >
        <motion.div
          className="cursor-pointer flex items-center relative z-10"
          style={{
            pointerEvents: 'auto'
          }}
          initial={{ scale: 0.9 }}
          animate={{ 
            scale: (isOpen || !scrolled) ? 0.85 : 0.45,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onClick={handleLogoClick}
          whileHover={{ scale: (isOpen || !scrolled) ? 0.88 : 0.48 }}
          whileTap={{ scale: (isOpen || !scrolled) ? 0.82 : 0.42 }}
        >
          <img 
            src={logoImage} 
            alt="Pink Lady" 
            className="h-32 w-auto"
            style={{ 
              filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6)) drop-shadow(0 2px 8px rgba(255, 103, 177, 0.4)) brightness(1.1)',
              transformOrigin: 'center left',
              marginTop: 10
            }}
          />
        </motion.div>
      </motion.div>

      {/* MOBILE: Navbar with Hamburger */}
      <div 
        className="lg:hidden fixed"
        style={{
          top: '1rem',
          right: '1rem',
          left: scrolled ? '1rem' : 'auto',
          zIndex: 200,
          pointerEvents: isOpen ? 'none' : 'auto',
          transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Wrapper with all transitions in CSS */}
        <div 
          className="flex items-center rounded-3xl overflow-visible relative"
          style={{
            padding: scrolled ? '0.875rem 1.25rem 0.875rem 6.5rem' : '0.875rem',
            justifyContent: scrolled ? 'flex-end' : 'center',
            background: scrolled 
              ? (isLightSection
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(21, 60, 96, 0.3) 0%, rgba(21, 60, 96, 0.2) 100%)')
              : 'transparent',
            border: scrolled 
              ? (isLightSection ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(255, 255, 255, 0.25)')
              : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
            boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl shrink-0 relative z-10"
            style={{
              background: isLightSection ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
              color: isLightSection ? '#153c60' : 'white',
              border: `1px solid ${isLightSection ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)'}`,
              transition: 'all 0.3s ease-out',
            }}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" style={{ 
              filter: isLightSection 
                ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' 
                : 'drop-shadow(0 0 4px rgba(21, 60, 96, 0.6)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
            }} />
          </button>
        </div>
      </div>

      {/* X button - Glass style */}
      <motion.button
        className="lg:hidden fixed p-2.5 rounded-xl"
        style={{
          top: scrolled ? '1.875rem' : '1.875rem',
          right: scrolled ? 'calc(1rem + 1.25rem)' : '1.875rem',
          zIndex: 300,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'right 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05, background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
      >
        <X className="w-6 h-6" style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
        }} />
      </motion.button>

      {/* DESKTOP: Floating Logo - No Wrapper */}
      <div
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-600 ease-in-out ${
          scrolled ? 'py-8' : 'py-8'
        }`}
        style={{ pointerEvents: 'none' }}
      >
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section - Direct, No Wrapper */}
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("hero")}
              className="cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex items-center gap-4">
                {/* Logo - Menší zmenšení */}
                <div className="relative">
                  <img 
                    src={logoImage} 
                    alt="Pink Lady" 
                    className={`w-auto transition-all duration-[1000ms] ease-in-out ${
                      scrolled ? 'h-32 xl:h-36' : 'h-44 xl:h-48'
                    }`}
                    style={{ 
                      filter: scrolled 
                        ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))'
                        : 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                      transitionDuration: '1000ms',
                    }}
                  />
                </div>
                
                {/* Text - Barva podle sekce */}
                <div>
                  <h1 
                    className="text-3xl xl:text-4xl uppercase leading-none tracking-wide transition-all duration-600 ease-in-out text-white"
                    style={{ 
                      fontFamily: 'Anton, sans-serif',
                      textShadow: scrolled 
                        ? '0 2px 4px rgba(0, 0, 0, 0.3)'
                        : '0 4px 16px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    <span className="text-[#ff67b1]">PINK LADY</span>
                  </h1>
                  <p 
                    className={`text-xs uppercase tracking-widest mt-1 transition-all duration-600 ease-in-out ${
                      isLightSection ? 'text-[#153c60]' : 'text-white/90'
                    }`}
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: scrolled 
                        ? (isLightSection ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.2)') 
                        : '0 2px 8px rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    Yachting Support Services
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>



      {/* Mobile Menu - Fullscreen Centered Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Fullscreen Dark Backdrop with Heavy Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden fixed inset-0"
              style={{ 
                zIndex: 250,
                background: 'linear-gradient(135deg, rgba(21, 60, 96, 0.95) 0%, rgba(21, 60, 96, 0.92) 50%, rgba(255, 103, 177, 0.2) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
              }}
              onClick={() => setIsOpen(false)}
            >
              {/* Centered Menu Container */}
              <div 
                className="flex flex-col items-center h-full px-6 justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Subtitle at Top */}
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-white text-xs md:text-sm uppercase tracking-widest mb-8 md:mb-10"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Yachting Support Services
                </motion.p>

                {/* Menu Items - Stack na mobilu, Grid na tabletu */}
                <div className="w-full max-w-md md:max-w-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToSection(item.id);
                          }}
                          className="w-full flex items-center gap-4 px-6 py-4 md:py-5 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 hover:border-[#ff67b1]/60 transition-all duration-300 cursor-pointer group"
                          style={{
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#ff67b1]/30 group-hover:bg-[#ff67b1]/50 flex items-center justify-center transition-colors shrink-0">
                            <Icon className="text-white" size={24} />
                          </div>
                          <span 
                            className="text-white uppercase text-lg md:text-xl"
                            style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em' }}
                          >
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
