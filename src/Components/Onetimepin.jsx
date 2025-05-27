// SetPasswordOTP.js
import React, { useState, useRef } from 'react';
import wheelchairIcon from "../assets/Wheelchair man.png";

const SetPasswordOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // State to hold OTP digits
  const inputRefs = useRef([]); // Ref to manage focus on OTP input fields

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digit
    if (value.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if a digit is entered and it's not the last input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move focus to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleLogin = () => {
    const fullOtp = otp.join('');
    console.log("OTP entered:", fullOtp);
    // Here you would typically send the OTP to your backend for verification
    // and then navigate to the password setting screen or dashboard.
    alert(`Logging in with OTP: ${fullOtp}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-6">
          <img src={wheelchairIcon} alt="Wheelchair Icon" className="h-12 w-12 mb-2" />
          <h1 className="font-bold text-xl averia-serif-libre text-center text-blue-900">
            Persons With Disability
            <span className="block text-blue-900">Medical System</span>
          </h1>
        </div>

        {/* One Final Step Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">One Final Step</h2>
          <h3 className="text-green-700 text-3xl font-bold mb-4">Let's Set your Password</h3>
          <p className="text-sm text-gray-600">
            You will be able to login with your Mobile Number or Email as your Username.
          </p>
        </div>

        {/* OTP Section */}
        <div className="border-t border-gray-300 pt-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="otp-input" className="text-gray-700 font-semibold text-sm">
              ENTER OTP
            </label>
            <span className="text-red-500 text-xs">Expiring in 5:00 min</span>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            OTP has been sent to your Phone and Email
          </p>

          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500 focus:outline-none"
              />
            ))}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition duration-300"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordOTP;