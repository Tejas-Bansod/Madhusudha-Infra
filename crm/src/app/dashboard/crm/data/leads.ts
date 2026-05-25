// ─── Types ────────────────────────────────────────────────────────────────────
export type LeadStage =
  | "New"
  | "Contacted"
  | "Site Visit"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";

export type LeadPriority = "Hot" | "Warm" | "Cold";
export type PropertyType = "Apartment" | "Villa" | "Plot" | "Commercial" | "Penthouse";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  stage: LeadStage;
  priority: LeadPriority;
  propertyType: PropertyType;
  budget: string;            // e.g. "₹85 L"
  location: string;
  source: string;            // e.g. "Referral", "Website", "Walk-in"
  agent: string;
  agentAvatar: string;
  createdAt: string;         // ISO date string
  lastActivity: string;      // human-readable e.g. "2 hours ago"
  notes: string;
  requirements: string;
}

// ─── Kanban column definitions ────────────────────────────────────────────────
export const LEAD_STAGES: {
  stage: LeadStage;
  label: string;
  color: string;
  accentBorder: string;
  bg: string;
}[] = [
  {
    stage: "New",
    label: "New",
    color: "bg-slate-500",
    accentBorder: "border-t-slate-500",
    bg: "bg-slate-500/10",
  },
  {
    stage: "Contacted",
    label: "Contacted",
    color: "bg-blue-500",
    accentBorder: "border-t-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    stage: "Site Visit",
    label: "Site Visit",
    color: "bg-violet-500",
    accentBorder: "border-t-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    stage: "Negotiation",
    label: "Negotiation",
    color: "bg-amber-500",
    accentBorder: "border-t-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    stage: "Closed Won",
    label: "Won",
    color: "bg-emerald-500",
    accentBorder: "border-t-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    stage: "Closed Lost",
    label: "Lost",
    color: "bg-rose-500",
    accentBorder: "border-t-rose-500",
    bg: "bg-rose-500/10",
  },
];

