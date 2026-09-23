import { LightningElement, api, wire } from 'lwc';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
import {getRelatedListRecords} from 'lightning/uiRelatedListApi';
import NAME_FIELD from '@salesforce/schema/Patient__c.Name';
import UHID_FIELD from '@salesforce/schema/Patient__c.UHID__c';
import AGE_FIELD from '@salesforce/schema/Patient__c.Age__c';
import GENDER_FIELD from '@salesforce/schema/Patient__c.Gender__c';
import BLOOD_GROUP_FIELD from '@salesforce/schema/Patient__c.Blood_Group__c';
import REGISTRATION_DATE_FIELD from '@salesforce/schema/Patient__c.Registration_Date__c';
import STATUS_FIELD from '@salesforce/schema/Patient__c.Status__c';
import DOCTOR_NAME_FIELD from '@salesforce/schema/Patient__c.Treating_Doctor__r.Doctor_Name__c';
import HOSPITAL_NAME_FIELD from '@salesforce/schema/Patient__c.Hospital_Name__r.Hospital_Name__c';
const PATIENT_FIELDS = [
    NAME_FIELD,
    UHID_FIELD,
    AGE_FIELD,
    GENDER_FIELD,
    BLOOD_GROUP_FIELD,
    REGISTRATION_DATE_FIELD,
    STATUS_FIELD,
    DOCTOR_NAME_FIELD,
    HOSPITAL_NAME_FIELD
];
export default class PatientSummaryCard extends LightningElement {
    @api recordId;
    patientName;
    uhid;
    age;
    gender;
    bloodGroup;
    registrationDate;
    status;
    doctorName;
    hospitalName;
    appointmentNo;
    appointmentDate;
    diagnosis;
    @wire(getRecord, {
        recordId: '$recordId',
        fields: PATIENT_FIELDS
    })
    wiredPatient({ data, error }) {
        if (data) {
            this.patientName =getFieldValue(data,NAME_FIELD);
            this.uhid =getFieldValue(data,UHID_FIELD);
            this.age = getFieldValue(data,AGE_FIELD);
            this.gender = getFieldValue(data,GENDER_FIELD);
            this.bloodGroup = getFieldValue(data,BLOOD_GROUP_FIELD);
            this.registrationDate = getFieldValue(data,REGISTRATION_DATE_FIELD);
            this.status =getFieldValue(data,STATUS_FIELD);
            this.doctorName =getFieldValue(data,DOCTOR_NAME_FIELD);
            this.hospitalName =getFieldValue(data,HOSPITAL_NAME_FIELD);
        }

        else if (error) {

            console.error('Error loading Patient:',error);
        }
    }
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',

        relatedListId: 'Patient_Appointments__r',

        fields: ['Appointment__c.Name','Appointment__c.Appointment_Date__c'],
    })
    wiredAppointments({ data, error }) {

        if (data) {
            console.log('Appointment data:',data);


            if (data.records.length > 0) {

                const appointment = data.records[0];
                this.appointmentNo =appointment.fields.Name.value;
                this.appointmentDate =appointment.fields.Appointment_Date__c.value;
            }
        }

        else if (error) {console.error('Error loading Appointment:',error);}

    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Encounters__r',

        fields: ['Encounter__c.Diagnosis_Code__c'],
    })
    wiredEncounters({ data, error }) {

        if (data) {
            console.log('Encounter data:',data);
            if (data.records.length > 0) {

                const encounter =data.records[0];
                this.diagnosis =encounter.fields.Diagnosis_Code__c.value;
            }
        }

        else if (error) {
            console.error('Error loading Encounter:',error);
        }

    }

}