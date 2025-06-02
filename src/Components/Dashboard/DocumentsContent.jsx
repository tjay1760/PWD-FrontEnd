// Components/Dashboard/DocumentsContent.jsx
import React from 'react';

const DocumentsContent = () => {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          {/* Empty State Illustration */}
          <div className="mb-8">
            <div className="relative mx-auto w-32 h-32">
              {/* Magnifying Glass Circle */}
              <div className="w-24 h-24 border-4 border-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl text-gray-400">😐</div>
              </div>
              {/* Magnifying Glass Handle */}
              <div className="absolute bottom-2 right-4 w-8 h-3 bg-purple-600 rounded transform rotate-45 origin-left"></div>
              {/* Document Lines */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-1 bg-gray-300 rounded mb-1"></div>
                <div className="w-8 h-1 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            There's nothing to display yet
          </h2>
          
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Kindly book for an assessment for the reports<br />
            and certificates to show.
          </p>

          {/* Book Assessment Button */}
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200">
            BOOK ASSESSMENT
          </button>
        </div>

        {/* Accessibility Button (consider if this belongs here or in a higher-level layout) */}
        <button className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200">
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DocumentsContent;