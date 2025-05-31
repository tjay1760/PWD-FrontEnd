import React from "react";
import { useState } from "react";

// Mock images for demonstration
import registrationImage from "../assets/Form Image.png";
import wheelchairIcon from "../assets/Wheelchair man.png";
import guardianIcon from "../assets/guardian.svg";
import officerIcon from "../assets/officer.svg";
import personIcon from "../assets/person.svg";
import ConfirmRegistrationModal from "./ConfirmRegistrationModal"; // Import the confirmation modal component
import ConfirmationDialog from "./ConfirmationDialog";
import Notification from "./ValidationNotification";


// Confirmation Modal Component

const userType = [
  { id: 1, name: "Person With Disability", icon: personIcon },
  { id: 2, name: "Guardian", icon: guardianIcon },
  { id: 3, name: "Officer", icon: officerIcon },
];

const Registration = ({onRegistrationComplete,onLoginClick}) => {
  const [selectedRoles, setSelectedRoles] = React.useState([]);
  const [showIdTooltip, setShowIdTooltip] = React.useState(false);
  const [showDobTooltip, setShowDobTooltip] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const [selectedOfficer, setSelectedOfficer] = React.useState(null); // This is for 'Medical Assessment Officer' or 'County Health Director'
  const [countyOfPractice, setCountyOfPractice] = useState('');
  const [subCounty, setSubCounty] = useState('');
  const [medicalFacility, setMedicalFacility] = useState('');
  const [medicalLicenceNumber, setMedicalLicenceNumber] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [showOfficerConfirmDialog, setShowOfficerConfirmDialog] = useState(false); // Controls the dialog for 'Officer' user type
  const [notification, setNotification] = useState({ message: '', type: '' });

   const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];
  const subCounties = {
    Nairobi: ['Langata', 'Dagoretti', 'Embakasi'],
    Mombasa: ['Kisauni', 'Nyali', 'Changamwe'],
    Kisumu: ['Kisumu Central', 'Nyando'],
    Nakuru: ['Nakuru Town East', 'Nakuru Town West']
  };
  const medicalFacilities = ['Kenyatta National Hospital', 'Aga Khan Hospital', 'Nairobi Hospital', 'Moi Teaching and Referral Hospital'];

  // Helper to render required asterisk
  const RequiredAsterisk = () => <span className="text-red-500">*</span>;
  
  const ValidateCurrentStep =() => {
    setNotification({ message: '', type: '' }); // Reset notification
    if (step === 1) {
       if (selectedRoles.length === 0) {
        setNotification({ message: 'Please select at least one user type.', type: 'error' });
        return false;
      }
       if (selectedRoles.includes("Officer") && !selectedOfficer) {
        setNotification({ message: 'Please select if you are a Medical Assessment Officer or County Health Director.', type: 'error' });
        return false;
      }
        if ((selectedRoles.includes("Guardian") || selectedRoles.includes("Person With Disability")) && (!formData.dateOfBirth)) {
        setNotification({ message: 'Gender and Date of Birth are required.', type: 'error' });
        return false;
      }
      // Validate Bio Data
      if (!formData.firstName || !formData.lastName || !formData.idNumber) {
        setNotification({ message: 'Please fill in all required fields in Bio Data.', type: 'error' });
        return false;
      }
    } else if (step === 2) {
      // Validate Contact and Background
      if (!formData.phoneNumber) {
        setNotification({ message: 'Please enter a valid phone number.', type: 'error' });
        return false;
      }
      if (selectedRoles.includes("Person With Disability") && !formData.county) {
        setNotification({ message: 'Please select your county.', type: 'error' });
        return false;
      }
      if (selectedRoles.includes("Person With Disability") && (!formData.county || !formData.subCounty)) {
        setNotification({ message: 'County and Sub-County are required for PWD.', type: 'error' });
        return false;
      }
      if (selectedRoles.includes("Officer")) {
          if (!countyOfPractice || !subCounty || !medicalFacility || !medicalLicenceNumber || !speciality) {
              setNotification({ message: 'All officer-specific fields (Region, Medical Details) are required.', type: 'error' });
              return false;
          }
      }
    } else if (step === 3 && selectedRoles.includes("Guardian") || selectedRoles.includes("Person With Disability")) {
      // Validate Next of Kin
      if (!formData.emergencyName || !formData.emergencyPhone) {
        setNotification({ message: 'Please fill in all required fields for Next of Kin.', type: 'error' });
        return false;
      }
    }
    return true; // All validations passed
  }
  // Form data state
  const [formData, setFormData] = React.useState({
    firstName: '',
    middleName: '',
    lastName: '',
    idNumber: '',
    gender: '',
    dateOfBirth: '',
    maritalStatus: '',
    phoneNumber: '',
    email: '',
    county: '',
    subCounty: '',
    occupation: '',
    education: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // MODIFIED toggleRole function
  const toggleRole = (role) => {
    if (role === "Officer") {
      // If 'Officer' is being selected, show the dialog
      if (!selectedRoles.includes("Officer")) {
        setShowOfficerConfirmDialog(true); // Show dialog first
      } else {
        // If 'Officer' is being deselected, clear selection and hide dialog
        setSelectedRoles([]);
        setShowOfficerConfirmDialog(false);
      }
    } else {
      // Prevent selecting Person/Guardian if Officer is already selected
      if (selectedRoles.includes("Officer")) return;

      // Toggle Person or Guardian
      setSelectedRoles(prev =>
        prev.includes(role)
          ? prev.filter(r => r !== role)
          : [...prev, role]
      );
    }
  };

const handleFinalNext = () => {
  setShowConfirmModal(true);
};

// Properly define handleNext as a function
const handleNext = () => {
  if (ValidateCurrentStep()) {
    if (step === 3) {
      handleFinalNext();
    } else {
      setStep((prev) => prev + 1);
    }
  }
};

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleModalSubmit = () => {
    setShowConfirmModal(false);
    const finalData = {
    userType: selectedRoles,
    ...formData,
    // Include officer-specific fields only if 'Officer' is selected
   ...(selectedRoles.includes("Officer") && {
          officerType: selectedOfficer, // 'Medical Assessment Officer' or 'County Health Director'
          countyOfPractice: countyOfPractice,
          subCounty: subCounty, // This is the officer's subCounty if distinct
          medicalFacility: medicalFacility,
          medicalLicenceNumber: medicalLicenceNumber,
          speciality: speciality,
      })
    }
    if (onRegistrationComplete){
        onRegistrationComplete(finalData); 
    }
  };

  // This function should NOT trigger the main officer dialog anymore.
  // It's for the sub-selection (Medical Assessment Officer / County Health Director)
  const handleOfficerRoleChange = (role) => {
    setSelectedOfficer(role);
    // You could potentially add another specific dialog here if needed for THESE sub-roles,
    // but not the main "Officer" user type confirmation.
  };

  // MODIFIED handleOfficerConfirm: User confirmed 'Officer' role
  const handleOfficerConfirm = () => {
    console.log("User confirmed Officer role selection.");
    setSelectedRoles(["Officer"]); // Officially select the 'Officer' role
    setShowOfficerConfirmDialog(false); // Close the dialog
    setSelectedOfficer(null); // Clear sub-officer selection when main officer role is confirmed
  };

  // MODIFIED handleOfficerCancel: User cancelled 'Officer' role
  const handleOfficerCancel = () => {
    console.log("User cancelled Officer role selection. Reverting.");
    setSelectedRoles([]); // Ensure 'Officer' is not selected
    setShowOfficerConfirmDialog(false); // Close the dialog
    setSelectedOfficer(null); // Ensure sub-officer selection is also cleared
  };

  return (
    <div className="border flex p-10 gap-10">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <img src={registrationImage} alt="Registration" />
      <div className="registration-details flex flex-col gap-10">
        <div className="heading flex justify-center items-center gap-4">
          <img src={wheelchairIcon} alt="Wheelchair" />
          <h1 className="font-bold text-4xl">
            Person with Disability
            <span className="text-blue-900 block"> Medical System</span>
          </h1>
        </div>

        <div className="call-to-action text-xs space-y-1">
          <p>Register to the Persons With Disability (PWD) Medical System.</p>
          <p>
            Already have an account? &nbsp;
            <span className="text-blue-500 cursor-pointer"
            onClick={() => {
              if (onLoginClick) {
                onLoginClick(); // Call the parent function to handle login
              }
            }}
            >Login?</span>
          </p>
        </div>

        <div className="divider h-0.5 w-11/12 bg-gray-600 mx-auto"></div>

        <div className="flex flex-col gap-4">
         <div className="user-type-radios">
  <h1 className="text-blue-800 font-semibold">USER TYPE</h1>
  <div className="user-type flex gap-4 flex-wrap">
    {userType.map((user) => {
      const isSelected = selectedRoles.includes(user.name);
      const isDisabled =
        selectedRoles.includes("Officer") && user.name !== "Officer" ||
        selectedRoles.length > 0 && selectedRoles.includes(user.name) === false && user.name === "Officer";

      return (
        <div
          key={user.id}
          className={`flex items-center gap-2 border px-4 py-2 rounded-full cursor-pointer transition ${
            isSelected ? "border-green-600 text-green-700" : "border-gray-300"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => {
            if (!isDisabled) toggleRole(user.name); // <--- toggleRole now handles the dialog trigger for "Officer"
          }}
        >
<input
  type="checkbox"
  checked={isSelected}
  readOnly
  className="w-4 h-4 rounded-full cursor-pointer appearance-none border border-gray-400 checked:bg-green-600 checked:border-transparent focus:outline-none"
/>
          <img src={user.icon} alt={user.name} className="w-5 h-5" />
          <label className="text-sm">{user.name}</label>
        </div>
      );
    })}
  </div>
</div>


          <div className="sections flex gap-4">
            <div className={`flex gap-2 border rounded-full p-2 ${step >= 1 ? 'bg-green-50 border-green-300' : ''}`}>
              <div className={`number rounded-full h-6 w-6 flex items-center justify-center border text-sm ${step >= 1 ? 'bg-green-600 text-white border-green-600' : ''}`}>1</div>
              <h1 className="text-sm">Bio Data</h1>
            </div>
            <div className={`flex gap-2 border rounded-full p-2 ${step >= 2 ? 'bg-green-50 border-green-300' : ''}`}>
              <div className={`number rounded-full h-6 w-6 flex items-center justify-center border text-sm ${step >= 2 ? 'bg-green-600 text-white border-green-600' : ''}`}>2</div>
              <h1 className="text-sm">Contact and Background</h1>
            </div>
            {
              selectedRoles.includes("Person With Disability") &&
 <div className={`flex gap-2 border rounded-full p-2 ${step >= 3 ? 'bg-green-50 border-green-300' : ''}`}>
              <div className={`number rounded-full h-6 w-6 flex items-center justify-center border text-sm ${step >= 3 ? 'bg-green-600 text-white border-green-600' : ''}`}>3</div>
              <h1 className="text-sm">Next of Kin</h1>
            </div>
            }
           
          </div>

          {/* Step 1: Bio Data */}
          {step === 1 && (
            <>
            {
              selectedRoles.includes("Officer") && <div className="flex flex-col gap-4">
      {/* Question Heading */}
      <h3 className="text-lg font-semibold text-green-800">
        Are you a Medical Assessment Officer or a County Health Director?
      </h3>

      {/* Checkbox Container */}
      <div className=" p-4 rounded-md flex gap-8">
        {/* Medical Assessment Officer Checkbox */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="officerRole"
            value="Medical Assessment Officer"
            checked={selectedOfficer === 'Medical Assessment Officer'}
            onChange={() => handleOfficerRoleChange('Medical Assessment Officer')} // This now just sets selectedOfficer state
            className="form-checkbox h-4 w-4 text-green-600 rounded" 
          />
          <span className="text-gray-800">Medical Assessment Officer</span>
        </label>

        {/* County Health Director Checkbox */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="officerRole"
            value="County Health Director"
            checked={selectedOfficer === 'County Health Director'}
            onChange={() => handleOfficerRoleChange('County Health Director')}
            className="form-checkbox h-4 w-4 text-green-600 rounded"
          />
          <span className="text-gray-800">County Health Director</span>
        </label>
      </div>

     
     
    </div>
            }
              <div className="names">
                <h1 className="text-blue-800 font-semibold">FULL NAME</h1>
              </div>
              <div className="namefields flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mb-2 p-2 border rounded "
                  placeholder="First Name *"
                />
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="mb-2 p-2 border rounded"
                  placeholder="Middle Name (optional)"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mb-2 p-2 border rounded"
                  placeholder="Last Name *"
                />
              </div>

              <div className="identification">
                <h1 className="text-blue-800 font-semibold">IDENTIFICATION</h1>
                <div className="tooltip container relative inline-block w-full">
                  <div className="identification-fields flex gap-4">
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      required
                      className="mb-2 p-2 border rounded w-full"
                      placeholder="National ID Number *"
                      onMouseEnter={() => setShowIdTooltip(true)}
                      onMouseLeave={() => setShowIdTooltip(false)}
                    />
                    {showIdTooltip && (
                      <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-90">
                        Enter your ID or Passport Number
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
{          !selectedRoles.includes("Officer") && 
   <div className="demographics">
                <h1 className="text-blue-800 font-semibold">DEMOGRAPHICS</h1>
                <div className="demographics-holder flex gap-4">
                  <select 
                    className="border rounded mb-2 p-2 w-full" 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="Male">MALE</option>
                    <option value="Female">FEMALE</option>
                    <option value="Other">OTHER</option>
                  </select>
                  <div className="relative inline-block w-full">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="mb-2 p-2 border rounded w-full"
                      onMouseEnter={() => setShowDobTooltip(true)}
                      onMouseLeave={() => setShowDobTooltip(false)}
                    />
                    {showDobTooltip && (
                      <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2 text-sm text-white bg-gray-800 rounded shadow-lg opacity-90">
                        Select your Date of Birth
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
                      </div>
                    )}
                  </div>
                  {
selectedRoles.includes("Person With Disability") && <select 
                    className="maritual-status border rounded mb-2 p-2 w-full"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Marital Status
                    </option>
                    <option value="Single">SINGLE</option>
                    <option value="Married">MARRIED</option>
                    <option value="Divorced">DIVORCED</option>
                    <option value="Widowed">WIDOWED</option>
                    <option value="Separated">SEPARATED</option>
                    <option value="Other">OTHER</option>
                  </select>
                  }
                  
                </div>
              </div>
}
             
            </>
          )}

          {/* Step 2: Contact and Background */}
          {step === 2 && (
            <div className="mx-auto p-6 bg-white w-full contact-details">
              <div>
                <h3 className="text-blue-800 font-semibold uppercase">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Mobile Number *"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              {
                selectedRoles.includes("Person With Disability") &&<div>
                <h3 className="text-blue-800 font-semibold uppercase">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                  >
                    <option value="">Select County</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kisumu">Kisumu</option>
                  </select>
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    name="subCounty"
                    value={formData.subCounty}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sub County</option>
                    <option value="Westlands">Westlands</option>
                    <option value="Kasarani">Kasarani</option>
                    <option value="Langata">Langata</option>
                  </select>
                </div>
              </div>
              }
              
{!selectedRoles.includes("Officer")
&& 
 <div>
                <h3 className="text-blue-800 font-semibold uppercase">Occupation and Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder='e.g. "Teacher", "Farmer"'
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Education Level</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Tertiary">Tertiary</option>
                    <option value="University">University</option>
                  </select>
                </div>
              </div>
}
             {
              selectedRoles.includes("Officer") &&  <div className="p-6 bg-white rounded-lg shadow-md">
      {/* REGION Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4 uppercase">Region</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* County of Practice */}
          <div>
            <label htmlFor="countyOfPractice" className="sr-only">County of Practice</label>
            <select
              id="countyOfPractice"
              name="countyOfPractice"
              value={countyOfPractice}
              onChange={(e) => setCountyOfPractice(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            >
              <option value="" disabled>County of Practice<RequiredAsterisk /></option>
              {counties.map(county => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>

          {/* Sub-County */}
          <div>
            <label htmlFor="subCounty" className="sr-only">Sub-County</label>
            <select
              id="subCounty"
              name="subCounty"
              value={subCounty}
              onChange={(e) => setSubCounty(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              disabled={!countyOfPractice} // Disable if no county is selected
            >
              <option value="" disabled>Sub-County</option>
              {countyOfPractice && subCounties[countyOfPractice]?.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Medical Facility */}
          <div>
            <label htmlFor="medicalFacility" className="sr-only">Medical Facility</label>
            <select
              id="medicalFacility"
              name="medicalFacility"
              value={medicalFacility}
              onChange={(e) => setMedicalFacility(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            >
              <option value="" disabled>Medical Facility<RequiredAsterisk /></option>
              {medicalFacilities.map(facility => (
                <option key={facility} value={facility}>{facility}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MEDICAL DETAILS Section */}
      <div>
        <h2 className="text-xl font-bold text-blue-800 mb-4 uppercase">Medical Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Medical Licence Number */}
          <div>
            <label htmlFor="medicalLicenceNumber" className="sr-only">Medical Licence Number</label>
            <input
              type="text"
              id="medicalLicenceNumber"
              name="medicalLicenceNumber"
              value={medicalLicenceNumber}
              onChange={(e) => setMedicalLicenceNumber(e.target.value)}
              placeholder="Medical Licence Number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Speciality */}
          <div>
            <label htmlFor="speciality" className="sr-only">Speciality</label>
            <input
              type="text"
              id="speciality"
              name="speciality"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              placeholder='Speciality e.g. "Orthopaedic Surgeon"'
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
     
    </div>
             }
            </div>
          )}

          {/* Step 3: Next of Kin */}
          {step === 3 && selectedRoles.includes("Guardian")||selectedRoles.includes("Person With Disability")&& (
            <div className="w-full mx-auto p-4">
              <h2 className="text-blue-800 font-semibold uppercase">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                <select 
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  name="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Relationship</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                  <option value="spouse">Spouse</option>
                  <option value="other">Other</option>
                </select>
                <div className="relative col-span-1 md:col-span-2">
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Mobile Number"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full pr-10"
                    required
                  />
                  <div className="absolute top-2 right-2 group cursor-pointer">
                    <span className="text-gray-600 font-bold">ℹ️</span>
                    <div className="absolute top-full right-0 mt-1 w-64 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      This is required for validation purposes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="divider h-0.5 w-11/12 bg-gray-600 mx-auto"></div>

          <div className="back-next-buttons flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`group relative flex items-center justify-center gap-2
                px-4 py-2 rounded-full border
                transition-colors duration-300 ease-in-out
                ${
                  step > 1
                    ? "text-green-700 border-green-950 hover:bg-green-600 hover:text-white"
                    : "text-gray-400 border-gray-300 cursor-not-allowed"
                }`}
            >
              <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">
                ←
              </span>
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className={`group relative flex items-center justify-center gap-2
                text-green-700 border border-green-950 px-4 py-2 rounded-full
                overflow-hidden transition-colors duration-300 ease-in-out
                hover:bg-green-600 hover:text-white cursor-pointer`}
            >
              {step === 3 ? "Finish" : "Next"} 
              <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
      {console.log("selected type",selectedRoles)}

      {showConfirmModal && (
        <ConfirmRegistrationModal
          data={{
            userType: selectedRoles,
            ...formData
          }}
          onClose={() => setShowConfirmModal(false)}
          onSubmit={handleModalSubmit}
          onRegistrationComplete
        />
      )}
      {showOfficerConfirmDialog && (
        <ConfirmationDialog
          // Updated message to reflect the 'Officer' user type selection
          message="Are you sure you want to register as an Officer? This will set your profile to Officer-specific fields."
          onConfirm={handleOfficerConfirm}
          onCancel={handleOfficerCancel}
        />
      )}
    </div>
  );
};

export default Registration;