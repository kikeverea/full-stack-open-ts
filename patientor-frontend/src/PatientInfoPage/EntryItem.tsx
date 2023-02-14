import React from "react";
import { Entry } from "../types";

import HealthCheckItem from "./HealthCheckItem";
import OccupationalHealthcareItem from "./OccupationalHealthcareItem";
import HospitalItem from "./HospitalItem";
import { assertNever } from "../utils";
import { OutlinedBox } from "../components/styled";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { InfoLine, Detail } from "../components/styled";
import { useStateValue } from "../state";

const EntryItem = ({ entry }: { entry: Entry }): JSX.Element => {

  interface EntryDetails {
    component: JSX.Element;
    icon: JSX.Element;
    entryName: string;
  }

  const [{ diagnoses },] = useStateValue();

  const determineDetails = (): EntryDetails => {
    let component: JSX.Element;
    let icon: JSX.Element;
    let entryName: string;

    switch (entry.type) {
      case "HealthCheck":
        component = <HealthCheckItem entry={ entry }/>;
        icon = <MonitorHeartIcon />;
        entryName = "Health Check";
        break;
      case "Hospital":
        component = <HospitalItem entry={ entry }/>;
        icon = <LocalHospitalIcon />;
        entryName = "Hospital";
        break;
      case "OccupationalHealthcare":
        component = <OccupationalHealthcareItem entry={ entry }/>;
        icon = <MedicalInformationIcon />;
        entryName = "Occupational Healthcare";
        break;
      default:
        return assertNever(entry);
    }

    return { component, icon, entryName };
  };

  const details: EntryDetails = determineDetails();

  return (
    <OutlinedBox style={{ margin: "16px 0 16px 0" }}>
      <InfoLine>{ entry.date } <Detail>{ details.entryName }</Detail> { details.icon }</InfoLine>
      <InfoLine><em>{ entry.description }</em></InfoLine>
      <div style={{ padding: "8px 0 8px 0" }}>{ details.component }</div>
      <InfoLine>{`Diagnosed by ${entry.specialist}`}</InfoLine>
      { entry.diagnosisCodes &&
        <>
          <ul>
            { entry.diagnosisCodes.map((code: string) => {
              const diagnosis = diagnoses[code];
              return <li key={ code }>{`${ code }: ${ diagnosis.name }`}</li>;})
            }
          </ul>
        </>
      }
    </OutlinedBox>
  );
};

export default EntryItem;