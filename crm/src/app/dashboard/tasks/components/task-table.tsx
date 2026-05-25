"use client";

import { Task } from "../data/tasks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { priorityColorMap, typeColorMap, typeIconMap } from "./task-card";

export function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <div className="flex flex-col h-full rounded-xl border border-border shadow-sm glass-card overflow-hidden">
      <ScrollArea className="flex-1 min-h-0">
        {/* Mobile View: Stacked Card List */}
        <div className="md:hidden divide-y divide-border/50">
          {tasks.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No tasks found.
            </div>
          ) : (
            tasks.map((task) => {
              const date = new Date(task.dueDate);
              const isOverdue = date < new Date() && task.status !== "Completed";
              const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

              return (
                <div key={task.id} className="p-4 flex flex-col gap-3 hover:bg-muted/10 transition-colors">
                  {/* Top row: Type Badges & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider border-none px-2 py-0.5", 
                          typeColorMap[task.type]
                        )}
                      >
                        {typeIconMap[task.type]}
                        {task.type}
                      </Badge>
                      <Badge variant="outline" className="font-semibold px-2 py-0.5 text-[10px] bg-background">
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className={cn("border-none px-2 py-0.5 text-[10px] font-bold", priorityColorMap[task.priority])}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Middle row: Title and Description */}
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-sm text-foreground">{task.title}</span>
                    <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{task.description}</span>
                  </div>

                  {/* Bottom row: Due Date and Assignee */}
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-border/40">
                    <div className={cn("flex items-center gap-1.5 text-xs font-semibold", isOverdue ? "text-red-500" : "text-muted-foreground")}>
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>Due {formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-5.5 w-5.5 border border-border">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-[8px] bg-primary/10 text-primary font-bold">
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-foreground">{task.assignee.name}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop/Tablet View: Traditional Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[300px]">Task</TableHead>
                <TableHead className="w-[150px]">Type</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[120px]">Priority</TableHead>
                <TableHead className="w-[120px]">Due Date</TableHead>
                <TableHead className="w-[150px]">Assignee</TableHead>
                <TableHead className="w-[50px] text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No tasks found.
                  </TableCell>
                </TableRow>
              ) : (
                tasks.map((task) => {
                  const date = new Date(task.dueDate);
                  const isOverdue = date < new Date() && task.status !== "Completed";
                  const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

                  return (
                    <TableRow key={task.id} className="group hover:bg-muted/30">
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-sm line-clamp-1">{task.title}</span>
                          <span className="text-xs text-muted-foreground line-clamp-1">{task.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "flex items-center w-fit gap-1.5 text-[10px] uppercase font-bold tracking-wider border-none px-2 py-0.5", 
                            typeColorMap[task.type]
                          )}
                        >
                          {typeIconMap[task.type]}
                          {task.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-semibold px-2 py-0.5 text-[11px] bg-background">
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("border-none px-2 py-0.5 text-[11px] font-bold w-fit", priorityColorMap[task.priority])}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={cn("flex items-center gap-1.5 text-xs font-semibold", isOverdue ? "text-red-500" : "text-muted-foreground")}>
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formattedDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 border border-border">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-[9px] bg-primary/10 text-primary font-bold">
                              {task.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium text-foreground">{task.assignee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
