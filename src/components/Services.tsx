import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Anchor, Package, Wrench, Fuel, FileText, Banknote, Ship, TrendingUp, X } from "lucide-react";
import { SectionDivider } from "./SectionDivider";

const services = [
  { 
    icon: Package, 
    title: "Provisioning", 
    description: "Complete yacht provisioning services",
    details: "From fresh provisions to specialized equipment, we source and deliver everything your yacht needs with efficiency and care."
  },
  { 
    icon: Anchor, 
    title: "Logistics", 
    description: "Seamless coordination & delivery",
    details: "Expert coordination of all yacht operations including berth arrangements, crew changes, and cargo handling across Thailand."
  },
  { 
    icon: Wrench, 
    title: "Maintenance", 
    description: "Expert technical support",
    details: "Comprehensive maintenance services with certified technicians ensuring your vessel operates at peak performance."
  },
  { 
    icon: Fuel, 
    title: "Bunkering", 
    description: "Fuel supply & management",
    details: "Reliable fuel supply services with competitive pricing and quality assurance for all vessel types."
  },
  { 
    icon: FileText, 
    title: "Formalities", 
    description: "Customs & immigration",
    details: "Complete assistance with customs clearance, immigration procedures, and all regulatory documentation."
  },
  { 
    icon: Banknote, 
    title: "Banking Services", 
    description: "Financial assistance",
    details: "Currency exchange, payment processing, and financial coordination for smooth operations in Thai waters."
  },
  { 
    icon: Ship, 
    title: "Yacht Management", 
    description: "Full vessel management",
    details: "Comprehensive yacht management including crew coordination, maintenance scheduling, and operational oversight."
  },
  { 
    icon: TrendingUp, 
    title: "Sales & Charter", 
    description: "Brokerage services",
    details: "Professional yacht sales and charter services connecting owners with qualified buyers and charterers."
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative min-h-screen flex items-center overflow-hidden bg-[#153c60]">
      {/* Clean Minimalist Background */}
      <div className="absolute inset-0 bg-[#153c60]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 sm:pt-36 md:py-36">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase leading-tight mb-4 tracking-wide"
            style={{ 
              fontFamily: 'Anton, sans-serif',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            <span className="text-white">COMPREHENSIVE</span>
            <br />
            <span className="text-[#ff67b1]">YACHT SERVICES</span>
          </h2>
          <p 
            className="text-white/90 text-base md:text-lg max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Your one-stop solution for professional yacht operations in Thailand
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(index)}
                  className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 md:p-6 text-center cursor-pointer transition-all duration-300 hover:bg-white/15 hover:shadow-xl hover:border-[#ff67b1]/50 h-full flex flex-col"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#ff67b1]/20 border border-[#ff67b1]/40 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ff67b1]/30">
                      <Icon className="w-8 h-8 text-[#ff67b1] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                  <h3 
                    className="text-white text-lg mb-2 uppercase leading-tight tracking-wide"
                    style={{ fontFamily: 'Anton, sans-serif' }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-white/75 text-sm flex-grow leading-relaxed"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {service.description}
                  </p>

                  {/* Desktop: Tooltip */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 bg-white/98 backdrop-blur-xl border-2 border-[#ff67b1]/30 rounded-xl p-4 shadow-2xl z-20"
                        style={{ pointerEvents: 'none' }}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-[#ff67b1] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <h4 
                            className="text-[#153c60] text-sm uppercase"
                            style={{ fontFamily: 'Anton, sans-serif' }}
                          >
                            {service.title}
                          </h4>
                        </div>
                        <p 
                          className="text-[#153c60] text-xs leading-relaxed"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {service.details}
                        </p>
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-3 h-3 bg-white/98 rotate-45 border-r-2 border-b-2 border-[#ff67b1]/30" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[90] flex items-center justify-center p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative backdrop-blur-xl border-2 border-white/40 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 103, 177, 0.15) 0%, rgba(21, 60, 96, 0.2) 100%)',
                boxShadow: '0 20px 60px rgba(21, 60, 96, 0.3), 0 8px 24px rgba(255, 103, 177, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 p-2 text-white hover:text-[#ff67b1] transition-colors cursor-pointer"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
              >
                <X size={28} />
              </button>

              {selectedIndex !== null && (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0 shadow-lg">
                      {(() => {
                        const Icon = services[selectedIndex].icon;
                        return <Icon className="w-10 h-10 text-[#ff67b1]" />;
                      })()}
                    </div>
                    <h3 
                      className="text-white text-3xl uppercase"
                      style={{ 
                        fontFamily: 'Anton, sans-serif',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {services[selectedIndex].title}
                    </h3>
                  </div>
                  <p 
                    className="text-white/95 text-lg leading-relaxed"
                    style={{ 
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {services[selectedIndex].details}
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Divider */}
      <SectionDivider variant="dark" />
    </section>
  );
}
