"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, BookTemplate, Users, Clock, CheckCircle2 } from "lucide-react";
import { EmailComposer } from "../components/EmailComposer";
import { EmailStats } from "../components/EmailStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const QUICK_SEND_STATS = [
  {
    label: "Sent Today",
    value: "24",
    sub: "this session",
    icon: Send,
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-500",
    trend: "+4",
    trendUp: true,
  },
  {
    label: "Templates Used",
    value: "5",
    sub: "active templates",
    icon: Sparkles,
    iconBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-500",
  },
  {
    label: "Recipients",
    value: "61",
    sub: "unique contacts",
    icon: Users,
    iconBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-500",
  },
  {
    label: "Avg. Delivery",
    value: "1.2s",
    sub: "response time",
    icon: Clock,
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
];

const RECENT_SENT = [
  { id: "r1", to: "vikram.malhotra@email.com", subject: "Property Viewing Confirmation", time: "2 min ago", status: "delivered" },
  { id: "r2", to: "anjali.sen@company.com", subject: "New Listing Alert – Tech Park Phase II", time: "18 min ago", status: "opened" },
  { id: "r3", to: "rajesh.kumar@firm.in", subject: "Follow-Up After Showing", time: "1 hr ago", status: "delivered" },
  { id: "r4", to: "priya.sharma@gmail.com", subject: "Monthly Market Update – May 2026", time: "3 hrs ago", status: "opened" },
];

const STATUS_COLORS: Record<string, string> = {
  delivered: "text-emerald-500",
  opened:    "text-violet-500",
  sent:      "text-blue-500",
  failed:    "text-rose-500",
};

export default function SendEmailsPage() {
  const [sentCount, setSentCount] = useState(0);
  const [recentSent, setRecentSent] = useState(RECENT_SENT);

  const handleSend = (data: { to: string[]; subject: string; body: string }) => {
    setSentCount((c) => c + 1);
    setRecentSent((prev) => [
      {
        id: `new-${Date.now()}`,
        to: data.to[0],
        subject: data.subject,
        time: "Just now",
        status: "sent",
      },
      ...prev,
    ].slice(0, 6));
  };

  return (
    <div className="flex-1 space-y-6 w-full max-w-full">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Send className="h-4 w-4 text-blue-500" />
            </div>
            Send Emails
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Compose and send professional emails to clients, leads, and contacts.
          </p>
        </div>
        {sentCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {sentCount} email{sentCount !== 1 ? "s" : ""} sent this session
          </motion.div>
        )}
      </motion.div>

      {/* KPI Stats */}
      <EmailStats stats={QUICK_SEND_STATS as any} />

      {/* Main Content: Composer + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Composer Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="xl:col-span-2"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl p-0">
            <CardHeader className="p-5 pb-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm font-extrabold">Compose New Email</CardTitle>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Use templates to compose faster
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <EmailComposer onSend={handleSend} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar: Recently Sent */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl p-0">
            <CardHeader className="p-4 pb-3 border-b border-border/30">
              <CardTitle className="text-sm font-extrabold flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Recently Sent
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {recentSent.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${
                    item.status === "delivered" ? "bg-emerald-500" :
                    item.status === "opened" ? "bg-violet-500" :
                    item.status === "sent" ? "bg-blue-500" : "bg-rose-500"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {item.subject}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">{item.to}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-muted-foreground font-mono">{item.time}</p>
                    <p className={`text-[9px] font-bold uppercase mt-0.5 ${STATUS_COLORS[item.status]}`}>
                      {item.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 p-0">
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-extrabold text-foreground flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Email Tips
              </p>
              <ul className="space-y-2 text-[11px] text-muted-foreground">
                {[
                  "Use templates for consistent branding",
                  "Personalize with client name for 35% higher open rates",
                  "Send property alerts Tuesday–Thursday for best engagement",
                  "Follow up within 24 hours of a site visit",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
