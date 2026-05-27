"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, RefreshCw, Send, CheckCircle2, MailOpen, AlertCircle, MailX, Download } from "lucide-react";
import { EmailLogTable, EmailLogEntry } from "../components/EmailLogTable";
import { EmailStats, DEFAULT_EMAIL_STATS } from "../components/EmailStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_LOGS: EmailLogEntry[] = [
  {
    id: "log-1",
    to: ["vikram.malhotra@email.com"],
    subject: "Property Viewing Confirmation – Villa 32, Palm Springs",
    preview: "Dear Vikram, We're pleased to confirm your property viewing...",
    body: "Dear Vikram,\n\nWe're pleased to confirm your property viewing at Villa 32, Palm Springs scheduled for Tuesday, 27 May 2026 at 10:30 AM.\n\nYour assigned advisor, Sneha Rao, will be present at the site to guide you through the property.\n\nPlease bring a valid government ID and feel free to contact us if you need to reschedule.\n\nBest regards,\nMadhusudha Infra Team",
    status: "opened",
    sentAt: "26 May, 10:30 AM",
    openedAt: "26 May, 10:47 AM",
    template: "Viewing Confirmation",
    agent: "Sneha Rao",
  },
  {
    id: "log-2",
    to: ["anjali.sen@company.com"],
    subject: "New Listing Alert – Tech Park Phase II Office Space",
    preview: "Dear Dr. Anjali, A new premium office space matching your requirements...",
    body: "Dear Dr. Anjali Sen,\n\nA new premium office space matching your requirements is now available at Tech Park Phase II.\n\nProperty Highlights:\n• Area: 4,200 sq ft\n• Floor: 12th (Corner unit)\n• Price: ₹2.8 Cr\n• Possession: Immediate\n\nThis property ticks all the boxes from your wishlist. Would you like to schedule a visit?\n\nBest regards,\nAmit Verma\nSenior Investment Specialist, Madhusudha Infra",
    status: "delivered",
    sentAt: "26 May, 09:15 AM",
    template: "New Listing Alert",
    agent: "Amit Verma",
  },
  {
    id: "log-3",
    to: ["rajesh.kumar@firm.in"],
    subject: "Follow-Up After Showing – Sunrise Apartments 4B",
    preview: "Dear Rajesh, Thank you for visiting Sunrise Apartments 4B...",
    body: "Dear Rajesh,\n\nThank you for visiting Sunrise Apartments 4B yesterday. We hope you liked the property!\n\nAs discussed, here are the key details:\n• Price: ₹58.5 Cr\n• EMI starts at ₹2.1 Lakhs/month\n• Documentation can be completed within 7 days\n\nWe are ready to proceed at your convenience. Let us know if you'd like a second visit or have any questions.\n\nWarm regards,\nMadhusudha Infra Team",
    status: "sent",
    sentAt: "25 May, 04:00 PM",
    template: "Follow-Up",
    agent: "Sneha Rao",
  },
  {
    id: "log-4",
    to: ["priya.sharma@gmail.com"],
    subject: "Monthly Market Update – May 2026",
    preview: "Dear Priya, Here is your personalized real estate market report...",
    body: "Dear Priya,\n\nHere is your personalized real estate market report for May 2026.\n\n📈 Market Highlights:\n• Residential prices up 4.2% YoY in your area of interest\n• Commercial leasing activity surged 18% this quarter\n• Top emerging micro-markets: Electronic City Phase 2, Sarjapur Road\n\nWould you like a detailed consultation? Book a call with your dedicated advisor.\n\nBest regards,\nMadhusudha Infra – Research Desk",
    status: "opened",
    sentAt: "25 May, 11:00 AM",
    openedAt: "25 May, 02:15 PM",
    template: "Market Update",
    agent: "Priya Sharma",
  },
  {
    id: "log-5",
    to: ["arjun.mehta@outlook.com"],
    subject: "Offer Letter – Commercial Plot A1, Whitefield",
    preview: "Dear Arjun, We are pleased to present the following offer...",
    body: "Dear Arjun,\n\nWe are pleased to present the following offer for Commercial Plot A1, Whitefield:\n\nOffer Price: ₹3.2 Cr\nValidity: 7 days from the date of this letter\nTerms: 30% upfront, balance on registration\n\nKindly review and revert with your decision.\n\nWarm regards,\nRohan Das\nDirector – Commercial Leasing, Madhusudha Infra",
    status: "failed",
    sentAt: "24 May, 03:30 PM",
    template: "Offer Letter",
    agent: "Rohan Das",
  },
  {
    id: "log-6",
    to: ["pioneer.tech@solutions.in", "info@pioneertech.co"],
    subject: "Site Handover Schedule – Tech Park Phase II",
    preview: "Dear Team, We are writing to confirm the handover schedule...",
    body: "Dear Pioneer Tech Solutions Team,\n\nWe are writing to confirm the handover schedule for your office space at Tech Park Phase II.\n\nHandover Date: 1 June 2026\nVenue: Tech Park Phase II, Level 12\nTime: 11:00 AM\n\nDocuments to carry:\n• Registration certificate\n• Board resolution\n• Power of attorney (if applicable)\n\nBest regards,\nMadhusudha Infra – Operations",
    status: "bounced",
    sentAt: "24 May, 10:00 AM",
    agent: "Amit Verma",
  },
  {
    id: "log-7",
    to: ["meera.nair@realty.co"],
    subject: "Welcome to Madhusudha Infra – Your Property Journey Begins",
    preview: "Dear Meera, Welcome aboard! We are excited to have you...",
    body: "Dear Meera,\n\nWelcome to Madhusudha Infra – Bangalore's Premier Real Estate Advisory.\n\nYour dedicated advisor is: Priya Sharma\nContact: +91 98450 44321\n\nWe've created your personalized client profile. You can expect:\n• Weekly curated property recommendations\n• Exclusive access to off-market listings\n• Priority scheduling for site visits\n\nLet's begin your journey to the perfect property!\n\nBest regards,\nMadhusudha Infra Team",
    status: "delivered",
    sentAt: "23 May, 09:00 AM",
    agent: "Priya Sharma",
  },
];

