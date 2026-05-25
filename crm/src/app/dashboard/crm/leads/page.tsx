"use client";

import { useState, useEffect, useRef } from "react";
import { mockLeads, Lead, LeadStage, LeadPriority, LEAD_STAGES } from "../data/leads";
import { LeadKanban, type LeadKanbanRef } from "../components/lead-kanban";
import { LeadTable } from "../components/lead-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  LayoutGrid,
  TableProperties,
  Filter,
  UserPlus,
  TrendingUp,
  Flame,
  IndianRupee,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconClass,
  trend,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconClass?: string;
  trend?: string;
}) {
  return (
    <div className="glass-card rounded-xl border border-border/50 p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", iconClass)}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
        {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
          <TrendingUp className="h-3 w-3" />
          {trend}
        </div>
      )}
    </div>
  );
}

// ─── Add Lead dialog (skeleton UI) ───────────────────────────────────────────
function AddLeadDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Add New Lead
          </DialogTitle>
          <DialogDescription>
            Fill in the details to register a new lead into the CRM pipeline.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Full Name *</Label>
              <Input placeholder="e.g. Arjun Mehta" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Phone *</Label>
              <Input placeholder="+91 XXXXX XXXXX" className="h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Email</Label>
            <Input placeholder="email@example.com" className="h-9 text-sm" type="email" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Property Type</Label>
              <select className="w-full h-9 text-sm bg-background border border-border rounded-md px-3 outline-none focus:ring-1 focus:ring-primary">
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
                <option>Commercial</option>
                <option>Penthouse</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Budget</Label>
              <Input placeholder="e.g. ₹85 L" className="h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Location / Area</Label>
            <Input placeholder="e.g. Gachibowli, Hyderabad" className="h-9 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Priority</Label>
              <select className="w-full h-9 text-sm bg-background border border-border rounded-md px-3 outline-none focus:ring-1 focus:ring-primary">
                <option>Hot</option>
                <option>Warm</option>
                <option>Cold</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Source</Label>
              <select className="w-full h-9 text-sm bg-background border border-border rounded-md px-3 outline-none focus:ring-1 focus:ring-primary">
                <option>Website</option>
                <option>Referral</option>
                <option>Walk-in</option>
                <option>Social Media</option>
                <option>Corporate</option>
                <option>LinkedIn</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Requirements / Notes</Label>
            <textarea
              rows={2}
              placeholder="Any specific requirements or notes..."
              className="w-full text-sm bg-background border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1 h-9" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 h-9 gap-2" onClick={onClose}>
              <UserPlus className="h-4 w-4" />
              Add Lead
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LeadsPage() {
  const [allLeads, setAllLeads] = useState<Lead[]>(mockLeads);
  const kanbanRef = useRef<LeadKanbanRef>(null);
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<Set<LeadStage>>(new Set());
  const [priorityFilter, setPriorityFilter] = useState<Set<LeadPriority>>(new Set());
  const [showAddLead, setShowAddLead] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("leads-view-mode");
      if (saved === "kanban" || saved === "table") {
        setViewMode(window.innerWidth >= 768 ? saved : "table");
      }
      if (window.innerWidth < 768) setViewMode("table");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setViewMode("table");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewChange = (mode: "kanban" | "table") => {
    setViewMode(mode);
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      localStorage.setItem("leads-view-mode", mode);
    }
  };

  // ── Filter logic ────────────────────────────────────────────────────────────
  const filtered = allLeads.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q) ||
      l.propertyType.toLowerCase().includes(q) ||
      l.requirements.toLowerCase().includes(q);
    const matchStage = stageFilter.size === 0 || stageFilter.has(l.stage);
    const matchPriority = priorityFilter.size === 0 || priorityFilter.has(l.priority);
    return matchSearch && matchStage && matchPriority;
  });

  // ── Stats ───────────────────────────────────────────────────────────────────
  const totalBudget = allLeads.reduce((s, l) => {
    const n = parseFloat(l.budget.replace(/[^0-9.]/g, ""));
    return s + (l.budget.includes("Cr") ? n : n / 100);
  }, 0);
  const hotLeads = allLeads.filter((l) => l.priority === "Hot").length;
  const wonLeads = allLeads.filter((l) => l.stage === "Closed Won").length;
  const convRate = ((wonLeads / allLeads.length) * 100).toFixed(0);

  const hasActiveFilters = stageFilter.size > 0 || priorityFilter.size > 0;

  const toggleStage = (s: LeadStage) => {
    setStageFilter((prev) => {
      const n = new Set(prev);
      n.has(s) ? n.delete(s) : n.add(s);
      return n;
    });
  };

  const togglePriority = (p: LeadPriority) => {
    setPriorityFilter((prev) => {
      const n = new Set(prev);
      n.has(p) ? n.delete(p) : n.add(p);
      return n;
    });
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="h-8 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-600" />
            Lead Pipeline
          </h2>
          <p className="text-sm text-muted-foreground mt-1 ml-3">
            Manage and track all real estate leads across the sales funnel.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button
            size="sm"
            className="h-9 gap-2 text-xs bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 border-0 text-white shadow-md"
            onClick={() => setShowAddLead(true)}
          >
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          label="Total Leads"
          value={allLeads.length}
          sub={`${filtered.length} shown`}
          icon={Users}
          iconClass="bg-indigo-500"
          trend="+6 this week"
        />
        <StatCard
          label="Hot Leads"
          value={hotLeads}
          sub="Require immediate action"
          icon={Flame}
          iconClass="bg-rose-500"
        />
        <StatCard
          label="Pipeline Value"
          value={`₹${totalBudget.toFixed(1)}Cr`}
          sub="Combined budget across all leads"
          icon={IndianRupee}
          iconClass="bg-emerald-500"
          trend="+₹2.4Cr this month"
        />
        <StatCard
          label="Conversion Rate"
          value={`${convRate}%`}
          sub={`${wonLeads} deals closed`}
          icon={TrendingUp}
          iconClass="bg-violet-500"
          trend="+2.1% vs last month"
        />
      </div>

      {/* ── Stage mini-pills ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {LEAD_STAGES.map((s: typeof LEAD_STAGES[number]) => {
          const count = allLeads.filter((l) => l.stage === s.stage).length;
          const isActive = stageFilter.has(s.stage);
          return (
            <button
              key={s.stage}
              onClick={() => toggleStage(s.stage)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold whitespace-nowrap transition-all duration-150 shrink-0",
                isActive
                  ? cn(s.bg, "border-current shadow-sm")
                  : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground bg-background/50"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full shrink-0", s.color)} />
              {s.label}
              <span className="ml-0.5 tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
        {hasActiveFilters && (
          <button
            onClick={() => { setStageFilter(new Set()); setPriorityFilter(new Set()); }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-dashed border-border text-[10px] text-muted-foreground hover:text-foreground hover:border-border transition-all shrink-0"
          >
            <RefreshCw className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads, location, property..."
            className="pl-9 h-9 text-sm bg-background/50"
          />
        </div>

        {/* Priority filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn("h-9 gap-1.5 text-xs", priorityFilter.size > 0 && "border-primary/50 text-primary")}
            >
              <Filter className="h-3.5 w-3.5" />
              Priority
              {priorityFilter.size > 0 && (
                <Badge className="h-4 w-4 p-0 text-[9px] flex items-center justify-center bg-primary text-primary-foreground">
                  {priorityFilter.size}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 opacity-50 ml-0.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-36">
            <DropdownMenuLabel className="text-[10px]">Filter by Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(["Hot", "Warm", "Cold"] as LeadPriority[]).map((p: LeadPriority) => (
              <DropdownMenuCheckboxItem
                key={p}
                checked={priorityFilter.has(p)}
                onCheckedChange={() => togglePriority(p)}
                className="text-xs"
              >
                {p}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Active filter count badge */}
        {hasActiveFilters && (
          <span className="text-[11px] text-muted-foreground">
            {filtered.length} of {allLeads.length} leads
          </span>
        )}

        {/* Scroll controls (only visible in Kanban mode) */}
        {viewMode === "kanban" && (
          <div className="flex items-center gap-1.5 mr-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-background/50 border-border/50 hover:bg-background/80 shadow-sm"
              onClick={() => kanbanRef.current?.scrollLeft()}
              title="Scroll Left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-background/50 border-border/50 hover:bg-background/80 shadow-sm"
              onClick={() => kanbanRef.current?.scrollRight()}
              title="Scroll Right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* View toggle */}
        <div className="flex items-center rounded-lg border border-border/50 bg-background/60 p-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChange("kanban")}
            className={cn(
              "h-7 px-2.5 gap-1.5 text-xs rounded-md transition-all",
              viewMode === "kanban"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Kanban</span>
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
            <span className="hidden sm:inline">Table</span>
          </Button>
        </div>
      </div>

      {/* ── Board / Table ────────────────────────────────────────────────── */}
      {viewMode === "kanban" ? (
        <div className="flex-1 min-h-0" style={{ height: "calc(100vh - 420px)", minHeight: 360 }}>
          <LeadKanban
            ref={kanbanRef}
            initialLeads={filtered}
            onLeadsUpdate={(updated: Lead[]) => setAllLeads((prev) => {
              // Merge stage changes from kanban back into allLeads
              const map = new Map(updated.map((l: Lead) => [l.id, l]));
              return prev.map((l: Lead) => map.get(l.id) ?? l);
            })}
          />
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <LeadTable leads={filtered} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      {/* ── Empty state ──────────────────────────────────────────────────── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center border border-border/50">
            <Users className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <p className="font-semibold text-foreground">No leads found</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Try adjusting your search or filter criteria, or add a new lead to get started.
          </p>
          <Button
            size="sm"
            className="mt-2 gap-2"
            onClick={() => setShowAddLead(true)}
          >
            <Plus className="h-4 w-4" />
            Add Your First Lead
          </Button>
        </div>
      )}

      {/* ── Add lead dialog ──────────────────────────────────────────────── */}
      <AddLeadDialog open={showAddLead} onClose={() => setShowAddLead(false)} />
    </div>
  );
}
