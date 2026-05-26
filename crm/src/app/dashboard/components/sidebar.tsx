"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  Home,
  Users2,
  CalendarDays,
  FileText,
  Settings,
  LogOut,
  Bell,
  CheckCircle2,
  DollarSign,
  Wrench,
  FolderClosed,
  ClipboardList,
  Zap,
  ChevronDown,
  ChevronRight,
  UserPlus,
  GitBranch,
  Receipt,
  List,
  Star,
  UserCog,
  Calendar,
  PenTool,
  Settings2,
  TrendingUp,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  onClose?: () => void;
}

const upperNavItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckCircle2, badge: 9 },
  { name: "Notifications", href: "/dashboard?tab=notifications", icon: Bell, badge: 3 },
];

const appsItems = [
  { 
    name: "CRM", 
    href: "/dashboard/crm", 
    icon: Users2, 
    bgClass: "bg-emerald-500",
    subItems: [
      { name: "Leads", href: "/dashboard/crm/leads", icon: UserPlus },
      { name: "Customers", href: "/dashboard/crm/customers", icon: Users2 },
    ]
  },

  // { 
  //   name: "Sales", 
  //   href: "/dashboard/sales", 
  //   icon: DollarSign, 
  //   bgClass: "bg-blue-500",
  //   subItems: [
  //     { name: "Deals", href: "/dashboard/sales/deals", icon: TrendingUp },
  //     { name: "Invoices", href: "/dashboard/sales/invoices", icon: Receipt }
  //   ]
  // },

  // CHANGE "Projects" → "Properties"
  { 
    name: "Properties", 
    href: "/dashboard/properties", 
    icon: Building2, 
    bgClass: "bg-violet-500",
    subItems: [
      { name: "Listings", href: "/dashboard/properties/listings", icon: List },
    ]
  },

  // CHANGE "Field Service" → "Operations" or "Team"
  { 
    name: "Operations", 
    href: "/dashboard/operations", 
    icon: Wrench, 
    bgClass: "bg-orange-500",
    subItems: [
      { name: "Agents", href: "/dashboard/operations/agents", icon: UserCog },
      { name: "Schedules", href: "/dashboard/operations/schedules", icon: Calendar }
    ]
  },

  // FILES SECTION IS GOOD
  { 
    name: "Files", 
    href: "/dashboard/files", 
    icon: FolderClosed, 
    bgClass: "bg-slate-500",
    subItems: [
      { name: "Documents", href: "/dashboard/files/documents", icon: FileText },
      { name: "Invoices", href: "/dashboard/files/invoices", icon: Receipt },
    ]
  },

  // CHANGE "Forms" → "Bookings" or "Appointments"
  { 
    name: "Appointments", 
    href: "/dashboard/appointments", 
    icon: ClipboardList, 
    bgClass: "bg-amber-500",
    subItems: [
      { name: "Site Visits", href: "/dashboard/appointments/site-visits", icon: CalendarDays },
      // { name: "Form Builder", href: "/dashboard/forms/builder", icon: PenTool }
    ]
  },

  // { 
  //   name: "Automations", 
  //   href: "/dashboard/automations", 
  //   icon: Zap, 
  //   bgClass: "bg-yellow-500",
  //   subItems: [
  //     { name: "Workflows", href: "/dashboard/automations/workflows", icon: GitBranch },
  //     { name: "Settings", href: "/dashboard/automations/settings", icon: Settings2 }
  //   ]
  // },
];


