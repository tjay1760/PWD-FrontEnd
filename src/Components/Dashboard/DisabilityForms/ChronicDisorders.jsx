import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary

const ChronicDisorders = () => {
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
    <h3 class="text-lg font-bold text-gray-800 mb-3">SUMMARY FINDINGS</h3>
    <div class="overflow-x-auto mb-6">
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-1/3">
                        Medical History (brief)
                    </th>
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-2/3">
                        </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Date of Injury/Onset of Illness
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="summaryDateOfInjuryOnset"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Date of Last Intervention
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="summaryDateOfLastIntervention"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        List Past and Ongoing Interventions
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="listInterventions"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
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

    <h3 class="text-lg font-bold text-gray-800 mb-3">STRUCTURAL IMPAIRMENTS</h3>
    <textarea name="structuralImpairments" rows="4"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-6"></textarea>

    <h3 class="text-lg font-bold text-gray-800 mb-3">REGION (s) AFFECTED</h3>
    <textarea name="regionsAffected" rows="4"
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
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
                        class="py-2 px-4 border-b border-r border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700 w-2/5">
                        Findings /diagnostic tests (MRIs, CT) Labs tests, 6 minutes' walk test, Pulmonary
                        function test (PFTs), MMT, ROM, Echocardiogram (EEG), Visual analog pain scale, Berg balance
                        scale, TUG, Tinetti, lower extremity functional tests, cognitive tests, Speech and
                        swallowing tests
                    </th>
                    <th colspan="5"
                        class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-1/5">
                        Score ✓ For Nature of Impairments
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
                        Cardiopulmonary/ Cardiovascular
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="cardiovascularFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cardiovascularScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cardiovascularScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cardiovascularScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cardiovascularScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cardiovascularScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="cardiovascularRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Respiratory
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="respiratoryFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="respiratoryScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="respiratoryScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="respiratoryScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="respiratoryScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="respiratoryScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="respiratoryRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Malignancies/ Cancer
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="cancerFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cancerScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cancerScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cancerScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cancerScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="cancerScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="cancerRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Musculoskeletal
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="musculoskeletalFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musculoskeletalScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musculoskeletalScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musculoskeletalScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musculoskeletalScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="musculoskeletalScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="musculoskeletalRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Neurological
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="neurologicalFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="neurologicalScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="neurologicalScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="neurologicalScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="neurologicalScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="neurologicalScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="neurologicalRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Gastro-intestinal disorders
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="gastrointestinalFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="gastrointestinalScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="gastrointestinalScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="gastrointestinalScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="gastrointestinalScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="gastrointestinalScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="gastrointestinalRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Dermatological
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="dermatologicalFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="dermatologicalScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="dermatologicalScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="dermatologicalScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="dermatologicalScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="dermatologicalScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="dermatologicalRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Hematologic system
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="hematologicFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="hematologicScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="hematologicScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="hematologicScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="hematologicScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="hematologicScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="hematologicRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Vascular conditions
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="vascularFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="vascularScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="vascularScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="vascularScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="vascularScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="vascularScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="vascularRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Genito - urinary
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="genitourinaryFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="genitourinaryScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="genitourinaryScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="genitourinaryScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="genitourinaryScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="genitourinaryScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="genitourinaryRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        Frailty
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="frailtyFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="frailtyScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="frailtyScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="frailtyScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="frailtyScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="frailtyScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="frailtyRemarks"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700">
                        Other
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700">
                        <input type="text" name="otherFindings"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherScore" value="No Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherScore" value="Mild Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherScore" value="Moderate Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-r border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherScore" value="Severe Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-gray-300 text-sm text-gray-700 text-center">
                        <input type="checkbox" name="otherScore" value="Complete Impairment"
                            class="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td class="py-3 px-4 border-gray-300 text-sm text-gray-700">
                        <input type="text" name="otherRemarks"
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
                    <th colspan="5"
                        class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-sm font-medium text-gray-700 w-1/2">
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
                    <th class="py-2 px-4 border-b border-gray-300 bg-gray-100 text-center text-xs font-medium text-gray-700">
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
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
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
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
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
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
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
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
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
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
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
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">
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
                    <td class="py-3 px-4 border-b border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                        No disability
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="noDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                        Mild
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="mildDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                        Moderate
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="moderateDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-b border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
                        Severe
                    </td>
                    <td class="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                        <input type="text" name="severeDisability"
                            class="mt-1 block w-full px-1 py-0.5 border-0 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </td>
                </tr>
                <tr>
                    <td class="py-3 px-4 border-r border-gray-300 bg-gray-100 text-sm text-gray-700">
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

export default ChronicDisorders