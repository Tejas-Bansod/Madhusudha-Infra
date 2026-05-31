"use client";

import { useEffect, useState } from "react";
import { Home, PhoneCall, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const POPUP_STORAGE_KEY = "realestate-visitor-popup-seen";

export default function VisitorLeadPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="!w-full max-w-none overflow-y-auto p-0 sm:!w-[460px] sm:!max-w-[460px] bg-gradient-to-b from-[#0073e1] via-[#4a97ef] to-[#b0c9f8]"
      >
        <div className="relative h-screen ">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.06),transparent_55%)]" />

          <div className="relative p-5 sm:p-6">
            <SheetHeader className="space-y-3 p-0">
              <Badge className="w-fit border border-white/20 bg-white/15 text-white hover:bg-white/20">
                <Sparkles className="mr-1 size-3" />
                Exclusive Property Access
              </Badge>
              <SheetTitle className="text-xl font-semibold leading-tight text-white">
                Get Handpicked Homes Before They Hit the Market
              </SheetTitle>
            </SheetHeader>

            <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-1.5">
                <label htmlFor="visitor-name" className="text-sm font-medium text-white">
                  Full Name
                </label>
                <input
                  id="visitor-name"
                  type="text"
                  placeholder="Enter your name"
                  className="h-11 w-full rounded-xl border border-white/30 bg-white/95 px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#0f7ae5] focus:ring-2 focus:ring-[#0f7ae5]/30"
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="visitor-phone" className="text-sm font-medium text-white">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneCall className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="visitor-phone"
                    type="tel"
                    placeholder="+91 98XXXXXX21"
                    className="h-11 w-full rounded-xl border border-white/30 bg-white/95 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#0f7ae5] focus:ring-2 focus:ring-[#0f7ae5]/30"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="visitor-email" className="text-sm font-medium text-white">
                  Email Address
                </label>
                <input
                  id="visitor-email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-xl border border-white/30 bg-white/95 px-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#0f7ae5] focus:ring-2 focus:ring-[#0f7ae5]/30"
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="visitor-budget" className="text-sm font-medium text-white">
                  Budget Range
                </label>
                <select
                  id="visitor-budget"
                  defaultValue=""
                  className="h-11 w-full rounded-xl border border-white/30 bg-white/95 px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#0f7ae5] focus:ring-2 focus:ring-[#0f7ae5]/30"
                >
                  <option value="" disabled>
                    Select your budget
                  </option>
                  <option>Below 50 Lakhs</option>
                  <option>50 Lakhs - 1 Crore</option>
                  <option>1 Crore - 2 Crore</option>
                  <option>Above 2 Crore</option>
                </select>
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="visitor-message" className="text-sm font-medium text-white">
                  What are you looking for?
                </label>
                <textarea
                  id="visitor-message"
                  rows={4}
                  placeholder="Tell us your preferred location, BHK, amenities..."
                  className="w-full resize-none rounded-xl border border-white/30 bg-white/95 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#0f7ae5] focus:ring-2 focus:ring-[#0f7ae5]/30"
                />
              </div>

              <div className="rounded-xl border border-white/25 bg-white/12 p-3 text-xs text-white/90">
                <div className="flex items-center gap-2 text-black">
                  <Home className="size-3.5 text-[#000000]" />
                  Receive a call back within 30 minutes.
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#0f7ae5] text-white hover:bg-[#0668ca]"
              >
                Get My Property Matches
              </Button>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
