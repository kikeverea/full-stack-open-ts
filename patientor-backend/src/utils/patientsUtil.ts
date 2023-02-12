import { NewPatient } from "../types";
import { parseDate, parseGender, parseString } from "./parsers";

export const toNewPatient = (params: unknown): NewPatient => {
  if (!params || typeof params !== 'object')
    throw new Error('Incorrect or missing data');

  if('name' in params &&
    'dateOfBirth' in params &&
    'ssn' in params &&
    'gender' in params &&
    'occupation' in params)
  {
    return {
      name: parseString(params.name, 'name'),
      dateOfBirth: parseDate(params.dateOfBirth, 'date'),
      ssn: parseString(params.ssn, 'ssn'),
      gender: parseGender(params.gender, 'gender'),
      occupation: parseString(params.occupation, 'occupation'),
      entries: []
    };
  }
  else
    throw new Error('Incorrect data: some fields are missing');
};