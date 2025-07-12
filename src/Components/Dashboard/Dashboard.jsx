import React, { useState, useEffect } from 'react';
import {
  Users,
  Home,
  ClipboardList,
  File,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Snackbar, Alert } from '@mui/material';

import authService from '../authService';

// Import role-specific dashboard and assessment components
import PWD_Dashboard from './PWD/PWD-Dashboard';
import DoctorsDashboard from './Doctor/Doctors_Dashboard';
import Health_Officers_Dashboard from './Health_Officer/Health_Officers_Dashboard';
import GuardianDashboard from './Guardian/GuardianDashboard';
import ApproverDashboard from './Medical_Approver/ApproverDashboard';

import PWDAssesmentsPage from './PWD/PWDAssesmentsPage';
import DoctorsAssesment from './Doctor/DoctorsAssesment';
import HealthOfficerAssesments from './Health_Officer/HealthOfficerAssesments';
import GuardianAssessment from './Guardian/GuardianAssesment';

// Import generic content components that might be shared or placeholders
import DashboardContent from './DashboardContent';
import AssessmentsContent from './AssessmentsContent ';
import DocumentsContent from './DocumentsContent';

import Navbar from './Navbar';
import PWD_Profile from './PWD/PWD_Profile';
import Profiles from '../Profiles'; // Make sure this path is correct: Components/Profiles.jsx


