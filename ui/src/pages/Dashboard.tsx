import React, { useState, useEffect, useContext } from "react";
import { Container, Stack } from "@mui/material";
import Join from ".././components/Join";
import Create from ".././components/Create";
import useAuth from "../hook/useAuth";
import { UserContext, UserType } from ".././context/UserContext";
import SpotifyWebApi from "spotify-web-api-node";
import { create } from "@mui/material/styles/createTransitions";
import axios from "axios";
const spotifyApi: any = new SpotifyWebApi({
  clientId: "6a7def7d5c1d4807b9af2b75cc3fce50",
});

export default function Dashboard({ code }: any) {
  const [currentUser, setCurrentUser] = useState<UserType>(undefined);
  const accessToken = useAuth(code);
  const { setAccessToken, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    setAccessToken?.(accessToken);

    spotifyApi
      .getMe()
      .then((res: any) => {
        console.log(res.body);

        const name = res.body.displayName;
        const spotifyId = res.body.id;
        const followers = res.body.followers.total;
        const imageUrl = res.body.images.length ? res.body.images[0].url : "";

        createUser(res.body.id, res.body.displayName);
        setCurrentUser({
          name: name,
          id: spotifyId,
          followers: followers,
          imageUrl: imageUrl,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });

    setUser?.(currentUser);

    console.log(currentUser);
  }, [accessToken]);

  const createUser = (id: string, name: string) => {
    const user = { spotifyId: id, name: name };

    axios
      .post("http://localhost:3001/login", {
        user,
      })
      .then((res) => {
        console.log(res);
        window.history.pushState({}, "", "/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h1>Welcome {currentUser?.name}</h1>
      </div>
      <Stack sx={{ margin: "5%" }}>
        <Create />
        <Join />
      </Stack>
    </Container>
  );
}
