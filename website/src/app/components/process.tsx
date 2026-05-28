"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, CalendarCheck, Banknote, KeyRound } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Properties",
    description: "Browse thousands of verified listings across Hyderabad. Filter by location, budget, type, and amenities to find your perfect match.",
    color: "from-sky-500 to-blue-600",
    shadowColor: "shadow-sky-500/20",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Book a Site Visit",
    description: "Schedule a free guided site visit with our expert consultants at a time that suits you — online or in-person.",
    color: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/20",
  },
  {
    number: "03",
    icon: Banknote,
    title: "Secure Financing",
    description: "Get hassle-free home loan assistance with our banking partners. We help you navigate EMI plans, eligibility checks, and paperwork.",
    color: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    number: "04",
    icon: KeyRound,
    title: "Move In & Celebrate",
    description: "Complete legal due diligence, receive your keys, and step into your dream home with full peace of mind.",
    color: "from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/20",
  },
];

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="w-full py-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-sky-600 font-bold uppercase tracking-widest text-xs">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">How It Works</h2>
          <p className="text-slate-500 mt-3 text-sm leading-relaxed">
            From discovery to keys in hand — our streamlined 4-step process makes buying or renting a property effortlessly simple.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-slate-300 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <div className={`w-24 h-24 rounded-2xl bg-linear-to-br ${step.color} shadow-xl ${step.shadowColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative`}>
                <step.icon className="w-10 h-10 text-white" />
                {/* Step number badge */}
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-700 shadow-sm">
                  {step.number}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-lg mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
