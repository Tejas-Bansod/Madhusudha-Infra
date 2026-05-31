"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const carouselProperties = [
  {
    id: 1,
    title: "Awesome Family Apartment",
    beds: 3,
    baths: 2.5,
    area: "1,300",
    price: "₹5.5 Cr",
    status: "Pending",
    featured: true,
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 2,
    title: "Modern Waterfront Villa",
    beds: 5,
    baths: 4.5,
    area: "4,200",
    price: "₹8.9 Cr",
    status: "For Sale",
    featured: true,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 3,
    title: "Penthouse Overlooking Skyline",
    beds: 4,
    baths: 4,
    area: "3,100",
    price: "₹6.2 Cr",
    status: "Featured",
    featured: true,
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: 4,
    title: "Suburban Green Oasis Villa",
    beds: 4,
    baths: 3.5,
    area: "2,800",
    price: "₹4.75 Cr",
    status: "Pending",
    featured: true,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function PropertiesCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="w-full py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-sky-600 font-bold uppercase tracking-widest text-xs">Featured Spotlight</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">Featured Property Spotlight</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            Explore our signature developments, carefully curated to offer unmatched luxury, comfort, and exceptional investment value in Hyderabad's prime localities.
          </p>
        </div>
      </div>

      {/* Full-width Carousel Wrapper */}
      <div className="w-full overflow-hidden my-4">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full relative"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {carouselProperties.map((prop) => (
              <CarouselItem
                key={prop.id}
                className="pl-4 md:pl-6 basis-[88%] sm:basis-[80%] md:basis-[75%] lg:basis-[70%] xl:basis-[65%] shrink-0"
              >
                <div className="relative group overflow-hidden rounded-3xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badges */}
                  {prop.featured && (
                    <Badge className="absolute top-6 left-6 bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-xs font-semibold px-3 py-1 rounded-md">
                      Featured
                    </Badge>
                  )}
                  <Badge className="absolute top-6 right-6 bg-sky-600 hover:bg-sky-700 text-white border-0 text-xs font-semibold px-3 py-1 rounded-md">
                    {prop.status}
                  </Badge>

                  {/* Property Details (Bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 drop-shadow-sm">
                      {prop.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/80 text-xs sm:text-sm font-medium mb-3">
                      <span>{prop.beds} Beds</span>
                      <span>•</span>
                      <span>{prop.baths} Baths</span>
                      <span>•</span>
                      <span>{prop.area} ft²</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-sm">
                      {prop.price}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Navigation & CTA Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Left Arrow Controls */}
          <div className="flex gap-2">
            <Button
              onClick={() => api?.scrollPrev()}
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-lg bg-sky-50 border-0 hover:bg-sky-600 hover:text-white text-sky-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => api?.scrollNext()}
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-lg bg-sky-50 border-0 hover:bg-sky-600 hover:text-white text-sky-600 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Right Action Button */}
          <Button
            asChild
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-sm transition-all"
          >
            <Link href="#">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
