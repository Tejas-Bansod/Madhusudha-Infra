"use client";

import React from "react";
import { Agent } from "../data/agents";
import { mockListings, PropertyListing } from "../../properties/data/listings";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Star,
  MapPin,
  TrendingUp,
  Award,
  Calendar,
  Layers,
  Phone,
  Mail,
  Clock,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentDetailsSheetProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AgentDetailsSheet({
  agent,
  isOpen,
  onClose,
}: AgentDetailsSheetProps) {
  if (!agent) return null;

  // Filter listings managed by this agent
  const agentListings = mockListings.filter((listing) =>
    agent.activeListingIds.includes(listing.id)
  );

  // Mock Reviews
  const mockReviews = [
    {
      id: "rev-1",
      client: "K. R. V. Prasad",
      text: `Extremely professional experience. Guided us throughout the registration of our ${agent.specialty[0] || "property"} with absolute clarity.`,
      rating: 5,
      date: "2 weeks ago"
    },
    {
      id: "rev-2",
      client: "Meera Nair",
      text: "Outstanding negotiation skills. Saved us significant time and capital in closing the contract.",
      rating: 4.8,
      date: "1 month ago"
    }
  ];

  // Find max sales amount to scale chart bars relatively
  const maxSales = Math.max(...agent.monthlySales.map((s) => s.amount));

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[540px] border-l border-border/50 bg-slate-950/95 backdrop-blur-md p-0 flex flex-col h-full text-foreground shadow-2xl">
        <ScrollArea className="flex-1 h-full">
          <div className="p-6 space-y-6">
            {/* Header / Profile Cover Section */}
            <SheetHeader className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-border/80 shadow-md">
                      <AvatarImage src={agent.avatar} alt={agent.name} />
                      <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                        {agent.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className={cn(
                      "absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-background shadow-sm",
                      agent.status === "Active" && "bg-emerald-500",
                      agent.status === "On Showing" && "bg-amber-500",
                      agent.status === "Out of Office" && "bg-slate-500"
                    )} />
                  </div>
                  <div>
                    <SheetTitle className="text-xl font-extrabold tracking-tight">
                      {agent.name}
                    </SheetTitle>
                    <p className="text-xs font-semibold text-primary/95 mt-0.5">
                      {agent.role}
                    </p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground/60" />
                      Experience: {agent.experience}
                    </p>
                  </div>
                </div>

                <Badge variant="outline" className="text-[10px] font-bold px-2 py-0.5 bg-slate-900 border-border uppercase">
                  {agent.status}
                </Badge>
              </div>

              {/* Quick Contact Chips */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 bg-muted/20 hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground truncate"
                >
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{agent.phone}</span>
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-border/40 bg-muted/20 hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground truncate"
                >
                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate">{agent.email}</span>
                </a>
              </div>
            </SheetHeader>

            {/* Performance Snapshot Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-border/40 bg-slate-900/30 text-center font-mono">
                <span className="block text-sm font-extrabold text-foreground">{agent.metrics.salesVolume}</span>
                <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight block mt-1">Sales Closed</span>
              </div>
              <div className="p-3.5 rounded-xl border border-border/40 bg-slate-900/30 text-center font-mono">
                <span className="block text-sm font-extrabold text-foreground">{agent.metrics.commissionEarned}</span>
                <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight block mt-1">Comm. Earned</span>
              </div>
              <div className="p-3.5 rounded-xl border border-border/40 bg-slate-900/30 text-center font-mono">
                <span className="block text-sm font-extrabold text-foreground flex items-center justify-center gap-0.5">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-current shrink-0" />
                  {agent.metrics.rating}
                </span>
                <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight block mt-1">Client Rating</span>
              </div>
            </div>

            {/* Tabs for detailed sections */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/30 border border-border/40 p-1 rounded-xl">
                <TabsTrigger value="overview" className="rounded-lg text-xs font-bold py-1.5">Overview</TabsTrigger>
                <TabsTrigger value="listings" className="rounded-lg text-xs font-bold py-1.5 flex gap-1 items-center">
                  Listings
                  {agentListings.length > 0 && (
                    <span className="h-4 w-4 text-[9px] font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono">
                      {agentListings.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="performance" className="rounded-lg text-xs font-bold py-1.5">Sales Trend</TabsTrigger>
              </TabsList>

              {/* Tab 1: Overview & Reviews */}
              <TabsContent value="overview" className="mt-4 space-y-5">
                {/* Biography */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1 font-mono">
                    <Award className="h-3.5 w-3.5 text-primary" /> Agent Biography
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border border-border/20">
                    {agent.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1 font-mono">
                    <Layers className="h-3.5 w-3.5 text-primary" /> Sub-Sectors & Specialties
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.specialty.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-[10px] px-2 py-0.5 border-border bg-slate-900 font-semibold text-foreground">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1 font-mono">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Client Testimonials
                  </h4>
                  <div className="space-y-2">
                    {mockReviews.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-lg border border-border/30 bg-slate-900/25 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-foreground">{rev.client}</span>
                          <span className="text-[9px] text-muted-foreground">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3 w-3",
                                i < Math.floor(rev.rating) ? "fill-current text-amber-500" : "text-slate-700"
                              )}
                            />
                          ))}
                          <span className="text-[10px] text-muted-foreground font-mono ml-1">{rev.rating}</span>
                        </div>
                        <p className="text-muted-foreground italic leading-relaxed">
                          "{rev.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Tab 2: Managed Listings */}
              <TabsContent value="listings" className="mt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1 font-mono">
                    <Layers className="h-3.5 w-3.5 text-primary" /> Active Catalog Assignments
                  </h4>
                  <span className="text-[10px] text-muted-foreground font-mono">{agentListings.length} Active Listings</span>
                </div>

                {agentListings.length > 0 ? (
                  <div className="space-y-2">
                    {agentListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="p-3 rounded-xl border border-border/40 bg-slate-900/35 hover:bg-slate-900/60 transition-all duration-200 flex items-center justify-between gap-3 group/item cursor-pointer"
                      >
                        <div className="flex gap-3 items-center min-w-0">
                          {listing.image && (
                            <div className="h-10 w-14 rounded overflow-hidden shrink-0 border border-slate-800 bg-slate-900">
                              <img
                                src={listing.image}
                                alt={listing.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-foreground truncate group-hover/item:text-primary transition-colors duration-150">
                              {listing.title}
                            </h5>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5 truncate">
                              <MapPin className="h-2 w-2 text-primary" />
                              {listing.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right font-mono shrink-0">
                          <span className="block text-xs font-bold text-emerald-400">{listing.price}</span>
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight block">
                            {listing.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 rounded-lg border border-dashed border-border/40 text-xs text-muted-foreground">
                    No active property listings assigned at the moment.
                  </div>
                )}
              </TabsContent>

              {/* Tab 3: Performance Charts */}
              <TabsContent value="performance" className="mt-4 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1 font-mono">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" /> Monthly Transaction Value
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    Quarterly sales volume trend in ₹ Crores (FY 2026)
                  </p>
                </div>

                {/* CSS Bar Chart */}
                <div className="bg-slate-900/35 border border-border/40 rounded-xl p-6 space-y-6">
                  <div className="flex h-36 items-end justify-between gap-4 pt-4 px-2 border-b border-border/30 font-mono">
                    {agent.monthlySales.map((sales) => {
                      const percentage = maxSales > 0 ? (sales.amount / maxSales) * 100 : 0;
                      return (
                        <div key={sales.month} className="flex-1 flex flex-col items-center gap-2 group/bar">
                          {/* Value Tag tooltip */}
                          <span className="text-[9px] font-bold text-foreground opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 bg-slate-950 border border-slate-800 rounded px-1 -translate-y-1">
                            ₹{sales.amount}Cr
                          </span>
                          {/* Bar */}
                          <div
                            style={{ height: `${Math.max(percentage, 5)}%` }}
                            className="w-full bg-gradient-to-t from-primary/70 to-primary rounded-t-md relative shadow-md shadow-primary/10 group-hover/bar:brightness-110 transition-all duration-300"
                          >
                            {/* Glow bar */}
                            <div className="absolute inset-0 bg-primary/20 blur-[2px] opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                          </div>
                          {/* Month Label */}
                          <span className="text-[10px] font-bold text-muted-foreground mt-1">
                            {sales.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/20 border border-border/20">
                      <span className="text-muted-foreground">Highest Mo. Closed</span>
                      <span className="font-extrabold text-foreground">₹{maxSales} Cr</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/20 border border-border/20">
                      <span className="text-muted-foreground">Total Mo. Deals</span>
                      <span className="font-extrabold text-emerald-400">{agent.metrics.closedDeals} Deals</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
