"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownRight, IndianRupee } from "lucide-react";

export function InvoiceStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹24.5M",
      change: "+15.2%",
      isPositive: true,
      icon: IndianRupee,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Paid Invoices",
      value: "1,245",
      change: "+8.4%",
      isPositive: true,
      icon: CheckCircle2,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Pending",
      value: "45",
      change: "-2.1%",
      isPositive: true, // fewer pending is good
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Overdue",
      value: "12",
      change: "+1.2%",
      isPositive: false,
      icon: XCircle,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
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
                vs last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
