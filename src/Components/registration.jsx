import React from "react";

// Mock images for demonstration
import registrationImage from "../assets/Form Image.png";
import wheelchairIcon from "../assets/Wheelchair man.png";
import guardianIcon from "../assets/guardian.svg";
import officerIcon from "../assets/officer.svg";
import personIcon from "../assets/person.svg";
import ConfirmRegistrationModal from "./ConfirmRegistrationModal"; // Import the confirmation modal component

// Confirmation Modal Component

const userType = [
  { id: 1, name: "Person With Disability", icon: personIcon },
  { id: 2, name: "Guardian", icon: guardianIcon },
  { id: 3, name: "Officer", icon: officerIcon },
];

const Registration = ({onRegistrationComplete}) => {
  const [selectedUserType, setSelectedUserType] = React.useState(null);
  const [showIdTooltip, setShowIdTooltip] = React.useState(false);
  const [showDobTooltip, setShowDobTooltip] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  
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

  const handleFinalNext = () => {
    setShowConfirmModal(true);
  };

  const handleNext = () => {
    if (step === 3) {
      handleFinalNext();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleModalSubmit = () => {
    setShowConfirmModal(false);
    console.log("Form confirmed and submitted!", { 
      userType: selectedUserType, 
      ...formData 
    });
    if (onRegistrationComplete){
        onRegistrationComplete(); // Call the completion handler passed from App component
    }

    // Here you would typically submit to your backend
  };

  return (
    <div className="border flex p-10 gap-10">
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
            <span className="text-blue-500 cursor-pointer">Login?</span>
          </p>
        </div>

        <div className="divider h-0.5 w-11/12 bg-gray-600 mx-auto"></div>

        <div className="flex flex-col gap-4">
          <div className="user-type-radios">
            <h1 className="text-blue-800 font-semibold">USER TYPE</h1>
            <div className="user-type flex gap-4">
              {userType.map((user) => (
                <div
                  key={user.id}
                  className={`flex gap-2 items-center border py-2 px-4 rounded cursor-pointer ${
                    selectedUserType === user.name
                      ? "border-green-600 text-green-700"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedUserType(user.name)}
                >
                  <img src={user.icon} alt={user.name} className="w-6 h-6" />
                  <label
                    htmlFor={user.name}
                    className={`text-sm ${
                      selectedUserType === user.name ? "text-green-700" : ""
                    }`}
                  >
                    {user.name}
                  </label>
                  <input
                    type="radio"
                    id={user.name}
                    name="user-type"
                    value={user.name}
                    checked={selectedUserType === user.name}
                    onChange={() => setSelectedUserType(user.name)}
                    className="w-4 h-4 accent-green-600"
                  />
                </div>
              ))}
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
            <div className={`flex gap-2 border rounded-full p-2 ${step >= 3 ? 'bg-green-50 border-green-300' : ''}`}>
              <div className={`number rounded-full h-6 w-6 flex items-center justify-center border text-sm ${step >= 3 ? 'bg-green-600 text-white border-green-600' : ''}`}>3</div>
              <h1 className="text-sm">Next of Kin</h1>
            </div>
          </div>

          {/* Step 1: Bio Data */}
          {step === 1 && (
            <>
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
                  <select 
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
                </div>
              </div>
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

              <div>
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
            </div>
          )}

          {/* Step 3: Next of Kin */}
          {step === 3 && (
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

      {showConfirmModal && (
        <ConfirmRegistrationModal
          data={{
            userType: selectedUserType,
            ...formData
          }}
          onClose={() => setShowConfirmModal(false)}
          onSubmit={handleModalSubmit}
          onRegistrationComplete
        />
      )}
    </div>
  );
};

export default Registration;