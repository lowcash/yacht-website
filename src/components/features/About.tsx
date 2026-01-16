import { SectionDivider } from "../shared/SectionDivider";

export function About() {
  return (
    <section id="about" className="snap-start relative min-h-screen flex flex-col justify-center overflow-hidden py-32 md:py-40">
      {/* Clean Minimalist Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#f8fbff] via-white to-[#f0f7ff]" />

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


            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <SectionDivider variant="light" />
    </section>
  );
}
