import { OccupationalHealthcareEntry } from "../types";
import { InfoLine } from "../components/styled";

const OccupationalHealthcareItem = ({ entry }: { entry: OccupationalHealthcareEntry }): JSX.Element =>
  <>
    <InfoLine>{`Employer ${ entry.employerName }`}</InfoLine>
    { entry.sickLeave &&
      <InfoLine>
        {`Sick leave: ${ entry.sickLeave.startDate } - ${ entry.sickLeave.endDate || "" }`}
      </InfoLine>
    }
  </>
;

export default OccupationalHealthcareItem;