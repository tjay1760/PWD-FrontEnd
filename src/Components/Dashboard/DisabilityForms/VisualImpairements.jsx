import React, { useState } from "react";
import { Calendar, User } from "lucide-react";
import wheelChairMan from "../../../assets/Wheelchair man.png"; // Adjust the path as necessary
import { format } from "date-fns";

const VisualImpairments = ({userData}) => {
  {console.log("userdata from visual",userData)}
  const [formData, setFormData] = useState('');
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
        Assessment form for Visual Impairment
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
              readOnly
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
              readOnly
              value={format(Date.now(), "dd MMMM yyyy")}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Applicant Information Section */}

      <h3 class="text-blue-900 font-medium text-sm mb-1">CONTACT DETAILS</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          value={userData.user.fullName}
          readOnly 
          class="border rounded px-3 py-2 w-full"
        />
        <input
          type= "text"
          value={userData.user.phone}
          readOnly
          class="border rounded px-3 py-2 w-full"
        />
      </div>

   

   



      <div class="mb-6">
        <h3 class="text-blue-900 font-medium text-sm mb-1">MEDICAL HISTORY</h3>
        <textarea
          class="border rounded w-full px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
          rows="3"
          placeholder="Describe the PWD's medical History"
        ></textarea>
      </div>
      <div class="mb-6">
        <h3 class="text-blue-900 font-medium text-sm mb-1">OCULAR HISTORY</h3>
        <textarea
          class="border rounded w-full px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
          rows="3"
          placeholder="Describe the PWD's ocular History"
        ></textarea>
      </div>
      <div class="mb-6">
        <h3 class="text-blue-900 font-medium text-sm mb-1">
          DISTANCE VISUAL ACUITY
        </h3>
        <div class="border rounded p-4 text-sm">
          <div class="grid grid-cols-4 gap-4 text-center font-medium text-gray-700 mb-2">
            <div></div>
            <div>Right Eye</div>
            <div>Left Eye</div>
            <div>Near Vision Test</div>
          </div>
          <div class="grid grid-cols-4 gap-4 mb-2 items-center">
            <div>With Correction</div>
            <input type="text" class="border rounded px-2 py-1" />
            <input type="text" class="border rounded px-2 py-1" />
            <input type="text" class="border rounded px-2 py-1" />
          </div>
          <div class="grid grid-cols-4 gap-4 items-center">
            <div>Without Correction</div>
            <input type="text" class="border rounded px-2 py-1" />
            <input type="text" class="border rounded px-2 py-1" />
            <input type="text" class="border rounded px-2 py-1" />
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
                <th className="text-center py-3 px-4 font-medium text-gray-600 border-l border-gray-300 w-1/3">Right Eye</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600 border-l border-gray-300 w-1/3">Left Eye</th>
              </tr>
            </thead>
            <tbody>
              {[
                'Present eyeball',
                'Cornea',
                'Squint',
                'Anterior Chamber',
                'Nystagmus',
                'Iris',
                'Tearing',
                'Pupil',
                'Lids',
                'Conjunctiva',
                'Lens',
              ].map((examination, index) => (
                <tr key={examination} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 text-gray-700 font-medium border-t border-gray-200">
                    {examination}
                  </td>
                  <td className="py-2 px-4 border-t border-l border-gray-200">
                    <input
                      type="text"
                      name={`rightEye${examination.replace(/\s+/g, '')}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder=""
                    />
                  </td>
                  <td className="py-2 px-4 border-t border-l border-gray-200">
                    <input
                      type="text"
                      name={`leftEye${examination.replace(/\s+/g, '')}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder=""
                    />
                  </td>
                </tr>
              ))}
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
              name="humphreysVisualField"
              placeholder="Humphreys Visual Field"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="text"
              name="colourVision"
              placeholder="Colour Vision"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="max-w-md">
          <input
            type="text"
            name="stereopsis"
            placeholder="Stereopsis"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  name="categoryNormal"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Normal</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categoryMildImpairment"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Mild Impairment</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categoryModerateImpairment"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Moderate Impairment</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categorySevereImpairment"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Severe Impairment</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categoryBlind"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Blind</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="categoryNearVisionImpairment"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Near Vision Impairment</span>
              </label>
            </div>
          </div>

          {/* Cause of Vision Impairment */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Cause of Vision Impairment</label>
            <textarea
              name="causeOfVisionImpairment"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe the cause of vision impairment..."
            />
          </div>

          {/* Disability Percentage and Intervention */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Disability (%)</label>
              <input
                type="number"
                name="disabilityPercentage"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter percentage"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Any Possible Intervention?</label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="possibleIntervention"
                    value="yes"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="possibleIntervention"
                    value="no"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Recommendation</label>
            <textarea
              name="recommendation"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter your recommendations..."
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
  );
};

export default VisualImpairments;
