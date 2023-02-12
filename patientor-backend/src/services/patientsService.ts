import patients from "../../data/patientsEntries";
import { v1 as uuid } from 'uuid';
import { NewPatient, Patient, PublicPatient } from "../types";

const getAll = (): PublicPatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id, name, dateOfBirth, gender, occupation
    };
  });

const getById = (id: string): Patient | undefined =>
  patients.find((patient: Patient) => patient.id === id);

const createPatient = (newPatient: NewPatient): Patient => {
  return {
    id: uuid(),
    ...newPatient
  };
};

export default {
  getAll,
  getById,
  createPatient
};