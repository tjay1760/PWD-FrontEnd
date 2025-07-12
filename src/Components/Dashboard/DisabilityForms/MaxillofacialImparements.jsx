import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";

const API_BASE_URL = "http://localhost:5000/api/assessments/submit/";

const MaxillofacialImparements = ({ userData, onSubmissionSuccess, onSubmissionError }) => {
  const [formData, setFormData] = useState({
    facilityName: userData?.user?.hospital || "Mama Lucy Kibaki Hospital", // Use userData for initial values
    assessmentDate: format(Date.now(), "yyyy-MM-dd"), // Format current date
    patientFullName: userData?.user?.fullName || "", // Use userData for initial values
    patientPhone: userData?.user?.phone || "", // Use userData for initial values
    medicalHistory: "",
    dentalHistory: "",
    dentalAssessment: "",
    recommendedAssistiveProducts: "", // Corrected name to match common practice
    otherRequiredServices: "",       // Corrected name to match common practice
    disabilityType: "", // Will be 'temporary' or 'permanent'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Header */}
      <div className="items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          <img src={wheelChairMan} alt="Wheelchair man icon" />
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
                value={formData.facilityName}
                onChange={handleInputChange}
                readOnly // Make this readOnly as it's from userData
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Health Facility Name"
              />
            </div>
            <div className="relative">
              <input
                type="date" // Changed to type="date" for consistency and proper date input
                name="assessmentDate"
                value={formData.assessmentDate}
                onChange={handleInputChange}
                readOnly // Make this readOnly as it's auto-filled
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Applicant Information Section */}
        <h3 className="text-blue-900 font-medium text-sm mb-1">CONTACT DETAILS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="patientFullName" // Connect to formData
            value={formData.patientFullName}
            onChange={handleInputChange}
            readOnly // Make this readOnly as it's from userData
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="text" // Phone numbers are usually text, not email
            name="patientPhone" // Connect to formData
            value={formData.patientPhone}
            onChange={handleInputChange}
            readOnly // Make this readOnly as it's from userData
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">SUMMARY FINDINGS</h3>

          <div className="mb-6">
            <p className="block text-gray-700 text-sm font-medium bg-gray-100 py-2 px-3 border border-gray-300 rounded-t-md">
              Medical History
            </p>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory} // Connect to formData
              onChange={handleInputChange}
              rows="6"
              className="mt-0 block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="mb-6">
            <p className="block text-gray-700 text-sm font-medium bg-gray-100 py-2 px-3 border border-gray-300 rounded-t-md">
              Dental History
            </p>
            <textarea
              name="dentalHistory"
              value={formData.dentalHistory} // Connect to formData
              onChange={handleInputChange}
              rows="6"
              className="mt-0 block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-medium bg-gray-100 py-2 px-3 border border-gray-300 rounded-t-md">
              Dental Assessment
            </p>
            <textarea
              name="dentalAssessment"
              value={formData.dentalAssessment} // Connect to formData
              onChange={handleInputChange}
              rows="6"
              className="mt-0 block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Conclusion:</h3>

          <div className="mt-8 mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-2">
              RECOMMENDED ASSISTIVE PRODUCT(S)
            </p>
            <input
              type="text"
              name="recommendedAssistiveProducts" // Connect to formData (corrected name)
              value={formData.recommendedAssistiveProducts}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-2">
              OTHER REQUIRED SERVICES
            </p>
            <input
              type="text"
              name="otherRequiredServices" // Connect to formData (corrected name)
              value={formData.otherRequiredServices}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              checked={formData.disabilityType === "temporary"} // Add checked prop for controlled component
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
              checked={formData.disabilityType === "permanent"} // Add checked prop for controlled component
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
          onClick={handleSubmit} // Added onClick to trigger handleSubmit
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