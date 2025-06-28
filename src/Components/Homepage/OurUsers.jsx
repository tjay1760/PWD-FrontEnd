import React from 'react'
import userImage from '../../assets/Form Image.png'

const OurUsers = () => {
  return (
    <div className='text-center px-36 mt-10 bg-gray-100 py-10'>
        <div className="users ">
            <h1 className='font-bold font-serif text-6xl text-blue-800'>Who Can Use This System?</h1>
            <div className="holder flex gap-6 mt-5">
                <img src={userImage} alt="User" />
                <ul className='user-list list-disc text-start ml-10 mt-10 bg-white p-10 rounded-lg shadow-md text-3xl font-bold w-full flex flex-col gap-10 max-h-fit'>
                    <li>Persons with Disabilities (PWD)</li>
                    <li>Guardians of PWD</li>
                    <li>Organizations supporting PWD</li>
                    <li>Medical Assesment Officers</li>
                    <li>County Health Directors</li>
                    <li>County-Level System Administrators</li>
                    <li>Authorized Organizations</li>
                </ul>
                </div>
        </div>
        <div className="verification">
             <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      {/* Card-like container for the form content */}
      <div className="p-6 sm:p-8 md:p-10 lg:p-12 w-2/3 text-center">
        {/* Title */}
        <h1 className="text-6xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-blue-800 mb-4 sm:mb-6">
          Verify a Disability Certificate
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
          Organizations can validate the authenticity of disability certificates issued by the
          system. This protects against forgery and ensures service provision is based on
          verified data.
        </p>

        {/* Form Inputs */}
        <div className="space-y-4 mb-6">
          {/* Certificate Number Input */}
          <input
            type="text"
            placeholder="Certificate Number"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 transition duration-300 ease-in-out hover:border-blue-400"
            aria-label="Certificate Number"
          />

          {/* PWD National ID or Registration Number Input */}
          <input
            type="text"
            placeholder="PWD National ID or Registration Number"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500 transition duration-300 ease-in-out hover:border-blue-400"
            aria-label="PWD National ID or Registration Number"
          />
        </div>

        {/* Verify Now Button */}
        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-800 text-white font-bold py-3 sm:py-4 px-6 rounded-full text-lg sm:text-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Verify Now
        </button>
      </div>

      {/* Optional: Scroll to top button (as seen in the original image) */}
      <button
        className="fixed bottom-6 right-6 bg-gray-300 hover:bg-gray-400 text-gray-800 p-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
        </div>
    </div>
  )
}

export default OurUsers