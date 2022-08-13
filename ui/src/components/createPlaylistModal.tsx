import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function CreatePlaylistModal({
  toggleRecents,
  onCreatePlaylist,
}: any) {
  const [open, setOpen] = useState(toggleRecents);

  useEffect(() => {
    setOpen(toggleRecents);
  }, [toggleRecents]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCreatePlaylist = () => {
    onCreatePlaylist();
    setOpen(false);
  };
  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={() => handleClose()}
        hideBackdrop={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: -1 }}
      >
        <Box style={{}}>
          <IconButton
            onClick={() => {
              handleCreatePlaylist();
            }}
          ></IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Playlist??
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
