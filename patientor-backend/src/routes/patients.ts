import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils/patientsUtil';
import { Entry, NewEntry, NewPatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAll());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getById(req.params.id);

  if (!patient)
    res.status(404).send({ error: 'Not found' });

  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const patient: NewPatient = toNewPatient(req.body);
    const created: Patient = patientsService.createPatient(patient);

    res.status(201).send(created);
  }
  catch (error) {
    res.status(400).send({ error: parseErrorMessage(error) });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const entry: NewEntry = toNewEntry(req.body);
    const created: Entry = patientsService.createPatientEntry(req.params.id, entry);

    res.status(201).send(created);
  }
  catch (error) {
    res.status(400).send({ error: parseErrorMessage(error) });
  }
});

const parseErrorMessage = (error: unknown): string =>
  error &&
  typeof error === 'object' &&
  'message' in error
    ? error.message as string
    : 'Something went wrong';

export default router;