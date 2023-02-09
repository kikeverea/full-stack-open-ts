import {
  calculateExercises,
  formatHours,
  validateExerciseCalculatorInput
}
from "../exerciseCalculator";

const hoursLog: number[] = process.argv
  .slice(2, process.argv.length - 1)
  .map((input: string) => Number(input));

const dailyTarget = Number(process.argv[process.argv.length - 1]);

try {
  validateExerciseCalculatorInput(hoursLog, dailyTarget);
  console.log('Your summary for this period:', formatHours(hoursLog));
  console.log('With target:', Number.isNaN(dailyTarget) ? 0 : dailyTarget);
  console.log(calculateExercises(hoursLog, dailyTarget));
}
catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(`Could not create summary. ${ error.message }\n`);
}