import { BaseEntryValues, initialValues as baseInitialValues } from "./BaseEntryFields";
import { EntryType } from "../types";
import { TextField } from "../AddPatientModal/FormField";
import React from "react";
import { Field } from "formik";

export interface HospitalEntryValues extends BaseEntryValues {
  type: EntryType.Hospital,
  dischargeDate: string;
  dischargeCriteria: string;
}

export const initialValues: HospitalEntryValues = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  dischargeDate: "",
  dischargeCriteria: ""
};

const HospitalFields = (): JSX.Element => {
  return (
    <>
      <Field
        label="Discharge Date"
        placeholder="YYYY-MM-DD"
        name="dischargeDate"
        component={ TextField }
      />
      <Field
        label="Criteria"
        placeholder="Discharge Criteria"
        name="dischargeCriteria"
        component={ TextField }
      />
    </>
  );
};

export default HospitalFields;