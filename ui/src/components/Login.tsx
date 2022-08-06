import React from "react";
import { Container, Button } from "@mui/material";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=6a7def7d5c1d4807b9af2b75cc3fce50&response_type=code&redirect_uri=http://localhost:3000/dashboard&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-follow-read%20user-top-read%20user-follow-modify";

export default function Login() {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Button variant="contained" color="primary" href={AUTH_URL}>
        Login With Spotify
      </Button>
    </Container>
  );
}
