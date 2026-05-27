"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Download, Eye, RefreshCw, Mail, MailOpen, Send,
  MailX, CheckCircle2, AlertCircle, Clock, ChevronDown, ChevronRight, X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type EmailStatus = "sent" | "delivered" | "opened" | "failed" | "bounced";

export interface EmailLogEntry {
  id: string;
  to: string[];
  subject: string;
  preview: string;
  body: string;
  status: EmailStatus;
  sentAt: string;
  openedAt?: string;
  template?: string;
  agent?: string;
}

const STATUS_META: Record<EmailStatus, { label: string; icon: React.ElementType; classes: string; dotClass: string }> = {
  sent:      { label: "Sent",      icon: Send,          classes: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",    dotClass: "bg-blue-500" },
  delivered: { label: "Delivered", icon: CheckCircle2,  classes: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400", dotClass: "bg-emerald-500" },
  opened:    { label: "Opened",    icon: MailOpen,      classes: "bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400", dotClass: "bg-violet-500" },
  failed:    { label: "Failed",    icon: AlertCircle,   classes: "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",     dotClass: "bg-rose-500" },
  bounced:   { label: "Bounced",   icon: MailX,         classes: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400", dotClass: "bg-amber-500" },
};

interface EmailLogTableProps {
  logs: EmailLogEntry[];
}

export function EmailLogTable({ logs }: EmailLogTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [preview, setPreview] = useState<EmailLogEntry | null>(null);

  const filtered = logs.filter((log) => {
    const matchSearch =
      log.subject.toLowerCase().includes(search.toLowerCase()) ||
      log.to.join(", ").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || log.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
          <Input
            placeholder="Search by subject or recipient..."
            className="pl-9 h-9 text-xs rounded-xl bg-background/60 border-border/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[150px] h-9 text-xs rounded-xl bg-background/60 border-border/50">
            <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border/50">
            <SelectItem value="all">All Statuses</SelectItem>
            {(Object.keys(STATUS_META) as EmailStatus[]).map((s) => (
              <SelectItem key={s} value={s}>{STATUS_META[s].label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9 text-xs rounded-xl border-border/50 gap-1.5 shrink-0">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Log Rows */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 rounded-2xl border border-dashed border-border/40 bg-muted/10"
            >
              <Mail className="h-8 w-8 text-muted-foreground/30 mx-auto stroke-1 mb-3" />
              <p className="text-sm font-bold text-muted-foreground">No matching email logs</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Try adjusting your filters</p>
            </motion.div>
          ) : (
            filtered.map((log, i) => {
              const meta = STATUS_META[log.status];
              const StatusIcon = meta.icon;
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setPreview(log)}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/20 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                >
                  {/* Status dot */}
                  <div className={cn("h-2 w-2 rounded-full shrink-0", meta.dotClass)} />

                  {/* Status icon */}
                  <div className={cn("h-8 w-8 rounded-lg border flex items-center justify-center shrink-0", meta.classes)}>
                    <StatusIcon className="h-3.5 w-3.5" />
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs font-bold text-foreground truncate">{log.subject}</p>
                      {log.template && (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-border/50 text-muted-foreground bg-muted/20 font-medium shrink-0">
                          {log.template}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                      To: {log.to.join(", ")}
                    </p>
                  </div>

                  {/* Status badge */}
                  <Badge variant="outline" className={cn("text-[9px] px-2 py-0.5 border uppercase font-bold shrink-0 hidden sm:flex", meta.classes)}>
                    {meta.label}
                  </Badge>

                  {/* Time */}
                  <div className="text-right shrink-0 hidden md:block">
                    <p className="text-[10px] font-mono text-muted-foreground">{log.sentAt}</p>
                    {log.openedAt && (
                      <p className="text-[9px] text-violet-500 mt-0.5 flex items-center gap-0.5 justify-end">
                        <MailOpen className="h-2.5 w-2.5" /> {log.openedAt}
                      </p>
                    )}
                  </div>

                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0" />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Email Preview Dialog */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="sm:max-w-[560px] bg-background/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="text-base font-extrabold">{preview?.subject}</DialogTitle>
                <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                  To: {preview?.to.join(", ")}
                </p>
                <p className="text-[10px] text-muted-foreground font-mono">Sent: {preview?.sentAt}</p>
              </div>
              {preview && (
                <Badge variant="outline" className={cn("text-[9px] px-2 py-1 border uppercase font-bold shrink-0", STATUS_META[preview.status].classes)}>
                  {STATUS_META[preview.status].label}
                </Badge>
              )}
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[350px]">
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-line p-4 rounded-xl bg-muted/20 border border-border/30">
              {preview?.body}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
