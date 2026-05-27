"use client";

import { PropertyForm } from "../components/property-form";

export default function AddPropertyPage() {
  return (
    <div className="flex-1 w-full space-y-6">
      <PropertyForm isEditing={false} />
    </div>
  );
}
