
import './App.css'
import Registration from './Components/registration'
import { useState } from 'react'
import SetPasswordOTP from './Components/Onetimepin'
import PasswordSetupComponent from './Components/passwordSetup'
import ConfirmationDialog from './Components/ConfirmationDialog'
import UserDashboard from './Components/Dashboard'
import LoginForm from './Components/LoginForm'

function App() {

  const STEPS = {
    LOGIN: 'login',
    REGISTRATION: 'registration',
    PASSWORD_SETUP: 'password_setup',
    OTP_SETUP: 'otp_setup',
    COMPLETED: 'completed', // Optional: for when all steps are done
  };
  const [currentStep, setCurrentStep] = useState(STEPS.LOGIN);
   const [registrationFormData, setRegistrationFormData] = useState(null);

  const handleRegisterClick = () => {
    setCurrentStep(STEPS.REGISTRATION);
  };
 const handleRegistrationComplete = (data) => {
  setRegistrationFormData(data);
  setCurrentStep(STEPS.PASSWORD_SETUP);
};

  const handlePasswordSetupComplete = () => {
    setCurrentStep(STEPS.OTP_SETUP);
  }
  const handleOTPSetupComplete = () => {
    setCurrentStep(STEPS.COMPLETED);
  }
  const handleLoginClick = () => {
    setCurrentStep(STEPS.LOGIN);
  };

  return (
    <>
        {currentStep === STEPS.LOGIN && (<LoginForm onRegisterClick={handleRegisterClick} />)}
{currentStep === STEPS.REGISTRATION && (
          // Pass the completion handler to the Registration component
          <div>
 <Registration 
  onRegistrationComplete={handleRegistrationComplete}
  onLoginClick={handleLoginClick}
/>

                    </div>
         
        )}

        {currentStep === STEPS.PASSWORD_SETUP && (
          // Pass the completion handler to the PasswordSetupComponent
          <PasswordSetupComponent onPasswordSetupComplete={handlePasswordSetupComplete} formData={registrationFormData}/>
        )}
        {currentStep === STEPS.OTP_SETUP && (
          // Pass the completion handler to the SetPasswordOTP component
          <SetPasswordOTP onOtpSetupComplete={handleOTPSetupComplete} />
        )}
        {currentStep === STEPS.COMPLETED && (
          <UserDashboard/>
        )}
    </>
  )
}

export default App
