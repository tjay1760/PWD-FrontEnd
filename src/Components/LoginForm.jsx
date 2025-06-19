import React, { useState } from 'react';
import wheelchairIcon from "../assets/Wheelchair man.png";
import formImage from '../assets/Form Image.png';

const REACT_APP_API_BASE_URL= "http://localhost:5000" // Keep this for clarity or switch to process.env

// ACCEPT onLoginSuccess PROP HERE
const LoginForm = ({ onRegisterClick, onLoginSuccess }) => { // <--- ADDED onLoginSuccess
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailOrId, password }), // Ensure this matches your backend
      });

      console.log({ identifier: emailOrId, password })

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('accessToken', data.tokens.access);
        localStorage.setItem('refreshToken', data.tokens.refresh);

        const userDetails = data.user || data;
  localStorage.setItem('user', JSON.stringify(userDetails));
  localStorage.setItem('userId', userDetails.id); 
        // *** CRUCIAL CHANGE: CALL onLoginSuccess ***
        if (onLoginSuccess) {
          // Assuming your backend returns user data directly in the response
          // or within a 'user' key (e.g., data.user). Adjust as per your API.
          // const userDetails = data.user || data; 
          onLoginSuccess(userDetails); // Pass the user data to the parent
        }
        // No need for alert('Login Successful!') here as the dashboard will render
      } else {
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
      {/* ... (rest of your LoginForm JSX - no changes needed here) ... */}
      <div className="relative w-1/2 bg-gray-200 flex items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${formImage})` }}
        >
          <img src={formImage} alt="Decorative background" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4">
              <img src={wheelchairIcon} alt="Wheelchair Icon" className="h-12 w-12 mr-2" />
              <h1 className="text-3xl font-bold text-gray-800">
                Persons With Disability
                <span className="block text-blue-900 text-2xl">Medical System</span>
              </h1>
            </div>
          </div>

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

          <div className="w-full h-px bg-gray-300 my-8"></div>

          <form className="space-y-6" onSubmit={handleLogin}>
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