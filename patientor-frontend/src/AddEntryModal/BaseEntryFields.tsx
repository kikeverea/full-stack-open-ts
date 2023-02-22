import { Field } from "formik";
import { TextField } from "../AddPatientModal/FormField";
import React from "react";
import { EntryType } from "../types";

export interface BaseEntryValues {
  type: EntryType;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[];
}

export const initialValues = {
  date: "",
  specialist: "",
  description: "",
  diagnosisCodes: [],
};

const BaseEntryFields = () => {
  return (
    <>
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={ TextField }
      />
      <Field
        label="Specialist"
        placeholder="Specialist"
        name="specialist"
        component={ TextField }
      />
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={ TextField }
      />
    </>
  );
};

export default BaseEntryFields;