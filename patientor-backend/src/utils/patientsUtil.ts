import { HealthCheckRating, NewPatient, NewEntry } from '../types';
import { parseDate, parseGender, parseNumber, parseString } from './parsers';

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

type BaseEntryParams = {
  date: string,
  specialist: string,
  description: string,
  type: string;
  diagnosisCodes?: string[];
};

export const toNewEntry = (params: unknown): NewEntry => {
  if (!params || typeof params !== 'object')
    throw new Error('Incorrect or missing data');

  if (!('type' in params))
    throw new Error('Entry type missing');

  switch (parseString(params.type, 'type')) {
    case 'HealthCheck':
      return parseHealthCheckEntry(params);
    case 'Hospital':
      return parseHospitalEntry(params);
    case 'OccupationalHealthcare':
      return parseOccupationalHealthCareEntry(params);
    default:
      throw new Error(`Invalid type: ${ params.type }`);
  }
};

const parseBaseEntry = (params: object): BaseEntryParams => {
  if (
    'date' in params &&
    'specialist' in params &&
    'description' in params &&
    'type' in params
  )
  {
    const entry = {
      date: parseString(params.date, 'date'),
      specialist: parseString(params.specialist, 'specialist'),
      description: parseString(params.description, 'description'),
      type: parseString(params.type, 'type')
    };

    return 'diagnosisCodes' in params
      ?
      {
        ...entry,
        diagnosisCodes: parseDiagnosisCodes(params.diagnosisCodes)
      }
      : entry;

  }
  else
    throw new Error('Incorrect data: some fields are missing');
};

const parseHealthCheckEntry = (params: object): NewEntry => {
  if (!('healthCheckRating' in params))
    throw new Error('Incorrect data: some fields are missing');

  return {
    ...parseBaseEntry(params),
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(params.healthCheckRating)
  };
};

const parseHospitalEntry = (params: object): NewEntry => {
  if (!('discharge' in params))
    throw new Error('Incorrect data: some fields are missing');

  return {
    ...parseBaseEntry(params),
    type: "Hospital",
    discharge: parseDischarge(params.discharge)
  };
};

const parseOccupationalHealthCareEntry = (params: object): NewEntry => {
  if (!('employerName' in params))
    throw new Error('Incorrect data: some fields are missing');

  const entry = {
    ...parseBaseEntry(params),
    employerName: parseString(params.employerName, 'employer name')
  };

  return 'sickLeave' in params
    ? {
      ...entry,
      type: 'OccupationalHealthcare',
      sickLeave: parseSickLeave(params.sickLeave)
    }
    :
    { ...entry, type: 'OccupationalHealthcare' };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating =>{

  if (Object.values(HealthCheckRating).includes(parseNumber(rating, 'health check rating')))
    return rating as HealthCheckRating;

  else throw new Error('Invalid health check rating');
};

const parseDischarge = (params: unknown): { date: string, criteria: string } => {
  if (!params || typeof params !== 'object')
    throw new Error('Incorrect or missing data');

  if ('date' in params && 'criteria' in params) {
    return {
      date: parseString(params.date, 'discharge date'),
      criteria: parseString(params.criteria, 'discharge criteria')
    };
  }
  else
    throw new Error('Incorrect data: some fields are missing');
};

const parseSickLeave = (params: unknown): { startDate: string, endDate: string } => {
  if (!params || typeof params !== 'object')
    throw new Error('Incorrect or missing data');

  if ('startDate' in params && 'endDate' in params) {
    return {
      startDate: parseString(params.startDate, 'sick leave start date'),
      endDate: parseString(params.endDate, 'sick leave end date')
    };
  }
  else
    throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (params: unknown): string[] => {
  if (!params || !Array.isArray(params))
    throw new Error('Incorrect or missing data');

  const codes = [];
  for (const value of params)
    codes.push(parseString(value, 'diagnosis codes'));

  return codes;
};