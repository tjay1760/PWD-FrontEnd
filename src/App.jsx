import './App.css';
import Registration from './Components/registration';
import { useState, useEffect } from 'react';
import SetPasswordOTP from './Components/Onetimepin';
import PasswordSetupComponent from './Components/passwordSetup';
import UserDashboard from './Components/Dashboard/Dashboard';
import LoginForm from './Components/LoginForm';
import { Toaster } from 'react-hot-toast'; // Import Toaster

function App() {
  const STEPS = {
    LOGIN: 'login',
    REGISTRATION: 'registration',
    PASSWORD_SETUP: 'password_setup',
    OTP_SETUP: 'otp_setup',
    DASHBOARD: 'dashboard',
  };
  const [currentStep, setCurrentStep] = useState(STEPS.LOGIN);
  const [registrationFormData, setRegistrationFormData] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null); // This state will now be managed persistently

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedUserData = localStorage.getItem('userData'); // Try to get stored user data

    if (accessToken && storedUserData) {
      try {
        setLoggedInUserData(JSON.parse(storedUserData)); // Parse and set user data
        setCurrentStep(STEPS.DASHBOARD); // Go to dashboard if token and data exist
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        // Clear invalid data and force re-login if parsing fails
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        setCurrentStep(STEPS.LOGIN);
      }
    } else if (accessToken && !storedUserData) {
      // Scenario: accessToken exists but userData doesn't (e.g., first login, or data wasn't stored)
      // In a real app, you'd fetch user profile here using the accessToken.
      // For this example, we'll just fall back to login if data isn't found immediately.
      // You might show a loading spinner and then fetch user details.
      console.warn("Access token found, but user data not in localStorage. Redirecting to login.");
      localStorage.removeItem('accessToken'); // Clear potentially stale token
      localStorage.removeItem('refreshToken');
      setCurrentStep(STEPS.LOGIN);
    } else {
      // No access token, or invalid token/data leads to login
      setCurrentStep(STEPS.LOGIN);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleRegisterClick = () => {
    setCurrentStep(STEPS.REGISTRATION);
  };

  const handleRegistrationComplete = (data) => {
    setRegistrationFormData(data);
    setCurrentStep(STEPS.PASSWORD_SETUP);
  };

  const handlePasswordSetupComplete = () => {
    setCurrentStep(STEPS.OTP_SETUP);
  };

  const handleOTPSetupComplete = () => {
    setCurrentStep(STEPS.DASHBOARD);
  };

  const handleLoginClick = () => {
    setCurrentStep(STEPS.LOGIN);
  };

  const handleLoginSuccess = (userData) => {
    // Store the user data in localStorage on successful login
    setLoggedInUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData)); // Store user data
    setCurrentStep(STEPS.DASHBOARD);
  };

  const handleAppLogout = () => {
    // Clear user data from localStorage and state on logout
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData'); // Clear user data from localStorage
    setLoggedInUserData(null); // Clear user data from state
    setCurrentStep(STEPS.LOGIN);
  };

  return (
    <>
      <Toaster />

      {currentStep === STEPS.LOGIN && (
        <LoginForm
          onRegisterClick={handleRegisterClick}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentStep === STEPS.REGISTRATION && (
        <div>
          <Registration
            onRegistrationComplete={handleRegistrationComplete}
            onLoginClick={handleLoginClick}
          />
        </div>
      )}

      {currentStep === STEPS.PASSWORD_SETUP && (
        <PasswordSetupComponent
          onPasswordSetupComplete={handlePasswordSetupComplete}
          formData={registrationFormData}
        />
      )}

      {currentStep === STEPS.OTP_SETUP && (
        <SetPasswordOTP onOtpSetupComplete={handleOTPSetupComplete} />
      )}

      {currentStep === STEPS.DASHBOARD && (
        <UserDashboard
          userData={loggedInUserData} // Pass the persisted user data
          onAppLogout={handleAppLogout}
        />
      )}
      {
        console.log('Current Step:', currentStep, 'Logged User Data:', loggedInUserData)
      }
    </>
  );
}

export default App;