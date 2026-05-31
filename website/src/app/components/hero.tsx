"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react";

// Default high-quality drone video URLs from Pexels (user can customize these)
const VIDEOS = [
  "https://videos.pexels.com/video-files/32390619/13816698_1920_1080_60fps.mp4",
  "https://videos.pexels.com/video-files/32504550/13860782_2560_1440_60fps.mp4",
  "https://videos.pexels.com/video-files/35274172/14943113_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/34287509/14526470_2560_1440_25fps.mp4"
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"Sales" | "Rentals" | "Invest">("Sales");
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Slow down all background videos for a smooth, high-end look
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.playbackRate = 0.5;
      }
    });
  }, []);

  // Make sure the active video starts playing when slides change
  useEffect(() => {
    const activeVideo = videoRefs.current[currentIndex];
    if (activeVideo) {
      activeVideo.play().catch(() => {});
    }
  }, [currentIndex]);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  return (
    <section className="relative w-full h-auto md:h-screen flex flex-col text-slate-900 bg-white overflow-visible">
      
      {/* Video Hero Block */}
      <div className="relative w-full h-[85vh] sm:h-[80vh] md:h-[70vh] min-h-[580px] sm:min-h-[600px] md:min-h-0 flex flex-col justify-center items-center text-white z-20">
        
        {/* Background Video Carousel */}
        <div className="absolute inset-0 w-full h-full z-0 bg-slate-950 overflow-hidden">
          {VIDEOS.map((src, index) => (
            <video
              key={src}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              autoPlay
              loop
              muted
              playsInline
              src={src}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out pointer-events-none ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>
        

        {/* Main Hero Content Container */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col justify-center items-center text-center z-20 px-4 md:px-12 -mt-24 md:mt-0 md:-mt-70 pb-16 md:pb-0">
          
          {/* Premium Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#0073e1]/10 text-white border border-[#0073e1]/25 backdrop-blur-md">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0073e1] animate-ping" />
            Premium Real Estate & Infra Group
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-[64px] font-black tracking-tight leading-tight drop-shadow-md">
            Find Your Dream Home in the World's Best Locations
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-xs sm:text-sm md:text-lg leading-relaxed text-slate-200/90 font-medium px-2 sm:px-4 drop-shadow-sm">
            Renowned for exceeding client expectations and delivering outstanding results, we offer seamless processes and
            exceptional service to our global clientele.
          </p>

          <div className="flex flex-row gap-3 justify-center items-center w-full sm:w-auto max-w-sm sm:max-w-none px-4">
            <a
              href="#properties"
              className="flex-1 sm:flex-initial text-center bg-[#0073e1] hover:bg-[#0060c0] text-white font-bold text-sm sm:text-base py-2.5 sm:py-3.5 px-4 sm:px-8 rounded-lg shadow-lg hover:shadow-[#0073e1]/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Properties
            </a>
            <a
              href="#contact"
              className="flex-1 sm:flex-initial text-center bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base py-2.5 sm:py-3.5 px-4 sm:px-8 rounded-lg border border-white/20 hover:border-white/35 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Contact Us
            </a>
          </div>

        </div>

        {/* Left Navigation Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/15 hover:bg-black/35 text-white/70 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-200 cursor-pointer backdrop-blur-sm hidden sm:flex items-center justify-center group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/15 hover:bg-black/35 text-white/70 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-200 cursor-pointer backdrop-blur-sm hidden sm:flex items-center justify-center group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Bottom Slide Indicators */}
        <div className="absolute bottom-64 sm:bottom-48 md:bottom-28 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {VIDEOS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? "w-8 bg-[#0073e1]" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Search Console Widget Wrapper at the bottom overlapping into the next section */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 sm:px-6 z-30">
          
          {/* Sales, Rentals, Invest Tabs */}
          <div className="flex select-none justify-center md:justify-start">
            <button
              onClick={() => setActiveTab("Sales")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 font-bold text-[11px] sm:text-sm rounded-t-lg transition-colors duration-200 cursor-pointer ${
                activeTab === "Sales"
                  ? "bg-white text-slate-800 shadow-xs"
                  : "bg-[#0073e1] hover:bg-[#0060c0] text-white"
              }`}
            >
              Sales
            </button>
            <button
              onClick={() => setActiveTab("Rentals")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 font-bold text-[11px] sm:text-sm rounded-t-lg transition-colors duration-200 cursor-pointer ${
                activeTab === "Rentals"
                  ? "bg-white text-slate-800 shadow-xs"
                  : "bg-[#0073e1] hover:bg-[#0060c0] text-white"
              }`}
            >
              Rentals
            </button>
            <button
              onClick={() => setActiveTab("Invest")}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 font-bold text-[11px] sm:text-sm rounded-t-lg transition-colors duration-200 cursor-pointer ${
                activeTab === "Invest"
                  ? "bg-white text-slate-800 shadow-xs"
                  : "bg-[#0073e1] hover:bg-[#0060c0] text-white"
              }`}
            >
              Invest
            </button>
          </div>

          {/* White Main Filter Box */}
          <div className="bg-white shadow-2xl rounded-xl md:rounded-tl-none p-3.5 sm:p-5 md:p-6 text-slate-700 w-full border border-slate-100/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 items-end">
              
              {/* Category Dropdown */}
              <div className="flex flex-col text-left space-y-1 sm:space-y-2 w-full">
                <label className="text-[10px] sm:text-xs text-slate-800 font-bold tracking-tight">
                  Categories
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-slate-200 rounded-md px-2.5 sm:px-3 py-2 sm:py-3 pr-8 text-xs sm:text-sm font-medium text-slate-600 focus:outline-none focus:border-[#0073e1] cursor-pointer">
                    <option>Property Category</option>
                    <option>Apartments</option>
                    <option>Condos</option>
                    <option>Houses</option>
                    <option>Villas</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* City Dropdown */}
              <div className="flex flex-col text-left space-y-1 sm:space-y-2 w-full">
                <label className="text-[10px] sm:text-xs text-slate-800 font-bold tracking-tight">
                  City
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-slate-200 rounded-md px-2.5 sm:px-3 py-2 sm:py-3 pr-8 text-xs sm:text-sm font-medium text-slate-600 focus:outline-none focus:border-[#0073e1] cursor-pointer">
                    <option>Property City</option>
                    <option>Hyderabad</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Bangalore</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Beds & Baths Dropdown */}
              <div className="flex flex-col text-left space-y-1 sm:space-y-2 w-full">
                <label className="text-[10px] sm:text-xs text-slate-800 font-bold tracking-tight">
                  Beds & Baths
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-slate-200 rounded-md px-2.5 sm:px-3 py-2 sm:py-3 pr-8 text-xs sm:text-sm font-medium text-slate-600 focus:outline-none focus:border-[#0073e1] cursor-pointer">
                    <option>Beds | Baths</option>
                    <option>1 Bed | 1 Bath</option>
                    <option>2 Beds | 2 Baths</option>
                    <option>3 Beds | 3 Baths</option>
                    <option>4+ Beds</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Price Dropdown */}
              <div className="flex flex-col text-left space-y-1 sm:space-y-2 w-full">
                <label className="text-[10px] sm:text-xs text-slate-800 font-bold tracking-tight">
                  Price
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-slate-200 rounded-md px-2.5 sm:px-3 py-2 sm:py-3 pr-8 text-xs sm:text-sm font-medium text-slate-600 focus:outline-none focus:border-[#0073e1] cursor-pointer">
                    {activeTab === "Sales" && (
                      <>
                        <option>Sale Price</option>
                        <option>₹50 Lakhs - ₹1 Cr</option>
                        <option>₹1 Cr - ₹2.5 Cr</option>
                        <option>₹2.5 Cr - ₹5 Cr</option>
                        <option>₹5 Cr+</option>
                      </>
                    )}
                    {activeTab === "Rentals" && (
                      <>
                        <option>Rental Price</option>
                        <option>₹15,000 - ₹30,000</option>
                        <option>₹30,000 - ₹60,000</option>
                        <option>₹60,000 - ₹1.2 Lakhs</option>
                        <option>₹1.2 Lakhs+</option>
                      </>
                    )}
                    {activeTab === "Invest" && (
                      <>
                        <option>Investment Budget</option>
                        <option>₹1 Cr - ₹3 Cr</option>
                        <option>₹3 Cr - ₹7 Cr</option>
                        <option>₹7 Cr - ₹15 Cr</option>
                        <option>₹15 Cr+</option>
                      </>
                    )}
                  </select>
                  <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full bg-[#0073e1] hover:bg-[#0060c0] text-white font-bold text-xs sm:text-sm py-2 sm:py-3 px-4 sm:px-6 rounded-md flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer h-[36px] sm:h-[46px] self-end">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Search</span>
              </button>

            </div>
          </div>

        </div>

      </div>

      {/* Properties by Area Title and Subtitle */}
      <div className="relative w-full pt-64 sm:pt-48 md:pt-28 pb-10 px-4 sm:px-6 z-10 flex flex-col text-center items-center justify-center gap-2 bg-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Properties by Area</h2>
        <p className="text-slate-500 max-w-2xl text-sm md:text-base leading-relaxed">
          Find your dream home in Nagpur with Madhusudha Infra. Explore our exclusive collection of properties by area and discover the perfect place to call home.
        </p>
      </div>
    </section>
  );
}
