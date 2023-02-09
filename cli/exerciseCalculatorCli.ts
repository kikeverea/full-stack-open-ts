import { calculateExercises, formatHours } from "../exerciseCalculator";

const hoursLog: number[] = process.argv
  .slice(2, process.argv.length - 1)
  .map((input: string) => parseInt(input))

const dailyTarget = parseInt(process.argv[process.argv.length - 1])

try {
  console.log('Your summary for this period:', formatHours(hoursLog))
  console.log('With target:', Number.isNaN(dailyTarget) ? 0 : dailyTarget)
  console.log(calculateExercises(hoursLog, dailyTarget))
}
catch (error) {
  console.log(`Could not create summary. ${ error.message }\n`)
}