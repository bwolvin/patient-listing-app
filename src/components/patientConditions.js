import React, { Component } from 'react';
import ReactTable from 'react-table';
import dateFormat from 'dateformat';
import 'react-table/react-table.css'
import '../css/patient.css';

class PatientConditions extends Component {

    render() {

        const pubMedUrl = 'https://www.ncbi.nlm.nih.gov/pubmed/?term='

        const columns = [{
            Header: 'Date Recorded',
            accessor: 'dateRecorded',
            Cell: props => (
                <span>{dateFormat(props.value, "mmmm dS, yyyy")}</span>
            )
        }, {
            id: 'conditionName',
            Header: 'Name',
            accessor: d => d.code.text,
            Cell: props => (
                <a href={`${pubMedUrl}${props.value}`} target="_blank">{props.value}</a>
            )
        }];

        return (
            <div className="patient-conditions-table">
                <ReactTable
                    data={this.props.conditions}
                    showPageSizeOptions={false}
                    columns={columns} />
            </div>
        );
    }
}
  
  export default PatientConditions;