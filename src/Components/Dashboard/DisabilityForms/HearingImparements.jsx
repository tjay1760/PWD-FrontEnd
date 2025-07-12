import React, { useState } from "react";
import wheelChairMan from "../../../assets/Wheelchair man.png";
import { format } from "date-fns";


const API_BASE_URL = "http://localhost:5000/api/assessments/submit/";

// Accept onSubmissionSuccess and onSubmissionError directly
const HearingImpairments = ({ userData, onSubmissionSuccess, onSubmissionError }) => {
  const [formData, setFormData] = useState({
    facilityName: userData?.user?.hospital || "Mama Lucy Kibaki Hospital",
    assessmentDate: format(Date.now(), "yyyy-MM-dd"),
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
      if (name.includes('.')) {
        const [parent, child, grandChild] = name.split('.');
        if (grandChild) {
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
        } else if (child) {
          return {
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: value,
            },
          };
        }
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    // setOpenSnackbar(false); // No longer needed here

    try {
      const assessmentData = {
        formData,
        comments: "Assessment completed by medical officer",
        digitalSignature: true,
        uploadedReports: []
      };

      console.log("Submitting assessment:", assessmentData);

      const response = await fetch(`${API_BASE_URL}${userData.user.assesmentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(assessmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Assessment submitted successfully:", data);

      // Call the parent's success handler, passing the message
      if (onSubmissionSuccess) {
        onSubmissionSuccess("Assessment submitted successfully!");
      }

    } catch (error) {
      console.error("Error submitting assessment:", error);
      // Call the parent's error handler, passing the message
      if (onSubmissionError) {
        onSubmissionError(`Failed to submit assessment: ${error.message}`);
      }
    }
  };

  // Remove handleCloseSnackbar here
  // const handleCloseSnackbar = (event, reason) => { ... };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* ... (rest of your form JSX) ... */}
      <div className="items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          <img src={wheelChairMan} alt="Wheelchair Man" /> {/* Added alt attribute */}
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Persons With Disability
            </h1>
            <p className="text-blue-600 font-medium">Medical System</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-blue-700 text-center mb-8">
          ASSESSMENT FOR HEARING IMPAIRMENTS {/* Corrected the title to match component name */}
        </h2>

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

        <h3 className="text-blue-900 font-medium text-sm mb-1">CONTACT DETAILS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            value={formData.patientFullName}
            className="border rounded px-3 py-2 w-full"
            readOnly
          />
          <input
            readOnly
            type="text"
            value={formData.patientPhone}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">History</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 w-1/3">
                    History of Hearing Loss
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 w-2/3">
                    <input
                      type="text"
                      name="historyOfHearingLoss"
                      value={formData.historyOfHearingLoss}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 w-1/3">
                    History of Hearing Devices Usage
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 w-2/3">
                    <input
                      type="text"
                      name="historyOfHearingDeviceUsage"
                      value={formData.historyOfHearingDeviceUsage}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3">
            3.0 Hearing Test Results
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Hearing Test
                  </th>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Right Ear
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Left Ear
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Type of Hearing Loss
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="typeOfHearingLoss.rightEar"
                      value={formData.typeOfHearingLoss.rightEar}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="typeOfHearingLoss.leftEar"
                      value={formData.typeOfHearingLoss.leftEar}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Degree (Grade) of Hearing Loss
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="degreeOfHearingLoss.right"
                      value={formData.degreeOfHearingLoss.right}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="degreeOfHearingLoss.left"
                      value={formData.degreeOfHearingLoss.left}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3">
            4.0 Calculation of Hearing Disability
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                    Ear
                  </th>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                    Hearing Level in dBHL
                  </th>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                    Monaural Percentage of Disability
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                    Overall (Binaural) Percentage of Disability
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Right
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="hearingDisability.rightEar.hearingLevel"
                      value={formData.hearingDisability.rightEar.hearingLevel}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="hearingDisability.rightEar.monauralDisability"
                      value={formData.hearingDisability.rightEar.monauralDisability}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td
                    rowSpan="2" // Corrected from 'rowspan'
                    className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700"
                  >
                    <input
                      type="text"
                      name="hearingDisability.binauralDisability"
                      value={formData.hearingDisability.binauralDisability}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Left
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="hearingDisability.leftEar.hearingLevel"
                      value={formData.hearingDisability.leftEar.hearingLevel}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="hearingDisability.leftEar.monauralDisability"
                      value={formData.hearingDisability.leftEar.monauralDisability}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Conclusion:</h3>

          <div className="mt-8 mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-2">
              RECOMMENDED ASSISTIVE
              PRODUCT(S)........................................
            </p>
            <input
              type="text"
              name="recomendedAssistiveProduct"
              value={formData.recomendedAssistiveProduct}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-2">
              OTHER REQUIRED
              SERVICES................................................
            </p>
            <input
              type="text"
              name="otherRequiredServices"
              value={formData.otherRequiredServices}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 bg-white cursor-pointer">
            <input
              type="radio"
              name="disabilityType"
              value="temporary"
              checked={formData.disabilityType === "temporary"}
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
              checked={formData.disabilityType === "permanent"}
              onChange={handleInputChange}
              className="form-radio text-green-600 focus:ring-green-500"
            />
            Permanent
          </label>
        </div>
      </div>

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
      {/* Remove Snackbar JSX from here */}
    </div>
  );
};

export default HearingImpairments;