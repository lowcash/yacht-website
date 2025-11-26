import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionDivider } from "./SectionDivider";

interface StatProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function Counter({ end, label, suffix = "", prefix = "" }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div 
        className="text-5xl md:text-6xl lg:text-7xl mb-3"
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        <span className="text-[#ff67b1]">{prefix}{count}{suffix}</span>
      </div>
      <p 
        className="text-white/90 text-base md:text-lg uppercase tracking-widest"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Minimalist Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#153c60] to-[#1a4a75]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 sm:pt-36 md:py-28">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wide mb-4"
            style={{ 
              fontFamily: 'Anton, sans-serif',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            TRUSTED BY <span className="text-[#ff67b1]">YACHT OWNERS</span>
          </h2>
          <p 
            className="text-white/80 text-lg elegant-text max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Years of excellence in yacht support services across Thailand
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Counter end={500} label="Yachts Serviced" suffix="+" />
          <Counter end={10} label="Years Experience" suffix="+" />
          <Counter end={8} label="Services Offered" suffix="" />
          <Counter end={100} label="Satisfaction" suffix="%" />
        </div>
      </div>

      <SectionDivider variant="dark" />
    </section>
  );
}