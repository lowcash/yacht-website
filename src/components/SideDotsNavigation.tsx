import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useActiveSection } from "./ActiveSectionContext";

const sections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "stats", label: "Stats" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export function SideDotsNavigation() {
  const { activeSection, setActiveSection } = useActiveSection();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer for snap-scroll compatibility
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If section is more than 50% visible, set it as active
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0, 0.5, 1], // Trigger at 0%, 50%, and 100% visibility
        rootMargin: "-10% 0px -10% 0px", // Add margin to center detection
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section) => (
        <div key={section.id} className="relative group">
          {/* Tooltip - Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 text-[#153c60] rounded-xl text-sm whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-3xl border border-white/40"
            style={{ 
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
              boxShadow: '0 8px 24px rgba(21, 60, 96, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(255, 255, 255, 0.3)'
            }}
          >
            {section.label}
          </motion.div>

          {/* Dot */}
          <motion.button
            onClick={() => scrollToSection(section.id)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-3 h-3 cursor-pointer"
            aria-label={`Navigate to ${section.label}`}
          >
            {/* Outer ring with glass effect */}
            <motion.div
              initial={false}
              animate={{
                scale: activeSection === section.id ? 1.8 : 1,
                opacity: activeSection === section.id ? 1 : 0.2,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-[#ff67b1]"
              style={{
                boxShadow: activeSection === section.id 
                  ? '0 0 12px rgba(255, 103, 177, 0.4)' 
                  : 'none'
              }}
            />
            
            {/* Inner dot with gradient */}
            <motion.div
              initial={false}
              animate={{
                scale: activeSection === section.id ? 1 : 0.6,
                backgroundColor: activeSection === section.id ? "#ff67b1" : "#153c60",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: activeSection === section.id 
                  ? '0 0 8px rgba(255, 103, 177, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.3)' 
                  : '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            />
          </motion.button>
        </div>
      ))}
    </div>
  );
}