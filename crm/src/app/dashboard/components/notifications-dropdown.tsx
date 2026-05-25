"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Users, 
  Calendar, 
  IndianRupee, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function NotificationsDropdown() {
  const [unreadCount, setUnreadCount] = useState(2);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New High-Value Lead Registered",
      description: "Priya Sharma (₹5.2 Cr) expressed interest in Jubilee Hills Villa.",
      time: "2 mins ago",
      type: "lead",
      unread: true,
    },
    {
      id: 2,
      title: "Site Visit Scheduled",
      description: "Arjun Mehta requested Gachibowli Flat site visit tomorrow at 11:30 AM.",
      time: "25 mins ago",
      type: "visit",
      unread: true,
    },
    {
      id: 3,
      title: "Commission Disbursed",
      description: "Payment of ₹1.8 Lakhs for Meadows unit #213B received.",
      time: "2 hours ago",
      type: "payment",
      unread: false,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadCount(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "lead":
        return <Users className="h-3.5 w-3.5 text-blue-500" />;
      case "visit":
        return <Calendar className="h-3.5 w-3.5 text-violet-500" />;
      case "payment":
        return <IndianRupee className="h-3.5 w-3.5 text-emerald-500" />;
      default:
        return <Bell className="h-3.5 w-3.5 text-indigo-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        portalled={false}
        className="w-[320px] sm:w-[360px] border border-border/40 p-2 shadow-xl rounded-xl z-50 backdrop-blur-sm"
      >
        <DropdownMenuLabel className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/10 border-indigo-500/20 text-[10px] px-1.5 py-0">
                {unreadCount} New
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead} 
              className="text-[10px] font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-border/20" />
        
        <div className="max-h-[280px] overflow-y-auto py-1 scrollbar-thin">
          {notifications.map((notif) => (
            <DropdownMenuItem 
              key={notif.id}
              className={cn(
                "flex items-start gap-3 p-2.5 rounded-lg my-0.5 cursor-pointer transition-all",
                notif.unread ? "bg-indigo-500/5 hover:bg-indigo-500/10" : "hover:bg-accent/40"
              )}
            >
              <div className={cn(
                "h-7 w-7 rounded-md flex items-center justify-center border shrink-0",
                notif.type === "lead" && "bg-blue-500/10 border-blue-500/25",
                notif.type === "visit" && "bg-violet-500/10 border-violet-500/25",
                notif.type === "payment" && "bg-emerald-500/10 border-emerald-500/25"
              )}>
                {getIcon(notif.type)}
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className={cn("text-[11px] truncate", notif.unread ? "font-bold text-foreground" : "font-semibold text-foreground/80")}>
                    {notif.title}
                  </h4>
                  <span className="text-[9px] text-muted-foreground/80 shrink-0 font-mono">
                    {notif.time}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-normal line-clamp-2">
                  {notif.description}
                </p>
              </div>
              {notif.unread && (
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0 self-center" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
        
        <DropdownMenuSeparator className="bg-border/20" />
        
        <DropdownMenuItem className="p-0 mt-1 cursor-pointer">
          <Link 
            href="/dashboard?tab=notifications" 
            className="w-full text-center py-2 text-xs font-semibold text-indigo-500 hover:text-indigo-600 hover:bg-indigo-500/5 rounded-lg flex items-center justify-center gap-1.5"
          >
            View All Notifications
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
