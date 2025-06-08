import React from 'react';

const ReportAndFeedbackForm = () => {
  return (
    <div className="max-w-3xl p-6 space-y-8 bg-white border rounded-lg">
      {/* Report a problem */}
      <div className="rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-green-800 mb-1">Report a problem</h2>
        <p className="text-sm text-gray-600 mb-4">What are are you having problems with?</p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-blue-900 uppercase mb-1">
                Area you have problem
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                <option>Changing Profile Details</option>
                <option>Logging In</option>
                <option>Payment Issues</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-transparent uppercase mb-1">
                &nbsp;
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                <option>Secondary areas</option>
                <option>Username</option>
                <option>Email Address</option>
                <option>Password</option>
              </select>
            </div>
          </div>

          <textarea
            placeholder="Type in details what you experienced"
            rows="4"
            className="w-full border border-blue-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      {/* Share your feedback */}
      <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-green-800 mb-1">Share your feedback with us</h2>
        <p className="text-sm text-gray-600 mb-4">Share your feedback with us.</p>
        <textarea
          placeholder="Type in details what you would recommend us to improve"
          rows="4"
          className="w-full border border-blue-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  );
};

export default ReportAndFeedbackForm;
