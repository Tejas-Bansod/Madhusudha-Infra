"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { Home, Users, MapPin, Trophy } from "lucide-react";

const stats = [
  { icon: Home, value: 12500, suffix: "+", label: "Properties Listed", color: "text-sky-400" },
  { icon: Users, value: 8400, suffix: "+", label: "Happy Clients", color: "text-emerald-400" },
  { icon: MapPin, value: 48, suffix: "+", label: "Cities Covered", color: "text-violet-400" },
  { icon: Trophy, value: 15, suffix: " Yrs", label: "Industry Experience", color: "text-amber-400" },
];

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="w-full bg-slate-900 py-16 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col items-center text-center group"
          >
            <div className={`w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              {inView ? (
                <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} />
              ) : (
                <span>0</span>
              )}
            </div>
            <p className="text-slate-400 text-sm font-semibold tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
