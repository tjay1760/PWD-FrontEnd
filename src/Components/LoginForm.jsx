import React, { useState } from 'react';
import wheelchairIcon from "../assets/Wheelchair man.png";
import formImage from '../assets/Form Image.png';
const REACT_APP_API_BASE_URL= "http://localhost:5000"
const LoginForm = ({ onRegisterClick }) => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailOrId, password }), // 'identifier' could be email or national ID based on your backend
      });

      console.log({ identifier: emailOrId, password })

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);
        // Store tokens (assuming your API returns access_token and refresh_token)
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        // You might want to redirect the user to a dashboard or home page
        // Example: window.location.href = '/dashboard'; or use react-router-dom history.push
        alert('Login Successful!'); // For demonstration
        // In a real app, you'd likely redirect:
        // history.push('/dashboard'); // if using react-router-dom
      } else {
        // Login failed
        setError(data.message || 'Login failed. Please check your credentials.');
        console.error('Login error:', data);
      }
    } catch (err) {
      console.error('Network or server error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section with background image and overlay */}
      <div className="relative w-1/2 bg-gray-200 flex items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${formImage})` }}
        >
          <img src={formImage} alt="Decorative background" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Right section with the login form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          {/* Logo and Title */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <img src={wheelchairIcon} alt="Wheelchair Icon" className="h-12 w-12 mr-2" />
              <h1 className="text-3xl font-bold text-gray-800">
                Persons With Disability
                <span className="block text-blue-900 text-2xl">Medical System</span>
              </h1>
            </div>
          </div>

          {/* Call to action / Register link */}
          <div className="text-center text-sm mb-8">
            <p className="text-gray-700">Login to the Persons With Disability (PWD) Medical System.</p>
            <p className="text-gray-700">
              Don't have an account?{' '}
              <a href="#" className="text-blue-500 hover:underline"
                onClick={
                  (e) => {
                    e.preventDefault();
                    if (onRegisterClick) {
                      onRegisterClick();
                    }
                  }
                }
              >
                Register
              </a>
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-300 my-8"></div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}> {/* Add onSubmit handler here */}
            <div>
              <label htmlFor="emailOrId" className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Enter your email or national ID and password
              </label>
              <input
                type="text"
                id="emailOrId"
                name="emailOrId"
                placeholder="Type your Email/National ID*"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
                value={emailOrId}
                onChange={(e) => setEmailOrId(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Type your Password*"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-right text-sm">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password? Reset
              </a>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className={`w-full bg-green-100 text-green-800 font-semibold py-3 px-6 rounded-full border border-green-300 transition-colors duration-200 uppercase tracking-wide
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-200'}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;