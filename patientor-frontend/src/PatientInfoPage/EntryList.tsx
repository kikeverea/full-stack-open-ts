import { Entry } from "../types";
import { Typography } from "@mui/material";
import { PaddedBox } from "../components/styled";
import React from "react";
import EntryItem from "./EntryItem";

const EntryList = ({ entries }:{ entries: Entry[] | undefined }): JSX.Element => {

  return (
    <PaddedBox>
      <Typography variant="h5">
        Entries
      </Typography>
      { entries && entries.length > 0
        ?
        <>
          { entries.map((entry: Entry) =>
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