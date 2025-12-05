import { motion } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionDivider } from "../shared/SectionDivider";

const testimonials = [
  {
    name: "Captain James Morrison",
    yacht: "M/Y Serenity",
    text: "Pink Lady's attention to detail and professionalism is unmatched. They handle everything seamlessly, allowing us to focus on what matters most - our guests.",
    location: "Phuket, Thailand"
  },
  {
    name: "Sarah Chen",
    yacht: "S/Y Ocean Dream",
    text: "Exceptional service from start to finish. Their local knowledge and 24/7 support made our Thailand voyage absolutely unforgettable.",
    location: "Koh Samui, Thailand"
  },
  {
    name: "Captain Robert Hansen",
    yacht: "M/Y Horizon",
    text: "Professional, reliable, and always available. Pink Lady has become our trusted partner for all yacht operations in Southeast Asia.",
    location: "Krabi, Thailand"
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="snap-start relative min-h-screen flex flex-col justify-center overflow-hidden py-32 md:py-40">
      {/* Minimalist gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#fef6fa] to-white" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl text-[#153c60] uppercase tracking-wide mb-4"
            style={{ 
              fontFamily: 'Anton, sans-serif',
              textShadow: '0 1px 3px rgba(21, 60, 96, 0.08)'
            }}
          >
            CLIENT <span className="text-[#ff67b1]">TESTIMONIALS</span>
          </h2>
          <p 
            className="text-[#153c60]/80 text-lg elegant-text max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            What our clients say about us
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.95, x: 100 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0.95, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-[#153c60]/5"
          >
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#ff67b1]/10 flex items-center justify-center">
                <Quote className="w-8 h-8 text-[#ff67b1]" />
              </div>
            </div>

            {/* Testimonial Text */}
            <p 
              className="text-[#153c60]/90 text-xl md:text-2xl text-center mb-8 leading-relaxed italic"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              "{testimonials[currentIndex].text}"
            </p>

            {/* Author Info */}
            <div className="text-center">
              <p 
                className="text-[#153c60] uppercase tracking-wide mb-1"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                {testimonials[currentIndex].name}
              </p>
              <p 
                className="text-[#ff67b1] text-sm mb-1"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {testimonials[currentIndex].yacht}
              </p>
              <p 
                className="text-[#153c60]/60 text-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {testimonials[currentIndex].location}
              </p>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full bg-[#153c60] text-white flex items-center justify-center hover:bg-[#1a4a75] transition-colors cursor-pointer shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    index === currentIndex 
                      ? 'w-8 bg-[#ff67b1]' 
                      : 'w-2 bg-[#153c60]/30 hover:bg-[#153c60]/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full bg-[#153c60] text-white flex items-center justify-center hover:bg-[#1a4a75] transition-colors cursor-pointer shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      <SectionDivider variant="light" />
    </section>
  );
}
