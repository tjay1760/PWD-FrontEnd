// Components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import {
  Users,
  Home,
  ClipboardList,
  File
} from 'lucide-react';

// Import your content components
import DashboardContent from './DashboardContent';
import AssessmentsContent from './AssessmentsContent ';
import DocumentsContent from './DocumentsContent';
import Navbar from './Navbar';

const UserDashboard = ({ userData }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // Define the height of your Navbar. Adjust this value!
  // For example, if your Navbar has a height of 'h-16' in Tailwind,
  // 4rem (16 * 0.25rem) is the correct value.
  const NAVBAR_HEIGHT = '4rem'; // Assuming Navbar height is 4rem (64px)

  const renderSidebar = () => {
  let hoverTimeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setSidebarHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setSidebarHovered(false);
    }, 200); // Delay to allow user to hover again if needed
  };

  return (
    <div
      className={`fixed left-0 bg-white shadow-lg transition-all duration-300 z-50 ${
        sidebarHovered ? 'w-64' : 'w-16'
      }`}
      style={{ top: NAVBAR_HEIGHT, height: `calc(100% - ${NAVBAR_HEIGHT})`, zIndex: 50 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          {sidebarHovered && (
            <div className="ml-3">
              <div className="text-sm font-semibold text-gray-800">Persons With Disability</div>
              <div className="text-xs text-blue-600">Medical System</div>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              currentPage === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            {sidebarHovered && <span className="ml-3">Dashboard</span>}
          </button>

          <button
            onClick={() => setCurrentPage('assessments')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              currentPage === 'assessments' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            {sidebarHovered && <span className="ml-3">Assessments</span>}
          </button>

          <button
            onClick={() => setCurrentPage('documents')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              currentPage === 'documents' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <File className="w-5 h-5" />
            {sidebarHovered && <span className="ml-3">Documents</span>}
          </button>
        </nav>
      </div>
    </div>
  );
};


  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent userData={userData} />;
      case 'assessments':
        return <AssessmentsContent />;
      case 'documents':
        return <DocumentsContent />;
      default:
        return <DashboardContent userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Use flex-col to stack Navbar and main content */}
      {/* Navbar should be fixed at the very top */}
      <Navbar />

      {/* Main content area (sidebar + dashboard content) */}
      <div className="flex flex-1" style={{ paddingTop: NAVBAR_HEIGHT }}> {/* Push content down */}
        {renderSidebar()}
        <div className={`flex-1 transition-all duration-300 ${sidebarHovered ? 'ml-64' : 'ml-16'}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;