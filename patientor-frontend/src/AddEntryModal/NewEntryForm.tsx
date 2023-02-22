import { Form, Formik } from "formik";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Button, Grid } from "@mui/material";
import React from "react";
import BaseEntryFields from "./BaseEntryFields";
import { useStateValue } from "../state";
import { HealthCheckEntryValues } from "./HealthCheckFields";
import { OccupationalHealthcareEntryValues } from "./OccupationalHealthcareFields";
import { HospitalEntryValues } from "./HospitalFields";

export type NewEntryValues =
| HealthCheckEntryValues
| OccupationalHealthcareEntryValues
| HospitalEntryValues;

interface Props {
  onSubmit: (values: NewEntryValues) => void;
  onCancel: () => void;
  entryView: EntryView;
}

export interface EntryView {
  fields: JSX.Element;
  validation: (values: NewEntryValues) => { [field: string]: string } | null;
  initialValues: NewEntryValues;
}

const NewEntryForm = ({ onSubmit, onCancel, entryView }: Props): JSX.Element => {
  const [{ diagnoses },] = useStateValue();

  const validate = (values: NewEntryValues) => {
    const requiredError = "Field is required";
    let errors: { [field: string]: string } = {};

    if (!values.date) {
      errors.date = requiredError;
    }
    else if(!Date.parse(values.date)) {
      errors.date = "Wrong date format (YYYY-MM-DD)";
    }

    if (!values.specialist)
      errors.specialist = requiredError;

    if (!values.description)
      errors.description = requiredError;

    const entryTypeError = entryView.validation(values);

    if (entryTypeError)
      errors = {...errors, ...entryTypeError};

    return errors;
  };

  return (
    <Formik
      initialValues={ entryView.initialValues }
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <BaseEntryFields/>
            { entryView.fields }
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewEntryForm;