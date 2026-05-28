"use client";

import React, { useState, useEffect } from "react";
import { Mail, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none">
      {/* Contact Email Button (Always visible) */}
      <a
        href="mailto:info@madhusudhainfra.com"
        aria-label="Send email"
        className="w-12 h-12 flex items-center justify-center bg-white hover:bg-slate-50 border border-slate-100 text-slate-800 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-150 group cursor-pointer"
      >
        <Mail className="w-5 h-5 group-hover:scale-105 transition-transform duration-150" />
      </a>

      {/* Move to Top Button (Visible after scrolling down) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 15 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-12 h-12 flex items-center justify-center bg-white hover:bg-slate-50 border border-slate-100 text-sky-600 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-150 group cursor-pointer"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5] group-hover:scale-105 transition-transform duration-150" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
