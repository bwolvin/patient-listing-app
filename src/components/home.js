import React, { Component } from 'react';
import { getPatients } from '../api/patientApi';

class Home extends Component {

    constructor() {
        super();

        // Set initial state for patients listing dropdown
        this.state = {
            patients: []
        };
    }

    componentDidMount() {
        this.setState({ 
            patients: getPatients()
        });
    }

    handleOnChange(event) {
        const patientId = event.target.value;
        this.props.history.push(`/patient/${patientId}`);
    }

    render() {
        return (
            <div>
                <h1>Patient Directory</h1>
                <h2>Select a patient</h2>
                <select onChange={ this.handleOnChange.bind(this) }>
                    <option defaultValue="Choose a patient">Choose a patient</option>
                    {
                        this.state.patients.map(patient => (
                            <option key={patient.id} value={patient.id} >
                                {patient.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        )
    }
}

export default Home;