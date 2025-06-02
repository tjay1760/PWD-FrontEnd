// Components/Dashboard/AssessmentsContent.jsx
import React from 'react';
import { 
  Search,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AssessmentsContent = () => {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Assessments</h1>
        </div>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center">
          <span className="mr-2">📋</span>
          ADD APPOINTMENT
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Patients Queue Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Patients' Queue</h2>
            <p className="text-sm text-gray-600 mt-1">Below is a list of all booked appointments</p>
            
            <div className="mt-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Name, ID No. or Email..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Evaluation Type</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Bulk Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Name Surname", type: "Specialized Re-Assessment", status: "Pending", statusColor: "bg-orange-100 text-orange-800", avatar: "👨‍⚕️" },
                  { name: "Name Surname", type: "Initial Assessment", status: "Pending", statusColor: "bg-orange-100 text-orange-800", avatar: "👩‍⚕️" },
                  { name: "Name Surname", type: "Specialized Re-Assessment", status: "Pending", statusColor: "bg-orange-100 text-orange-800", avatar: "👨‍💼" },
                  { name: "Name Surname", type: "Routine Review", status: "Pending", statusColor: "bg-orange-100 text-orange-800", avatar: "👩‍💼" },
                  { name: "Name Surname", type: "Initial Assessment", status: "Pending", statusColor: "bg-orange-100 text-orange-800", avatar: "👨‍🎓" },
                  { name: "Name Surname", type: "Specialized Re-Assessment", status: "Completed", statusColor: "bg-green-100 text-green-800", avatar: "👩‍🔬" },
                  { name: "Name Surname", type: "Specialized Re-Assessment", status: "No Show", statusColor: "bg-red-100 text-red-800", avatar: "🧑‍⚕️" },
                  { name: "Name Surname", type: "Specialized Re-Assessment", status: "Completed", statusColor: "bg-green-100 text-green-800", avatar: "👨‍⚖️" },
                  { name: "Name Surname", type: "Specialized Re-Assessment", status: "Completed", statusColor: "bg-green-100 text-green-800", avatar: "👩‍🏫" },
                  { name: "Name Surname", type: "Specialized Re-Assessment", status: "Completed", statusColor: "bg-green-100 text-green-800", avatar: "👨‍🔧" }
                ].map((patient, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-3 rounded" />
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-sm">
                          {patient.avatar}
                        </div>
                        <span className="text-sm font-medium">{patient.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{patient.type}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${patient.statusColor}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">Wednesday, 21 May 2025</td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Menu className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <span>Rows per page</span>
              <select className="ml-2 border rounded px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span>Page 1 of 3</span>
              <button className="p-1 rounded hover:bg-gray-100">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* PWDs Flagged for Review */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">PWDs Flagged for Review</h2>
            <p className="text-sm text-gray-600 mt-1">Below is a list of all PWDs for your approval</p>
            
            <div className="mt-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Name, ID No. or Email..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Comments</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Bulk Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👨‍⚕️" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👩‍⚕️" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👨‍💼" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👩‍💼" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👨‍🎓" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👩‍🔬" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "🧑‍⚕️" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👨‍⚖️" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👩‍🏫" },
                  { name: "Name Surname", comment: "Lorem ipsum dolor sint elit...", avatar: "👨‍🔧" }
                ].map((patient, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-3 rounded" />
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-sm">
                          {patient.avatar}
                        </div>
                        <span className="text-sm font-medium">{patient.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{patient.comment}</td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Menu className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <span>Rows per page</span>
              <select className="ml-2 border rounded px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span>Page 1 of 3</span>
              <button className="p-1 rounded hover:bg-gray-100">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-100">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsContent;