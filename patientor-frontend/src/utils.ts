export const assertNever = (value: never): never => {
  throw new Error(
    `Invalid type: ${JSON.stringify(value)}`
  );
};