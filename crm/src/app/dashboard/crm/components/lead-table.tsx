"use client";

import React, { useState } from "react";
import { Lead, LeadStage, LeadPriority, LEAD_STAGES } from "../data/leads";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Phone,
  Mail,
  MoreHorizontal,
  Flame,
  Thermometer,
  Snowflake,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  CalendarClock,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Priority icons ───────────────────────────────────────────────────────────
const priorityConfig: Record<
  LeadPriority,
  { icon: React.ComponentType<any>; className: string }
> = {
  Hot: {
    icon: Flame,
    className: "bg-rose-500/10 text-rose-600 border-rose-500/25 dark:text-rose-400",
  },
  Warm: {
    icon: Thermometer,
    className: "bg-amber-500/10 text-amber-600 border-amber-500/25 dark:text-amber-400",
  },
  Cold: {
    icon: Snowflake,
    className: "bg-blue-500/10 text-blue-600 border-blue-500/25 dark:text-blue-400",
  },
};

// ─── Stage badge ──────────────────────────────────────────────────────────────
function StageBadge({ stage }: { stage: LeadStage }) {
  const def = LEAD_STAGES.find((s: typeof LEAD_STAGES[number]) => s.stage === stage);
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-semibold px-2 py-0.5 border",
        def?.bg,
        stage === "New" && "text-slate-600 border-slate-400/30 dark:text-slate-300",
        stage === "Contacted" && "text-blue-600 border-blue-400/30 dark:text-blue-400",
        stage === "Site Visit" && "text-violet-600 border-violet-400/30 dark:text-violet-400",
        stage === "Negotiation" && "text-amber-600 border-amber-400/30 dark:text-amber-400",
        stage === "Closed Won" && "text-emerald-600 border-emerald-400/30 dark:text-emerald-400",
        stage === "Closed Lost" && "text-rose-600 border-rose-400/30 dark:text-rose-400"
      )}
    >
      <span className={cn("mr-1 inline-block h-1.5 w-1.5 rounded-full", def?.color)} />
      {stage}
    </Badge>
  );
}

// ─── Sort types ───────────────────────────────────────────────────────────────
type SortField = "name" | "budget" | "stage" | "priority" | "lastActivity";
type SortDir = "asc" | "desc";

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (field !== sortField) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
  return sortDir === "asc"
    ? <ArrowUp className="h-3 w-3 text-primary" />
    : <ArrowDown className="h-3 w-3 text-primary" />;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function LeadTable({ leads }: { leads: Lead[] }) {
  const [sortField, setSortField] = useState<SortField>("lastActivity");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const stageOrder: LeadStage[] = ["New", "Contacted", "Site Visit", "Negotiation", "Closed Won", "Closed Lost"];
  const priorityOrder = ["Hot", "Warm", "Cold"];

  const sorted = [...leads].sort((a, b) => {
    let cmp = 0;
    switch (sortField) {
      case "name":
        cmp = a.name.localeCompare(b.name);
        break;
      case "budget": {
        const toNum = (s: string) => {
          const n = parseFloat(s.replace(/[^0-9.]/g, ""));
          return s.includes("Cr") ? n * 100 : n;
        };
        cmp = toNum(a.budget) - toNum(b.budget);
        break;
      }
      case "stage":
        cmp = stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage);
        break;
      case "priority":
        cmp = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        break;
      case "lastActivity":
        cmp = a.lastActivity.localeCompare(b.lastActivity);
        break;
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  const thClass =
    "text-[10px] uppercase tracking-wider font-semibold text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors";

  return (
    <TooltipProvider delayDuration={300}>
      <div className="rounded-xl border border-border/50 overflow-hidden glass-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border/50 hover:bg-transparent">
                <TableHead className={cn(thClass, "w-[220px]")} onClick={() => handleSort("name")}>
                  <span className="flex items-center gap-1">
                    Lead <SortIcon field="name" sortField={sortField} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead className={cn(thClass)} onClick={() => handleSort("stage")}>
                  <span className="flex items-center gap-1">
                    Stage <SortIcon field="stage" sortField={sortField} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead className={cn(thClass)} onClick={() => handleSort("priority")}>
                  <span className="flex items-center gap-1">
                    Priority <SortIcon field="priority" sortField={sortField} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead className={thClass}>Property</TableHead>
                <TableHead className={cn(thClass)} onClick={() => handleSort("budget")}>
                  <span className="flex items-center gap-1">
                    Budget <SortIcon field="budget" sortField={sortField} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead className={thClass}>Location</TableHead>
                <TableHead className={thClass}>Source</TableHead>
                <TableHead className={thClass}>Agent</TableHead>
                <TableHead className={cn(thClass)} onClick={() => handleSort("lastActivity")}>
                  <span className="flex items-center gap-1">
                    Last Activity <SortIcon field="lastActivity" sortField={sortField} sortDir={sortDir} />
                  </span>
                </TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12 text-muted-foreground text-sm">
                    No leads found matching your filters.
                  </TableCell>
                </TableRow>
              )}
              {sorted.map((lead) => {
                const pCfg = priorityConfig[lead.priority];
                const PIcon = pCfg.icon;
                return (
                  <TableRow
                    key={lead.id}
                    className="border-b border-border/30 hover:bg-muted/20 transition-colors group"
                  >
                    {/* Lead */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 border border-border/50 shrink-0">
                          <AvatarImage src={lead.avatar} alt={lead.name} />
                          <AvatarFallback className="text-[10px] font-bold">
                            {lead.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{lead.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{lead.phone}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Stage */}
                    <TableCell>
                      <StageBadge stage={lead.stage} />
                    </TableCell>

                    {/* Priority */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] font-bold gap-1 px-2", pCfg.className)}
                      >
                        <PIcon className="h-3 w-3" />
                        {lead.priority}
                      </Badge>
                    </TableCell>

                    {/* Property */}
                    <TableCell>
                      <span className="text-[11px] text-foreground font-medium">{lead.propertyType}</span>
                    </TableCell>

                    {/* Budget */}
                    <TableCell>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {lead.budget}
                      </span>
                    </TableCell>

                    {/* Location */}
                    <TableCell>
                      <span className="text-[11px] text-muted-foreground truncate max-w-[120px] block">
                        {lead.location}
                      </span>
                    </TableCell>

                    {/* Source */}
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] font-medium">
                        {lead.source}
                      </Badge>
                    </TableCell>

                    {/* Agent */}
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Avatar className="h-6 w-6 border border-border/50 shrink-0">
                          <AvatarImage src={lead.agentAvatar} />
                          <AvatarFallback className="text-[8px]">{lead.agent.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] text-muted-foreground font-medium truncate max-w-[70px]">
                          {lead.agent.split(" ")[0]}
                        </span>
                      </div>
                    </TableCell>

                    {/* Last Activity */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <CalendarClock className="h-3 w-3 shrink-0" />
                        {lead.lastActivity}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-blue-500">
                              <Phone className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-[10px]">Call</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-violet-500">
                              <Mail className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-[10px]">Email</TooltipContent>
                        </Tooltip>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="text-xs w-40">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-3.5 w-3.5" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Pencil className="h-3.5 w-3.5" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <CalendarClock className="h-3.5 w-3.5" /> Schedule Visit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-rose-500">
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  );
}
