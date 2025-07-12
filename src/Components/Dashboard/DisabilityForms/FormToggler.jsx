import React from 'react';
import ChronicDisorders from './ChronicDisorders';
import VisualImpairments from './VisualImpairements';
import SpeechImparements from './SpeechImparements';
import PhysicalDisability from './PhysicalDisability';
import MentalImparements from './MentalImparements';
import MaxillofacialImparements from './MaxillofacialImparements';
import HearingImparements from './HearingImparements';

// Assume these components exist and represent the actual forms
// import ChronicDisorders from './forms/ChronicDisorders';
// import VisualImpairments from './forms/VisualImpairments';
// ... and so on for all your forms

const FormToggler = ({ selectedCategory ,userData,onSubmissionSuccess, handleBackFromPwdProfile}) => {
  const renderForm = () => {
    switch (selectedCategory) {
      case "VISUAL IMPAIRMENTS":
        return <VisualImpairments userData={userData} onSubmissionSuccess={onSubmissionSuccess} handleBackFromPwdProfile={handleBackFromPwdProfile} />;
      case "HEARING IMPAIRMENTS":
        return <HearingImparements userData={userData} onSubmissionSuccess={onSubmissionSuccess} handleBackFromPwdProfile={handleBackFromPwdProfile} />;
      case "SPEECH, LANGUAGE, COMMUNICATION AND SWALLOWING DISABILITIES":
        return <SpeechImparements userData={userData} onSubmissionSuccess={onSubmissionSuccess} handleBackFromPwdProfile={handleBackFromPwdProfile} />;
      case "MENTAL/ INTELLECTUAL/ AUTISM SPECTRUM DISORDERS":
        return <MentalImparements userData={userData} onSubmissionSuccess={onSubmissionSuccess} handleBackFromPwdProfile={handleBackFromPwdProfile} />;
      case "MAXILLOFACIAL DISABILITIES":
        return <MaxillofacialImparements userData={userData} onSubmissionSuccess={onSubmissionSuccess} handleBackFromPwdProfile={handleBackFromPwdProfile} />;
      case "PROGRESSIVE CHRONIC DISORDERS":
        return <ChronicDisorders userData={userData} onSubmissionSuccess={onSubmissionSuccess} handleBackFromPwdProfile={handleBackFromPwdProfile} />;
      case "PHYSICAL DISABILITIES":
        return <PhysicalDisability userData={userData} onSubmissionSuccess={onSubmissionSuccess} handleBackFromPwdProfile={handleBackFromPwdProfile} />;
      default:
        return <p>Please select a disability category to view the form.</p>;
    }
  };

  return (
    <div className="form-toggler-container">
      {renderForm()}
    </div>
  );
};

export default FormToggler;