"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import { ThemeProvider, useTheme } from "./components/theme";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <DashboardContent>{children}</DashboardContent>
    </ThemeProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={cn("flex h-screen w-screen text-foreground crm-gradient-bg", theme)} style={{ isolation: "isolate" }}>
      {/* Sidebar - Persistent on desktop (lg+), hidden on mobile. Handles its own collapse state. */}
      <Sidebar
        className="hidden lg:flex"
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Layout Area */}
      <div className="flex flex-col flex-1 h-full min-w-0" style={{ overflow: "clip" }}>
        {/* Topbar with sidebar toggle integration */}
        <Topbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />

        {/* Scrollable Workspace Panel — overflow-y-auto only on the scroll container, not the outer wrapper */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-transparent w-full min-w-0">
          <main className="p-4 md:p-6 lg:p-8 w-full min-w-0">
            <div className="w-full space-y-6 min-w-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
