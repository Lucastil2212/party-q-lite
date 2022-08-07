import React from "react";
import {
  Card,
  Box,
  Stack,
  CardContent,
  Typography,
  CardMedia,
  Container,
} from "@mui/material";

export default function TrackDisplay({ playingTrack }: any) {
  console.log(playingTrack);
  if (playingTrack) {
    return (
      <Card
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "5%",
        }}
      >
        <Stack>
          <CardMedia
            component="img"
            sx={{ height: "300px", width: "300px" }}
            image={playingTrack.albumUrl[1].url}
          />
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {playingTrack.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {playingTrack.artist}
            </Typography>
          </CardContent>
        </Stack>
      </Card>
    );
  } else {
    return <p>No Currently Playing Track</p>;
  }
}
