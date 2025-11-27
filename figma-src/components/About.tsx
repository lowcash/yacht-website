import { SectionDivider } from "./SectionDivider";

export function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden py-34">
      {/* Clean Minimalist Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff] via-white to-[#f0f7ff]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg border border-[#153c60]/5">
            <div className="space-y-8">
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl text-[#153c60] uppercase leading-tight tracking-wide"
                style={{ 
                  fontFamily: 'Anton, sans-serif',
                  textShadow: '0 1px 3px rgba(21, 60, 96, 0.08)'
                }}
              >
                AT <span className="text-[#ff67b1]">PINK LADY</span>
                <br />
                YACHT SUPPORT SERVICES
              </h2>
              
              <div 
                className="space-y-5 text-[#153c60]/90 text-base md:text-lg leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <p className="elegant-text">
                  We pride ourselves on exceptional service, professionalism, and discretion. Every yacht. Every crew. Every journey expertly managed.
                </p>
                <p className="elegant-text">
                  Enjoy Thailand's stunning waters knowing your vessel is in expert hands.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#153c60]/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#ff67b1]" />
                  <p 
                    className="text-[#153c60]/80 text-sm"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="font-medium text-[#153c60]">Business Hours:</span> Monday - Friday, 9:00 AM - 6:00 PM (ICT)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#153c60]/30" />
                  <p 
                    className="text-[#153c60]/70 text-sm italic"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Emergency support available for urgent vessel needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <SectionDivider variant="light" />
    </section>
  );
}