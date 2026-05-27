// ─── Property Types ──────────────────────────────────────────────────────────
export type PropertyType = "Apartment" | "Villa" | "Plot" | "Commercial" | "Penthouse";
export type ListingStatus = "Available" | "Under Offer" | "Reserved" | "Sold";

export interface PropertyListing {
  id: string;
  title: string;
  price: string;               // e.g. "₹4.2 Cr"
  priceNumeric: number;        // in Rupees (e.g. 42000000) for numeric filters
  bhk: number;
  sqft: number;
  pricePerSqft: number;
  type: PropertyType;
  status: ListingStatus;
  location: string;            // e.g. "Kokapet, Hyderabad"
  facing: "East" | "West" | "North" | "South";
  bedrooms: number;
  bathrooms: number;
  parkings: number;
  amenities: string[];
  agentName: string;
  agentAvatar: string;
  agentPhone: string;
  description: string;
  yearBuilt: number;
  roi: string;                 // Rental Yield ROI e.g. "5.8%" or "8.2%"
  lat: number;                 // Geographic latitude (default: Hyderabad ~17.42)
  lng: number;                 // Geographic longitude (default: Hyderabad ~78.37)
  image?: string;              // Pexels image URL
  googleMapsUrl?: string;      // Google Maps share link for "Open in Google Maps" button
  address?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
}

