import React from "react";
import { format } from "date-fns"; // For date formatting

const PWD_Profile = ({ userData }) => { // Accept userData as props
  console.log("PWD Profile Data:", userData);
  if (!userData || !userData.user) { // Check for userData.user existence
    return <div className="text-center p-8 text-gray-600">No PWD data available.</div>;
  }

  // Destructure data directly from userData.user based on the new payload
  const {
    id, // Renamed from _id
    email,
    phone,
    nationalId, // Renamed from national_id
    dob, // Date of birth
    fullName, // Renamed from full_name
    gender,
    county, // Directly available
    subCounty, // Directly available
    // marital_status and next_of_kin are not in this payload,
    // so we'll remove them or default them to 'N/A' if they might come from other user types.
    // For now, let's remove them from destructuring and update their display.
  } = userData.user;

  // No need to concatenate full name as it's already `fullName`
  const displayDob = dob ? format(new Date(dob), 'dd MMMM yyyy') : 'N/A';
  // The `created_at` field is no longer in the provided payload.
  // If you still need a "Registered on" date, you'll need to get it from another source
  // or decide to remove that display item. For now, I'll default it to N/A.
  const displayRegisteredOn = 'N/A'; // Or remove this line and the corresponding DOM element

  return (
    <div className="flex border justify-between items-start w-full p-10 gap-10">
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
              <p className="font-semibold text-gray-800">{county || 'N/A'}</p> {/* Changed from location?.county */}
            </div>
            <div>
              <p className="mb-1">Sub-County</p>
              <p className="font-semibold text-gray-800">{subCounty || 'N/A'}</p> {/* Changed from location?.sub_county */}
            </div>
            <div>
              <p className="mb-1">National ID</p>
              <p className="font-semibold text-gray-800">{nationalId || 'N/A'}</p> {/* Changed from national_id */}
            </div>
            <div>
              <p className="mb-1">Gender</p>
              <p className="font-semibold text-gray-800">{gender || 'N/A'}</p>
            </div>

            {/* If 'Registered on' is always 'N/A' with this payload, consider removing the div */}
            <div>
              <p className="mb-1">Registered on</p>
              <p className="font-semibold text-gray-800">{displayRegisteredOn}</p>
            </div>
            {/* marital_status and next_of_kin are not in the new payload.
                If they are truly gone, you should remove these divs entirely.
                If they might appear for other user roles, keep them but be aware they'll be 'N/A' for this PWD payload. */}
            <div>
              <p className="mb-1">Marital Status</p>
              <p className="font-semibold text-gray-800">{'N/A'}</p> {/* Updated as it's not in payload */}
            </div>
            <div>
              <p className="mb-1">Next of KIN</p>
              <p className="font-semibold text-gray-800">{'N/A'}</p> {/* Updated as it's not in payload */}
            </div>
            <div>
              <p className="mb-1">Next of KIN relationship</p>
              <p className="font-semibold text-gray-800">{'N/A'}</p> {/* Updated as it's not in payload */}
            </div>
            <div>
              <p className="mb-1">Next of KIN Contacts</p>
              <p className="font-semibold text-gray-800">{'N/A'}</p> {/* Updated as it's not in payload */}
            </div>
          </div>
        </div>

        {/* Conduct Assessment Section (kept as is, but might need dynamic values) */}
        <div className="w-full mx-auto border border-gray-200 rounded-lg p-6 bg-white space-y-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-green-900 font-semibold text-lg">
              Conduct Assessment
            </h2>
            <span className="bg-yellow-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              1
            </span>
          </div>
          <div>
            <label className="block text-xs font-bold text-blue-900 uppercase mb-1">
              Category
            </label>
            <select className="w-full border border-blue-200 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option disabled selected>
                Disability category*
              </option>
              <option value="VISUAL IMPAIRMENTS">VISUAL IMPAIRMENTS</option>
              <option value="HEARING IMPAIRMENTS">HEARING IMPAIRMENTS</option>
              <option value="SPEECH, LANGUAGE, COMMUNICATION AND SWALLOWING DISABILITIES">
                SPEECH, LANGUAGE, COMMUNICATION AND SWALLOWING DISABILITIES
              </option>
              <option value="MENTAL/ INTELLECTUAL/ AUTISM SPECTRUM DISORDERS">
                MENTAL/ INTELLECTUAL/ AUTISM SPECTRUM DISORDERS
              </option>
              <option value="MAXILLOFACIAL DISABILITIES">
                MAXILLOFACIAL DISABILITIES
              </option>
              <option value="PROGRESSIVE CHRONIC DISORDERS">
                PROGRESSIVE CHRONIC DISORDERS
              </option>
              <option value="PHYSICAL DISABILITIES">
                PHYSICAL DISABILITIES
              </option>
            </select>
          </div>
          <div className="w-11/12 border mx-auto">
            <button className="w-full flex items-center justify-center space-x-2 border border-green-700 text-green-700 font-semibold text-sm px-5 py-2 rounded-full hover:bg-green-50">
              <span>Disability Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Medical Records Section (kept as is) */}
      <div className="uploads w-1/3">
        <div className="max-w-md mx-auto border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-green-900 font-semibold text-lg">Medical Records</h2>
            <button className="flex items-center gap-1 text-sm text-gray-600 border rounded-md px-2 py-1 hover:bg-gray-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Record
            </button>
          </div>

          <div className="border rounded-md">
            <div className="flex items-center gap-2 p-2 border-b bg-gray-50 text-sm text-gray-500 font-medium">
              <input type="checkbox" />
              <span>Document Name</span>
            </div>
            <div className="divide-y">
              {/* These are static placeholders, you'd dynamically render medical records here */}
              <div className="flex items-center gap-2 p-2 text-sm">
                <input type="checkbox" />
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 7h10M7 11h10M7 15h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="flex-1 truncate">The quick, brown fox jumps over a lazy.pdf</span>
                <button>
                  <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 4v8m4-4H8" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 p-2 text-sm">
                <input type="checkbox" />
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 7h10M7 11h10M7 15h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="flex-1 truncate">The quick, brown fox jumps over a lazy.pdf</span>
                <button>
                  <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 4v8m4-4H8" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 p-2 text-sm">
                <input type="checkbox" />
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 7h10M7 11h10M7 15h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="flex-1 truncate">The quick, brown fox jumps over a lazy.pdf</span>
                <button>
                  <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 4v8m4-4H8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-sm text-gray-500 hover:underline cursor-pointer">
            See all
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWD_Profile;