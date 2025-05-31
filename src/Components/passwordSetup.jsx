// passwordSetup.jsx
import React, { useState } from 'react';
import wheelchairIcon from "../assets/Wheelchair man.png";

const PasswordSetupComponent = ({ onPasswordSetupComplete, formData }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({}); // For client-side validation errors
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const validatePasswords = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(password)) {
        newErrors.password = 'Password must contain at least one lowercase letter.';
    } else if (!/\d/.test(password)) {
        newErrors.password = 'Password must contain at least one number.';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        newErrors.password = 'Password must contain at least one special character (!@#$%^&*).';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setNotification({ message: '', type: '' }); // Clear any previous notifications
    setErrors({}); // Clear client-side validation errors

    // First, run client-side password validation
    if (!validatePasswords()) {
        setNotification({ message: 'Please correct the password errors.', type: 'error' });
        return; // Stop submission if client-side validation fails
    }

    // --- CORRECTED: Validate frontend formData keys ---
    const requiredFields = [
      'firstName',
      'lastName',
      'idNumber', // Corresponds to formData.idNumber
      'gender',
      'dateOfBirth', // Corresponds to formData.dateOfBirth
      'phoneNumber', // Corresponds to formData.phoneNumber
      'email',
      'county',
      'subCounty',
    ];

    let currentRequiredFields = [...requiredFields]; // Copy to modify based on role

    // For Officer role, validate specific officer fields
    console.log("formData.userType:", formData);
    if (formData.userType.includes("Officer")) {
        // These are separate states in Registration.jsx, so they are passed directly.
        // Assuming medicalLicenceNumber, speciality, officerType, countyOfPractice, subCounty (for officer) are required
        if (!formData.officerType) currentRequiredFields.push('officerType');
        if (!formData.countyOfPractice) currentRequiredFields.push('countyOfPractice');
        if (!formData.subCounty) currentRequiredFields.push('subCounty (Officer)'); // Be specific if needed
        if (!formData.medicalFacility) currentRequiredFields.push('medicalFacility');
        if (!formData.medicalLicenceNumber) currentRequiredFields.push('medicalLicenceNumber');
        if (!formData.speciality) currentRequiredFields.push('speciality');
    } else { // PWD or Guardian roles might have specific requirements
        // If 'maritalStatus', 'occupation', 'education' are strictly required for PWD/Guardian, add them here
        // if (!formData.maritalStatus) currentRequiredFields.push('maritalStatus');
        // if (!formData.occupation) currentRequiredFields.push('occupation');
        // if (!formData.education) currentRequiredFields.push('education');

        // Check for Next of Kin fields if it's PWD or Guardian
        if (formData.userType.includes("Person With Disability") || formData.userType.includes("Guardian")) {
            if (!formData.emergencyName) currentRequiredFields.push('emergencyName');
            if (!formData.emergencyRelationship) currentRequiredFields.push('emergencyRelationship');
            if (!formData.emergencyPhone) currentRequiredFields.push('emergencyPhone');
        }
    }


    const missingFields = currentRequiredFields.filter(field => {
        // Special handling for nested or conditional fields if needed
        if (field === 'subCounty (Officer)') {
            return !formData.subCounty; // Check the subCounty from officer details
        }
        return !formData[field];
    });

    if (missingFields.length > 0) {
        setNotification({ message: `Missing required fields: ${missingFields.join(', ')}. Please go back and complete the registration form.`, type: 'error' });
        setLoading(false); // Stop loading if fields are missing
        return; // Stop submission if initial form data is incomplete
    }
    // --- END CORRECTION ---


    setLoading(true);
    try {
        let userRole = '';
        if (formData.userType.includes("Person With Disability")) {
            userRole = 'pwd';
        } else if (formData.userType.includes("Guardian")) {
            userRole = 'guardian';
        } else if (formData.userType.includes("Officer")) {
            userRole = 'officer';
        }

        const dataToSend = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            nationalId: formData.idNumber, // Map idNumber to nationalId
            phone: formData.phoneNumber,   // Map phoneNumber to phone
            password: password,
            gender: formData.gender.toLowerCase(),
            dob: formData.dateOfBirth,     // Map dateOfBirth to dob
            county: formData.county,       // Use general county/subCounty first
            subCounty: formData.subCounty, // Use general county/subCounty first
            role: userRole,
        };

        // Add officer-specific fields to dataToSend only if the role is 'officer'
        // These fields are taken directly from initialformData as passed from Registration.jsx
        if (userRole === 'officer') {
            dataToSend.officerType = formData.officerType;
            dataToSend.countyOfPractice = formData.countyOfPractice;
            dataToSend.subCounty = formData.subCounty; // This is the officer's subCounty if distinct
            dataToSend.medicalFacility = formData.medicalFacility;
            dataToSend.medicalLicenceNumber = formData.medicalLicenceNumber;
            dataToSend.speciality = formData.speciality;
        }


        console.log("Payload to backend:", dataToSend);

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Registration successful:', result);
            setNotification({ message: 'User registered successfully!', type: 'success' });
            // Optionally, you might want to delay this call to give the user time to read the success message
            setTimeout(() => {
                onPasswordSetupComplete();
            }, 2000); // Wait 2 seconds before navigating
        } else {
            const errorData = await response.json();
            console.error('Registration failed:', errorData);

            let errorMessage = 'Registration failed. Please check your details.';

            if (errorData.message) {
                errorMessage = errorData.message;
            } else if (errorData.errors && typeof errorData.errors === 'object') {
                const fieldErrors = Object.values(errorData.errors).flat();
                if (fieldErrors.length > 0) {
                    errorMessage = fieldErrors.join(', ');
                }
            } else if (response.status === 409) {
                errorMessage = errorData.message || 'Email or National ID already registered.';
            } else if (response.status === 400) {
                 errorMessage = errorData.message || 'Invalid input or missing fields. Please check your form.';
            }

            setNotification({ message: `Error: ${errorMessage}`, type: 'error' });
        }
    } catch (error) {
        console.error('Network or unexpected error during registration:', error);
        setNotification({ message: 'A network error occurred. Please check your internet connection and try again.', type: 'error' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Notification Display */}
        {notification.message && (
          <div
            className={`p-3 mb-4 rounded-lg text-white text-center text-sm font-semibold
              ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {notification.message}
          </div>
        )}

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