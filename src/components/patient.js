import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'reactjs-simple-spinner';

import { getPatientDetails, getPatientConditions } from '../api/patientApi';
import PatientDetails from './patientDetails';
import PatientConditions from './patientConditions';
import '../css/patient.css';

class Patient extends Component {

    constructor() {
        super();

        this.state = {
            patient: {},
            conditions: [],
            loading: false
        };
    }

    renderPatientDetails(){
        const { loading, patient, conditions } = this.state;

        // Display loading graphic until we have patient details data
        if (loading) {
            return (
                <Spinner message="Loading..." />
            );
        } else {
            return (
                <div>
                    <PatientDetails patient={patient} />
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
        this.setState({ loading: true }, () => {
            axios.all([
                getPatientDetails(patientId),
                getPatientConditions(patientId)
            ]).then(axios.spread((patient, conditions) => {
                this.setState({
                    patient: {
                        name: patient.name,
                        gender: patient.gender,
                        birthDate: patient.birthDate
                    },
                    conditions: conditions,
                    loading: false
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
                <h1>Patient Directory</h1>
                <div className="patient-details-container">
                    <h2>Patient Details</h2>
                    {this.renderPatientDetails()}
                </div>
                <Link to='/' className="home-link">Back</Link>
            </div>
        )
    }
}

export default Patient;