import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useActiveSection } from "../shared/ActiveSectionContext";

const sections = [
  { id: "hero", label: "Welcome" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "stats", label: "Stats" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export function SideDotsNavigation() {
  const { activeSection, setActiveSection } = useActiveSection();

  // Define which sections have light backgrounds (need dark text)
  const lightSections = ["about", "testimonials", "contact"];
  const isLightSection = lightSections.includes(activeSection);
  
  // Tooltip color based on active section
  const getTooltipColor = () => {
    if (isLightSection) {
      return "#ff67b1"; // Pink for light sections
    }
    return "white"; // White for dark sections (hero, services, stats)
  };
  
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
          {/* Tooltip - Minimalist Header Style */}
          <div
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 text-sm whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 uppercase tracking-wide"
            style={{ 
              fontFamily: 'Anton, sans-serif',
              color: getTooltipColor(),
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {section.label}
          </div>

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
