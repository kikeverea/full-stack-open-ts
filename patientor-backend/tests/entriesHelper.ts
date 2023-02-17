import { HealthCheckRating, NewEntry } from '../src/types';

export const dummyBaseEntry = () => {
  return {
    date: 'Today',
    specialist: "Doctor Special",
    description: 'A test check',
    diagnosisCodes: ['A-9856', 'Z-5863', 'AD-8966']
  };
};

export const dummyHealthCheckEntry = (): NewEntry => {
  return {
    ...dummyBaseEntry(),
    type: 'HealthCheck',
    healthCheckRating: HealthCheckRating.LowRisk
  };
};

export const dummyOccupationalHealthcareEntry = (): NewEntry => {
  return {
    ...dummyBaseEntry(),
    type: 'OccupationalHealthcare',
    employerName: 'Test employer',
    sickLeave: {
      startDate: 'Today',
      endDate: 'Forever, I wish'
    }
  };
};

export const dummyHospitalEntry = (): NewEntry => {
  return {
    ...dummyBaseEntry(),
    type: 'Hospital',
    discharge: {
      date: 'Today',
      criteria: 'Not sick anymore'
    }
  };
};