// Components/Dashboard/DashboardContent.jsx
import React from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Search,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const DashboardContent = ({ userData }) => { 
  const patientQueue = [
    { id: 1, name: "Name Surname", type: "Specialized Re-Assessment", status: "Pending", date: "Wednesday, 21 May 2025", avatar: "👨‍⚕️" },
    { id: 2, name: "Name Surname", type: "Initial Assessment", status: "Pending", date: "Wednesday, 21 May 2025", avatar: "👩‍⚕️" },
    { id: 3, name: "Name Surname", type: "Specialized Re-Assessment", status: "Pending", date: "Wednesday, 21 May 2025", avatar: "👨‍💼" },
    { id: 4, name: "Name Surname", type: "Routine Review", status: "Pending", date: "Wednesday, 21 May 2025", avatar: "👩‍💼" },
    { id: 5, name: "Name Surname", type: "Initial Assessment", status: "Pending", date: "Wednesday, 21 May 2025", avatar: "👨‍🎓" }
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const selectedMonth = 'December 2025'; // This could be managed in parent if dynamic

  // Destructure user data for display
  const userName = userData ? `${userData.fullName}` : 'Dr. User';
console.log("User Data dashboard:", userData); // For debugging purposes
  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
            <span className="text-2xl">👨‍⚕️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hello, {userName}</h1>
            <p className="text-gray-600">Welcome</p>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Wednesday, 21 May 2025</span>
              <Clock className="w-4 h-4 ml-4 mr-1" />
              <span>17:20 PM</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-400 to-orange-400 rounded-lg p-4 text-white">
          <div className="text-sm font-medium">Upcoming Appointment</div>
          <div className="mt-2">
            <div className="font-semibold">Mama Lucy Kibaki Hospital</div>
            <div className="text-sm opacity-90">Specialist Visit</div>
            <div className="flex items-center mt-2 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Friday, 06 Jun 2025</span>
              <Clock className="w-4 h-4 ml-2 mr-1" />
              <span>08:00 AM</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Schedule Appointment</button>
              <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">Peer Review and Approvals</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">12</div>
              <div className="text-sm text-gray-600">COMPLETED ASSESSMENTS</div>
              <div className="text-xs text-green-600 mt-1">+1.5% from last month</div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">7</div>
              <div className="text-sm text-gray-600">PENDING ASSESSMENTS</div>
              <div className="text-xs text-orange-600 mt-1">38% of the scheduled assessments</div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-sm text-gray-600">FLAGGED FOR REVIEW</div>
              <div className="text-xs text-blue-500 mt-1">0 since last week</div> {/* Changed to blue-500 for consistency with original */}
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">96%</div>
              <div className="text-sm text-gray-600">APPROVAL RATE</div>
              <div className="text-xs text-red-500 mt-1">-2% since last month</div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Patients Queue */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Patients' Queue</h2>
            <p className="text-sm text-gray-600">Below is a list of all booked appointments</p>
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
          <div className="p-6">
            <div className="space-y-4">
              {patientQueue.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-sm">
                      {patient.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{patient.name}</div>
                      <div className="text-xs text-gray-600">{patient.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">{patient.status}</div>
                    <div className="text-xs text-gray-500 mt-1">{patient.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Your Schedule</h2>
              <button className="flex items-center text-sm text-gray-600">
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <span className="font-medium">{selectedMonth}</span>
                <ChevronLeft className="w-4 h-4 ml-2 cursor-pointer" />
                <ChevronRight className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => (
                <div
                  key={day}
                  className={`text-center py-2 text-sm cursor-pointer rounded ${
                    day === 10 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;