const ConfirmRegistrationModal = ({ data, onClose, onSubmit}) => {
  if (!data) return null;

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
  } = data;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-lg relative font-sans max-h-[90vh] overflow-y-auto">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-4">
          Confirm the Details before Submitting
        </h2>

        <div className="border-t pt-4 space-y-4 text-gray-800">
          <div>
            <h3 className="font-semibold text-green-900 text-lg mb-2">User Type</h3>
            <p>{userType || 'Not selected'}</p>
          </div>

          <div>
            <h3 className="font-semibold text-green-900 text-lg mb-2">Bio Data</h3>
            <p><strong>Full Name:</strong> {firstName || ''} {middleName || ''} {lastName || ''}</p>
            <p><strong>ID/Passport No.:</strong> {idNumber || 'Not provided'}</p>
            <p><strong>Gender:</strong> {gender || 'Not selected'}</p>
            <p><strong>Date of Birth:</strong> {dateOfBirth || 'Not provided'}</p>
            <p><strong>Marital Status:</strong> {maritalStatus || 'Not selected'}</p>
          </div>

          <div>
            <h3 className="font-semibold text-green-900 text-lg mb-2">Contact and Background</h3>
            <p><strong>Mobile Number:</strong> {phoneNumber || 'Not provided'}</p>
            <p><strong>Email Address:</strong> {email || 'Not provided'}</p>
            <p><strong>County:</strong> {county || 'Not selected'}</p>
            <p><strong>Sub County:</strong> {subCounty || 'Not selected'}</p>
            <p><strong>Occupation:</strong> {occupation || 'Not provided'}</p>
            <p><strong>Education:</strong> {education || 'Not selected'}</p>
          </div>

          <div>
            <h3 className="font-semibold text-green-900 text-lg mb-2">Emergency Contact</h3>
            <p><strong>Name:</strong> {emergencyName || 'Not provided'}</p>
            <p><strong>Relationship:</strong> {emergencyRelationship || 'Not selected'}</p>
            <p><strong>Phone:</strong> {emergencyPhone || 'Not provided'}</p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-green-600 text-green-700 hover:bg-green-50 transition"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmRegistrationModal;