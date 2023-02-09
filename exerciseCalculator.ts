export interface ExerciseSummary {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

export const calculateExercises = (dailyHours: number[], dailyTarget: number): ExerciseSummary => {

  if (dailyHours.length === 0)
    throw new Error('A daily hours log must be provided')

  if (dailyTarget === 0)
    throw new Error('A daily hours target must be provided')

  dailyHours = formatHours(dailyHours)
  const trainedHours = dailyHours.reduce((aggregate: number, value: number) => aggregate + value)
  const average = trainedHours / dailyHours.length
  const rating: number = calculateRating(dailyTarget, average)
  const description: string = ratingDescription(rating)

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((hour: number) => hour > 0).length,
    target: dailyTarget,
    average,
    success: average >= dailyTarget,
    rating: rating,
    ratingDescription: description
  }
}

export const formatHours = (hours: number[]): number[] =>
  hours
    .map((hour: number) => Number.isNaN(hour) ? 0 : hour)
    .map((hour: number) => Math.max(0, hour))

export const calculateRating = (dailyTarget: number, dailyAverage: number): number => {
  const adaptedDaily = Math.min(dailyTarget, dailyAverage)
  const rawRating = (adaptedDaily / dailyTarget * 2) + 1
  return Math.round(rawRating * 10) / 10
}

export const ratingDescription = (rating: number): string => {

  if (rating < 1 || rating > 3)
    throw new Error(`Invalid rating (${ rating }). Must be a number between 1-3`)

  if (rating === 1)
    return 'You did not exercise at all. Try again next week?'

  else if (rating <= 1.5)
    return 'Step by step. Push it a little more next week?'

  else if (rating <= 2)
    return 'Not too bad, but could be better'

  else if (rating <= 2.5)
    return 'Good effort. You are getting there!'

  else if (rating < 3)
    return 'Almost there!'

  else // rating === 3
    return 'You have achieved your goal. Well done!'
}