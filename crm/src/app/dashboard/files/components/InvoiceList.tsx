"use client";

import { motion } from "framer-motion";
import { FileText, MoreHorizontal, Download, Eye, Send, Trash2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const invoices = [
  {
    id: "INV-2023-001",
    client: "Acme Corp",
    email: "billing@acme.co",
    avatar: "https://i.pravatar.cc/150?u=acme",
    amount: "₹1,45,000",
    date: "Oct 24, 2023",
    status: "Paid",
    property: "Sunrise Apartments 4B",
  },
  {
    id: "INV-2023-002",
    client: "Global Tech",
    email: "finance@globaltech.inc",
    avatar: "https://i.pravatar.cc/150?u=global",
    amount: "₹2,30,000",
    date: "Oct 22, 2023",
    status: "Pending",
    property: "Tech Park Phase II",
  },
  {
    id: "INV-2023-003",
    client: "Sarah Jenkins",
    email: "sarah.j@email.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    amount: "₹45,000",
    date: "Oct 15, 2023",
    status: "Overdue",
    property: "Villa 32, Palm Springs",
  },
  {
    id: "INV-2023-004",
    client: "Nexus Builders",
    email: "accounts@nexus.dev",
    avatar: "https://i.pravatar.cc/150?u=nexus",
    amount: "₹5,00,000",
    date: "Oct 10, 2023",
    status: "Paid",
    property: "Commercial Plot A1",
  },
  {
    id: "INV-2023-005",
    client: "Rajesh Kumar",
    email: "rajesh.k@email.com",
    avatar: "https://i.pravatar.cc/150?u=rajesh",
    amount: "₹12,500",
    date: "Oct 25, 2023",
    status: "Draft",
    property: "Consultation Fee",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Paid":
      return <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-0">Paid</Badge>;
    case "Pending":
      return <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-0">Pending</Badge>;
    case "Overdue":
      return <Badge className="bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 border-0">Overdue</Badge>;
    case "Draft":
      return <Badge className="bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 border-0">Draft</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function InvoiceList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  } as const;

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  } as const;

  return (
    <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/20 text-sm font-medium text-muted-foreground">
        <div className="col-span-4 md:col-span-3 lg:col-span-3">Client</div>
        <div className="col-span-3 md:col-span-2 lg:col-span-2">Amount</div>
        <div className="col-span-3 md:col-span-2 lg:col-span-2 hidden md:block">Property</div>
        <div className="col-span-3 md:col-span-2 lg:col-span-2 hidden lg:block">Date</div>
        <div className="col-span-3 md:col-span-2 lg:col-span-2">Status</div>
        <div className="col-span-2 md:col-span-1 lg:col-span-1 text-right">Actions</div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border/50"
      >
        {invoices.map((invoice) => (
          <motion.div 
            key={invoice.id} 
            variants={item}
            className="grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-muted/30 group cursor-pointer"
          >
            <div className="col-span-4 md:col-span-3 lg:col-span-3 flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border/50">
                <AvatarImage src={invoice.avatar} alt={invoice.client} />
                <AvatarFallback>{invoice.client.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate">{invoice.client}</span>
                <span className="text-xs text-muted-foreground truncate">{invoice.id}</span>
              </div>
            </div>
            
            <div className="col-span-3 md:col-span-2 lg:col-span-2 font-medium">
              {invoice.amount}
            </div>

            <div className="col-span-3 md:col-span-2 lg:col-span-2 hidden md:block text-sm text-muted-foreground truncate">
              {invoice.property}
            </div>
            
            <div className="col-span-3 md:col-span-2 lg:col-span-2 hidden lg:block text-sm text-muted-foreground">
              {invoice.date}
            </div>
            
            <div className="col-span-3 md:col-span-2 lg:col-span-2">
              {getStatusBadge(invoice.status)}
            </div>
            
            <div className="col-span-2 md:col-span-1 lg:col-span-1 flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download PDF</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Send className="mr-2 h-4 w-4" />
                    <span>Send Reminder</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
