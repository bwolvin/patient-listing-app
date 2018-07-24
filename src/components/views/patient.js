import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            isLoading: false
        };
    }

    renderPatientDetails(){
        const { isLoading, patient, conditions } = this.state;

        // Display loading graphic until we have patient details data
        if (isLoading) {
            return (
                <Spinner message="Loading..." />
            );
        } else {
            return (
                <div>
                    <h3>{patient.name}</h3>
                    <PatientDemographics patient={patient} />
                    <PatientConditions conditions={conditions} />
                </div>
            );
        }
    }

    componentDidMount() {
        /**
         * Get patient details and conditions and set initial
         * state after both api requests have resolved
        */
        const patientId = this.props.match.params.id;
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
            .catch(function(error) {
                console.log(error);
            });
        });
    }

    render() {
        return (
            <div className="patient-details"> 
                <div className="patient-details-container">
                    {this.renderPatientDetails()}
                </div>
                <Link to='/' className="home-link">Back</Link>
            </div>
        );
    }
}

export default Patient;