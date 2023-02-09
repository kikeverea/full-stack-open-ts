export type TrainingSummary = {
  periodLength: number,
  trainingDays: number,
  target: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  average: number
};

export type BMI = {
  weight: number,
  height: number,
  bmi: string
};
