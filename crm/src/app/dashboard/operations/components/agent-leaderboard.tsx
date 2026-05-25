"use client";

import React from "react";
import { Agent } from "../data/agents";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Award, TrendingUp, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentLeaderboardProps {
  agents: Agent[];
  onViewDetails: (agent: Agent) => void;
}

export function AgentLeaderboard({
  agents,
  onViewDetails,
}: AgentLeaderboardProps) {
  // Sort agents by numeric sales volume
  // Helper to parse volume string like "₹58.5 Cr" to numbers for sorting
  const parseVolume = (volStr: string) => {
    const num = parseFloat(volStr.replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const sortedAgents = [...agents].sort((a, b) => {
    return parseVolume(b.metrics.salesVolume) - parseVolume(a.metrics.salesVolume);
  });

  return (
    <div className="rounded-xl border border-border/40 overflow-hidden bg-slate-950/45 backdrop-blur-md">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow className="border-b border-border/30 hover:bg-transparent">
            <TableHead className="w-[80px] font-mono text-[10px] uppercase font-bold text-muted-foreground text-center">Rank</TableHead>
            <TableHead className="font-mono text-[10px] uppercase font-bold text-muted-foreground">Consultant</TableHead>
            <TableHead className="font-mono text-[10px] uppercase font-bold text-muted-foreground hidden md:table-cell">Primary Specialty</TableHead>
            <TableHead className="font-mono text-[10px] uppercase font-bold text-muted-foreground text-center">Deals Closed</TableHead>
            <TableHead className="font-mono text-[10px] uppercase font-bold text-muted-foreground text-center">Rating</TableHead>
            <TableHead className="font-mono text-[10px] uppercase font-bold text-muted-foreground text-right">Closed Volume</TableHead>
            <TableHead className="w-[100px] text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAgents.map((agent, index) => {
            const isTopRank = index === 0;
            const rank = index + 1;

            return (
              <TableRow
                key={agent.id}
                className="border-b border-border/20 hover:bg-muted/10 transition-colors cursor-pointer group"
                onClick={() => onViewDetails(agent)}
              >
                {/* Rank cell */}
                <TableCell className="text-center font-mono font-bold">
                  {isTopRank ? (
                    <div className="flex justify-center">
                      <div className="h-6 w-6 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center text-xs animate-bounce" title="Top Performer">
                        <Trophy className="h-3 w-3 fill-current" />
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground/80">#{rank}</span>
                  )}
                </TableCell>

                {/* Consultant Profile info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border/40 shrink-0">
                      <AvatarImage src={agent.avatar} alt={agent.name} />
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {agent.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors duration-150">
                        {agent.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Specialty */}
                <TableCell className="hidden md:table-cell">
                  <div className="flex gap-1">
                    {agent.specialty.slice(0, 2).map((spec) => (
                      <Badge
                        key={spec}
                        variant="outline"
                        className="text-[9px] px-1.5 py-0.2 border-border/40 text-muted-foreground bg-muted/20"
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                {/* Deals Closed count */}
                <TableCell className="text-center font-mono font-bold text-xs text-foreground">
                  {agent.metrics.closedDeals}
                </TableCell>

                {/* Star rating */}
                <TableCell>
                  <div className="flex items-center justify-center gap-1 font-mono font-bold text-xs text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    {agent.metrics.rating}
                  </div>
                </TableCell>

                {/* Closed Volume value */}
                <TableCell className="text-right font-mono font-extrabold text-xs text-foreground">
                  {agent.metrics.salesVolume}
                </TableCell>

                {/* View Details CTA */}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[10px] font-bold gap-1 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(agent);
                    }}
                  >
                    <Award className="h-3 w-3" />
                    Hub
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
