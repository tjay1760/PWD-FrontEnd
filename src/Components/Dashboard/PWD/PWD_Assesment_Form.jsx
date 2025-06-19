// src/components/BookAssessmentForm.jsx (Updated to ensure assessmentType is included)
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "../../../lib/utils";
import { ReviewAssessmentForm } from "./ReviewAssesmentForm";
import toast from "react-hot-toast";

export function BookAssessmentForm() {
  const [assessmentType, setAssessmentType] = useState(""); // This state holds the assessment type
  const [county, setCounty] = useState("");
  const [preferredHospital, setPreferredHospital] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showReview, setShowReview] = useState(false);

  const [allCounties, setAllCounties] = useState([]);
  const [countyHospitals, setCountyHospitals] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [locationError, setLocationError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api/locations/counties'; // For fetching location data
  const BOOK_ASSESSMENT_API_URL = 'http://localhost:5000/api/assessments/book'; // Your assessment booking endpoint

  // Fetch all counties on component mount
  useEffect(() => {
    const fetchCounties = async () => {
      setLoadingLocations(true);
      setLocationError(null);
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllCounties(data);
      } catch (error) {
        console.error("Failed to fetch counties:", error);
        setLocationError(`Failed to load counties: ${error.message}`);
      } finally {
        setLoadingLocations(false);
      }
    };
    fetchCounties();
  }, []);

  // Fetch hospitals when a county is selected
  useEffect(() => {
    const fetchHospitals = async () => {
      if (!county) {
        setCountyHospitals([]);
        return;
      }

      setLoadingLocations(true);
      setLocationError(null);
      try {
        const selectedCounty = allCounties.find(c => c.name === county);
        if (!selectedCounty) {
          throw new Error("Selected county not found in fetched data.");
        }

        const response = await fetch(`${API_BASE_URL}/${selectedCounty.id}/hospitals`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountyHospitals(data);
        setPreferredHospital(""); // Reset preferred hospital when county changes
      } catch (error) {
        console.error(`Failed to fetch hospitals for ${county}:`, error);
        setLocationError(`Failed to load hospitals for ${county}: ${error.message}`);
        setCountyHospitals([]);
        setPreferredHospital("");
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchHospitals();
  }, [county, allCounties]);


  const formData = {
    assessmentType, // Make sure this is passed to ReviewAssessmentForm
    county,
    preferredHospital,
    selectedDate,
  };

  const handleBookAssessment = (e) => {
    e.preventDefault();
    // Validate all fields before showing review
    if (!assessmentType || !county || !preferredHospital || !selectedDate) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setShowReview(true);
  };

  const handleEdit = () => {
    setShowReview(false);
  };

  // THIS IS THE KEY FUNCTION FOR THE PAYLOAD
  const handleConfirmSubmit = async () => {
    // 1. Get the PWD ID (VERY IMPORTANT!)
    // This is a placeholder. You need to replace this with your actual logic
    // to get the PWD's ID.
    // - If the logged-in user IS the PWD: you might get it from localStorage or a global state (e.g., const pwdId = localStorage.getItem('userId');)
    // - If a guardian is booking: you would need to have selected the PWD they are booking for.
    //   For example:
    //   const loggedInUserId = localStorage.getItem('userId'); // The guardian's ID
    //   const selectedPwdIdForBooking = someStateVariableHoldingPwdId; // The PWD's ID selected by the guardian

    // For demonstration, let's use a placeholder.
    // YOU MUST REPLACE "YOUR_PWD_ID_HERE" with a valid PWD user's MongoDB _id
    // This ID must correspond to a user in your 'users' collection with role: 'pwd'
    const pwdId = localStorage.getItem('userId');
 // <<<--- REPLACE THIS with your actual PWD ID for testing
console.log("PWD ID for booking:", pwdId); // Log the PWD ID for debugging
    if (!pwdId) {
        toast.error("Unable to book assessment: PWD ID is missing. Please ensure you've selected or provided a PWD.");
        return;
    }

    // 2. Prepare the data payload for the API
    const dataToSend = {
      pwdId: pwdId, // The ID of the PWD for whom the assessment is being booked
      county: county, // The selected county from the form state
      hospital: preferredHospital, // The selected hospital from the form state
      // Format the date to ISO 8601 string for the backend
      assessmentDate: selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") : null,
      assessmentType: assessmentType.toLowerCase(), // The selected assessment type from the form state
    };
console.log("Data to send:", dataToSend); // Log the data to be sent for debugging
    // 3. Get the authentication token
    // Replace 'jwtToken' with the actual key you use to store the JWT in localStorage
    const token = localStorage.getItem('accessToken');

    if (!token) {
      toast.error("Authentication token not found. Please log in.");
      return;
    }

    // 4. Make the API request
    try {
      const response = await fetch(BOOK_ASSESSMENT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach the JWT token
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json(); // Parse the JSON response

      if (response.ok) { // Check if the response status is 2xx
        toast.success(result.message || "Assessment booked successfully!");
        console.log("Assessment booking successful:", result);
        // Reset form and navigate back to initial state after successful booking
        setAssessmentType("");
        setCounty("");
        setPreferredHospital("");
        setSelectedDate(null);
        setShowReview(false);
        // Optionally, you might want to redirect the user or show a permanent success message
      } else {
        // Handle API errors (e.g., 400 Bad Request, 403 Forbidden, 404 Not Found)
        console.error("Assessment booking failed:", result);
        toast.error(result.message || "Failed to book assessment. Please check your inputs.");
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      console.error("Network or unexpected error during assessment booking:", error);
      toast.error("An unexpected error occurred. Please check your network and try again.");
    }
  };

  // ... (rest of the component's JSX for rendering the form)

  if (showReview) {
    return (
      <ReviewAssessmentForm
        formData={formData} // formData already contains all necessary data
        onEdit={handleEdit}
        onConfirmSubmit={handleConfirmSubmit} // This function will execute the API call
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
  <SelectItem value="VISUAL IMPAIRMENTS">VISUAL IMPAIRMENTS</SelectItem>
  <SelectItem value="HEARING IMPAIRMENTS">HEARING IMPAIRMENTS</SelectItem>
  <SelectItem value="SPEECH, LANGUAGE, COMMUNICATION AND SWALLOWING DISABILITIES">SPEECH, LANGUAGE, COMMUNICATION AND SWALLOWING DISABILITIES</SelectItem>
  <SelectItem value="MENTAL/ INTELLECTUAL/ AUTISM SPECTRUM DISORDERS">MENTAL/ INTELLECTUAL/ AUTISM SPECTRUM DISORDERS</SelectItem>
  <SelectItem value="MAXILLOFACIAL DISABILITIES">MAXILLOFACIAL DISABILITIES</SelectItem>
  <SelectItem value="PROGRESSIVE CHRONIC DISORDERS">PROGRESSIVE CHRONIC DISORDERS</SelectItem>
  <SelectItem value="PHYSICAL DISABILITIES">PHYSICAL DISABILITIES</SelectItem>
</SelectContent>
            </Select>
          </div>

          {/* Preferred Location (County) */}
          <div>
            <Label htmlFor="county" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Location<span className="text-red-500">*</span>
            </Label>
            <Select value={county} onValueChange={setCounty}>
              <SelectTrigger id="county" className="w-full">
                <SelectValue placeholder="County*" />
              </SelectTrigger>
              <SelectContent>
                {loadingLocations ? (
                  <SelectItem value="__loading_counties__" disabled>Loading counties...</SelectItem>
                ) : locationError ? (
                  <SelectItem value="__error_counties__" disabled>{locationError}</SelectItem>
                ) : (
                  allCounties.map(countyItem => (
                    <SelectItem key={countyItem.id} value={countyItem.name}>
                      {countyItem.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Hospital */}
          <div>
            <Label htmlFor="preferredHospital" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Hospital<span className="text-red-500">*</span>
            </Label>
            <Select value={preferredHospital} onValueChange={setPreferredHospital} disabled={!county || loadingLocations}>
              <SelectTrigger id="preferredHospital" className="w-full">
                <SelectValue placeholder="Preferred Hospital*" />
              </SelectTrigger>
              <SelectContent>
                {!county ? (
                  <SelectItem value="__select-county-first__" disabled>Select a County first</SelectItem>
                ) : loadingLocations ? (
                  <SelectItem value="__loading_hospitals__" disabled>Loading hospitals...</SelectItem>
                ) : locationError ? (
                  <SelectItem value="__error_hospitals__" disabled>{locationError}</SelectItem>
                ) : countyHospitals.length === 0 ? (
                  <SelectItem value="__no-hospitals-found__" disabled>No hospitals found for this county</SelectItem>
                ) : (
                  countyHospitals.map(hospital => (
                    <SelectItem key={hospital.name} value={hospital.name}>
                      {hospital.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Date */}
          <div>
            <Label htmlFor="preferredDate" className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              Preferred Date<span className="text-red-500">*</span>
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
                  {selectedDate ? format(selectedDate, "dd MMMMyyyy") : <span className="text-gray-500">Choose Date*</span>}
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