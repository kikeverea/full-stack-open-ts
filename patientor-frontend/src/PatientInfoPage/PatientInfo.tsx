import { Box, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import styled from "@emotion/styled";
import React from "react";
import { Gender, Patient } from "../types";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientInfo = () => {

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
        console.log("Fetching..");
        try {
          const { data: patientInApi } =
            await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

          dispatch({ type: "UPDATE_PATIENT", payload: patientInApi });
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
    return <></>;

  const genderIcon =
    patient.gender === Gender.Male
      ? <MaleIcon />
      : patient.gender === Gender.Female
        ? <FemaleIcon />
        : null;

  const InfoLine = styled.div`
    padding: 12px 0 0 0;
    font-size: 1.1em;
  `;

  return (
    <>
      <Box sx={{
        padding: "24px 0 24px 0"
      }}>
        <Typography variant="h4">
          { patient.name }<span style={{ marginLeft: 20 }}>{ genderIcon }</span>
        </Typography>
        <InfoLine>
          { patient.ssn && `ssn: ${ patient.ssn }`}
        </InfoLine>
        <InfoLine>
          {`occupation: ${ patient.occupation }`}
        </InfoLine>
      </Box>
    </>
  );
};

export default PatientInfo;