export default function Sidebar({ className, isCollapsed: externalCollapsed, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    CRM: true, // Default
  });
  
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  // Load submenu states from localStorage on client side mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("crm_sidebar_submenus");
      if (saved) {
        try {
          setOpenSubmenus(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse sidebar submenus state", e);
        }
      }
    }
  }, []);

  const toggleSubmenu = (name: string) => {
    const nextState = {
      ...openSubmenus,
      [name]: !openSubmenus[name]
    };
    setOpenSubmenus(nextState);
    if (typeof window !== "undefined") {
      localStorage.setItem("crm_sidebar_submenus", JSON.stringify(nextState));
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative flex flex-col h-full border-r border-border text-foreground transition-all duration-300 ease-in-out z-30 overflow-hidden glass-sidebar",
          isCollapsed ? "w-16" : "w-full lg:w-64",
          className
        )}
      >
        {/* Sidebar Header */}
        <div className={cn("flex h-16 items-center border-b border-border flex-shrink-0 px-4", isCollapsed ? "justify-center" : "justify-start gap-3 justify-between")}>
          <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2.5 overflow-hidden flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg flex-shrink-0">
              <Building2 className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-[16px] tracking-tight text-foreground truncate">
                Madhusudha Infra
              </span>
            )}
          </Link>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0 rounded-full hover:bg-muted"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>

        {/* Main Navigation Workspace */}
        <ScrollArea className="flex-1 min-h-0">
          <div className={cn("py-4 space-y-4", isCollapsed ? "px-2" : "px-4")}>
          
          {/* 1. Upper Nav Items */}
          <nav className="space-y-1">
            {upperNavItems.map((item) => {
              const isActive = pathname === item.href;
              const linkEl = (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-all group relative",
                    isCollapsed ? "justify-center h-10 w-10 mx-auto" : "justify-between px-3 py-2",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </div>

                  {/* Badge indicator on the right */}
                  {!isCollapsed && item.badge !== undefined && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-emerald-500 px-1 text-[11px] font-bold text-white leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );

              return (
                <div key={item.name}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {linkEl}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium text-xs">
                        {item.name} {item.badge !== undefined ? `(${item.badge})` : ""}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    linkEl
                  )}
                </div>
              );
            })}
          </nav>

          {/* Divider / Section Header */}
          {!isCollapsed && (
            <div className="px-3 pt-2">
              <p className="text-[11px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
                Apps
              </p>
            </div>
          )}

          {/* 2. Apps Nav Items with Submenus */}
          <nav className="space-y-1">
            {appsItems.map((item) => {
              const isActive = pathname === item.href || item.subItems?.some(sub => pathname === sub.href);
              const isSubmenuOpen = !!openSubmenus[item.name];

              // Render for collapsed state:
              if (isCollapsed) {
                if (item.subItems && item.subItems.length > 0) {
                  return (
                    <DropdownMenu key={item.name}>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            "flex items-center justify-center h-10 w-10 mx-auto rounded-lg text-sm font-medium transition-all group relative cursor-pointer outline-none",
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                        >
                          <div className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md text-white flex-shrink-0",
                            item.bgClass
                          )}>
                            <item.icon className="h-3.5 w-3.5" />
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start" className="w-48 ml-1 bg-popover border border-border shadow-md">
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-b border-border/50 mb-1">
                          {item.name}
                        </div>
                        {item.subItems.map((sub) => (
                          <DropdownMenuItem key={sub.name} asChild className="cursor-pointer">
                            <Link href={sub.href} onClick={onClose} className="w-full flex items-center gap-2.5">
                              <sub.icon className="h-3.5 w-3.5 opacity-70" />
                              <span>{sub.name}</span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                } else {
                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center justify-center h-10 w-10 mx-auto rounded-lg text-sm font-medium transition-all group relative",
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                        >
                          <div className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md text-white flex-shrink-0",
                            item.bgClass
                          )}>
                            <item.icon className="h-3.5 w-3.5" />
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium text-xs">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  );
                }
              }

              // Render for expanded state:
              return (
                <div key={item.name} className="space-y-1">
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group relative cursor-pointer outline-none",
                          isActive
                            ? "bg-accent/40 text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md text-white flex-shrink-0",
                            item.bgClass
                          )}>
                            <item.icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="truncate">{item.name}</span>
                        </div>
                        {isSubmenuOpen ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                        )}
                      </button>
                      
                      {/* Submenu links */}
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out pl-9 space-y-1",
                          isSubmenuOpen ? "max-h-[250px] py-1 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                        )}
                      >
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={onClose}
                              className={cn(
                                "flex items-center h-8 px-3 gap-2.5 rounded-md text-xs font-medium transition-all",
                                isSubActive
                                  ? "text-primary font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              <sub.icon className="h-3.5 w-3.5 opacity-70" />
                              <span>{sub.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all group relative gap-3",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      <div className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-md text-white flex-shrink-0",
                        item.bgClass
                      )}>
                        <item.icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className={cn("border-t border-border flex flex-col gap-2 flex-shrink-0", isCollapsed ? "p-2 items-center" : "p-4")}>
          <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
            <div className="relative h-9 w-9 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0 font-semibold text-foreground">
              MA
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate text-foreground">Madhusudha Admin</span>
                <span className="text-xs text-muted-foreground truncate">admin@infra.com</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 mt-1 px-3 h-9 gap-3 cursor-pointer"
              asChild
            >
              <Link href="/" onClick={onClose}>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </Button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
