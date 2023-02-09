export const calculateBmi = (height: number, weight: number): string => {

  if (Number.isNaN(height) || Number.isNaN(weight) ||
      height < 1 || weight < 1)
  {
    throw new Error('Values must be positive numbers')
  }

  const bmi : number = roundToOneDecimal(weight / Math.pow(height/100, 2))
  return determineCategory(bmi)
}

const roundToOneDecimal = (num: number): number =>
  Math.round(num * 100 + Number.EPSILON) / 100

export const determineCategory = (bmi: number): string => {

  const bmiInRange = (bottom: number, top: number): boolean =>
    bottom <= bmi && bmi < top

  if (bmiInRange(0, 16.0))
    return 'Underweight (Severe thinness)'

  else if (bmiInRange(16.0, 17.0))
    return 'Underweight (Moderate thinness)'

  else if (bmiInRange(17.0, 18.5))
    return 'Underweight (Mild thinness)'

  else if (bmiInRange(18.5, 25))
    return 'Normal range'

  else if (bmiInRange(25.0, 30.0))
    return 'Overweight (Pre-obese)'

  else if (bmiInRange(30.0, 35.0))
    return "Obese (Class I)"

  else if (bmiInRange(35.0, 40.0))
    return 'Obese (Class II)'

  else // >= 40
    return 'Obese (Class III)'

}

const height: number = parseInt(process.argv[2])
const weight: number = parseInt(process.argv[3])

console.log(calculateBmi(height, weight))

// Underweight (Severe thinness)	< 16.0
// Underweight (Moderate thinness)	16.0 – 16.9
// Underweight (Mild thinness)	17.0 – 18.4
// Normal range	18.5 – 24.9
// Overweight (Pre-obese)	25.0 – 29.9
// Obese (Class I)	30.0 – 34.9
// Obese (Class II)	35.0 – 39.9
// Obese (Class III)	≥ 40.0