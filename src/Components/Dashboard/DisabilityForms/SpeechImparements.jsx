import React from 'react';
import { Calendar } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";
const API_BASE_URL = "http://localhost:5000/api/assessments/submit/"; // Uncomment if needed for API calls

const SpeechImparements = ({ userData, onSubmissionSuccess, onSubmissionError }) => {
  const [formData, setFormData] = React.useState({
    facilityName: userData?.user?.hospital || "Mama Lucy Kibaki Hospital",
    assessmentDate: format(Date.now(), 'yyyy-MM-dd'), // Format for date input
    patientFullName: userData?.user?.fullName || "",
    patientPhone: userData?.user?.phone || "",
    
    // Core Form Fields
    medicalHistory: "",
    reasonForReferral: "",
    referredBy: "",
    medicalDiagnosis: "",
    historyOfCondition: "",
    
    // Domains to be assessed (checkboxes)
    domainLanguage: false,
    domainSpeech: false,
    domainDysphagia: false,
    domainCommunication: false,
    
    // Developmental Disorders only (radio buttons and textarea)
    motorMilestones: "", // "Yes" or "No"
    sensoryVisual: "",   // "Yes" or "No"
    sensoryAuditory: "", // "Yes" or "No"
    otherDevelopmental: "",
    
    // Speech and Language Milestones
    speechLanguageMilestones: "",
    
    // Pre-Linguistic Skills (radio buttons)
    eyeContact: "",      // "Yes" or "No"
    attentionSpan: "",   // "Yes" or "No"
    imitationSkills: "", // "Yes" or "No"

    // A. LANGUAGE IMPAIRMENTS - Receptive (text inputs)
    receptiveAttentionMemory: "",
    receptiveListeningAuditoryProcessingPhonologicalAwareness: "",
    receptiveSyntacticComprehension: "",
    receptiveSemanticComprehension: "",
    receptiveReadingComprehension: "",

    // A. LANGUAGE IMPAIRMENTS - Expressive (text inputs)
    expressiveSoundWordSentenceLevelProduction: "",
    expressiveNonVerbalCommunication: "",
    expressivePragmatics: "",
    expressivePlayWork: "",
    expressiveWrittenOutput: "",

    standardizedTestResults: "",

    // C. DYSPHAGIA - Possible Dysphagia / 'red flag' symptoms (checkboxes)
    symptom1: false, // History of recurrent chest infections...
    symptom2: false, // Current chest infection...
    symptom3: false, // Dehydration and malnutrition...
    symptom4: false, // Unintentional weight loss...
    symptom5: false, // Taking a long time to eat/drink...
    symptom6: false, // Avoidance of particular foods...
    symptom7: false, // Avoidance of eating/drinking in social situations...
    symptom8: false, // Distress before/during/after eating...

    // C. DYSPHAGIA - Pre-oral Stage Difficulties (checkboxes)
    preOralDifficulty1: false, // Difficulty with self-feeding...
    preOralDifficulty2: false, // Difficulty with cleaning own mouth/teeth...

    // C. DYSPHAGIA - Oral Stage Difficulties (checkboxes)
    oralDifficulty1: false, // Difficulty closing lips...
    oralDifficulty2: false, // Difficulty taking food off a spoon/fork...
    oralDifficulty3: false, // Losing food or drink from the mouth...
    oralDifficulty4: false, // Restricted oral movements...
    oralDifficulty5: false, // Food residue in mouth after swallowing...
    oralDifficulty6: false, // Difficulty managing saliva/drooling...

    // C. DYSPHAGIA - Pharyngeal Stage Difficulties (checkboxes) - NEW
    pharyngealDifficulty1: false,
    pharyngealDifficulty2: false,
    pharyngealDifficulty3: false,
    pharyngealDifficulty4: false,
    pharyngealDifficulty5: false,

    // C. DYSPHAGIA - Esophageal Stage Difficulties (checkboxes) - NEW
    esophagealDifficulty1: false,
    esophagealDifficulty2: false,
    esophagealDifficulty3: false,
    esophagealDifficulty4: false,

    // C. DYSPHAGIA - Score (text input) - NEW
    score: "",

    // Conclusion Section - NEW
    severity: "", // Mild, Moderate, Severe, Profound (radio buttons)
    impactOnRoles: "",
    impactOnCareer: "",
    
    // Recommendations (checkboxes and textarea)
    recommendation1: false,
    recommendation2: false,
    recommendation3: false,
    recommendationsExpand: "",

    // Cause of disability (text input and radio buttons)
    dateOfInjuryOnset: "",
    injuryType: "", // "Acute" or "Chronic" (radio buttons, assuming only one can be selected)
    dateOfLastIntervention: "",

    // Recommended Assistive Products and Other Services
    recommendedAssistiveProducts: "",
    otherRequiredServices: "",

    // Disability Type Selection (radio buttons)
    disabilityType: "", // "temporary" or "permanent"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      // Special handling for checkboxes where multiple can be selected
      // For groups of checkboxes where only one value is stored (like injuryType if it was checkboxes)
      // For radio buttons, the name attribute groups them, and value is used directly.
      if (type === 'checkbox') {
        return {
          ...prev,
          [name]: checked,
        };
      } else if (type === 'radio') {
        // For radio buttons, the value is simply the selected one
        return {
          ...prev,
          [name]: value,
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  // Example of how to log formData (for debugging/submission)
  // React.useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

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
        ASSESSMENT FOR SPEECH, LANGUAGE, COMMUNICATION AND SWALLOWING DISABILITIES
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
                name="facilityName"
                value={formData.facilityName}
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
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Applicant Information Section */}
        <h2 className="text-green-900 text-xl font-semibold mb-4">
          Contact and Background
        </h2>

        <h3 className="text-blue-900 font-medium text-sm mb-1">CONTACT DETAILS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* These inputs are for display only, not part of formData from this component */}
          <input
            type="text"
            value={userData.user.fullName}
            className="border rounded px-3 py-2 w-full bg-gray-100"
            readOnly
            aria-label="Applicant Full Name"
          />
          <input
            type="text"
            value={userData.user.phone}
            className="border rounded px-3 py-2 w-full bg-gray-100"
            readOnly
            aria-label="Applicant Phone Number"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-green-700 mb-6">
            Applicant Information for the purpose of reporting on Disability Assessment:
          </h3>
          {/* You could add more display fields here from userData if needed */}
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

        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-700 uppercase tracking-wide mb-6 border-b pb-3 border-blue-100">
            Referral Information
          </h3>

          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-blue-800 w-1/3 text-sm">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-blue-700 border-l border-blue-200 w-2/3 text-sm">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                <tr className="bg-white hover:bg-blue-50 transition-colors duration-200">
                  <td className="py-3 px-4 text-gray-800 font-medium border-t border-gray-200 text-sm">
                    Reason for referral:
                  </td>
                  <td className="py-2 px-4 border-t border-l border-gray-200">
                    <input
                      type="text"
                      name="reasonForReferral"
                      value={formData.reasonForReferral}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                      placeholder="Briefly state the reason for referral"
                      aria-label="Reason for referral"
                    />
                  </td>
                </tr>
                <tr className="bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                  <td className="py-3 px-4 text-gray-800 font-medium border-t border-gray-200 text-sm">
                    Referred By:
                  </td>
                  <td className="py-2 px-4 border-t border-l border-gray-200">
                    <input
                      type="text"
                      name="referredBy"
                      value={formData.referredBy}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                      placeholder="Name or department that referred"
                      aria-label="Referred by"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-4">
            <label htmlFor="medicalDiagnosis" className="block text-gray-700 text-sm font-medium mb-2">
              Medical Diagnosis (if available):
            </label>
            <input
              type="text"
              id="medicalDiagnosis"
              name="medicalDiagnosis"
              value={formData.medicalDiagnosis}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 shadow-sm"
              placeholder="Enter medical diagnosis"
              aria-label="Medical diagnosis"
            />
          </div>
        </div>

        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-700 uppercase tracking-wide mb-6 border-b pb-3 border-blue-100">
            History and Developmental Information
          </h3>

          {/* History of Condition */}
          <div className="mb-6">
            <label htmlFor="historyOfCondition" className="block text-gray-700 text-sm font-medium mb-2">
              History of Condition:
              <span className="text-gray-500 font-normal ml-2">(Fill in relevant Birth History for Developmental Disorder or Medical History for Acquired Disorder)</span>
            </label>
            <textarea
              id="historyOfCondition"
              name="historyOfCondition"
              value={formData.historyOfCondition}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 shadow-sm"
              placeholder="Enter detailed history of the condition..."
              aria-label="History of condition"
            ></textarea>
          </div>

          <div className="mb-6">
            <p className="block text-gray-700 text-sm font-medium mb-3">
              Domains to be assessed: <span className="text-gray-500 font-normal ml-2">(please tick)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center text-gray-700 text-sm">
                <input type="checkbox" name="domainLanguage" checked={formData.domainLanguage} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 border-gray-300 focus:ring-blue-500" />
                LANGUAGE
              </label>
              <label className="flex items-center text-gray-700 text-sm">
                <input type="checkbox" name="domainSpeech" checked={formData.domainSpeech} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 border-gray-300 focus:ring-blue-500" />
                SPEECH
              </label>
              <label className="flex items-center text-gray-700 text-sm">
                <input type="checkbox" name="domainDysphagia" checked={formData.domainDysphagia} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 border-gray-300 focus:ring-blue-500" />
                DYSPHAGIA
              </label>
              <label className="flex items-center text-gray-700 text-sm">
                <input type="checkbox" name="domainCommunication" checked={formData.domainCommunication} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 border-gray-300 focus:ring-blue-500" />
                COMMUNICATION
              </label>
            </div>
          </div>

          {/* Complete the areas below for Developmental Disorders only */}
          <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="block text-gray-700 text-sm font-medium mb-3">
              Complete the areas below for Developmental Disorders only: <span className="text-gray-500 font-normal ml-2">(please tick)</span>
            </p>

            <div className="mb-3">
              <p className="text-gray-700 text-sm font-medium mb-2">Delay in Motor Milestones:</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-gray-700 text-sm">
                  <input type="radio" name="motorMilestones" value="Yes" checked={formData.motorMilestones === "Yes"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                </label>
                <label className="flex items-center text-gray-700 text-sm">
                  <input type="radio" name="motorMilestones" value="No" checked={formData.motorMilestones === "No"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                </label>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-gray-700 text-sm font-medium mb-2">Sensory Impairment:</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 text-sm font-normal">Visual:</span>
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="sensoryVisual" value="Yes" checked={formData.sensoryVisual === "Yes"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                  </label>
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="sensoryVisual" value="No" checked={formData.sensoryVisual === "No"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 text-sm font-normal">Auditory:</span>
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="sensoryAuditory" value="Yes" checked={formData.sensoryAuditory === "Yes"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                  </label>
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="sensoryAuditory" value="No" checked={formData.sensoryAuditory === "No"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="otherDevelopmental" className="block text-gray-700 text-sm font-medium mb-2">
                Other:
              </label>
              <textarea
                id="otherDevelopmental"
                name="otherDevelopmental"
                value={formData.otherDevelopmental}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 shadow-sm"
                placeholder="Specify other developmental concerns"
                aria-label="Other developmental concerns"
              ></textarea>
            </div>
          </div>

          {/* Please attach relevant reports, if available - this is a static text based on image */}
          <p className="text-gray-600 text-xs italic mb-6 text-right">
            Please attach relevant reports, if available
          </p>

          {/* Speech and Language Milestones achieved thus far */}
          <div className="mb-6">
            <label htmlFor="speechLanguageMilestones" className="block text-gray-700 text-sm font-medium mb-2">
              Speech and Language Milestones achieved thus far:
            </label>
            <textarea
              id="speechLanguageMilestones"
              name="speechLanguageMilestones"
              value={formData.speechLanguageMilestones}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 shadow-sm"
              placeholder="Describe milestones achieved"
              aria-label="Speech and language milestones achieved thus far"
            ></textarea>
          </div>

          {/* Pre-Linguistic Skills */}
          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-3">
              Pre-Linguistic Skills: <span className="text-gray-500 font-normal ml-2">(please tick if age appropriate or not)</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
              <div className="flex flex-col">
                <span className="text-gray-700 text-sm font-normal mb-1">Eye Contact:</span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="eyeContact" value="Yes" checked={formData.eyeContact === "Yes"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                  </label>
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="eyeContact" value="No" checked={formData.eyeContact === "No"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700 text-sm font-normal mb-1">Attention Span:</span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="attentionSpan" value="Yes" checked={formData.attentionSpan === "Yes"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                  </label>
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="attentionSpan" value="No" checked={formData.attentionSpan === "No"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700 text-sm font-normal mb-1">Imitation skills:</span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="imitationSkills" value="Yes" checked={formData.imitationSkills === "Yes"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                  </label>
                  <label className="flex items-center text-gray-700 text-sm">
                    <input type="radio" name="imitationSkills" value="No" checked={formData.imitationSkills === "No"} onChange={handleInputChange} className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-700 uppercase tracking-wide mb-3 border-b pb-3 border-blue-100">
            A. LANGUAGE IMPAIRMENTS
          </h3>
          <p className="text-gray-700 text-sm mb-6">
            This section is common for applicants with developmental or acquired disorders. Please complete briefly and use findings from standardized test scored to inform further.
          </p>
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-3">(i). RECEPTIVE LANGUAGE</h4>
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-blue-800 w-1/2 text-sm">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-700 border-l border-blue-200 w-1/2 text-sm">REMARKS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {[
                    { label: 'Attention, Memory', name: 'receptiveAttentionMemory' },
                    { label: 'Listening, Auditory Processing, Phonological Awareness', name: 'receptiveListeningAuditoryProcessingPhonologicalAwareness' },
                    { label: 'Syntactic Comprehension (no. of information carrying words that applicant can understand in 1 sentence)', name: 'receptiveSyntacticComprehension' },
                    { label: 'Semantic Comprehension', name: 'receptiveSemanticComprehension' },
                    { label: 'Reading Comprehension', name: 'receptiveReadingComprehension' }
                  ].map((item, index) => {
                    const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                    return (
                      <tr key={item.name} className={`${rowClass} hover:bg-blue-50 transition-colors duration-200`}>
                        <td className="py-3 px-4 text-gray-800 font-medium border-t border-gray-200 text-sm">
                          {item.label}
                        </td>
                        <td className="py-2 px-4 border-t border-l border-gray-200">
                          <input
                            type="text"
                            name={item.name}
                            value={formData[item.name]}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                            placeholder="Enter remarks"
                            aria-label={`Remarks for ${item.label}`}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-800 mb-3">(ii). EXPRESSIVE LANGUAGE</h4>
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-blue-800 w-1/2 text-sm">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-blue-700 border-l border-blue-200 w-1/2 text-sm">REMARKS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {[
                    { label: 'Sound, word, sentence level production', name: 'expressiveSoundWordSentenceLevelProduction' },
                    { label: 'Non-verbal Communication', name: 'expressiveNonVerbalCommunication' },
                    { label: 'Pragmatics', name: 'expressivePragmatics' },
                    { label: 'Play/Work', name: 'expressivePlayWork' },
                    { label: 'Written output', name: 'expressiveWrittenOutput' }
                  ].map((item, index) => {
                    const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                    return (
                      <tr key={item.name} className={`${rowClass} hover:bg-blue-50 transition-colors duration-200`}>
                        <td className="py-3 px-4 text-gray-800 font-medium border-t border-gray-200 text-sm">
                          {item.label}
                        </td>
                        <td className="py-2 px-4 border-t border-l border-gray-200">
                          <input
                            type="text"
                            name={item.name}
                            value={formData[item.name]}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                            placeholder="Enter remarks"
                            aria-label={`Remarks for ${item.label}`}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="interpretation mb-6 p-6">
            <h1 className='text-blue-800 font-bold'>STANDARDISED TEST RESULTS AND INTERPRETATION</h1>
            <textarea
              name="standardizedTestResults"
              value={formData.standardizedTestResults}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              rows={4}
              placeholder='Enter the results and interpretation of the standardized tests conducted'
              aria-label="Standardized test results and interpretation"
            ></textarea>
          </div>
        </div>

        <div className="mb-4">
          <div className="header">
            <h1 className='font-bold text-xl text-blue-700 my-5'>C. DYSPHAGIA</h1>
            <p>
              SLTs who are not dysphagia trained should use the checklist below to provide more
              information on applicant’s swallow. If objective swallow assessment findings are available,
              attach report and skip the checklist.
            </p>
            <h2 className='font-bold my-2'>Basic Signs & Symptoms of Dysphagia Checklist</h2>
            <p className='font-bold underline my-2'>ASLTK (Association of Speech and Language Therapists Kenya 2021)</p>
            <em>Please complete checklist below if suspecting that applicant has dysphagia and refer on to
              dysphagia specialist for further assessment, conﬁrmed diagnosis and management.</em>
          </div>

          <p className="block text-gray-700 text-sm font-medium mb-3">
            Possible Dysphagia/ &apos;red flag&apos; symptoms: <span className="text-gray-500 font-normal ml-2">(please tick)</span>
          </p>
          <div className="grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input type="checkbox" name="symptom1" checked={formData.symptom1} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">History of recurrent chest infections with or without hospitalization</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom2" checked={formData.symptom2} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Current chest infection that are related to difficulties swallowing</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom3" checked={formData.symptom3} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Dehydration and malnutrition related to difficulties eating &amp; drinking.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom4" checked={formData.symptom4} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Unintentional weight loss short or long term.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom5" checked={formData.symptom5} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Taking a long time to eat/drink a small amount of food or unable to manage a normal amount of food/drink.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom6" checked={formData.symptom6} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Avoidance of particular foods or drinks.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom7" checked={formData.symptom7} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Avoidance of eating/drinking in social situations.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom8" checked={formData.symptom8} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Distress before/during/after eating and/or drinking.</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-medium mb-3">
            Pre-oral Stage Difficulties: <span className="text-gray-500 font-normal ml-2">(please tick)</span>
          </p>
          <div className="grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input type="checkbox" name="preOralDifficulty1" checked={formData.preOralDifficulty1} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Difficulty with self-feeding (as appropriate to age).</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="preOralDifficulty2" checked={formData.preOralDifficulty2} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Difficulty with cleaning own mouth/ teeth (as appropriate to age).</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-medium mb-3">
            Oral Stage Difficulties: <span className="text-gray-500 font-normal ml-2">(please tick)</span>
          </p>
          <div className="grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input type="checkbox" name="oralDifficulty1" checked={formData.oralDifficulty1} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Difficulty closing lips when eating and drinking. (Age appropriate)</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="oralDifficulty2" checked={formData.oralDifficulty2} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Difficulty taking food off a spoon or fork. (Age appropriate)</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="oralDifficulty3" checked={formData.oralDifficulty3} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Losing food or drink from the mouth (oral escape), age appropriate.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="oralDifficulty4" checked={formData.oralDifficulty4} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Restricted oral movements due to neurological/ neuromuscular problem.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="oralDifficulty5" checked={formData.oralDifficulty5} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Food residue in mouth after swallowing.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="oralDifficulty6" checked={formData.oralDifficulty6} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Difficulty managing saliva/ drooling.</label>
            </div>
          </div>
        </div>

        {/* Pharyngeal Stage Difficulties */}
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-medium mb-3">
            Pharyngeal Stage Difficulties: <span className="text-gray-500 font-normal ml-2">(please tick)</span>
          </p>
          <div className="grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input type="checkbox" name="pharyngealDifficulty1" checked={formData.pharyngealDifficulty1} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Blinking, eye bulging, squeezing eyes, tearing up/ crying, red eyes, or grimacing associated with swallowing.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="pharyngealDifficulty2" checked={formData.pharyngealDifficulty2} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Coughing, throat clearing during or soon after swallowing.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="pharyngealDifficulty3" checked={formData.pharyngealDifficulty3} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Changing colour (flushed or blue/ grey) or breath pattern changes, just after swallowing.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="pharyngealDifficulty4" checked={formData.pharyngealDifficulty4} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Nasal/ oral regurgitation of food/ drinks during/ just after swallowing.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="pharyngealDifficulty5" checked={formData.pharyngealDifficulty5} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">'Wet' or gurgly voice after swallowing.</label>
            </div>
          </div>
        </div>

        {/* Esophageal Stage Difficulties */}
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-medium mb-3">
            Esophageal Stage Difficulties: <span className="text-gray-500 font-normal ml-2">(please tick)</span>
          </p>
          <div className="grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input type="checkbox" name="esophagealDifficulty1" checked={formData.esophagealDifficulty1} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Reflux (heartburn, chest pain, acid) during or after (up to 30 minutes) swallow.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="esophagealDifficulty2" checked={formData.esophagealDifficulty2} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Coughing after eating/ drinking or regurgitating food.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="esophagealDifficulty3" checked={formData.esophagealDifficulty3} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Coughing when lying down.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="esophagealDifficulty4" checked={formData.esophagealDifficulty4} onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Breathing difficulties or choking episodes, sometimes on saliva or on no oral intake.</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-medium mb-3">
            SCORE: Total no. of ticks on all stage:
          </p>
          <div className="mt-2">
            <input type="text" name="score" value={formData.score} onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter total score here" />
          </div>
        </div>

        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-normal italic">
            Please note that person with dysphagia may present with one or more of these symptoms.
          </p>
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
                <input type="radio" name="severity" value="Mild" checked={formData.severity === "Mild"} onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-700 text-sm">Mild</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="severity" value="Moderate" checked={formData.severity === "Moderate"} onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-700 text-sm">Moderate</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="severity" value="Severe" checked={formData.severity === "Severe"} onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-700 text-sm">Severe</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="severity" value="Profound" checked={formData.severity === "Profound"} onChange={handleInputChange}
                  className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-gray-700 text-sm">Profound</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <p className="block text-gray-700 text-sm font-medium mb-3">
              Impact of disability on fulfilling PWD’s roles and responsibilities.
            </p>
            <textarea name="impactOnRoles" value={formData.impactOnRoles} onChange={handleInputChange} rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-label="Impact of disability on fulfilling PWD’s roles and responsibilities"></textarea>
          </div>

          <div className="mb-6">
            <p className="block text-gray-700 text-sm font-medium mb-3">
              Impact on Career
            </p>
            <textarea name="impactOnCareer" value={formData.impactOnCareer} onChange={handleInputChange} rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-label="Impact on Career"></textarea>
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-3">
              Recommendations: <span className="text-gray-500 font-normal ml-2">(please tick and expand below)</span>
            </p>
            <div className="grid grid-cols-1 gap-y-3">
              <div className="flex items-center">
                <input type="checkbox" name="recommendation1" checked={formData.recommendation1} onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                <label className="text-gray-700 text-sm font-normal">Further management of speech, language, communication, swallowing disorder.</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="recommendation2" checked={formData.recommendation2} onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                <label className="text-gray-700 text-sm font-normal">Referral to other professionals</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="recommendation3" checked={formData.recommendation3} onChange={handleInputChange}
                  className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                <label className="text-gray-700 text-sm font-normal">Communication aids</label>
              </div>
            </div>
            <textarea name="recommendationsExpand" value={formData.recommendationsExpand} onChange={handleInputChange} rows="6"
              className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Expand on recommendations here..." aria-label="Expand on recommendations"></textarea>
          </div>
        </div>

        <div className="mb-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                    Cause of disability
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-2/3"
                    colSpan="2">
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    Date of injury/onset of illness
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    <input type="date" name="dateOfInjuryOnset" value={formData.dateOfInjuryOnset} onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input type="radio" name="injuryType" value="Acute" checked={formData.injuryType === "Acute"} onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Acute
                    </label>
                    <label className="inline-flex items-center">
                      <input type="radio" name="injuryType" value="Chronic" checked={formData.injuryType === "Chronic"} onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Chronic
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                    Date of last intervention
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700" colSpan="2">
                    <input type="date" name="dateOfLastIntervention" value={formData.dateOfLastIntervention} onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-2">
              RECOMMENDED ASSISTIVE PRODUCT(S)........................................
            </p>
            <input type="text" name="recommendedAssistiveProducts" value={formData.recommendedAssistiveProducts} onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>

          <div className="mb-4">
            <p className="block text-gray-700 text-sm font-medium mb-2">
              OTHER REQUIRED SERVICES................................................
            </p>
            <input type="text" name="otherRequiredServices" value={formData.otherRequiredServices} onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
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

export default SpeechImparements;