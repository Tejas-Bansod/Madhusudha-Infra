"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../../components/theme";
import { PropertyListing, PROPERTY_TYPES, LISTING_STATUSES } from "../data/listings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft, Save, Building, MapPin, IndianRupee, Image as ImageIcon,
  Ruler, CheckCircle2, UploadCloud, X, Map, ExternalLink, GripVertical,
  Loader2
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PropertyFormProps {
  initialData?: PropertyListing;
  isEditing?: boolean;
}

const COMMON_AMENITIES = [
  "Swimming Pool", "Gymnasium", "Clubhouse", "24/7 Security",
  "Power Backup", "Park / Garden", "Children's Play Area",
  "Jogging Track", "Tennis Court", "Elevator", "Vastu Compliant",
  "Rain Water Harvesting", "Home Automation", "Private Terrace"
];

// Sortable media item
function SortableMediaItem({ id, url, isPrimary, onRemove }: { id: string; url: string; isPrimary?: boolean; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative aspect-square rounded-lg overflow-hidden border shadow-sm group bg-muted">
      <img src={url} alt="Media" className="object-cover w-full h-full" />
      {isPrimary && (
        <div className="absolute top-1.5 left-1.5 bg-background/90 backdrop-blur text-[9px] font-bold px-1.5 py-0.5 rounded text-rose-500 border border-border/50">Primary</div>
      )}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        title="Drag to rearrange"
      >
        <GripVertical className="h-3 w-3 text-muted-foreground" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 bg-background/80 backdrop-blur p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

export function PropertyForm({ initialData, isEditing = false }: PropertyFormProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Map refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Media state - each entry has an id for dnd-kit and a url
  const [mediaItems, setMediaItems] = useState<{ id: string; url: string }[]>(() => {
    if (initialData?.image) return [{ id: "primary", url: initialData.image }];
    return [];
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    type: (initialData?.type || "Apartment") as string,
    status: (initialData?.status || "Available") as string,
    price: initialData?.price || "",
    priceNumeric: initialData?.priceNumeric || 0,
    roi: initialData?.roi || "",
    bhk: initialData?.bhk || 0,
    sqft: initialData?.sqft || 0,
    facing: (initialData?.facing || "East") as string,
    bedrooms: initialData?.bedrooms || 0,
    bathrooms: initialData?.bathrooms || 0,
    parkings: initialData?.parkings || 0,
    yearBuilt: initialData?.yearBuilt || new Date().getFullYear(),
    location: initialData?.location || "",
    lat: initialData?.lat || 17.425,
    lng: initialData?.lng || 78.37,
    amenities: initialData?.amenities || [],
    googleMapsUrl: initialData?.googleMapsUrl || "",
    address: initialData?.address || "",
    pincode: initialData?.pincode || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    country: initialData?.country || "",
  });

  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodedSuccess, setGeocodedSuccess] = useState(false);

  const fetchAddressRef = useRef<((lat: number, lng: number) => Promise<void>) | null>(null);
  
  fetchAddressRef.current = async (lat: number, lng: number) => {
    setIsGeocoding(true);
    setGeocodedSuccess(false);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "RealestateCRM/1.0 (contact: admin@realestatecrm.com)"
          }
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.address) {
          const addr = data.address;
          
          // Build a readable area/locality name
          const area = addr.suburb || addr.neighbourhood || addr.residential || addr.commercial || addr.suburb || addr.village || addr.town || "";
          const road = addr.road || "";
          const formattedArea = [road, area].filter(Boolean).join(", ") || addr.suburb || "Hyderabad";

          const pincode = addr.postcode || "";
          const city = addr.city || addr.town || addr.municipality || "Hyderabad";
          const state = addr.state || "Telangana";
          const country = addr.country || "India";
          const fullAddress = data.display_name || "";

          setFormData(prev => ({
            ...prev,
            location: formattedArea,
            address: fullAddress,
            pincode: pincode,
            city: city,
            state: state,
            country: country,
            // Automatically update googleMapsUrl if not already set manually, or if it was an empty/default format
            googleMapsUrl: prev.googleMapsUrl && !prev.googleMapsUrl.includes("q=")
              ? prev.googleMapsUrl
              : `https://www.google.com/maps?q=${lat},${lng}`
          }));
          setGeocodedSuccess(true);
        }
      }
    } catch (error) {
      console.error("Error fetching address details:", error);
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Initialize MapLibre map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current || mapRef.current) return;

    const initMap = async () => {
      const maplibre = await import("maplibre-gl");
      await import("maplibre-gl/dist/maplibre-gl.css");

      const styleUrl = theme === "dark"
        ? "https://tiles.openfreemap.org/styles/dark"
        : "https://tiles.openfreemap.org/styles/bright";

      const map = new maplibre.Map({
        container: mapContainerRef.current!,
        style: styleUrl,
        center: [formData.lng, formData.lat],
        zoom: 12,
        attributionControl: false,
      });

      map.addControl(new maplibre.NavigationControl({ showCompass: false }), "bottom-right");

      mapRef.current = map;

      map.on("load", () => {
        const el = document.createElement("div");
        el.style.cssText = `width:32px;height:32px;border-radius:50%;background:${theme === "dark" ? "#0f172a" : "#fff"};border:2px solid #6366f1;color:#818cf8;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,0.2);cursor:grab;`;
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/></svg>`;

        const marker = new maplibre.Marker({ element: el, draggable: true, anchor: "center" })
          .setLngLat([formData.lng, formData.lat])
          .addTo(map);

        marker.on("dragend", () => {
          const { lat, lng } = marker.getLngLat();
          setFormData(prev => ({ ...prev, lat, lng }));
          fetchAddressRef.current?.(lat, lng);
        });

        markerRef.current = marker;

        map.on("click", (e: any) => {
          const { lat, lng } = e.lngLat;
          marker.setLngLat([lng, lat]);
          setFormData(prev => ({ ...prev, lat, lng }));
          fetchAddressRef.current?.(lat, lng);
        });
      });
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map style on theme change
  useEffect(() => {
    if (!mapRef.current) return;
    const styleUrl = theme === "dark"
      ? "https://tiles.openfreemap.org/styles/dark"
      : "https://tiles.openfreemap.org/styles/bright";
    mapRef.current.setStyle(styleUrl);
  }, [theme]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setMediaItems(prev => {
        const oldIndex = prev.findIndex(i => i.id === active.id);
        const newIndex = prev.findIndex(i => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard/properties/listings");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      {/* MapLibre styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .maplibregl-ctrl-group { border-radius:8px!important;overflow:hidden!important;box-shadow:0 10px 15px -3px rgba(0,0,0,0.2)!important;border:1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}!important; }
        .maplibregl-ctrl-group button { background-color:${theme === "dark" ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.9)"}!important;color:${theme === "dark" ? "#f1f5f9" : "#0f172a"}!important;backdrop-filter:blur(8px)!important; }
        .maplibregl-ctrl-group button:hover { background-color:${theme === "dark" ? "rgba(30,41,59,0.95)" : "rgba(241,245,249,0.95)"}!important;color:#6366f1!important; }
        .maplibregl-ctrl-attrib { font-size:9px!important; }
      `}} />

      {/* Sticky Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10 bg-background/80 backdrop-blur-md py-4 border-b -mx-4 px-4 sm:mx-0 sm:px-0 sm:border-b-0 sm:bg-transparent">
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" size="icon" onClick={() => router.back()} className="h-9 w-9 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {isEditing ? "Edit Property" : "Add New Property"}
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              {isEditing ? `Updating details for ${initialData?.title}` : "Fill out the details below to create a new listing."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={isLoading} className="gap-2 shadow-sm cursor-pointer">
            {isLoading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" /> : <Save className="h-4 w-4" />}
            {isEditing ? "Save Changes" : "Create Listing"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Basic Details */}
          <Card className="glass-card border-border/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building className="h-5 w-5 text-primary" /> Basic Information
              </CardTitle>
              <CardDescription>Primary details displayed first.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title <span className="text-destructive">*</span></Label>
                <Input id="title" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Prestige High Line Penthouse" className="bg-background/50 text-base" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select value={formData.type} onValueChange={(val) => handleSelectChange("type", val)}>
                    <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map(pt => <SelectItem key={pt.type} value={pt.type}>{pt.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Listing Status</Label>
                  <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)}>
                    <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {LISTING_STATUSES.map(s => <SelectItem key={s.status} value={s.status}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the property, key selling points, and surroundings..." className="min-h-[120px] bg-background/50 resize-none" />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className="glass-card border-border/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IndianRupee className="h-5 w-5 text-emerald-500" /> Pricing & Financials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Display Price</Label>
                  <Input id="price" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. ₹8.2 Cr" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceNumeric">Numeric Value (₹)</Label>
                  <Input id="priceNumeric" name="priceNumeric" type="number" value={formData.priceNumeric} onChange={handleChange} className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roi">Expected ROI</Label>
                  <Input id="roi" name="roi" value={formData.roi} onChange={handleChange} placeholder="e.g. 5.4%" className="bg-background/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & MapLibre Map */}
          <Card className="glass-card border-border/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-amber-500" /> Location Details
              </CardTitle>
              {/* Geocoding Status Badge */}
              <div className="h-6">
                {isGeocoding && (
                  <div className="flex items-center gap-1 text-[10px] font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Fetching Address...
                  </div>
                )}
                {!isGeocoding && geocodedSuccess && (
                  <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="h-3 w-3" />
                    Auto-filled from map!
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Interactive MapLibre map */}
              <div className="relative w-full h-64 rounded-xl border border-border/50 overflow-hidden bg-slate-950 shadow-inner">
                <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0 cursor-crosshair" />
                <div className="absolute top-2 left-2 bg-background/80 backdrop-blur text-[10px] font-medium px-2 py-1 rounded border shadow-sm text-primary flex items-center gap-1 pointer-events-none z-10">
                  <Map className="h-3 w-3" /> Drag pin or click to set location
                </div>
                <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur text-[10px] font-mono px-2 py-1 rounded border shadow-sm z-10">
                  LAT: {formData.lat.toFixed(4)} | LNG: {formData.lng.toFixed(4)}
                </div>
              </div>

              {/* Full Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street name, landmark, building..."
                  className="bg-background/50 min-h-[70px] text-sm resize-none"
                />
              </div>

              {/* Area & Pincode Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Area / Locality</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Jubilee Hills" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="e.g. 500033" className="bg-background/50" />
                </div>
              </div>

              {/* City, State, Country Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Hyderabad" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="e.g. Telangana" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" className="bg-background/50" />
                </div>
              </div>

              {/* Google Maps URL */}
              <div className="space-y-2">
                <Label htmlFor="googleMapsUrl" className="flex items-center gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5 text-emerald-500" />
                  Google Maps Link
                  <span className="text-[10px] text-muted-foreground font-normal ml-1">(shown as "Open in Google Maps" button to users)</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="googleMapsUrl"
                    name="googleMapsUrl"
                    value={formData.googleMapsUrl}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/?q=..."
                    className="bg-background/50 font-mono text-xs"
                  />
                  {formData.googleMapsUrl && (
                    <a
                      href={formData.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Button type="button" variant="outline" size="icon" className="h-10 w-10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Tip: Open Google Maps → search location → click Share → Copy link
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Specifications */}
          <Card className="glass-card border-border/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Ruler className="h-5 w-5 text-indigo-500" /> Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="bhk">BHK</Label><Input id="bhk" name="bhk" type="number" value={formData.bhk} onChange={handleChange} className="bg-background/50" /></div>
                <div className="space-y-2"><Label htmlFor="sqft">Area (Sq.ft)</Label><Input id="sqft" name="sqft" type="number" value={formData.sqft} onChange={handleChange} className="bg-background/50" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="bedrooms">Bedrooms</Label><Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} className="bg-background/50" /></div>
                <div className="space-y-2"><Label htmlFor="bathrooms">Bathrooms</Label><Input id="bathrooms" name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} className="bg-background/50" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="parkings">Parkings</Label><Input id="parkings" name="parkings" type="number" value={formData.parkings} onChange={handleChange} className="bg-background/50" /></div>
                <div className="space-y-2"><Label htmlFor="yearBuilt">Year Built</Label><Input id="yearBuilt" name="yearBuilt" type="number" value={formData.yearBuilt} onChange={handleChange} className="bg-background/50" /></div>
              </div>
              <div className="space-y-2 pt-2">
                <Label>Facing</Label>
                <Select value={formData.facing} onValueChange={(val) => handleSelectChange("facing", val)}>
                  <SelectTrigger className="bg-background/50"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="East">East Facing</SelectItem>
                    <SelectItem value="West">West Facing</SelectItem>
                    <SelectItem value="North">North Facing</SelectItem>
                    <SelectItem value="South">South Facing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Media with drag-and-drop rearrange */}
          <Card className="glass-card border-border/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ImageIcon className="h-5 w-5 text-rose-500" /> Media
              </CardTitle>
              <p className="text-xs text-muted-foreground">Drag thumbnails to rearrange. First image becomes the cover.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drop zone */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (e.target.files) {
                      const newItems = Array.from(e.target.files).map(file => ({
                        id: `upload-${Date.now()}-${Math.random()}`,
                        url: URL.createObjectURL(file),
                      }));
                      setMediaItems(prev => [...prev, ...newItems]);
                    }
                  }}
                />
                <div className="h-28 w-full rounded-xl border-2 border-dashed border-border/50 bg-muted/10 flex flex-col items-center justify-center text-muted-foreground gap-2 transition-colors hover:bg-muted/30 hover:border-rose-500/50">
                  <div className="p-2.5 rounded-full bg-background shadow-sm border">
                    <UploadCloud className="h-5 w-5 text-rose-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">Drag & drop or click to upload</p>
                    <p className="text-[10px]">JPEG, PNG, WEBP supported</p>
                  </div>
                </div>
              </div>

              {/* Sortable media grid */}
              {mediaItems.length > 0 && (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={mediaItems.map(i => i.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-3 gap-2">
                      {mediaItems.map((item, index) => (
                        <SortableMediaItem
                          key={item.id}
                          id={item.id}
                          url={item.url}
                          isPrimary={index === 0}
                          onRemove={() => setMediaItems(prev => prev.filter(i => i.id !== item.id))}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="glass-card border-border/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-cyan-500" /> Amenities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                {COMMON_AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="text-sm font-medium leading-none cursor-pointer">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
