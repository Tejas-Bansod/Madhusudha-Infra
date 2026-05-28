"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CtaBanner() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="w-full relative overflow-hidden min-h-[480px] flex items-center">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt="Luxury living"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/75 to-slate-950/60" />

      {/* Decorative blue glow */}
      <div className="absolute inset-0 bg-linear-to-r from-sky-900/30 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-500/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-300 text-xs font-bold uppercase tracking-widest">Limited Inventory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Your Dream Home<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-400">
                Is One Call Away
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Connect with our expert property consultants today. Whether you&apos;re buying, renting, or investing — we have the perfect property waiting for you in Hyderabad&apos;s prime localities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-4 h-auto rounded-xl text-sm shadow-lg shadow-sky-600/30 hover:shadow-sky-500/40 transition-all duration-200">
                <Link href="#">
                  Browse Properties
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-2 bg-transparent border-white/30 hover:border-white text-white hover:text-white hover:bg-white/10 font-bold px-8 py-4 h-auto rounded-xl text-sm backdrop-blur-sm transition-all duration-200">
                <Link href="tel:+91-40-00000000">
                  <Phone className="mr-2 w-4 h-4" />
                  +91 40 0000 0000
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
