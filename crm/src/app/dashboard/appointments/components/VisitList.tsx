"use client";

import { motion } from "framer-motion";
import { MoreHorizontal, MapPin, User, Clock, CalendarCheck, CheckCircle2, XCircle, Phone } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";

const visits = [
  {
    id: "v1",
    client: "Sarah Jenkins",
    clientPhone: "+1 (555) 123-4567",
    clientAvatar: "https://i.pravatar.cc/150?u=sarah",
    property: "Sunrise Apartments 4B",
    location: "123 Ocean Drive, Coastal City",
    date: "Today, May 26",
    time: "10:00 AM - 11:00 AM",
    agent: "Michael Chen",
    agentAvatar: "https://i.pravatar.cc/150?u=michael",
    status: "Upcoming",
  },
  {
    id: "v2",
    client: "Robert Fox",
    clientPhone: "+1 (555) 987-6543",
    clientAvatar: "https://i.pravatar.cc/150?u=robert",
    property: "Tech Park Phase II",
    location: "45 Innovation Blvd, Tech Hub",
    date: "Today, May 26",
    time: "02:30 PM - 03:30 PM",
    agent: "Priya Sharma",
    agentAvatar: "https://i.pravatar.cc/150?u=priya",
    status: "Upcoming",
  },
  {
    id: "v3",
    client: "Emily Chen",
    clientPhone: "+1 (555) 456-7890",
    clientAvatar: "https://i.pravatar.cc/150?u=emily",
    property: "Villa 32, Palm Springs",
    location: "789 Palm Avenue, Oasis City",
    date: "Yesterday, May 25",
    time: "11:00 AM - 12:30 PM",
    agent: "Sarah Jenkins",
    agentAvatar: "https://i.pravatar.cc/150?u=sarahj",
    status: "Completed",
  },
  {
    id: "v4",
    client: "David Wilson",
    clientPhone: "+1 (555) 234-5678",
    clientAvatar: "https://i.pravatar.cc/150?u=david",
    property: "Commercial Plot A1",
    location: "Downtown Business District",
    date: "Tomorrow, May 27",
    time: "09:00 AM - 10:00 AM",
    agent: "Michael Chen",
    agentAvatar: "https://i.pravatar.cc/150?u=michael",
    status: "Rescheduled",
  },
  {
    id: "v5",
    client: "Jessica Taylor",
    clientPhone: "+1 (555) 876-5432",
    clientAvatar: "https://i.pravatar.cc/150?u=jessica",
    property: "Lakeview Penthouse",
    location: "900 Shoreline Drive",
    date: "May 28, 2026",
    time: "04:00 PM - 05:00 PM",
    agent: "Priya Sharma",
    agentAvatar: "https://i.pravatar.cc/150?u=priya",
    status: "Cancelled",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Upcoming":
      return <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-0">Upcoming</Badge>;
    case "Completed":
      return <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-0">Completed</Badge>;
    case "Rescheduled":
      return <Badge className="bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-0">Rescheduled</Badge>;
    case "Cancelled":
      return <Badge className="bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 border-0">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function VisitList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  } as const;

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {visits.map((visit) => (
        <motion.div key={visit.id} variants={item}>
          <Card className="group p-0 overflow-hidden border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:border-primary/30">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                
                {/* Time & Date Section */}
                <div className="md:w-48 p-5 bg-muted/20 border-b md:border-b-0 md:border-r border-border/50 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors"></div>
                  <div className="flex items-center gap-2 text-primary font-semibold mb-1">
                    <CalendarCheck className="h-4 w-4" />
                    <span className="text-sm">{visit.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{visit.time}</span>
                  </div>
                  <div className="mt-4">
                    {getStatusBadge(visit.status)}
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 p-5 grid gap-6 md:grid-cols-2">
                  
                  {/* Property Info */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-primary/10 rounded-lg text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg line-clamp-1" title={visit.property}>{visit.property}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1" title={visit.location}>{visit.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* People Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-border/50">
                          <AvatarImage src={visit.clientAvatar} alt={visit.client} />
                          <AvatarFallback>{visit.client.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{visit.client}</p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {visit.clientPhone}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-lg border border-border/50 w-fit">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={visit.agentAvatar} alt={visit.agent} />
                        <AvatarFallback>{visit.agent.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">Assigned to <strong className="text-foreground">{visit.agent}</strong></span>
                    </div>
                  </div>

                </div>

                {/* Actions */}
                <div className="p-4 flex items-center justify-end border-t md:border-t-0 md:border-l border-border/50 bg-muted/10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {visit.status === "Upcoming" && (
                        <>
                          <DropdownMenuItem>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                            <span>Mark as Completed</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Reschedule</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>View Client Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>View Property</span>
                      </DropdownMenuItem>
                      {visit.status === "Upcoming" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Cancel Visit</span>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
