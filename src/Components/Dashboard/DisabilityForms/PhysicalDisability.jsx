import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import wheelChairMan from "../../../assets/Wheelchair man.png";
import { format } from 'date-fns';


const API_BASE_URL = "http://localhost:5000/api/assessments/submit/";
const PhysicalDisability = ({ userData, onSubmissionSuccess, onSubmissionError }) => {
  const [formData, setFormData] = useState({
    facilityName: userData?.user?.hospital || "Mama Lucy Kibaki Hospital",
    assessmentDate: format(Date.now(), 'yyyy-MM-dd'), // Format for date input
    patientFullName: userData?.user?.fullName || "",
    patientPhone: userData?.user?.phone || "",
    summary: {
      dateOfInjuryOnset: "",
      dateOfLastIntervention: "",
      causeOfDisability: "",
    },
    structuralImpairments: {
      headAndNeckRegion: false,
      shoulderRegion: false,
      upperExtremity: false,
      pelvis: false,
      lowerExtremity: false,
      trunk: false,
      otherAffectedRegions: "", // For the textarea
    },
    assessmentArea: [
      {
        id: "musclePower",
        label: "Muscle Power of affected muscle groups",
        findings: "",
        score: "", // Will hold "No Impairment", "Mild Impairment", etc.
        remarks: "",
      },
      {
        id: "rangeOfMotion",
        label: "Range of motion of joints affected",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        id: "structuralAngulation",
        label: "Degree of structural angulation /deviation",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        id: "limbAmputation",
        label: "Level of limb Amputation",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        id: "limbLength",
        label: "Bilateral Lower Limb Length",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        id: "balanceCoordination",
        label: "Balance and coordination",
        findings: "",
        score: "",
        remarks: "",
      },
      {
        id: "otherImpairments",
        label: "Other Physical Impairments (Specify)",
        findings: "",
        score: "",
        remarks: "",
      },
    ],
    totalScoreForImpairments: {
      findings: "",
      score: "",
      remarks: "",
    },
    functionParticipationRestrictions: [ // New dynamic table data
      { id: "mobility", label: "Mobility", score: "", remarks: "" },
      { id: "selfCare", label: "Self-Care", score: "", remarks: "" },
      { id: "domesticLife", label: "Domestic Life", score: "", remarks: "" },
      { id: "majorLifeAreas", label: "Major Life Areas", score: "", remarks: "" },
      { id: "communitySocialCivicLife", label: "Community, Social, Civic Life", score: "", remarks: "" },
    ],
    totalFunctionParticipationScore: { score: "", remarks: "" }, // For the total score row in this table
    disabilityRating: { // New section
      noDisability: "",
      mild: "",
      moderate: "",
      severe: "",
      complete: "",
    },
    conclusion: { // New section
      sltDiagnosisSeverity: "", // Mild, Moderate, Severe, Profound
      impactOnRoles: "",
      impactOnCareer: "",
    },
    causeOfDisabilityDetails: { // New section (replaces part of old summary)
      dateOfInjuryOnset: "",
      injuryType: "", // Acute or Chronic
      dateOfLastIntervention: "",
    },
    recommendedAssistiveProducts: "",
    otherRequiredServices: "",
    disabilityType: "", // temporary or permanent
  });

  const impairmentScores = [
    "No Impairment",
    "Mild Impairment",
    "Moderate Impairment",
    "Severe Impairment",
    "Complete Impairment",
  ];

  const difficultyScores = [ // New scores for Function and Participation Restrictions
    "No Difficulty",
    "Mild Difficulty",
    "Moderate Difficulty",
    "Severe Difficulty",
    "Complete Difficulty",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("summary.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        summary: {
          ...prev.summary,
          [field]: value,
        },
      }));
    } else if (name.startsWith("structuralImpairments.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        structuralImpairments: {
          ...prev.structuralImpairments,
          [field]: type === 'checkbox' ? checked : value,
        },
      }));
    } else if (name.startsWith("assessmentArea.")) {
      const [_, id, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        assessmentArea: prev.assessmentArea.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
    } else if (name.startsWith("totalScoreForImpairments.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        totalScoreForImpairments: {
          ...prev.totalScoreForImpairments,
          [field]: value,
        },
      }));
    } else if (name.startsWith("functionParticipationRestrictions.")) { // New handler for functionParticipationRestrictions
      const [_, id, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        functionParticipationRestrictions: prev.functionParticipationRestrictions.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
    } else if (name.startsWith("totalFunctionParticipationScore.")) { // New handler for total function participation score
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        totalFunctionParticipationScore: {
          ...prev.totalFunctionParticipationScore,
          [field]: value,
        },
      }));
    } else if (name.startsWith("disabilityRating.")) { // New handler for disability rating
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        disabilityRating: {
          ...prev.disabilityRating,
          [field]: value,
        },
      }));
    } else if (name.startsWith("conclusion.")) { // New handler for conclusion section
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        conclusion: {
          ...prev.conclusion,
          [field]: value,
        },
      }));
    } else if (name.startsWith("causeOfDisabilityDetails.")) { // New handler for cause of disability details
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        causeOfDisabilityDetails: {
          ...prev.causeOfDisabilityDetails,
          [field]: value,
        },
      }));
    }
    else {
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
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-blue-700 text-center mb-8">
        ASSESSMENT FORM FOR PHYSICAL DISABILITIES
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
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Health Facility Name"
            />
          </div>
          <div className="relative">
            <input
              type="date"
              name="assessmentDate"
              value={formData.assessmentDate}
              onChange={handleInputChange}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Contact Details Section */}
      <h3 className="text-blue-900 font-medium text-sm mb-1">CONTACT DETAILS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="patientFullName"
          value={formData.patientFullName}
          onChange={handleInputChange}
          readOnly
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="patientPhone"
          value={formData.patientPhone}
          onChange={handleInputChange}
          readOnly
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Summary Findings Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">SUMMARY FINDINGS</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                  Brief Medical History
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
                    type="date"
                    name="summary.dateOfInjuryOnset"
                    value={formData.summary.dateOfInjuryOnset}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                  Date of Last Intervention
                </td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                  <input
                    type="date"
                    name="summary.dateOfLastIntervention"
                    value={formData.summary.dateOfLastIntervention}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                    name="summary.causeOfDisability"
                    value={formData.summary.causeOfDisability}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Structural Impairments Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">STRUCTURAL IMPAIRMENTS</h3>
        <div className="border-b border-gray-300 pb-2 mb-4"></div>
        <div className="border-b border-gray-300 pb-2 mb-6"></div>

        <p className="block text-gray-700 text-sm font-medium mb-3">
          s7. STRUCTURE: <span className="text-gray-500 font-normal ml-2">(Tick Region/part being assessed that has IMPAIREMENT)</span>
        </p>
        <div className="grid grid-cols-1 gap-y-3 mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="structuralImpairments.headAndNeckRegion"
              checked={formData.structuralImpairments.headAndNeckRegion}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700 text-sm font-normal">s710 Head and neck region</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="structuralImpairments.shoulderRegion"
              checked={formData.structuralImpairments.shoulderRegion}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700 text-sm font-normal">s720 Shoulder region</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="structuralImpairments.upperExtremity"
              checked={formData.structuralImpairments.upperExtremity}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700 text-sm font-normal">s730 Upper extremity (arm, hand)</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="structuralImpairments.pelvis"
              checked={formData.structuralImpairments.pelvis}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700 text-sm font-normal">s740 Pelvis</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="structuralImpairments.lowerExtremity"
              checked={formData.structuralImpairments.lowerExtremity}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700 text-sm font-normal">s750 Lower extremity (leg, foot)</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="structuralImpairments.trunk"
              checked={formData.structuralImpairments.trunk}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500"
            />
            <label className="text-gray-700 text-sm font-normal">s760 Trunk</label>
          </div>
        </div>

        <p className="block text-gray-700 text-sm font-medium mb-3">
          s8. SKIN AND RELATED STRUCTURES ANY OTHER BODY STRUCTURES
        </p>
        <p className="block text-gray-700 text-sm font-medium mb-2">
          REGION (s) AFFECTED
        </p>
        <textarea
          name="structuralImpairments.otherAffectedRegions"
          value={formData.structuralImpairments.otherAffectedRegions}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4"
          placeholder="Please describe the affected regions here..."
        ></textarea>
      </div>

      {/* Assessment Area Table */}
      <div className="mb-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th rowSpan="2" className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/5">
                  Assessment Area
                </th>
                <th rowSpan="2" className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/5">
                  Findings
                </th>
                <th colSpan="5" className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-2/5">
                  Score ✓ for nature of impairments
                </th>
                <th rowSpan="2" className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/5">
                  Remarks
                </th>
              </tr>
              <tr>
                {impairmentScores.map((score) => (
                  <th key={score} className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                    {score}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.assessmentArea.map((area) => (
                <tr key={area.id}>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    {area.label}
                  </td>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name={`assessmentArea.${area.id}.findings`}
                      value={area.findings}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  {impairmentScores.map((scoreOption) => (
                    <td key={scoreOption} className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                      <input
                        type="radio"
                        name={`assessmentArea.${area.id}.score`}
                        value={scoreOption}
                        checked={area.score === scoreOption}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  ))}
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name={`assessmentArea.${area.id}.remarks`}
                      value={area.remarks}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              ))}
              {/* Total Score for Impairments Row */}
              <tr>
                <td className="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 font-semibold">
                  SCORE FOR IMPAIRMENTS
                </td>
                <td className="py-3 px-4 border-r border-gray-300 text-sm text-gray-700">
                  <input
                    type="text"
                    name="totalScoreForImpairments.findings"
                    value={formData.totalScoreForImpairments.findings}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
                {impairmentScores.map((scoreOption) => (
                  <td key={`total-${scoreOption}`} className="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                    <input
                      type="radio"
                      name="totalScoreForImpairments.score"
                      value={scoreOption}
                      checked={formData.totalScoreForImpairments.score === scoreOption}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                ))}
                <td className="py-3 px-4 border-gray-300 text-sm text-gray-700">
                  <input
                    type="text"
                    name="totalScoreForImpairments.remarks"
                    value={formData.totalScoreForImpairments.remarks}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FUNCTION AND PARTICIPATION RESTRICTIONS Table */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">FUNCTION AND PARTICIPATION RESTRICTIONS</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th rowSpan="2" className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                  Area
                </th>
                <th colSpan="5" className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-3/4">
                  Score ✓ For Nature of Difficulty
                </th>
                <th rowSpan="2" className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                  Remarks
                </th>
              </tr>
              <tr>
                {difficultyScores.map((score) => (
                  <th key={score} className="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                    {score}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.functionParticipationRestrictions.map((area) => (
                <tr key={area.id}>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                    {area.label}
                  </td>
                  {difficultyScores.map((scoreOption) => (
                    <td key={scoreOption} className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                      <input
                        type="radio" // Changed to radio
                        name={`functionParticipationRestrictions.${area.id}.score`}
                        value={scoreOption}
                        checked={area.score === scoreOption}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  ))}
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input
                      type="text"
                      name={`functionParticipationRestrictions.${area.id}.remarks`}
                      value={area.remarks}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              ))}
              {/* Total Score for Function and Participation Restriction Row */}
              <tr>
                <td className="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 font-semibold">
                  Score For Function and Participation Restriction
                </td>
                {difficultyScores.map((scoreOption) => (
                  <td key={`total-func-${scoreOption}`} className="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                    <input
                      type="radio" // Changed to radio
                      name="totalFunctionParticipationScore.score"
                      value={scoreOption}
                      checked={formData.totalFunctionParticipationScore.score === scoreOption}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                ))}
                <td className="py-3 px-4 border-gray-300 text-sm text-gray-700">
                  <input
                    type="text"
                    name="totalFunctionParticipationScore.remarks"
                    value={formData.totalFunctionParticipationScore.remarks}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Disability Rating */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Disability Rating</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                  No disability
                </td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                  <input
                    type="text"
                    name="disabilityRating.noDisability"
                    value={formData.disabilityRating.noDisability}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                  Mild
                </td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                  <input
                    type="text"
                    name="disabilityRating.mild"
                    value={formData.disabilityRating.mild}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                  Moderate
                </td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                  <input
                    type="text"
                    name="disabilityRating.moderate"
                    value={formData.disabilityRating.moderate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                  Severe
                </td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                  <input
                    type="text"
                    name="disabilityRating.severe"
                    value={formData.disabilityRating.severe}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-r border-gray-300 text-sm text-gray-700">
                  Complete
                </td>
                <td className="py-3 px-4 border-gray-300 text-sm text-gray-700">
                  <input
                    type="text"
                    name="disabilityRating.complete"
                    value={formData.disabilityRating.complete}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conclusion Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">CONCLUSION</h3>

        <p className="block text-gray-700 text-sm font-medium mb-3">
          SLT DIAGNOSIS: Include severity and complete attached scale to rate impairment, activity, participation,
          well-being, and distress.
        </p>

        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-normal mb-2">Severity (circle as appropriate):</p>
          <div className="flex items-center space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="conclusion.sltDiagnosisSeverity"
                value="Mild"
                checked={formData.conclusion.sltDiagnosisSeverity === "Mild"}
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 text-sm">Mild</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="conclusion.sltDiagnosisSeverity"
                value="Moderate"
                checked={formData.conclusion.sltDiagnosisSeverity === "Moderate"}
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 text-sm">Moderate</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="conclusion.sltDiagnosisSeverity"
                value="Severe"
                checked={formData.conclusion.sltDiagnosisSeverity === "Severe"}
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 text-sm">Severe</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="conclusion.sltDiagnosisSeverity"
                value="Profound"
                checked={formData.conclusion.sltDiagnosisSeverity === "Profound"}
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 text-sm">Profound</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-medium mb-3">
            Impact of disability on fulfilling PWD’s roles and responsibilities.
          </p>
          <textarea
            name="conclusion.impactOnRoles"
            value={formData.conclusion.impactOnRoles}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="mb-6">
          <p className="block text-gray-700 text-sm font-medium mb-3">
            Impact on Career
          </p>
          <textarea
            name="conclusion.impactOnCareer"
            value={formData.conclusion.impactOnCareer}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
      </div>

      {/* Cause of Disability Details Table */}
      <div className="mb-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                  Cause of disability
                </th>
                <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-2/3" colSpan="2">
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                  Date of injury/onset of illness
                </td>
                <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                  <input
                    type="date" // Changed to date type
                    name="causeOfDisabilityDetails.dateOfInjuryOnset"
                    value={formData.causeOfDisabilityDetails.dateOfInjuryOnset}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio" // Changed to radio
                      name="causeOfDisabilityDetails.injuryType"
                      value="Acute"
                      checked={formData.causeOfDisabilityDetails.injuryType === "Acute"}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500"
                    /> Acute
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio" // Changed to radio
                      name="causeOfDisabilityDetails.injuryType"
                      value="Chronic"
                      checked={formData.causeOfDisabilityDetails.injuryType === "Chronic"}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500"
                    /> Chronic
                  </label>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                  Date of last intervention
                </td>
                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700" colSpan="2">
                  <input
                    type="date" // Changed to date type
                    name="causeOfDisabilityDetails.dateOfLastIntervention"
                    value={formData.causeOfDisabilityDetails.dateOfLastIntervention}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </td>
              </tr>
            </tbody>
          </table>
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

export default PhysicalDisability;