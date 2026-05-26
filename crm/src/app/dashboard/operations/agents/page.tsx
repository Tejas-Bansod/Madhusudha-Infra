"use client";

import React, { useState, useMemo } from "react";
import { mockAgents, Agent } from "../data/agents";
import { AgentCard } from "../components/agent-card";
import { AgentLeaderboard } from "../components/agent-leaderboard";
import { AgentDetailsSheet } from "../components/agent-details-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Trophy,
  LayoutGrid,
  Search,
  Filter,
  Plus,
  Coins,
  TrendingUp,
  Star,
  Activity,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgentsPage() {
  const [activeView, setActiveView] = useState<"grid" | "leaderboard">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // 1. Calculate stats dynamically
  const stats = useMemo(() => {
    let totalVolumeNumeric = 0;
    let totalDeals = 0;
    let ratingsSum = 0;

    mockAgents.forEach((agent) => {
      const num = parseFloat(agent.metrics.salesVolume.replace(/[^0-9.]/g, ""));
      totalVolumeNumeric += isNaN(num) ? 0 : num;
      totalDeals += agent.metrics.closedDeals;
      ratingsSum += agent.metrics.rating;
    });

    const avgRating = mockAgents.length > 0 ? (ratingsSum / mockAgents.length).toFixed(2) : "0";

    return {
      totalVolume: `₹${totalVolumeNumeric.toFixed(1)} Cr`,
      totalDeals,
      avgRating,
      activeCount: mockAgents.filter((a) => a.status === "Active" || a.status === "On Showing").length,
      totalCount: mockAgents.length
    };
  }, []);

  // 2. Extract unique specialties
  const specialties = useMemo(() => {
    const specs = new Set<string>();
    mockAgents.forEach((agent) => {
      agent.specialty.forEach((s) => specs.add(s));
    });
    return Array.from(specs);
  }, []);

  // 3. Filter agents
  const filteredAgents = useMemo(() => {
    return mockAgents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "all" || agent.specialty.includes(selectedSpecialty);

      const matchesStatus =
        selectedStatus === "all" || agent.status === selectedStatus;

      return matchesSearch && matchesSpecialty && matchesStatus;
    });
  }, [searchQuery, selectedSpecialty, selectedStatus]);

  const handleViewDetails = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            Operations Consultants
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track performance, listing portfolios, and sales volume of your advisory team.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="h-9 rounded-xl text-xs font-bold gap-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4" />
            Add Advisor
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="glass-card p-4 rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-between gap-4 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="space-y-1.5 z-10">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
              Cumulative Volume
            </span>
            <span className="text-xl font-extrabold text-foreground block font-mono">
              {stats.totalVolume}
            </span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 shrink-0 shadow-sm z-10">
            <Coins className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card p-4 rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-between gap-4 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="space-y-1.5 z-10">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
              Deals Concluded
            </span>
            <span className="text-xl font-extrabold text-foreground block font-mono">
              {stats.totalDeals}
            </span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0 shadow-sm z-10">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card p-4 rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-between gap-4 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="space-y-1.5 z-10">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
              Team Satisfaction
            </span>
            <span className="text-xl font-extrabold text-amber-500 dark:text-amber-400 block font-mono flex items-baseline gap-1">
              {stats.avgRating} <span className="text-xs text-muted-foreground font-sans">/ 5.0</span>
            </span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 shadow-sm z-10">
            <Star className="h-5 w-5 fill-current" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-card p-4 rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-between gap-4 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
          <div className="space-y-1.5 z-10">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
              Active Deployment
            </span>
            <span className="text-xl font-extrabold text-foreground block font-mono">
              {stats.activeCount} <span className="text-xs text-muted-foreground font-sans">/ {stats.totalCount}</span>
            </span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0 shadow-sm z-10">
            <Activity className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Filter and View Toggle bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20 border border-border/40 p-4 rounded-2xl">
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
            <Input
              placeholder="Search name, designation..."
              className="pl-9 h-9 rounded-xl border-border/50 text-xs bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Specialty Filter */}
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full sm:w-[160px] h-9 rounded-xl border-border/50 text-xs bg-background">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border/50">
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[150px] h-9 rounded-xl border-border/50 text-xs bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border/50">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Showing">On Showing</SelectItem>
              <SelectItem value="Out of Office">Out of Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-border/40 p-1 rounded-xl bg-muted/20 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-lg",
              activeView === "grid"
                ? "bg-background text-foreground border border-border/30 hover:bg-background"
                : "text-muted-foreground hover:bg-muted/15"
            )}
            onClick={() => setActiveView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-lg",
              activeView === "leaderboard"
                ? "bg-background text-foreground border border-border/30 hover:bg-background"
                : "text-muted-foreground hover:bg-muted/15"
            )}
            onClick={() => setActiveView("leaderboard")}
          >
            <Trophy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Grid / Leaderboard Content */}
      {filteredAgents.length > 0 ? (
        activeView === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <AgentLeaderboard
            agents={filteredAgents}
            onViewDetails={handleViewDetails}
          />
        )
      ) : (
        <div className="text-center py-16 bg-muted/10 border border-dashed border-border/40 rounded-2xl">
          <Users className="h-10 w-10 text-muted-foreground/50 mx-auto stroke-1" />
          <h3 className="mt-4 font-bold text-sm text-foreground">No advisors found</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search terms or filters to locate consultants.
          </p>
        </div>
      )}

      {/* Detailed Analytics Sheet */}
      <AgentDetailsSheet
        agent={selectedAgent}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedAgent(null);
        }}
      />
    </div>
  );
}
