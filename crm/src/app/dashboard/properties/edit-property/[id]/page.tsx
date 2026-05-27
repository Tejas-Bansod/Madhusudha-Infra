"use client";

import { use, useEffect, useState } from "react";
import { PropertyForm } from "../../components/property-form";
import { mockListings, PropertyListing } from "../../data/listings";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  // Use React.use() to unwrap the params Promise in Next.js App Router (Client Components)
  const resolvedParams = use(params);
  const [listing, setListing] = useState<PropertyListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const found = mockListings.find(l => l.id === resolvedParams.id);
      setListing(found || null);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="flex-1 w-full h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-8">
        <Card className="max-w-md w-full border-dashed border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6 flex flex-col items-center text-center space-y-2">
            <AlertCircle className="h-10 w-10 text-destructive mb-2" />
            <h2 className="text-xl font-bold text-foreground">Property Not Found</h2>
            <p className="text-sm text-muted-foreground">
              We couldn't find a property listing with the ID <span className="font-mono text-foreground">{resolvedParams.id}</span>.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full space-y-6">
      <PropertyForm initialData={listing} isEditing={true} />
    </div>
  );
}
