import React from "react";

const PWD_Profile = () => {
  return (
    <div className="flex flex-col gap-5">
      <div class="w-full mx-auto bg-white rounded-lg shadow-sm p-4 flex items-center justify-between border border-gray-200">
        <div class="flex items-center space-x-4">
          <div class="w-14 h-14 bg-green-900 text-white rounded-full flex items-center justify-center text-lg font-semibold">
            NS
          </div>

          <div>
            <p class="text-green-900 font-semibold">Name Middle Surname</p>
            <p class="text-gray-500 text-sm">name.surname@email.com</p>
          </div>
        </div>

        <div class="flex space-x-1">
          <span class="w-1.5 h-1.5 border border-gray-400 rounded-full"></span>
          <span class="w-1.5 h-1.5 border border-gray-400 rounded-full"></span>
          <span class="w-1.5 h-1.5 border  border-gray-400 rounded-full"></span>
        </div>
      </div>
      <div class="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-6">
        <div class="grid grid-cols-5 gap-y-6 text-sm text-gray-600">
          <div>
            <p class="mb-1">Date of Birth</p>
            <p class="font-semibold text-gray-800">09 July 1991</p>
          </div>
          <div>
            <p class="mb-1">Location</p>
            <p class="font-semibold text-gray-800">Nairobi</p>
          </div>
          <div>
            <p class="mb-1">Sub-Location</p>
            <p class="font-semibold text-gray-800">Dagoretti</p>
          </div>
          <div>
            <p class="mb-1">National ID</p>
            <p class="font-semibold text-gray-800">12345678</p>
          </div>
          <div>
            <p class="mb-1">Gender</p>
            <p class="font-semibold text-gray-800">Female</p>
          </div>

          <div>
            <p class="mb-1">Registered on</p>
            <p class="font-semibold text-gray-800">27 May 2025</p>
          </div>
          <div>
            <p class="mb-1">Marital Status</p>
            <p class="font-semibold text-gray-800">Single</p>
          </div>
          <div>
            <p class="mb-1">Next of KIN</p>
            <p class="font-semibold text-gray-800">Name Surname</p>
          </div>
          <div>
            <p class="mb-1">Next of KIN relationship</p>
            <p class="font-semibold text-gray-800">Friend</p>
          </div>
          <div>
            <p class="mb-1">Next of KIN Contacts</p>
            <p class="font-semibold text-gray-800">0738917891</p>
          </div>
        </div>

      </div>
              <div class="w-full mx-auto border border-gray-200 rounded-lg p-6 bg-white space-y-6">

        <div class="flex items-center space-x-2">
            <h2 class="text-green-900 font-semibold text-lg">
              Conduct Assessment
            </h2>
            <span class="bg-yellow-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              1
            </span>
          </div>

          <div>
            <label class="block text-xs font-bold text-blue-900 uppercase mb-1">
              Category
            </label>
            <select class="w-full border border-blue-200 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
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

          <div class="w-11/12 border mx-auto">

            <button class=" w-full flex items-center justify-center space-x-2 border border-green-700 text-green-700 font-semibold text-sm px-5 py-2 rounded-full hover:bg-green-50">
              <span>Disability Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
    </div>
  );
};

export default PWD_Profile;
