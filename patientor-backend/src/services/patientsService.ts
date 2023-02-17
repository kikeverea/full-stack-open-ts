import { v1 as uuid } from 'uuid';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from "../types";
import patientsEntries from '../../data/patientsEntries';

const patients = patientsEntries;

const getAll = (): PublicPatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return {
      id, name, dateOfBirth, gender, occupation, entries
    };
  });

const getById = (id: string): Patient | undefined =>
  patients.find((patient: Patient) => patient.id === id);

const createPatient = (newPatient: NewPatient): Patient => {
  const created: Patient = {
    id: uuid(),
    ...newPatient
  };

  patients.push(created);
  return created;
};

const createPatientEntry = (patientId: string, newEntry: NewEntry): Entry => {
  const created = {
    id: uuid(),
    ...newEntry
  };

  const patient: Patient | undefined = patients.find((patient: Patient) => patient.id === patientId);

  if(patient)
    patient.entries.push(created);

  return created;
};

export default {
  getAll,
  getById,
  createPatient,
  createPatientEntry
};