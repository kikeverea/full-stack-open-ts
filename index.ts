import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

type BMI = {
  weight: number,
  height: number,
  bmi: string
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = parseInt(req.query.height as string);
  const weight: number = parseInt(req.query.weight as string);

  try {
    const summary: BMI = {
      weight,
      height,
      bmi: calculateBmi(height, weight)
    };

    res.json(summary);
  }
  catch (error) {
    res.status(400).json({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      error: error.message
    });
  }
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});