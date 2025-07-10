import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";

const HearingImparements = ({ userData }) => {
  const [formData, setFormData] = useState({
    facilityName: userData?.user?.hospital || "Mama Lucy Kibaki Hospital",
    assessmentDate: format(Date.now(), "yyyy-MM-dd"), // Format for consistent date storage
    patientFullName: userData?.user?.fullName || "",
    patientPhone: userData?.user?.phone || "",
    historyOfHearingLoss: "",
    historyOfHearingDeviceUsage: "",
    typeOfHearingLoss: {
      rightEar: "",
      leftEar: "",
    },
    degreeOfHearingLoss:{
      right: "",
      left: ""
    },
    hearingDisability: {
      rightEar: {
        hearingLevel: "",
        monauralDisability: ""
      },
       leftEar: {
        hearingLevel: "",
        monauralDisability: "",
      },
      binauralDisability:""
    },
    recomendedAssistiveProduct: "",
    otherRequiredServices: "",
    disabilityType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // Handle nested properties
      if (name.includes('.')) {
        const [parent, child, grandChild] = name.split('.'); // Split name by '.'
        if (grandChild) { // Handles deeply nested like hearingDisability.rightEar.hearingLevel
          return {
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: {
                ...prev[parent][child],
                [grandChild]: value,
              },
            },
          };
        } else if (child) { // Handles nested like typeOfHearingLoss.rightEar
          return {
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: value,
            },
          };
        }
      }
      // Handle top-level properties
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, formData contains all the collected data in the desired JSON structure
    console.log("Payload to be sent to backend:", JSON.stringify(formData, null, 2));
    // In a real application, you would send this 'formData' object to your backend API
    // Example: fetch('/api/chronic-disorders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    alert("Form data logged to console. Check your browser's developer tools!");
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
                readOnly
                name="facilityName"
                value={formData.facilityName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Health Facility Name"
              />
            </div>
            <div className="relative">
              <input
                readOnly
                type="text"
                name="assessmentDate"
                value={formData.assessmentDate}
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
            value={formData.patientFullName}
            class="border rounded px-3 py-2 w-full"
            readOnly
          />
          <input
            readOnly
            type="text"
            value={formData.patientPhone}
            class="border rounded px-3 py-2 w-full"
          />
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-bold text-gray-800 mb-3">History</h3>
          <div class="overflow-x-auto mb-6">
            <table class="min-w-full bg-white border border-gray-300">
              <tbody>
                <tr>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 w-1/3">
                    History of Hearing Loss
                  </td>
                  <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 w-2/3">
                    <input
                      type="text"
                      name="historyOfHearingLoss"
                      value={formData.historyOfHearingLoss}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 w-1/3">
                    History of Hearing Devices Usage
                  </td>
                  <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 w-2/3">
                    <input
                      type="text"
                      name="historyOfHearingDeviceUsage"
                      value={formData.historyOfHearingDeviceUsage}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-lg font-bold text-gray-800 mb-3">
            3.0 Hearing Test Results
          </h3>
          <div class="overflow-x-auto mb-6">
            <table class="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Hearing Test
                  </th>
                  <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Right Ear
                  </th>
                  <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Left Ear
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Type of Hearing Loss
                  </td>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="typeOfHearingLoss.rightEar" 
                      value={formData.typeOfHearingLoss.rightEar}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="typeOfHearingLoss.leftEar" 
                      value={formData.typeOfHearingLoss.leftEar}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Degree (Grade) of Hearing Loss
                  </td>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="degreeOfHearingLoss.right" 
                      value={formData.degreeOfHearingLoss.right}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="degreeOfHearingLoss.left" 
                      value={formData.degreeOfHearingLoss.left}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 class="text-lg font-bold text-gray-800 mb-3">
            4.0 Calculation of Hearing Disability
          </h3>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                    Ear
                  </th>
                  <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                    Hearing Level in dBHL
                  </th>
                  <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                    Monaural Percentage of Disability
                  </th>
                  <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                    Overall (Binaural) Percentage of Disability
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Right
                  </td>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="hearingDisability.rightEar.hearingLevel" 
                      value={formData.hearingDisability.rightEar.hearingLevel}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="hearingDisability.rightEar.monauralDisability" 
                      value={formData.hearingDisability.rightEar.monauralDisability}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td
                    rowspan="2"
                    class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700"
                  >
                    <input
                      type="text"
                      name="hearingDisability.binauralDisability" 
                      value={formData.hearingDisability.binauralDisability}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Left
                  </td>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="hearingDisability.leftEar.hearingLevel" 
                      value={formData.hearingDisability.leftEar.hearingLevel}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="hearingDisability.leftEar.monauralDisability" 
                      value={formData.hearingDisability.leftEar.monauralDisability}
                      onChange={handleInputChange}
                      class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
              name="recomendedAssistiveProduct" 
              value={formData.recomendedAssistiveProduct}
              onChange={handleInputChange}
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
              name="otherRequiredServices" 
              value={formData.otherRequiredServices}
              onChange={handleInputChange}
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
              checked={formData.disabilityType === "temporary"} // Add checked prop
              onChange={handleInputChange}
              className="form-radio text-green-600 focus:ring-green-500"
            />
            Temporary
          </label>

          <label className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 bg-white cursor-pointer">
            <input
              type="radio"
              name="disabilityType"
              value="permanent"
              checked={formData.disabilityType === "permanent"} // Add checked prop
              onChange={handleInputChange}
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
          onClick={handleSubmit}
          className="w-full max-w-md px-8 py-3 bg-green-100 text-green-800 font-medium rounded-full border border-green-300 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          SUBMIT FOR PEER REVIEW
          <span className="text-green-600">→</span>
        </button>
      </div>
    </div>
  );
};

export default HearingImparements;