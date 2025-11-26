import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const handleScroll = () => {
      // Show button when user scrolls down more than 100vh
      setIsVisible(main.scrollTop > window.innerHeight);
      
      // Detect section at bottom-right corner (where the button is)
      const buttonY = window.innerHeight - 100; // approximate button position
      const sections = document.querySelectorAll("section, div[id]");
      
      let currentSection = "hero";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= buttonY && rect.bottom >= buttonY) {
          currentSection = section.id || "hero";
        }
      });
      
      // Light sections
      const lightSections = ["about", "contact", "testimonials"];
      setIsLightSection(lightSections.includes(currentSection));
    };

    handleScroll(); // Initial check
    main.addEventListener("scroll", handleScroll);
    return () => main.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const element = document.getElementById("hero");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-4 sm:right-6 z-40 p-3 sm:p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center group"
          style={{
            background: isLightSection 
              ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: isLightSection 
              ? '1px solid rgba(0, 0, 0, 0.2)'
              : '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: isLightSection
              ? '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              : '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            cursor: 'pointer'
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp 
            className={`w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform ${
              isLightSection ? 'text-[#153c60]' : 'text-white'
            }`}
            style={{ 
              filter: isLightSection 
                ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' 
                : 'drop-shadow(0 0 4px rgba(21, 60, 96, 0.6)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}