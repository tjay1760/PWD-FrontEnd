// passwordSetup.jsx
import React, { useState } from 'react';
import wheelchairIcon from "../assets/Wheelchair man.png";

const PasswordSetupComponent = ({ onPasswordSetupComplete, initialFormData }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validatePasswords = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
        newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(password)) {
        newErrors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password = 'Password must contain at least one special character';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validatePasswords()) {
      setLoading(true);
      try {
        // Map userType to the 'role' expected by the backend
        let userRole = '';
        if (initialFormData.userType.includes("Person With Disability")) {
            userRole = 'pwd';
        } else if (initialFormData.userType.includes("Guardian")) {
            userRole = 'guardian';
        } else if (initialFormData.userType.includes("Officer")) {
            userRole = 'officer';
        }

        // Construct the data object exactly as the backend expects
        const dataToSend = {
          firstName: initialFormData.firstName,
          lastName: initialFormData.lastName,
          email: initialFormData.email,
          nationalId: initialFormData.idNumber, // Map idNumber to nationalId
          phone: initialFormData.phoneNumber,   // Map phoneNumber to phone
          password: password,
          gender: initialFormData.gender,
          dob: initialFormData.dateOfBirth,     // Map dateOfBirth to dob
          county: initialFormData.county,       // Use general county/subCounty first
          subCounty: initialFormData.subCounty, // Use general county/subCounty first
          role: userRole,
        };

        // Add officer-specific fields if the role is 'officer'
        if (userRole === 'officer') {
console.log("Officer role detected, adding officer-specific fields.");
        }


        console.log("Payload to backend:", dataToSend);

        const response = await fetch('http://localhost:5000/api/auth/register', { // Correct API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend), // Send the formatted dataToSend object
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Registration successful:', result);
          alert('Registration successful!');
          onPasswordSetupComplete();
        } else {
          const errorData = await response.json();
          console.error('Registration failed:', errorData);
          alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred during registration. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo and Icon */}
        <div className=" mb-6 flex items-center justify-center">
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1">
            <input
              type="password"
              placeholder="Confirm Password*"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetupComponent;