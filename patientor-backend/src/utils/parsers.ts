import { Gender } from "../types";

export const parseString = (text: unknown, fieldName: string): string => {
  if (!isString(text))
    throw new Error(`Incorrect or missing ${ fieldName }`);

  return text;
};

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

export const parseNumber = (num: unknown, fieldName: string): number => {
  if (!isNumber(num))
    throw new Error(`Incorrect or missing ${ fieldName }`);

  return num;
};

const isNumber = (num: unknown): num is number =>
  typeof num === 'number' || num instanceof Number;

export const parseDate = (date: unknown, fieldName: string): string => {
  if (!isString(date) || !isDate(date))
    throw new Error(`Incorrect or missing ${ fieldName }`);

  return date;
};

const isDate = (date: string): boolean =>
  Boolean(Date.parse(date));

export const parseGender = (gender: unknown, fieldName: string): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error(`Incorrect or missing ${ fieldName }`);

  return gender;
};

const isGender = (gender: string): gender is Gender =>
  Object.values(Gender).map(v => v.toString()).includes(gender);