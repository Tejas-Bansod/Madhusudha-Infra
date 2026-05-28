"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Bed, Bath, Maximize, Heart, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FilterType = "All" | "Buy" | "Rent" | "Commercial";

const properties = [
  {
    id: 1,
    title: "Madhusudha Grand Towers",
    type: "Buy",
    category: "Luxury Apartment",
    location: "Financial District, Hyderabad",
    price: "₹2.4 Cr",
    priceLabel: "onwards",
    beds: 3,
    baths: 3,
    area: "2,150",
    status: "New Launch",
    statusColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Signature Business Park",
    type: "Commercial",
    category: "Office Space",
    location: "Gachibowli, Hyderabad",
    price: "₹5.8 Cr",
    priceLabel: "per floor",
    beds: 0,
    baths: 6,
    area: "8,500",
    status: "Under Construction",
    statusColor: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "Meadows Villa Enclave",
    type: "Buy",
    category: "Premium Villa",
    location: "Mokila, Hyderabad",
    price: "₹1.8 Cr",
    priceLabel: "per unit",
    beds: 4,
    baths: 4,
    area: "3,800",
    status: "Ready to Move",
    statusColor: "bg-sky-500",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 4,
    title: "Skyline Residences",
    type: "Rent",
    category: "Modern Apartment",
    location: "Jubilee Hills, Hyderabad",
    price: "₹45,000",
    priceLabel: "per month",
    beds: 2,
    baths: 2,
    area: "1,350",
    status: "Available",
    statusColor: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "Heritage Courtyard Homes",
    type: "Buy",
    category: "Independent House",
    location: "Banjara Hills, Hyderabad",
    price: "₹3.2 Cr",
    priceLabel: "onwards",
    beds: 5,
    baths: 5,
    area: "4,200",
    status: "New Launch",
    statusColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 6,
    title: "Pearl Serviced Apartments",
    type: "Rent",
    category: "Serviced Apartment",
    location: "HITEC City, Hyderabad",
    price: "₹28,000",
    priceLabel: "per month",
    beds: 1,
    baths: 1,
    area: "780",
    status: "Available",
    statusColor: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
];

const filters: FilterType[] = ["All", "Buy", "Rent", "Commercial"];

export default function FeaturedProperties() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [liked, setLiked] = useState<number[]>([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeFilter === "All"
    ? properties
    : properties.filter((p) => p.type === activeFilter);

  return (
    <section ref={ref} className="w-full py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-sky-600 font-bold uppercase tracking-widest text-xs">Premium Collection</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">Featured Properties</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-md">Handpicked premium properties from Madhusudha Infra across Hyderabad&apos;s finest localities.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${activeFilter === f
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-shadow duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

                  {/* Status Badge */}
                  <Badge className={`absolute top-4 left-4 ${p.statusColor} text-white border-0 text-[10px] font-bold uppercase tracking-wider`}>
                    {p.status}
                  </Badge>

                  {/* Like Button */}
                  <button
                    onClick={() => setLiked((prev) => prev.includes(p.id) ? prev.filter((id) => id !== p.id) : [...prev, p.id])}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${liked.includes(p.id) ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
                  </button>

                  {/* Category */}
                  <span className="absolute bottom-4 left-4 text-[10px] text-white/80 font-bold uppercase tracking-wider">{p.category}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1 group-hover:text-sky-600 transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{p.location}</span>
                  </div>

                  {/* Specs */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 text-[10px] sm:text-xs font-semibold py-3 border-y border-slate-100 mb-4">
                    {p.beds > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                        <span>{p.beds} Beds</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <span>{p.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                      <span>{p.area} sqft</span>
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Price</span>
                      <span className="text-xl font-black text-slate-900">{p.price}</span>
                      <span className="text-xs text-slate-400 ml-1">{p.priceLabel}</span>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 group/btn">
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mt-14"
        >
          <Button asChild variant="outline" className="border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-200">
            <Link href="#">View All Properties <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
