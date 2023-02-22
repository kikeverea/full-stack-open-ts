import { Button, Stack } from "@mui/material";
import { EntryType } from "../types";

type Props = {
  onTypeSelected: (type: EntryType) => void;
};

const TypeSelectionButtons = ({ onTypeSelected }: Props): JSX.Element =>
  <Stack spacing={2} style={{ padding: "0 32px 0 32px" }}>
    <Button variant="contained" onClick={() => onTypeSelected(EntryType.HealthCheck)}>
      Health Check
    </Button>
    <Button variant="contained" onClick={() => onTypeSelected(EntryType.OccupationalHealthcare)}>
      Occupational Healthcare
    </Button>
    <Button variant="contained" onClick={() => onTypeSelected(EntryType.Hospital)}>
      Hospital
    </Button>
  </Stack>;

export default TypeSelectionButtons;