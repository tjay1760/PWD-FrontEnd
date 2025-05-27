import React from "react";
import registrationImage from "../assets/Form Image.png";
import wheelchairIcon from "../assets/Wheelchair man.png";
import guardianIcon from "../assets/guardian.svg";
import officerIcon from "../assets/officer.svg";
import personIcon from "../assets/person.svg";

const userType = [
  { id: 1, name: "Person With Disability", icon: personIcon },
  { id: 2, name: "Guardian", icon: guardianIcon },
  { id: 3, name: "Officer", icon: officerIcon },
];

const Registration = () => {
  const [selectedUserType, setSelectedUserType] = React.useState(null);
  const [showIdTooltip, setShowIdTooltip] = React.useState(false);
  const [showDobTooltip, setShowDobTooltip] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <div className="border flex p-10 gap-10">
      <img src={registrationImage} />
      <div className="registration-details flex flex-col gap-10">
        <div className="heading flex justify-center items-center gap-4">
          <img src={wheelchairIcon} />
          <h1 className="font-bold text-4xl averia-serif-libre">
            Person with Disability
            <span className="text-blue-900 block"> Medical System</span>
          </h1>
        </div>

        <div className="call-to-action text-xs space-y-1">
          <p>Register to the Persons With Disability (PWD) Medical System.</p>
          <p>
            Already have an account? &nbsp;
            <span className="text-blue-500">Login?</span>
          </p>
        </div>

        <div className="divider h-0.25 w-11/12 bg-gray-600 mx-auto"></div>

        <form className="flex flex-col gap-4">
          <div className="user-type-radios">
            <h1 className="averia-serif-libre text-blue-800">USER TYPE</h1>
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
            <div className="flex gap-2 border rounded-4xl p-2">
              <div className="number rounded-full h-6 w-6 flex items-center justify-center border">1</div>
              <h1>Bio Data</h1>
            </div>
            <div className="flex gap-2 border rounded-4xl p-2">
              <div className="number rounded-full h-6 w-6 flex items-center justify-center border">2</div>
              <h1>Contact and Background</h1>
            </div>
            <div className="flex gap-2 border rounded-4xl p-2">
              <div className="number rounded-full h-6 w-6 flex items-center justify-center border">3</div>
              <h1>Next of Kin</h1>
            </div>
          </div>

          {/* Step 1: Bio Data */}
          {step === 1 && (
            <>
              <div className="names">
                <h1 className="averia-serif-libre text-blue-800">FULL NAME</h1>
              </div>
              <div className="namefields flex gap-4">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  required
                  className="mb-2 p-2 border rounded "
                  placeholder="First Name *"
                />
                <input
                  type="text"
                  id="middlename"
                  name="middlename"
                  className="mb-2 p-2 border rounded"
                  placeholder="Middle Name (optional)"
                />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  required
                  className="mb-2 p-2 border rounded"
                  placeholder="Last Name *"
                />
              </div>

              <div className="identification">
                <h1 className="averia-serif-libre text-blue-800">IDENTIFICATION</h1>
                <div className="tooltip container relative inline-block w-full">
                  <div className="identification-fields flex gap-4">
                    <input
                      type="text"
                      id="national-id"
                      name="national-id"
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
                <h1 className="averia-serif-libre text-blue-800">DEMOGRAPHICS</h1>
                <div className="demographics-holder flex gap-4">
                  <select className="border rounded mb-2 p-2 w-full" id="gender" name="gender" required defaultValue="">
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
                      id="dob"
                      name="dob"
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
                  <select className="maritual-status border rounded mb-2 p-2 w-full">
                    <option value="" disabled>
                      Maritual Status
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
              {/* Contact Fields */}
              <div>
                <h3 className="averia-serif-libre text-blue-800 uppercase">Contact Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Mobile Number *"
                  />
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                      placeholder="Email Address"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <span className="text-xs text-gray-500 italic">“Recommended for notifications”</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="averia-serif-libre text-blue-800 uppercase">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select className="w-full border border-gray-300 rounded px-3 py-2">
                    <option>Nairobi</option>
                  </select>
                  <select className="w-full border border-gray-300 rounded px-3 py-2">
                    <option>Select</option>
                  </select>
                </div>
              </div>

              {/* Occupation */}
              <div>
                <h3 className="averia-serif-libre text-blue-800 uppercase">Occupation and Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder='e.g. “Teacher”, “Farmer”'
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <select className="w-full border border-gray-300 rounded px-3 py-2">
                    <option>Select</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Next of Kin */}
          {step === 3 && (
            <div className="w-full mx-auto p-4">
              <h2 className="averia-serif-libre text-blue-800 uppercase">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
                <select className="border border-gray-300 rounded-md px-4 py-2 w-full" defaultValue="">
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

          <div className="divider h-0.25 w-11/12 bg-gray-600 mx-auto"></div>

          <div className="back-next-buttons flex justify-between mt-4 averia-serif-libre">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`group relative flex items-center justify-center gap-2
                px-4 py-2 rounded-4xl border 
                transition-colors duration-300 ease-in-out
                ${
                  step > 1
                    ? "text-green-700 border-green-950 hover:bg-green-600 hover:text-white"
                    : "text-gray-400 border-gray-300 cursor-not-allowed"
                }`}
            >
              <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">
                &larr;
              </span>
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={step === 3}
              className={`group relative flex items-center justify-center gap-2
                text-green-700 border border-green-950 px-4 py-2 rounded-4xl
                overflow-hidden transition-colors duration-300 ease-in-out
                ${step < 3 ? "hover:bg-green-600 hover:text-white" : "cursor-not-allowed opacity-50"}`}
            >
              Next
              <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
