import { calculateBmi, determineCategory} from "../bmiCalculator";

test('test BMI categories limits', () => {

  const testCategory = (bottom: number, top: number, expectedCategory: string) => {
    expect(determineCategory(bottom - 0.1)).not.toBe(expectedCategory);
    expect(determineCategory(bottom)).toBe(expectedCategory);
    expect(determineCategory(bottom + 0.1)).toBe(expectedCategory);

    if (top) {
      expect(determineCategory(top - 0.1)).toBe(expectedCategory);
      expect(determineCategory(top)).not.toBe(expectedCategory); // top limit not included
      expect(determineCategory(top + 0.1)).not.toBe(expectedCategory);
    }
  };

  testCategory(0, 16, 'Underweight (Severe thinness)');
  testCategory(16, 17, 'Underweight (Moderate thinness)');
  testCategory(17, 18.5, 'Underweight (Mild thinness)');
  testCategory(18.5, 25, 'Normal range');
  testCategory(25, 30, 'Overweight (Pre-obese)');
  testCategory(30, 35, 'Obese (Class I)');
  testCategory(35, 40, 'Obese (Class II)');
  testCategory(40, NaN, 'Obese (Class III)');
});

test('invalid input throws error', () => {
  const message = 'Values must be positive numbers';

  expect(() => calculateBmi(-1, 100)).toThrowError(message);
  expect(() => calculateBmi(100, -1)).toThrowError(message);
  expect(() => calculateBmi(-1, -1)).toThrowError(message);

  expect(() => calculateBmi(NaN, -1)).toThrowError(message);
  expect(() => calculateBmi(-1, NaN)).toThrowError(message);
  expect(() => calculateBmi(NaN, NaN)).toThrowError(message);
});


