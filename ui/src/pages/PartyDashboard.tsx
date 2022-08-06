import React, { useState, useEffect, useContext } from "react";
import { Container } from "@mui/material";
import axios from "axios";
import { UserContext } from ".././context/UserContext";
import SongSearch from "../components/SongSearch";
import SearchResults from "../components/SearchResults";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi: any = new SpotifyWebApi({
  clientId: "6a7def7d5c1d4807b9af2b75cc3fce50",
});

export type Track = {
  title?: string;
  artist?: string;
};

export default function PartyDashboard({ code }: any) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState<Track>();
  const [userId, setUserId] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [trackHistory, setTrackHistory] = useState<Track[]>([]);

  const { accessToken } = useContext(UserContext);

  const chooseTrack = (track: any): void => {
    if (track === playingTrack) return;
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res: any) => {
        setLyrics(res.data.lyrics);
      });

    setTrackHistory(() => [...trackHistory, playingTrack]);
  }, [playingTrack]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res: any) => {
      setSearchResults(
        res.body.tracks.items.map((track: any) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest: any, image: any) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
  }, [search, accessToken]);

  return (
    <Container>
      <p>Party Dashboard</p>
      <SongSearch setSearch={setSearch} />
      <SearchResults searchResults={searchResults} chooseTrack={chooseTrack} />
    </Container>
  );
}
