import React from 'react'
import { DisabilityAssessmentChart } from "./Doctors_chart";
import { Button } from '../../../components/ui/button';
import { HeartPlus } from 'lucide-react'; // Assuming you have a HeartPlus icon in lucide-react
const DoctorsAssesment = () => {
    const handleClick = () => {
    // Implement what happens when the button is clicked
    // For example, opening a modal for booking, or navigating to a new page.
    console.log("Add Appointment button clicked!");
    // You might want to show a toast notification:
    // toast.info("Adding a new appointment...");
  };
  return (
    <div className="assesments-page">
        <Button
      onClick={handleClick}
      className="h-12 px-6 flex items-center justify-center space-x-2 text-lg font-semibold rounded-full"
      style={{
        backgroundColor: 'oklch(0.95 0.05 140)', // Light green background
        color: 'oklch(0.3 0.1 140)', // Dark green text (same as --green-title)
        border: '1px solid oklch(0.6 0.1 140)', // Medium green border
      }}
    >
      {/* Icon (Heart with Plus, here simulated with PlusCircle) */}
        <HeartPlus />
      <span>ADD APPOINTMENT</span>
    </Button>
        </div>
  )
}

export default DoctorsAssesment