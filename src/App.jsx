import './App.css';
import Registration from './Components/registration';
import { useState } from 'react';
import SetPasswordOTP from './Components/Onetimepin';
import PasswordSetupComponent from './Components/passwordSetup';
// import ConfirmationDialog from './Components/ConfirmationDialog'; // Not used in provided code
import UserDashboard from './Components/Dashboard/Dashboard'; // Ensure this path is correct
import LoginForm from './Components/LoginForm';
import { useEffect } from 'react';

function App() {
  const STEPS = {
    LOGIN: 'login',
    REGISTRATION: 'registration',
    PASSWORD_SETUP: 'password_setup',
    OTP_SETUP: 'otp_setup',
    COMPLETED: 'completed', // This is where UserDashboard is rendered
    DASHBOARD: 'dashboard', // Let's define a clearer step for the dashboard
  };
  // Let's use DASHBOARD as the final step for clarity
  const [currentStep, setCurrentStep] = useState(STEPS.LOGIN);
  const [registrationFormData, setRegistrationFormData] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null); // New state for logged-in user data

  // In App.js
useEffect(() => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    // Here, you would typically make an API call to get user profile
    // using the accessToken, or retrieve it from localStorage if you stored it.
    // For now, let's just assume if token exists, we go to dashboard.
    // In a real app, you'd fetch user data and then set it.
    setCurrentStep(STEPS.DASHBOARD);
    // If you store user data in localStorage too:
    // const storedUserData = localStorage.getItem('userData');
    // if (storedUserData) {
    //   setLoggedInUserData(JSON.parse(storedUserData));
    // }
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
    // This used to set to STEPS.COMPLETED, now let's set it to DASHBOARD
    setCurrentStep(STEPS.DASHBOARD);
  };

  const handleLoginClick = () => {
    setCurrentStep(STEPS.LOGIN);
  };

  const handleLoginSuccess = (userData) => {
    // Optionally store the user data returned from the API
    setLoggedInUserData(userData);
    setCurrentStep(STEPS.DASHBOARD); // Set current step to render the dashboard
  };

  return (
    <>
      {currentStep === STEPS.LOGIN && (
        <LoginForm
          onRegisterClick={handleRegisterClick}
          onLoginSuccess={handleLoginSuccess} // Pass the new handler to LoginForm
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

      {/* Render UserDashboard when currentStep is DASHBOARD */}
      {currentStep === STEPS.DASHBOARD && (
        <UserDashboard userData={loggedInUserData} /> 
      )}
      {
  console.log('User Data Logged:', loggedInUserData)
}
    </>
  );
}

export default App;