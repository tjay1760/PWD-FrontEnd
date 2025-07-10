import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";

const ChronicDisorders = ({ userData }) => {
  const [formData, setFormData] = useState({
    facilityName: userData?.user?.hospital || "Mama Lucy Kibaki Hospital",
    assessmentDate: format(Date.now(), "yyyy-MM-dd"), // Format for consistent date storage
    patientFullName: userData?.user?.fullName || "",
    patientPhone: userData?.user?.phone || "",

    dateOfInjuryOnset: "",
    dateOfLastIntervention: "",
    listInterventions: "",
    causeOfDisability: "",

    structuralImpairments: "",
    regionsAffected: "",
    assessmentDetails: [
      {
        area: "Cardiopulmonary/ Cardiovascular",
        findings: "",
        score: "", // Will store the selected impairment level
        remarks: "",
      },
      {
        area: "Respiratory",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        area: "Malignancies/ Cancer",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        area: "Musculoskeletal",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        area: "Neurological",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        area: "Gastro-intestinal disorders",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        area: "Dermatological",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        area: "Hematologic system",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        area: "Vascular conditions",
        findings: "",
        score: "",
        remarks: "",
      },
    ],
    // New section for Function and Participation Restrictions
    functionAndParticipationRestrictions: [
      {
        area: "Mobility",
        score: "",
        remarks: "",
      },
      {
        area: "Self-Care",
        score: "",
        remarks: "",
      },
      {
        area: "Domestic Life",
        score: "",
        remarks: "",
      },
      {
        area: "Major Life Areas",
        score: "",
        remarks: "",
      },
      {
        area: "Community, Social, Civic Life",
        score: "",
        remarks: "",
      },
      {
        area: "Score For Function and Participation Restriction", // This is the summary row
        score: "",
        remarks: "",
      },
    ],
    // New section for Disability Rating
    disabilityRating: "",
    // New fields for Conclusion Section
    recommendedAssistiveProductsConclusion: "",
    otherRequiredServicesConclusion: "",
    // New field for Disability Type Selection
    disabilityType: "", // "temporary" or "permanent"
  });
  // Generic handler for top-level text inputs and textareas
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested fields for summaryFindings
    if (type === "radio") {
      // Handle radio buttons specifically
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Value is directly the selected radio button's value
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handler for the assessment details table inputs (findings and remarks)
  const handleAssessmentDetailChange = (index, field, value) => {
    setFormData((prev) => {
      const newAssessmentDetails = [...prev.assessmentDetails];
      newAssessmentDetails[index] = {
        ...newAssessmentDetails[index],
        [field]: value,
      };
      return {
        ...prev,
        assessmentDetails: newAssessmentDetails,
      };
    });
  };

  // Handler for the assessment score checkboxes
  const handleScoreCheckboxChange = (index, scoreValue) => {
    setFormData((prev) => {
      const newAssessmentDetails = [...prev.assessmentDetails];
      // Set the score for the current item
      newAssessmentDetails[index] = {
        ...newAssessmentDetails[index],
        score: scoreValue,
      };
      return {
        ...prev,
        assessmentDetails: newAssessmentDetails,
      };
    });
  };

  // Handler for Function and Participation Restrictions table inputs (remarks)
  const handleFunctionParticipationChange = (index, field, value) => {
    setFormData((prev) => {
      const newRestrictions = [...prev.functionAndParticipationRestrictions];
      newRestrictions[index] = {
        ...newRestrictions[index],
        [field]: value,
      };
      return {
        ...prev,
        functionAndParticipationRestrictions: newRestrictions,
      };
    });
  };

  // Handler for Function and Participation Restrictions score checkboxes
  const handleFunctionParticipationScoreChange = (index, scoreValue) => {
    setFormData((prev) => {
      const newRestrictions = [...prev.functionAndParticipationRestrictions];
      newRestrictions[index] = {
        ...newRestrictions[index],
        score: scoreValue,
      };
      return {
        ...prev,
        functionAndParticipationRestrictions: newRestrictions,
      };
    });
  };

  // Handler for Disability Rating inputs

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, formData contains all the collected data in the desired JSON structure
    console.log(
      "Payload to be sent to backend:",
      JSON.stringify(formData, null, 2)
    );
    // In a real application, you would send this 'formData' object to your backend API
    // Example: fetch('/api/chronic-disorders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    alert("Form data logged to console. Check your browser's developer tools!");
  };
  const assessmentAreas = [
    "Cardiopulmonary/ Cardiovascular",
    "Respiratory",
    "Malignancies/ Cancer",
    "Musculoskeletal",
    "Neurological",
    "Gastro-intestinal disorders",
    "Dermatological",
    "Hematologic system",
    "Vascular conditions",
  ];

  const impairmentLevels = [
    "No Impairment",
    "Mild Impairment",
    "Moderate Impairment",
    "Severe Impairment",
    "Complete Impairment",
  ];
  const functionParticipationAreas = [
    "Mobility",
    "Self-Care",
    "Domestic Life",
    "Major Life Areas",
    "Community, Social, Civic Life",
    "Score For Function and Participation Restriction", // This is the summary row
  ];

  const difficultyLevels = [
    "No Difficulty",
    "Mild Difficulty",
    "Moderate Difficulty",
    "Severe Difficulty",
    "Complete Difficulty",
  ];

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
          ASSESSMENT FOR PROGRESSIVE CHRONIC DISORDERS
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
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Health Facility Name"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="assessmentDate"
                value={format(Date.now(), "dd MMMM yyyy")}
               readOnly
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
            name="patientFullName"
            value={formData.patientFullName}
            readOnly
            class="border rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            name="patientPhone"
            value={formData.patientPhone}
            readOnly
            class="border rounded px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            SUMMARY FINDINGS
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Medical History (brief)
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-2/3"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Date of Injury/Onset of Illness
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="date" // Changed to type="date"
                      name="dateOfInjuryOnset"
                      value={formData.dateOfInjuryOnset}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Date of Last Intervention
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="date" // Changed to type="date"
                      name="dateOfLastIntervention"
                      value={formData.dateOfLastIntervention}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    List Past and Ongoing Interventions
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="listInterventions"
                      value={formData.listInterventions}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    Cause of Disability
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name="causeOfDisability"
                      value={formData.causeOfDisability}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3">
            STRUCTURAL IMPAIRMENTS
          </h3>
          <textarea
            name="structuralImpairments"
            rows="4"
            value={formData.structuralImpairments}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-6"
          ></textarea>

          <h3 className="text-lg font-bold text-gray-800 mb-3">
            REGION (s) AFFECTED
          </h3>
          <textarea
            name="regionsAffected"
            rows="4"
            value={formData.regionsAffected}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th
                    rowSpan="2"
                    className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/5"
                  >
                    Assessment Area
                  </th>
                  <th
                    rowSpan="2"
                    className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-2/5"
                  >
                    Findings /diagnostic tests (MRIs, CT) Labs tests, 6 minutes'
                    walk test, Pulmonary function test (PFTs), MMT, ROM,
                    Echocardiogram (EEG), Visual analog pain scale, Berg balance
                    scale, TUG, Tinetti, lower extremity functional tests,
                    cognitive tests, Speech and swallowing tests
                  </th>
                  <th
                    colSpan="5"
                    className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-1/5"
                  >
                    Score ✓ For Nature of Impairments
                  </th>
                  <th
                    rowSpan="2"
                    className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/5"
                  >
                    Remarks
                  </th>
                </tr>
                <tr>
                  {impairmentLevels.map((level) => (
                    <th
                      key={level}
                      className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700"
                    >
                      {level}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assessmentAreas.map((area, index) => (
                  <tr key={area}>
                    <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                      {area}
                    </td>
                    <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                      <input
                        type="text"
                        name={`${area.replace(/[^a-zA-Z0-9]/g, "")}Findings`} // Create a unique name
                        value={formData.assessmentDetails[index].findings}
                        onChange={(e) =>
                          handleAssessmentDetailChange(
                            index,
                            "findings",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                    {impairmentLevels.map((level) => (
                      <td
                        key={`${area}-${level}`}
                        className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center"
                      >
                        <input
                          type="radio"
                          name={`${area.replace(/[^a-zA-Z0-9]/g, "")}Score`}
                          value={level}
                          checked={
                            formData.assessmentDetails[index].score === level
                          }
                          onChange={() =>
                            handleScoreCheckboxChange(index, level)
                          }
                          className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    ))}
                    <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                      <input
                        type="text"
                        name={`${area.replace(/[^a-zA-Z0-9]/g, "")}Remarks`} // Create a unique name
                        value={formData.assessmentDetails[index].remarks}
                        onChange={(e) =>
                          handleAssessmentDetailChange(
                            index,
                            "remarks",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* New Section: FUNCTION AND PARTICIPATION RESTRICTIONS */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            FUNCTION AND PARTICIPATION RESTRICTIONS
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th
                    rowSpan="2"
                    className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4"
                  >
                    Area
                  </th>
                  <th
                    colSpan="5"
                    className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-1/2"
                  >
                    Score ✓ For Nature of Difficulty
                  </th>
                  <th
                    rowSpan="2"
                    className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4"
                  >
                    Remarks
                  </th>
                </tr>
                <tr>
                  {difficultyLevels.map((level) => (
                    <th
                      key={level}
                      className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700"
                    >
                      {level}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {functionParticipationAreas.map((area, index) => (
                  <tr key={area}>
                    <td
                      className={`py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 ${
                        area.includes("Score For Function")
                          ? "font-semibold bg-gray-50"
                          : ""
                      }`}
                    >
                      {area}
                    </td>
                    {difficultyLevels.map((level) => (
                      <td
                        key={`${area}-${level}`}
                        className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center"
                      >
                        <input
                          type="radio"
                          name={`${area.replace(
                            /[^a-zA-Z0-9]/g,
                            ""
                          )}Difficulty`}
                          value={level}
                          checked={
                            formData.functionAndParticipationRestrictions[index]
                              .score === level
                          }
                          onChange={() =>
                            handleFunctionParticipationScoreChange(index, level)
                          }
                          className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    ))}
                    <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                      <input
                        type="text"
                        name={`${area.replace(/[^a-zA-Z0-9]/g, "")}Remarks`}
                        value={
                          formData.functionAndParticipationRestrictions[index]
                            .remarks
                        }
                        onChange={(e) =>
                          handleFunctionParticipationChange(
                            index,
                            "remarks",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Section: Disability Rating */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Disability Rating
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                    No disability
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="disabilityRating"
                      value="none"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                    Mild
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="disabilityRating"
                      value="mild"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                    Moderate
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="disabilityRating"
                      value="moderate"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                    Severe
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="disabilityRating"
                      value="severe"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                    Complete
                  </td>
                  <td className="py-3 px-4 border-gray-300 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="disabilityRating"
                      value="complete"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Conclusion Section */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Conclusion:</h3>

          <div className="mt-8 mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-2">
              RECOMMENDED ASSISTIVE
              PRODUCT(S)........................................
            </p>
            <input
              type="text"
              name="recommendedAssistiveProductsConclusion"
              value={formData.recommendedAssistiveProductsConclusion}
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
              name="otherRequiredServicesConclusion"
              value={formData.otherRequiredServicesConclusion}
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

export default ChronicDisorders;
