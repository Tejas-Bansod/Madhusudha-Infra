"use client";

import { useState, useEffect } from "react";
import { mockTasks, TaskStatus } from "./data/tasks";
import { TaskBoard } from "./components/task-board";
import { TaskTable } from "./components/task-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, LayoutGrid, TableProperties } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [allTasks, setAllTasks] = useState(mockTasks);

  // Load initial view mode preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("tasks-view-mode");
      if (savedMode === "kanban" || savedMode === "table") {
        if (window.innerWidth >= 768) {
          setViewMode(savedMode as "kanban" | "table");
        }
      }
    }
  }, []);

  // Listen for screen resize to force table mode on mobile, but keep saved setting on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("table");
      } else {
        const savedMode = localStorage.getItem("tasks-view-mode");
        if (savedMode === "kanban" || savedMode === "table") {
          setViewMode(savedMode as "kanban" | "table");
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save changes to localStorage on user action (only if screen is desktop/tablet size)
  const handleViewModeChange = (mode: "kanban" | "table") => {
    setViewMode(mode);
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      localStorage.setItem("tasks-view-mode", mode);
    }
  };

  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          task.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || task.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleTasksUpdate = (newTasks: typeof mockTasks) => {
    setAllTasks(prev => {
      const updatedIds = new Set(newTasks.map(t => t.id));
      const untouched = prev.filter(p => !updatedIds.has(p.id));
      return [...newTasks, ...untouched];
    });
  };

  return (
    <div className="flex flex-col h-full w-full min-w-0 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your team's follow-ups, calls, and agent assignments.</p>
        </div>
        <Button className="shrink-0 font-semibold shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 glass-card p-2 rounded-xl border border-border shadow-sm flex-shrink-0 w-full min-w-0">
        <div className="flex items-center w-full xl:w-auto px-1 gap-4 min-w-0">
          <div className="relative w-full xl:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tasks by title or description..." 
              className="pl-9 bg-background h-9 border-muted-foreground/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hidden xl:flex items-center bg-muted/50 p-1 rounded-md border border-border/50">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-7 px-3 text-xs transition-all duration-200 cursor-pointer",
                viewMode === "kanban" 
                  ? "bg-background text-foreground shadow-sm font-semibold border border-border/10" 
                  : "text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/40"
              )}
              onClick={() => handleViewModeChange("kanban")}
            >
              <LayoutGrid className="mr-2 h-3.5 w-3.5" />
              Kanban
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-7 px-3 text-xs transition-all duration-200 cursor-pointer",
                viewMode === "table" 
                  ? "bg-background text-foreground shadow-sm font-semibold border border-border/10" 
                  : "text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/40"
              )}
              onClick={() => handleViewModeChange("table")}
            >
              <TableProperties className="mr-2 h-3.5 w-3.5" />
              Table
            </Button>
          </div>
        </div>
        
        <div className="w-full xl:w-auto flex items-center justify-between gap-4 min-w-0">
          <div className="overflow-x-auto pb-1.5 xl:pb-0 w-full min-w-0 scrollbar-thin">
            <Tabs value={typeFilter} onValueChange={setTypeFilter} className="w-full xl:w-auto">
              <TabsList className="bg-muted/50 h-9 p-1 border border-border/50">
                <TabsTrigger value="All" className="text-xs px-3 rounded-md">All Tasks</TabsTrigger>
                <TabsTrigger value="Follow-up" className="text-xs px-3 rounded-md">Follow-ups</TabsTrigger>
                <TabsTrigger value="Call" className="text-xs px-3 rounded-md">Calls</TabsTrigger>
                <TabsTrigger value="Meeting" className="text-xs px-3 rounded-md">Meetings</TabsTrigger>
                <TabsTrigger value="Property visit" className="text-xs px-3 rounded-md">Visits</TabsTrigger>
                <TabsTrigger value="Documentation pending" className="text-xs px-3 rounded-md">Docs</TabsTrigger>
                <TabsTrigger value="Agent assignment" className="text-xs px-3 rounded-md">Agents</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="hidden md:flex xl:hidden items-center bg-muted/50 p-1 rounded-md border border-border/50 shrink-0">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-7 px-3 text-xs transition-all duration-200 cursor-pointer",
                viewMode === "kanban" 
                  ? "bg-background text-foreground shadow-sm font-semibold border border-border/10" 
                  : "text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/40"
              )}
              onClick={() => handleViewModeChange("kanban")}
            >
              <LayoutGrid className="mr-2 h-3.5 w-3.5" />
              Kanban
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-7 px-3 text-xs transition-all duration-200 cursor-pointer",
                viewMode === "table" 
                  ? "bg-background text-foreground shadow-sm font-semibold border border-border/10" 
                  : "text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/40"
              )}
              onClick={() => handleViewModeChange("table")}
            >
              <TableProperties className="mr-2 h-3.5 w-3.5" />
              Table
            </Button>
          </div>
        </div>
      </div>

      {/* Board Workspace */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {viewMode === "kanban" ? (
          <>
            <div className="hidden md:block h-full">
              <TaskBoard initialTasks={filteredTasks} onTasksUpdate={handleTasksUpdate} />
            </div>
            <div className="block md:hidden h-full">
              <TaskTable tasks={filteredTasks} />
            </div>
          </>
        ) : (
          <TaskTable tasks={filteredTasks} />
        )}
      </div>
    </div>
  );
}
