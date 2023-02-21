import { SelectField } from "../AddPatientModal/FormField";
import React from "react";
import { HealthCheckRating } from "../types";
import { BaseEntryValues } from "./BaseEntryFields";
import { initialValues as baseInitialValues } from "./BaseEntryFields";

export interface HealthCheckEntryValues extends BaseEntryValues {
  healthCheckRating: HealthCheckRating;
  type: "HealthCheck"
}

export const initialValues: HealthCheckEntryValues = {
  ...baseInitialValues,
  type: "HealthCheck",
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