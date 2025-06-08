// src/components/ReviewAssessmentForm.jsx
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
// Or if you use lucide-react for icons:
// import { EditIcon } from 'lucide-react';
import toast from "react-hot-toast"; // Import toast

/**
 * @typedef {Object} FormData
 * @property {string} assessmentType - The selected assessment type.
 * @property {string} county - The selected county.
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
      <CardHeader className="relative pb-2"> {/* Added relative for absolute positioning of edit button */}
        {/* Green title */}
        <CardTitle className="text-xl font-semibold" style={{ color: 'var(--green-title)' }}>
          Book Assessment
        </CardTitle>
        <CardDescription>
          Select the Assessment Type below and choose you preferred Location and
          the Date you will be available
        </CardDescription>
        {/* Edit Icon Button - Positioned absolutely */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onEdit}
          aria-label="Edit Assessment Details"
        >
          <Pencil1Icon className="h-5 w-5 text-gray-600" />
          {/* If using Lucide: <EditIcon className="h-5 w-5 text-gray-600" /> */}
        </Button>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Assessment Type - Display Value */}
          <div>
            <Label htmlFor="assessmentType" className="text-sm font-bold text-gray-700">
              Assessment Type<span className="text-red-500">*</span>
            </Label>
            <p className="border border-input bg-background px-3 py-2 rounded-md text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              {formData.assessmentType || "N/A"}
            </p>
          </div>

          {/* Preferred Location (County) - Display Value */}
          <div>
            <Label htmlFor="county" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Location
            </Label>
            <p className="border border-input bg-background px-3 py-2 rounded-md text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              {formData.county || "N/A"}
            </p>
          </div>

          {/* Preferred Date - Display Value */}
          <div>
            <Label htmlFor="preferredDate" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Date
            </Label>
            <p className="border border-input bg-background px-3 py-2 rounded-md text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
             {formData.selectedDate ? format(formData.selectedDate, "dd MMMM yyyy") : "N/A"}
            </p>
          </div>

          {/* Confirm and Submit Button */}
          <Button
            type="button" // Change to type="button" to prevent default form submission if wrapped in a form
            onClick={onConfirmSubmit}
            className="w-full text-lg font-semibold h-12"
            style={{
              backgroundColor: 'oklch(0.488 0.243 140)', // A vibrant green for the button
              color: 'white',
              borderRadius: '0.5rem', // Match card's border-radius
              border: '2px solid oklch(0.45 0.23 140)' // Slightly darker green border
            }}
          >
            CONFIRM AND SUBMIT
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}