export const PROPERTY_TYPES: {
  type: PropertyType;
  label: string;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    type: "Apartment",
    label: "Apartment",
    color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
  },
  {
    type: "Villa",
    label: "Luxury Villa",
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    type: "Penthouse",
    label: "Penthouse",
    color: "text-rose-600 dark:text-rose-400 bg-rose-500/10",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
  },
  {
    type: "Commercial",
    label: "Commercial Space",
    color: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
  {
    type: "Plot",
    label: "Residential Plot",
    color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
];

export const LISTING_STATUSES: {
  status: ListingStatus;
  label: string;
  bg: string;
  text: string;
}[] = [
  { status: "Available", label: "Available", bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { status: "Under Offer", label: "Under Offer", bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { status: "Reserved", label: "Reserved", bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { status: "Sold", label: "Sold", bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400 border-rose-500/20" },
];

export const mockListings: PropertyListing[] = [
  {
    id: "prop-1",
    title: "Prestige High Line Penthouse",
    price: "₹8.2 Cr",
    priceNumeric: 82000000,
    bhk: 4,
    sqft: 4800,
    pricePerSqft: 17083,
    type: "Penthouse",
    status: "Available",
    location: "Jubilee Hills, Hyderabad",
    facing: "East",
    bedrooms: 4,
    bathrooms: 5,
    parkings: 3,
    amenities: ["Private Terrace", "Plunge Pool", "Home Automation", "Concierge Service", "Glass Facade Room"],
    agentName: "Sneha Rao",
    agentAvatar: "https://i.pravatar.cc/150?u=sneha",
    agentPhone: "+91 98402 11005",
    description: "Experience sky-high luxury at Jubilee Hills. This double-height ceiling penthouse features a 360-degree panoramic view of KBR Park and the central city skyline, equipped with automated glass doors and an Italian marble master bath.",
    yearBuilt: 2024,
    roi: "5.4%",
    lat: 17.4300,
    lng: 78.4000,
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800",
    googleMapsUrl: "https://maps.google.com/?q=Jubilee+Hills,+Hyderabad",
  },
  {
    id: "prop-2",
    title: "Boulder Hills Golf View Villa",
    price: "₹5.8 Cr",
    priceNumeric: 58000000,
    bhk: 4,
    sqft: 4200,
    pricePerSqft: 13809,
    type: "Villa",
    status: "Under Offer",
    location: "Gachibowli, Hyderabad",
    facing: "West",
    bedrooms: 4,
    bathrooms: 4,
    parkings: 2,
    amenities: ["Golf Course View", "Modular Kitchen", "Solar Water Heating", "Private Lawn", "Gated Security"],
    agentName: "Amit Verma",
    agentAvatar: "https://i.pravatar.cc/150?u=amit",
    agentPhone: "+91 88005 32112",
    description: "An elegant independent villa bordering the championship golf course in Boulder Hills. Features custom landscaping, wrap-around patios, modular German kitchen fitting, and triple height lobby entry.",
    yearBuilt: 2023,
    roi: "4.8%",
    lat: 17.4350,
    lng: 78.3450,
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    googleMapsUrl: "https://maps.google.com/?q=Gachibowli,+Hyderabad",
  },
  {
    id: "prop-3",
    title: "Vertex Prime Commercial Center",
    price: "₹12.5 Cr",
    priceNumeric: 125000000,
    bhk: 0,
    sqft: 8500,
    pricePerSqft: 14705,
    type: "Commercial",
    status: "Available",
    location: "Madhapur, Hyderabad",
    facing: "North",
    bedrooms: 0,
    bathrooms: 6,
    parkings: 5,
    amenities: ["100% Power Backup", "Dedicated Escalators", "Central Air Conditioning", "Grand Double-Height Foyer", "Pre-leased Options"],
    agentName: "Rohan Das",
    agentAvatar: "https://i.pravatar.cc/150?u=rohan",
    agentPhone: "+91 91102 77456",
    description: "Grade-A office and retail commercial hub located in the heart of the Madhapur tech corridor. Ideal for IT companies or retail flagship stores seeking high-volume foot traffic and excellent brand exposure.",
    yearBuilt: 2025,
    roi: "8.2%",
    lat: 17.4480,
    lng: 78.3740,
    image: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=800",
    googleMapsUrl: "https://maps.google.com/?q=Madhapur,+Hyderabad",
  },
  {
    id: "prop-4",
    title: "One Hyderabad Premium Residence",
    price: "₹2.9 Cr",
    priceNumeric: 29000000,
    bhk: 3,
    sqft: 2600,
    pricePerSqft: 11153,
    type: "Apartment",
    status: "Available",
    location: "Kokapet, Hyderabad",
    facing: "East",
    bedrooms: 3,
    bathrooms: 3,
    parkings: 2,
    amenities: ["Infinity Pool", "Clubhouse", "Tennis Court", "Jogging Track", "EV Charging Stations"],
    agentName: "Sneha Rao",
    agentAvatar: "https://i.pravatar.cc/150?u=sneha",
    agentPhone: "+91 98402 11005",
    description: "Modern, high-rise luxury apartment in the booming Kokapet district. This unit offers an unobstructed lake view, cross-ventilation layout, and proximity to the Outer Ring Road (ORR) exit.",
    yearBuilt: 2025,
    roi: "6.1%",
    lat: 17.3980,
    lng: 78.3250,
    image: "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=800",
    googleMapsUrl: "https://maps.google.com/?q=Kokapet,+Hyderabad",
  },
  {
    id: "prop-5",
    title: "Kokapet GHMC Approved Plot",
    price: "₹1.8 Cr",
    priceNumeric: 18000000,
    bhk: 0,
    sqft: 3600,
    pricePerSqft: 5000,
    type: "Plot",
    status: "Reserved",
    location: "Kokapet, Hyderabad",
    facing: "South",
    bedrooms: 0,
    bathrooms: 0,
    parkings: 0,
    amenities: ["Wide 60ft Road Access", "Water Connection Ready", "Clear Title Deeds", "Gated Compound Layout"],
    agentName: "Amit Verma",
    agentAvatar: "https://i.pravatar.cc/150?u=amit",
    agentPhone: "+91 88005 32112",
    description: "A premium corner residential plot measuring 400 square yards in Kokapet. Part of a boutique layout with clear registry titles and complete development permissions from local civic bodies.",
    yearBuilt: 2024,
    roi: "N/A",
    lat: 17.3950,
    lng: 78.3220,
    image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800",
    googleMapsUrl: "https://maps.google.com/?q=Kokapet,+Hyderabad",
  },
  {
    id: "prop-6",
    title: "Banjara Hills Boutique Office",
    price: "₹9.5 Cr",
    priceNumeric: 95000000,
    bhk: 0,
    sqft: 6000,
    pricePerSqft: 15833,
    type: "Commercial",
    status: "Sold",
    location: "Banjara Hills, Hyderabad",
    facing: "North",
    bedrooms: 0,
    bathrooms: 4,
    parkings: 4,
    amenities: ["Corner Property", "Stilt Car Parking", "High Speed Elevators", "Fiber Internet Ready", "Security Systems"],
    agentName: "Rohan Das",
    agentAvatar: "https://i.pravatar.cc/150?u=rohan",
    agentPhone: "+91 91102 77456",
    description: "Standalone commercial boutique building in Road No. 12, Banjara Hills. Offering premium spaces suitable for design studios, corporate headquarters, or dental clinics.",
    yearBuilt: 2022,
    roi: "7.5%",
    lat: 17.4150,
    lng: 78.4100,
    image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800",
    googleMapsUrl: "https://maps.google.com/?q=Banjara+Hills,+Hyderabad",
  },
];
