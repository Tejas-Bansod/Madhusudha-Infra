"use client";

import React, { useState, useEffect, useRef } from "react";
import { PropertyListing, PROPERTY_TYPES } from "../data/listings";
import { cn } from "@/lib/utils";
import { MapPin, Sparkles, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../components/theme";

interface ListingMapHudProps {
  listings: PropertyListing[];
  selectedId: string | null;
  onSelectProperty: (property: PropertyListing) => void;
}

export function ListingMapHud({
  listings,
  selectedId,
  onSelectProperty,
}: ListingMapHudProps) {
  const [hoveredProp, setHoveredProp] = useState<PropertyListing | null>(null);
  const { theme } = useTheme();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const popupsRef = useRef<any[]>([]);

  // Initialize MapLibre Map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let maplibre: any;

    const initMap = async () => {
      maplibre = await import("maplibre-gl");
      await import("maplibre-gl/dist/maplibre-gl.css");

      if (mapRef.current) return; // already initialized

      const styleUrl = theme === "dark"
        ? "https://tiles.openfreemap.org/styles/dark"
        : "https://tiles.openfreemap.org/styles/bright";

      const map = new maplibre.Map({
        container: mapContainerRef.current!,
        style: styleUrl,
        center: [78.37, 17.425],
        zoom: 11,
        attributionControl: false,
      });

      map.addControl(new maplibre.NavigationControl({ showCompass: false }), "bottom-right");
      map.addControl(new maplibre.AttributionControl({ compact: true }), "bottom-right");

      mapRef.current = map;

      // Add markers once map is loaded
      map.on("load", () => {
        addMarkers(map, maplibre);
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

  // Update tile style when theme changes
  useEffect(() => {
    if (!mapRef.current) return;
    const styleUrl = theme === "dark"
      ? "https://tiles.openfreemap.org/styles/dark"
      : "https://tiles.openfreemap.org/styles/bright";
    mapRef.current.setStyle(styleUrl);
    // Re-add markers after style loads
    mapRef.current.once("styledata", async () => {
      const maplibre = await import("maplibre-gl");
      addMarkers(mapRef.current, maplibre);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const addMarkers = (map: any, maplibre: any) => {
    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    listings.forEach((prop) => {
      const dotColor = prop.status === "Available" ? "#10b981" :
        prop.status === "Under Offer" ? "#f59e0b" :
        prop.status === "Reserved" ? "#3b82f6" : "#f43f5e";

      const isSelected = selectedId === prop.id;

      const el = document.createElement("div");
      el.style.cssText = "position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;";
      el.innerHTML = `
        <div style="
          position: absolute;
          bottom: 38px;
          background: ${isSelected ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : (theme === "dark" ? "rgba(15, 23, 42, 0.92)" : "rgba(255,255,255,0.96)")};
          border: 1px solid ${isSelected ? "#818cf8" : (theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)")};
          color: ${isSelected ? "#ffffff" : (theme === "dark" ? "#f1f5f9" : "#0f172a")};
          font-size: 10px;
          font-weight: 800;
          font-family: monospace;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          backdrop-filter: blur(4px);
          pointer-events: none;
        ">
          ${prop.price}
        </div>
        ${isSelected ? `<span style="position:absolute;width:44px;height:44px;background:rgba(99,102,241,0.25);border-radius:50%;top:-6px;animation:mlpulse 2s infinite;pointer-events:none;"></span>` : ""}
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${theme === "dark" ? "#0f172a" : "#ffffff"};
          border: 2px solid ${isSelected ? "#6366f1" : (theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)")};
          color: ${isSelected ? "#818cf8" : (theme === "dark" ? "#e2e8f0" : "#475569")};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          transform: scale(${isSelected ? "1.1" : "1"});
          transition: all 0.2s;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
          </svg>
        </div>
        <span style="
          position: absolute;
          top: -2px;
          right: -2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${dotColor};
          border: 1.5px solid ${theme === "dark" ? "#0f172a" : "#ffffff"};
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        "></span>
      `;

      el.addEventListener("mouseenter", () => setHoveredProp(prop));
      el.addEventListener("mouseleave", () => setHoveredProp(null));
      el.addEventListener("click", () => onSelectProperty(prop));

      const marker = new maplibre.Marker({ element: el, anchor: "bottom" })
        .setLngLat([prop.lng, prop.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  };

  // Re-add markers when listings or selectedId changes
  useEffect(() => {
    if (!mapRef.current) return;
    import("maplibre-gl").then((maplibre) => {
      addMarkers(mapRef.current, maplibre);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, selectedId, theme]);

  // Pan to selected
  useEffect(() => {
    if (!mapRef.current || !selectedId) return;
    const selected = listings.find(l => l.id === selectedId);
    if (selected) {
      mapRef.current.flyTo({ center: [selected.lng, selected.lat], zoom: 14, duration: 1200 });
    }
  }, [selectedId, listings]);

  const displayProp = hoveredProp || listings.find(l => l.id === selectedId);

  return (
    <div className="relative w-full h-[480px] rounded-2xl border border-border/50 overflow-hidden bg-slate-950 shadow-inner group">
      {/* Pulse animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mlpulse {
          0% { transform: scale(0.95); opacity: 1; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        .maplibregl-ctrl-attrib { font-size: 9px !important; }
        .maplibregl-ctrl-group { border-radius: 8px !important; overflow: hidden !important; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2) !important; border: 1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} !important; }
        .maplibregl-ctrl-group button { background-color: ${theme === "dark" ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.9)"} !important; color: ${theme === "dark" ? "#f1f5f9" : "#0f172a"} !important; backdrop-filter: blur(8px) !important; }
        .maplibregl-ctrl-group button:hover { background-color: ${theme === "dark" ? "rgba(30,41,59,0.95)" : "rgba(241,245,249,0.95)"} !important; color: #6366f1 !important; }
      `}} />

      {/* Map container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Top HUD Label */}
      <div className={cn(
        "absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-widest font-mono backdrop-blur-md px-3 py-1 rounded-md border transition-colors",
        theme === "dark"
          ? "bg-slate-900/80 text-muted-foreground/80 border-slate-800"
          : "bg-white/80 text-slate-600 border-slate-200"
      )}>
        Sector-12 // Tech Corridor Map
      </div>

      <div className={cn(
        "absolute bottom-4 right-16 z-10 text-[9px] font-mono flex items-center gap-1.5 backdrop-blur-md px-3 py-1 rounded-md border transition-colors",
        theme === "dark"
          ? "bg-slate-900/80 text-muted-foreground/80 border-slate-800"
          : "bg-white/80 text-slate-600 border-slate-200"
      )}>
        <Navigation className="h-3 w-3 text-primary rotate-45" />
        GPS Grid Ref: HYD-04
      </div>

      {/* HUD Info Popup */}
      <div className={cn(
        "absolute bottom-4 left-4 z-10 p-3 rounded-xl border w-64 shadow-md backdrop-blur-md transition-all duration-300",
        theme === "dark"
          ? "bg-slate-900/85 border-border/40 text-foreground"
          : "bg-white/90 border-slate-200 text-slate-900"
      )}>
        {displayProp ? (
          (() => {
            const typeDef = PROPERTY_TYPES.find(t => t.type === displayProp.type);
            return (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={cn("text-[8px] px-1 h-4 border uppercase", typeDef?.color, typeDef?.border)}>
                    {displayProp.type}
                  </Badge>
                  <span className={cn("text-[10px] font-bold font-mono", theme === "dark" ? "text-emerald-400" : "text-emerald-600")}>
                    {displayProp.price}
                  </span>
                </div>
                <div className="flex gap-2.5">
                  {displayProp.image && (
                    <div className={cn("h-10 w-14 rounded overflow-hidden shrink-0 border", theme === "dark" ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-100")}>
                      <img src={displayProp.image} alt={displayProp.title} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className={cn("text-xs font-bold truncate", theme === "dark" ? "text-foreground" : "text-slate-900")}>{displayProp.title}</h4>
                    <p className="text-[9px] text-muted-foreground flex items-center gap-0.5 mt-0.5 truncate">
                      <MapPin className="h-2 w-2 text-primary" /> {displayProp.location}
                    </p>
                  </div>
                </div>
                <div className={cn("grid grid-cols-3 gap-1 pt-1.5 border-t text-center text-[9px] font-mono", theme === "dark" ? "border-slate-800 text-muted-foreground" : "border-slate-100 text-slate-500")}>
                  <div>
                    <span className={cn("block font-bold", theme === "dark" ? "text-foreground" : "text-slate-900")}>{displayProp.bhk || "N/A"} BHK</span>
                    Config
                  </div>
                  <div>
                    <span className={cn("block font-bold", theme === "dark" ? "text-foreground" : "text-slate-900")}>{displayProp.sqft} sqft</span>
                    Area
                  </div>
                  <div>
                    <span className="block font-bold text-primary">{displayProp.roi || "N/A"}</span>
                    ROI Yield
                  </div>
                </div>
                {displayProp.googleMapsUrl && (
                  <a
                    href={displayProp.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full text-[10px] font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg py-1.5 transition-colors mt-1"
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Open in Google Maps
                  </a>
                )}
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
