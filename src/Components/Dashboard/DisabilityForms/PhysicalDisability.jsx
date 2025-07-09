import React from 'react'
import { Calendar } from 'lucide-react';
import wheelChairMan from "../../../assets/Wheelchair man.png"
import { format } from 'date-fns';


const PhysicalDisability = ({userData}) => {
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
              value={userData.user.hospital}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Health Facility Name"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name="assessmentDate"
              value={format(Date.now(),'dd MMMM yyyy')}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
value={userData.user.fullName}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
value={userData.user.phone}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

  

    


 
            <div className="mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-6">
          Applicant Information for the purpose of reporting on Disability
          Assessment:
        </h3>

    

      </div>
<div class="mb-4">
    <h3 class="text-lg font-bold text-gray-800 mb-3">SUMMARY FINDINGS</h3>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                        Brief Medical History
                    </th>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-2/3">
                        </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        Date of Injury/Onset of Illness
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="summaryDateOfInjuryOnset"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        Date of Last Intervention
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="summaryDateOfLastIntervention"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        Cause of Disability
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="summaryCauseOfDisability"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="mb-4">
    <h3 class="text-lg font-bold text-gray-800 mb-3">STRUCTURAL IMPAIRMENTS</h3>
    <div class="border-b border-gray-300 pb-2 mb-4"></div>
    <div class="border-b border-gray-300 pb-2 mb-6"></div>

    <p class="block text-gray-700 text-sm font-medium mb-3">
        s7. STRUCTURE: <span class="text-gray-500 font-normal ml-2">(Tick Region/part being assessed that has IMPAIREMENT)</span>
    </p>
    <div class="grid grid-cols-1 gap-y-3 mb-6">
        <div class="flex items-center">
            <input type="checkbox" name="structureS710" value="Head and neck region"
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">s710 Head and neck region</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="structureS720" value="Shoulder region"
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">s720 Shoulder region</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="structureS730" value="Upper extremity (arm, hand)"
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">s730 Upper extremity (arm, hand)</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="structureS740" value="Pelvis"
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">s740 Pelvis</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="structureS750" value="Lower extremity (leg, foot)"
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">s750 Lower extremity (leg, foot)</label>
        </div>
        <div class="flex items-center">
            <input type="checkbox" name="structureS760" value="Trunk"
                class="form-checkbox h-4 w-4 text-blue-600 mr-2 focus:ring-blue-500" />
            <label class="text-gray-700 text-sm font-normal">s760 Trunk</label>
        </div>
    </div>

    <p class="block text-gray-700 text-sm font-medium mb-3">
        s8. SKIN AND RELATED STRUCTURES ANY OTHER BODY STRUCTURES
    </p>

    <p class="block text-gray-700 text-sm font-medium mb-2">
        REGION (s) AFFECTED
    </p>
   <textaarea class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4">
        Please describe the affected regions here...
   </textaarea>
</div>
<div class="mb-4">
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th rowspan="2"
                        class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/5">
                        Assessment Area
                    </th>
                    <th rowspan="2"
                        class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/5">
                        Findings
                    </th>
                    <th colspan="5"
                        class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-2/5">
                        Score ✓ for nature of impairments
                    </th>
                    <th rowspan="2"
                        class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/5">
                        Remarks
                    </th>
                </tr>
                <tr>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        No Impairment
                    </th>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        Mild Impairment
                    </th>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        Moderate Impairment
                    </th>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        Severe Impairment
                    </th>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        Complete Impairment
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Muscle Power of affected muscle groups
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="musclePowerFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musclePowerScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musclePowerScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musclePowerScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musclePowerScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musclePowerScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="musclePowerRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Range of motion of joints affected
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="rangeOfMotionFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="rangeOfMotionScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="rangeOfMotionScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="rangeOfMotionScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="rangeOfMotionScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="rangeOfMotionScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="rangeOfMotionRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Degree of structural angulation /deviation
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="structuralAngulationFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="structuralAngulationScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="structuralAngulationScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="structuralAngulationScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="structuralAngulationScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="structuralAngulationScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="structuralAngulationRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Level of limb Amputation
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="limbAmputationFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbAmputationScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbAmputationScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbAmputationScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbAmputationScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbAmputationScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="limbAmputationRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Bilateral Lower Limb Length
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="limbLengthFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbLengthScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbLengthScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbLengthScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbLengthScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="limbLengthScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="limbLengthRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Balance and coordination
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="balanceCoordinationFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="balanceCoordinationScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="balanceCoordinationScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="balanceCoordinationScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="balanceCoordinationScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="balanceCoordinationScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="balanceCoordinationRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Other Physical Impairments (Specify)
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="otherImpairmentsFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherImpairmentsScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherImpairmentsScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherImpairmentsScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherImpairmentsScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherImpairmentsScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="otherImpairmentsRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 font-semibold">
                        SCORE FOR IMPAIRMENTS
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="totalScoreFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="totalScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="totalScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="totalScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="totalScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="totalScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-gray-300 text-sm text-gray-700">
                        <input type="text" name="totalScoreRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="mb-4">
    <h3 class="text-lg font-bold text-gray-800 mb-3">FUNCTION AND PARTICIPATION RESTRICTIONS</h3>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th rowspan="2"
                        class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                        Area
                    </th>
                    <th colspan="6"
                        class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-3/4">
                        Score ✓ For Nature of Difficulty
                    </th>
                    <th rowspan="2"
                        class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/4">
                        Remarks
                    </th>
                </tr>
                <tr>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        No Difficulty
                    </th>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        Mild Difficulty
                    </th>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        Moderate Difficulty
                    </th>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        Severe Difficulty
                    </th>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
                        Complete Difficulty
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Mobility
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="mobilityDifficulty" value="No Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="mobilityDifficulty" value="Mild Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="mobilityDifficulty" value="Moderate Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="mobilityDifficulty" value="Severe Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="mobilityDifficulty" value="Complete Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="mobilityRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Self-Care
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="selfCareDifficulty" value="No Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="selfCareDifficulty" value="Mild Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="selfCareDifficulty" value="Moderate Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="selfCareDifficulty" value="Severe Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="selfCareDifficulty" value="Complete Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="selfCareRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Domestic Life
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="domesticLifeDifficulty" value="No Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="domesticLifeDifficulty" value="Mild Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="domesticLifeDifficulty" value="Moderate Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="domesticLifeDifficulty" value="Severe Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="domesticLifeDifficulty" value="Complete Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="domesticLifeRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Major Life Areas
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="majorLifeAreasDifficulty" value="No Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="majorLifeAreasDifficulty" value="Mild Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="majorLifeAreasDifficulty" value="Moderate Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="majorLifeAreasDifficulty" value="Severe Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="majorLifeAreasDifficulty" value="Complete Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="majorLifeAreasRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Community, Social, Civic Life
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="communityLifeDifficulty" value="No Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="communityLifeDifficulty" value="Mild Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="communityLifeDifficulty" value="Moderate Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="communityLifeDifficulty" value="Severe Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="communityLifeDifficulty" value="Complete Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="communityLifeRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 font-semibold">
                        Score For Function and Participation Restriction
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="functionParticipationScore" value="No Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="functionParticipationScore" value="Mild Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="functionParticipationScore" value="Moderate Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="functionParticipationScore" value="Severe Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="functionParticipationScore" value="Complete Difficulty"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="functionParticipationRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mb-4">
    <h3 class="text-lg font-bold text-gray-800 mb-3">Disability Rating</h3>
    <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
            <tbody>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        No disability
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="noDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Mild
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="mildDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Moderate
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="moderateDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Severe
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="severeDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700">
                        Complete
                    </td>
                    <td class="py-3 px-4 border-gray-300 text-sm text-gray-700">
                        <input type="text" name="completeDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
            </tbody>
        </table>
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

export default PhysicalDisability