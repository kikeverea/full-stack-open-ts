import { Form, Formik } from "formik";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Button, Grid } from "@mui/material";
import React from "react";
import BaseEntryFields from "./BaseEntryFields";
import { useStateValue } from "../state";
import { HealthCheckEntryValues } from "./HealthCheckFields";

export type NewEntryValues = HealthCheckEntryValues;

interface Props {
  onSubmit: (values: NewEntryValues) => void;
  onCancel: () => void;
  entryType: EntryType;
}

export interface EntryType {
  fields: JSX.Element;
  validation: (values: NewEntryValues )=> { [field: string]: string } | null;
  initialValues: NewEntryValues;
}

const NewEntryForm = ({ onSubmit, onCancel, entryType }: Props): JSX.Element => {
  const [{ diagnoses },] = useStateValue();

  const validate = (values: NewEntryValues) => {
    const requiredError = "Field is required";
    let errors: { [field: string]: string } = {};

    if (!values.date)
      errors.name = requiredError;

    if (!values.specialist)
      errors.ssn = requiredError;

    if (!values.description)
      errors.dateOfBirth = requiredError;

    const entryTypeError = entryType.validation(values);

    if (entryTypeError)
      errors = {...errors, ...entryTypeError};

    return errors;
  };

  return (
    <Formik
      initialValues={ entryType.initialValues }
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <BaseEntryFields/>
            { entryType.fields }
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