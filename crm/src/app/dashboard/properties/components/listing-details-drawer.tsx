"use client";

import React, { useState, useEffect } from "react";
import { PropertyListing, PROPERTY_TYPES, LISTING_STATUSES } from "../data/listings";
import { mockLeads, Lead } from "../../crm/data/leads";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building,
  DollarSign,
  Calculator,
  UserCheck,
  TrendingUp,
  Percent,
  CheckCircle,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import { Label } from "@/components/ui/label";

interface ListingDetailsDrawerProps {
  listing: PropertyListing | null;
  open: boolean;
  onClose: () => void;
}

export function ListingDetailsDrawer({
  listing,
  open,
  onClose,
}: {
  listing: PropertyListing | null;
  open: boolean;
  onClose: () => void;
}) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [matchingLeads, setMatchingLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (!listing) return;

    // Intelligent CRM Matchmaking Logic:
    // Match leads looking for the SAME property type OR in the same general location,
    // and whose budget is within 25% of the listing's price.
    const propertyPrice = listing.priceNumeric;
    
    const matched = mockLeads.filter((lead) => {
      // Parse lead budget (e.g. "₹5.2 Cr" or "₹68 L")
      const budgetClean = parseFloat(lead.budget.replace(/[^0-9.]/g, ""));
      const isCr = lead.budget.includes("Cr");
      const budgetVal = isCr ? budgetClean * 10000000 : budgetClean * 100000;
      
      const typeMatch = lead.propertyType === listing.type;
      
      // Budget check: lead budget is within 30% of property price
      const priceDifferenceRatio = Math.abs(budgetVal - propertyPrice) / propertyPrice;
      const budgetMatch = priceDifferenceRatio <= 0.35;

      return typeMatch || budgetMatch;
    });

    setMatchingLeads(matched.slice(0, 3));
  }, [listing]);

  if (!listing) return null;

  const typeDef = PROPERTY_TYPES.find((t) => t.type === listing.type);
  const statusDef = LISTING_STATUSES.find((s) => s.status === listing.status);

  // EMI Calculator Formulas
  const calculateEMI = () => {
    const principal = listing.priceNumeric * (1 - downPaymentPct / 100);
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenureYears * 12;
    if (monthlyRate === 0) return principal / months;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const emiValue = calculateEMI();
  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto scrollbar-thin border-l border-border/50 p-4">
        {listing.image && (
          <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4 border border-border/50 bg-muted">
            <img
              src={listing.image}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>
        )}
        <SheetHeader className="pb-4 border-b border-border/40">
          <div className="flex items-center justify-between">
            <Badge className={cn("text-[9px] font-bold tracking-wider px-2 py-0.5 border uppercase", typeDef?.color, typeDef?.border)}>
              {typeDef?.label}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Built in {listing.yearBuilt}
            </div>
          </div>
          <div className="space-y-1.5 mt-3">
            <SheetTitle className="text-lg font-bold text-foreground leading-snug">{listing.title}</SheetTitle>
            <SheetDescription className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              {listing.location}
            </SheetDescription>
          </div>
          {/* Quick Stats Block */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Listing Price</span>
              <span className="text-xl font-black text-foreground font-mono">{listing.price}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className={cn("text-[10px] font-bold border py-1 px-2.5", statusDef?.text)}>
                {statusDef?.label}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        {/* Content Body */}
        <div className="py-6 space-y-6">
          {/* Section: Specifications */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Property Specifications</h4>
            <div className="grid grid-cols-2 gap-3 bg-muted/20 border border-border/40 rounded-xl p-3.5">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Super Built-up Area</span>
                <span className="text-xs font-bold text-foreground font-mono">{listing.sqft.toLocaleString("en-IN")} sq.ft</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Base Price Rate</span>
                <span className="text-xs font-bold text-foreground font-mono">₹{Math.round(listing.pricePerSqft).toLocaleString("en-IN")}/sq.ft</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Facing Aspect</span>
                <span className="text-xs font-bold text-foreground">{listing.facing} Facing</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Property Type</span>
                <span className="text-xs font-bold text-foreground">{listing.type}</span>
              </div>
            </div>
          </div>

          {/* Section: Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overview</h4>
            <p className="text-xs text-muted-foreground leading-relaxed bg-muted/10 border border-border/30 p-3 rounded-xl">
              {listing.description}
            </p>
          </div>

          {/* Section: Amenities */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Premium Amenities</h4>
            <div className="flex flex-wrap gap-1.5">
              {listing.amenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="secondary"
                  className="text-[10px] font-semibold py-1 px-2.5 bg-background border border-border/40"
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Section: Connected Agent */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Listing Advisor</h4>
            <div className="flex items-center justify-between rounded-xl border border-border/40 p-3.5 bg-muted/10">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border/50">
                  <AvatarImage src={listing.agentAvatar} />
                  <AvatarFallback className="text-[10px]">{listing.agentName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold text-foreground leading-tight">{listing.agentName}</p>
                  <p className="text-[10px] text-muted-foreground">Expert Advisor</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button variant="outline" size="icon" className="h-8 w-8 text-indigo-500 hover:text-indigo-600">
                  <Phone className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 text-violet-500 hover:text-violet-600">
                  <Mail className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Section: Intelligent Matchmaking (Wow feature) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Matching Buyer Leads</h4>
              <Badge className="text-[9px] bg-primary/10 text-primary border-primary/20 flex items-center gap-0.5">
                <UserCheck className="h-3.5 w-3.5" />
                Intelligent Match
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              {matchingLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-indigo-500/[0.02] hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-8 w-8 border border-border/50">
                      <AvatarImage src={lead.avatar} />
                      <AvatarFallback className="text-[9px]">{lead.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{lead.name}</p>
                      <p className="text-[9px] text-muted-foreground flex items-center gap-0.5 mt-0.5 font-mono">
                        Budget: {lead.budget} | Loc: {lead.location.split(",")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 select-none">
                    <Badge variant="outline" className="text-[8px] uppercase tracking-wide border-primary-500/20 bg-indigo-500/10 text-indigo-500">
                      Match Score: 92%
                    </Badge>
                  </div>
                </div>
              ))}
              {matchingLeads.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-3 border border-dashed border-border/40 rounded-xl">
                  No currently active leads match this property's price profile.
                </p>
              )}
            </div>
          </div>

          {/* Section: Interactive Mortgage/ROI Calculator */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Calculator className="h-3.5 w-3.5 text-primary" />
              Mortgage & Yield Estimator
            </h4>
            <div className="rounded-xl border border-border/40 p-4 space-y-4 bg-muted/10">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-[9px] uppercase font-bold text-muted-foreground">Down Payment</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={downPaymentPct}
                      onChange={(e) => setDownPaymentPct(Math.max(0, Math.min(100, Number(e.target.value))))}
                      className="h-8 pl-1 pr-6 text-xs text-center font-mono font-bold"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground font-mono">%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] uppercase font-bold text-muted-foreground">Interest Rate</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                      className="h-8 pl-1 pr-6 text-xs text-center font-mono font-bold"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground font-mono">%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] uppercase font-bold text-muted-foreground">Tenure (Yrs)</Label>
                  <Input
                    type="number"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Math.max(1, Number(e.target.value)))}
                    className="h-8 px-1 text-xs text-center font-mono font-bold"
                  />
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30">
                <div className="text-center bg-slate-900/40 p-2 rounded-lg border border-border/30">
                  <span className="text-[9px] uppercase text-muted-foreground font-bold">Estimated Monthly EMI</span>
                  <p className="text-sm font-black text-primary font-mono mt-0.5">₹{emiValue.toLocaleString("en-IN")}/mo</p>
                </div>
                <div className="text-center bg-slate-900/40 p-2 rounded-lg border border-border/30">
                  <span className="text-[9px] uppercase text-muted-foreground font-bold">Annual ROI Yield</span>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">{listing.roi || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
