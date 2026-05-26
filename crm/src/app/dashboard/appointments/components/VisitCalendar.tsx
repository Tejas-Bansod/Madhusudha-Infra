"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, MapPin, User, Clock, CalendarDays, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const mockEvents = [
  { id: 1, date: 5, title: "Sunrise Apts 4B", client: "Sarah J.", type: "Completed", time: "10:00 AM", agent: "Michael C." },
  { id: 2, date: 12, title: "Tech Park II", client: "Robert F.", type: "Upcoming", time: "02:30 PM", agent: "Priya S." },
  { id: 3, date: 15, title: "Villa 32", client: "Emily C.", type: "Completed", time: "11:00 AM", agent: "Sarah J." },
  { id: 4, date: 18, title: "Plot A1", client: "David W.", type: "Rescheduled", time: "09:00 AM", agent: "Michael C." },
  { id: 5, date: 22, title: "Lakeview Penthouse", client: "Jessica T.", type: "Cancelled", time: "04:00 PM", agent: "Priya S." },
  { id: 6, date: 25, title: "Ocean View", client: "Tom H.", type: "Upcoming", time: "01:00 PM", agent: "Sarah J." },
  { id: 7, date: 26, title: "Sunrise Apts 4B", client: "Sarah J.", type: "Upcoming", time: "10:00 AM", agent: "Michael C." },
  { id: 8, date: 26, title: "Tech Park II", client: "Robert F.", type: "Upcoming", time: "02:30 PM", agent: "Priya S." },
  { id: 9, date: 27, title: "Plot A1", client: "David W.", type: "Rescheduled", time: "09:00 AM", agent: "Michael C." },
];

const getEventColor = (type: string) => {
  switch (type) {
    case "Upcoming": return "bg-amber-500/20 text-amber-600 border-amber-500/30";
    case "Completed": return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30";
    case "Rescheduled": return "bg-blue-500/20 text-blue-600 border-blue-500/30";
    case "Cancelled": return "bg-rose-500/20 text-rose-600 border-rose-500/30";
    default: return "bg-slate-500/20 text-slate-600 border-slate-500/30";
  }
};

const getDotColor = (type: string) => {
  switch (type) {
    case "Upcoming": return "bg-amber-500";
    case "Completed": return "bg-emerald-500";
    case "Rescheduled": return "bg-blue-500";
    case "Cancelled": return "bg-rose-500";
    default: return "bg-slate-500";
  }
};

export function VisitCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(26); // Default select 26th for preview

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
  const currentDay = today.getDate();

  const selectedDayEvents = mockEvents.filter(
    e => e.date === selectedDay && currentDate.getMonth() === 4
  );

  return (
    <div className="space-y-4 w-full">
      <Card className="border-border/50 bg-background/50 backdrop-blur-xl shadow-sm overflow-hidden w-full">
        <CardContent className="p-0 w-full">
          
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-border/50 bg-muted/10 gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-background/50 border-border/50" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 bg-background/50 border-border/50" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Legend - hidden on tiny screens, flex-wrap on mobile */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Upcoming</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Rescheduled</div>
            </div>
          </div>

          {/* Calendar Grid Header */}
          <div className="grid grid-cols-7 border-b border-border/50 bg-muted/20 text-center">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-muted-foreground border-r border-border/50 last:border-r-0">
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.charAt(0)}</span>
              </div>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 bg-background/40">
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
              <div key={`empty-${idx}`} className="min-h-[70px] sm:min-h-[100px] md:min-h-[120px] p-1 sm:p-2 border-r border-b border-border/30 bg-muted/5 opacity-50"></div>
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const isToday = isCurrentMonth && day === currentDay;
              const isSelected = day === selectedDay;
              const dayEvents = mockEvents.filter(e => e.date === day && currentDate.getMonth() === 4);

              return (
                <div 
                  key={`day-${currentDate.getMonth()}-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[70px] sm:min-h-[100px] md:min-h-[120px] p-1 sm:p-2 border-r border-b border-border/30 transition-colors hover:bg-muted/10 group relative cursor-pointer ${
                    isToday ? 'bg-primary/5' : ''
                  } ${isSelected ? 'bg-primary/10 border-primary/30' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <span className={`flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full text-xs sm:text-sm font-medium ${
                      isToday 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : isSelected
                          ? 'bg-primary/20 text-primary'
                          : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {day}
                    </span>
                    <Button variant="ghost" size="icon" className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex">
                      <Plus className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </div>
                  
                  {/* Desktop event view */}
                  <div className="hidden md:block space-y-1.5">
                    {dayEvents.map(event => (
                      <Popover key={event.id}>
                        <PopoverTrigger asChild>
                          <div 
                            onClick={(e) => e.stopPropagation()} 
                            className={`text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border cursor-pointer truncate transition-all hover:scale-[1.02] active:scale-95 ${getEventColor(event.type)}`}
                          >
                            {event.time} - {event.title}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0 border-border/50 bg-background/95 backdrop-blur-xl shadow-xl" align="start">
                          <div className="p-4 border-b border-border/50 bg-muted/10">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-lg">{event.title}</h4>
                              <Badge variant="outline" className={getEventColor(event.type)}>{event.type}</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" /> {event.time}, {monthNames[currentDate.getMonth()]} {day}, {currentDate.getFullYear()}
                            </div>
                          </div>
                          <div className="p-4 space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <User className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium leading-none">Client</p>
                                <p className="text-sm text-muted-foreground mt-1">{event.client}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-medium leading-none">Agent Assigned</p>
                                <p className="text-sm text-muted-foreground mt-1">{event.agent}</p>
                              </div>
                            </div>
                            <div className="pt-2 grid grid-cols-2 gap-2">
                              <Button className="w-full h-8 text-xs">View Details</Button>
                              <Button variant="outline" className="w-full h-8 text-xs">Reschedule</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    ))}
                  </div>

                  {/* Mobile event dots indicator */}
                  <div className="flex md:hidden gap-1 flex-wrap justify-center mt-1">
                    {dayEvents.map(event => (
                      <span key={event.id} className={`w-1.5 h-1.5 rounded-full ${getDotColor(event.type)}`} />
                    ))}
                  </div>

                </div>
              );
            })}
            
            {Array.from({ length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 }).map((_, idx) => (
              <div key={`end-empty-${idx}`} className="min-h-[70px] sm:min-h-[100px] md:min-h-[120px] p-1 sm:p-2 border-r border-b border-border/30 bg-muted/5 opacity-50"></div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day View for Mobile & Tablet (< md) */}
      <div className="md:hidden w-full">
        {selectedDay ? (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground px-1">
              Events for {monthNames[currentDate.getMonth()]} {selectedDay}
            </h4>
            {selectedDayEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDayEvents.map(event => (
                  <Card key={event.id} className="border-border/50 bg-background/50 backdrop-blur-xl">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-base">{event.title}</h4>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" /> {event.time}
                          </span>
                        </div>
                        <Badge variant="outline" className={getEventColor(event.type)}>{event.type}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs border-t border-border/30 pt-3">
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Client: <strong>{event.client}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>Agent: <strong>{event.agent}</strong></span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Button className="h-8 text-xs w-full">View Details</Button>
                        <Button variant="outline" className="h-8 text-xs w-full">Reschedule</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-muted-foreground bg-background/20 rounded-xl border border-dashed border-border/50">
                No site visits scheduled for this day.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-sm text-muted-foreground bg-background/20 rounded-xl border border-dashed border-border/50">
            Select a day on the calendar to view visits.
          </div>
        )}
      </div>
    </div>
  );
}
