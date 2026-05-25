// ─── Customer Types ──────────────────────────────────────────────────────────
export type CustomerType = "Buyer" | "Seller/Owner" | "Tenant" | "Investor";
export type CustomerStatus =
  | "Active Inquiry"
  | "Property Visits"
  | "Closing Stages"
  | "Active Lease"
  | "Completed Deal";

export interface CustomerMilestone {
  title: string;
  date: string;
  description: string;
  completed: boolean;
}

export interface CustomerDocument {
  name: string;
  size: string;
  type: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  type: CustomerType;
  status: CustomerStatus;
  budgetPreference: string;       // e.g. "₹2.5 Cr - ₹3 Cr"
  preferredLocations: string[];
  propertyPreference: string;     // e.g. "4 BHK Luxury Villa"
  assignedAgent: string;
  agentAvatar: string;
  totalDealsValue: string;        // e.g. "₹4.5 Cr"
  satisfactionScore: number;      // e.g. 4.9
  joinedDate: string;
  lastContacted: string;
  milestones: CustomerMilestone[];
  documents: CustomerDocument[];
  notes: string;
}

// ─── Segments configuration ──────────────────────────────────────────────────
export const CUSTOMER_TYPES: {
  type: CustomerType;
  label: string;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    type: "Buyer",
    label: "Active Buyer",
    color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
  },
  {
    type: "Seller/Owner",
    label: "Property Owner",
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    type: "Tenant",
    label: "Tenant",
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    type: "Investor",
    label: "VIP Investor",
    color: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
  },
];

// ─── Status configuration ────────────────────────────────────────────────────
export const CUSTOMER_STATUSES: {
  status: CustomerStatus;
  label: string;
  color: string;
}[] = [
  { status: "Active Inquiry", label: "Active Inquiry", color: "bg-slate-500" },
  { status: "Property Visits", label: "Property Visits", color: "bg-blue-500" },
  { status: "Closing Stages", label: "Closing Stages", color: "bg-amber-500" },
  { status: "Active Lease", label: "Active Lease", color: "bg-violet-500" },
  { status: "Completed Deal", label: "Completed Deal", color: "bg-emerald-500" },
];

