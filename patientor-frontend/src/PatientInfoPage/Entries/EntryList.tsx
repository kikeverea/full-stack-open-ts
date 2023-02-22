import { Entry, Patient } from "../../types";
import { Button, Stack, Typography } from "@mui/material";
import { PaddedBox } from "../../components/styled";
import React from "react";
import EntryItem from "./EntryItem";
import AddEntryModal from "../../AddEntryModal/AddEntryModal";

const EntryList = ({ patient }:{ patient: Patient }): JSX.Element => {

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error,] = React.useState<string>("");

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