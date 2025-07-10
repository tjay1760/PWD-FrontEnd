import React, { useState } from "react";
import { Calendar } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";

const VisualImpairments = ({ userData }) => {
  const [formData, setFormData] = useState({
    // Nested object for patient details (read-only in UI, but part of form data for submission)
    facilityName: userData?.user?.hospital || "Mama Lucy Kibaki Hospital",
    assessmentDate: format(Date.now(), 'yyyy-MM-dd'), // Format for date input
    patientFullName: userData?.user?.fullName || "",
    patientPhone: userData?.user?.phone || "",
    medicalHistory: "",
    ocularHistory: "",

    // Distance Visual Acuity - structured similar to your hearing form
    distanceVisualAcuity: {
      withCorrection: {
        rightEye: "",
        leftEye: "",
        nearVisionTest: "",
      },
      withoutCorrection: {
        rightEye: "",
        leftEye: "",
        nearVisionTest: "",
      },
    },

    // Ophthalmic Examination - now nested for right and left eye
    ophthalmicExamination: {
      rightEye: {
        presentEyeball: "",
        cornea: "",
        squint: "",
        anteriorChamber: "",
        nystagmus: "",
        iris: "",
        tearing: "",
        pupil: "",
        lids: "",
        conjunctiva: "",
        lens: "",
      },
      leftEye: {
        presentEyeball: "",
        cornea: "",
        squint: "",
        anteriorChamber: "",
        nystagmus: "",
        iris: "",
        tearing: "",
        pupil: "",
        lids: "",
        conjunctiva: "",
        lens: "",
      },
    },

    // Specialized Tests and their Findings
    specializedTests: {
      humphreysVisualField: "",
      colourVision: "",
      stereopsis: "",
    },

    // Conclusion - Category Selection (checkboxes) and other fields
    conclusion: {
      categoryNormal: false,
      categoryMildImpairment: false,
      categoryModerateImpairment: false,
      categorySevereImpairment: false,
      categoryBlind: false,
      categoryNearVisionImpairment: false,
      causeOfVisionImpairment: "",
      disabilityPercentage: "",
      possibleIntervention: "", // "yes" or "no"
      recommendation: "",
    },

    // Disability Type Selection (top-level as it applies to the overall disability)
    disabilityType: "", // "temporary" or "permanent"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      // Split the name by dots to handle nested objects
      const nameParts = name.split('.');
      let updatedData = { ...prev };
      let currentLevel = updatedData;

      // Traverse through the nested structure
      for (let i = 0; i < nameParts.length - 1; i++) {
        const part = nameParts[i];
        if (!currentLevel[part]) {
          currentLevel[part] = {}; // Initialize if not exists
        }
        currentLevel = currentLevel[part];
      }

      // Set the final value
      const lastPart = nameParts[nameParts.length - 1];
      currentLevel[lastPart] = type === "checkbox" ? checked : value;

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", JSON.stringify(formData, null, 2));
    // Here you would typically send formData to your backend API
    // e.g., axios.post('/api/visual-impairments', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Header */}
      <div className="items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          <img src={wheelChairMan} alt="Wheelchair Man" />
          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Persons With Disability
            </h1>
            <p className="text-blue-600 font-medium">Medical System</p>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-blue-700 text-center mb-8">
        Assessment Form for Visual Impairment
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Health Facility and Date Section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-4">
            Name of Health Facility and Assessment Date
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="assessmentDetails.hospital" // Use nested name
                readOnly
                value={formData.facilityName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 cursor-not-allowed"
                placeholder="Health Facility Name"
                aria-label="Health Facility Name"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="assessmentDetails.assessmentDate" // Use nested name
                readOnly
                value={formData.assessmentDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 cursor-not-allowed"
                aria-label="Assessment Date"
              />
              <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Applicant Information Section */}
        <h3 className="text-blue-900 font-medium text-sm mb-1">CONTACT DETAILS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            value={formData.patientFullName} // Use nested value
            readOnly
            className="border rounded px-3 py-2 w-full bg-gray-100 cursor-not-allowed"
            aria-label="Applicant Full Name"
          />
          <input
            type="text"
            value={formData.patientPhone} // Use nested value
            readOnly
            className="border rounded px-3 py-2 w-full bg-gray-100 cursor-not-allowed"
            aria-label="Applicant Phone Number"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-blue-900 font-medium text-sm mb-1">MEDICAL HISTORY</h3>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            className="border rounded w-full px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            rows="3"
            placeholder="Describe the PWD's medical History"
            aria-label="Medical History"
          ></textarea>
        </div>
        <div className="mb-6">
          <h3 className="text-blue-900 font-medium text-sm mb-1">OCULAR HISTORY</h3>
          <textarea
            name="ocularHistory"
            value={formData.ocularHistory}
            onChange={handleInputChange}
            className="border rounded w-full px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            rows="3"
            placeholder="Describe the PWD's ocular History"
            aria-label="Ocular History"
          ></textarea>
        </div>
        <div className="mb-6">
          <h3 className="text-blue-900 font-medium text-sm mb-1">
            DISTANCE VISUAL ACUITY
          </h3>
          <div className="border rounded p-4 text-sm">
            <div className="grid grid-cols-4 gap-4 text-center font-medium text-gray-700 mb-2">
              <div></div>
              <div>Right Eye</div>
              <div>Left Eye</div>
              <div>Near Vision Test</div>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-2 items-center">
              <div>With Correction</div>
              <input
                type="text"
                name="distanceVisualAcuity.withCorrection.rightEye" // Nested name
                value={formData.distanceVisualAcuity.withCorrection.rightEye}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
                aria-label="Right Eye With Correction"
              />
              <input
                type="text"
                name="distanceVisualAcuity.withCorrection.leftEye" // Nested name
                value={formData.distanceVisualAcuity.withCorrection.leftEye}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
                aria-label="Left Eye With Correction"
              />
              <input
                type="text"
                name="distanceVisualAcuity.withCorrection.nearVisionTest" // Nested name
                value={formData.distanceVisualAcuity.withCorrection.nearVisionTest}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
                aria-label="Near Vision Test With Correction"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 items-center">
              <div>Without Correction</div>
              <input
                type="text"
                name="distanceVisualAcuity.withoutCorrection.rightEye" // Nested name
                value={formData.distanceVisualAcuity.withoutCorrection.rightEye}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
                aria-label="Right Eye Without Correction"
              />
              <input
                type="text"
                name="distanceVisualAcuity.withoutCorrection.leftEye" // Nested name
                value={formData.distanceVisualAcuity.withoutCorrection.leftEye}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
                aria-label="Left Eye Without Correction"
              />
              <input
                type="text"
                name="distanceVisualAcuity.withoutCorrection.nearVisionTest" // Nested name
                value={formData.distanceVisualAcuity.withoutCorrection.nearVisionTest}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
                aria-label="Near Vision Test Without Correction"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-6">
            Ophthalmic Examination
          </h3>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 w-1/3"></th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 border-l border-gray-300 w-1/3">
                    Right Eye
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600 border-l border-gray-300 w-1/3">
                    Left Eye
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Present eyeball",
                  "Cornea",
                  "Squint",
                  "Anterior Chamber",
                  "Nystagmus",
                  "Iris",
                  "Tearing",
                  "Pupil",
                  "Lids",
                  "Conjunctiva",
                  "Lens",
                ].map((examination, index) => {
                  // Generate a camelCase field name for the examination
                  const fieldName = examination.replace(/\s+/g, '');
                  return (
                    <tr
                      key={examination}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-3 px-4 text-gray-700 font-medium border-t border-gray-200">
                        {examination}
                      </td>
                      <td className="py-2 px-4 border-t border-l border-gray-200">
                        <input
                          type="text"
                          name={`ophthalmicExamination.rightEye.${fieldName}`} // Nested name
                          value={formData.ophthalmicExamination.rightEye[fieldName]}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          aria-label={`Right Eye ${examination}`}
                        />
                      </td>
                      <td className="py-2 px-4 border-t border-l border-gray-200">
                        <input
                          type="text"
                          name={`ophthalmicExamination.leftEye.${fieldName}`} // Nested name
                          value={formData.ophthalmicExamination.leftEye[fieldName]}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          aria-label={`Left Eye ${examination}`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-4">
            Specialized Tests and their Findings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                type="text"
                name="specializedTests.humphreysVisualField" // Nested name
                value={formData.specializedTests.humphreysVisualField}
                onChange={handleInputChange}
                placeholder="Humphreys Visual Field"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Humphreys Visual Field"
              />
            </div>
            <div>
              <input
                type="text"
                name="specializedTests.colourVision" // Nested name
                value={formData.specializedTests.colourVision}
                onChange={handleInputChange}
                placeholder="Colour Vision"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Colour Vision"
              />
            </div>
          </div>

          <div className="max-w-md">
            <input
              type="text"
              name="specializedTests.stereopsis" // Nested name
              value={formData.specializedTests.stereopsis}
              onChange={handleInputChange}
              placeholder="Stereopsis"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Stereopsis"
            />
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-4">
            Conclusion
          </h3>

          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            {/* Category Selection */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-3">Category (Tick where necessary)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="conclusion.categoryNormal" // Nested name
                    checked={formData.conclusion.categoryNormal}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Normal</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="conclusion.categoryMildImpairment" // Nested name
                    checked={formData.conclusion.categoryMildImpairment}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Mild Impairment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="conclusion.categoryModerateImpairment" // Nested name
                    checked={formData.conclusion.categoryModerateImpairment}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Moderate Impairment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="conclusion.categorySevereImpairment" // Nested name
                    checked={formData.conclusion.categorySevereImpairment}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Severe Impairment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="conclusion.categoryBlind" // Nested name
                    checked={formData.conclusion.categoryBlind}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Blind</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="conclusion.categoryNearVisionImpairment" // Nested name
                    checked={formData.conclusion.categoryNearVisionImpairment}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Near Vision Impairment</span>
                </label>
              </div>
            </div>

            {/* Cause of Vision Impairment */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="causeOfVisionImpairment">Cause of Vision Impairment</label>
              <textarea
                id="causeOfVisionImpairment"
                name="conclusion.causeOfVisionImpairment" // Nested name
                value={formData.conclusion.causeOfVisionImpairment}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe the cause of vision impairment..."
                aria-label="Cause of Vision Impairment"
              />
            </div>

            {/* Disability Percentage and Intervention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2" htmlFor="disabilityPercentage">Disability (%)</label>
                <input
                  type="number"
                  id="disabilityPercentage"
                  name="conclusion.disabilityPercentage" // Nested name
                  value={formData.conclusion.disabilityPercentage}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter percentage"
                  aria-label="Disability percentage"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Any Possible Intervention?</label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="conclusion.possibleIntervention" // Nested name
                      value="yes"
                      checked={formData.conclusion.possibleIntervention === "yes"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="conclusion.possibleIntervention" // Nested name
                      value="no"
                      checked={formData.conclusion.possibleIntervention === "no"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div>
              <label className="block text-sm text-gray-600 mb-2" htmlFor="recommendation">Recommendation</label>
              <textarea
                id="recommendation"
                name="conclusion.recommendation" // Nested name
                value={formData.conclusion.recommendation}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter your recommendations..."
                aria-label="Recommendation"
              />
            </div>
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
      </form>
    </div>
  );
};

export default VisualImpairments;