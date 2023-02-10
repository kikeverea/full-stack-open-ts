import patients from "../../data/patients";
import { Patient } from "../types";

const getAll = (): Omit<Patient, 'ssn'>[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id, name, dateOfBirth, gender, occupation
    };
  });

export default {
  getAll
};