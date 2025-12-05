import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import lineQRCode from "../../assets/line-qr-code.png";
import { motion } from "motion/react";
import { toast } from "sonner@2.0.3";
import { COMPANY_INFO } from "../../lib/constants";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast.success("Message Sent!", {
      description: "Thank you for contacting us. We'll respond during business hours (Mon-Fri, 9AM-6PM ICT).",
      duration: 5000,
    });
    
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="snap-start relative min-h-screen flex flex-col justify-center overflow-hidden py-32 md:py-40">
      {/* Minimalist Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-[#fef8fb] to-white" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl text-[#153c60] uppercase mb-4 tracking-wide"
            style={{ 
              fontFamily: 'Anton, sans-serif',
              textShadow: '0 2px 8px rgba(21, 60, 96, 0.1)'
            }}
          >
            READY TO SET SAIL?
          </h2>
          <p 
            className="text-[#153c60]/80 text-base md:text-lg max-w-2xl mx-auto elegant-text"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Contact us today for personalized yachting assistance anywhere in Thailand.
          </p>
        </div>

        {/* Contact Information - Full Width */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#153c60] p-6 md:p-8 rounded-3xl text-white space-y-5 h-full">
            <div className="flex items-center justify-between">
              <h3 
                className="text-xl uppercase"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                GET IN TOUCH
              </h3>
              
              {/* Social Media */}
              <div className="flex gap-2">
                {COMPANY_INFO.social?.facebook && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={COMPANY_INFO.social.facebook}
                    className="w-9 h-9 rounded-lg bg-[#ff67b1] flex items-center justify-center hover:bg-[#ff4d9f] transition-colors cursor-pointer"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} />
                  </motion.a>
                )}
                {COMPANY_INFO.social?.instagram && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={COMPANY_INFO.social.instagram}
                    className="w-9 h-9 rounded-lg bg-[#ff67b1] flex items-center justify-center hover:bg-[#ff4d9f] transition-colors cursor-pointer"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </motion.a>
                )}
                {COMPANY_INFO.social?.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={COMPANY_INFO.social.linkedin}
                    className="w-9 h-9 rounded-lg bg-[#ff67b1] flex items-center justify-center hover:bg-[#ff4d9f] transition-colors cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </motion.a>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <a 
                href={COMPANY_INFO.mapLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link inline-flex items-center gap-4 group cursor-pointer transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ff67b1] flex items-center justify-center shrink-0 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="transition-all duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <p className="contact-text text-sm text-white/80 transition-colors duration-300">{COMPANY_INFO.locationName}</p>
                  <p className="contact-text text-sm text-white transition-colors duration-300">{COMPANY_INFO.address}</p>
                </div>
              </a>

              <br />

              <a 
                href={`tel:${COMPANY_INFO.phone}`}
                className="contact-link inline-flex items-center gap-4 group cursor-pointer transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ff67b1] flex items-center justify-center shrink-0 transition-all duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="transition-all duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <p className="contact-text text-sm text-white/80 transition-colors duration-300">Phone</p>
                  <p className="contact-text text-sm text-white transition-colors duration-300">{COMPANY_INFO.phoneDisplay}</p>
                </div>
              </a>

              <br />

              <a 
                href={`mailto:${COMPANY_INFO.email}`}
                className="contact-link inline-flex items-center gap-4 group cursor-pointer transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#ff67b1] flex items-center justify-center shrink-0 transition-all duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="transition-all duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <p className="contact-text text-sm text-white/80 transition-colors duration-300">Email</p>
                  <p className="contact-text text-sm whitespace-nowrap break-all text-white transition-colors duration-300">{COMPANY_INFO.email}</p>
                </div>
              </a>
            </div>

            {/* Line QR Code */}
            <div className="pt-4 border-t border-white/20">
              <div className="text-center space-y-4">
                <p 
                  className="text-xl uppercase"
                  style={{ fontFamily: 'Anton, sans-serif' }}
                >
                  CONNECT ON LINE
                </p>
                <div className="flex justify-center">
                  <div 
                    className="bg-white p-4 rounded-2xl shadow-xl"
                  >
                    <img 
                      src={lineQRCode} 
                      alt="Line QR Code" 
                      className="w-40 h-40 md:w-48 md:h-48 object-contain"
                    />
                  </div>
                </div>
                <p 
                  className="text-sm opacity-90"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Scan to chat instantly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form - COMMENTED OUT FOR NOW */}
        {/*
        <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl mt-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label 
                htmlFor="name"
                className="text-[#153c60]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 border-[#153c60]/30 focus:border-[#ff67b1] focus:ring-[#ff67b1]"
                placeholder="Your name"
              />
            </div>

            <div>
              <Label 
                htmlFor="email"
                className="text-[#153c60]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 border-[#153c60]/30 focus:border-[#ff67b1] focus:ring-[#ff67b1]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label 
                htmlFor="message"
                className="text-[#153c60]"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 min-h-[120px] border-[#153c60]/30 focus:border-[#ff67b1] focus:ring-[#ff67b1]"
                placeholder="Tell us about your yacht support needs..."
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-[#ff67b1] hover:bg-[#ff4d9f] text-white py-6 text-lg rounded-full uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                SEND MESSAGE
              </Button>
            </motion.div>
          </form>
        </div>
        */}

        {/* Footer Section - Integrated */}
        <div className="relative mt-8 md:mt-12 pt-8 md:pt-12">
          {/* Minimalist Top Border Gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff67b1] to-transparent opacity-50" />
          
          <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 max-w-2xl mx-auto pb-4">
            
            {/* Brand */}
            <div>
              <h3 
                className="text-2xl md:text-3xl uppercase mb-2 text-[#153c60]"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                <span className="text-[#ff67b1]">PINK LADY</span>
              </h3>
              <p 
                className="text-[#153c60]/70 text-xs md:text-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Premium Yachting Services
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {COMPANY_INFO.social?.facebook && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={COMPANY_INFO.social.facebook}
                  className="w-10 h-10 rounded-xl bg-[#153c60]/10 hover:bg-[#ff67b1]/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 border border-[#153c60]/10"
                  aria-label="Facebook"
                >
                  <Facebook size={18} className="text-[#153c60]/70 hover:text-[#ff67b1]" />
                </motion.a>
              )}
              {COMPANY_INFO.social?.instagram && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={COMPANY_INFO.social.instagram}
                  className="w-10 h-10 rounded-xl bg-[#153c60]/10 hover:bg-[#ff67b1]/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 border border-[#153c60]/10"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-[#153c60]/70 hover:text-[#ff67b1]" />
                </motion.a>
              )}
              {COMPANY_INFO.social?.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={COMPANY_INFO.social.linkedin}
                  className="w-10 h-10 rounded-xl bg-[#153c60]/10 hover:bg-[#ff67b1]/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 border border-[#153c60]/10"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-[#153c60]/70 hover:text-[#ff67b1]" />
                </motion.a>
              )}
            </div>

            {/* Copyright & Tagline */}
            <div className="space-y-2 pt-3 md:pt-4">
              <p 
                className="text-[#153c60]/50 text-xs md:text-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                © {new Date().getFullYear()} Pink Lady Yacht Support Services. All rights reserved.
              </p>
              <p 
                className="text-[#153c60]/40 text-xs"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Proudly serving yacht owners and crews across Thailand's beautiful waters
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}