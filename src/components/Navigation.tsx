import { useState, useEffect } from "react";
import { Menu, X, Briefcase, Info, MessageCircle, TrendingUp, Star } from "lucide-react";
import logoImage from "figma:asset/5fc3d598cf87555943be1fff433f39e75e0bf48b.png";
import { motion, AnimatePresence } from "motion/react";
import { useActiveSection } from "./ActiveSectionContext";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogoNavigating, setIsLogoNavigating] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection();

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      // Get scroll from the main element, not window!
      const mainElement = document.querySelector('main');
      const scrollPosition = mainElement ? mainElement.scrollTop : window.scrollY;
      
      // Trigger at just 100px scroll - much easier to activate!
      const shouldBeScrolled = scrollPosition > 100;
      
      // Clear any pending timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
      
      if (shouldBeScrolled) {
        setScrolled(true);
      } else {
        // Delay un-scrolling to allow smooth transition
        scrollTimeout = setTimeout(() => {
          setScrolled(false);
        }, 150);
      }
      
      // Detect which section the logo is currently over
      const sections = ["hero", "about", "services", "stats", "testimonials", "contact", "footer"];
      const logoPosition = 100; // Logo position from top in pixels
      
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
    
    // Listen to scroll on main element, not window!
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        mainElement.removeEventListener("scroll", handleScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    } else {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    }
  }, []);

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
    // If menu is open and we're scrolled (not at hero), prevent logo shrink during navigation
    if (isOpen && scrolled) {
      setIsLogoNavigating(true);
      scrollToSection("hero");
      // Reset after navigation completes (300ms menu close + 1000ms smooth scroll)
      setTimeout(() => {
        setIsLogoNavigating(false);
      }, 1300);
    } else {
      scrollToSection("hero");
    }
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
      <div
        className="lg:hidden fixed flex items-center"
        style={{
          zIndex: 250,
          top: (scrolled && !isOpen) ? '2rem' : '3rem',
          left: '1rem',
          height: '3.25rem',
          transition: 'top 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none'
        }}
      >
        <motion.div
          className="cursor-pointer flex items-center"
          style={{
            pointerEvents: 'auto'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1,
            scale: (isOpen || !scrolled || isLogoNavigating) ? 1 : 0.5,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          onClick={handleLogoClick}
          whileHover={{ scale: (isOpen || !scrolled || isLogoNavigating) ? 1.03 : 0.53 }}
          whileTap={{ scale: (isOpen || !scrolled || isLogoNavigating) ? 0.97 : 0.48 }}
        >
          <img 
            src={logoImage} 
            alt="Pink Lady" 
            className="h-32 w-auto"
            style={{ 
              filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6)) drop-shadow(0 2px 8px rgba(255, 103, 177, 0.4)) brightness(1.1)',
              transformOrigin: 'center left'
            }}
          />
        </motion.div>
      </div>

      {/* MOBILE: Navbar with Hamburger */}
      <div 
        className="lg:hidden fixed"
        style={{
          top: '1rem',
          right: '1rem',
          left: scrolled ? '1rem' : 'auto',
          zIndex: 200,
          pointerEvents: 'none'
        }}
      >
        {/* Glass navbar wrapper - same smooth transition as scroll */}
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.9 : 1,
            width: scrolled ? '100%' : 'auto'
          }}
          transition={{ 
            y: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            width: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
          }}
          className="flex items-center rounded-3xl overflow-hidden"
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
              : 'none',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            boxShadow: scrolled ? '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: isOpen ? 'none' : 'none'
          }}
        >
          {/* Hamburger inside wrapper */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl flex-shrink-0 relative"
            style={{
              background: isLightSection ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
              color: isLightSection ? '#153c60' : 'white',
              border: `1px solid ${isLightSection ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.3)'}`,
              transition: 'all 0.3s ease-out',
              pointerEvents: 'auto'
            }}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" style={{ 
              filter: isLightSection 
                ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' 
                : 'drop-shadow(0 0 4px rgba(21, 60, 96, 0.6)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
            }} />
          </motion.button>
        </motion.div>
      </div>

      {/* X button - Fixed position, tracks hamburger position */}
      <motion.button
        className="lg:hidden fixed p-2.5 rounded-xl"
        style={{
          top: scrolled ? '1.875rem' : '1.875rem',
          right: scrolled ? 'calc(1rem + 1.25rem)' : '1.875rem',
          zIndex: 300,
          background: 'rgba(255, 255, 255, 0.3)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'right 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* DESKTOP: Floating Logo - No Wrapper */}
      <div
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled ? 'py-3' : 'py-8'
        }`}
        style={{ pointerEvents: 'none' }}
      >
        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section - Direct, No Wrapper */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
                    className={`w-auto transition-all duration-700 ease-out ${
                      scrolled ? 'h-32 xl:h-36' : 'h-44 xl:h-48'
                    }`}
                    style={{ 
                      filter: scrolled 
                        ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))'
                        : 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))'
                    }}
                  />
                </div>
                
                {/* Text - Barva podle sekce */}
                <div>
                  <h1 
                    className="text-3xl xl:text-4xl uppercase leading-none tracking-wide transition-all duration-500 text-white"
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
                    className={`text-xs uppercase tracking-widest mt-1 transition-all duration-500 ${
                      isLightSection ? 'text-[#153c60]' : 'text-white/90'
                    }`}
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: scrolled 
                        ? (isLightSection ? '0 1px 2px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.2)') 
                        : '0 2px 8px rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    Yacht Support Services
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>



      {/* Mobile Menu - Glassmorphism Bottom Drawer */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm"
              style={{ zIndex: 100 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl overflow-hidden"
              style={{ maxHeight: "85vh", zIndex: 150 }}
            >
              {/* Liquid-Glass Background */}
              <div 
                className="absolute inset-0 backdrop-blur-3xl border-t border-white/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 235, 245, 0.9) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 -8px 32px rgba(21, 60, 96, 0.08)'
                }}
              />
              
              {/* Content with Scroll */}
              <div className="relative z-10 px-6 py-6 overflow-y-auto" style={{ maxHeight: "85vh" }}>
                {/* Drag Handle */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-1.5 rounded-full bg-[#153c60]/20" />
                </div>

                {/* Menu Items */}
                <div className="space-y-2.5 pb-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection(item.id);
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center gap-3 px-5 py-3.5 bg-white/70 hover:bg-white/90 rounded-2xl border border-white/50 hover:border-[#ff67b1]/50 transition-all duration-300 cursor-pointer group backdrop-blur-xl"
                        style={{
                          boxShadow: '0 4px 16px rgba(21, 60, 96, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                        }}
                      >
                        <div className="w-11 h-11 rounded-xl bg-[#ff67b1]/20 group-hover:bg-[#ff67b1]/30 flex items-center justify-center transition-colors">
                          <Icon className="text-[#ff67b1]" size={22} />
                        </div>
                        <span 
                          className="text-[#153c60] uppercase"
                          style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.125rem' }}
                        >
                          {item.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}