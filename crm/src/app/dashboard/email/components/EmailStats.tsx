"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle2, MailOpen, AlertCircle, TrendingUp } from "lucide-react";

interface Stat {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  trend?: string;
  trendUp?: boolean;
}

interface EmailStatsProps {
  stats: Stat[];
}

export function EmailStats({ stats }: EmailStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-2xl border border-border/50 bg-muted/20 hover:border-primary/30 hover:bg-muted/30 transition-all duration-300 group flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">
                {stat.label}
              </span>
              <span className="text-2xl font-extrabold text-foreground block font-mono">
                {stat.value}
              </span>
              {(stat.sub || stat.trend) && (
                <div className="flex items-center gap-1">
                  {stat.trend && (
                    <span className={`text-[10px] font-bold flex items-center gap-0.5 ${stat.trendUp ? "text-emerald-500" : "text-rose-500"}`}>
                      <TrendingUp className="h-2.5 w-2.5" />
                      {stat.trend}
                    </span>
                  )}
                  {stat.sub && <span className="text-[10px] text-muted-foreground">{stat.sub}</span>}
                </div>
              )}
            </div>
            <div className={`h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${stat.iconBg}`}>
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export const DEFAULT_EMAIL_STATS: Stat[] = [
  {
    label: "Emails Sent",
    value: "1,248",
    sub: "this month",
    icon: Send,
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-500",
    trend: "+12%",
    trendUp: true,
  },
  {
    label: "Delivered",
    value: "1,209",
    sub: "96.9% rate",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-500",
    trend: "+3%",
    trendUp: true,
  },
  {
    label: "Opened",
    value: "847",
    sub: "70.1% open rate",
    icon: MailOpen,
    iconBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-500",
    trend: "+8%",
    trendUp: true,
  },
  {
    label: "Failed / Bounced",
    value: "39",
    sub: "3.1% bounce",
    icon: AlertCircle,
    iconBg: "bg-rose-500/10 border-rose-500/20",
    iconColor: "text-rose-500",
    trend: "-2%",
    trendUp: false,
  },
];
