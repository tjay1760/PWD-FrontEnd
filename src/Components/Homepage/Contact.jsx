import React from 'react'

const Contact = () => {
  return (
    <div>
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter text-white" id='contacts'>
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-10 sm:mb-12 md:mb-16">
        Contact Us
      </h1>

      {/* Grid container for contact details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full">
        {/* Phone Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-gray-900 flex flex-col justify-between">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Phone</h2>
          <a href="tel:+254726457478" className="text-blue-600 hover:underline text-lg sm:text-xl">
            +254 (0) 726 457478
          </a>
        </div>

        {/* Email Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-gray-900 flex flex-col justify-between">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Email</h2>
          <a href="mailto:info@site.com" className="text-blue-600 hover:underline text-lg sm:text-xl">
            info@site.com
          </a>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-gray-900 flex flex-col justify-between">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Address</h2>
          <p className="text-lg sm:text-xl">Nairobi, Kenya</p>
        </div>

        {/* Working Hours Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-gray-900 flex flex-col justify-between">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Working Hours</h2>
          <p className="text-lg sm:text-xl">9:00 - 18:00</p>
        </div>
      </div>

      {/* Optional: Scroll to top button (as seen in the original image) */}
      <button
        className="fixed bottom-6 right-6 bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
    </div>
  )
}

export default Contact