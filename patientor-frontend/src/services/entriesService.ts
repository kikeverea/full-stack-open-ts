import { NewEntryValues } from "../AddEntryModal/NewEntryForm";
import { Entry, EntryType, NewEntry } from "../types";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/patients";

const createNewEntry = async (patientId: string, values: NewEntryValues): Promise<Entry | undefined> => {
  let entry: NewEntry;
  const url = `${ baseUrl }/${ patientId }/entries`;

  const baseEntry = {
    date: values.date,
    specialist: values.specialist,
    description: values.description,
    diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes : [],
  };

  switch (values.type) {
    case EntryType.HealthCheck:
      entry = {
        ...baseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: values.healthCheckRating
      };
      break;
    case EntryType.OccupationalHealthcare:
      entry = {
        ...baseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: values.employerName,
        sickLeave:
          values.sickLeaveStart && values.sickLeaveEnd
            ? { startDate: values.sickLeaveStart, endDate: values.sickLeaveEnd}
            : undefined
      };
      break;
    case EntryType.Hospital:
      entry = {
        ...baseEntry,
        type: EntryType.Hospital,
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria
        }
      };
      break;
  }

  try {
    const response = await axios.post<Entry>(url, entry);
    return response.data;
  }
  catch(err) {
    if (axios.isAxiosError(err)) {
      console.log(err.code);
      console.log(err.message);
    }
    else {
      console.error(err.message);
    }
  }
};

export default {
  createNewEntry
};