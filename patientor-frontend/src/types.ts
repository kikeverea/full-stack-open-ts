export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

interface BaseEntry {
  id: string;
  date: string;
  type: EntryType;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck,
  healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: {
    date: string;
    criteria: string;
  },
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck"
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, "id">;
