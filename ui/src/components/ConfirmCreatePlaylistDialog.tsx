import React, { useState } from "react";
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

import { usePlaylists } from "../hook/usePlaylists";

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
  const [playlistName, setPlaylistName] = React.useState("");
  const [playlistDescription, setPlaylistDescription] = React.useState("");

  const [completed, setCompleted] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { playlists, createPlaylist, addTracksToPlaylist, isLoading } =
    usePlaylists();

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmedCreatePlaylist = () => {
    createPlaylist(playlistName, playlistDescription);

    console.log(playlists);

    const playlistToAdd = playlists?.find(
      (playlist: any) => playlistName === playlist.name
    );
    // addTracksToPlaylist(playlistToAdd.id, songs);
  };
  return (
    <Dialog onClose={() => handleClose()} open={open} style={{ color: "red" }}>
      <DialogTitle>Create a Playlist</DialogTitle>
      <Stack>
        <TextField
          label="Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          style={{ paddingBottom: "5%" }}
        ></TextField>
        <TextField
          label="Description"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
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