// Activity Bar chart data (weekly)
const WEEKLY_ACTIVITY = [
  { day: "Mon", sent: 48, opened: 31 },
  { day: "Tue", sent: 62, opened: 47 },
  { day: "Wed", sent: 55, opened: 39 },
  { day: "Thu", sent: 71, opened: 58 },
  { day: "Fri", sent: 84, opened: 62 },
  { day: "Sat", sent: 22, opened: 14 },
  { day: "Sun", sent: 10, opened: 6 },
];

const maxSent = Math.max(...WEEKLY_ACTIVITY.map((d) => d.sent));

export default function EmailLogsPage() {
  const [logs, setLogs] = useState<EmailLogEntry[]>(MOCK_LOGS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsRefreshing(false);
  };

  const statusCounts = {
    sent: logs.filter((l) => l.status === "sent").length,
    delivered: logs.filter((l) => l.status === "delivered").length,
    opened: logs.filter((l) => l.status === "opened").length,
    failed: logs.filter((l) => l.status === "failed").length,
    bounced: logs.filter((l) => l.status === "bounced").length,
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
            <div className="h-8 w-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <BarChart2 className="h-4 w-4 text-violet-500" />
            </div>
            Email Logs
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track delivery status, open rates, and engagement for every email sent.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs rounded-xl border-border/50 gap-1.5"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ repeat: isRefreshing ? Infinity : 0, duration: 0.8, ease: "linear" }}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </motion.div>
            {isRefreshing ? "Syncing..." : "Sync Logs"}
          </Button>
          <Button size="sm" className="h-9 text-xs rounded-xl gap-1.5 bg-primary hover:bg-primary/90">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <EmailStats stats={DEFAULT_EMAIL_STATS} />

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Log Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="xl:col-span-3"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl p-0">
            <CardHeader className="p-5 pb-4 border-b border-border/30">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-sm font-extrabold flex items-center gap-2">
                  <Send className="h-4 w-4 text-muted-foreground" />
                  All Email Activity
                </CardTitle>
                <Badge variant="outline" className="text-[10px] font-bold border-border/50 text-muted-foreground bg-muted/20">
                  {logs.length} entries
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-5">
              <EmailLogTable logs={logs} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar: Status Summary + Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Status Breakdown */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl p-0">
            <CardHeader className="p-4 pb-3 border-b border-border/30">
              <CardTitle className="text-sm font-extrabold">Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { label: "Opened", count: statusCounts.opened, color: "bg-violet-500", pct: Math.round((statusCounts.opened / logs.length) * 100) },
                { label: "Delivered", count: statusCounts.delivered, color: "bg-emerald-500", pct: Math.round((statusCounts.delivered / logs.length) * 100) },
                { label: "Sent", count: statusCounts.sent, color: "bg-blue-500", pct: Math.round((statusCounts.sent / logs.length) * 100) },
                { label: "Failed", count: statusCounts.failed, color: "bg-rose-500", pct: Math.round((statusCounts.failed / logs.length) * 100) },
                { label: "Bounced", count: statusCounts.bounced, color: "bg-amber-500", pct: Math.round((statusCounts.bounced / logs.length) * 100) },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-muted-foreground">{item.label}</span>
                    <span className="font-extrabold text-foreground">{item.count} <span className="text-muted-foreground/60">({item.pct}%)</span></span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Activity Bar Chart */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-xl p-0">
            <CardHeader className="p-4 pb-3 border-b border-border/30">
              <CardTitle className="text-sm font-extrabold">Weekly Activity</CardTitle>
              <p className="text-[10px] text-muted-foreground">Emails sent vs opened</p>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex h-28 items-end gap-2 font-mono">
                {WEEKLY_ACTIVITY.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group/bar">
                    <div className="w-full flex gap-0.5 items-end h-24">
                      {/* Sent bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.sent / maxSent) * 100}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex-1 rounded-t bg-primary/60 group-hover/bar:bg-primary transition-colors"
                        title={`Sent: ${d.sent}`}
                      />
                      {/* Opened bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(d.opened / maxSent) * 100}%` }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                        className="flex-1 rounded-t bg-violet-500/50 group-hover/bar:bg-violet-500 transition-colors"
                        title={`Opened: ${d.opened}`}
                      />
                    </div>
                    <span className="text-[9px] text-muted-foreground font-bold">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-primary/60 inline-block" />Sent</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-violet-500/50 inline-block" />Opened</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
