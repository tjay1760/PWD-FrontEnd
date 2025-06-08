import React from 'react'
import AssessmentsTable from '../AssesmentsTable';
import { Button } from '../../../components/ui/button';
import { HeartPlus } from 'lucide-react'; // Assuming you have a HeartPlus icon in lucide-react
import toast from 'react-hot-toast';
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
    <div className="tables flex gap-6 border rounded-lg p-6">
        <div className="table-container">
            <h2 className="text-2xl font-bold mb-4">Doctors Assessments</h2>
            <AssessmentsTable />
        </div>
                <div className="table-container">
            <h2 className="text-2xl font-bold mb-4">PWD Flagged for Review</h2>
            <AssessmentsTable />
        </div>
    </div>
        </div>
  )
}

export default DoctorsAssesment