import { MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'

export function WhatsAppButton() {
  const phoneNumber = '66851904836' // Without + symbol for WhatsApp
  const message = "Hello Pink Lady! I'd like to inquire about your yacht services."

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div
      className='pointer-events-none fixed right-0 bottom-6 left-0 z-40'
      style={{ left: 0, right: 0, pointerEvents: 'none' }}
    >
      <div
        className='mx-auto flex w-full max-w-6xl items-center px-5 sm:px-6'
        style={{
          width: '100%',
          maxWidth: '72rem',
          justifyContent: 'flex-start',
          pointerEvents: 'none',
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openWhatsApp}
          className='group relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl sm:h-14 sm:w-14'
          style={{
            background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.25) 0%, rgba(37, 211, 102, 0.35) 100%)',
            border: '1px solid rgba(37, 211, 102, 0.4)',
            boxShadow:
              '0 8px 24px rgba(37, 211, 102, 0.35), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
          aria-label='Contact us on WhatsApp'
        >
          {/* Pulse Animation - BEHIND the icon */}
          <motion.div
            className='absolute inset-0 rounded-full'
            style={{
              zIndex: 1,
              background: 'radial-gradient(circle, rgba(37, 211, 102, 0.4) 0%, rgba(37, 211, 102, 0.2) 100%)',
            }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{
              scale: [1, 1.4, 1.4, 1],
              opacity: [0.6, 0, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />

          {/* Icon - ABOVE the pulse */}
          <MessageCircle
            className='relative h-5 w-5 transition-transform group-hover:scale-110 sm:h-6 sm:w-6'
            style={{
              color: '#25D366',
              fill: 'none',
              stroke: '#25D366',
              strokeWidth: 2.5,
              zIndex: 2,
              filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 8px rgba(37, 211, 102, 0.6))',
            }}
          />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className='pointer-events-none absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 rounded-xl border border-white/40 bg-white px-4 py-2 text-sm whitespace-nowrap text-[#153c60] shadow-lg backdrop-blur-xl sm:block'
            style={{
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
              boxShadow: '0 8px 24px rgba(21, 60, 96, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            Quick Contact
          </motion.div>
        </motion.button>
      </div>
    </div>
  )
}
