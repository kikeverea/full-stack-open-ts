import { Entry, Gender, NewPatient, Patient, PublicPatient } from '../src/types';

export const dummyNewPatient = (): NewPatient => {
  return {
    'name': 'new patient',
    'dateOfBirth': '10/02/2023',
    'ssn': '25698542N',
    'gender': Gender.Male,
    'occupation': 'gypsy',
    entries: []
  };
};

export const arePublicPatients = (array: unknown): array is Patient[] => {
  if (!array || !Array.isArray(array))
    return false;

  for (const patient of array)
    if (!isPublicPatient(patient))
      return false;

  return true;
};

export const isPatient = (params: unknown): params is Patient => {
  if (!params || typeof params !== 'object')
    return false;

  return hasKeys<Patient>(params, patientKeys) && hasPatientTypes(params);
};

export const isPublicPatient = (params: unknown): params is PublicPatient => {
  if (!params || typeof params !== 'object')
    return false;

  return hasKeys<PublicPatient>(params, publicPatientKeys) && hasPublicPatientTypes(params);
};

const hasKeys = <T extends object>(params: object, keys: string[]): params is T => {
  for (const key of keys)
    if (!(key in params))
      return false;

  return true;
};

const patientKeys: string[] = [
  'id',
  'name',
  'dateOfBirth',
  'ssn',
  'gender',
  'occupation',
  'entries'
];

const publicPatientKeys = [
  'id',
  'name',
  'dateOfBirth',
  'gender',
  'occupation'
];

const hasPatientTypes = (patient: Patient): patient is Patient => {
  return (
    isString(patient.id) &&
    isString(patient.name) &&
    isString(patient.dateOfBirth) &&
    isString(patient.ssn) &&
    isGender(patient.gender) &&
    isString(patient.occupation) &&
    areEntries(patient.entries)
  );
};

const hasPublicPatientTypes = (patient: PublicPatient): patient is PublicPatient => {
  return (
    isString(patient.id) &&
    isString(patient.name) &&
    isString(patient.dateOfBirth) &&
    isGender(patient.gender) &&
    isString(patient.occupation)
  );
};

const isString = (param: unknown): param is string =>
  typeof param === 'string' || param instanceof String;

const isGender = (param: unknown): param is Gender => {
  const found = Object.values(Gender).find(gender => gender === param);
  return found !== undefined && found !== null;
};

export const areEntries = (array: unknown[]): array is Entry[] => {
  for (const entry of array)
    if (!isEntry(entry))
      return false;

  return true;
};

export const isEntry = (params: unknown): params is Entry => {
  if (!params || typeof params !== 'object')
    return false;

  return hasEntryKeys(params) && hasEntryTypes(params);
};

const hasEntryKeys = (params: object): params is Entry => {
  return (
    'id' in params &&
    'date' in params &&
    'specialist' in params &&
    'description' in params &&
    'type' in params
  );
};

const hasEntryTypes = (params: Entry): boolean => {
  return (
    isString(params.id) &&
    isString(params.date) &&
    isString(params.specialist) &&
    isString(params.description) &&
    isString(params.type) &&
    isEntryType(params.type)
  );
};

const isEntryType = (param: string): boolean =>
  param === 'Hospital' ||
  param === 'HealthCheck' ||
  param === 'OccupationalHealthcare';