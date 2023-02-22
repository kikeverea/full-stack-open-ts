import { EntryType, HealthCheckRating } from "../types";
import { EntryView, NewEntryValues } from "./NewEntryForm";
import HealthCheckFields, { initialValues as healthCheckInitialValues } from "./HealthCheckFields";
import OccupationalHealthcareFields, { initialValues as occupationalInitialValues } from "./OccupationalHealthcareFields";
import HospitalFields, { initialValues as hospitalInitialValues } from "./HospitalFields";

export const HealthCheckView: EntryView = {
  fields: <HealthCheckFields />,
  validation: (values: NewEntryValues) => {
    const errors: { [field: string]: string } = {};

    if (values.type !== EntryType.HealthCheck)
      throw new Error("Wrong EntryType");

    const validRating: boolean = Object.values(HealthCheckRating).includes(values.healthCheckRating);

    if (!validRating)
      errors.healthCheckRating = `Invalid rating ${values.healthCheckRating}`;

    return errors;
  },
  initialValues: healthCheckInitialValues
};

export const OccupationalHealthcareView: EntryView = {
  fields: <OccupationalHealthcareFields />,
  validation: (values: NewEntryValues) => {
    const errors: { [field: string]: string } = {};
    const requiredError = "Field is required";
    const wrongFormatError = "Wrong date format";

    if (values.type !== EntryType.OccupationalHealthcare)
      throw new Error("Wrong EntryType");

    if (!values.employerName)
      errors.employerName = requiredError;

    if(values.sickLeaveStart) {
      if (!values.sickLeaveEnd)
        errors.sickLeaveEnd = requiredError;

      if (!Date.parse(values.sickLeaveStart))
        errors.sickLeaveStart = wrongFormatError;
    }

    if(values.sickLeaveEnd) {
      if (!values.sickLeaveStart)
        errors.sickLeaveStart = requiredError;

      if (!Date.parse(values.sickLeaveEnd))
        errors.sickLeaveEnd = wrongFormatError;
    }


    return errors;
  },
  initialValues: occupationalInitialValues
};

export const HospitalView: EntryView = {
  fields: <HospitalFields />,
  validation: (values: NewEntryValues) => {
    const errors: { [field: string]: string } = {};
    const requiredError = "Field required";

    if (values.type !== EntryType.Hospital)
      throw new Error("Wrong EntryType");

    if (!values.dischargeDate) {
      errors.dischargeDate = requiredError;
    }
    else if(!Date.parse(values.dischargeDate)) {
      errors.dischargeDate = "Wrong date format";
    }

    if (!values.dischargeCriteria)
      errors.dischargeCriteria = requiredError;

    return errors;
  },
  initialValues: hospitalInitialValues
};