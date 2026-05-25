"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Users,
  Home,
  Plus,
  ArrowUpRight,
  Phone,
  Building,
  Target,
  Download,
  IndianRupee,
  Building2,
  FileText,
  PieChart,
  BarChart3,
  LineChart,
  Calendar,
  Bell,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Activity,
  MapPin,
  Clock,
  ChevronRight,
  TrendingDown,
  Sparkles,
  RefreshCw,
  FolderDown,
  Filter
} from "lucide-react";

// Mock Data for Charts
const revenueData = [
  { month: "Jan", revenue: 15000, listings: 12 },
  { month: "Feb", revenue: 22000, listings: 19 },
  { month: "Mar", revenue: 18000, listings: 15 },
  { month: "Apr", revenue: 31000, listings: 24 },
  { month: "May", revenue: 48200, listings: 34 },
  { month: "Jun", revenue: 52000, listings: 42 },
  { month: "Jul", revenue: 61000, listings: 50 },
];

const overviewData = [
  { name: "Jan", total: 4200 },
  { name: "Feb", total: 3100 },
  { name: "Mar", total: 4800 },
  { name: "Apr", total: 2900 },
  { name: "May", total: 5300 },
  { name: "Jun", total: 3900 },
  { name: "Jul", total: 4600 },
  { name: "Aug", total: 3200 },
  { name: "Sep", total: 4900 },
  { name: "Oct", total: 3700 },
  { name: "Nov", total: 4100 },
  { name: "Dec", total: 5500 },
];

