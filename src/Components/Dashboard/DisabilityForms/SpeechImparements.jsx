import React from 'react'
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary

const SpeechImparements = () => {
    const [formData, setFormData] = React.useState({
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
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-blue-700 text-center mb-8">
        ASSESSMENT FOR SPEECH, LANGUAGE, COMMUNICATION AND SWALLOWING DISABILITIES
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
        <input
          type="text"
          placeholder="+254 0726917891"
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="email"
          placeholder="Antony.kaburu@gmail.com"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <h3 className="text-blue-900 font-medium text-sm mb-1">LOCATION</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Nairobi"
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Westlands"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <h3 className="text-blue-900 font-medium text-sm mb-1">
        OCCUPATION AND EDUCATION
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Designer"
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Degree"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <h3 className="text-blue-900 font-medium text-sm mb-1">
        NEXT OF KIN DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Name Surname"
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Friend"
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="+254 0738917891"
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <h2 className="text-green-900 text-xl font-semibold mb-2">History</h2>
      <h3 className="text-blue-900 font-medium text-sm mb-1">ASSISTIVE DEVICE</h3>
      <textarea
        placeholder="Describe the assistive devices used if any"
        rows="4"
        className="border rounded px-3 py-2 w-full mb-6"
      ></textarea>
            <div className="mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-6">
          Applicant Information for the purpose of reporting on Disability
          Assessment:
        </h3>

        {/* Bio Data */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-gray-700 mb-4">
            Bio Data
          </h4>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
              Full Name
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Middle Name"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>

          {/* Identification */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
              Identification
            </label>
            <div className="max-w-md">
              <label className="block text-xs text-gray-500 mb-1">
                ID/Passport No.
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ID/Passport Number"
              />
            </div>
          </div>

          {/* Demographics */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-600 uppercase tracking-wide mb-2">
              Demographics
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <h3 class="text-blue-900 font-medium text-sm mb-1">MEDICAL HISTORY</h3>
        <textarea
          class="border rounded w-full px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
          rows="3"
          placeholder="Describe the PWD's medical History"
        ></textarea>
      </div>
        <div class="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-blue-700 uppercase tracking-wide mb-6 border-b pb-3 border-blue-100">
                Referral Information
            </h3>
            
            <div class="border border-gray-300 rounded-lg overflow-hidden shadow-sm mb-6">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-blue-50">
                        <tr>
                            <th class="text-left py-3 px-4 font-semibold text-blue-800 w-1/3 text-sm">Category</th>
                            <th class="text-left py-3 px-4 font-semibold text-blue-700 border-l border-blue-200 w-2/3 text-sm">Details</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                        <tr class="bg-white hover:bg-blue-50 transition-colors duration-200">
                            <td class="py-3 px-4 text-gray-800 font-medium border-t border-gray-200 text-sm">
                                Reason for referral:
                            </td>
                            <td class="py-2 px-4 border-t border-l border-gray-200">
                                <input
                                    type="text"
                                    name="reasonForReferral"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                                    placeholder="Briefly state the reason for referral"
                                    aria-label="Reason for referral"
                                />
                            </td>
                        </tr>
                        <tr class="bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                            <td class="py-3 px-4 text-gray-800 font-medium border-t border-gray-200 text-sm">
                                Referred By:
                            </td>
                            <td class="py-2 px-4 border-t border-l border-gray-200">
                                <input
                                    type="text"
                                    name="referredBy"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                                    placeholder="Name or department that referred"
                                    aria-label="Referred by"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mb-4">
                <label for="medicalDiagnosis" class="block text-gray-700 text-sm font-medium mb-2">
                    Medical Diagnosis (if available):
                </label>
                <input
                    type="text"
                    id="medicalDiagnosis"
                    name="medicalDiagnosis"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 shadow-sm"
                    placeholder="Enter medical diagnosis"
                    aria-label="Medical diagnosis"
                />
            </div>
        </div>
<div class="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-blue-700 uppercase tracking-wide mb-6 border-b pb-3 border-blue-100">
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
                        <input type="checkbox" name="domainLanguage" className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 border-gray-300 focus:ring-blue-500" />
                        LANGUAGE
                    </label>
                    <label className="flex items-center text-gray-700 text-sm">
                        <input type="checkbox" name="domainSpeech" className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 border-gray-300 focus:ring-blue-500" />
                        SPEECH
                    </label>
                    <label className="flex items-center text-gray-700 text-sm">
                        <input type="checkbox" name="domainDysphagia" className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 border-gray-300 focus:ring-blue-500" />
                        DYSPHAGIA
                    </label>
                    <label className="flex items-center text-gray-700 text-sm">
                        <input type="checkbox" name="domainCommunication" className="form-checkbox h-4 w-4 text-blue-600 rounded mr-2 border-gray-300 focus:ring-blue-500" />
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
                            <input type="radio" name="motorMilestones" value="Yes" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                        </label>
                        <label className="flex items-center text-gray-700 text-sm">
                            <input type="radio" name="motorMilestones" value="No" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-gray-700 text-sm font-medium mb-2">Sensory Impairment:</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700 text-sm font-normal">Visual:</span>
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="sensoryVisual" value="Yes" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                            </label>
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="sensoryVisual" value="No" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700 text-sm font-normal">Auditory:</span>
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="sensoryAuditory" value="Yes" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                            </label>
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="sensoryAuditory" value="No" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
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
                                <input type="radio" name="eyeContact" value="Yes" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                            </label>
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="eyeContact" value="No" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-700 text-sm font-normal mb-1">Attention Span:</span>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="attentionSpan" value="Yes" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                            </label>
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="attentionSpan" value="No" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-700 text-sm font-normal mb-1">Imitation skills:</span>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="imitationSkills" value="Yes" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Yes
                            </label>
                            <label className="flex items-center text-gray-700 text-sm">
                                <input type="radio" name="imitationSkills" value="No" className="form-radio h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> No
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
                'Attention, Memory',
                'Listening, Auditory Processing, Phonological Awareness',
                'Syntactic Comprehension (no. of information carrying words that applicant can understand in 1 sentence)',
                'Semantic Comprehension',
                'Reading Comprehension'
              ].map((item, index) => {
                const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                const itemId = item.replace(/[^a-zA-Z0-9]/g, '');
                return (
                  <tr key={itemId} className={`${rowClass} hover:bg-blue-50 transition-colors duration-200`}>
                    <td className="py-3 px-4 text-gray-800 font-medium border-t border-gray-200 text-sm">
                      {item}
                    </td>
                    <td className="py-2 px-4 border-t border-l border-gray-200">
                      <input
                        type="text"
                        name={`receptive_${itemId}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                        placeholder="Enter remarks"
                        aria-label={`Remarks for ${item}`}
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
                'Sound, word, sentence level production',
                'Non-verbal Communication',
                'Pragmatics',
                'Play/Work',
                'Written output'
              ].map((item, index) => {
                const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                const itemId = item.replace(/[^a-zA-Z0-9]/g, '');
                return (
                  <tr key={itemId} className={`${rowClass} hover:bg-blue-50 transition-colors duration-200`}>
                    <td className="py-3 px-4 text-gray-800 font-medium border-t border-gray-200 text-sm">
                      {item}
                    </td>
                    <td className="py-2 px-4 border-t border-l border-gray-200">
                      <input
                        type="text"
                        name={`expressive_${itemId}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
                        placeholder="Enter remarks"
                        aria-label={`Remarks for ${item}`}
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
          <textarea className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' rows={4} placeholder='Enter the results and interpretation of the standardized tests conducted'>
          </textarea>
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
              <input type="checkbox" name="symptom1" value="History of recurrent chest infections with or without hospitalization"
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">History of recurrent chest infections with or without hospitalization</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom2" value="Current chest infection that are related to difficulties swallowing"
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Current chest infection that are related to difficulties swallowing</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom3" value="Dehydration and malnutrition related to difficulties eating & drinking."
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Dehydration and malnutrition related to difficulties eating &amp; drinking.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom4" value="Unintentional weight loss short or long term."
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Unintentional weight loss short or long term.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom5"
              value="Taking a long time to eat/drink a small amount of food or unable to manage a normal amount of food/drink."
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Taking a long time to eat/drink a small amount of food or unable to manage a normal amount of food/drink.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom6" value="Avoidance of particular foods or drinks."
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Avoidance of particular foods or drinks.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom7" value="Avoidance of eating/drinking in social situations."
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Avoidance of eating/drinking in social situations.</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="symptom8" value="Distress before/during/after eating and/or drinking."
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
              <input type="checkbox" name="preOralDifficulty1" value="Difficulty with self-feeding (as appropriate to age)."
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Difficulty with self-feeding (as appropriate to age).</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="preOralDifficulty2" value="Difficulty with cleaning own mouth/ teeth (as appropriate to age)."
              className="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
              <label className="text-gray-700 text-sm font-normal">Difficulty with cleaning own mouth/ teeth (as appropriate to age).</label>
            </div>
            </div>
            <div class="mb-4">
    <p class="block text-gray-700 text-sm font-medium mb-3">
        Oral Stage Difficulties: <span class="text-gray-500 font-normal ml-2">(please tick)</span>
    </p>
    <div class="grid grid-cols-1 gap-y-4">
        <div class="flex items-center">
            <input type="checkbox" name="oralDifficulty1"
                value="Difficulty closing lips when eating and drinking. (Age appropriate)"
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Difficulty closing lips when eating and drinking. (Age
                appropriate)</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="oralDifficulty2"
                value="Difficulty taking food off a spoon or fork. (Age appropriate)"
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Difficulty taking food off a spoon or fork. (Age
                appropriate)</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="oralDifficulty3"
                value="Losing food or drink from the mouth (oral escape), age appropriate."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Losing food or drink from the mouth (oral escape), age
                appropriate.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="oralDifficulty4"
                value="Restricted oral movements due to neurological/ neuromuscular problem."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Restricted oral movements due to neurological/
                neuromuscular problem.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="oralDifficulty5" value="Food residue in mouth after swallowing."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Food residue in mouth after swallowing.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="oralDifficulty6" value="Difficulty managing saliva/ drooling."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Difficulty managing saliva/ drooling.</label>
        </div>
    </div>
</div>

<div class="mb-4">
    <p class="block text-gray-700 text-sm font-medium mb-3">
        Pharyngeal Stage Difficulties: <span class="text-gray-500 font-normal ml-2">(please tick)</span>
    </p>
    <div class="grid grid-cols-1 gap-y-4">
        <div class="flex items-center">
            <input type="checkbox" name="pharyngealDifficulty1"
                value="Blinking, eye bulging, squeezing eyes, tearing up/ crying, red eyes, or grimacing associated with swallowing."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Blinking, eye bulging, squeezing eyes, tearing up/
                crying, red eyes, or grimacing associated with swallowing.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="pharyngealDifficulty2"
                value="Coughing, throat clearing during or soon after swallowing."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Coughing, throat clearing during or soon after
                swallowing.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="pharyngealDifficulty3"
                value="Changing colour (flushed or blue/ grey) or breath pattern changes, just after swallowing."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Changing colour (flushed or blue/ grey) or breath pattern
                changes, just after swallowing.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="pharyngealDifficulty4"
                value="Nasal/ oral regurgitation of food/ drinks during/ just after swallowing."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Nasal/ oral regurgitation of food/ drinks during/ just
                after swallowing.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="pharyngealDifficulty5" value="'Wet' or gurgly voice after swallowing."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">'Wet' or gurgly voice after swallowing.</label>
        </div>
    </div>
</div>

<div class="mb-4">
    <p class="block text-gray-700 text-sm font-medium mb-3">
        Esophageal Stage Difficulties: <span class="text-gray-500 font-normal ml-2">(please tick)</span>
    </p>
    <div class="grid grid-cols-1 gap-y-4">
        <div class="flex items-center">
            <input type="checkbox" name="esophagealDifficulty1"
                value="Reflux (heartburn, chest pain, acid) during or after (up to 30 minutes) swallow."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Reflux (heartburn, chest pain, acid) during or after (up
                to 30 minutes) swallow.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="esophagealDifficulty2"
                value="Coughing after eating/ drinking or regurgitating food."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Coughing after eating/ drinking or regurgitating
                food.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="esophagealDifficulty3" value="Coughing when lying down."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Coughing when lying down.</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="esophagealDifficulty4"
                value="Breathing difficulties or choking episodes, sometimes on saliva or on no oral intake."
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">Breathing difficulties or choking episodes, sometimes on
                saliva or on no oral intake.</label>
        </div>
    </div>
</div>

<div class="mb-4">
    <p class="block text-gray-700 text-sm font-medium mb-3">
        SCORE: Total no. of ticks on all stage:
    </p>
    <div class="mt-2">
        <input type="text" name="score"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter total score here" />
    </div>
</div>

<div class="mb-4">
    <p class="block text-gray-700 text-sm font-normal italic">
        Please note that person with dysphagia may present with one or more of these symptoms.
    </p>
</div>
          </div>
            {/* Conclusion Section */}
  <div class="mb-4">
    <h3 class="text-lg font-bold text-gray-800 mb-3">CONCLUSION</h3>

    <p class="block text-gray-700 text-sm font-medium mb-3">
        SLT DIAGNOSIS: Include severity and complete attached scale to rate impairment, activity, participation,
        well-being, and distress.
    </p>

    <div class="mb-6">
        <p class="block text-gray-700 text-sm font-normal mb-2">Severity (circle as appropriate):</p>
        <div class="flex items-center space-x-6">
            <label class="inline-flex items-center">
                <input type="radio" name="severity" value="Mild"
                    class="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700 text-sm">Mild</span>
            </label>
            <label class="inline-flex items-center">
                <input type="radio" name="severity" value="Moderate"
                    class="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700 text-sm">Moderate</span>
            </label>
            <label class="inline-flex items-center">
                <input type="radio" name="severity" value="Severe"
                    class="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700 text-sm">Severe</span>
            </label>
            <label class="inline-flex items-center">
                <input type="radio" name="severity" value="Profound"
                    class="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700 text-sm">Profound</span>
            </label>
        </div>
    </div>

    <div class="mb-6">
        <p class="block text-gray-700 text-sm font-medium mb-3">
            Impact of disability on fulfilling PWD’s roles and responsibilities.
        </p>
        <textarea name="impactOnRoles" rows="4"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
    </div>

    <div class="mb-6">
        <p class="block text-gray-700 text-sm font-medium mb-3">
            Impact on Career
        </p>
        <textarea name="impactOnCareer" rows="4"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
    </div>

    <div class="mb-4">
        <p class="block text-gray-700 text-sm font-medium mb-3">
            Recommendations: <span class="text-gray-500 font-normal ml-2">(please tick and expand below)</span>
        </p>
        <div class="grid grid-cols-1 gap-y-3">
            <div class="flex items-center">
                <input type="checkbox" name="recommendation1"
                    value="Further management of speech, language, communication, swallowing disorder."
                    class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                <label class="text-gray-700 text-sm font-normal">Further management of speech, language,
                    communication, swallowing disorder.</label>
            </div>
            <div class="flex items-center">
                <input type="checkbox" name="recommendation2" value="Referral to other professionals"
                    class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                <label class="text-gray-700 text-sm font-normal">Referral to other professionals</label>
            </div>
            <div class="flex items-center">
                <input type="checkbox" name="recommendation3" value="Communication aids"
                    class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                <label class="text-gray-700 text-sm font-normal">Communication aids</label>
            </div>
        </div>
        <textarea name="recommendationsExpand" rows="6"
            class="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Expand on recommendations here..."></textarea>
    </div>
</div>
<div class="mb-4">
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                        Cause of disability
                    </th>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-2/3"
                        colspan="2">
                        </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        Date of injury/onset of illness
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="dateOfInjuryOnset"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 flex items-center space-x-4">
                        <label class="inline-flex items-center">
                            <input type="checkbox" name="injuryType" value="Acute"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Acute
                        </label>
                        <label class="inline-flex items-center">
                            <input type="checkbox" name="injuryType" value="Chronic"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-1 focus:ring-blue-500" /> Chronic
                        </label>
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        Date of last intervention
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700" colspan="2">
                        <input type="text" name="dateOfLastIntervention"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="mt-8 mb-4">
        <p class="block text-gray-700 text-sm font-medium mb-2">
            RECOMMENDED ASSISTIVE PRODUCT(S)........................................
        </p>
        <input type="text" name="recommendedAssistiveProducts"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>

    <div class="mb-4">
        <p class="block text-gray-700 text-sm font-medium mb-2">
            OTHER REQUIRED SERVICES................................................
        </p>
        <input type="text" name="otherRequiredServices"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>
</div>
      {/* Medical team */}

      <div className="mb-8">
        <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
          Assembled Medical Team details:
        </h3>
        
        <div className="border border-gray-400 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-gray-400">MEMBERS</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-gray-400">NAME</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-gray-400">REG. NO.</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">SIGNATURE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-400">
                <td className="py-4 px-4 text-gray-700 font-medium border-r border-gray-400 bg-gray-50">
                  Chairperson
                </td>
                <td className="py-4 px-4 border-r border-gray-400">
                  <input
                    type="text"
                    name="chairpersonName"
                    className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none focus:bg-white focus:border focus:border-blue-500 focus:rounded"
                    placeholder=""
                  />
                </td>
                <td className="py-4 px-4 border-r border-gray-400">
                  <input
                    type="text"
                    name="chairpersonRegNo"
                    className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none focus:bg-white focus:border focus:border-blue-500 focus:rounded"
                    placeholder=""
                  />
                </td>
                <td className="py-4 px-4">
                  <input
                    type="text"
                    name="chairpersonSignature"
                    className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none focus:bg-white focus:border focus:border-blue-500 focus:rounded"
                    placeholder=""
                  />
                </td>
              </tr>
              {[1, 2, 3].map((index) => (
                <tr key={index} className="border-t border-gray-400">
                  <td className="py-4 px-4 text-gray-700 font-medium border-r border-gray-400 bg-gray-50">
                    Member
                  </td>
                  <td className="py-4 px-4 border-r border-gray-400">
                    <input
                      type="text"
                      name={`member${index}Name`}
                      className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none focus:bg-white focus:border focus:border-blue-500 focus:rounded"
                      placeholder=""
                    />
                  </td>
                  <td className="py-4 px-4 border-r border-gray-400">
                    <input
                      type="text"
                      name={`member${index}RegNo`}
                      className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none focus:bg-white focus:border focus:border-blue-500 focus:rounded"
                      placeholder=""
                    />
                  </td>
                  <td className="py-4 px-4">
                    <input
                      type="text"
                      name={`member${index}Signature`}
                      className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none focus:bg-white focus:border focus:border-blue-500 focus:rounded"
                      placeholder=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  )
}

export default SpeechImparements