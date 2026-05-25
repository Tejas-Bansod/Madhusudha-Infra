"use client";

import React from "react";
import { PropertyListing, PROPERTY_TYPES, LISTING_STATUSES } from "../data/listings";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bed,
  Bath,
  Car,
  Compass,
  MapPin,
  Flame,
  ArrowRight,
  TrendingUp,
  Percent,
} from "lucide-react";

interface ListingCardProps {
  listing: PropertyListing;
  onClick: () => void;
}

export function ListingCard({ listing, onClick }: ListingCardProps) {
  const typeDef = PROPERTY_TYPES.find((t) => t.type === listing.type);
  const statusDef = LISTING_STATUSES.find((s) => s.status === listing.status);

  // Gradient backdrop based on type
  const getGradientClass = (type: string) => {
    switch (type) {
      case "Villa":
        return "from-emerald-500/20 to-teal-500/5 hover:from-emerald-500/30";
      case "Penthouse":
        return "from-rose-500/20 to-violet-500/5 hover:from-rose-500/30";
      case "Commercial":
        return "from-cyan-500/20 to-indigo-500/5 hover:from-cyan-500/30";
      case "Plot":
        return "from-amber-500/20 to-orange-500/5 hover:from-amber-500/30";
      default:
        return "from-indigo-500/20 to-blue-500/5 hover:from-indigo-500/30";
    }
  };

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-lg hover:border-border transition-all duration-300 cursor-pointer group flex flex-col h-full"
    >
      {/* Visual Header / Image placeholder */}
      <div className="h-40 w-full relative overflow-hidden flex flex-col justify-between p-4 transition-all duration-300">
        {/* Background Image / Gradient */}
        {listing.image ? (
          <>
            <img
              src={listing.image}
              alt={listing.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-550 group-hover:scale-110"
            />
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40 z-0" />
          </>
        ) : (
          <>
            <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-350", getGradientClass(listing.type))} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />
          </>
        )}

        {/* Top bar: Type and Status */}
        <div className="flex items-center justify-between z-10">
          <Badge
            variant="outline"
            className={cn("text-[9px] font-bold px-2 py-0.5 border uppercase backdrop-blur-md bg-background/50", typeDef?.color, typeDef?.border)}
          >
            {typeDef?.label}
          </Badge>
          <Badge
            variant="outline"
            className={cn("text-[9px] font-bold px-2 py-0.5 border uppercase backdrop-blur-md bg-background/50", statusDef?.text)}
          >
            {statusDef?.label}
          </Badge>
        </div>

        {/* Price & Address Overlay */}
        <div className="space-y-1 z-10">
          <div className="text-2xl font-black text-white tracking-tight drop-shadow-sm font-mono flex items-baseline gap-1">
            {listing.price}
          </div>
          <p className="text-[10px] text-zinc-300 flex items-center gap-0.5 truncate drop-shadow-sm font-medium">
            <MapPin className="h-3 w-3 text-indigo-400 shrink-0" />
            {listing.location}
          </p>
        </div>

        {/* Glassmorphic border lines */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent z-10" />
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {listing.title}
          </h3>
          <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Specifications Icons Grid */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-border/20 text-center">
          <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-muted/20">
            <Bed className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] font-bold text-foreground mt-0.5">{listing.bedrooms || "-"}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-muted/20">
            <Bath className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] font-bold text-foreground mt-0.5">{listing.bathrooms || "-"}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-muted/20">
            <Car className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[10px] font-bold text-foreground mt-0.5">{listing.parkings || "-"}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-1 rounded-lg bg-muted/20">
            <Compass className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-[9px] font-bold text-foreground mt-0.5">{listing.facing}</span>
          </div>
        </div>

        {/* Size tag & Yield ROI */}
        <div className="flex items-center justify-between text-xs font-semibold pt-1">
          <div className="flex flex-col">
            <span className="text-[8px] text-muted-foreground uppercase leading-none">Carpet Area</span>
            <span className="text-[11px] font-bold text-foreground font-mono mt-1">
              {listing.sqft.toLocaleString("en-IN")} sqft
            </span>
          </div>

          {listing.roi !== "N/A" && (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
              <TrendingUp className="h-3 w-3" />
              <span>ROI Yield {listing.roi}</span>
            </div>
          )}
        </div>

        {/* Agent Info footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/20 mt-auto">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border border-border/50">
              <AvatarImage src={listing.agentAvatar} />
              <AvatarFallback className="text-[9px] font-bold">{listing.agentName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-muted-foreground font-medium">{listing.agentName}</span>
          </div>
          <div className="text-[9px] text-muted-foreground font-mono">
            ₹{Math.round(listing.pricePerSqft).toLocaleString("en-IN")}/sqft
          </div>
        </div>
      </div>
    </div>
  );
}