// Mock Data for Recent Leads
const recentLeads = [
  {
    id: 1,
    name: "Arjun Mehta",
    email: "arjun@gmail.com",
    phone: "+91 98765 43210",
    property: "3 BHK Apartment - Gachibowli",
    budget: "₹1.8 Cr",
    status: "Hot",
    statusColor: "bg-red-500/10 text-red-500 border-red-500/20",
    avatar: "https://i.pravatar.cc/150?u=arjun",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.s@yahoo.com",
    phone: "+91 91234 56789",
    property: "4 BHK Villa - Jubilee Hills",
    budget: "₹5.2 Cr",
    status: "Warm",
    statusColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
  {
    id: 3,
    name: "Rajesh Patel",
    email: "rajesh.patel@outlook.com",
    phone: "+91 87654 32109",
    property: "2 BHK Flat - Kondapur",
    budget: "₹95 L",
    status: "Cold",
    statusColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    avatar: "https://i.pravatar.cc/150?u=rajesh",
  },
  {
    id: 4,
    name: "Neha Reddy",
    email: "neha.reddy@gmail.com",
    phone: "+91 99887 76655",
    property: "Plot - Kokapet",
    budget: "₹3.5 Cr",
    status: "Hot",
    statusColor: "bg-red-500/10 text-red-500 border-red-500/20",
    avatar: "https://i.pravatar.cc/150?u=neha",
  },
];

// Mock Data for Featured Listings
const featuredListings = [
  {
    id: 1,
    title: "Madhusudha Meadows",
    type: "Premium Villas",
    location: "Kokapet, Hyderabad",
    price: "₹4.5 Cr onwards",
    units: 24,
    totalUnits: 50,
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&dpr=1",
    status: "Active",
  },
  {
    id: 2,
    title: "Infra Grand Heights",
    type: "Luxury Apartments",
    location: "Gachibowli, Hyderabad",
    price: "₹1.6 - 2.8 Cr",
    units: 45,
    totalUnits: 120,
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=200&h=120&dpr=1",
    status: "Selling Fast",
  },
];

// Pure CSS-driven Lightweight Bar Chart
function SimpleBarChart({ data }: { data: { name: string; total: number }[] }) {
  const max = Math.max(...data.map((d) => d.total), 1);
  // Y-axis ticks (5 labels from max to 0)
  const ticks = [max, max * 0.75, max * 0.5, max * 0.25, 0];
  
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="relative flex-1 flex h-[280px]">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between text-[10px] md:text-xs text-muted-foreground pr-3 h-[255px] text-right w-12 select-none font-mono">
          {ticks.map((tick, i) => (
            <span key={i}>₹{Math.round(tick / 1000)}K</span>
          ))}
        </div>
        
        {/* Grid and Bars Area */}
        <div className="relative flex-1 h-[255px] border-b border-border/40 pb-1">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {ticks.map((_, i) => (
              <div key={i} className="border-t border-border/10 w-full h-0" />
            ))}
          </div>
          
          {/* Bars Container */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-between px-2">
            {data.map((item, index) => {
              const percentage = (item.total / max) * 100;
              return (
                <div key={index} className="group relative flex flex-col items-center flex-1 mx-0.5 md:mx-1 h-full justify-end z-10">
                  {/* Custom CSS Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
                    <div className="bg-popover text-popover-foreground text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md shadow-md border border-border whitespace-nowrap">
                      ₹{item.total.toLocaleString()}
                    </div>
                    <div className="w-1.5 h-1.5 bg-popover border-r border-b border-border rotate-45 -mt-1" />
                  </div>
                  
                  {/* Bar Div */}
                  <div 
                    style={{ height: `${percentage}%` }}
                    className="w-full max-w-[28px] bg-primary rounded-t-[4px] transition-all duration-300 hover:bg-primary/80 cursor-pointer shadow-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between text-[10px] md:text-xs text-muted-foreground pt-2 pl-[60px] select-none font-mono">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center mx-0.5 md:mx-1 max-w-[28px]">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  const [notificationFilter, setNotificationFilter] = useState("all");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);

  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      title: "New High-Value Lead Registered",
      description: "Priya Sharma registered interest in 4 BHK Villa - Jubilee Hills (₹5.2 Cr).",
      time: "2 mins ago",
      type: "lead",
      unread: true,
    },
    {
      id: 2,
      title: "Site Visit Scheduled",
      description: "Arjun Mehta requested a site visit for 3 BHK Gachibowli Flat tomorrow at 11:30 AM.",
      time: "25 mins ago",
      type: "visit",
      unread: true,
    },
    {
      id: 3,
      title: "Commission Disbursed",
      description: "Payment of ₹1.8 Lakhs for Madhusudha Meadows unit #213B received.",
      time: "2 hours ago",
      type: "payment",
      unread: false,
    },
    {
      id: 4,
      title: "Agent Target Achieved",
      description: "Sneha Rao crossed 100% of her monthly sales target (₹15 Cr).",
      time: "Yesterday",
      type: "milestone",
      unread: false,
    },
    {
      id: 5,
      title: "Agreement Draft Pending",
      description: "Draft Sale Agreement is pending review for buyer Rajesh Patel.",
      time: "2 days ago",
      type: "document",
      unread: false,
    },
  ]);

  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setReportProgress(0);
    const interval = setInterval(() => {
      setReportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setGeneratingReport(false);
            setNotificationsList(prevList => [
              {
                id: Date.now(),
                title: "Report Generated Successfully",
                description: "Your requested Q2 Lead & Inventory Report is ready to download in the center.",
                time: "Just now",
                type: "success",
                unread: true,
              },
              ...prevList
            ]);
            // Automatically switch tab to notifications to show the creative link!
            setActiveTab("notifications");
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex-1 space-y-4 md:space-y-6">
      
      {/* Header Greeting */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, Admin 👋. Here is an overview of your real estate business.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-9" onClick={() => setActiveTab("reports")}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button size="sm" className="h-9 gap-1 cursor-pointer">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-md">Analytics</TabsTrigger>
          <TabsTrigger value="reports" className="rounded-md">Reports</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-md">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 md:space-y-6">
          
          {/* Metrics Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-all duration-300 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Commission Generated</CardTitle>
                <IndianRupee className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹48.2 Lakhs</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-emerald-500 flex items-center mr-1 font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
                  </span>
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
                <Home className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">148</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-blue-500 flex items-center mr-1 font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" /> +8.2%
                  </span>
                  new properties
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,280</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-amber-500 flex items-center mr-1 font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" /> +18.4%
                  </span>
                  new inquiries
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border-border/40">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Agents</CardTitle>
                <Building className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-violet-500 flex items-center mr-1 font-medium">
                    +4 online
                  </span>
                  right now
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Main Chart */}
            <Card className="col-span-full lg:col-span-4 border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Sales and Revenue projections for this year.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[320px] w-full">
                  {mounted ? (
                    <SimpleBarChart data={overviewData} />
                  ) : (
                    <div className="h-full w-full bg-muted/50 animate-pulse rounded-lg flex items-center justify-center">
                      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Sales/Leads */}
            <Card className="col-span-full lg:col-span-3 border-border/40 shadow-sm flex flex-col w-full">
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>
                  You received 12 new leads this week.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto w-full">
                <div className="space-y-6">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={lead.avatar} alt="Avatar" />
                        <AvatarFallback>{lead.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold leading-none truncate max-w-[120px]">
                            {lead.name}
                          </p>
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${lead.statusColor}`}>
                            {lead.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {lead.email}
                        </p>
                        <p className="text-[11px] font-medium text-foreground/80 truncate mt-1">
                          Interest: {lead.property}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-2 shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground rounded-full hover:bg-muted">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Projects Bottom Section */}
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Featured Projects</CardTitle>
                <CardDescription>Track the inventory status of top selling projects.</CardDescription>
              </div>
              <Button variant="ghost" className="text-sm">
                View All <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredListings.map((listing) => (
                  <div key={listing.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border bg-card hover:bg-accent/30 transition-colors">
                    <div className="relative h-24 w-full sm:w-32 rounded-lg overflow-hidden shrink-0">
                      <img src={listing.image} alt={listing.title} className="object-cover h-full w-full hover:scale-105 transition-transform duration-500" />
                      <Badge className="absolute top-2 right-2 text-[10px] bg-background/80 backdrop-blur-md text-foreground border-none">
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-base leading-tight">{listing.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Target className="h-3 w-3" /> {listing.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-primary text-sm">{listing.price}</span>
                        </div>
                      </div>
                      <div className="space-y-1 mt-auto pt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Inventory Sold</span>
                          <span className="font-medium">{Math.round(((listing.totalUnits - listing.units) / listing.totalUnits) * 100)}%</span>
                        </div>
                        <Progress value={((listing.totalUnits - listing.units) / listing.totalUnits) * 100} className="h-1.5" />
                        <p className="text-[10px] text-muted-foreground text-right mt-1">
                          {listing.units} units remaining out of {listing.totalUnits}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Conversion Funnel */}
            <Card className="col-span-full lg:col-span-4 glass-card border-border/40 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-500" />
                    Lead Conversion Funnel
                  </CardTitle>
                  <CardDescription>Visualizing customer journey progression.</CardDescription>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold font-mono">
                  2.6% Conv. Rate
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="space-y-4">
                  {[
                    { stage: "Total Inquiries / Marketing Leads", count: 1280, pct: "100%", color: "bg-indigo-500" },
                    { stage: "Qualified Leads (Contacted)", count: 840, pct: "65.6%", color: "bg-blue-500" },
                    { stage: "Site Visits Scheduled", count: 420, pct: "32.8%", color: "bg-violet-500" },
                    { stage: "Negotiations & Offers", count: 112, pct: "8.7%", color: "bg-amber-500" },
                    { stage: "Successful Deal Closures", count: 34, pct: "2.6%", color: "bg-emerald-500" }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-foreground flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-border" />
                          {item.stage}
                        </span>
                        <span className="text-muted-foreground font-mono">{item.count} <span className="text-[10px] text-muted-foreground/60">({item.pct})</span></span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-3 overflow-hidden border border-border/20">
                        <div className={cn("h-full rounded-full transition-all duration-700 shadow-inner", item.color)} style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inventory Distribution */}
            <Card className="col-span-full lg:col-span-3 glass-card border-border/40 shadow-sm flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-indigo-500" />
                  Listings Breakdown
                </CardTitle>
                <CardDescription>Distribution across property classes.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pt-2">
                <div className="flex items-center justify-center py-6">
                  <div className="relative h-36 w-36 rounded-full border-[10px] border-indigo-500/10 flex items-center justify-center shadow-lg bg-background/5 backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-full border-[10px] border-t-indigo-500 border-r-emerald-500 border-b-amber-500 border-l-rose-500 animate-spin-slow opacity-85" style={{ animationDuration: '20s' }} />
                    <div className="text-center z-10">
                      <span className="text-3xl font-extrabold text-foreground tracking-tight">148</span>
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold mt-0.5">Properties</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs bg-muted/10 p-3 rounded-lg border border-border/20">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-sm" />
                    <span className="text-muted-foreground font-medium">Villas (45%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm" />
                    <span className="text-muted-foreground font-medium">Flats (30%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500 shadow-sm" />
                    <span className="text-muted-foreground font-medium">Plots (15%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-sm" />
                    <span className="text-muted-foreground font-medium">Retail (10%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Leaderboard */}
            <Card className="col-span-full lg:col-span-3 glass-card border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  Top Agents
                </CardTitle>
                <CardDescription>Sales target achievement metrics.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                {[
                  { name: "Amit Verma", sales: "₹18.4 Cr", target: "₹20 Cr", pct: 92, avatar: "https://i.pravatar.cc/150?u=amit", rank: 1 },
                  { name: "Sneha Rao", sales: "₹15.2 Cr", target: "₹15 Cr", pct: 101, avatar: "https://i.pravatar.cc/150?u=sneha", rank: 2 },
                  { name: "Rohan Das", sales: "₹9.8 Cr", target: "₹12 Cr", pct: 81, avatar: "https://i.pravatar.cc/150?u=rohan", rank: 3 }
                ].map((agent, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border/30 bg-background/25 hover:bg-background/40 transition-colors shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-9 w-9 border border-border">
                          <AvatarImage src={agent.avatar} />
                          <AvatarFallback className="font-bold">{agent.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-extrabold text-white shadow-sm">
                          {agent.rank}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{agent.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Sales: <span className="font-semibold text-foreground">{agent.sales}</span> / Goal: {agent.target}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="text-xs font-bold font-mono text-foreground">{agent.pct}%</span>
                      <Progress value={Math.min(agent.pct, 100)} className="h-1 w-16" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Trend Mini Graph */}
            <Card className="col-span-full lg:col-span-4 glass-card border-border/40 shadow-sm flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-indigo-500" />
                    Revenue & Deal Volume
                  </CardTitle>
                  <CardDescription>Quarterly growth metrics.</CardDescription>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/20 px-2 py-0.5 rounded border">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end pt-4">
                <div className="flex items-end justify-between h-[160px] gap-2 px-2 border-b pb-1 relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-t border-border/10 w-full h-0" />
                    <div className="border-t border-border/10 w-full h-0" />
                    <div className="border-t border-border/10 w-full h-0" />
                  </div>
                  
                  {revenueData.map((item, idx) => {
                    const maxRev = 70000;
                    const heightPercent = (item.revenue / maxRev) * 100;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center group relative z-10 animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                        <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
                          <div className="bg-popover text-popover-foreground text-[10px] font-semibold px-2 py-1 rounded border shadow-sm">
                            ₹{(item.revenue / 1000).toFixed(1)}L ({item.listings} deals)
                          </div>
                          <div className="w-1.5 h-1.5 bg-popover border-r border-b border-border rotate-45 -mt-1" />
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-background shadow-md hover:scale-125 transition-transform" style={{ marginBottom: `calc(${heightPercent}% - 5px)` }} />
                        <div className="w-1 bg-indigo-500/10 hover:bg-indigo-500/30 rounded-t h-[160px] absolute bottom-0" style={{ height: `${heightPercent}%`, zIndex: -1 }} />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground pt-2 px-1 font-mono">
                  {revenueData.map((item, idx) => (
                    <span key={idx}>{item.month}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Report Generator */}
            <Card className="col-span-full lg:col-span-3 glass-card border-border/40 shadow-sm flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-500" />
                  Report Generator
                </CardTitle>
                <CardDescription>Compile specific business datasets into standard files.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="space-y-2 flex flex-col">
                  <span className="text-xs font-semibold text-muted-foreground">Report Category</span>
                  <select className="w-full text-xs bg-background border border-border p-2 rounded-lg outline-none focus:border-primary">
                    <option>Commissions & Revenue Summary</option>
                    <option>Active Listings & Inventory Rate</option>
                    <option>Lead Capture & Conversion Rates</option>
                    <option>Agent Performance Leaderboard</option>
                  </select>
                </div>
                <div className="space-y-2 flex flex-col">
                  <span className="text-xs font-semibold text-muted-foreground">Date Range</span>
                  <select className="w-full text-xs bg-background border border-border p-2 rounded-lg outline-none focus:border-primary">
                    <option>Current Month (May 2026)</option>
                    <option>Previous Quarter (Q1 2026)</option>
                    <option>Last 6 Months</option>
                    <option>Year to Date (YTD)</option>
                  </select>
                </div>
                <div className="space-y-2 flex flex-col">
                  <span className="text-xs font-semibold text-muted-foreground">Format</span>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="text-xs h-9 justify-start gap-2 border-primary/20 bg-primary/5 text-primary">
                      <div className="h-2 w-2 rounded-full bg-primary" /> PDF Document
                    </Button>
                    <Button variant="outline" className="text-xs h-9 justify-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground" /> Excel Sheet
                    </Button>
                  </div>
                </div>

                {generatingReport && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-indigo-500 flex items-center gap-1.5">
                        <RefreshCw className="h-3 w-3 animate-spin" /> Compiling dataset...
                      </span>
                      <span className="font-mono">{reportProgress}%</span>
                    </div>
                    <Progress value={reportProgress} className="h-1.5" />
                  </div>
                )}
              </CardContent>
              <CardContent className="pt-0 border-t border-border/20 mt-4">
                <Button 
                  onClick={handleGenerateReport} 
                  disabled={generatingReport}
                  className="w-full mt-4 h-10 font-semibold cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  {generatingReport ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Build Custom Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Downloadable Archives */}
            <Card className="col-span-full lg:col-span-4 glass-card border-border/40 shadow-sm flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderDown className="h-5 w-5 text-indigo-500" />
                  Download Center
                </CardTitle>
                <CardDescription>Access compiled and archived business reports.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto max-h-[360px] scrollbar-thin">
                <div className="space-y-3 pr-1">
                  {[
                    { title: "Q1 Financial & Commission Report", size: "3.2 MB", date: "April 15, 2026", type: "PDF" },
                    { title: "Kokapet Projects Inventory Audit", size: "1.8 MB", date: "May 10, 2026", type: "PDF" },
                    { title: "Active Inquiries & Client Briefs", size: "640 KB", date: "May 24, 2026", type: "EXCEL" },
                    { title: "Agent Lead Conversion Metrics Q1", size: "2.4 MB", date: "April 02, 2026", type: "PDF" }
                  ].map((report, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-border/30 bg-background/25 hover:bg-background/40 transition-colors shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0">
                          {report.type}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-foreground leading-snug">{report.title}</h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{report.date} • {report.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 gap-1 border-primary/20 text-primary hover:bg-primary/5">
                        <Download className="h-3.5 w-3.5" /> Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 md:space-y-6">
          <Card className="glass-card border-border/40 shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-indigo-500 animate-bounce" style={{ animationDuration: '3s' }} />
                  Notification Center
                </CardTitle>
                <CardDescription>Real-time system events, actions, and priority tasks.</CardDescription>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { label: "All", value: "all" },
                  { label: "Unread", value: "unread" },
                  { label: "Payments", value: "payment" },
                  { label: "Leads & Visits", value: "lead-visit" }
                ].map((pill) => (
                  <Button 
                    key={pill.value}
                    variant={notificationFilter === pill.value ? "default" : "outline"} 
                    size="sm"
                    className="h-7 px-2.5 text-[11px] rounded-full font-medium"
                    onClick={() => setNotificationFilter(pill.value)}
                  >
                    {pill.label}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3.5">
                {notificationsList
                  .filter(notif => {
                    if (notificationFilter === "unread") return notif.unread;
                    if (notificationFilter === "payment") return notif.type === "payment";
                    if (notificationFilter === "lead-visit") return notif.type === "lead" || notif.type === "visit";
                    return true;
                  })
                  .map((notif) => {
                    const iconStyle: Record<string, { icon: React.ReactNode, class: string }> = {
                      lead: { 
                        icon: <Users className="h-4 w-4" />, 
                        class: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" 
                      },
                      visit: { 
                        icon: <Calendar className="h-4 w-4" />, 
                        class: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" 
                      },
                      payment: { 
                        icon: <IndianRupee className="h-4 w-4" />, 
                        class: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                      },
                      milestone: { 
                        icon: <Sparkles className="h-4 w-4" />, 
                        class: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" 
                      },
                      document: { 
                        icon: <FileText className="h-4 w-4" />, 
                        class: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20" 
                      },
                      success: { 
                        icon: <CheckCircle2 className="h-4 w-4" />, 
                        class: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                      }
                    };
                    const styling = iconStyle[notif.type] || iconStyle.success;
                    return (
                      <div 
                        key={notif.id} 
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl border transition-all shadow-sm",
                          notif.unread 
                            ? "bg-indigo-500/5 border-indigo-500/20" 
                            : "bg-background/25 border-border/30 hover:bg-background/40"
                        )}
                      >
                        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center border shrink-0", styling.class)}>
                          {styling.icon}
                        </div>
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4">
                            <h4 className="text-xs font-semibold text-foreground truncate">{notif.title}</h4>
                            <span className="text-[10px] text-muted-foreground/80 shrink-0 flex items-center gap-1 font-mono">
                              <Clock className="h-3 w-3" /> {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-normal">{notif.description}</p>
                        </div>
                        {notif.unread && (
                          <span className="h-2 w-2 rounded-full bg-indigo-500 self-center shrink-0 shadow-sm animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                
                {notificationsList.filter(notif => {
                  if (notificationFilter === "unread") return notif.unread;
                  if (notificationFilter === "payment") return notif.type === "payment";
                  if (notificationFilter === "lead-visit") return notif.type === "lead" || notif.type === "visit";
                  return true;
                }).length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl border-border/50 bg-background/10">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-3 animate-pulse" />
                    <p className="text-sm font-semibold text-foreground">No alerts found</p>
                    <p className="text-xs text-muted-foreground mt-1">There are no updates matching the filter criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center p-12 bg-transparent">
        <div className="h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
