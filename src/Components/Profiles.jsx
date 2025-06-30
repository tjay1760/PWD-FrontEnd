import React from 'react'
import { format } from "date-fns";

const Profiles = ({ userData }) => {
        console.log("PWD Profile Data:", userData); // Uncomment for debugging

      if (!userData) {
        return <div className="text-center p-8 text-gray-600">No PWD data available.</div>;
      }
    
      const {
        id,
        email,
        phone,
        nationalId,
        dob,
        fullName,
        gender,
        county,
        subCounty,
      } = userData;
    
      const displayDob = dob ? format(new Date(dob), 'dd MMMM yyyy') : 'N/A'; // Added yyyy for completeness
      const displayRegisteredOn = 'N/A';
        const displayPhone = phone || 'N/A';
  return (
    <div>
 <div className="flex flex-col gap-5 w-2/3">
        <div className="w-full mx-auto bg-white rounded-lg shadow-sm p-4 flex items-center justify-between border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-green-900 text-white rounded-full flex items-center justify-center text-lg font-semibold">
              {fullName ? fullName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'NS'}
            </div>
            <div>
              <p className="text-green-900 font-semibold">{fullName || 'N/A'}</p>
              <p className="text-gray-500 text-sm">{email || 'N/A'}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <span className="w-1.5 h-1.5 border border-gray-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 border border-gray-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 border border-gray-400 rounded-full"></span>
          </div>
        </div>

        <div className="w-full mx-auto bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-5 gap-y-6 text-sm text-gray-600">
            <div>
              <p className="mb-1">Date of Birth</p>
              <p className="font-semibold text-gray-800">{displayDob}</p>
            </div>
            <div>
              <p className="mb-1">County</p>
              <p className="font-semibold text-gray-800">{county || 'N/A'}</p>
            </div>
            <div>
              <p className="mb-1">Sub-County</p>
              <p className="font-semibold text-gray-800">{subCounty || 'N/A'}</p>
            </div>
            <div>
              <p className="mb-1">National ID</p>
              <p className="font-semibold text-gray-800">{nationalId || 'N/A'}</p>
            </div>
            <div>
              <p className="mb-1">Gender</p>
              <p className="font-semibold text-gray-800">{gender || 'N/A'}</p>
            </div>
            <div>
              <p className="mb-1">Registered on</p>
              <p className="font-semibold text-gray-800">{displayRegisteredOn}</p>
            </div>
            <div>
              <p className="mb-1">Marital Status</p>
              <p className="font-semibold text-gray-800">{'N/A'}</p>
            </div>
            <div>
              <p className="mb-1">Next of KIN</p>
              <p className="font-semibold text-gray-800">{'N/A'}</p>
            </div>
            <div>
              <p className="mb-1">Next of KIN relationship</p>
              <p className="font-semibold text-gray-800">{'N/A'}</p>
            </div>
            <div>
              <p className="mb-1">Next of KIN Contacts</p>
              <p className="font-semibold text-gray-800">{'N/A'}</p>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Profiles