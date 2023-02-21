import { NewEntryValues } from "../AddEntryModal/NewEntryForm";
import { Entry, NewEntry } from "../types";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/patients";

const createNewEntry = async (patientId: string, values: NewEntryValues): Promise<Entry | undefined> => {
  let entry: NewEntry;
  const url = `${ baseUrl }/${ patientId }/entries`;
  switch (values.type) {
    case "HealthCheck":
      entry = {
        date: values.date,
        type: values.type,
        specialist: values.specialist,
        description: values.description,
        diagnosisCodes: values.diagnosisCodes ? values.diagnosisCodes : [],
        healthCheckRating: values.healthCheckRating
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