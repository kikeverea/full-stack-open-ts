import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils/patientsUtil';
import { NewPatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getAll());
});

router.post('/', (req, res) => {
  try {
    const patient: NewPatient = toNewPatient(req.body);
    const created: Patient = patientsService.createPatient(patient);

    res.send(created);
  }
  catch (error) {
    res.status(404).json({ error: parseErrorMessage(error) });
  }
});

const parseErrorMessage = (error: unknown): string =>
  error &&
  typeof error === 'object' &&
  'message' in error
    ? error.message as string
    : 'Something went wrong';

export default router;