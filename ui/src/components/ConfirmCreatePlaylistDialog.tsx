import React from "react";
import {
  TextField,
  Container,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
} from "@mui/material";

export type DialogProps = {
  songs: any[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  spotifyApi: any;
};
export default function ConfirmCreatePlaylistDialog({
  songs,
  open,
  setOpen,
  spotifyApi,
}: DialogProps) {
  const [playlistTitle, setPlaylistTitle] = React.useState("");
  const [playlistDescription, setPlaylistDescription] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmedCreatePlaylist = () => {
    createPlaylist();
    setOpen(false);
  };

  const createPlaylist = () => {
    spotifyApi.createPlaylist(playlistTitle, {
      description: playlistDescription,
      public: true,
    });
  };

  const handleTitleChange = (title: any) => {
    setPlaylistTitle(title);
  };

  const handleDescriptionChange = (description: any) => {
    setPlaylistDescription(description);
  };

  return (
    <Dialog onClose={() => handleClose()} open={open} style={{ color: "red" }}>
      <DialogTitle>Create a Playlist</DialogTitle>
      <Stack>
        <TextField
          label="Title"
          value={playlistTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          style={{ paddingBottom: "5%" }}
        ></TextField>
        <TextField
          label="Description"
          value={playlistDescription}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        ></TextField>
      </Stack>
      <DialogContentText sx={{ padding: "10%" }}>
        <List>
          {songs.map((song: any) => {
            return <ListItem>{song.title}</ListItem>;
          })}
        </List>
      </DialogContentText>
      <Stack>
        <Button
          color="primary"
          variant="contained"
          sx={{ marginBottom: "5%" }}
          onClick={() => handleConfirmedCreatePlaylist()}
        >
          Create
        </Button>
        <Button
          color="warning"
          variant="contained"
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
}
