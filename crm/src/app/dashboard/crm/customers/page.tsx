"use client";

import React, { useState, useEffect } from "react";
import {
  mockCustomers,
  Customer,
  CustomerType,
  CustomerStatus,
  CUSTOMER_TYPES,
  CUSTOMER_STATUSES,
} from "../data/customers";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Filter,
  Users,
  Briefcase,
  Building,
  Star,
  FileText,
  Phone,
  Mail,
  ChevronDown,
  LayoutGrid,
  TableProperties,
  MapPin,
  Calendar,
  DollarSign,
  Download,
  Eye,
  CheckCircle2,
  HelpCircle,
  FileIcon,
  Trash2,
  Pencil,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ─── Stat Card Component ──────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  gradient,
}: {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ElementType;
  gradient: string;
}) {
  return (
    <div className="glass-card rounded-xl border border-border/50 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="space-y-1.5 z-10">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <span className="text-[10px] text-muted-foreground block">{subtext}</span>
      </div>
      <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner z-10", gradient)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}

// ─── Status Progress Helper ──────────────────────────────────────────────────
const getProgressPercentage = (status: CustomerStatus) => {
  switch (status) {
    case "Active Inquiry":
      return 20;
    case "Property Visits":
      return 50;
    case "Closing Stages":
      return 75;
    case "Active Lease":
    case "Completed Deal":
      return 100;
    default:
      return 0;
  }
};

const getProgressColor = (status: CustomerStatus) => {
  switch (status) {
    case "Active Inquiry":
      return "bg-slate-400";
    case "Property Visits":
      return "bg-blue-500";
    case "Closing Stages":
      return "bg-amber-500";
    case "Active Lease":
      return "bg-violet-500";
    case "Completed Deal":
      return "bg-emerald-500";
    default:
      return "bg-primary";
  }
};

// ─── Customer Card Component ──────────────────────────────────────────────────
function CustomerCard({
  customer,
  onClick,
}: {
  customer: Customer;
  onClick: () => void;
}) {
  const typeDef = CUSTOMER_TYPES.find((t) => t.type === customer.type);
  const statusDef = CUSTOMER_STATUSES.find((s) => s.status === customer.status);
  const pct = getProgressPercentage(customer.status);
  const barColor = getProgressColor(customer.status);

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-xl border border-border/50 p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:border-border transition-all duration-200 cursor-pointer group"
    >
      {/* Card Header: Type badge & Menu */}
      <div className="flex items-center justify-between">
        <Badge
          variant="outline"
          className={cn("text-[9px] font-bold tracking-wider px-2 py-0.5 border uppercase", typeDef?.color, typeDef?.border)}
        >
          {typeDef?.label}
        </Badge>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            {customer.satisfactionScore.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Profile: Avatar, Name, Email */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-border/60">
          <AvatarImage src={customer.avatar} alt={customer.name} />
          <AvatarFallback className="text-xs font-bold bg-muted">
            {customer.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-foreground truncate leading-snug group-hover:text-primary transition-colors">
            {customer.name}
          </h3>
          <p className="text-[10px] text-muted-foreground truncate">{customer.email}</p>
        </div>
      </div>

      {/* Preferences & Locations */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-medium text-foreground truncate">
          {customer.propertyPreference}
        </p>
        <div className="flex flex-wrap gap-1">
          {customer.preferredLocations.slice(0, 2).map((loc) => (
            <Badge key={loc} variant="secondary" className="text-[9px] font-semibold py-0 px-1.5 h-4 bg-muted/40">
              <MapPin className="h-2 w-2 mr-0.5 text-muted-foreground" />
              {loc}
            </Badge>
          ))}
          {customer.preferredLocations.length > 2 && (
            <Badge variant="secondary" className="text-[9px] font-semibold py-0 px-1 bg-muted/40">
              +{customer.preferredLocations.length - 2} more
            </Badge>
          )}
        </div>
      </div>

      {/* Progress pipeline */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[9px] text-muted-foreground font-semibold uppercase">
          <span>{statusDef?.label}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full bg-border/40 rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full transition-all duration-300", barColor)} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Deal value & Agent */}
      <div className="flex items-center justify-between pt-3 border-t border-border/30 mt-auto">
        <div className="flex flex-col">
          <span className="text-[9px] text-muted-foreground uppercase font-semibold">Deals Value</span>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
            {customer.totalDealsValue}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Avatar className="h-5.5 w-5.5 border border-border/50">
            <AvatarImage src={customer.agentAvatar} />
            <AvatarFallback className="text-[8px]">{customer.assignedAgent.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[8px] text-muted-foreground uppercase leading-none">Agent</span>
            <span className="text-[9px] font-medium text-foreground truncate max-w-[65px] mt-0.5">
              {customer.assignedAgent.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Customer Details Drawer Component ─────────────────────────────────────────
function CustomerDrawer({
  customer,
  open,
  onClose,
}: {
  customer: Customer | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!customer) return null;

  const typeDef = CUSTOMER_TYPES.find((t) => t.type === customer.type);
  const statusDef = CUSTOMER_STATUSES.find((s) => s.status === customer.status);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[520px] overflow-y-auto scrollbar-thin border-l border-border/50 p-4">
        <SheetHeader className="pb-4 border-b border-border/40">
          <div className="flex items-center justify-between">
            <Badge className={cn("text-[9px] font-bold tracking-wider px-2 py-0.5 border uppercase", typeDef?.color, typeDef?.border)}>
              {typeDef?.label}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Joined {customer.joinedDate}
            </div>
          </div>
          <div className="flex items-center gap-3.5 mt-3">
            <Avatar className="h-12 w-12 border border-border/60">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback className="text-sm font-bold bg-muted">
                {customer.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-lg font-bold text-foreground leading-snug">{customer.name}</SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                ID: {customer.id} | Contacted {customer.lastContacted}
              </SheetDescription>
            </div>
          </div>
          {/* Quick contact buttons */}
          <div className="flex gap-2 pt-2.5">
            <Button variant="outline" size="sm" className="h-8 flex-1 text-xs gap-1.5">
              <Phone className="h-3.5 w-3.5 text-indigo-500" />
              {customer.phone}
            </Button>
            <Button variant="outline" size="sm" className="h-8 flex-1 text-xs gap-1.5">
              <Mail className="h-3.5 w-3.5 text-violet-500" />
              Email
            </Button>
          </div>
        </SheetHeader>

        {/* Content Body */}
        <div className="py-6 space-y-6">
          {/* Section: Properties Preferences */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preferences</h4>
            <div className="rounded-xl bg-muted/30 border border-border/40 p-3.5 space-y-3">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-medium">Desired Property</span>
                <span className="text-xs font-semibold text-foreground">{customer.propertyPreference}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-medium">Budget Range</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {customer.budgetPreference}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-medium">Deals Value</span>
                  <span className="text-xs font-bold text-primary font-mono">{customer.totalDealsValue}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-medium">Preferred Locations</span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {customer.preferredLocations.map((loc) => (
                    <Badge key={loc} variant="secondary" className="text-[10px] font-semibold py-0.5 px-2 bg-background border border-border/30">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      {loc}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Assigned Agent */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Assigned Agent</h4>
            <div className="flex items-center justify-between rounded-xl border border-border/40 p-3.5 bg-muted/10">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border/50">
                  <AvatarImage src={customer.agentAvatar} />
                  <AvatarFallback className="text-[10px]">{customer.assignedAgent.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold text-foreground leading-tight">{customer.assignedAgent}</p>
                  <p className="text-[10px] text-muted-foreground">Real Estate Advisor</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-[10px] font-semibold border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400 h-6 gap-0.5">
                  <Star className="h-3 w-3 fill-current" />
                  {customer.satisfactionScore.toFixed(1)} / 5.0
                </Badge>
              </div>
            </div>
          </div>

          {/* Section: Milestones / Deal Journey */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Deal Journey Milestones</h4>
            <div className="relative pl-5 border-l-2 border-border/40 ml-2 space-y-5 py-1">
              {customer.milestones.map((ms, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <span
                    className={cn(
                      "absolute -left-[27px] top-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center bg-background shadow-sm transition-colors",
                      ms.completed ? "border-emerald-500 text-emerald-500" : "border-border/60 text-muted-foreground"
                    )}
                  >
                    {ms.completed ? (
                      <CheckCircle2 className="h-3 w-3 fill-current text-emerald-500 bg-white dark:bg-slate-900 rounded-full" />
                    ) : (
                      <HelpCircle className="h-3 w-3" />
                    )}
                  </span>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-xs font-bold leading-none", ms.completed ? "text-foreground" : "text-muted-foreground")}>
                        {ms.title}
                      </p>
                      <span className="text-[10px] text-muted-foreground font-mono">{ms.date}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{ms.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Documents */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">KYC & Property Documents</h4>
            <div className="flex flex-col gap-2">
              {customer.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors group/doc"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="h-4.5 w-4.5 shrink-0 text-indigo-500" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-foreground truncate leading-snug">{doc.name}</p>
                      <p className="text-[9px] text-muted-foreground">{doc.size} | {doc.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground group-hover/doc:text-primary transition-colors">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              {customer.documents.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-2 border border-dashed border-border/40 rounded-xl">
                  No documents uploaded yet.
                </p>
              )}
            </div>
          </div>

          {/* Section: Agent Notes */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Internal Notes</h4>
            <p className="text-xs text-muted-foreground bg-muted/30 border border-border/40 p-3 rounded-xl leading-relaxed italic">
              "{customer.notes}"
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Add Customer Dialog Component ────────────────────────────────────────────
function AddCustomerDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Add New Customer
          </DialogTitle>
          <DialogDescription>
            Register a new client profile into the CRM database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Full Name *</Label>
              <Input placeholder="e.g. Shalini Sen" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Phone *</Label>
              <Input placeholder="+91 XXXXX XXXXX" className="h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Email</Label>
            <Input placeholder="email@example.com" className="h-9 text-sm" type="email" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Client Type</Label>
              <select className="w-full h-9 text-sm bg-background border border-border rounded-md px-3 outline-none focus:ring-1 focus:ring-primary">
                <option>Buyer</option>
                <option>Seller/Owner</option>
                <option>Tenant</option>
                <option>Investor</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Initial Stage</Label>
              <select className="w-full h-9 text-sm bg-background border border-border rounded-md px-3 outline-none focus:ring-1 focus:ring-primary">
                <option>Active Inquiry</option>
                <option>Property Visits</option>
                <option>Closing Stages</option>
                <option>Active Lease</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Desired Property / Requirement</Label>
            <Input placeholder="e.g. 4 BHK luxury villa with private garden" className="h-9 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Budget Range</Label>
              <Input placeholder="e.g. ₹2.5 Cr - ₹3 Cr" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Preferred Locations (comma-separated)</Label>
              <Input placeholder="e.g. Kokapet, Gachibowli" className="h-9 text-sm" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Internal Notes</Label>
            <textarea
              rows={2}
              placeholder="Provide background context on this customer..."
              className="w-full text-sm bg-background border border-border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1 h-9" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 h-9 gap-2" onClick={onClose}>
              Create Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Customer Table View Component ────────────────────────────────────────────
function CustomerTable({
  customers,
  onRowClick,
}: {
  customers: Customer[];
  onRowClick: (customer: Customer) => void;
}) {
  return (
    <div className="rounded-xl border border-border/50 overflow-hidden glass-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/50 hover:bg-transparent">
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Client</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Type</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Stage</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Preference</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Budget</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Value</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Advisor</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Satisfaction</TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((c) => {
              const typeDef = CUSTOMER_TYPES.find((t) => t.type === c.type);
              const statusDef = CUSTOMER_STATUSES.find((s) => s.status === c.status);
              const pct = getProgressPercentage(c.status);
              const barColor = getProgressColor(c.status);

              return (
                <TableRow
                  key={c.id}
                  onClick={() => onRowClick(c)}
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer group"
                >
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 border border-border/50 shrink-0">
                        <AvatarImage src={c.avatar} />
                        <AvatarFallback className="text-[10px] font-bold">
                          {c.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{c.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{c.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-[9px] font-bold px-1.5 py-0 uppercase border", typeDef?.color, typeDef?.border)}>
                      {c.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 w-24">
                      <span className="text-[9px] font-medium text-muted-foreground truncate">{c.status}</span>
                      <div className="h-1 w-full bg-border/40 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", barColor)} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-medium text-foreground truncate max-w-[120px] block">
                      {c.propertyPreference}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-semibold text-muted-foreground font-mono">{c.budgetPreference}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {c.totalDealsValue}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="h-5.5 w-5.5 border border-border/50 shrink-0">
                        <AvatarImage src={c.agentAvatar} />
                        <AvatarFallback className="text-[8px]">{c.assignedAgent.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] text-muted-foreground font-medium truncate max-w-[70px]">
                        {c.assignedAgent.split(" ")[0]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      {c.satisfactionScore.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<Set<CustomerType>>(new Set());
  const [statusFilter, setStatusFilter] = useState<Set<CustomerStatus>>(new Set());
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("customers-view-mode");
      if (saved === "grid" || saved === "table") {
        setViewMode(saved);
      }
    }
  }, []);

  const handleViewChange = (mode: "grid" | "table") => {
    setViewMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("customers-view-mode", mode);
    }
  };

  // ─── Filter Logic ───────────────────────────────────────────────────────────
  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.propertyPreference.toLowerCase().includes(q) ||
      c.preferredLocations.some((loc) => loc.toLowerCase().includes(q));
    const matchType = typeFilter.size === 0 || typeFilter.has(c.type);
    const matchStatus = statusFilter.size === 0 || statusFilter.has(c.status);
    return matchSearch && matchType && matchStatus;
  });

  const toggleType = (t: CustomerType) => {
    setTypeFilter((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };

  const toggleStatus = (s: CustomerStatus) => {
    setStatusFilter((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const clearFilters = () => {
    setTypeFilter(new Set());
    setStatusFilter(new Set());
  };

  // ─── Stats Heuristics ───────────────────────────────────────────────────────
  const totalValue = customers.reduce((sum, c) => {
    const val = parseFloat(c.totalDealsValue.replace(/[^0-9.]/g, "")) || 0;
    return sum + val;
  }, 0);

  const averageScore =
    customers.reduce((sum, c) => sum + c.satisfactionScore, 0) / customers.length;

  const vipInvestors = customers.filter((c) => c.type === "Investor").length;

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="h-8 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-600" />
            Customer Profiles
          </h2>
          <p className="text-sm text-muted-foreground mt-1 ml-3">
            Manage buyer profiles, property listings owners, tenant leases, and VIP investors.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
            <Download className="h-3.5 w-3.5" />
            Export Data
          </Button>
          <Button
            size="sm"
            className="h-9 gap-2 text-xs bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 border-0 text-white shadow-md"
            onClick={() => setShowAddCustomer(true)}
          >
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Active Clients"
          value={customers.length}
          subtext={`${filtered.length} visible`}
          icon={Users}
          gradient="bg-indigo-500"
        />
        <StatCard
          title="VIP Investors"
          value={vipInvestors}
          subtext="High-yield commercial capital"
          icon={Briefcase}
          gradient="bg-rose-500"
        />
        <StatCard
          title="Closed Volume"
          value={`₹${totalValue.toFixed(1)} Cr`}
          subtext="Overall transaction values"
          icon={DollarSign}
          gradient="bg-emerald-500"
        />
        <StatCard
          title="Client Satisfaction"
          value={`${averageScore.toFixed(2)} / 5.0`}
          subtext="Based on CRM feedback"
          icon={Star}
          gradient="bg-amber-500"
        />
      </div>

      {/* Segment mini-pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CUSTOMER_TYPES.map((t) => {
          const count = customers.filter((c) => c.type === t.type).length;
          const isActive = typeFilter.has(t.type);
          return (
            <button
              key={t.type}
              onClick={() => toggleType(t.type)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold whitespace-nowrap transition-all duration-150 shrink-0",
                isActive
                  ? cn(t.bg, "border-current shadow-sm")
                  : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground bg-background/50"
              )}
            >
              {t.label}
              <span className="ml-0.5 opacity-65 font-mono">{count}</span>
            </button>
          );
        })}
        {(typeFilter.size > 0 || statusFilter.size > 0) && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-dashed border-border text-[10px] text-muted-foreground hover:text-foreground hover:border-border transition-all shrink-0"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Toolbar controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, preferences, location..."
            className="pl-9 h-9 text-sm bg-background/50"
          />
        </div>

        {/* Status filters */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn("h-9 gap-1.5 text-xs", statusFilter.size > 0 && "border-primary/50 text-primary")}
            >
              <Filter className="h-3.5 w-3.5" />
              Stage Status
              {statusFilter.size > 0 && (
                <Badge className="h-4 w-4 p-0 text-[9px] flex items-center justify-center bg-primary text-primary-foreground">
                  {statusFilter.size}
                </Badge>
              )}
              <ChevronDown className="h-3 w-3 opacity-50 ml-0.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel className="text-[10px]">Filter by Pipeline Stage</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CUSTOMER_STATUSES.map((s) => (
              <DropdownMenuCheckboxItem
                key={s.status}
                checked={statusFilter.has(s.status)}
                onCheckedChange={() => toggleStatus(s.status)}
                className="text-xs"
              >
                {s.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex-1" />

        {/* Layout Mode Toggles */}
        <div className="flex items-center rounded-lg border border-border/50 bg-background/60 p-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChange("grid")}
            className={cn(
              "h-7 px-2.5 gap-1.5 text-xs rounded-md transition-all",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Card Grid</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChange("table")}
            className={cn(
              "h-7 px-2.5 gap-1.5 text-xs rounded-md transition-all",
              viewMode === "table"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <TableProperties className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Details List</span>
          </Button>
        </div>
      </div>

      {/* Main View Grid/Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3 border border-dashed border-border/50 rounded-2xl bg-muted/5">
          <div className="h-16 w-16 rounded-full bg-muted/40 flex items-center justify-center">
            <Users className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <p className="font-semibold text-foreground">No customer profiles found</p>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Adjust your keyword query, toggle segment categories, or add a new client to get started.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((c) => (
            <CustomerCard key={c.id} customer={c} onClick={() => setSelectedCustomer(c)} />
          ))}
        </div>
      ) : (
        <ScrollArea className="w-full">
          <CustomerTable customers={filtered} onRowClick={setSelectedCustomer} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      {/* Drawers / Dialogs */}
      <CustomerDrawer
        customer={selectedCustomer}
        open={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
      />
      <AddCustomerDialog open={showAddCustomer} onClose={() => setShowAddCustomer(false)} />
    </div>
  );
}
