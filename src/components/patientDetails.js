import React from 'react';
import '../css/patient.css';

const PatientDetails = (props) => {
    return (
        <div className="patient-details-meta">
            <p>Name: {props.patient.name}</p>
            <p>Gender: {props.patient.gender}</p>
            <p>Date of Birth: {props.patient.birthDate}</p>
        </div>
    );
}
  
  export default PatientDetails;