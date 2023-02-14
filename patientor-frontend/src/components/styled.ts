import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PaddedBox = styled(Box)`
  padding: 24px 0 24px 0;
`;

export const InfoLine = styled("div")`
  padding: 8px 0 8px 0;
  font-size: 1.1em;
`;

export const OutlinedBox = styled("div")`
  border: black 1px solid;
  border-radius: 10px;
  padding: 8px;  
`;

export const Detail = styled("span")`
  color: grey;
  font-size: 0.7em;
  font-style: italic;
`;