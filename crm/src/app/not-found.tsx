"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, ArrowLeft, Search, Compass, Key, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/dashboard?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 crm-gradient-bg relative overflow-hidden font-sans">
      
      {/* Absolute Decorative Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="max-w-4xl w-full rounded-2xl border border-border/40 glass-card shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* Left Side: Creative Visual (Real Estate Blueprint/Theme) */}
        <div className="md:w-1/2 relative min-h-[250px] md:min-h-[450px] bg-indigo-950 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Modern Minimalist Architecture Mockup" 
            className="absolute inset-0 object-cover w-full h-full opacity-60 hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="inline-flex p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <Compass className="h-6 w-6 text-teal-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Status: Address Unknown</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              We scouted the entire city, checked the land records, and verified the registry. Unfortunately, this specific property listing doesn't exist.
            </p>
          </div>
        </div>

        {/* Right Side: Action Panel */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between space-y-8 bg-background/40 backdrop-blur-md">
          
          {/* Logo and Big Error Number */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase tracking-widest">
              <Key className="h-4 w-4 text-teal-500" />
              <span>Madhusudha Infra</span>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-indigo-500 font-mono">
                404
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                Property Not Found
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                The listing page, client portal, or dashboard link you requested is currently unavailable or has been relocated off the market.
              </p>
            </div>
          </div>

          {/* Search bar helper */}
          <div className="space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Search Active Inventory
            </span>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Try 'Gachibowli', 'Villa'..." 
                  className="pl-9 h-9 text-xs focus:ring-1 focus:ring-primary bg-background/50 border-border/60"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="sm" className="h-9 font-semibold text-xs px-3">
                Find
              </Button>
            </form>
          </div>

          {/* Return controls */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild className="flex-1 font-semibold text-xs h-9 justify-center gap-2 cursor-pointer shadow-sm">
              <Link href="/dashboard">
                <Home className="h-3.5 w-3.5" />
                Return to Dashboard
              </Link>
            </Button>
            <Button variant="outline" className="flex-1 font-semibold text-xs h-9 justify-center gap-2 cursor-pointer border-border/60" onClick={() => window.history.back()}>
              <ArrowLeft className="h-3.5 w-3.5" />
              Go Back Previous
            </Button>
          </div>

          {/* Footer Support Tag */}
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground border-t border-border/10 pt-4">
            <HelpCircle className="h-3 w-3 text-indigo-500" />
            <span>Need assistance? Contact project developers at admin@infra.com</span>
          </div>

        </div>

      </div>
      
    </div>
  );
}
