"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const areas = [
  {
    id: 1,
    name: "Financial District",
    city: "Hyderabad",
    count: 34,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // Modern skyscrapers/commercial hubs
    featured: true,
  },
  {
    id: 2,
    name: "Banjara Hills",
    city: "Hyderabad",
    count: 28,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", // Luxury modern villa
    featured: false,
  },
  {
    id: 3,
    name: "Gachibowli",
    city: "Hyderabad",
    count: 21,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", // Premium high-rise apartments
    featured: false,
  },
  {
    id: 4,
    name: "Jubilee Hills",
    city: "Hyderabad",
    count: 19,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80", // Premium luxury villa with pool
    featured: false,
  },
  {
    id: 5,
    name: "HITEC City",
    city: "Hyderabad",
    count: 45,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", // Modern upscale architectural exterior
    featured: true,
  },
  {
    id: 6,
    name: "Mokila",
    city: "Hyderabad",
    count: 16,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", // Suburban luxury house
    featured: false,
  },
];

export default function Areas() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="w-full py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-sky-600 font-bold uppercase tracking-widest text-xs">Explore Locations</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">Properties by Area</h2>
          <p className="text-slate-500 mt-3 text-sm leading-relaxed">
            Explore premium residential and commercial properties across Hyderabad&apos;s most coveted addresses.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${area.featured ? "md:row-span-1" : ""}`}
            >
              <Link href="#" className={`block ${area.featured ? "h-72 md:h-80" : "h-56 md:h-64"}`}>
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/10 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-sky-600/0 group-hover:bg-sky-600/20 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-white font-extrabold text-lg leading-tight drop-shadow-sm">{area.name}</h3>
                      <p className="text-sky-300 text-xs font-bold uppercase tracking-wider mt-1">{area.count} Properties</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
