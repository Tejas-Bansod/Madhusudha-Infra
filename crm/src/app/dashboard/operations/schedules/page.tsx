"use client";

import React, { useState, useMemo } from "react";
import { mockListings } from "../../properties/data/listings";
import { mockAgents } from "../data/agents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Phone, User, CalendarDays, Plus } from "lucide-react";
import { useTheme } from "../../components/theme";
import { cn } from "@/lib/utils";

interface ShowingSchedule {
  id: string;
  listingId: string;
  agentId: string;
  clientName: string;
  clientPhone: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
}

const mockSchedules: ShowingSchedule[] = [
  {
    id: "sch-1",
    listingId: "prop-1",
    agentId: "agent-1", // Sneha Rao
    clientName: "Vikram Malhotra",
    clientPhone: "+91 99805 11234",
    date: "2026-05-27",
    time: "10:30 AM",
    status: "Confirmed"
  },
  {
    id: "sch-2",
    listingId: "prop-2",
    agentId: "agent-2", // Amit Verma
    clientName: "Dr. Anjali Sen",
    clientPhone: "+91 98450 44321",
    date: "2026-05-28",
    time: "02:00 PM",
    status: "Pending"
  },
  {
    id: "sch-3",
    listingId: "prop-3",
    agentId: "agent-3", // Rohan Das
    clientName: "Pioneer Tech Solutions",
    clientPhone: "+91 91008 55432",
    date: "2026-05-29",
    time: "11:00 AM",
    status: "Confirmed"
  },
  {
    id: "sch-4",
    listingId: "prop-4",
    agentId: "agent-1", // Sneha Rao
    clientName: "Rajesh Kumar",
    clientPhone: "+91 97760 11002",
    date: "2026-05-26",
    time: "04:30 PM",
    status: "Confirmed"
  }
];

export default function SchedulesPage() {
  const { theme } = useTheme();
  const [schedules, setSchedules] = useState<ShowingSchedule[]>(mockSchedules);

  // Map listings and agents to schedules for easy rendering
  const detailedSchedules = useMemo(() => {
    return schedules.map((sch) => {
      const listing = mockListings.find((l) => l.id === sch.listingId);
      const agent = mockAgents.find((a) => a.id === sch.agentId);
      return {
        ...sch,
        listing,
        agent
      };
    });
  }, [schedules]);

  const getStatusBadge = (status: ShowingSchedule["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
      case "Pending":
        return "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400";
      case "Completed":
        return "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400";
      case "Cancelled":
        return "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400";
      default:
        return "bg-slate-500/10 border-slate-500/30 text-slate-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            Showings Schedule
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage upcoming property tours and buyer consultations across active listings.
          </p>
        </div>
        <Button className="h-9 rounded-xl text-xs font-bold gap-1 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4" />
          Schedule Tour
        </Button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedules list */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">
            Upcoming Showings
          </h2>
          <div className="space-y-3">
            {detailedSchedules.map((item) => (
              <Card key={item.id} className="glass-card hover-glow border-border/50 overflow-hidden transition-all duration-300">
                <CardHeader className="p-4 pb-0 flex flex-row justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-[11px] font-bold font-mono text-muted-foreground uppercase">
                      Tour Ref: #{item.id}
                    </span>
                  </div>
                  <Badge variant="outline" className={cn("text-[9px] font-bold px-2 py-0.5 border uppercase", getStatusBadge(item.status))}>
                    {item.status}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Property info */}
                    <div className="flex items-center gap-3">
                      {item.listing?.image && (
                        <div className="h-10 w-14 rounded overflow-hidden shrink-0 border border-border/40 bg-muted">
                          <img
                            src={item.listing.image}
                            alt={item.listing.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-foreground">
                          {item.listing?.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                          <MapPin className="h-2.5 w-2.5 text-primary" />
                          {item.listing?.location}
                        </p>
                      </div>
                    </div>

                    {/* DateTime */}
                    <div className="flex gap-4 font-mono text-[10px] text-muted-foreground md:border-l border-border/30 md:pl-4">
                      <div className="space-y-0.5">
                        <span className="block text-foreground font-bold flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3 text-primary" />
                          {item.date}
                        </span>
                        <span>Date</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="block text-foreground font-bold flex items-center gap-1">
                          <Clock className="h-3 w-3 text-primary" />
                          {item.time}
                        </span>
                        <span>Time</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-border/20 text-xs">
                    {/* Buyer Client */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border/10">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{item.clientName}</p>
                          <p className="text-[10px] text-muted-foreground">{item.clientPhone}</p>
                        </div>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground font-mono">Client</span>
                    </div>

                    {/* Agent */}
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border/10">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 border border-border/30 shrink-0">
                          <AvatarImage src={item.agent?.avatar} alt={item.agent?.name} />
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                            {item.agent?.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-foreground">{item.agent?.name}</p>
                          <p className="text-[10px] text-muted-foreground">{item.agent?.phone}</p>
                        </div>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-muted-foreground font-mono">Advisor</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Small overview card */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">
            Calendar Overview
          </h2>
          <Card className="glass-card border-border/50 bg-slate-900/10">
            <CardHeader className="p-4 flex flex-row items-center gap-2">
              <CalendarDays className="h-4.5 w-4.5 text-primary" />
              <CardTitle className="text-sm font-bold">Showing Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-muted/30 border border-border/20">
                  <span className="text-muted-foreground">Total Tours</span>
                  <span className="font-extrabold text-foreground">{schedules.length} Scheduled</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-muted/30 border border-border/20">
                  <span className="text-muted-foreground">Confirmed</span>
                  <span className="font-extrabold text-emerald-500">{schedules.filter((s) => s.status === "Confirmed").length} Tours</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-muted/30 border border-border/20">
                  <span className="text-muted-foreground">Pending Action</span>
                  <span className="font-extrabold text-amber-500">{schedules.filter((s) => s.status === "Pending").length} Tours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
