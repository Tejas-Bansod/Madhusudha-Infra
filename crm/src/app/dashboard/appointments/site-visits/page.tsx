"use client";

import { useState } from "react";
import { Search, Filter, CalendarDays, List, ArrowDownUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisitStats } from "../components/VisitStats";
import { VisitList } from "../components/VisitList";
import { ScheduleVisitModal } from "../components/ScheduleVisitModal";
import { VisitCalendar } from "../components/VisitCalendar";

export default function SiteVisitsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8 w-full max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Site Visits</h2>
          <p className="text-muted-foreground mt-1">
            Manage property tours, coordinate with agents, and track client viewings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-background/50 border-border/50">
            Export Schedule
          </Button>
          <ScheduleVisitModal />
        </div>
      </div>

      <VisitStats />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by client, property, or agent..."
              className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/20"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0 bg-background/50 border-border/50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <Tabs value={view} onValueChange={(v) => setView(v as "list" | "calendar")} className="h-9">
            <TabsList className="grid w-[120px] grid-cols-2 h-9 p-1 bg-background/50 border border-border/50">
              <TabsTrigger value="list" className="data-[state=active]:bg-background shadow-sm">
                <List className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-background shadow-sm">
                <CalendarDays className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" className="bg-background/50 border-border/50 h-9">
            <ArrowDownUp className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <VisitList />
      ) : (
        <VisitCalendar />
      )}
    </div>
  );
}
