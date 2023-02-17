import supertest from 'supertest';
import app from "../src/app";
const api = supertest(app);

import patientEntries from '../data/patientsEntries';
import {
  dummyBaseEntry,
  dummyHealthCheckEntry,
  dummyHospitalEntry,
  dummyOccupationalHealthcareEntry
} from './entriesHelper';
import { isEntry } from './patientsHelper';
import { NewEntry, Patient } from '../src/types';

const baseUri = "/api/patients";

let patient: Patient;

beforeEach(() => {
  const randomInd = Math.floor(Math.random() * patientEntries.length);
  patient = patientEntries[randomInd];
});

describe('creating any entry', () => {
  test('post entry with invalid type, fails with 400', async () => {
    const toCreate = dummyBaseEntry();

    const invalid = {
      ...toCreate,
      type: 'Invalid type'
    };

    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(invalid).expect(400);
    expect(response.body.error).toEqual('Invalid type: Invalid type');
  });
});

describe("creating health check entries", () => {
  test("post new valid health check entry, returns 201 and created entry", async () => {
    const toCreate = dummyHealthCheckEntry();
    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(toCreate).expect(201);

    assertNewEntryCreated(response.body);
  });

  test("post new health check entry without rating, fails with 400", async () => {
    const toCreate: NewEntry = dummyHealthCheckEntry();

    if (!('healthCheckRating' in toCreate))
      throw new Error('Missing healthCheckRating');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete toCreate.healthCheckRating;

    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(toCreate).expect(400);

    expect(response.body.error).toBeDefined();
  });
});

describe('creating occupational healthcare entries', () => {
  test("post new valid occupational healthcare entry, returns 201 and created entry", async () => {
    const toCreate = dummyOccupationalHealthcareEntry();
    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(toCreate).expect(201);

    assertNewEntryCreated(response.body);
  });

  test("post new occupational healthcare entry without employer name, fails with 400", async () => {
    const toCreate: NewEntry = dummyOccupationalHealthcareEntry();

    if (!('employerName' in toCreate))
      throw new Error('Missing employerName');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete toCreate.employerName;

    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(toCreate).expect(400);
    expect(response.body.error).toBeDefined();
  });

  test("post new occupational healthcare entry with invalid sick leave, fails with 400", async () => {
    const toCreate: NewEntry = dummyOccupationalHealthcareEntry();

    const invalid = {
      ...toCreate,
      sickLeave: {
        startDate: "Something",
      }
    };

    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(invalid).expect(400);
    expect(response.body.error).toBeDefined();
  });
});

describe('creating hospital entries', () => {
  test("post new valid hospital entry, returns 201 and created entry", async () => {
    const toCreate = dummyHospitalEntry();
    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(toCreate).expect(201);

    assertNewEntryCreated(response.body);
  });

  test("post new hospital entry without discharge, fails with 400", async () => {
    const toCreate: NewEntry = dummyHospitalEntry();

    if (!('discharge' in toCreate))
      throw new Error('Missing discharge');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete toCreate.discharge;

    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(toCreate).expect(400);
    expect(response.body.error).toBeDefined();
  });

  test("post new occupational healthcare entry with invalid discharge, fails with 400", async () => {
    const toCreate: NewEntry = dummyHospitalEntry();

    const invalid = {
      ...toCreate,
      discharge: {
        date: "Something"
      }
    };

    const response = await api.post(`${ baseUri }/${ patient.id }/entries`).send(invalid).expect(400);
    expect(response.body.error).toBeDefined();
  });
});



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const assertNewEntryCreated = (newEntry: any) => {
  if (!newEntry || typeof newEntry !== 'object')
    fail('missing or wrong format');

  if (!('id' in newEntry))
    fail('missing property: id');

  const patientInEntries = patientEntries.find(inEntries => inEntries.id === patient.id) as Patient;
  const entryInPatient = patientInEntries.entries.find(entry => entry.id === newEntry.id);

  expect(isEntry(newEntry)).toBe(true);
  expect(entryInPatient).toBeDefined();
  expect(isEntry(entryInPatient)).toBe(true);
  expect(entryInPatient).toStrictEqual(newEntry);
};