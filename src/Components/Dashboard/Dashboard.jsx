// Components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react'; // Added useEffect for potential initial role-based routing
import {
  Users,
  Home,
  ClipboardList,
  File
} from 'lucide-react';
import toast from 'react-hot-toast';

import authService from '../authService'; // Adjust the path as necessary

// Import role-specific dashboard and assessment components
import PWD_Dashboard from './PWD/PWD-Dashboard'; // For PWD role dashboard
import DoctorsDashboard from './Doctor/Doctors_Dashboard'; // For Doctor role dashboard
import Health_Officers_Dashboard from './Health_Officer/Health_Officers_Dashboard'; // For Health Officer role dashboard

import PWDAssesmentsPage from './PWD/PWDAssesmentsPage'; // For PWD role assessments
import DoctorsAssesment from './Doctor/DoctorsAssesment'; // For Doctor role assessments
import HealthOfficerAssesments from './Health_Officer/HealthOfficerAssesments'; // For Health Officer role assessments

// Import generic content components that might be shared or placeholders
// Assuming DashboardContent, AssessmentsContent, DocumentsContent are generic or default
import DashboardContent from './DashboardContent'; // Consider if this is still needed as a fallback
import AssessmentsContent from './AssessmentsContent '; // Consider if this is still needed as a fallback
import DocumentsContent from './DocumentsContent'; // This might be shared across roles

import Navbar from './Navbar';

const UserDashboard = ({ userData, onAppLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const NAVBAR_HEIGHT = '4rem';

  // Determine user role from userData
  const userRole = userData?.role; // Assuming userData has a 'role' property

  // Optional: Set initial page based on role or preferences
  useEffect(() => {
    // You could set a default starting page based on role if needed
    // For now, we'll keep 'dashboard' as default and let renderContent handle it.
  }, [userRole]);


  const handleLogout = async () => {
    try {
      await authService.logout();
      onAppLogout();
      toast.success('You have been logged out successfully!');
    } catch (error) {
      console.error("Failed to log out:", error);
      toast.error('Logout failed. Please try again.');
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

    // Sidebar items remain the same, but the content they trigger will be role-specific
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
    // Determine which dashboard and assessment component to render based on user role
    switch (currentPage) {
      case 'dashboard':
        if (userRole === 'pwd'||userRole === 'guardian') {
          return <PWD_Dashboard userData={userData} />;
        } else if (userRole === 'medical_officer') {
          return <DoctorsDashboard userData={userData} />;
        } else if (userRole === 'county_director') {
          return <Health_Officers_Dashboard userData={userData} />;
        }
        // Fallback or default dashboard if role doesn't match
        return <DashboardContent userData={userData} />;

      case 'assessments':
        if (userRole === 'pwd') {
          return <PWDAssesmentsPage userData={userData} />;
        } else if (userRole === 'Doctor') {
          return <DoctorsAssesment userData={userData} />;
        } else if (userRole === 'Health Officer') {
          return <HealthOfficerAssesments userData={userData} />;
        }
        // Fallback or default assessments if role doesn't match
        return <AssessmentsContent userData={userData} />;

      case 'documents':
        // Documents content might be shared or have minor variations
        return <DocumentsContent userData={userData} />;
        
      default:
        // Fallback for any unknown currentPage
        return <DashboardContent userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onLogout={handleLogout} userName={userData?.fullName || "User"} userRole={userRole} />

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