"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "../data/tasks";
import { CalendarDays, Phone, Users, Home, FileText, UserPlus, MoreVertical, Bell } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const typeIconMap: Record<string, React.ReactNode> = {
  "Follow-up": <Bell className="h-3 w-3" />,
  "Call": <Phone className="h-3 w-3" />,
  "Meeting": <Users className="h-3 w-3" />,
  "Property visit": <Home className="h-3 w-3" />,
  "Documentation pending": <FileText className="h-3 w-3" />,
  "Agent assignment": <UserPlus className="h-3 w-3" />
};

export const priorityColorMap: Record<string, string> = {
  High: "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20",
  Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20",
  Low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20"
};

export const typeColorMap: Record<string, string> = {
  "Follow-up": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  "Call": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Meeting": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Property visit": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Documentation pending": "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  "Agent assignment": "bg-pink-500/10 text-pink-600 dark:text-pink-400"
};

export function TaskCard({ task }: { task: Task }) {
  const date = new Date(task.dueDate);
  const isOverdue = date < new Date() && task.status !== "Completed";
  
  const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <Card className="p-2 shadow-sm hover:shadow-lg transition-all duration-200 group cursor-grab active:cursor-grabbing border-border glass-card hover:-translate-y-0.5">
      <CardHeader className="p-2 flex flex-row items-start justify-between space-y-0">
        <div className="flex flex-col gap-1.5 items-start">
          <Badge 
            variant="secondary" 
            className={cn(
              "flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider border-none px-1.5 py-0", 
              typeColorMap[task.type]
            )}
          >
            {typeIconMap[task.type]}
            {task.type}
          </Badge>
          <h3 className="font-semibold text-xs leading-tight text-foreground line-clamp-2 mt-0.5">
            {task.title}
          </h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="px-2 py-0">
        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      </CardContent>
      <CardFooter className="p-2 pt-2 flex items-center justify-between border-t border-border/40">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("border-none px-2 py-0 text-[10px] font-bold", priorityColorMap[task.priority])}>
            {task.priority}
          </Badge>
          <div className={cn("flex items-center gap-1 text-[10px] font-bold", isOverdue ? "text-red-500" : "text-muted-foreground")}>
            <CalendarDays className="h-3 w-3" />
            {formattedDate}
          </div>
        </div>
        <Avatar className="h-8 w-8 border border-background shadow-sm">
          <AvatarImage src={task.assignee.avatar} />
          <AvatarFallback className="text-[8px] bg-primary/10 text-primary font-bold">
            {task.assignee.initials}
          </AvatarFallback>
        </Avatar>
      </CardFooter>
    </Card>
  );
}
