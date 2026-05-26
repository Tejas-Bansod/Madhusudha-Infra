"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, CheckCircle2, RefreshCcw, MapPin, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function VisitStats() {
  const stats = [
    {
      title: "Upcoming Visits",
      value: "24",
      change: "+4 this week",
      isPositive: true,
      icon: CalendarClock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Completed",
      value: "156",
      change: "+12.5%",
      isPositive: true,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Rescheduled",
      value: "8",
      change: "-2.1%",
      isPositive: true, // fewer rescheduled is good
      icon: RefreshCcw,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Properties Toured",
      value: "42",
      change: "+8.4%",
      isPositive: true,
      icon: MapPin,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="overflow-hidden border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span className={`flex items-center font-medium ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {stat.change}
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
