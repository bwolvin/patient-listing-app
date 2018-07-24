import React from 'react';
import '../../css/patient.css';

const PatientDemographics = (props) => {
    return (
        <div className="patient-demographics">
            <p>Gender: {props.patient.gender}</p>
            <p>Date of Birth: {props.patient.birthDate}</p>
        </div>
    );
}
  
export default PatientDemographics;