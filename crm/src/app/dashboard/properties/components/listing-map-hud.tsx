"use client";

import React, { useState, useEffect, useRef } from "react";
import { PropertyListing, PROPERTY_TYPES } from "../data/listings";
import { cn } from "@/lib/utils";
import { MapPin, Building, Sparkles, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../components/theme";

interface ListingMapHudProps {
  listings: PropertyListing[];
  selectedId: string | null;
  onSelectProperty: (property: PropertyListing) => void;
}

// Convert mock relative coords (0-100) to actual geographic coordinates in Hyderabad tech zones
function getLatLng(location: string, mockLat: number, mockLng: number): [number, number] {
  if (location.includes("Jubilee Hills")) {
    return [17.4300 + (mockLat - 35) * 0.0003, 78.4000 + (mockLng - 40) * 0.0003];
  } else if (location.includes("Banjara Hills")) {
    return [17.4150 + (mockLat - 18) * 0.0003, 78.4100 + (mockLng - 32) * 0.0003];
  } else if (location.includes("Madhapur")) {
    return [17.4480 + (mockLat - 25) * 0.0003, 78.3740 + (mockLng - 68) * 0.0003];
  } else if (location.includes("Gachibowli")) {
    return [17.4350 + (mockLat - 48) * 0.0003, 78.3450 + (mockLng - 28) * 0.0003];
  } else if (location.includes("Kokapet")) {
    return [17.3980 + (mockLat - 70) * 0.0003, 78.3250 + (mockLng - 58) * 0.0003];
  }
  return [17.4126 + (mockLat - 50) * 0.0003, 78.3815 + (mockLng - 50) * 0.0003];
}

export function ListingMapHud({
  listings,
  selectedId,
  onSelectProperty,
}: ListingMapHudProps) {
  const [hoveredProp, setHoveredProp] = useState<PropertyListing | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const { theme } = useTheme();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);

  // 1. Load Leaflet script & stylesheet dynamically on client-side
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  // 2. Initialize Leaflet Map once loaded
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Create map instance centered around Hyderabad tech zones
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([17.425, 78.37], 12);

    mapRef.current = map;

    // Zoom control at bottom right
    L.control.zoom({
      position: "bottomright",
    }).addTo(map);

    // Attribution
    L.control.attribution({
      position: "bottomright",
      prefix: false,
    }).addAttribution("&copy; CartoDB &copy; OpenStreetMap").addTo(map);

    // Create marker layer group
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // 2b. Add / Update Tile Layer based on active theme
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Remove existing tile layer if it exists
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileUrl = theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 20,
    }).addTo(mapRef.current);
  }, [theme, leafletLoaded]);

  // 3. Render and Update Markers on Map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !markersLayerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Clear previous markers
    markersLayerRef.current.clearLayers();

    listings.forEach((prop) => {
      const coords = getLatLng(prop.location, prop.lat, prop.lng);
      const dotColor = prop.status === "Available" ? "#10b981" :
                       prop.status === "Under Offer" ? "#f59e0b" :
                       prop.status === "Reserved" ? "#3b82f6" : "#f43f5e";

      const isSelected = selectedId === prop.id;

      const customIcon = L.divIcon({
        className: "custom-div-icon",
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <!-- Floating Price Badge -->
            <div style="
              position: absolute;
              bottom: 34px;
              background: ${isSelected ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : (theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)')};
              border: 1px solid ${isSelected ? '#818cf8' : (theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)')};
              color: ${isSelected ? '#ffffff' : (theme === 'dark' ? '#f1f5f9' : '#0f172a')};
              font-size: 10px;
              font-weight: 800;
              font-family: monospace;
              padding: 2.5px 7px;
              border-radius: 6px;
              white-space: nowrap;
              box-shadow: 0 4px 12px rgba(0,0,0,0.25);
              backdrop-filter: blur(4px);
              transition: all 0.2s;
              transform: scale(${isSelected ? '1.05' : '1'});
              z-index: ${isSelected ? '100' : '50'};
            ">
              ${prop.price}
            </div>

            <!-- Pulsing outer circle for selected -->
            ${isSelected ? `<span style="position: absolute; width: 44px; height: 44px; background: rgba(99, 102, 241, 0.3); border-radius: 50%; top: -6px; animation: marker-pulse 2s infinite; pointer-events: none;"></span>` : ''}

            <!-- Icon Pin Circle -->
            <div style="
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: ${theme === 'dark' ? '#0f172a' : '#ffffff'};
              border: 2px solid ${isSelected ? '#6366f1' : (theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)')};
              color: ${isSelected ? '#818cf8' : (theme === 'dark' ? '#e2e8f0' : '#475569')};
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 10px rgba(0,0,0,0.2);
              transition: all 0.2s;
              transform: scale(${isSelected ? '1.1' : '1'});
            ">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
              </svg>
            </div>

            <!-- Status Indicator Dot -->
            <span style="
              position: absolute;
              top: -2px;
              right: -2px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: ${dotColor};
              border: 1.5px solid ${theme === 'dark' ? '#0f172a' : '#ffffff'};
              box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            "></span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(coords, { icon: customIcon }).addTo(markersLayerRef.current);

      marker.on("mouseover", () => {
        setHoveredProp(prop);
      });

      marker.on("mouseout", () => {
        setHoveredProp(null);
      });

      marker.on("click", () => {
        onSelectProperty(prop);
      });
    });
  }, [leafletLoaded, listings, selectedId, theme]);

  // 4. Pan map when selectedId changes
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !selectedId) return;

    const selectedProp = listings.find((l) => l.id === selectedId);
    if (selectedProp) {
      const coords = getLatLng(selectedProp.location, selectedProp.lat, selectedProp.lng);
      mapRef.current.setView(coords, 14, { animate: true, duration: 1.2 });
    }
  }, [selectedId, leafletLoaded, listings]);

  return (
    <div className="relative w-full h-[480px] rounded-2xl border border-border/50 overflow-hidden bg-slate-950 shadow-inner group">
      {/* Dynamic style injection for Leaflet Themes & Pulse animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marker-pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
            opacity: 1;
          }
          70% {
            transform: scale(1.15);
            box-shadow: 0 0 0 12px rgba(99, 102, 241, 0);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
            opacity: 0;
          }
        }
        .leaflet-container {
          background-color: ${theme === 'dark' ? '#020617' : '#f8fafc'} !important;
          color: ${theme === 'dark' ? '#f8fafc' : '#0f172a'} !important;
        }
        .leaflet-bar {
          border: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2) !important;
        }
        .leaflet-bar a {
          background-color: ${theme === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)'} !important;
          color: ${theme === 'dark' ? '#f1f5f9' : '#0f172a'} !important;
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} !important;
          backdrop-filter: blur(8px) !important;
          transition: all 0.2s !important;
        }
        .leaflet-bar a:hover {
          background-color: ${theme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(241, 245, 249, 0.95)'} !important;
          color: #6366f1 !important;
        }
        .leaflet-control-zoom-in, .leaflet-control-zoom-out {
          font-weight: bold !important;
        }
        .leaflet-control-attribution {
          background: ${theme === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.75)'} !important;
          color: ${theme === 'dark' ? '#64748b' : '#475569'} !important;
          backdrop-filter: blur(4px) !important;
          border-radius: 4px !important;
          font-size: 9px !important;
          padding: 2px 6px !important;
        }
        .leaflet-control-attribution a {
          color: #818cf8 !important;
          text-decoration: none !important;
        }
        .custom-div-icon {
          background: none !important;
          border: none !important;
        }
      `}} />

      {/* Actual Map Container */}
      {leafletLoaded ? (
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />
      ) : (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-slate-950">
          {/* Sci-Fi Blueprint Grid Background as fallback/loading state */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/0 via-primary/5 to-primary/0 h-1/2 w-full animate-[pulse_6s_infinite] pointer-events-none" />
          <div className="z-10 flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Initializing Satellite HUD...</span>
          </div>
        </div>
      )}

      {/* Cyberpunk Map HUD Details (Top Bar labels overlay) */}
      <div className={cn(
        "absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-widest font-mono backdrop-blur-md px-3 py-1 rounded-md border transition-colors duration-200",
        theme === "dark" 
          ? "bg-slate-900/80 text-muted-foreground/80 border-slate-800" 
          : "bg-white/80 text-slate-600 border-slate-200"
      )}>
        Sector-12 // Tech Corridor Map
      </div>
      <div className={cn(
        "absolute bottom-4 right-16 z-10 text-[9px] font-mono flex items-center gap-1.5 backdrop-blur-md px-3 py-1 rounded-md border transition-colors duration-200",
        theme === "dark"
          ? "bg-slate-900/80 text-muted-foreground/80 border-slate-800"
          : "bg-white/80 text-slate-600 border-slate-200"
      )}>
        <Navigation className="h-3 w-3 text-primary rotate-45" />
        GPS Grid Ref: HYD-04
      </div>

      {/* HUD Info Popup (Bottom Left) */}
      <div className={cn(
        "absolute bottom-4 left-4 z-10 glass-card p-3 rounded-xl border w-64 shadow-md backdrop-blur-md transition-all duration-300",
        theme === "dark"
          ? "bg-slate-900/85 border-border/40 text-foreground"
          : "bg-white/90 border-slate-200 text-slate-900"
      )}>
        {hoveredProp || listings.find((l) => l.id === selectedId) ? (
          (() => {
            const displayProp = hoveredProp || listings.find((l) => l.id === selectedId)!;
            const statusDef = PROPERTY_TYPES.find((t) => t.type === displayProp.type);
            return (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={cn("text-[8px] px-1 h-4 border uppercase", statusDef?.color, statusDef?.border)}>
                    {displayProp.type}
                  </Badge>
                  <span className={cn(
                    "text-[10px] font-bold font-mono",
                    theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                  )}>{displayProp.price}</span>
                </div>
                <div className="flex gap-2.5">
                  {displayProp.image && (
                    <div className={cn(
                      "h-10 w-14 rounded overflow-hidden shrink-0 border",
                      theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-100"
                    )}>
                      <img
                        src={displayProp.image}
                        alt={displayProp.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className={cn(
                      "text-xs font-bold truncate",
                      theme === "dark" ? "text-foreground" : "text-slate-900"
                    )}>{displayProp.title}</h4>
                    <p className="text-[9px] text-muted-foreground flex items-center gap-0.5 mt-0.5 truncate">
                      <MapPin className="h-2 w-2 text-primary" />
                      {displayProp.location}
                    </p>
                  </div>
                </div>
                <div className={cn(
                  "grid grid-cols-3 gap-1 pt-1.5 border-t text-center text-[9px] font-mono",
                  theme === "dark" ? "border-slate-800 text-muted-foreground" : "border-slate-100 text-slate-500"
                )}>
                  <div>
                    <span className={cn(
                      "block font-bold",
                      theme === "dark" ? "text-foreground" : "text-slate-900"
                    )}>{displayProp.bhk || "N/A"} BHK</span>
                    Config
                  </div>
                  <div>
                    <span className={cn(
                      "block font-bold",
                      theme === "dark" ? "text-foreground" : "text-slate-900"
                    )}>{displayProp.sqft} sqft</span>
                    Area
                  </div>
                  <div>
                    <span className={cn(
                      "block font-bold text-primary"
                    )}>{displayProp.roi || "N/A"}</span>
                    ROI Yield
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="flex items-center gap-2 py-3 justify-center text-muted-foreground text-xs font-medium">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            Hover over a node to query HUD data
          </div>
        )}
      </div>
    </div>
  );
}
