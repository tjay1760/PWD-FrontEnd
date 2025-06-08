// src/components/BookAssessmentForm.jsx (Updated)
"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "../../lib/utils";
import { ReviewAssessmentForm } from "./ReviewAssesmentForm";
import toast from "react-hot-toast"; // Import toast

export function BookAssessmentForm() {
  const [assessmentType, setAssessmentType] = useState("");
  const [county, setCounty] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showReview, setShowReview] = useState(false); // State to control view

  const formData = {
    assessmentType,
    county,
    selectedDate,
  };

  const handleBookAssessment = (e) => {
    e.preventDefault();
    // Basic validation
    if (!assessmentType || !county || !selectedDate) {
      toast.error("Please fill in all required fields."); // Changed from alert
      return;
    }
    setShowReview(true); // Show the review form
  };

  const handleEdit = () => {
    setShowReview(false); // Go back to the booking form
  };

  const handleConfirmSubmit = () => {
    // This is where you'd actually send the data to your backend API
    console.log("CONFIRM AND SUBMITTING Assessment:", {
      assessmentType,
      county,
      selectedDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
    });
    toast.success("Assessment Confirmed and Submitted!"); // Changed from alert
    // After successful submission, you might want to redirect, show a success message,
    // or reset the form to its initial state.
    setAssessmentType("");
    setCounty("");
    setSelectedDate(null);
    setShowReview(false); // Go back to initial form state
  };

  if (showReview) {
    return (
      <ReviewAssessmentForm
        formData={formData}
        onEdit={handleEdit}
        onConfirmSubmit={handleConfirmSubmit}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold" style={{ color: 'var(--green-title)' }}>
          Book Assessment
        </CardTitle>
        <CardDescription>
          Select the Assessment Type below and choose your preferred Location and
          the Date you will be available
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleBookAssessment} className="space-y-6">
          {/* Assessment Type */}
          <div>
            <Label htmlFor="assessmentType" className="text-sm font-bold text-gray-700">
              Assessment Type<span className="text-red-500">*</span>
            </Label>
            <Select value={assessmentType} onValueChange={setAssessmentType}>
              <SelectTrigger id="assessmentType" className="w-full">
                <SelectValue placeholder="Select an assessment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Initial Evaluation">Initial Evaluation</SelectItem> {/* Changed to match image */}
                <SelectItem value="Follow-up">Follow-up Assessment</SelectItem>
                <SelectItem value="Re-assessment">Re-assessment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Location (County) */}
          <div>
            <Label htmlFor="county" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Location
            </Label>
            <Select value={county} onValueChange={setCounty}>
              <SelectTrigger id="county" className="w-full">
                <SelectValue placeholder="County*" />
              </SelectTrigger>
              <SelectContent>
                {/* List of Kenyan Counties */}
                <SelectItem value="Nairobi">Nairobi</SelectItem> {/* Changed to match image */}
                <SelectItem value="Mombasa">Mombasa</SelectItem>
                <SelectItem value="Kisumu">Kisumu</SelectItem>
                <SelectItem value="Nakuru">Nakuru</SelectItem>
                <SelectItem value="Kakamega">Kakamega</SelectItem>
                <SelectItem value="Kilifi">Kilifi</SelectItem>
                {/* Add all 47 counties here */}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Date */}
          <div>
            <Label htmlFor="preferredDate" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd MMMM yyyy") : <span className="text-gray-500">Choose Date*</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Book Assessment Button */}
          <Button type="submit" className="w-full text-lg font-semibold h-12"
            style={{
              backgroundColor: 'oklch(0.488 0.243 140)',
              color: 'white',
              borderRadius: '0.5rem',
              border: '2px solid oklch(0.45 0.23 140)'
            }}>
            BOOK ASSESSMENT
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}