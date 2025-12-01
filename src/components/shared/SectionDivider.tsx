import { motion } from "motion/react";

interface SectionDividerProps {
  variant?: "light" | "dark";
}

export function SectionDivider({ variant = "light" }: SectionDividerProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
        className={`h-full origin-left ${
          variant === "light" 
            ? "bg-gradient-to-r from-transparent via-[#153c60]/20 to-transparent" 
            : "bg-gradient-to-r from-transparent via-white/20 to-transparent"
        }`}
      />
    </div>
  );
}
