import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";


const MentalImparements = ({userData}) => {
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
              value={userData.user.hospital}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Health Facility Name"
            />
          </div>
          <div className="relative">
            <input
              type="date"
              name="assessmentDate"
              value={format(Date.now(),"dd MMMM yyyy")}
              onChange={handleInputChange}
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
          value={userData.user.fullName}
       
          class="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
value={userData.user.phone}
          class="border rounded px-3 py-2 w-full"
        />
      </div>

   

  


 
            <div className="mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-6">
          Applicant Information for the purpose of reporting on Disability
          Assessment:
        </h3>


      </div>
  <div className="history">
    <h2 className="text-green-900 text-xl font-semibold mb-4">
        BRIEF CLINICAL HISTORY (Past and Present Medical History)
    </h2>
    <textarea className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none">

    </textarea>
  </div>
    <div className="mental-evaluation">
    <h2 className="text-green-900 text-xl font-semibold mb-4">
        Mental Status Evaluation
    </h2>
    <textarea className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none">

    </textarea>
  </div>
  <div class="mb-4">
    <p class="block text-gray-700 text-sm font-medium mb-3">
        Complete the Assessment Tool Below by Scoring Appropriately
    </p>
    <p class="block text-gray-700 text-sm font-bold mb-3">
        Knows how and when to feed, toilet or groom self
    </p>

    <div class="overflow-x-auto mb-6">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                        Feeding
                    </th>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                        Toileting
                    </th>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                        Grooming
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="feedingScore" value="0.0 Completely Independent"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            0.0 Completely Independent
                        </label>
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="toiletingScore" value="0.0 Completely Independent"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            0.0 Completely Independent
                        </label>
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="groomingScore" value="0.0 Completely Independent"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            0.0 Completely Independent
                        </label>
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="feedingScore" value="1.0 Partial"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            1.0 Partial
                        </label>
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="toiletingScore" value="1.0 Partial"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            1.0 Partial
                        </label>
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="groomingScore" value="1.0 Partial"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            1.0 Partial
                        </label>
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="feedingScore" value="2.0 Minimal"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            2.0 Minimal
                        </label>
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="toiletingScore" value="2.0 Minimal"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            2.0 Minimal
                        </label>
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="groomingScore" value="2.0 Minimal"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            2.0 Minimal
                        </label>
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="feedingScore" value="3.0 None (Dependent)"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            3.0 None (Dependent)
                        </label>
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="toiletingScore" value="3.0 None (Dependent)"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            3.0 None (Dependent)
                        </label>
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <label class="flex items-center">
                            <input type="checkbox" name="groomingScore" value="3.0 None (Dependent)"
                                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
                            3.0 None (Dependent)
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/2">
                        Dependence on Others
                    </th>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/2">
                        Psychosocial Adaptability
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-2 px-4 border-b border-r border-gray-300 text-sm text-gray-700 font-medium">
                        Level of Functioning
                    </td>
                    <td class="py-2 px-4 border-b border-gray-300 text-sm text-gray-700 font-medium">
                        Employability/ Schooling
                    </td>
                </tr>
                <tr>
                    <td class="py-2 px-4 border-b border-r border-gray-300 text-sm text-gray-700 italic">
                        Physical & cognitive disability
                    </td>
                    <td class="py-2 px-4 border-b border-gray-300 text-sm text-gray-700 italic">
                        As full-time worker, homemaker, student
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        0.0 Completely Independent
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        0.0 Not Restricted
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        1.0 Independent in special environment
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        1.0 Selected jobs, competitive
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        2.0 Mildly Dependent-Limited assistance
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        2.0 Sheltered workshop, Non-competitive.
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        3.0 Moderately Dependent-moderate assist by Person in home
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        3.0 Not Employable/ not in school
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        4.0 Markedly Dependent Assistance with all major activities, all times
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        5.0 Totally Dependent
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 font-bold">
                        Total Disability Rating Score (Sum of all Scores)
                    </td>
                    <td class="py-3 px-4 border-gray-300 text-sm text-gray-700">
                        <div class="flex items-center">
                            <span class="mr-2">=</span>
                            <input type="text" name="totalDisabilityScore"
                                class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="mb-4">
    <h3 class="text-lg font-bold text-gray-800 mb-3">Scoring Key:</h3>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-1/2">
                        Total DR Score
                    </th>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-1/2">
                        Level of Disability
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-center text-sm text-gray-700">
                        0
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-center text-sm text-gray-700">
                        None
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-center text-sm text-gray-700">
                        1 - 4
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-center text-sm text-gray-700">
                        Mild
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-center text-sm text-gray-700">
                        5 - 8
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-center text-sm text-gray-700">
                        Moderate
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-center text-sm text-gray-700">
                        9 - 12
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-center text-sm text-gray-700">
                        Severe
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-r border-gray-300 text-center text-sm text-gray-700">
                        13 - 17
                    </td>
                    <td class="py-3 px-4 text-center text-sm text-gray-700">
                        Very Severe
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

      {/* Conclusion Section */}
 <div class="mb-4">
    <h3 class="text-lg font-bold text-gray-800 mb-3">Conclusion:</h3>

    <div class="mb-4">
        <p class="block text-gray-700 text-sm font-normal mb-1">Duration of Illness:</p>
        <input type="text" name="durationOfIllness"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>

    <div class="mb-4">
        <p class="block text-gray-700 text-sm font-normal mb-1">Major Cause of Disability:</p>
        <input type="text" name="majorCauseOfDisability"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>

    <div class="mb-4">
        <p class="block text-gray-700 text-sm font-normal mb-1">Level of Disability:</p>
        <input type="text" name="levelOfDisability"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>

    <div class="mt-8 mb-4">
        <p class="block text-gray-700 text-sm font-medium mb-2">
            RECOMMENDED ASSISTIVE PRODUCT(S)........................................
        </p>
        <input type="text" name="recommendedAssistiveProductsConclusion"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>

    <div class="mb-4">
        <p class="block text-gray-700 text-sm font-medium mb-2">
            OTHER REQUIRED SERVICES................................................
        </p>
        <input type="text" name="otherRequiredServicesConclusion"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
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

export default MentalImparements