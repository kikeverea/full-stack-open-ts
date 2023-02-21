import { Entry, Patient } from "../../types";
import { Button, Stack, Typography } from "@mui/material";
import { PaddedBox } from "../../components/styled";
import React from "react";
import EntryItem from "./EntryItem";
import AddEntryModal from "../../AddEntryModal/AddEntryModal";
import { NewEntryValues } from "../../AddEntryModal/NewEntryForm";
import entriesService from "../../services/entriesService";
import { updatePatient, useStateValue } from "../../state";

const EntryList = ({ patient }:{ patient: Patient }): JSX.Element => {

  const [, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error,] = React.useState<string>("");

  const submitNewEntry = async (values: NewEntryValues) => {
    const created = await entriesService.createNewEntry(patient.id, values);

    if (created) {
      patient.entries = patient.entries ? [...patient.entries, created] : [created];
      dispatch(updatePatient(patient));
    }
    closeModal();
  };

  const closeModal = () =>
    setModalOpen(false);

  return (
    <PaddedBox>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">
          Entries
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          ADD NEW
        </Button>
      </Stack>
      <AddEntryModal
        modalOpen={ modalOpen }
        onSubmit={ submitNewEntry }
        error={ error }
        onClose={ closeModal }
      />
      { patient.entries && patient.entries.length > 0
        ?
        <>
          { patient.entries.map((entry: Entry) =>
            <EntryItem key={ entry.id } entry={ entry }/>)
          }
        </>
        :
        <p>Patient has no entries</p>
      }
    </PaddedBox>
  );
};

export default EntryList;