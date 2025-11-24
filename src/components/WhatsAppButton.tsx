import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "66851904836"; // Without + symbol for WhatsApp
  const message = "Hello Pink Lady! I'd like to inquire about your yacht services.";
  
  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 2,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={openWhatsApp}
      className="fixed bottom-6 left-4 sm:left-6 lg:left-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group backdrop-blur-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.25) 0%, rgba(37, 211, 102, 0.35) 100%)',
        border: '1px solid rgba(37, 211, 102, 0.4)',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        cursor: 'pointer'
      }}
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse Animation - BEHIND the icon */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          zIndex: 1,
          background: 'radial-gradient(circle, rgba(37, 211, 102, 0.4) 0%, rgba(37, 211, 102, 0.2) 100%)'
        }}
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ 
          scale: [1, 1.4, 1.4, 1],
          opacity: [0.6, 0, 0, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
      
      {/* Icon - ABOVE the pulse */}
      <MessageCircle 
        className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform relative" 
        style={{ 
          color: '#25D366', 
          fill: 'none', 
          stroke: '#25D366', 
          strokeWidth: 2.5, 
          zIndex: 2,
          filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 8px rgba(37, 211, 102, 0.6))'
        }}
      />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="hidden sm:block absolute left-full ml-3 px-4 py-2 bg-white text-[#153c60] rounded-xl text-sm whitespace-nowrap pointer-events-none backdrop-blur-xl border border-white/40 shadow-lg"
        style={{ 
          fontFamily: 'Poppins, sans-serif',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
          boxShadow: '0 8px 24px rgba(21, 60, 96, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
        }}
      >
        Quick Contact
      </motion.div>
    </motion.button>
  );
}
