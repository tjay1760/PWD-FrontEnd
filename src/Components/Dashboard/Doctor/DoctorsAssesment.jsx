import React from 'react'
import AssessmentsTable from '../AssesmentsTable';
import PWD_Profile from '../PWD/PWD_Profile';
import { Button } from '../../../components/ui/button';
import { HeartPlus } from 'lucide-react'; // Assuming you have a HeartPlus icon in lucide-react
import toast from 'react-hot-toast';
// import VisualImpairements from '../DisabilityForms/VisualImpairements';
// import SpeechImparements from '../DisabilityForms/SpeechImparements';
// import PhysicalDisability from '../DisabilityForms/PhysicalDisability';
// import MentalImparements from '../DisabilityForms/MentalImparements';
import MaxillofacialImparements from '../DisabilityForms/MaxillofacialImparements';
const DoctorsAssesment = () => {
    const handleClick = () => {

    // You might want to show a toast notification:
    toast("Creating Appointment...");
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
    <div className="forms">
  <MaxillofacialImparements />
    </div>
   
   
        </div>
  )
}

export default DoctorsAssesment