import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";
const MaxillofacialImparements = ({userData}) => {
  const [formData, setFormData] = useState({
    facilityName: "Mama Lucy Kibaki Hospital",
    assessmentDate: "2025-06-09",
    firstName: "Antony",
    middleName: "Kiogora",
    lastName: "Kaburu",
    idNumber: "12345678",
    gender: "Male",
    dateOfBirth: "2005-12-09",
    maritalStatus: "Married",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Header */}
      <div className="items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          <img src={wheelChairMan} />
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Persons With Disability
            </h1>
            <p className="text-blue-600 font-medium">Medical System</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-blue-700 text-center mb-8">
          ASSESSMENT FOR MAXILLOFACIAL DISABILITIES
        </h2>

        {/* Health Facility and Date Section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-4">
            Name of Health Facility and Assessment Date
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="facilityName"
                value={userData.user.hospital}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Health Facility Name"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                name="assessmentDate"
                value={format(Date.now(),"dd MMMM yyyy")}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
     
            </div>
          </div>
        </div>

        {/* Applicant Information Section */}


        <h3 class="text-blue-900 font-medium text-sm mb-1">CONTACT DETAILS</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            value={userData.user.fullName}
            class="border rounded px-3 py-2 w-full"
          />
          <input
            type="email"
            value={userData.user.phone}
            class="border rounded px-3 py-2 w-full"
          />
        </div>




    

        <div class="mb-4">
          <h3 class="text-lg font-bold text-gray-800 mb-3">SUMMARY FINDINGS</h3>

          <div class="mb-6">
            <p class="block text-gray-700 text-sm font-medium bg-gray-100 py-2 px-3 border border-gray-300 rounded-t-md">
              Medical History
            </p>
            <textarea
              name="medicalHistory"
              rows="6"
              class="mt-0 block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div class="mb-6">
            <p class="block text-gray-700 text-sm font-medium bg-gray-100 py-2 px-3 border border-gray-300 rounded-t-md">
              Dental History
            </p>
            <textarea
              name="dentalHistory"
              rows="6"
              class="mt-0 block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div class="mb-4">
            <p class="block text-gray-700 text-sm font-medium bg-gray-100 py-2 px-3 border border-gray-300 rounded-t-md">
              Dental Assessment
            </p>
            <textarea
              name="dentalAssessment"
              rows="6"
              class="mt-0 block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
        </div>

        {/* Conclusion Section */}
        <div class="mb-4">
          <h3 class="text-lg font-bold text-gray-800 mb-3">Conclusion:</h3>

          <div class="mt-8 mb-4">
            <p class="block text-gray-700 text-sm font-medium mb-2">
              RECOMMENDED ASSISTIVE
              PRODUCT(S)........................................
            </p>
            <input
              type="text"
              name="recommendedAssistiveProductsConclusion"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div class="mb-4">
            <p class="block text-gray-700 text-sm font-medium mb-2">
              OTHER REQUIRED
              SERVICES................................................
            </p>
            <input
              type="text"
              name="otherRequiredServicesConclusion"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
   
        {/* Disability Type Selection permanent temporary*/}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 bg-white cursor-pointer">
            <input
              type="radio"
              name="disabilityType"
              value="temporary"
              className="form-radio text-green-600 focus:ring-green-500"
            />
            Temporary
          </label>

          <label className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 bg-white cursor-pointer">
            <input
              type="radio"
              name="disabilityType"
              value="permanent"
              className="form-radio text-green-600 focus:ring-green-500"
            />
            Permanent
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          className="w-full max-w-md px-8 py-3 bg-green-100 text-green-800 font-medium rounded-full border border-green-300 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          SUBMIT FOR PEER REVIEW
          <span className="text-green-600">→</span>
        </button>
      </div>
    </div>
  );
};

export default MaxillofacialImparements;
