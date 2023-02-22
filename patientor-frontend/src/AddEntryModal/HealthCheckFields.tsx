import { SelectField } from "../AddPatientModal/FormField";
import React from "react";
import { EntryType, HealthCheckRating } from "../types";
import { BaseEntryValues, initialValues as baseInitialValues } from "./BaseEntryFields";

export interface HealthCheckEntryValues extends BaseEntryValues {
  healthCheckRating: HealthCheckRating;
  type: EntryType.HealthCheck
}

export const initialValues: HealthCheckEntryValues = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: HealthCheckRating.Healthy
};

const HealthCheckFields = (): JSX.Element => {

  const camelToRegular = (text: string): string =>
    text.replace(/([A-Z])/g, " $1").trim();

  const ratingOptions = Object.entries(HealthCheckRating)
    .slice(4)
    .map(([key, value]) => {
      const name = camelToRegular(key);
      return { value, label: name };
    });

  return (
    <SelectField label="Health Rating" name="healthCheckRating" options={ ratingOptions } />
  );
};

export default HealthCheckFields;