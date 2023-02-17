import supertest from 'supertest';
import app from "../src/app";
const api = supertest(app);

import patientEntries from '../data/patientsEntries';
import { arePublicPatients, dummyNewPatient, isPatient } from './patientsHelper';
import { Patient } from '../src/types';
const baseUri = "/api/patients";

describe("get patients", () => {
  test("get all, returns public patients (no ssn and no entries)", async () => {
    const response = await api.get(baseUri).expect(200);
    const isPublicPatientArray = arePublicPatients(response.body);

    expect(isPublicPatientArray).toBe(true);
    expect(response.body).toHaveLength(patientEntries.length);
  });

  test("get by id returns full patient info", async () => {
    const allResponse = await api.get(baseUri).expect(200);
    const randomInd = Math.floor(Math.random() * allResponse.body.length);

    const randomPatient: Patient = allResponse.body[randomInd] as Patient;
    const response = await api.get(`${ baseUri }/${ randomPatient.id }`).expect(200);

    const patientInEntries = patientEntries[randomInd];

    expect(isPatient(response.body)).toBe(true);
    expect(response.body).toStrictEqual(patientInEntries);
  });
});

describe("post patients", () => {
  test("post new valid patient returns 201 and created patient", async () => {
    const toCreate = dummyNewPatient();
    const response = await api.post(baseUri).send(toCreate).expect(201);

    if (!('id' in response.body))
      fail('missing property: id');

    const patientInEntries = patientEntries.find(patient => patient.id === response.body.id);

    expect(isPatient(response.body)).toBe(true);
    expect(patientInEntries).toBeDefined();
    expect(isPatient(patientInEntries)).toBe(true);
    expect(patientInEntries).toStrictEqual(response.body);
  });

  test("fails with 400 if missing any required properties", async () => {
    const required = ["name", "dateOfBirth", "ssn", "gender", "occupation"];

    type Iterable = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any
    };

    for (const param of required) {
      const toCreate = dummyNewPatient() as Iterable;
      delete toCreate[param];
      const response = await api.post(baseUri).send(toCreate).expect(400);
      expect(response.body.error).toBeDefined();
    }
  });

  test("fails with 400 if not valid gender is provided", async () => {
    const toCreate = {
      ...dummyNewPatient(),
      gender: "Apache Helicopter"
    };

    const response = await api.post(baseUri).send(toCreate).expect(400);
    expect(response.body.error).toBeDefined();
  });
});