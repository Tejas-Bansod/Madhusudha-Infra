"use client";

import { useState } from "react";
import { Plus, Calendar as CalendarIcon, Clock, MapPin, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function ScheduleVisitModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Visit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] border-border/50 bg-background/95 backdrop-blur-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Schedule a Site Visit</DialogTitle>
            <DialogDescription>
              Book a new property tour for a client. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" /> Client Name
                </Label>
                <Input id="client" placeholder="e.g. John Doe" className="bg-background/50 border-border/50" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" /> Property
                </Label>
                <Select required>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">Sunrise Apartments 4B</SelectItem>
                    <SelectItem value="p2">Tech Park Phase II</SelectItem>
                    <SelectItem value="p3">Villa 32, Palm Springs</SelectItem>
                    <SelectItem value="p4">Commercial Plot A1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" /> Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-background/50 border-border/50",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-border/50" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="bg-background/95 backdrop-blur-xl"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" /> Time
                </Label>
                <Select required>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:30">11:30 AM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent">Assigned Agent</Label>
              <Select defaultValue="a1">
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a1">Sarah Jenkins</SelectItem>
                  <SelectItem value="a2">Michael Chen</SelectItem>
                  <SelectItem value="a3">Priya Sharma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input id="notes" placeholder="Client requested to see the amenities..." className="bg-background/50 border-border/50" />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Visit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
