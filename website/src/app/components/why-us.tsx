"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, ShieldCheck, TrendingUp, Headphones, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WhyUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="w-full py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:text-center max-w-2xl md:mx-auto">
          <span className="text-sky-600 font-bold uppercase tracking-widest text-xs">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2 mb-4">
            We Build Trust, Not Just Properties
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
            At Madhusudha Infra, we combine decades of construction expertise with a customer-first approach to deliver homes that exceed expectations on every metric.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(220px,auto)]"
        >
          {/* Main Hero Card (Spans 2x2) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden group shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80" 
              alt="Premium real estate" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider mb-3 border border-white/30">
                  Our Commitment
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  Crafting spaces that inspire and endure.
                </h3>
                <p className="text-slate-300 text-sm max-w-md hidden sm:block">
                  Discover a new standard of living where every detail is meticulously planned and executed to perfection.
                </p>
              </div>
              <Button asChild className="w-max bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl border-0">
                <Link href="#">
                  Explore Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Legally Verified Card */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 rounded-3xl bg-white border border-slate-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">100% Legally Verified</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every property undergoes thorough legal due diligence with RERA registration and title clearance.
              </p>
            </div>
          </motion.div>

          {/* Market Price Card */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 rounded-3xl bg-white border border-slate-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Best Market Price</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our experts ensure you get the most competitive pricing backed by real market data.
              </p>
            </div>
          </motion.div>

          {/* Dedicated Support Card */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 rounded-3xl bg-slate-900 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
              <Headphones className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="font-bold text-white text-lg mb-2">Dedicated Support</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your personal relationship manager stays with you from the first visit through possession.
              </p>
            </div>
          </motion.div>

          {/* Award Winning Card */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 rounded-3xl bg-white border border-slate-100 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Award-Winning Builds</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Recognized with 25+ national excellence awards over the last 12 years.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
