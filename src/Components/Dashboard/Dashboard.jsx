// Components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import {
  Users,
  Home,
  ClipboardList,
  File
} from 'lucide-react';
import toast from 'react-hot-toast'; // Import toast

import authService from '../authService'; // Adjust the path as necessary if it's not directly in 'services'
import PWD_Dashboard from './PWD/PWD-Dashboard';
import DoctorsDashboard from './Doctor/Doctors_Dashboard';
import Health_Officers_Dashboard from './Health_Officer/Health_Officers_Dashboard';

// Import your content components
import DashboardContent from './DashboardContent';
import AssessmentsContent from './AssessmentsContent ';
import DocumentsContent from './DocumentsContent';
import Navbar from './Navbar';
import PWDAssesmentsPage from './PWD/PWDAssesmentsPage';



const UserDashboard = ({ userData,  onAppLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(false);


  const NAVBAR_HEIGHT = '4rem';

  const handleLogout = async () => {
    try {
      await authService.logout();
      onAppLogout();
      toast.success('You have been logged out successfully!'); // Changed from alert
    } catch (error) {
      console.error("Failed to log out:", error);
      toast.error('Logout failed. Please try again.'); // Changed from alert
      onAppLogout(); // Still force redirect even on client-side error
    }
  };

  const renderSidebar = () => {
    let hoverTimeout;

    const handleMouseEnter = () => {
      clearTimeout(hoverTimeout);
      setSidebarHovered(true);
    };

    const handleMouseLeave = () => {
      hoverTimeout = setTimeout(() => {
        setSidebarHovered(false);
      }, 200);
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
        return <Health_Officers_Dashboard userData={userData} />;
      case 'assessments':
        return <PWDAssesmentsPage />;
      case 'documents':
        return <DocumentsContent />;
      default:
        return <DashboardContent userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onLogout={handleLogout} userName={userData?.fullName || "User"} />

      <div className="flex flex-1" style={{ paddingTop: NAVBAR_HEIGHT }}>
        {renderSidebar()}
        <div className={`flex-1 transition-all duration-300 ${sidebarHovered ? 'ml-64' : 'ml-16'}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;