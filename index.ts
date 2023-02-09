import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { BMI, TrainingSummary } from "./calculatorsTypes";
import { calculateExercises, validateExerciseCalculatorInput } from "./exerciseCalculator";
import { toNumberArray, toNumber } from "./helpers/numberParser";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = toNumber(req.query.height);
  const weight: number = toNumber(req.query.weight);

  try {
    const summary: BMI = {
      weight,
      height,
      bmi: calculateBmi(height, weight)
    };

    res.json(summary);
  }
  catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: error.message });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    validateExerciseCalculatorInput(daily_exercises, target);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const dailyExercisesNumbers: number[] = toNumberArray(daily_exercises);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const targetNumber = toNumber(target);

    const summary: TrainingSummary = calculateExercises(dailyExercisesNumbers, targetNumber);

    res.json(summary);
  }
  catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: error.message });
  }

});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`);
});