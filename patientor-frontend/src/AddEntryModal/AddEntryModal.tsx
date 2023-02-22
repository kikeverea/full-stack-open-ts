import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { Alert } from "@mui/lab";
import NewEntryForm, { EntryView, NewEntryValues } from "./NewEntryForm";
import TypeSelectionButtons from "./TypeSelectionButtons";
import React from "react";
import { EntryType, Patient } from "../types";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import entriesService from "../services/entriesService";
import { HealthCheckView, HospitalView, OccupationalHealthcareView } from "./EntryViews";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, error }: Props): JSX.Element => {

  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<string>();
  const [type, setType] = React.useState<EntryType | null>(null);

  const transitionDuration = 250;

  const submitNewEntry = async (values: NewEntryValues) => {
    const patient = Object.values(patients).find((p: Patient) => p.id === id) as Patient;
    const created = await entriesService.createNewEntry(patient.id, values);

    if (created) {
      patient.entries = patient.entries ? [...patient.entries, created] : [created];
      dispatch(updatePatient(patient));
    }

    close();
  };

  const getEntryView = (): EntryView => {
    let view: EntryView;

    switch (type) {
      case EntryType.HealthCheck:
        view = HealthCheckView;
        break;
      case EntryType.OccupationalHealthcare:
        view = OccupationalHealthcareView;
        break;
      case EntryType.Hospital:
        view = HospitalView;
        break;
      default:
        throw new Error("Wrong type");
    }

    return view;
  };

  const close = () => {
    onClose();
    // wait for the transition to be over to prevent TypeSelectionButtons to be visible before the modal is closed
    setTimeout(() => setType(null), transitionDuration);
  };

  return (
    <Dialog fullWidth={ true }
            open={ modalOpen }
            onClose={ close }
            transitionDuration={ transitionDuration }
    >
      <DialogTitle>Add new entry</DialogTitle>
      <Divider/>
      <DialogContent>
        { type
          ? <>
            {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
            <NewEntryForm onSubmit={ submitNewEntry } onCancel={ close } entryView={ getEntryView() }/>
          </>
          :
          <TypeSelectionButtons onTypeSelected={ setType }/>
        }
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;