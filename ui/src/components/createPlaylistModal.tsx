import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export enum Type {
  RECENTS = "recents",
  TOPS = "tops",
  RECOMMENDATIONS = "recomendations",
  CUSTOM = "custom",
}
export default function CreatePlaylistModal({
  toggleRecents,
  toggleTops,
  toggleRecommendations,
  onCreatePlaylist,
}: any) {
  const [open, setOpen] = useState(toggleRecents);
  const [type, setType] = useState<Type>(Type.CUSTOM);

  useEffect(() => {
    if (toggleRecents | toggleTops | toggleRecommendations) setOpen(true);

    if (toggleRecents) {
      setType(Type.RECENTS);
    } else if (toggleTops) {
      setType(Type.TOPS);
    } else if (toggleRecommendations) {
      setType(Type.RECOMMENDATIONS);
    } else {
      setType(Type.CUSTOM);
    }
  }, [toggleRecents, toggleTops, toggleRecommendations]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreatePlaylist = () => {
    onCreatePlaylist(type);
    setOpen(false);
  };
  return (
    <div style={{}}>
      <Box style={{ display: "flex", flexDirection: "row" }}>
        <p>Create playlist from {type} </p>
        <IconButton
          onClick={() => {
            handleCreatePlaylist();
          }}
          size="large"
          color="primary"
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
    </div>
  );
}