const UserDashboard = ({ userData, onAppLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(false);

  // Existing states for PWD profile display (for Medical Officers, etc.)
  const [showPwdProfile, setShowPwdProfile] = useState(false);
  const [currentPwdData, setCurrentPwdData] = useState(null);

  // NEW STATES FOR CURRENT USER'S PROFILE DISPLAY
  const [showCurrentUserProfile, setShowCurrentUserProfile] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const NAVBAR_HEIGHT = '4rem';

  const userRole = userData?.role;

  useEffect(() => {
    // Optionally reset profile views if userRole changes or on component mount
    setShowPwdProfile(false);
    setShowCurrentUserProfile(false);
    setCurrentPage('dashboard'); // Default to dashboard on role change/mount
  }, [userRole]); // Dependency on userRole or an initial mount trigger

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

  // Handler to show a specific PWD's profile (e.g., from Doctor's list)
  const handleShowPwdProfile = (pwdData) => {
    setCurrentPwdData(pwdData);
    setShowPwdProfile(true);
    setShowCurrentUserProfile(false); // Hide current user profile if showing PWD profile
    // setCurrentPage('pwdProfileView'); // Optionally, set a custom page state for sidebar highlight
  };

  // Handler to go back from a specific PWD's profile
  const handleBackFromPwdProfile = () => {
    setShowPwdProfile(false);
    setCurrentPwdData(null);
    // setCurrentPage('dashboard'); // Or back to 'assessments' depending on context
  };

  // NEW: Handler to show the currently logged-in user's profile
  const handleShowCurrentUserProfile = () => {
    setShowCurrentUserProfile(true);
    setShowPwdProfile(false); // Hide PWD profile if showing current user profile
    setCurrentPage('profile'); // Set a unique page state for sidebar if you want to highlight "Profile"
  };

  // NEW: Handler to go back from the current user's profile
  const handleBackFromCurrentUserProfile = () => {
    setShowCurrentUserProfile(false);
    setCurrentPage('dashboard'); // Return to dashboard or previous view
  };
  // --- NEW Snackbar Handlers ---
  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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

    // Determine active sidebar item
    const isActive = (pageName) => {
      if (showCurrentUserProfile) return pageName === 'profile';
      if (showPwdProfile) return false; // PWD profile is a sub-view, not a main sidebar item
      return currentPage === pageName;
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
                setShowPwdProfile(false);
                setShowCurrentUserProfile(false); // Reset profile views when navigating sidebar
                setOpenSnackbar(false)
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                isActive('dashboard') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              {sidebarHovered && <span className="ml-3">Dashboard</span>}
            </button>

            <button
              onClick={() => {
                setCurrentPage('assessments');
                setShowPwdProfile(false);
                setShowCurrentUserProfile(false); // Reset profile views when navigating sidebar
                setOpenSnackbar(false)
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                isActive('assessments') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              {sidebarHovered && <span className="ml-3">Assessments</span>}
            </button>

            <button
              onClick={() => {
                setCurrentPage('documents');
                setShowPwdProfile(false);
                setShowCurrentUserProfile(false); // Reset profile views when navigating sidebar
                setOpenSnackbar(false)
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                isActive('documents') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <File className="w-5 h-5" />
              {sidebarHovered && <span className="ml-3">Documents</span>}
            </button>

            {/* NEW: Profile button in sidebar if you want it there */}
            {/* You could add a dedicated "My Profile" button in the sidebar if you wish.
                It would share the `handleShowCurrentUserProfile` logic.
            <button
              onClick={handleShowCurrentUserProfile}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                isActive('profile') ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              {sidebarHovered && <span className="ml-3">My Profile</span>}
            </button>
            */}
          </nav>
        </div>
      </div>
    );
  };


  const renderContent = () => {
    // Priority 1: Specific PWD Profile (for doctors/health officers)
    if (showPwdProfile && currentPwdData) {
      return (
        <div className="flex-1 bg-gray-50 p-6">
          <button
            onClick={handleBackFromPwdProfile}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          {/* Note: PWD_Profile probably takes a 'pwdData' prop, not 'userData' */}
          <PWD_Profile userData={currentPwdData} handleBackFromPwdProfile={handleBackFromPwdProfile} onOpenSnackbar={handleOpenSnackbar} />
        </div>
      );
    }

    // Priority 2: Current Logged-in User's Profile
    if (showCurrentUserProfile) {
      return (
        <div className="flex-1 bg-gray-50 p-6">
          <button
            onClick={handleBackFromCurrentUserProfile}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          {/* Pass the logged-in user's data to the Profiles component */}
          <Profiles userData={userData} />
        </div>
      );
    }

    // Priority 3: Normal Dashboard/Assessments/Documents based on currentPage and userRole
    switch (currentPage) {
      case 'dashboard':
        if (userRole === 'pwd') {
          return <PWD_Dashboard userData={userData} />;
        } else if (userRole === 'guardian') {
          return <GuardianDashboard userData={userData} />;
        } else if (userRole === 'medical_officer') {
          return <DoctorsDashboard userData={userData} onShowPwdProfile={handleShowPwdProfile} />;
        } else if (userRole === 'county_director') {
          return <Health_Officers_Dashboard userData={userData} />;
        }
        else if (userRole==='medical_approver'){
return <ApproverDashboard userData={userData} onShowPwdProfile={handleShowPwdProfile}/>
        }
        return <DashboardContent userData={userData} />;

      case 'assessments':
        if (userRole === 'pwd') {
          return <PWDAssesmentsPage userData={userData} />;
        } else if (userRole === 'guardian') {
          return <GuardianAssessment userData={userData} />;
        } else if (userRole === 'medical_officer') {
          return <DoctorsAssesment userData={userData} onShowPwdProfile={handleShowPwdProfile} />;
        } else if (userRole === 'health_officer') {
          return <HealthOfficerAssesments userData={userData} />;
        }
        return <AssessmentsContent userData={userData} />;

      case 'documents':
        return <DocumentsContent userData={userData} />;

      // Handle the 'profile' case if you decide to add it to sidebar
      case 'profile':
        // This case would render Profiles component if selected from sidebar
        // Currently handled by `showCurrentUserProfile` directly for Navbar click.
        // If you add a sidebar "My Profile" button, this is where it would lead.
        return (
          <div className="flex-1 bg-gray-50 p-6">
            <Profiles userData={userData} />
          </div>
        );

      default:
        return <DashboardContent userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Pass the new handler to the Navbar */}
      <Navbar
        onLogout={handleLogout}
        // Navbar now fetches its own user data, so you don't need to pass all these:
        // userName={userData?.fullName || "User"}
        // userRole={userRole}
        // userId={userData?.id}
        onProfileClick={handleShowCurrentUserProfile} // NEW PROP
      />

      <div className="flex flex-1" style={{ paddingTop: NAVBAR_HEIGHT }}>
        {renderSidebar()}
        <div className={`flex-1 transition-all duration-300 ${sidebarHovered ? 'ml-64' : 'ml-16'}`}>
          {renderContent()}
        </div>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Automatically hide after 6 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Position the toast
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity} // 'success' or 'error'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </div>
    </div>
  );
};

export default UserDashboard;