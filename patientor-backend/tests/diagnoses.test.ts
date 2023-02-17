import supertest from 'supertest';
import app from "../src/app";
const api = supertest(app);

import diagnoses from '../data/diagnosesEntries';

const baseUri = "/api/diagnoses";

describe('get diagnoses', () => {
  test('get all diagnoses returns correct format and number of diagnoses', async () => {
    const response = await api.get(baseUri).expect(200);

    const isDiagnosisArray = areDiagnoses(response.body);

    expect(response.body).toBeDefined();
    expect(response.body).toHaveLength(diagnoses.length);
    expect(isDiagnosisArray).toBe(true);
  });
});

const areDiagnoses = (array: unknown): boolean => {
  if (!array || !Array.isArray(array))
    return false;

  for (const diagnosis of array)
    if (!isDiagnosis(diagnosis))
      return false;

  return true;
};

const isDiagnosis = (obj: unknown): boolean => {
  if (!obj || typeof obj !== 'object')
    return false;

  return 'name' in obj && 'code' in obj;
};