export const toNumber = (obj: unknown): number => {
  const number = Number(obj);

  if (Number.isNaN(number))
    throw new Error('Malformed parameters');

  return number;
};

export const toNumberArray = (arr: unknown[]): number[] => {
  const result: number[] = [];

  if (!arr)
    return result;

  for (const obj of arr)
    result.push(toNumber(obj));

  return result;
};