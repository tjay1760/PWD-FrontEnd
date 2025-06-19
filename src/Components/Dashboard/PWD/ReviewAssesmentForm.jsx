"use client"; // If using Next.js App Router

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { format } from "date-fns";
import { Pencil1Icon } from "@radix-ui/react-icons"; // For the Edit icon
import toast from "react-hot-toast"; // Import toast

/**
 * @typedef {Object} FormData
 * @property {string} county - The selected county.
 * @property {string} preferredHospital - The selected preferred hospital. (NEW)
 * @property {Date | null} selectedDate - The selected date object.
 */

/**
 * ReviewAssessmentForm component displays the booked assessment details for confirmation.
 * @param {Object} props
 * @param {FormData} props.formData - The data submitted from the booking form.
 * @param {function(): void} props.onEdit - Callback function to handle the "Edit" action.
 * @param {function(): void} props.onConfirmSubmit - Callback function to handle the "Confirm and Submit" action.
 */
export function ReviewAssessmentForm({ formData, onEdit, onConfirmSubmit }) {
  return (
    <Card className="w-full">
      <CardHeader className="relative pb-2">
        <CardTitle className="text-xl font-semibold" style={{ color: 'var(--green-title)' }}>
          Review Assessment Details
        </CardTitle>
        <CardDescription>
          Please review the details below before confirming your assessment booking.
        </CardDescription>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onEdit}
          aria-label="Edit Assessment Details"
        >
          <Pencil1Icon className="h-5 w-5 text-gray-600" />
        </Button>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">

          {/* Preferred Location (County) - Display Value */}
          <div>
            <Label htmlFor="county" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred County<span className="text-red-500">*</span>
            </Label>
            <p className="border border-input bg-background px-3 py-2 rounded-md text-sm">
              {formData.county || "N/A"}
            </p>
          </div>

          {/* Preferred Hospital - Display Value (NEW) */}
          <div>
            <Label htmlFor="preferredHospital" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Hospital<span className="text-red-500">*</span>
            </Label>
            <p className="border border-input bg-background px-3 py-2 rounded-md text-sm">
              {formData.preferredHospital || "N/A"}
            </p>
          </div>

          {/* Preferred Date - Display Value */}
          <div>
            <Label htmlFor="preferredDate" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Date<span className="text-red-500">*</span>
            </Label>
            <p className="border border-input bg-background px-3 py-2 rounded-md text-sm">
             {formData.selectedDate ? format(formData.selectedDate, "dd MMMM yyyy") : "N/A"}
            </p>
          </div>

          {/* Confirm and Submit Button */}
          <Button
            type="button"
            onClick={onConfirmSubmit}
            className="w-full text-lg font-semibold h-12"
            style={{
              backgroundColor: 'oklch(0.488 0.243 140)',
              color: 'white',
              borderRadius: '0.5rem',
              border: '2px solid oklch(0.45 0.23 140)'
            }}
          >
            CONFIRM AND SUBMIT
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
