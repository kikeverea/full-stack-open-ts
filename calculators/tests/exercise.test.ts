import { calculateExercises, calculateRating, ratingDescription, ExerciseSummary } from '../exerciseCalculator';

test('given an array of daily exercise hours and a target daily exercise amount, create summary', () => {
  const dailyLog = [3, 0, 2, 4.5, 0, 3, 1];
  const dailyTarget = 2;

  const summary : ExerciseSummary = calculateExercises(dailyLog, dailyTarget);
  const expectedSummary = {
    periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2.9,
    ratingDescription: 'Almost there!',
    target: 2,
    average: 1.9285714285714286 };

  expect(summary).toStrictEqual(expectedSummary);
});

test('given a daily exercise target and a daily average exercise, calculate rating between 1-3', () => {
  const target = 5;
  expect(calculateRating(target, 0)).toBe(1);
  expect(calculateRating(target, 0.5)).toBe(1.2);
  expect(calculateRating(target, 1)).toBe(1.4);
  expect(calculateRating(target, 1.5)).toBe(1.6);
  expect(calculateRating(target, 2)).toBe(1.8);
  expect(calculateRating(target, 2.5)).toBe(2);
  expect(calculateRating(target, 3)).toBe(2.2);
  expect(calculateRating(target, 3.5)).toBe(2.4);
  expect(calculateRating(target, 4)).toBe(2.6);
  expect(calculateRating(target, 4.5)).toBe(2.8);
  expect(calculateRating(target, 5)).toBe(3);
  expect(calculateRating(target, 5.1)).toBe(3);
});

test('given a rating, return its description', () => {
  expect(ratingDescription(1)).toBe('You did not exercise at all. Try again next week?');
  expect(ratingDescription(1.5)).toBe('Step by step. Push it a little more next week?');
  expect(ratingDescription(2)).toBe('Not too bad, but could be better');
  expect(ratingDescription(2.5)).toBe('Good effort. You are getting there!');
  expect(ratingDescription(2.9)).toBe('Almost there!');
  expect(ratingDescription(3)).toBe('You have achieved your goal. Well done!');

  expect(() =>
    ratingDescription(0.9)).toThrowError(`Invalid rating (0.9). Must be a number between 1-3`);
  expect(() =>
    ratingDescription(3.1)).toThrowError(`Invalid rating (3.1). Must be a number between 1-3`);
});
