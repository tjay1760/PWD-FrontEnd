import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";

const API_BASE_URL = "http://localhost:5000/api/assessments/submit/";

const MentalImparements = ({ userData, onSubmissionSuccess, onSubmissionError }) => {
  const [formData, setFormData] = useState({
    facilityName: userData?.user?.hospital || "Mama Lucy Kibaki Hospital",
    assessmentDate: format(Date.now(), "yyyy-MM-dd"),
    patientFullName: userData?.user?.fullName || "",
    patientPhone: userData?.user?.phone || "",
    briefClinicalHistory: "",
    mentalStatusEvaluation: "",
    assessmentScores: {
      feeding: "", // Will hold the selected score (e.g., "0.0 Completely Independent")
      toileting: "",
      grooming: "",
    },
    totalDisabilityRatingScore: "",
    durationOfIllness: "",
    majorCauseOfDisability: "",
    levelOfDisability: "", // This will likely be derived from totalDisabilityRatingScore, but kept for direct input if needed
    recommendedAssistiveProducts: "",
    otherRequiredServices: "",
    disabilityType: "", // temporary or permanent
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox inputs for assessment scores
    if (name.startsWith("assessmentScores.")) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value, // Store the value of the checked checkbox
        },
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // Handle all other text/textarea inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
          ASSESSMENT FORM FOR MENTAL/ INTELLECTUAL/ AUTISM SPECTRUM DISORDERS
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
                type="date" // Changed to type="date"
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
            name="patientFullName"
            value={formData.patientFullName}
            onChange={handleInputChange}
            readOnly // Make this readOnly as it's from userData
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="text" // Phone numbers are usually text, not email
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleInputChange}
            readOnly // Make this readOnly as it's from userData
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="history">
          <h2 className="text-green-900 text-xl font-semibold mb-4">
            BRIEF CLINICAL HISTORY (Past and Present Medical History)
          </h2>
          <textarea
            name="briefClinicalHistory"
            value={formData.briefClinicalHistory}
            onChange={handleInputChange}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>
        </div>

        <div className="mental-evaluation">
          <h2 className="text-green-900 text-xl font-semibold mb-4">
            Mental Status Evaluation
          </h2>
          <textarea
            name="mentalStatusEvaluation"
            value={formData.mentalStatusEvaluation}
            onChange={handleInputChange}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          ></textarea>
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-medium mb-3">
            Complete the Assessment Tool Below by Scoring Appropriately
          </p>
          <p className="block text-gray-700 text-sm font-bold mb-3">
            Knows how and when to feed, toilet or groom self
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Feeding
                  </th>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Toileting
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Grooming
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Feeding Options */}
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio for single selection
                        name="assessmentScores.feeding"
                        value="0.0 Completely Independent"
                        checked={formData.assessmentScores.feeding === "0.0 Completely Independent"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      0.0 Completely Independent
                    </label>
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.toileting"
                        value="0.0 Completely Independent"
                        checked={formData.assessmentScores.toileting === "0.0 Completely Independent"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      0.0 Completely Independent
                    </label>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.grooming"
                        value="0.0 Completely Independent"
                        checked={formData.assessmentScores.grooming === "0.0 Completely Independent"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      0.0 Completely Independent
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.feeding"
                        value="1.0 Partial"
                        checked={formData.assessmentScores.feeding === "1.0 Partial"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      1.0 Partial
                    </label>
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.toileting"
                        value="1.0 Partial"
                        checked={formData.assessmentScores.toileting === "1.0 Partial"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      1.0 Partial
                    </label>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.grooming"
                        value="1.0 Partial"
                        checked={formData.assessmentScores.grooming === "1.0 Partial"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      1.0 Partial
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.feeding"
                        value="2.0 Minimal"
                        checked={formData.assessmentScores.feeding === "2.0 Minimal"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      2.0 Minimal
                    </label>
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.toileting"
                        value="2.0 Minimal"
                        checked={formData.assessmentScores.toileting === "2.0 Minimal"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      2.0 Minimal
                    </label>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.grooming"
                        value="2.0 Minimal"
                        checked={formData.assessmentScores.grooming === "2.0 Minimal"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      2.0 Minimal
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.feeding"
                        value="3.0 None (Dependent)"
                        checked={formData.assessmentScores.feeding === "3.0 None (Dependent)"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      3.0 None (Dependent)
                    </label>
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.toileting"
                        value="3.0 None (Dependent)"
                        checked={formData.assessmentScores.toileting === "3.0 None (Dependent)"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      3.0 None (Dependent)
                    </label>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <label className="flex items-center">
                      <input
                        type="radio" // Changed to radio
                        name="assessmentScores.grooming"
                        value="3.0 None (Dependent)"
                        checked={formData.assessmentScores.grooming === "3.0 None (Dependent)"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
                      />
                      3.0 None (Dependent)
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/2">
                    Dependence on Others
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/2">
                    Psychosocial Adaptability
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-r border-gray-300 text-sm text-gray-700 font-medium">
                    Level of Functioning
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700 font-medium">
                    Employability/ Schooling
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-r border-gray-300 text-sm text-gray-700 italic">
                    Physical & cognitive disability
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700 italic">
                    As full-time worker, homemaker, student
                  </td>
                </tr>
                {/* Note: These next rows for Dependence and Psychosocial Adaptability
                    don't have input fields in your original code. If you need to
                    capture these, you'll add similar radio buttons/inputs here
                    and update your formData state accordingly.
                    For now, they remain static text.
                */}
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    0.0 Completely Independent
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    0.0 Not Restricted
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    1.0 Independent in special environment
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    1.0 Selected jobs, competitive
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    2.0 Mildly Dependent-Limited assistance
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    2.0 Sheltered workshop, Non-competitive.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    3.0 Moderately Dependent-moderate assist by Person in home
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    3.0 Not Employable/ not in school
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    4.0 Markedly Dependent Assistance with all major activities, all times
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    5.0 Totally Dependent
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 font-bold">
                    Total Disability Rating Score (Sum of all Scores)
                  </td>
                  <td className="py-3 px-4 border-gray-300 text-sm text-gray-700">
                    <div className="flex items-center">
                      <span className="mr-2">=</span>
                      <input
                        type="text"
                        name="totalDisabilityRatingScore"
                        value={formData.totalDisabilityRatingScore}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Scoring Key:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-1/2">
                    Total DR Score
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-1/2">
                    Level of Disability
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center text-sm text-gray-700">
                    0
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center text-sm text-gray-700">
                    None
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center text-sm text-gray-700">
                    1 - 4
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center text-sm text-gray-700">
                    Mild
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center text-sm text-gray-700">
                    5 - 8
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center text-sm text-gray-700">
                    Moderate
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center text-sm text-gray-700">
                    9 - 12
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-center text-sm text-gray-700">
                    Severe
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-r border-gray-300 text-center text-sm text-gray-700">
                    13 - 17
                  </td>
                  <td className="py-3 px-4 text-center text-sm text-gray-700">
                    Very Severe
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Conclusion:</h3>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-normal mb-1">Duration of Illness:</p>
            <input
              type="text"
              name="durationOfIllness"
              value={formData.durationOfIllness}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-normal mb-1">Major Cause of Disability:</p>
            <input
              type="text"
              name="majorCauseOfDisability"
              value={formData.majorCauseOfDisability}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-normal mb-1">Level of Disability:</p>
            <input
              type="text"
              name="levelOfDisability"
              value={formData.levelOfDisability}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mt-8 mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-2">
              RECOMMENDED ASSISTIVE PRODUCT(S)
            </p>
            <input
              type="text"
              name="recommendedAssistiveProducts"
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
              name="otherRequiredServices"
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

export default MentalImparements;