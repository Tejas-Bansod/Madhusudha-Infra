"use client";

import React from "react";
import { Agent } from "../data/agents";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Mail, Phone, Calendar, Briefcase, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
  onViewDetails: (agent: Agent) => void;
}

export function AgentCard({ agent, onViewDetails }: AgentCardProps) {
  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500 text-emerald-500";
      case "On Showing":
        return "bg-amber-500 text-amber-500";
      case "Out of Office":
        return "bg-slate-400 dark:bg-slate-600 text-slate-400 dark:text-slate-600";
      default:
        return "bg-slate-500 text-slate-500";
    }
  };

  return (
    <Card className="glass-card p-0 hover-glow border-border/50 overflow-hidden flex flex-col justify-between group transition-all duration-300">
      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between gap-4">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-border/60 shadow-sm">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback className="text-sm font-bold bg-primary/10 text-primary">
                {agent.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span className={cn(
              "absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background animate-pulse shadow-sm",
              getStatusColor(agent.status).split(" ")[0]
            )} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm tracking-tight text-foreground truncate group-hover:text-primary transition-colors duration-200">
              {agent.name}
            </h3>
            <p className="text-[11px] text-muted-foreground truncate font-medium">
              {agent.role}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={cn(
                "inline-flex items-center text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase border",
                agent.status === "Active" && "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
                agent.status === "On Showing" && "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
                agent.status === "Out of Office" && "bg-slate-500/10 border-slate-500/20 text-slate-500 dark:text-slate-400"
              )}>
                {agent.status}
              </span>
              <span className="text-[10px] text-muted-foreground/80 font-semibold flex items-center gap-0.5">
                <Briefcase className="h-2.5 w-2.5" />
                {agent.experience} exp
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-2 flex-1">
        {/* Specialties Badges */}
        <div className="flex flex-wrap gap-1">
          {agent.specialty.map((spec) => (
            <Badge
              key={spec}
              variant="outline"
              className="text-[9px] px-2 py-0.5 border-border/60 bg-muted/40 font-medium text-muted-foreground"
            >
              {spec}
            </Badge>
          ))}
        </div>

        {/* Sales Stats Box */}
        <div className="grid grid-cols-3 gap-2 bg-muted/30 dark:bg-slate-900/40 rounded-xl p-3 border border-border/30 text-center font-mono">
          <div>
            <span className="block text-xs font-bold text-foreground">
              {agent.metrics.salesVolume}
            </span>
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight block mt-0.5">
              Volume
            </span>
          </div>
          <div>
            <span className="block text-xs font-bold text-foreground">
              {agent.metrics.activeListingsCount}
            </span>
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight block mt-0.5">
              Listings
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-amber-500 dark:text-amber-400 flex items-center justify-center gap-0.5">
              <Star className="h-3 w-3 fill-current shrink-0" />
              {agent.metrics.rating}
            </span>
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight block mt-0.5">
              Rating
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-border/20 flex gap-2 items-center">
        {/* Quick Contacts */}
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg hover:text-primary border-border/50 shrink-0"
            asChild
          >
            <a href={`mailto:${agent.email}`} title={agent.email}>
              <Mail className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg hover:text-primary border-border/50 shrink-0"
            asChild
          >
            <a href={`tel:${agent.phone}`} title={agent.phone}>
              <Phone className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        {/* View Details Button */}
        <Button
          className="flex-1 h-8 rounded-lg text-xs font-bold gap-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          onClick={() => onViewDetails(agent)}
        >
          <Award className="h-3.5 w-3.5" />
          Performance Hub
        </Button>
      </CardFooter>
    </Card>
  );
}
