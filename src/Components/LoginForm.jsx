import React from 'react';

// You would replace these with your actual image paths
import wheelchairIcon from "../assets/Wheelchair man.png"
import formImage from '../assets/Form Image.png'; // Assuming you have this image

const LoginForm = ( {onRegisterClick }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left section with background image and overlay */}
      <div className="relative w-1/2 bg-gray-200 flex items-center justify-center p-8">
        {/* The provided image for the left side is a complex graphic.
            For a placeholder, we'll use a div that simulates its presence.
            You'll replace this with your actual image component or div with background image. */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${formImage})` }} // Use your form image here
        >
          {/* This image contains various graphical elements and people,
              appearing to be related to a medical or support system.
              For this placeholder, we'll just show the full image. */}
          <img src={formImage} alt="Decorative background" className="w-full h-full object-cover" />
        </div>
        {/* Content over the image, if any, goes here */}
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
                      onRegisterClick(); // Call the parent function to handle registration
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
          <form className="space-y-6">
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
                required
              />
            </div>
            <div className="text-right text-sm">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password? Reset
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-3 px-6 rounded-full border border-green-300 transition-colors duration-200 uppercase tracking-wide"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;