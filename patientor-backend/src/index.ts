import express from 'express';
import cors from 'cors';

const app = express();

import diagnosesRouter from './routes/diagnoses';

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});
