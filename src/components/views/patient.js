import axios from 'axios';
import React, { Component } from 'react';
import Spinner from 'reactjs-simple-spinner';
import { 
    getDemographicsForPatient, 
    getActiveConditionsForPatient 
} from '../../api/patientApi';
import PatientDemographics from '../patient/demographics';
import PatientConditions from '../patient/conditions';
import '../../css/patient.css';

class Patient extends Component {

    constructor() {
        super();

        this.state = {
            patient: {},
            conditions: [],
            isLoading: false,
            errorMessage: ""
        };
    }

    renderPatientDetails(){
        const { isLoading, patient, conditions, errorMessage } = this.state;

        // Display loading graphic until we have patient details data
        if (isLoading) {
            return (
                <Spinner message="Loading..." />
            );
        } else if (errorMessage) {
            return (
                <div>{errorMessage}</div>
            );
        } else {
            return (
                <div>
                    <div className="patient-details">
                        <h3 className="patient-details-header">{patient.name}</h3>
                        <PatientDemographics patient={patient} />
                    </div>
                    <PatientConditions conditions={conditions} />
                </div>
            );
        }
    }

    componentDidMount() {
        // Get patient id from param in route
        const patientId = this.props.match.params.id;

        /**
         * Get patient details and conditions and set initial
         * state after both api requests have resolved
        */
        this.setState({ isLoading: true }, () => {
            axios.all([
                getDemographicsForPatient(patientId),
                getActiveConditionsForPatient(patientId)
            ]).then(axios.spread((patient, conditions) => {
                this.setState({
                    patient: {
                        name: patient.name,
                        gender: patient.gender,
                        birthDate: patient.birthDate
                    },
                    conditions: conditions,
                    isLoading: false
                });
            }))
            .catch((error) => {
                this.setState({
                    errorMessage: error.message,
                    isLoading: false
                });
            });
        });
    }

    render() {
        return (
            <div className="patient-listing"> 
                <div className="patient-details-container">
                    {this.renderPatientDetails()}
                </div>
            </div>
        );
    }
}

export default Patient;
