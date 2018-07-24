
import axios from 'axios';
import { patientData } from '../data/patients';

const baseUrl = 'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/';

/**
 * Get sample set of patients
 * @returns {array} list of test patient data
*/
export function getPatients() {
    return patientData;
}

/**
 * Get details for a given patient id
 * @param  {string} patientId id of selected patient
 * @returns {object} Promise from from axios request
*/
export function getPatientDetails(patientId) {
    const patientRequestUrl = `${baseUrl}Patient?_id=${patientId}`;
    return axios.get(patientRequestUrl)
    .then(res => {
        const patient = res.data.entry[0].resource;
        return {
            name: patient.name[0].text,
            gender: patient.gender,
            birthDate: patient.birthDate
        }
    });
}

/**
 * Get active conditions for a given patient id
 * @param  {string} patientId id of selected patient
 * @returns {object} Promise from from axios request
*/
export function getPatientConditions(patientId) {
    const patientConditionsRequestUrl = `${baseUrl}Condition?patient=${patientId}&clinicalstatus=active`;
    return axios.get(patientConditionsRequestUrl)
    .then(res => {
        /**
         * Slim down list of conditions to only return 
         * what items are needed for the app to reduce size
         * of data that is being stored
        */
        const conditions = res.data.entry;
        return conditions.map(condition => {
            return {
                code: condition.resource.code,
                dateRecorded: condition.resource.dateRecorded
            };
        });
    });
}
  