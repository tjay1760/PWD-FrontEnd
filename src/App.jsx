
import './App.css'
import Registration from './Components/registration'
import { useState } from 'react'
import SetPasswordOTP from './Components/Onetimepin'
import PasswordSetupComponent from './Components/passwordSetup'
import ConfirmationDialog from './Components/ConfirmationDialog'
import UserDashboard from './Components/Dashboard'

function App() {

  const STEPS = {
    REGISTRATION: 'registration',
    PASSWORD_SETUP: 'password_setup',
    OTP_SETUP: 'otp_setup',
    COMPLETED: 'completed', // Optional: for when all steps are done
  };
  const [currentStep, setCurrentStep] = useState(STEPS.REGISTRATION);
  const handleRegistrationComplete = () => {
    setCurrentStep(STEPS.PASSWORD_SETUP);
  }
  const handlePasswordSetupComplete = () => {
    setCurrentStep(STEPS.OTP_SETUP);
  }
  const handleOTPSetupComplete = () => {
    setCurrentStep(STEPS.COMPLETED);
  }

  return (
    <>
{currentStep === STEPS.REGISTRATION && (
          // Pass the completion handler to the Registration component
          <div>
 <Registration onRegistrationComplete={handleRegistrationComplete} />
                    </div>
         
        )}

        {currentStep === STEPS.PASSWORD_SETUP && (
          // Pass the completion handler to the PasswordSetupComponent
          <PasswordSetupComponent onPasswordSetupComplete={handlePasswordSetupComplete} />
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
