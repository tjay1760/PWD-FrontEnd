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

const FormToggler = ({ selectedCategory }) => {
  const renderForm = () => {
    switch (selectedCategory) {
      case "VISUAL IMPAIRMENTS":
        return <VisualImpairments />;
      case "HEARING IMPAIRMENTS":
        return <HearingImparements/>
      case "SPEECH, LANGUAGE, COMMUNICATION AND SWALLOWING DISABILITIES":
        return <SpeechImparements/>
      case "MENTAL/ INTELLECTUAL/ AUTISM SPECTRUM DISORDERS":
        return <MentalImparements />;
      case "MAXILLOFACIAL DISABILITIES":
        return <MaxillofacialImparements/>
      case "PROGRESSIVE CHRONIC DISORDERS":
        return <ChronicDisorders />;
      case "PHYSICAL DISABILITIES":
        return <PhysicalDisability />;
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