// ─── Mock Data ───────────────────────────────────────────────────────────────
export const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Vikram Malhotra",
    email: "vikram.malhotra@malhotragroup.in",
    phone: "+91 99112 88440",
    avatar: "https://i.pravatar.cc/150?u=vikramm",
    type: "Investor",
    status: "Property Visits",
    budgetPreference: "₹12 Cr - ₹15 Cr",
    preferredLocations: ["Jubilee Hills", "Gachibowli", "Kokapet"],
    propertyPreference: "Premium Commercial Outlets / Land Parcels",
    assignedAgent: "Sneha Rao",
    agentAvatar: "https://i.pravatar.cc/150?u=sneha",
    totalDealsValue: "₹28.4 Cr",
    satisfactionScore: 4.9,
    joinedDate: "Jan 12, 2025",
    lastContacted: "3 hours ago",
    milestones: [
      { title: "KYC Verified", date: "Jan 15, 2025", description: "All corporate credentials and PAN details verified.", completed: true },
      { title: "Portfolio Presentation", date: "Jan 28, 2025", description: "Presented Hyderabad tech park retail spaces.", completed: true },
      { title: "Site Tour Completed", date: "Feb 10, 2025", description: "Visited Kokapet land plot & Gachibowli commercial center.", completed: true },
      { title: "Token Amount & Term Sheet", date: "Pending", description: "Awaiting approval on commercial lease rates.", completed: false },
    ],
    documents: [
      { name: "Corporate_KYC_Malhotra.pdf", size: "2.4 MB", type: "PDF" },
      { name: "Financial_PreApproval_Letter.pdf", size: "1.8 MB", type: "PDF" },
      { name: "Kokapet_Plot_Proposal.pdf", size: "4.2 MB", type: "PDF" },
    ],
    notes: "High net worth individual looking to deploy capital in high-yield commercial properties. Prefers corner plots and wide road frontage.",
  },
  {
    id: "cust-2",
    name: "Ananya Deshmukh",
    email: "ananya.d@outlook.com",
    phone: "+91 88005 32112",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    type: "Buyer",
    status: "Closing Stages",
    budgetPreference: "₹3.5 Cr - ₹4.2 Cr",
    preferredLocations: ["Nanakramguda", "Kokapet"],
    propertyPreference: "3 BHK Premium Gated Apartment",
    assignedAgent: "Amit Verma",
    agentAvatar: "https://i.pravatar.cc/150?u=amit",
    totalDealsValue: "₹3.8 Cr",
    satisfactionScore: 4.8,
    joinedDate: "Feb 02, 2025",
    lastContacted: "1 hour ago",
    milestones: [
      { title: "Site Visit 1", date: "Feb 05, 2025", description: "Visited Prestige High Fields & Boulder Hills.", completed: true },
      { title: "Unit Selected", date: "Feb 15, 2025", description: "Selected flat 1804 at Prestige Heights.", completed: true },
      { title: "Loan Sanctioned", date: "Feb 22, 2025", description: "HDFC Home Loan sanctioned successfully.", completed: true },
      { title: "Agreement Signing", date: "May 28, 2026", description: "Scheduled builder-buyer agreement signing.", completed: false },
    ],
    documents: [
      { name: "Agreement_Draft_Prestige_1804.pdf", size: "5.1 MB", type: "PDF" },
      { name: "HDFC_Loan_Sanction_Letter.pdf", size: "950 KB", type: "PDF" },
    ],
    notes: "Looking for an apartment with double-height balcony and uninterrupted view. Prefers a project with extensive sporting amenities.",
  },
  {
    id: "cust-3",
    name: "Ramesh Kulkarni",
    email: "ramesh.kulkarni@gmail.com",
    phone: "+91 91102 77456",
    avatar: "https://i.pravatar.cc/150?u=rameshk",
    type: "Seller/Owner",
    status: "Completed Deal",
    budgetPreference: "Selling: ₹5.5 Cr",
    preferredLocations: ["Madhapur"],
    propertyPreference: "Commercial Building (Ground+3)",
    assignedAgent: "Rohan Das",
    agentAvatar: "https://i.pravatar.cc/150?u=rohan",
    totalDealsValue: "₹5.3 Cr",
    satisfactionScore: 4.7,
    joinedDate: "Nov 10, 2024",
    lastContacted: "2 days ago",
    milestones: [
      { title: "Property Listed", date: "Nov 12, 2024", description: "Listed property on top portals and internal CRM.", completed: true },
      { title: "Site Inspections", date: "Dec - Jan 2025", description: "Conducted 12 client visits.", completed: true },
      { title: "Final Bid Accepted", date: "Feb 18, 2025", description: "Accepted offer from Vertex Corp.", completed: true },
      { title: "Registration & Handover", date: "Mar 05, 2025", description: "Registration completed at Sub-registrar office, Madhapur.", completed: true },
    ],
    documents: [
      { name: "Sale_Deed_Registered_Madhapur.pdf", size: "8.7 MB", type: "PDF" },
      { name: "Encumbrance_Certificate.pdf", size: "1.2 MB", type: "PDF" },
    ],
    notes: "Owner of a prime commercial property. Deal closed smoothly. Expressed interest in listing another residential villa for sale soon.",
  },
  {
    id: "cust-4",
    name: "Shalini Sen",
    email: "shalini.sen@wipro.com",
    phone: "+91 98402 11002",
    avatar: "https://i.pravatar.cc/150?u=shalini",
    type: "Tenant",
    status: "Active Lease",
    budgetPreference: "Rent: ₹75K - ₹85K / mo",
    preferredLocations: ["Gachibowli", "Financial District"],
    propertyPreference: "Fully Furnished 3 BHK Flat",
    assignedAgent: "Amit Verma",
    agentAvatar: "https://i.pravatar.cc/150?u=amit",
    totalDealsValue: "₹9.6 L (Annual Lease)",
    satisfactionScore: 4.6,
    joinedDate: "Mar 15, 2025",
    lastContacted: "5 days ago",
    milestones: [
      { title: "Profile Evaluation", date: "Mar 18, 2025", description: "Wipro employment and background verified.", completed: true },
      { title: "Lease Finalized", date: "Mar 22, 2025", description: "Signed 11-month lease agreement.", completed: true },
      { title: "Move-in Check", date: "Apr 01, 2025", description: "Asset inventory list checked and key handover completed.", completed: true },
    ],
    documents: [
      { name: "Lease_Agreement_Shalini.pdf", size: "1.4 MB", type: "PDF" },
      { name: "Inventory_Report_Furnishing.pdf", size: "3.5 MB", type: "PDF" },
    ],
    notes: "Requires regular air conditioning servicing. Smooth tenant with prompt automated monthly rent payments.",
  },
  {
    id: "cust-5",
    name: "Devendra Singhania",
    email: "d.singhania@singhaniaestates.com",
    phone: "+91 90001 00044",
    avatar: "https://i.pravatar.cc/150?u=devendra",
    type: "Investor",
    status: "Active Inquiry",
    budgetPreference: "₹20 Cr - ₹25 Cr",
    preferredLocations: ["HITEC City", "Gachibowli"],
    propertyPreference: "Premium Co-working space or IT Park floor",
    assignedAgent: "Sneha Rao",
    agentAvatar: "https://i.pravatar.cc/150?u=sneha",
    totalDealsValue: "₹0.0 Cr",
    satisfactionScore: 5.0,
    joinedDate: "May 10, 2026",
    lastContacted: "10 mins ago",
    milestones: [
      { title: "First Contact", date: "May 12, 2026", description: "Initial call to understand size requirements and yield expectations.", completed: true },
      { title: "Financial Model Presentation", date: "Pending", description: "Calculate pre-rented commercial lease ROI.", completed: false },
    ],
    documents: [
      { name: "CoWorking_Investment_Model.pdf", size: "1.9 MB", type: "PDF" },
    ],
    notes: "Singhania Family Office representative. Target yield is 8.5% minimum. Prefers properties already leased to Fortune 500 tenants.",
  },
];
