export interface Agent {
  id: string;
  name: string;
  role: string;
  specialty: string[];
  avatar: string;
  status: "Active" | "Out of Office" | "On Showing";
  email: string;
  phone: string;
  experience: string;
  metrics: {
    salesVolume: string;
    commissionEarned: string;
    activeListingsCount: number;
    closedDeals: number;
    rating: number;
  };
  monthlySales: { month: string; amount: number }[];
  bio: string;
  activeListingIds: string[];
}

export const mockAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Sneha Rao",
    role: "VP of Luxury Residential Sales",
    specialty: ["Penthouses", "Golf Estates", "Villas"],
    avatar: "https://i.pravatar.cc/150?u=sneha",
    status: "Active",
    email: "sneha.rao@infra.com",
    phone: "+91 98402 11005",
    experience: "8 Years",
    metrics: {
      salesVolume: "₹58.5 Cr",
      commissionEarned: "₹1.17 Cr",
      activeListingsCount: 2,
      closedDeals: 34,
      rating: 4.9,
    },
    monthlySales: [
      { month: "Jan", amount: 4.5 },
      { month: "Feb", amount: 6.2 },
      { month: "Mar", amount: 9.8 },
      { month: "Apr", amount: 12.0 },
      { month: "May", amount: 15.4 },
    ],
    bio: "Sneha is a veteran broker specializing in premium residential real estate across Jubilee Hills and Gachibowli. She has a deep connection with Hyderabad's high-net-worth community and is a master of deal structures.",
    activeListingIds: ["prop-1", "prop-4"],
  },
  {
    id: "agent-2",
    name: "Amit Verma",
    role: "Senior Investment Specialist",
    specialty: ["Gated Plots", "Residential Villas", "Land Deals"],
    avatar: "https://i.pravatar.cc/150?u=amit",
    status: "On Showing",
    email: "amit.verma@infra.com",
    phone: "+91 88005 32112",
    experience: "6 Years",
    metrics: {
      salesVolume: "₹38.2 Cr",
      commissionEarned: "₹76 Lakh",
      activeListingsCount: 2,
      closedDeals: 28,
      rating: 4.8,
    },
    monthlySales: [
      { month: "Jan", amount: 3.1 },
      { month: "Feb", amount: 4.5 },
      { month: "Mar", amount: 5.8 },
      { month: "Apr", amount: 7.2 },
      { month: "May", amount: 9.6 },
    ],
    bio: "Amit focuses on land acquisition and plotted developments in Kokapet and surrounding tech growth corridors. He helps clients build high-growth land portfolios and secure local municipal approvals.",
    activeListingIds: ["prop-2", "prop-5"],
  },
  {
    id: "agent-3",
    name: "Rohan Das",
    role: "Director of Commercial Leasing & Sales",
    specialty: ["Office Space", "Retail Centers", "Boutique Corporate"],
    avatar: "https://i.pravatar.cc/150?u=rohan",
    status: "Active",
    email: "rohan.das@infra.com",
    phone: "+91 91102 77456",
    experience: "10 Years",
    metrics: {
      salesVolume: "₹88.0 Cr",
      commissionEarned: "₹1.76 Cr",
      activeListingsCount: 2,
      closedDeals: 42,
      rating: 4.95,
    },
    monthlySales: [
      { month: "Jan", amount: 8.5 },
      { month: "Feb", amount: 10.2 },
      { month: "Mar", amount: 14.8 },
      { month: "Apr", amount: 19.5 },
      { month: "May", amount: 22.0 },
    ],
    bio: "Rohan drives our commercial transactions across Banjara Hills and Madhapur. His client list includes global MNC IT vendors, premium cafes, and co-working giants. He is an expert in ROI yield analyses.",
    activeListingIds: ["prop-3", "prop-6"],
  },
  {
    id: "agent-4",
    name: "Priyanka Sen",
    role: "Senior Leasing Associate",
    specialty: ["IT Parks", "Shared Spaces", "Boutiques"],
    avatar: "https://i.pravatar.cc/150?u=priyanka",
    status: "Out of Office",
    email: "priyanka.sen@infra.com",
    phone: "+91 97761 22340",
    experience: "4 Years",
    metrics: {
      salesVolume: "₹18.4 Cr",
      commissionEarned: "₹36.8 Lakh",
      activeListingsCount: 0,
      closedDeals: 19,
      rating: 4.7,
    },
    monthlySales: [
      { month: "Jan", amount: 1.5 },
      { month: "Feb", amount: 2.2 },
      { month: "Mar", amount: 3.8 },
      { month: "Apr", amount: 4.1 },
      { month: "May", amount: 4.8 },
    ],
    bio: "Priyanka assists small-to-medium enterprises in finding modular commercial workspaces. Her quick response rates and warm relationships with property landlords make her highly sought after.",
    activeListingIds: [],
  },
  {
    id: "agent-5",
    name: "Arjun Mehta",
    role: "Residential Consultant",
    specialty: ["Budget Apartments", "Gated Communities"],
    avatar: "https://i.pravatar.cc/150?u=arjun",
    status: "Active",
    email: "arjun.mehta@infra.com",
    phone: "+91 76652 99012",
    experience: "3 Years",
    metrics: {
      salesVolume: "₹12.8 Cr",
      commissionEarned: "₹25.6 Lakh",
      activeListingsCount: 0,
      closedDeals: 15,
      rating: 4.65,
    },
    monthlySales: [
      { month: "Jan", amount: 0.8 },
      { month: "Feb", amount: 1.5 },
      { month: "Mar", amount: 2.2 },
      { month: "Apr", amount: 3.5 },
      { month: "May", amount: 4.2 },
    ],
    bio: "Arjun is a high-energy consultant focusing on mid-segment apartment sales in Gachibowli and Kondapur. He has a solid record with first-time homebuyers.",
    activeListingIds: [],
  }
];
