"use client";

import { Menu, Bell, Search, Plus, User, Settings, LogOut, Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from "./sidebar";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useTheme } from "./theme";
import { cn } from "@/lib/utils";
import { NotificationsDropdown } from "./notifications-dropdown";
import { usePathname, useSearchParams } from "next/navigation";

function PageTitle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname.includes("/dashboard/tasks")) return "Tasks";
  if (pathname.includes("/crm/leads")) return "Leads";
  if (pathname.includes("/crm/customers")) return "Customers";
  if (pathname.includes("/crm/pipeline")) return "Pipeline";
  if (pathname.includes("/crm")) return "CRM";
  if (pathname.includes("/properties/listings")) return "Property Listings";
  if (pathname.includes("/properties/featured")) return "Featured Properties";
  if (pathname.includes("/properties")) return "Properties";

  if (pathname === "/dashboard") {
    const tab = searchParams.get("tab") || "overview";
    switch (tab) {
      case "overview":     return "Overview";
      case "analytics":    return "Analytics";
      case "reports":      return "Reports";
      case "notifications":return "Notifications";
      default:             return "Overview";
    }
  }

  return "Overview";
}

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b px-4 md:px-6 backdrop-blur-sm glass-topbar">
      
      {/* Left: Mobile Nav and Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Trigger (Sheet) */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" showCloseButton={false} className={cn("p-0 w-[280px] bg-background border-border text-foreground", theme)}>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">Mobile navigation sidebar for CRM dashboard</SheetDescription>
            {/* Standard sidebar embedded inside drawer, force full expansion */}
            <Sidebar className="border-r-0 w-full" isCollapsed={false} onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Collapsible Sidebar Button (Desktop Only) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hidden lg:flex h-9 w-9 text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Page Title / Location */}
        <h1 className="text-lg font-semibold tracking-tight md:text-xl capitalize">
          <Suspense fallback="Overview">
            <PageTitle />
          </Suspense>
        </h1>
      </div>

      {/* Center: Search Bar (Desktop only) */}
      <div className="hidden md:flex w-full max-w-sm items-center relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search properties, leads, agents..."
          className="pl-9 bg-slate-50/50 dark:bg-slate-900/50"
        />
      </div>

      {/* Right: Quick Actions, Notifications, & Profile */}
      <div className="flex items-center gap-3">
        
        {/* Quick Create Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="h-9 gap-1 shadow-sm cursor-pointer">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Create New</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Add Property Listing</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Register New Client</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Add Agent Account</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Schedule Appointment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Icon Button */}
        <NotificationsDropdown />

        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 border flex items-center justify-center cursor-pointer">
              <span className="text-xs font-bold text-foreground">MA</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Madhusudha Infra</p>
                <p className="text-xs leading-none text-muted-foreground">admin@infra.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer" asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
