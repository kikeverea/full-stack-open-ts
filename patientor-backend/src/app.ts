import express from 'express';
import cors from 'cors';

const app = express();

import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

export default app;