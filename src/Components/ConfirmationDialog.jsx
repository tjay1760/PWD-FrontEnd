import React from 'react';
import wheelchairIcon from "../assets/Wheelchair man.png";
// Remove <assets /> line, it's not valid JSX

// This component will now accept props for flexibility
export default function ConfirmationDialog({ message, onConfirm, onCancel }) { // <--- MODIFICATION 1: ACCEPT PROPS
  const handleProceed = () => {
    console.log('Proceeding to Medical Health Assessment Officer Registration Page');
    onConfirm(); // <--- MODIFICATION 2: CALL onConfirm PROP
  };

  const handleGoBack = () => {
    console.log('Going back - data preserved');
    onCancel(); // <--- MODIFICATION 3: CALL onCancel PROP
  };

  return (
    // <--- MODIFICATION 4: ADD OVERLAY STYLING FOR POPUP EFFECT
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-2 border-blue-300 rounded-lg shadow-lg max-w-md w-full p-8 relative"> {/* relative added for potential future absolute children */}
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              {/* Wheelchair icon */}
              <img src={wheelchairIcon} alt="Wheelchair Icon" className="h-16 w-16 rounded-full border-2 border-blue-500" />
            </div>
          </div>
          
          <h1 className="text-lg font-semibold text-gray-800 mb-1">
            Persons With Disability
          </h1>
          <p className="text-blue-600 font-medium text-lg">Medical System</p>
        </div>

        {/* Confirmation Section */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-6">Please Confirm</h2>
          
          {/* Use the message prop here */}
          <div className="text-gray-700 space-y-2 mb-2">
            <p>{message}</p> {/* <--- MODIFICATION 5: USE message PROP */}
          </div>
          
          <p className="text-red-600 font-semibold">
            You will lose any unsaved data!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleProceed}
            className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-3 px-6 rounded-full border border-green-300 transition-colors duration-200"
          >
            YES... PROCEED
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
          >
            NO... TAKE ME BACK
          </button>
        </div>
      </div>
    </div>
  );
}