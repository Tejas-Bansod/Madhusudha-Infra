"use client";

import React, { useState, useEffect } from "react";
import {
  mockListings,
  PropertyListing,
  PropertyType,
  ListingStatus,
  PROPERTY_TYPES,
  LISTING_STATUSES,
} from "../data/listings";
import { ListingCard } from "../components/listing-card";
import { ListingTable } from "../components/listing-table";
import { ListingMapHud } from "../components/listing-map-hud";
import { ListingDetailsDrawer } from "../components/listing-details-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  LayoutGrid,
  TableProperties,
  Map,
  Download,
  DollarSign,
  TrendingUp,
  Building,
  Key,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// ─── Stat Card Component ──────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  gradient,
}: {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ElementType;
  gradient: string;
}) {
  return (
    <div className="glass-card rounded-xl border border-border/50 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="space-y-1.5 z-10">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <span className="text-[10px] text-muted-foreground block">{subtext}</span>
      </div>
      <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner z-10", gradient)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}

// ─── Add Listing Dialog ────────────────────────────────────────────────────────
function AddListingDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add New Property Listing
          </DialogTitle>
          <DialogDescription>
            Publish a new residential or commercial property listing to the CRM.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Property Title *</Label>
            <Input placeholder="e.g. Prestige Lakeview Penthouse" className="h-9 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Property Type</Label>
              <select className="w-full h-9 text-sm bg-background border border-border rounded-md px-3 outline-none focus:ring-1 focus:ring-primary">
                <option>Apartment</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Commercial</option>
                <option>Plot</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Availability Status</Label>
              <select className="w-full h-9 text-sm bg-background border border-border rounded-md px-3 outline-none focus:ring-1 focus:ring-primary">
                <option>Available</option>
                <option>Under Offer</option>
                <option>Reserved</option>
                <option>Sold</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Price (INR) *</Label>
              <Input placeholder="e.g. ₹3.5 Cr or ₹85 L" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Carpet Area (Sq.ft) *</Label>
              <Input placeholder="e.g. 2400" type="number" className="h-9 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">BHK Config</Label>
              <Input placeholder="e.g. 3" type="number" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Facing Aspect</Label>
              <select className="w-full h-9 text-sm bg-background border border-border rounded-md px-3 outline-none focus:ring-1 focus:ring-primary">
                <option>East</option>
                <option>West</option>
                <option>North</option>
                <option>South</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Year Built</Label>
              <Input placeholder="e.g. 2024" type="number" className="h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Location Address *</Label>
            <Input placeholder="e.g. Gachibowli, Hyderabad" className="h-9 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Description</Label>
            <textarea
              rows={2}
              placeholder="Provide a detailed overview of property details, layouts..."
              className="w-full text-sm bg-background border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1 h-9" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 h-9 gap-2" onClick={onClose}>
              Publish Listing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PropertyListingsPage() {
  const [listings, setListings] = useState<PropertyListing[]>(mockListings);
  const [viewMode, setViewMode] = useState<"grid" | "table" | "map">("grid");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<Set<PropertyType>>(new Set());
  const [statusFilter, setStatusFilter] = useState<Set<ListingStatus>>(new Set());
  const [showAddListing, setShowAddListing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("properties-view-mode");
      if (saved === "grid" || saved === "table" || saved === "map") {
        setViewMode(saved);
      }
    }
  }, []);

  const handleViewChange = (mode: "grid" | "table" | "map") => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("properties-view-mode", mode);
    }
  };

  // ─── Filter Logic ───────────────────────────────────────────────────────────
  const filtered = listings.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q) ||
      l.amenities.some((a) => a.toLowerCase().includes(q));
    const matchType = typeFilter.size === 0 || typeFilter.has(l.type);
    const matchStatus = statusFilter.size === 0 || statusFilter.has(l.status);
    return matchSearch && matchType && matchStatus;
  });

  const toggleType = (t: PropertyType) => {
    setTypeFilter((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };

  const toggleStatus = (s: ListingStatus) => {
    setStatusFilter((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const clearFilters = () => {
    setTypeFilter(new Set());
    setStatusFilter(new Set());
  };

  // ─── Portfolio Metrics ──────────────────────────────────────────────────────
  const totalValue = listings.reduce((sum, l) => sum + l.priceNumeric, 0);
  const availableCount = listings.filter((l) => l.status === "Available").length;
  const averageRate =
    listings.reduce((sum, l) => sum + l.pricePerSqft, 0) / listings.length;

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="h-8 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-600" />
            Property Listings
          </h2>
          <p className="text-sm text-muted-foreground mt-1 ml-3">
            Publish, manage, and query catalog properties across residential & commercial sectors.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export Catalog
          </Button>
          <Button
            size="sm"
            className="h-9 gap-2 text-xs bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 border-0 text-white shadow-md"
            onClick={() => setShowAddListing(true)}
          >
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Total Inventory"
          value={listings.length}
          subtext={`${availableCount} Available`}
          icon={Building}
          gradient="bg-indigo-500"
        />
        <StatCard
          title="Portfolio Valuation"
          value={`₹${(totalValue / 10000000).toFixed(1)} Cr`}
          subtext="Combined listings value"
          icon={DollarSign}
          gradient="bg-emerald-500"
        />
        <StatCard
          title="Average Rate"
          value={`₹${Math.round(averageRate).toLocaleString("en-IN")}/sf`}
          subtext="Across sectors"
          icon={TrendingUp}
          gradient="bg-amber-500"
        />
        <StatCard
          title="Avg Rental ROI"
          value="6.4%"
          subtext="Under management index"
          icon={Key}
          gradient="bg-violet-500"
        />
      </div>

      {/* Type Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {PROPERTY_TYPES.map((t) => {
          const count = listings.filter((l) => l.type === t.type).length;
          const isActive = typeFilter.has(t.type);
          return (
            <button
              key={t.type}
              onClick={() => toggleType(t.type)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold whitespace-nowrap transition-all duration-150 shrink-0",
                isActive
                  ? cn(t.bg, "border-current shadow-sm")
                  : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground bg-background/50"
              )}
            >
              {t.label}
              <span className="ml-0.5 opacity-65 font-mono">{count}</span>
            </button>
          );
        })}
        {(typeFilter.size > 0 || statusFilter.size > 0) && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-dashed border-border text-[10px] text-muted-foreground hover:text-foreground hover:border-border transition-all shrink-0"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Toolbar Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search titles, locations, amenities..."
            className="pl-9 h-9 text-sm bg-background/50"
          />
        </div>

        {/* Availability dropdown filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn("h-9 gap-1.5 text-xs", statusFilter.size > 0 && "border-primary/50 text-primary")}
            >
              <Filter className="h-3.5 w-3.5" />
              Listing Status
              {statusFilter.size > 0 && (
                <Badge className="h-4 w-4 p-0 text-[9px] flex items-center justify-center bg-primary text-primary-foreground">
                  {statusFilter.size}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 opacity-50 ml-0.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel className="text-[10px]">Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {LISTING_STATUSES.map((s) => (
              <DropdownMenuCheckboxItem
                key={s.status}
                checked={statusFilter.has(s.status)}
                onCheckedChange={() => toggleStatus(s.status)}
                className="text-xs"
              >
                {s.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1" />

        {/* View Layout Mode Selector */}
        <div className="flex items-center rounded-lg border border-border/50 bg-background/60 p-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChange("grid")}
            className={cn(
              "h-7 px-2.5 gap-1.5 text-xs rounded-md transition-all",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Gallery</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChange("table")}
            className={cn(
              "h-7 px-2.5 gap-1.5 text-xs rounded-md transition-all",
              viewMode === "table"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <TableProperties className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sheet List</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChange("map")}
            className={cn(
              "h-7 px-2.5 gap-1.5 text-xs rounded-md transition-all",
              viewMode === "map"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Map className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GPS HUD Map</span>
          </Button>
        </div>
      </div>

      {/* Main viewport */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3 border border-dashed border-border/50 rounded-2xl bg-muted/5">
          <div className="h-16 w-16 rounded-full bg-muted/40 flex items-center justify-center">
            <Building className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <p className="font-semibold text-foreground">No property listings found</p>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Try adjusting your search criteria, clearing type pills, or register a new property listing.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((prop) => (
            <ListingCard key={prop.id} listing={prop} onClick={() => setSelectedProperty(prop)} />
          ))}
        </div>
      ) : viewMode === "table" ? (
        <div className="w-full">
          <ListingTable listings={filtered} onRowClick={setSelectedProperty} />
        </div>
      ) : (
        <div className="w-full">
          <ListingMapHud
            listings={filtered}
            selectedId={selectedProperty?.id || null}
            onSelectProperty={setSelectedProperty}
          />
        </div>
      )}

      {/* Overlay Drawers / Modals */}
      <ListingDetailsDrawer
        listing={selectedProperty}
        open={selectedProperty !== null}
        onClose={() => setSelectedProperty(null)}
      />
      <AddListingDialog open={showAddListing} onClose={() => setShowAddListing(false)} />
    </div>
  );
}
