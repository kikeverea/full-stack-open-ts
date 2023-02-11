import patients from "../../data/patientsEntries";
import { v1 as uuid } from 'uuid';
import { NewPatient, Patient } from "../types";

const getAll = (): Omit<Patient, 'ssn'>[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id, name, dateOfBirth, gender, occupation
    };
  });

const createPatient = (newPatient: NewPatient): Patient => {
  return {
    id: uuid(),
    ...newPatient
  };
};

export default {
  getAll,
  createPatient
};