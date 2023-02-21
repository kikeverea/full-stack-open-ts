import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { Alert } from "@mui/lab";
import NewEntryForm, { EntryType, NewEntryValues } from "./NewEntryForm";
import HealthCheckFields, { initialValues } from "./HealthCheckFields";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntryValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props): JSX.Element => {

  const entryType: EntryType = {
    fields: <HealthCheckFields  />,
    validation: (value) => value ? null : { "Error": "Error (testing)" },
    initialValues: initialValues
  };

  return (
    <Dialog fullWidth={ true }
            open={ modalOpen }
            onClose={() => onClose()}
    >
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider/>
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <NewEntryForm onSubmit={ onSubmit } onCancel={ onClose } entryType={ entryType }/>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;