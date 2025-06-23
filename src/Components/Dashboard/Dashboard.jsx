// Components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Users,
  Home,
  ClipboardList,
  File,
  ArrowLeft // Import ArrowLeft for the back button
} from 'lucide-react'; // Make sure ArrowLeft is imported if you use it directly
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
import DashboardContent from './DashboardContent';
import AssessmentsContent from './AssessmentsContent ';
import DocumentsContent from './DocumentsContent';

import Navbar from './Navbar';
import PWD_Profile from './PWD/PWD_Profile';

const UserDashboard = ({ userData, onAppLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // NEW STATES FOR PWD PROFILE DISPLAY
  const [showPwdProfile, setShowPwdProfile] = useState(false);
  const [currentPwdData, setCurrentPwdData] = useState(null);

  const NAVBAR_HEIGHT = '4rem';

  // Determine user role from userData
  const userRole = userData?.role;

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

  // Function to show the PWD Profile
  const handleShowPwdProfile = (pwdData) => {
    setCurrentPwdData(pwdData);
    setShowPwdProfile(true);
    // Optionally, you might want to switch the `currentPage` state to something like 'pwdProfile'
    // if you want the sidebar to highlight a different section or prevent other navigation.
    // For now, we'll keep it simple and just rely on `showPwdProfile`.
  };

  // Function to go back to the previous view (e.g., Doctor's Dashboard or Assessments)
  const handleBackFromPwdProfile = () => {
    setShowPwdProfile(false);
    setCurrentPwdData(null);
    // You might want to intelligently set `currentPage` back to 'dashboard' or 'assessments'
    // depending on where the user clicked from. For simplicity, we'll just go back to the previous state.
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
              onClick={() => {
                setCurrentPage('dashboard');
                setShowPwdProfile(false); // Reset profile view when navigating sidebar
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                currentPage === 'dashboard' && !showPwdProfile ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              {sidebarHovered && <span className="ml-3">Dashboard</span>}
            </button>

            <button
              onClick={() => {
                setCurrentPage('assessments');
                setShowPwdProfile(false); // Reset profile view when navigating sidebar
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                currentPage === 'assessments' && !showPwdProfile ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              {sidebarHovered && <span className="ml-3">Assessments</span>}
            </button>

            <button
              onClick={() => {
                setCurrentPage('documents');
                setShowPwdProfile(false); // Reset profile view when navigating sidebar
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                currentPage === 'documents' && !showPwdProfile ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
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
    console.log('showPwdProfile:', showPwdProfile);
    console.log('currentPwdData:', currentPwdData);
    if (showPwdProfile && currentPwdData) {
      return (
        <div className="flex-1 bg-gray-50 p-6">
          <button
            onClick={handleBackFromPwdProfile}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> {/* Using Lucide icon */}
            Back
          </button>
          <PWD_Profile userData={currentPwdData} />
        </div>
      );
    }

    // Otherwise, render content based on currentPage and userRole
    switch (currentPage) {
      case 'dashboard':
        if (userRole === 'pwd' || userRole === 'guardian') {
          return <PWD_Dashboard userData={userData} />;
        } else if (userRole === 'medical_officer') {
          // Pass the handler down to DoctorsDashboard
          return <DoctorsDashboard userData={userData} onShowPwdProfile={handleShowPwdProfile} />;
        } else if (userRole === 'county_director') {
          return <Health_Officers_Dashboard userData={userData} />;
        }
        return <DashboardContent userData={userData} />;

      case 'assessments':
        if (userRole === 'pwd') {
          return <PWDAssesmentsPage userData={userData} />;
        } else if (userRole === 'medical_officer') {
          // Pass the handler down to DoctorsAssesment
          return <DoctorsAssesment userData={userData} onShowPwdProfile={handleShowPwdProfile} />;
        } else if (userRole === 'health_officer') {
          return <HealthOfficerAssesments userData={userData} />;
        }
        return <AssessmentsContent userData={userData} />;

      case 'documents':
        return <DocumentsContent userData={userData} />;

      default:
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