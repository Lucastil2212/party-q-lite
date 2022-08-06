import React, { useState, useEffect, useContext } from "react";
import { Container, Stack } from "@mui/material";
import Join from ".././components/Join";
import Create from ".././components/Create";
import useAuth from "../hook/useAuth";
import { UserContext } from ".././context/UserContext";

export default function Dashboard({ code }: any) {
  const accessToken = useAuth(code);

  const { setAccessToken } = useContext(UserContext);

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) {
      return;
    }

    setAccessToken?.(accessToken);
  }, [accessToken]);

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Stack sx={{ margin: "5%" }}>
        <Create />
        <Join />
      </Stack>
    </Container>
  );
}
