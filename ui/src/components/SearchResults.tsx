import React from "react";
import {
  Stack,
  Card,
  Box,
  Typography,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useEffect } from "react";

export default function SearchResults({ searchResults, chooseTrack }: any) {
  function handlePlay(track: any) {
    console.log(track.track);
    chooseTrack(track.track);
  }

  const TrackSearchResult = (track: any) => {
    return (
      <Button onClick={() => handlePlay(track)}>
        <Card sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}></Box>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {track.track.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {track.track.artist}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ height: "64px", width: "64px" }}
            image={track.track.albumUrl[2].url}
          />
        </Card>
      </Button>
    );
  };

  return (
    <Stack>
      {searchResults.map((track: any) => (
        <TrackSearchResult track={track} />
      ))}
    </Stack>
  );
}