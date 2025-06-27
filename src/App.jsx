import './App.css';
import Registration from './Components/registration';
import { useState, useEffect } from 'react';
import SetPasswordOTP from './Components/Onetimepin';
import PasswordSetupComponent from './Components/passwordSetup';
import UserDashboard from './Components/Dashboard/Dashboard';
import LoginForm from './Components/LoginForm';
import HomePage from './Components/Homepage/HomePage';
import { Toaster } from 'react-hot-toast'; // Import Toaster

function App() {
  const STEPS = {
    HOME: 'home',
    LOGIN: 'login',
    REGISTRATION: 'registration',
    PASSWORD_SETUP: 'password_setup',
    OTP_SETUP: 'otp_setup',
    DASHBOARD: 'dashboard',
  };
  // Set the initial step to HOME
  const [currentStep, setCurrentStep] = useState(STEPS.HOME);
  const [registrationFormData, setRegistrationFormData] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedUserData = localStorage.getItem('userData');

    if (accessToken && storedUserData) {
      try {
        setLoggedInUserData(JSON.parse(storedUserData));
        setCurrentStep(STEPS.DASHBOARD); // Go to dashboard if token and data exist
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        setCurrentStep(STEPS.HOME); // Fall back to Home if data is corrupt
      }
    } else if (accessToken && !storedUserData) {
      console.warn("Access token found, but user data not in localStorage. Redirecting to Home.");
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setCurrentStep(STEPS.HOME); // Fall back to Home
    } else {
      setCurrentStep(STEPS.HOME); // No access token, or invalid token/data leads to Home
    }
  }, []);

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
    setLoggedInUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    setCurrentStep(STEPS.DASHBOARD);
  };

  const handleAppLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    setLoggedInUserData(null);
    setCurrentStep(STEPS.HOME); // Redirect to Home on logout
  };

  // New handler for navigating from HomePage to other steps
  const handleNavigateFromHome = (targetStep) => {
    setCurrentStep(targetStep);
  };

  return (
    <>
      <Toaster />

      {/* Render HomePage when currentStep is HOME */}
      {currentStep === STEPS.HOME && (
        <HomePage
          onRegisterClick={() => handleNavigateFromHome(STEPS.REGISTRATION)}
          onLoginClick={() => handleNavigateFromHome(STEPS.LOGIN)}
        />
      )}

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
          userData={loggedInUserData}
          onAppLogout={handleAppLogout}
        />
      )}
    </>
  );
}

export default App;