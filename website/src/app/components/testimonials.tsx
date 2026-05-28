"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar Verma",
    title: "IT Director · Bought in Mokila",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    review: "Madhusudha Infra made the entire home-buying journey stress-free. From the first site visit to possession, their team was proactive, transparent, and genuinely caring. The quality of construction far surpassed what we expected. We are absolutely in love with our new home.",
  },
  {
    id: 2,
    name: "Ananya Srinivasan",
    title: "VP Operations · Leased in HITEC City",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    review: "We leased three floors at Signature Heights for our growing team. The commercial space is stunning — excellent HVAC, power backup, fiber connectivity, and premium fittings throughout. The facility management team is top-notch. I highly recommend Madhusudha for corporate leasing.",
  },
  {
    id: 3,
    name: "Suresh Narayanan",
    title: "Retired Banker · Bought in Banjara Hills",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    review: "I was skeptical about real estate developers after a previous bad experience. But Madhusudha Infra restored my faith completely. Every promise they made — timeline, quality, documentation — was honored to the letter. My villa is everything I dreamed of.",
  },
  {
    id: 4,
    name: "Priya Maheshwari",
    title: "Startup Founder · Renting in Jubilee Hills",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    review: "The Skyline Residences apartment exceeded all my expectations. Modern interiors, great community, excellent maintenance. The rental process was smooth with zero hidden charges. I am so glad I chose Madhusudha over other options in the area.",
  },
  {
    id: 5,
    name: "Dr. Kiran Reddy",
    title: "Cardiologist · Invested in Grand Towers",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    review: "As an investment, Grand Towers has been phenomenal. The appreciation in value over just 18 months has been incredible. Madhusudha Infra clearly understands which micro-markets to target. Their team was also extremely professional and responsive throughout.",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: true })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section ref={ref} className="w-full py-4 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-600/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sky-400 font-bold uppercase tracking-widest text-xs">Client Stories</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">What Our Clients Say</h2>
          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            Real words from real homeowners, investors, and business tenants who trusted Madhusudha Infra.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <div className="bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-8 h-full flex flex-col">
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-sky-500/40 mb-4" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="text-slate-300 text-sm leading-relaxed flex-1 italic">&quot;{t.review}&quot;</p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-700/50">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-500/30 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white font-extrabold text-sm">{t.name}</p>
                        <p className="text-slate-400 text-xs">{t.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 hover:bg-sky-600 hover:border-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === selectedIndex ? "w-8 h-2.5 bg-sky-500" : "w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 hover:bg-sky-600 hover:border-sky-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
