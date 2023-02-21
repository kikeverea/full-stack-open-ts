import { Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import React from "react";
import { Gender, Patient } from "../types";
import { PaddedBox, InfoLine } from "../components/styled";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import EntryList from "./Entries/EntryList";

const PatientInfo = (): JSX.Element | null => {

  const findPatient = (id: string|undefined): Patient => {
    const found: Patient | null = id ? patients[id] : null;

    if (!found)
      throw new Error("Resource not found");

    return found;
  };

  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient>(findPatient(id));

  React.useEffect(() => {
    if(!patient.ssn && id) {
      const fetchPatientInfo = async () => {
        try {
          const { data: patientInApi } =
            await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

          dispatch(updatePatient(patientInApi));
          setPatient(patientInApi);
        }
        catch (e) {
          console.error(e);
        }
      };
      void fetchPatientInfo();
    }
  }, []);

  if (!patient)
    return null;

  const genderIcon =
    patient.gender === Gender.Male
      ? <MaleIcon />
      : patient.gender === Gender.Female
        ? <FemaleIcon />
        : null;

  return (
    <>
      <PaddedBox>
        <Typography variant="h4">
          { patient.name }<span style={{ marginLeft: 20 }}>{ genderIcon }</span>
        </Typography>
        <InfoLine>
          { patient.ssn && `ssn: ${ patient.ssn }`}
        </InfoLine>
        <InfoLine>
          {`occupation: ${ patient.occupation }`}
        </InfoLine>
        <EntryList patient={ patient } />
      </PaddedBox>
    </>
  );
};

export default PatientInfo;
