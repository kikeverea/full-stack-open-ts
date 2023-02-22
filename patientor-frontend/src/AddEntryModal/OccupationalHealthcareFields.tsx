import { TextField } from "../AddPatientModal/FormField";
import React from "react";
import { Field } from "formik";
import { BaseEntryValues, initialValues as baseInitialValues } from "./BaseEntryFields";
import { EntryType } from "../types";

export interface OccupationalHealthcareEntryValues extends BaseEntryValues {
  type: EntryType.OccupationalHealthcare
  employerName: string;
  sickLeaveStart: string,
  sickLeaveEnd: string
}

export const initialValues: OccupationalHealthcareEntryValues = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthcare,
  employerName: "",
  sickLeaveStart: "",
  sickLeaveEnd: ""
};

const OccupationalHealthcareFields = (): JSX.Element => {

  return (
    <>
      <Field
        label="Employer"
        placeholder="Employer name"
        name="employerName"
        component={ TextField }
      />
      <Field
        label="Sick Leave Start"
        placeholder="YYYY-MM-DD"
        name="sickLeaveStart"
        component={ TextField }
      />
      <Field
        label="Sick Leave End"
        placeholder="YYYY-MM-DD"
        name="sickLeaveEnd"
        component={ TextField }
      />
    </>
  );
};

export default OccupationalHealthcareFields;