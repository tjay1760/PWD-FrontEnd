import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary

const HearingImparements = () => {
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
    
            <h2 class="text-green-900 text-xl font-semibold mb-4">
              Contact and Background
            </h2>
    
            <h3 class="text-blue-900 font-medium text-sm mb-1">CONTACT DETAILS</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="+254 0726917891"
                class="border rounded px-3 py-2 w-full"
              />
              <input
                type="email"
                placeholder="Antony.kaburu@gmail.com"
                class="border rounded px-3 py-2 w-full"
              />
            </div>
    
            <h3 class="text-blue-900 font-medium text-sm mb-1">LOCATION</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Nairobi"
                class="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                placeholder="Westlands"
                class="border rounded px-3 py-2 w-full"
              />
            </div>
    
            <h3 class="text-blue-900 font-medium text-sm mb-1">
              OCCUPATION AND EDUCATION
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Designer"
                class="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                placeholder="Degree"
                class="border rounded px-3 py-2 w-full"
              />
            </div>
    
            <h3 class="text-blue-900 font-medium text-sm mb-1">
              NEXT OF KIN DETAILS
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                placeholder="Name Surname"
                class="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                placeholder="Friend"
                class="border rounded px-3 py-2 w-full"
              />
              <input
                type="text"
                placeholder="+254 0738917891"
                class="border rounded px-3 py-2 w-full"
              />
            </div>
    
            <h2 class="text-green-900 text-xl font-semibold mb-2">History</h2>
            <h3 class="text-blue-900 font-medium text-sm mb-1">ASSISTIVE DEVICE</h3>
            <textarea
              placeholder="Describe the assistive devices used if any"
              rows="4"
              class="border rounded px-3 py-2 w-full mb-6"
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
                        <input type="text" name="historyOfHearingLoss"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 w-1/3">
                        History of Hearing Devices Usage
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 w-2/3">
                        <input type="text" name="historyOfHearingDevicesUsage"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <h3 class="text-lg font-bold text-gray-800 mb-3">3.0 Hearing Test Results</h3>
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
                        <input type="text" name="typeOfHearingLossRight"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="typeOfHearingLossLeft"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Degree (Grade) of Hearing Loss
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="degreeOfHearingLossRight"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="degreeOfHearingLossLeft"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <h3 class="text-lg font-bold text-gray-800 mb-3">4.0 Calculation of Hearing Disability</h3>
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
                        <input type="text" name="hearingLevelRight"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="monauralRight"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td rowspan="2" class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="binauralOverall"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Left
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="hearingLevelLeft"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="monauralLeft"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
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
            {/* Medical team */}
    
            <div className="mb-8">
              <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
                Assembled Medical Team details:
              </h3>
    
              <div className="border border-gray-400 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-gray-400">
                        MEMBERS
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-gray-400">
                        NAME
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800 border-r border-gray-400">
                        REG. NO.
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">
                        SIGNATURE
                      </th>
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

export default HearingImparements