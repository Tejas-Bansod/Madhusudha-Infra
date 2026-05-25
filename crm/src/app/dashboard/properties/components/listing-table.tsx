"use client";

import React from "react";
import { PropertyListing, PROPERTY_TYPES, LISTING_STATUSES } from "../data/listings";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingTableProps {
  listings: PropertyListing[];
  onRowClick: (listing: PropertyListing) => void;
}

export function ListingTable({ listings, onRowClick }: ListingTableProps) {
  return (
    <div className="rounded-xl border border-border/50 overflow-hidden glass-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/50 hover:bg-transparent">
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Property</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Type</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Status</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">BHK</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Area (Sqft)</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Price</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Rate (/sqft)</TableHead>
              <TableHead className="text-[10px] uppercase font-semibold text-muted-foreground">Agent</TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((prop) => {
              const typeDef = PROPERTY_TYPES.find((t) => t.type === prop.type);
              const statusDef = LISTING_STATUSES.find((s) => s.status === prop.status);

              return (
                <TableRow
                  key={prop.id}
                  onClick={() => onRowClick(prop)}
                  className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer group"
                >
                  <TableCell>
                    <div className="flex items-center gap-2.5 min-w-[200px]">
                      {prop.image && (
                        <div className="h-8 w-12 rounded overflow-hidden shrink-0 border border-border/45 bg-muted">
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-foreground truncate">{prop.title}</p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5 truncate">
                          <MapPin className="h-2 w-2 text-primary" />
                          {prop.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-[9px] font-bold px-1.5 py-0 uppercase border", typeDef?.color, typeDef?.border)}>
                      {prop.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("text-[9px] font-bold px-1.5 py-0 uppercase border bg-background/50", statusDef?.text)}>
                      {statusDef?.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-semibold text-foreground">{prop.bhk || "-"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-semibold text-foreground font-mono">{prop.sqft.toLocaleString("en-IN")}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-bold text-foreground font-mono">{prop.price}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] font-medium text-muted-foreground font-mono">
                      ₹{Math.round(prop.pricePerSqft).toLocaleString("en-IN")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="h-5 w-5 border border-border/50 shrink-0">
                        <AvatarImage src={prop.agentAvatar} />
                        <AvatarFallback className="text-[8px]">{prop.agentName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] text-muted-foreground font-medium truncate max-w-[80px]">
                        {prop.agentName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
