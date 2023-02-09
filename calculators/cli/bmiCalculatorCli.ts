import { calculateBmi } from "../bmiCalculator";

const height: number = parseInt(process.argv[2]);
const weight: number = parseInt(process.argv[3]);

console.log(calculateBmi(height, weight));
