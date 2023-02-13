import { Entry } from "../types";
import { Typography } from "@mui/material";
import { PaddedBox, InfoLine } from "../components/styled";
import React from "react";
import { useStateValue } from "../state";

const EntryList = ({ entries }:{ entries: Entry[] | undefined }): JSX.Element => {

  const [{ diagnoses }, ] = useStateValue();

  return (
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
                  { entry.diagnosisCodes.map((code: string) => {
                      const name = diagnoses[code].name;
                      return <li key={code}>{`${code} - ${ name }`}</li>;
                  }
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
  );
};

export default EntryList;