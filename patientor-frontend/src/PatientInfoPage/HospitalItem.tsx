import { HospitalEntry } from "../types";

const HospitalItem = ({ entry }: { entry: HospitalEntry }): JSX.Element =>
  <>
    <div>{`Discharged ${ entry.discharge.date }`}</div>
    <div><em>{ entry.discharge.criteria }</em></div>
  </>
;

export default HospitalItem;