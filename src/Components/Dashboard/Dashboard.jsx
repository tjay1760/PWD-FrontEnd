import React from 'react';

const UserDashboard = ({ userData }) => {
  // If no data is provided, you might want to show a message or a loading spinner
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-600">No user data available twwwwwo display.</p>
      </div>
    );
  }

  const {
    userType,
    firstName,
    middleName,
    lastName,
    idNumber,
    gender,
    dateOfBirth,
    maritalStatus,
    phoneNumber,
    email,
    county,
    subCounty,
    occupation,
    education,
    emergencyName,
    emergencyRelationship,
    emergencyPhone,
  } = userData;

  const dataSections = [
    {
      title: 'User Type',
      fields: [
        { label: 'Type', value: userType },
      ],
    },
    {
      title: 'Bio Data',
      fields: [
        { label: 'Full Name', value: `${firstName || ''} ${middleName || ''} ${lastName || ''}`.trim() || 'Not provided' },
        { label: 'ID/Passport No.', value: idNumber },
        { label: 'Gender', value: gender },
        { label: 'Date of Birth', value: dateOfBirth },
        { label: 'Marital Status', value: maritalStatus },
      ],
    },
    {
      title: 'Contact and Background',
      fields: [
        { label: 'Mobile Number', value: phoneNumber },
        { label: 'Email Address', value: email },
        { label: 'County', value: county },
        { label: 'Sub County', value: subCounty },
        { label: 'Occupation', value: occupation },
        { label: 'Education', value: education },
      ],
    },
    {
      title: 'Emergency Contact',
      fields: [
        { label: 'Name', value: emergencyName },
        { label: 'Relationship', value: emergencyRelationship },
        { label: 'Phone', value: emergencyPhone },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-4xl font-sans">
        <h1 className="text-center text-3xl font-bold text-blue-900 mb-8 border-b pb-4">
          User Profile Dashboard
        </h1>

        <div className="space-y-6">
          {dataSections.map((section, index) => (
            <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
              <h2 className="text-xl font-semibold text-green-800 mb-4">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-gray-700">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    <p>
                      <strong className="text-gray-900">{field.label}:</strong>{' '}
                      {field.value || 'Not provided'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Data last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;