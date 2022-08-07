import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Stack,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";

export enum PartyTypes {
  "LOCAL" = "LOCAL",
  "REMOTE" = "REMOTE",
}
export default function Create() {
  const [partyName, setPartyName] = useState("");
  const [partyType, setPartyType] = useState(PartyTypes.LOCAL);

  // const [disabled, setDisabled] = useState(true);

  const handleToggleSwitch = () => {
    if (partyType === PartyTypes.LOCAL) {
      setPartyType(PartyTypes.REMOTE);
    } else {
      setPartyType(PartyTypes.LOCAL);
    }
  };

  const handleNameChange = (value: string) => {
    setPartyName(value);
  };

  return (
    <div>
      <h1>Create a Party</h1>
      <Box component="form" noValidate autoComplete="off">
        <Stack>
          <TextField
            id="partyName"
            label="Party Name"
            variant="outlined"
            value={partyName}
            onChange={(e: any) => handleNameChange(e.target.value)}
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={partyType}
            onChange={() => handleToggleSwitch()}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={partyName === ""}
            component={Link}
            to="/party"
          >
            Create Party
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
