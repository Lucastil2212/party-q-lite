import React, { useState, useEffect } from "react";
import { Modal, ImageList, ImageListItem, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function OceanDisplayModal(tops: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [tracks, setTracks] = React.useState(tops);
  useEffect(() => {
    setTracks(tops);
    console.log(tracks);
  }, [tops]);
  // const [tops, setTops] = useState([]);

  // useEffect(() => {
  //   if (!accessToken) return;
  //   spotifyApi.setAccessToken(accessToken);

  //   // Get Current User's Recently Played Tracks
  //   spotifyApi
  //     .getMyTopTracks({
  //       limit: 20,
  //       time_range: "short_term",
  //     })
  //     .then((res: any) => {
  //       setTops(
  //         res.body.items.map((item: any) => {
  //           return {
  //             artist: item.artists[0].name,
  //             title: item.name,
  //             uri: item.uri,
  //             albumUrl: item.album.images,
  //           };
  //         })
  //       );
  //     })
  //     .catch((err: any) => {
  //       console.log("Something went wrong!", err);
  //     });
  // }, [accessToken]);

  // const buildOcean = () => {
  //   return tops.map((top: any) => {
  //     return (
  //       <div>
  //         <p>{top.name}</p>
  //       </div>
  //     );
  //   });
  // };
  return (
    <Container>
      <Button onClick={handleOpen}>Toggle Ocean View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          margin: "1% 2%",
          width: "95%",
          height: "95%",
          border: "2px solid #000",
        }}
      >
        <ImageList cols={5} rowHeight={300} sx={{ height: "100%" }}>
          {Array.isArray(tracks.tops) &&
            tracks.tops.map((item: any) => {
              return (
                <ImageListItem key={item.uri}>
                  <img
                    src={item.albumUrl[1].url}
                    alt={item.title + " " + item.artist}
                    loading="lazy"
                  />
                </ImageListItem>
              );
            })}
        </ImageList>
      </Modal>
    </Container>
  );
}
