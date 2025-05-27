import React, { useState } from 'react';
import wheelchairIcon from "../assets/Wheelchair man.png";

const PasswordSetupComponent = ({onPasswordSetupComplete}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validatePasswords = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validatePasswords()) {
      
         
       onPasswordSetupComplete(); // Call the completion handler passed from the parent component
    
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo and Icon */}
        <div className=" mb-6 flex items-center justify-center">
          {/* You can add your logo or icon here */}
          <img src={wheelchairIcon} alt="Wheelchair Icon" className="mb-2 w-24 h-24" />
          <div className="space-y-1">
            <div className="averia-serif-libre font-medium text-2xl text-gray-700">Persons With Disability</div>
            <div className="text-2xl averia-serif-libre font-bold text-blue-600">Medical System</div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-2 averia-serif-libre ">One Final Step</h1>
          <h2 className="text-xl font-semibold text-green-700 mb-3 averia-serif-libre ">Let's Set your Password</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            You will be able to login with your<br />
            Mobile Number or Email as your Username.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-6"></div>

        {/* Form Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4 averia-serif-libre ">
              Create Your Password
            </h3>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <input
              type="password"
              placeholder="Type your Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <input
              type="password"
              placeholder="Confirm your Password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-3 px-4 rounded-full border border-green-300 transition-colors duration-200 mt-6"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetupComponent;