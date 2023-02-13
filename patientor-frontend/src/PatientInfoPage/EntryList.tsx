import { Entry } from "../types";
import { Typography } from "@mui/material";
import { PaddedBox, InfoLine } from "../components/styled";
import React from "react";

const EntryList = ({ entries }:{ entries: Entry[] | undefined }): JSX.Element =>
  entries && entries.length > 0
  ?
  <PaddedBox>
    <Typography variant="h5">
      Entries
    </Typography>
    { entries && entries.length > 0
      ?
      <>
        { entries.map((entry: Entry) =>
          <div key={ entry.id }>
            <InfoLine>{`${ entry.date } ${ entry.description }`}</InfoLine>
            { entry.diagnosisCodes &&
              <ul>
                { entry.diagnosisCodes.map((code: string) =>
                  <li key={ code }>{ code }</li>
                )}
              </ul>
            }
          </div>
        )
        }
      </>
      :
      <p>Patient has no entries</p>
    }
  </PaddedBox>
  :
    <p>Patient has no entries</p>;

export default EntryList;