// ─── Mock data ────────────────────────────────────────────────────────────────
export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 98400 11234",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    stage: "New",
    priority: "Hot",
    propertyType: "Apartment",
    budget: "₹1.2 Cr",
    location: "Gachibowli, Hyderabad",
    source: "Website",
    agent: "Amit Verma",
    agentAvatar: "https://i.pravatar.cc/150?u=amit",
    createdAt: "2026-05-20T09:00:00Z",
    lastActivity: "2 hours ago",
    notes: "Interested in 3 BHK facing east. Pre-approved home loan.",
    requirements: "3 BHK Apartment, East-facing, gated community",
  },
  {
    id: "lead-2",
    name: "Priya Sharma",
    email: "priya.sharma@yahoo.com",
    phone: "+91 88002 45678",
    avatar: "https://i.pravatar.cc/150?u=priya",
    stage: "Site Visit",
    priority: "Hot",
    propertyType: "Villa",
    budget: "₹5.2 Cr",
    location: "Jubilee Hills, Hyderabad",
    source: "Referral",
    agent: "Sneha Rao",
    agentAvatar: "https://i.pravatar.cc/150?u=sneha",
    createdAt: "2026-05-18T11:30:00Z",
    lastActivity: "25 min ago",
    notes: "Referred by existing client Vikram Reddy. Looking for villa with pool.",
    requirements: "4 BHK Villa, swimming pool, near international school",
  },
  {
    id: "lead-3",
    name: "Rajesh Patel",
    email: "rajesh.patel@outlook.com",
    phone: "+91 70001 89012",
    avatar: "https://i.pravatar.cc/150?u=rajesh",
    stage: "Negotiation",
    priority: "Warm",
    propertyType: "Apartment",
    budget: "₹68 L",
    location: "Kondapur, Hyderabad",
    source: "Walk-in",
    agent: "Rohan Das",
    agentAvatar: "https://i.pravatar.cc/150?u=rohan",
    createdAt: "2026-05-15T14:00:00Z",
    lastActivity: "1 day ago",
    notes: "Negotiating on 2 BHK flat. Expecting 3% discount.",
    requirements: "2 BHK Flat, below 5th floor, parking mandatory",
  },
  {
    id: "lead-4",
    name: "Neha Reddy",
    email: "neha.reddy@gmail.com",
    phone: "+91 99001 56789",
    avatar: "https://i.pravatar.cc/150?u=neha",
    stage: "Contacted",
    priority: "Hot",
    propertyType: "Plot",
    budget: "₹45 L",
    location: "Kokapet, Hyderabad",
    source: "Social Media",
    agent: "Amit Verma",
    agentAvatar: "https://i.pravatar.cc/150?u=amit",
    createdAt: "2026-05-22T08:15:00Z",
    lastActivity: "3 hours ago",
    notes: "Looking to invest in residential plot. Budget flexible.",
    requirements: "200 sq yd residential plot, GHMC approved layout",
  },
  {
    id: "lead-5",
    name: "Kiran Kumar",
    email: "kiran.kumar@infosys.com",
    phone: "+91 78902 34567",
    avatar: "https://i.pravatar.cc/150?u=kiran",
    stage: "Closed Won",
    priority: "Hot",
    propertyType: "Apartment",
    budget: "₹95 L",
    location: "Madhapur, Hyderabad",
    source: "Corporate",
    agent: "Sneha Rao",
    agentAvatar: "https://i.pravatar.cc/150?u=sneha",
    createdAt: "2026-05-10T10:00:00Z",
    lastActivity: "5 days ago",
    notes: "Deal closed. Agreement signed. Possession in June 2026.",
    requirements: "3 BHK in tech corridor, walkable to office",
  },
  {
    id: "lead-6",
    name: "Sunita Joshi",
    email: "sunita.joshi@hotmail.com",
    phone: "+91 91234 56780",
    avatar: "https://i.pravatar.cc/150?u=sunita",
    stage: "Closed Lost",
    priority: "Cold",
    propertyType: "Villa",
    budget: "₹3.5 Cr",
    location: "Banjara Hills, Hyderabad",
    source: "Website",
    agent: "Rohan Das",
    agentAvatar: "https://i.pravatar.cc/150?u=rohan",
    createdAt: "2026-05-05T16:00:00Z",
    lastActivity: "10 days ago",
    notes: "Lost to competitor. Bought from ABC Builders.",
    requirements: "Independent villa, 4 BHK, home theatre",
  },
  {
    id: "lead-7",
    name: "Aditya Nair",
    email: "aditya.nair@techm.com",
    phone: "+91 85001 23456",
    avatar: "https://i.pravatar.cc/150?u=aditya",
    stage: "New",
    priority: "Warm",
    propertyType: "Commercial",
    budget: "₹2.8 Cr",
    location: "HITEC City, Hyderabad",
    source: "LinkedIn",
    agent: "Amit Verma",
    agentAvatar: "https://i.pravatar.cc/150?u=amit",
    createdAt: "2026-05-24T09:30:00Z",
    lastActivity: "30 min ago",
    notes: "Expanding startup, looking for 3000 sqft office space.",
    requirements: "3000 sqft commercial space, ground floor preferred",
  },
  {
    id: "lead-8",
    name: "Meera Singh",
    email: "meera.singh@gmail.com",
    phone: "+91 77890 12345",
    avatar: "https://i.pravatar.cc/150?u=meera",
    stage: "Contacted",
    priority: "Warm",
    propertyType: "Penthouse",
    budget: "₹8 Cr",
    location: "Jubilee Hills, Hyderabad",
    source: "Referral",
    agent: "Sneha Rao",
    agentAvatar: "https://i.pravatar.cc/150?u=sneha",
    createdAt: "2026-05-21T13:00:00Z",
    lastActivity: "1 hour ago",
    notes: "NRI investor. Interested in luxury penthouse. Visiting next month.",
    requirements: "Penthouse, 360° city view, private terrace, smart home",
  },
  {
    id: "lead-9",
    name: "Vikram Gupta",
    email: "vikram.gupta@wipro.com",
    phone: "+91 96780 23456",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    stage: "Site Visit",
    priority: "Warm",
    propertyType: "Apartment",
    budget: "₹72 L",
    location: "Narsingi, Hyderabad",
    source: "Website",
    agent: "Rohan Das",
    agentAvatar: "https://i.pravatar.cc/150?u=rohan",
    createdAt: "2026-05-19T11:00:00Z",
    lastActivity: "4 hours ago",
    notes: "Site visit scheduled for this Saturday. Interested in amenities.",
    requirements: "3 BHK, gym, clubhouse, good school nearby",
  },
  {
    id: "lead-10",
    name: "Pooja Verma",
    email: "pooja.verma@gmail.com",
    phone: "+91 80012 34567",
    avatar: "https://i.pravatar.cc/150?u=pooja",
    stage: "Negotiation",
    priority: "Cold",
    propertyType: "Plot",
    budget: "₹25 L",
    location: "Shadnagar, Hyderabad",
    source: "Walk-in",
    agent: "Amit Verma",
    agentAvatar: "https://i.pravatar.cc/150?u=amit",
    createdAt: "2026-05-12T15:30:00Z",
    lastActivity: "3 days ago",
    notes: "Looking for small plot for future home construction.",
    requirements: "100 sq yd plot, NA approved",
  },
];
